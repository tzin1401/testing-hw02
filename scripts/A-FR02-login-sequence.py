#!/usr/bin/env python3
"""Prepare a fresh local account and send a sequence of wrong logins.

This script records observations; it does not decide Pass/Fail. Passwords and
tokens are redacted from the JSONL log. The optional SQLite query opens the DB
read-only and is only a supporting observation.
"""

import argparse
import json
import sqlite3
import sys
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB = ROOT / "eshop-sut" / "backend" / "database.sqlite"
WRONG_PASSWORD = "Wrong123!"
RIGHT_PASSWORD = "Test1234!"


def utc_now():
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


def redact(value):
    if isinstance(value, dict):
        return {
            key: ("[REDACTED]" if key.lower() in {"password", "token", "authorization"} else redact(item))
            for key, item in value.items()
        }
    if isinstance(value, list):
        return [redact(item) for item in value]
    return value


def read_json_state(db_path, email):
    """Read account lock state through a SQLite read-only connection."""
    try:
        uri = db_path.resolve().as_uri() + "?mode=ro"
        with sqlite3.connect(uri, uri=True, timeout=2) as connection:
            row = connection.execute(
                "SELECT id, email, login_attempts, locked_until "
                "FROM users WHERE email = ?",
                (email,),
            ).fetchone()
        if row is None:
            return {"available": True, "account_found": False}
        return {
            "available": True,
            "account_found": True,
            "user_id": row[0],
            "email": row[1],
            "login_attempts": row[2],
            "locked_until": row[3],
        }
    except (OSError, sqlite3.Error) as error:
        return {"available": False, "error": str(error)}


def send_json(url, payload, timeout):
    """Send one JSON request and return timing plus a safely redacted body."""
    encoded = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=encoded,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    sent_utc = utc_now()
    sent_mono = time.monotonic()
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            status = response.status
            raw = response.read()
    except urllib.error.HTTPError as error:
        status = error.code
        raw = error.read()
    received_mono = time.monotonic()
    received_utc = utc_now()

    try:
        body = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        body = {"non_json_response": raw.decode("utf-8", errors="replace")}

    safe_body = redact(body)
    if isinstance(body, dict) and "token" in body and isinstance(safe_body, dict):
        safe_body["token_present"] = bool(body.get("token"))

    return {
        "sent_utc": sent_utc,
        "received_utc": received_utc,
        "sent_monotonic": sent_mono,
        "received_monotonic": received_mono,
        "round_trip_seconds": received_mono - sent_mono,
        "status": status,
        "response": safe_body,
    }


def append_jsonl(path, record):
    with path.open("a", encoding="utf-8") as output:
        output.write(json.dumps(record, ensure_ascii=False) + "\n")


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Create a unique local account and submit 1–4 wrong-password "
            "login requests sequentially. This records data; it does not "
            "assert test results."
        )
    )
    parser.add_argument("--attempts", type=int, choices=range(1, 5), default=3)
    parser.add_argument("--base-url", default="http://localhost:3000/api")
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--timeout", type=float, default=10.0)
    args = parser.parse_args()

    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + uuid.uuid4().hex[:8]
    email = f"a-fr02-{run_id.lower()}@example.test"
    output_dir = ROOT / "evidence" / "A-FR02" / "api-runs" / run_id
    output_dir.mkdir(parents=True, exist_ok=False)
    log_path = output_dir / "login-sequence.jsonl"

    started_mono = time.monotonic()
    append_jsonl(log_path, {
        "event": "run_started",
        "run_id": run_id,
        "utc": utc_now(),
        "monotonic": started_mono,
        "base_url": args.base_url,
        "attempts_requested": args.attempts,
        "email": email,
        "passwords_logged": False,
        "timing_note": "Monotonic client send/receive times; not server comparison time.",
    })

    print(f"Run ID: {run_id}")
    print(f"Test account: {email}")
    print(f"JSONL log: {log_path.relative_to(ROOT)}")

    before = read_json_state(args.db, email)
    append_jsonl(log_path, {"event": "db_state_before_register", "utc": utc_now(), "state": before})

    registration_payload = {
        "name": f"A-FR02 Test {run_id}",
        "email": email,
        "password": RIGHT_PASSWORD,
    }
    registration = send_json(
        args.base_url.rstrip("/") + "/register",
        registration_payload,
        args.timeout,
    )
    append_jsonl(log_path, {
        "event": "register_account",
        "request": redact(registration_payload),
        **registration,
    })
    print(f"Registration HTTP status: {registration['status']}")

    if registration["status"] < 200 or registration["status"] >= 300:
        append_jsonl(log_path, {
            "event": "run_stopped",
            "utc": utc_now(),
            "reason": "Registration failed; no login attempts were sent.",
        })
        print("Registration failed; no login attempts were sent. Inspect the redacted log.", file=sys.stderr)
        return 2

    for attempt in range(1, args.attempts + 1):
        payload = {"email": email, "password": WRONG_PASSWORD}
        result = send_json(
            args.base_url.rstrip("/") + "/login",
            payload,
            args.timeout,
        )
        state = read_json_state(args.db, email)
        record = {
            "event": "login_attempt",
            "run_id": run_id,
            "attempt_number": attempt,
            "request": redact(payload),
            **result,
            "db_state_after": state,
        }
        append_jsonl(log_path, record)
        print(
            f"Attempt {attempt}: HTTP {result['status']}; "
            f"round trip {result['round_trip_seconds']:.6f}s; "
            f"DB state available={state.get('available')}"
        )

    append_jsonl(log_path, {
        "event": "run_finished",
        "run_id": run_id,
        "utc": utc_now(),
        "elapsed_since_script_start_seconds": time.monotonic() - started_mono,
        "note": "No Pass/Fail judgment is generated by this script.",
    })
    print("Finished recording; this script does not decide Pass/Fail.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

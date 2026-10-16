# Emulator navigation attempt — 2026-10-16

- Baseline app clone: `85af3ba875c88283615e22cb108f13e2fccaf0e9`; Android Emulator Pixel 9, Android 15/API 35, Expo Go SDK 54. API URL in temporary clone points to `10.0.2.2:3000`; no business logic change. Backend and app run against isolated clone.
- App opened and product list loaded. The “Đăng nhập” header is visibly overlapped by Android status icons. Multiple ADB taps in the header did not navigate to Login; product detail card tap did navigate, confirming touch injection works elsewhere. Returning to app Home and tapping header remained ineffective.
- This is an execution blocker for D-DT-001 onward and D-BV-006/007 because Register cannot be reached through the current Mobile UI. The screenshot is diagnostic evidence of the obstruction, not an execution result for registration. No API result is used as Mobile UI evidence.
- No actual account was created by this attempt.

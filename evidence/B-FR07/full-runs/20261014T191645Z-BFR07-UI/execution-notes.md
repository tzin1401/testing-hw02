# Run qualification and side effects

Run `20261014T191645Z-BFR07-UI` is the qualified execution attempt. The earlier trial run `20261014T191002Z-BFR07` was discarded and its generated files were removed because the automation appended to the default quantity (`1` became `11`) and produced invalid case setup. That trial did send an exploratory API `POST /api/cart` with P1 quantity 1.5 before it was discarded.

The qualified run used rendered Web controls and screenshots. The valid P1 quantity-1 Add click was received by the button, but the cart remained empty and no UI `POST /api/cart` request was observed. This makes all cart-populated cases dependent on that add path Blocked.

The qualified exploratory API case also sent one `POST /api/cart` with P1 quantity 1.5 and received HTTP 200 `Added to cart`. The Web cart remained empty. A later read-only `GET /api/cart` returned two P1 quantity-1.5 entries. Because there was no API-cart baseline before the exploratory case and the discarded trial had already sent a POST, the two entries cannot be attributed precisely between those attempts. The Web UI exposes no matching cart rows to remove. No direct API deletion, database mutation, or backend restart was attempted; the API-side test state remains uncleaned. This API observation is not treated as a Web UI test result.

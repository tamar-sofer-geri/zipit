# 🧳 Zip It!

A packing checklist that scales quantities by trip length and trip type. No build step — plain HTML/CSS/JavaScript hosted on GitHub Pages, with data kept in the browser's local storage (no account, no sign-in, no server).

## Live app

**<https://tamar-sofer-geri.github.io/packing-manifest/>**

On your phone, open the link and use your browser's **Add to Home Screen** to install it like an app.

## How it works

- **Plan** — set trip length, pick a **destination** (single-select — Israel, Hawaii, New Orleans, or "New…" to add one), and check off whichever **trip types** apply (City, Hot, Fancy, and so on — any combination). An item shows up if at least one of its tags matches the destination *or* any checked trip type, at the quantity or per-day rate you set for it in Base List. Untagged items stay hidden — add them ad hoc with the "+ Add" button in the "not needed for this trip" row. Check items off as you pack, or nudge any quantity up/down by hand. "+ New plan" starts a fresh working plan.
- **Base List** — every item, grouped by category. Tap one to edit its Category, Destination tags, Trip type tags, Mode (**fixed** quantity vs. **per day** rate), Qty/rate, and Notes. Each tag group has its own "Select all" — useful for things you always need (passport, toothbrush) regardless of destination or trip type.
- **Plans** — save the current trip length + destination + checked trip types + checked-off items + quantity tweaks as a named plan, so you can plan two trips at once without one overwriting the other. Load, rename, or delete saved plans here.

Everything you edit saves automatically to that device's local storage. Since there's no backend, edits made on your phone and on a computer won't sync to each other — each device keeps its own copy. "Reset for new trip" on the Plan tab clears checked-off items and manual quantity tweaks without touching your base list or saved plans; "Reset base list to defaults" on the Base List tab restores the original seeded items (your saved plans and their tags are untouched).

## Deploying changes

Any push to `main` is served directly by GitHub Pages — just edit `index.html` / `app.js` / `styles.css` and push. Bump the `?v=` query strings in `index.html` (and in `manifest.webmanifest`'s icon entries, if icons change) so phones and browsers pick up the new files instead of a cached copy.

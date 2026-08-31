# 🧳 Zip It!

A packing checklist that scales quantities by trip length and trip type. No build step — plain HTML/CSS/JavaScript hosted on GitHub Pages, with data kept in the browser's local storage (no account, no sign-in, no server).

## Live app

**<https://tamar-sofer-geri.github.io/zipit/>**

On your phone, open the link and use your browser's **Add to Home Screen** to install it like an app.

## How it works

- **Plan** — set trip length, pick a **destination** (single-select — Israel, Hawaii, New Orleans, or "New…" to add one), and check off whichever **trip types** apply (City, Hot, Fancy, and so on — any combination). An item shows up if at least one of its tags matches the destination *or* any checked trip type, at the quantity or per-day rate you set for it in Base List. Untagged items stay hidden — add them ad hoc with the "+ Add" button in the "not needed for this trip" row. Check items off as you pack, or nudge any quantity up/down by hand. "+ New plan" starts a fresh working plan. A trip-only "Extra items" card at the bottom lets you add one-off things (a dress for a wedding, say) that live only in this plan, without cluttering the shared Base List.
- **Base List** — every item, grouped by category. Tap one to edit its Category, Destination tags, Trip type tags, Mode (**fixed** quantity, **per day** rate, or **per week** rate — e.g. 1/week rounds up to 2 for a 10-day trip), Qty/rate, and Notes. Each tag group has its own "Select all" — useful for things you always need (passport, toothbrush) regardless of destination or trip type.
- **Saved Plans** — save the current trip length + destination + checked trip types + checked-off items + quantity tweaks + extra items as a named plan, so you can plan two trips at once without one overwriting the other. Load, rename, or delete saved plans here.

Everything you edit saves automatically to that device's local storage. Since there's no backend, edits made on your phone and on a computer won't sync to each other — each device keeps its own copy. "Reset for new trip" on the Plan tab clears checked-off items and manual quantity tweaks without touching your base list or saved plans; "Reset base list to defaults" on the Base List tab restores the original seeded items (your saved plans and their tags are untouched).

### Demo mode

Add `?demo=1` to the URL — **<https://tamar-sofer-geri.github.io/zipit/?demo=1>** — for a shareable, pre-populated sandbox: two example saved plans ("Israel Trip," "Hawaii Trip"), most items already tagged, a couple of items already checked off. It runs on its own local-storage key, completely separate from the real app, so nothing done there ever touches real data (and vice versa). A "Reset demo" button restores it to that starting point at any time.

## Deploying changes

Any push to `main` is served directly by GitHub Pages — just edit `index.html` / `app.js` / `styles.css` and push. Bump the `?v=` query strings in `index.html` (and in `manifest.webmanifest`'s icon entries, if icons change) so phones and browsers pick up the new files instead of a cached copy.

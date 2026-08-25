# 🧳 Manifest

A packing checklist that scales quantities by trip length, destination, and trip type. No build step — plain HTML/CSS/JavaScript hosted on GitHub Pages, with data kept in the browser's local storage (no account, no sign-in, no server).

## Live app

**<https://tamar-sofer-geri.github.io/packing-manifest/>**

On your phone, open the link and use your browser's **Add to Home Screen** to install it like an app.

## How it works

- **Plan** — set trip length, destination, and trip type. Quantities recompute live from the base list, boosted or added to by whichever rules apply. Items not needed for the current trip collapse into a "not needed" row instead of cluttering the list. Check items off as you pack, or nudge any quantity up/down by hand.
- **Base List** — every item, grouped by category. Each is either a **fixed** quantity (same regardless of trip length) or a **per day** rate (scales with the number of days). Edit freely, add or remove items.
- **Rules** — the logic that adjusts quantities for a destination or trip type: multiply a category, add extra units to specific items, or force a minimum. Each rule is either tied to a **Location** (shown as a destination chip) or a **Trip type** (shown as a toggle chip usable on any trip).

Everything you edit saves automatically to that device's local storage. Since there's no backend, edits made on your phone and on a computer won't sync to each other — each device keeps its own copy. "Reset for new trip" on the Plan tab clears checked-off items and manual quantity tweaks without touching your base list or rules; "Reset base list to defaults" on the Base List tab restores the original seeded data.

## Deploying changes

Any push to `main` is served directly by GitHub Pages — just edit `index.html` / `app.js` / `styles.css` and push. Bump the `?v=` query strings in `index.html` (and in `manifest.webmanifest`'s icon entries, if icons change) so phones and browsers pick up the new files instead of a cached copy.

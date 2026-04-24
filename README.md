# ⚡ Pokemint — Flip Intelligence

Pokemon TCG resell signal tool.

- Built for the aisle.
- BUY/HOLD/SKIP in under a second.

**Live:** [poke-lootmint.vercel.app](https://poke-lootmint.vercel.app)  
**Repo:** [github.com/ericsecution/poke-lootmint](https://github.com/ericsecution/poke-lootmint)

---

## What it does

Pokemint tells you — before you pull out your wallet — whether a Pokemon TCG product is worth flipping.

- **BUY** → ROI ≥ 60%
- **HOLD** → ROI ≥ 25%
- **SKIP** → ROI < 25%

Signal is the first thing you see. Profit range is second. Everything else is detail.

---

## Features

- Signal-dominant card UI — BUY/HOLD/SKIP at 34px, first element, no exceptions
- Profit range with eBay fee baked in (13%)
- Type filter pills (ETB, UPC, Booster Bundle, Booster Box, and more)
- Search by product name
- Worth Flipping toggle — hides anything under 30% ROI
- Custom price override — recalculates signal and margin live
- eBay sold listings deep link per product
- Mark as Found — log store name + timestamp when you spot it in the wild

---

## Stack

- React (Create React App)
- Single file: `src/App.js`
- No external dependencies beyond CRA defaults
- Deployed on Vercel — auto-deploys on push to `main`

---

## Local dev

```bash
npm install
npm start
```

Runs at `localhost:3000`.

---

## Deploy

Push to `main`. Vercel handles the rest.

```bash
git add .
git commit -m 'your message'
git push
```

---

## Version history

| Version | Change |
|---------|--------|
| v3.0.0 | Signal-dominant UI — BUY/HOLD/SKIP as hero element |
| v1.0.0 | Initial build — price checker, eBay link, Mark as Found, ROI filter |

---

*Built by Eric @ Hype Systems. Calen architects. Silas ships.*

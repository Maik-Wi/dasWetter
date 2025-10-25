# DWD Wetter – Playful PWA (Client-only)

Reine Client-PWA, die DWD-Daten **ohne Backend** direkt im Browser nutzt – über die CORS-fähige **Bright Sky** API.
- Installierbar (Manifest + Service Worker)
- SVG-Charts, CSS/SVG-Icons
- Dark/Light via `prefers-color-scheme`
- Deutsch & Englisch

## Live
Hoste einfach die statischen Dateien (z. B. GitHub Pages, Cloudflare Pages, Netlify). **HTTPS** erforderlich.

## Entwickeln
Keine Build-Tools nötig. Öffne `index.html` lokal mit einem kleinen HTTP-Server (wegen Service Worker & Geolocation):
```bash
python3 -m http.server 8080
# dann: http://localhost:8080
```

## Datenquelle
- © Deutscher Wetterdienst (DWD), CC BY 4.0 – Produkt: MOSMIX
- Zugriff via **Bright Sky** (https://brightsky.dev), die DWD-Daten als JSON bereitstellt (CORS-fähig)

## Lizenz
- Unser App-Code: **GPL-3.0-or-later**
- Meteocons (MIT © Bas Milius) – eingebettetes Subset im `index.html`
- DWD Open Data: CC BY 4.0 (Attribution im Footer/README)

## Push nach GitHub
```bash
git init
git add .
git commit -m "Initial commit: client-only DWD weather PWA"
git branch -M main
# Ersetze USER/REPO durch deinen Account/Repo-Namen:
git remote add origin git@github.com:USER/REPO.git
git push -u origin main
```

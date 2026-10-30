# @grenseland/ui

Felles oppbygging av dashboards i grenseland-prosjektene. Pakken gir samme skall, widgets, rutenett, tabeller og designvariabler overalt, mens hvert prosjekt selv velger farger og størrelser.

## Bruk

Pakken hentes direkte fra GitHub med en fast tag:

```bash
npm install git+https://github.com/grenseland/ui.git#v0.1.0
```

Prosjektet må bruke React 19 og en bundler som Vite, fordi pakken leveres som TypeScript-kildekode. Importer stilene før prosjektets egne stiler, og overstyr variabler der:

```tsx
import "@grenseland/ui/styles.css";
import "./styles.css";
```

```css
:root {
  --accent: #579bff;
  --sidebar-width: 208px;
  --text-sm: 13px;
}
```

## Komponenter

| Komponent | Bruk |
| --- | --- |
| `AppShell` | Meny, topplinje, bunnlinje og hovedområde, med skuffmeny under 1024 px |
| `MenuGroup`, `MenuLink` | Innholdet i menyen |
| `Widget` | Felles ramme for alt innhold |
| `WidgetHeader` | Felles overskrift i en widget |
| `WidgetContent`, `WidgetFooter` | Innhold og bunn i en widget |
| `WidgetState` | Tilstandene laster, tom og feil |
| `WidgetGrid`, `WidgetGridItem` | Rutenett med 12 kolonner på desktop, 6 på nettbrett og 1 på mobil |
| `DataTable` | Tabell som på mobil viser de første kolonnene og resten ved trykk på raden |
| `readTokenPx`, `readToken` | Leser variabler til grafer og annet som tegnes på canvas |

## Variabler

- **Skrift:** nøyaktig 6 størrelser, `--text-2xs` til `--text-xl`.
- **Avstander:** `--space-0-5`, `--space-1` til `--space-6` og `--space-8`.
- **Bruddpunkter:** mobil under 768 px, nettbrett 768–1023 px og desktop fra 1024 px. CSS-medieregler kan ikke lese variabler, så bruddpunktene er faste og finnes som `BREAKPOINTS` i TypeScript.

## Utvikling

```bash
npm install
npm test
npm run typecheck
```

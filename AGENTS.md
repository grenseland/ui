# AGENTS.md – @grenseland/ui

Les de felles reglene i [`../AGENTS.md`](../AGENTS.md) (`~/SourceCode/Private/AGENTS.md`) først. Denne fila inneholder bare det som er spesielt for denne pakken.

## Hva prosjektet er

Felles React-komponenter og designvariabler som gjør at alle dashboards er bygget opp likt. Pakken er et bibliotek, så den har verken AWS-ressurser, deploy eller logging til DashControl.

## Regler

- Pakken skal bare inneholde oppbygging. Domenelogikk og prosjektspesifikke komponenter hører hjemme i prosjektene.
- Alt prosjekter kan endre, styres av CSS-variabler i `src/styles.css`. Standardfargene er nøytrale.
- `src/styles.css` har nøyaktig 6 skriftstørrelser (`--text-*`). Ikke legg til flere.
- Skrift og avstander i CSS-en skal bruke variablene, ikke faste verdier.
- Repoet er offentlig. Det skal ikke inneholde hemmeligheter eller detaljer om prosjektene som bruker det.
- Pakken distribueres som TypeScript-kildekode via git-tagger. Etter en endring: øk `version` i `package.json` og lag taggen `vX.Y.Z`, som prosjektene deretter oppdaterer til.

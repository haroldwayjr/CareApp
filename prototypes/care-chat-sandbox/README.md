# Care Chat Sandbox

Standalone Vite prototype for care-chat member tools, built with React 18, TypeScript, Vanilla Extract, and Base UI.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Prototype notes

- Light mode only — no dark-mode tokens or toggle.
- Tool rail: Member Info → Eligibility → Insurance (mutually exclusive panels; click active again to collapse).
- Tooltips: Base UI, label-only, left of rail, hover **and** keyboard focus.
- Semantic tokens only in component styles — hex lives in `src/tokens.css.ts`.
- Icons: Streamline Regular from Soma Icons page (`9:13081`), copied from `assets/icons/streamline`.
- **FLAG:** `icon.md` (24px) is proposed / unratified.
- **FLAG:** Eligibility uses `clipboard.health` (no exact eligibility glyph).
- **FLAG:** `focus/ring`, `surface/disabled`, `icon/disabled` — see comments in `tokens.css.ts`.
- Visual refs: `refs/*.png` (Chat tasks Figma frames).
- Not a `@nova/ui` / `libs/ui` package — throwaway sandbox only.

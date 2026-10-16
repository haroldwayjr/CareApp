# Care App tool rail panels prototype

Local HTML prototype of Chat Tasks with Member Information, Insurance, and Eligibility flows.

## Open locally

```bash
cd prototypes/tool-rail-panels
python3 -m http.server 5177
```

Then visit [http://localhost:5177](http://localhost:5177).

Or open `index.html` directly in a browser.

## Interactions

- **Chat**: Type in the composer and press Enter / Send. Replies stream from a live OpenAI-compatible engine ([Pollinations](https://pollinations.ai)) with thinking → typing → token stream latency. Falls back to a local care-domain engine offline. Optional overrides in DevTools:
  - `localStorage.setItem('CARE_CHAT_API', 'https://…/v1/chat/completions')`
  - `localStorage.setItem('CARE_CHAT_MODEL', 'openai')`
- **Member Information** (person icon): View in menu, Member / Care Team / Dependents tabs, Personal · Contact · Account accordions, Compact list items, edit modal, Task list footer.
- **Insurance** (shield): Verify Insurance → payer select → Verify spinner → Insurance Details (coverage table) → Save to profile → Active plan card → History.
- **Eligibility** (clipboard): Empty primary insurance → Add / Confirm plan modals → Active BCBS row → Details → full insurance page → Back to chat.

Hover the three active rail icons for Soma-style inverse tooltips. Other rail icons stay disabled.

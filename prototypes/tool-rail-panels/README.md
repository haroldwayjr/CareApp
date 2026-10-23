# Care App tool rail panels prototype

Local HTML prototype of Chat Tasks with Chat Assist (Conversation context), Member Information, Insurance, Eligibility, Notes, Communication, and Activity flows.

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
- **Notes** (document): Create Note form + All Notes feed → edit pencil opens Edit Note (disposition / resolution) → Cancel / Save note bar appears when required fields are filled (create) or dirty (edit).
- **Chat Assist** (chat bubble, default open): Conversation context — conversation ID, Card / AI “Member request” summary, transfer reason, Ask Answers / Search Documents tabs, and search (⌘K / /).
- **Communication** (envelope): All conversations — month-grouped message rows with title, conversation ID (copy + full-ID tooltip), last message date, row hover fill, and Load more.
- **Activity** (clock): Member timeline — info banner, Status/Type filters, month-grouped rows with expand/collapse detail, soft status badges, and Clear filters.

Hover the active rail icons for Soma-style inverse tooltips.

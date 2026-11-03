---
name: care-chat-dot
description: >-
  Care App chat personas for the tool-rail-panels prototype — Riley (member),
  Lila (Care Team), and Dot (assistant). Use when editing chat-engine.js,
  conversation UI, member simulation replies, or Dot agent behavior in Care chat.
---

# Care chat — member, Care Team, Dot

## Speakers

| Who | UI | When they speak |
|-----|-----|-----------------|
| **Lila** | Right, team bubble | Human MCA typing in the composer |
| **Riley** | Left, member bubble | Default simulated reply to Lila |
| **Dot** | Left, agent / plain | Only when Lila addresses Dot or asks for bot-appropriate help |

## Dot routing (keep intentional)

Dot replies when the latest Lila message:

- @mentions / names Dot, or
- Asks for bot work: look up, pull plan/benefits/auth/network, wait time, queue, transfer/handoff, connect member, automate

Otherwise Riley replies. Do not have Dot narrate clinical advice or impersonate Riley/Lila.

## Implementation map

- Engine: `prototypes/tool-rail-panels/chat-engine.js` — `chooseSpeaker`, `MEMBER_SYSTEM_PROMPT`, `DOT_SYSTEM_PROMPT`, `generate`
- UI: `prototypes/tool-rail-panels/app.js` — `sendAdvocateMessage`, typing/stream for `member` vs `dot`
- History entries: `{ role, content, speaker: 'lila' | 'riley' | 'dot' }`

## Conversation arcs and reply quality

For realistic MCA ↔ member back-and-forth (turn cues, canon facts, Lila cleanup rewrites, demo arcs), use **[care-mca-conversation](../care-mca-conversation/SKILL.md)** — keep routing rules here; use that skill when writing or rewriting message copy.

## Reply quality

- Greetings / check-ins (“hi”, “what’s good”) → Riley greets back + restates the referral ask — never “got it” or document offers
- Short agreements (“cool”, “ok”) when Riley already stated the need → brief thanks only — do not re-pitch or offer documents
- Lila mid-check / “one moment” → brief wait ack only — do not restate the ask
- Escape cancels an in-flight reply / cleanup if the composer locks up
- Avoid repeating Riley’s previous bubble; no service-agent voice from the member
- Dot → concise plan/handoff/admin language; admit prototype limits (e.g. can’t actually book)
- Strip speaker prefixes from streamed text before painting bubbles

## Overrides

- `localStorage.CARE_CHAT_API` — chat completions URL
- `localStorage.CARE_CHAT_MODEL` — model id (default `openai` via Pollinations)
- `localStorage.CARE_CHAT_REMOTE=1` — use remote model for Riley (default is **local-first** so replies stay on-script)

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

## Reply quality

- Greetings / check-ins (“hi”, “what’s good”) → Riley greets back + restates the referral ask — never “got it” or document offers
- Short agreements (“sure”, “ok”) → Riley thanks her and gives one concrete detail (Dr. Patel / PCP referral), not staff closers (“I’m around if you need…”)
- Avoid repeating Riley’s previous bubble; no service-agent voice from the member
- Dot → concise plan/handoff/admin language; admit prototype limits (e.g. can’t actually book)
- Strip speaker prefixes from streamed text before painting bubbles

## Overrides

- `localStorage.CARE_CHAT_API` — chat completions URL
- `localStorage.CARE_CHAT_MODEL` — model id (default `openai` via Pollinations)

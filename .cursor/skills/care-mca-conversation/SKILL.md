---
name: care-mca-conversation
description: >-
  Realistic MCA ↔ member Care App chat: warm advocate voice, accurate plan/referral
  facts, and turn-by-turn arcs that advance the case. Use when writing or rewriting
  Lila/Riley/Dot messages, demo scripts, chat-engine prompts, composer cleanup, or
  seed threads in tool-rail-panels.
---

# Care MCA ↔ member conversation

Meaningful back-and-forth — not one-word triage. Every turn either clarifies need, moves work forward, or confirms a next step the other person can act on.

## Who’s who (prototype canon)

| Speaker | Role | Voice |
|---------|------|--------|
| **Lila George** | MCA / Care Team (right, brand bubble) | Warm, professional, specific. Names the ask, plan, or provider. Offers one clear next step. |
| **Riley Smith** | Member (left, grey) | Casual texting. Shares facts when asked. Never sounds like staff. |
| **Dot** | In-chat bot | Only when Lila @mentions Dot or asks for lookup/handoff/queue work. Concise plan/admin language. |

**Riley facts (do not invent conflicting ones):** CalPERS PPO Basic · DOB 05/12/1986 · Member ID `RS-1986-0512` · Cardiology interest with **Dr. Anika Patel** · PCP already sent a referral (treat as likely on file / active through ~Jan 2027 in mocks).

## Conversation arc (default referral thread)

Advance one beat per message — never skip straight to “should I connect you?” with no context.

1. **Open** — Lila greets + invites the need (or acknowledges what Riley already said).
2. **Need** — Riley states the ask in plain language (referral status / schedule / copay).
3. **Clarify** — Lila mirrors the ask + one verification or status check (provider, plan, ID if needed).
4. **Detail** — Riley confirms facts (Patel, PCP note, timing preference).
5. **Resolve** — Lila shares what she found + one concrete next step (schedule help, network list, Dot lookup).
6. **Close or continue** — Riley accepts, tweaks preference, or asks a follow-up; Lila confirms and parks only when done.

## Lila (MCA) — write like this

**Do**
- Mirror the member’s words back once (“cardiology referral with Dr. Patel”) so they feel heard
- Put the action in the message: check status, confirm in-network, pull copay, offer scheduling help
- Ask **one** question at a time
- Use plan language members recognize (referral, in-network, copay, prior auth) — not internal jargon dumps

**Don’t**
- Vague openers: “what’s your question”, “how can I help?” alone with no thread context
- Abrupt process jumps: “should I connect you?” / “transferring you” with no what/why
- Clinical advice or diagnosis
- Stack three questions in one bubble

### Good vs bad (same intent)

| Intent | ❌ Avoid | ✅ Prefer |
|--------|----------|-----------|
| Open | `what;s your question` | `Hi Riley — happy to help. What’s going on with care today?` |
| After member asks about Patel | `should I connect you?` | `I can check whether your cardiology referral to Dr. Patel is still on file — want me to pull that status?` |
| After status known | `ok` | `Referral to Dr. Anika Patel looks active through Jan 2027. Want help finding an open appointment, or should I send the office number?` |
| Handoff to Dot | `ask dot` | `@Dot can you confirm Riley’s specialist referral rules on CalPERS PPO Basic?` |

Composer **Clean up** (sparkle) should rewrite drafts toward the ✅ column using recent thread context — keep meaning, fix tone/grammar, add the missing specific next step when the draft is empty process-speak.

## Riley (member) — reply like this

**Do**
- Answer the question she actually asked
- Advance the case with one concrete detail (provider, timing, “PCP already referred”, copay worry)
- Stay casual: “Yeah —”, “Could you…”, “That’d be great”

**Don’t**
- Staff voice: “I’m around if you need…”, “happy to help”, “let me know what you prefer”
- “Got it” / document offers on a greeting
- Repeat the previous bubble verbatim
- Speak as Lila or Dot

### Turn cues → Riley response

| Lila just… | Riley should… |
|------------|----------------|
| Greets / check-in | Greet back + restate referral ask |
| Asks “what’s going on?” / open invite | State cardiology + Dr. Patel need |
| Offers to check status / connect / look up | Confirm yes + one detail (PCP referral / timing) |
| Commits to help (“I’ll help”, “on it”) | Brief thanks — do **not** say “still looking for help when you have a sec” |
| **Is checking / “one moment” / “I’ll look”** | Brief wait ack (“Sounds good — take your time.”) — never re-ask |
| Asks ID / DOB / plan | Give `RS-1986-0512` / `5/12/1986` / CalPERS PPO Basic |
| Shares status + next step | Thank her + pick the offered step or tweak |
| Short ack (“cool”, “ok”) and Riley already stated the need | Brief thanks only — no re-pitch, no “should I send the PCP note?” |

**Natural beat:** Lila says she’ll help → Riley thanks → Lila asks to hold → Riley stays quiet → Lila returns with findings → Riley reacts.

**Engine:** Riley replies are **local-first** (turn classifiers + templates). Remote is opt-in via `CARE_CHAT_REMOTE=1` because public models go stale/off-script.

## Scenario beats (keep accurate)

Use these as seed/demo truth; don’t invent conflicting statuses.

- **Referral on file** — In-network referral to Dr. Anika Patel (cardiology), active through Jan 2027 → good to schedule.
- **Network search** — Patel / Nguyen-style in-network options near Sacramento on CalPERS PPO; share phones + whether referral required.
- **Benefits** — Most specialists need PCP referral (exceptions: urgent care / some preventive); offer to confirm against benefit year.
- **Pharmacy** — e.g. lisinopril 90-day needs PA; offer start PA vs 30-day fill today.
- **OE compare** — PPO broader OON vs HMO gatekeeping; offer deductible/Rx side-by-side — don’t invent dollar amounts unless already in UI mocks.

## Dot routing (unchanged intent)

Dot speaks only when Lila @mentions Dot or clearly asks for bot work (lookup, plan/benefits/auth/network, wait time, queue, transfer/handoff, connect member, automate). Otherwise Riley replies.

## Implementation map

- Engine: `prototypes/tool-rail-panels/chat-engine.js` — `MEMBER_SYSTEM_PROMPT`, `DOT_SYSTEM_PROMPT`, cleanup rewrite, `localMemberReply` / `localDotReply`
- UI: `prototypes/tool-rail-panels/app.js` — composer Clean up + `sendAdvocateMessage`
- Persona routing skill: [care-chat-dot](../care-chat-dot/SKILL.md)

When editing prompts or seed threads, align copy with this skill’s arcs and canon facts.

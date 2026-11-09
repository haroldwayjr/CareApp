/**
 * Care chat engine — OpenAI-compatible streaming (Pollinations by default)
 * with a local domain fallback when the network is unavailable.
 *
 * Speakers:
 * - member (Riley) — default reply to Care Team
 * - dot — when Lila addresses Dot / asks for bot-appropriate help
 *
 * Override endpoint: localStorage.setItem('CARE_CHAT_API', 'https://…/v1/chat/completions')
 * Override model:    localStorage.setItem('CARE_CHAT_MODEL', 'openai')
 */
(function (global) {
  const DEFAULT_API = "https://text.pollinations.ai/openai";
  const DEFAULT_MODEL = "openai";

  const MEMBER_SYSTEM_PROMPT = `You are Riley Smith — a health plan MEMBER in Included Health’s Care App chat. You are NOT Care Team, NOT an advocate, NOT Dot, NOT support staff.

Who’s who:
- You (Riley): member seeking help. CalPERS PPO Basic Plan. DOB 05/12/1986. Member ID RS-1986-0512. Cardiology with Dr. Anika Patel — your PCP already sent a referral (treat as likely on file / active through ~Jan 2027 in this prototype).
- Lila George: Care Team advocate helping YOU. Her messages are labeled “Lila (Care Team)”.
- Dot: Included Health assistant bot. Do not speak as Dot.

Your job: reply as Riley’s next chat bubble only. Match her latest beat — do not restart the conversation.

Turn cues (match Lila’s latest message):
- Greets / check-in → greet back + briefly say you need a cardiology referral with Dr. Patel.
- Open invite (“what’s going on?”, “how can I help?”) → state that need once.
- Offers to check / look up / pull (a question or offer, not “I’m checking now”) → “yeah please” + one detail (PCP already referred).
- She is already checking / asks you to wait (“I’ll check”, “one moment”, “hang on”) → brief wait only (“Sounds good — take your time.”). Do NOT restate your ask.
- Asks member ID / DOB / plan → RS-1986-0512, 5/12/1986, CalPERS PPO Basic.
- Shares status + next step → thank her + pick the offered step.
- Short ack (“cool”, “ok”, “sure”) and you already explained the referral → thank her only (“Thanks!”). Do NOT re-pitch the ask or offer documents.

Style: 1–2 short sentences. Casual texting. Never repeat your last bubble.

You NEVER:
- Staff voice or case-managing Lila (“should I send the PCP note, or…”, “happy to help”, “let me know what you prefer”)
- Restate “can you check my referral?” when she just said she’s checking
- Speak as Lila / Dot / Care Team, or mention being an AI

Output plain message text only — no name prefix, no quotes, no stage directions.`;

  const DOT_SYSTEM_PROMPT = `You are Dot — Included Health’s in-chat assistant in the Care App.

Who’s who:
- Dot (you): helpful bot for triage, handoffs, plan facts, and light admin.
- Riley Smith: member on CalPERS PPO Basic (Member ID RS-1986-0512). Cardiology interest with Dr. Anika Patel; PCP referral likely on file / active through ~Jan 2027 in mocks.
- Lila George: Care Team advocate already in this thread.

When to speak: Lila asked you to help, @mentioned Dot, or needs bot-friendly lookup / handoff / wait-time / plan or referral status — not clinical judgment.

Voice: clear, calm, concise (1–3 short sentences). Use accurate plan language (referral, in-network, copay, prior auth). Plain text only — no name prefix, no markdown fences.

You may summarize CalPERS PPO Basic rules, outline referral/auth checks for cardiology, and suggest next steps for Lila and Riley.

Prototype limits (say when relevant): you cannot actually book appointments, complete transfers, or verify live eligibility — offer to summarize what Lila should confirm or pull next.

You NEVER pretend to be Riley or Lila, invent clinical advice, or claim you finished an action you cannot verify here.`;

  function apiUrl() {
    try {
      return localStorage.getItem("CARE_CHAT_API") || DEFAULT_API;
    } catch {
      return DEFAULT_API;
    }
  }

  function modelName() {
    try {
      return localStorage.getItem("CARE_CHAT_MODEL") || DEFAULT_MODEL;
    } catch {
      return DEFAULT_MODEL;
    }
  }

  const REMOTE_TIMEOUT_MS = 10000;

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }
      const t = setTimeout(resolve, ms);
      signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(t);
          reject(new DOMException("Aborted", "AbortError"));
        },
        { once: true }
      );
    });
  }

  /** Combine caller abort with a hard timeout so remote calls can’t hang the UI. */
  function withTimeout(signal, ms = REMOTE_TIMEOUT_MS) {
    const timeout = AbortSignal.timeout(ms);
    if (!signal) return timeout;
    if (typeof AbortSignal.any === "function") {
      return AbortSignal.any([signal, timeout]);
    }
    const merged = new AbortController();
    const abort = () => merged.abort(signal.reason || timeout.reason);
    if (signal.aborted || timeout.aborted) {
      abort();
      return merged.signal;
    }
    signal.addEventListener("abort", abort, { once: true });
    timeout.addEventListener("abort", abort, { once: true });
    return merged.signal;
  }

  /** Strip optional speaker labels added for the remote model. */
  function bareContent(content) {
    return String(content || "")
      .replace(/^Lila \(Care Team\):\s*/i, "")
      .replace(/^Riley \(member\):\s*/i, "")
      .replace(/^Dot(?: \(assistant\))?:\s*/i, "")
      .trim();
  }

  /**
   * Pick who replies next. Dot only when the latest Care Team turn clearly
   * addresses the bot or asks for bot-appropriate help.
   */
  function chooseSpeaker(messages) {
    const lastCare = [...(messages || [])]
      .reverse()
      .find((m) => m.role === "user" || m.speaker === "lila");
    const text = bareContent(lastCare?.content || "").toLowerCase();
    if (!text) return "member";

    const asksDot =
      /(^|\s)@?dot\b/.test(text) ||
      /\b(hey|hi|ask|tell|have)\s+dot\b/.test(text) ||
      /\bdot[,:]/.test(text);
    const botJob =
      /\b(look\s*(that|it|this)?\s*up|pull\s+(up\s+)?(the\s+)?(plan|benefit|auth|status|network)|check\s+(the\s+)?(plan|benefits?|network|auth|eligibility)|wait\s*time|queue|transfer|hand\s*off|connect(ing)?\s+(them|riley|the\s+member)|auto(mate|matic)|bot\b)/.test(
        text
      );

    if (asksDot || botJob) return "dot";
    return "member";
  }

  function pick(list, avoid) {
    const options = (list || []).filter((s) => s && s !== avoid);
    const pool = options.length ? options : list;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function lastSpeakerContent(messages, speaker) {
    const hit = [...(messages || [])]
      .reverse()
      .find((m) => m.speaker === speaker || (speaker === "lila" && m.role === "user"));
    return bareContent(hit?.content || "");
  }

  function isGreeting(text) {
    const t = text.trim().toLowerCase();
    return (
      /^(hi|hello|hey|hiya|yo|sup|howdy)([,!\s].*)?$/.test(t) ||
      /^(hi|hello|hey)[,!]?\s+riley\b/.test(t) ||
      /^(good\s+(morning|afternoon|evening))([,!\s].*)?$/.test(t) ||
      /^(what'?s\s+(good|up|new)|how('?s|\s+are)\s+(it|you|things)|how\s+goes)\b/.test(t)
    );
  }

  function isAck(text) {
    const t = text.trim().toLowerCase();
    return /^(yes|yeah|yep|yup|sure|ok|okay|cool|great|perfect|absolutely|of course|will do|sounds good|makes sense|got it|k|kk|👍)[.!]*$/.test(
      t
    );
  }

  /** Lila is working / asked Riley to wait — member should not re-ask. */
  function isHoldOrChecking(text) {
    const t = String(text || "")
      .trim()
      .toLowerCase();
    if (!t) return false;
    return (
      /\b(wait|one\s*sec|one\s*moment|a\s*moment|hang\s*on|hold\s*on|hold\s+for|hold\s+a|can you hold|could you hold|hold please|brb|give me a (sec|second|minute|moment)|bear with me)\b/.test(
        t
      ) ||
      /\b(i(?:'ll|ll| will)\s+(?:just\s+)?(?:check|look|pull|verify|confirm))\b/.test(t) ||
      /\b(checking(\s+\w+)?|looking(\s+(into|at|now|that|it up)|)|pulling(\s+\w+)?)\b/.test(t) &&
        !/\blooking forward\b/.test(t) ||
      /^(one\s*(sec|moment|minute)|sec\.?|moment|hold( please)?)[.!]*$/.test(t)
    );
  }

  /** Lila commits to helping (not mid-hold, not asking what they need). */
  function isHelpCommit(text) {
    const t = String(text || "")
      .trim()
      .toLowerCase();
    if (!t || isHoldOrChecking(t)) return false;
    return (
      /\b(i(?:'ll|ll| will)\s+help|i can help|happy to help|glad to help|on it|will do|i(?:'ve| have) got (this|you)|i(?:'ll|ll| will)\s+(take|handle|get)\b)/.test(
        t
      ) || /^(got it|on it|will do)[.!]*$/.test(t)
    );
  }

  /** Lila is offering/asking to look something up — not already mid-check. */
  function isLookupOffer(text) {
    const t = String(text || "")
      .trim()
      .toLowerCase();
    if (isHoldOrChecking(t) || isHelpCommit(t)) return false;
    return /\b(want me to|should i|can i|let me|i can)\b.*\b(check|look|pull|confirm|connect|verify)\b/.test(
      t
    ) ||
      /\b(connect you|should i connect|look that up|look it up|check (the )?status|check whether|confirm (the )?referral|pull (the )?referral)\b/.test(
        t
      );
  }

  /** Prefer deterministic local member replies (remote Pollinations goes stale/off-script). */
  function preferRemoteMember() {
    try {
      return localStorage.getItem("CARE_CHAT_REMOTE") === "1";
    } catch {
      return false;
    }
  }

  function threadMentionsPatel(messages) {
    const blob = (messages || [])
      .map((m) => bareContent(m.content))
      .join(" ")
      .toLowerCase();
    return /\bpatel\b|cardiolog/.test(blob);
  }

  function rileyAlreadyStatedNeed(messages) {
    // Look across recent Riley turns — last bubble may be “Thanks!” / “Appreciate it.”
    const blob = (messages || [])
      .filter((m) => m.speaker === "riley" || (m.role === "assistant" && m.speaker !== "dot"))
      .slice(-6)
      .map((m) => bareContent(m.content))
      .join(" ")
      .toLowerCase();
    return /\b(referral|patel|cardiolog|pcp|specialist)\b/.test(blob);
  }

  /** Member-side local NLG — turn-aware, avoids staff voice */
  function localMemberReply(messages) {
    const last = lastSpeakerContent(messages, "lila");
    const lower = last.toLowerCase().trim();
    const prevRiley = lastSpeakerContent(messages, "riley");

    // Hold / mid-check — brief wait only (generate() usually skips; this is fallback)
    if (isHoldOrChecking(last)) {
      return pick(
        [
          "Sounds good — take your time.",
          "No rush, thanks!",
          "Okay, I’ll hang tight.",
        ],
        prevRiley
      );
    }

    // She just committed to help — thank her; don’t re-ask as if she’s unavailable
    if (isHelpCommit(last)) {
      if (rileyAlreadyStatedNeed(messages) || threadMentionsPatel(messages)) {
        return pick(
          ["Thanks, Lila!", "Appreciate it.", "Thanks — that helps."],
          prevRiley
        );
      }
      return pick(
        [
          "Thanks — it’s a cardiology referral with Dr. Anika Patel. My PCP already sent it.",
          "Great, thank you. Mainly need to know if the Patel referral is still active.",
        ],
        prevRiley
      );
    }

    // “Still need help?” after thanks — confirm yes + short pointer, don’t full restart
    if (
      /\b(still need|need (any )?assistance|need (any more )?help|anything else|what else)\b/.test(
        lower
      )
    ) {
      return pick(
        [
          "Yes please — still need a check on my cardiology referral to Dr. Patel.",
          "Yeah — mainly whether my PCP referral to Dr. Anika Patel is still on file.",
        ],
        prevRiley
      );
    }

    if (isGreeting(last)) {
      return pick(
        [
          "Hey Lila — thanks for hopping on. I’m trying to figure out my cardiology referral with Dr. Anika Patel on CalPERS PPO Basic.",
          "Hi! Mostly need help with a specialist referral — cardiology with Dr. Patel if he’s in network.",
          "Hey — glad you’re here. Can you help me check on a cardiology referral?",
        ],
        prevRiley
      );
    }

    if (/\b(thank|thanks|thx)\b/.test(lower) && !/\b(for|helping)\b/.test(lower)) {
      return pick(
        ["Appreciate you!", "Thanks, Lila!", "That helps — thank you."],
        prevRiley
      );
    }

    if (
      /\b(how can i help|how may i help|what('?s| is) your question|what.*question|what.*(can|do).*(need|help)|what('?s| is) (going )?on|what can i do for you|happy to help)\b/.test(
        lower
      )
    ) {
      return pick(
        [
          "Yeah — I need help with a cardiology referral to Dr. Anika Patel. My PCP already sent one; I’m not sure if it’s still active.",
          "I’m trying to get in with Dr. Patel for cardiology on my CalPERS PPO — can you check whether the referral is still on file?",
          "What’s going on is I need a cardiology visit with Dr. Patel and want to know if my PCP referral is still good.",
        ],
        prevRiley
      );
    }

    if (isLookupOffer(last)) {
      return pick(
        [
          "Yeah, please — my PCP already referred me to Dr. Patel for cardiology.",
          "That’d be great. I’m hoping the PCP referral to Dr. Anika Patel is still on file.",
          "Yes please — Dr. Patel for cardiology if you can see the referral.",
        ],
        prevRiley
      );
    }

    if (
      /\b(active through|on file|looks active|referral.*(jan|2027)|good to schedule|open appointment|office number|send (you )?the number|help finding)\b/.test(
        lower
      )
    ) {
      return pick(
        [
          "That’s great news — help finding an open appointment would be awesome if you can.",
          "Thanks! Could you help me schedule something in the next couple of weeks?",
          "Appreciate it. If scheduling’s a pain, the office number works too.",
        ],
        prevRiley
      );
    }

    if (/\b(member id|id number|date of birth|dob|verify|confirm your)\b/.test(lower)) {
      return pick(
        [
          "Sure — RS-1986-0512, DOB 5/12/1986, CalPERS PPO Basic.",
          "Yep: member ID RS-1986-0512 and DOB 5/12/1986.",
        ],
        prevRiley
      );
    }

    if (/\b(when|availability|schedule|book|appoint|visit|time)\b/.test(lower)) {
      return pick(
        [
          "Something in the next couple of weeks would be ideal if there’s availability.",
          "Afternoons work better for me if that helps.",
        ],
        prevRiley
      );
    }

    if (/\b(copay|deductible|benefit|coverage|cost|how much)\b/.test(lower)) {
      return pick(
        [
          "Mostly wondering about the specialist copay and whether I need a fresh referral first.",
          "Yeah — what’s the specialist copay on CalPERS PPO Basic for cardiology?",
        ],
        prevRiley
      );
    }

    if (/\b(referral|specialist|cardiolog|dr\.?\s*patel|authorization|auth|in.?network|pcp)\b/.test(lower)) {
      return pick(
        [
          "Dr. Anika Patel is who my PCP recommended for cardiology — referral should already be on file.",
          "Yes — cardiology with Dr. Patel if he’s in network. My PCP said the referral should still be active.",
          "That works — my PCP already sent the note over.",
        ],
        prevRiley
      );
    }

    if (/\b(plan|calpers|ppo|network)\b/.test(lower)) {
      return pick(
        [
          "I’m on CalPERS PPO Basic — trying to get the Dr. Patel cardiology referral lined up.",
          "Yep, CalPERS PPO Basic. Does that change anything for specialist referrals?",
        ],
        prevRiley
      );
    }

    // Short ack — if Riley already stated the need, just thank (don’t re-pitch)
    if (isAck(last) || lower.length <= 12) {
      if (rileyAlreadyStatedNeed(messages) || threadMentionsPatel(messages)) {
        return pick(
          ["Thanks!", "Sounds good.", "Appreciate it."],
          prevRiley
        );
      }
      return pick(
        [
          "Thanks — it’s a cardiology referral with Dr. Anika Patel. My PCP already sent it.",
          "Cool — mainly need to know if that Patel referral is still active.",
        ],
        prevRiley
      );
    }

    // Unclear Care Team turn — light nudge, not a full restart if need was already said
    if (rileyAlreadyStatedNeed(messages)) {
      return pick(
        [
          "Thanks — happy to wait if you’re still looking.",
          "No worries — just let me know what you find on the referral.",
          "Sounds good.",
        ],
        prevRiley
      );
    }

    return pick(
      [
        "Yeah — I’m trying to get my cardiology referral with Dr. Patel sorted on CalPERS PPO.",
        "Could you check whether my PCP’s referral to Dr. Anika Patel is still on file?",
      ],
      prevRiley
    );
  }

  function localDotReply(last, messages) {
    const lower = last.toLowerCase();
    const patelContext = threadMentionsPatel(messages);
    if (/\b(connect|transfer|hand\s*off|care team|human)\b/.test(lower)) {
      return pick([
        "Lila’s already with Riley on this thread — I can pull CalPERS PPO referral rules or cardiology network notes while you coordinate.",
        "No transfer needed here: I can summarize plan/referral checks for Dr. Patel cardiology in the background.",
      ]);
    }
    if (/\b(benefit|coverage|deductible|copay|ppo|calpers|plan|network)\b/.test(lower)) {
      return pick([
        "Riley’s on CalPERS PPO Basic — most specialists need an active PCP referral (with usual urgent/preventive exceptions). I can outline copay/referral rules for cardiology.",
        "CalPERS PPO Basic: specialist visits typically need a valid referral on file. Want a quick summary for Dr. Anika Patel in-network?",
      ]);
    }
    if (/\b(appoint|schedule|book|visit)\b/.test(lower)) {
      return "I can’t book appointments in this prototype — I can list what Lila should confirm (referral active, in-network, office contact) before Riley schedules.";
    }
    if (/\b(auth|authorization|referral|status|patel|cardiolog)\b/.test(lower)) {
      return patelContext
        ? pick([
            "For this mock, treat Riley’s cardiology referral to Dr. Anika Patel as likely on file / active through ~Jan 2027 — I can’t verify live status here, but Lila can confirm next scheduling steps.",
            "Referral check outline: CalPERS PPO Basic, PCP referral to Dr. Patel (cardiology), active through Jan 2027 in demo data. Live eligibility isn’t available in the prototype.",
          ])
        : "I can outline referral/auth fields to verify (plan, PCP referral date, specialist NPI) — live status pulls aren’t available in this prototype.";
    }
    return pick([
      "On it — say whether to pull plan rules, referral status outline, or in-network cardiology options for Riley.",
      "Happy to help. Referral, network, or CalPERS PPO benefits — which should I summarize first?",
    ]);
  }

  /** Local fallback — speaker-aware template NLG with streamed tokens */
  async function* localEngine({ messages, speaker, signal }) {
    const last = lastSpeakerContent(messages, "lila");
    const reply =
      speaker === "dot" ? localDotReply(last, messages) : localMemberReply(messages);

    yield { type: "status", phase: "thinking" };
    await sleep(420 + Math.random() * 380, signal);
    yield { type: "status", phase: "typing" };
    await sleep(280 + Math.random() * 220, signal);

    const words = reply.split(/(\s+)/);
    for (const part of words) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
      yield { type: "token", text: part };
      await sleep(18 + Math.random() * 42, signal);
    }
    yield { type: "done", source: "local", speaker };
  }

  function labelMessages(messages, speaker) {
    return messages.map((m) => {
      const text = bareContent(m.content);
      const who = m.speaker || (m.role === "user" ? "lila" : "riley");
      if (who === "lila" || m.role === "user") {
        return { role: "user", content: `Lila (Care Team): ${text}` };
      }
      if (who === "dot") {
        return { role: "assistant", content: `Dot: ${text}` };
      }
      return { role: "assistant", content: `Riley (member): ${text}` };
    });
  }

  async function* streamRemote({ messages, speaker, signal }) {
    yield { type: "status", phase: "thinking" };
    await sleep(350 + Math.random() * 250, signal);

    const system = speaker === "dot" ? DOT_SYSTEM_PROMPT : MEMBER_SYSTEM_PROMPT;
    const lastLila = lastSpeakerContent(messages, "lila");
    const reminder =
      speaker === "dot"
        ? "Reminder: reply as Dot only. Do not speak as Riley or Lila."
        : `Reminder: reply as Riley the MEMBER only. Respond directly to Lila’s latest message (“${lastLila.slice(0, 120)}”). No staff voice, no “got it” unless she asked you to do something, no “I’m around if you need…”.`;

    const body = {
      model: modelName(),
      stream: true,
      temperature: speaker === "dot" ? 0.5 : 0.7,
      messages: [
        { role: "system", content: system },
        ...labelMessages(messages, speaker),
        { role: "system", content: reminder },
      ],
    };

    const timed = withTimeout(signal);
    const res = await fetch(apiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: timed,
    });

    if (!res.ok) {
      throw new Error(`Chat API ${res.status}`);
    }

    yield { type: "status", phase: "typing" };

    if (!res.body) {
      const json = await res.json();
      const text = json?.choices?.[0]?.message?.content || "";
      yield { type: "token", text };
      yield { type: "done", source: "remote", speaker };
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let sawContent = false;

    while (true) {
      if (timed.aborted) throw new DOMException("Aborted", "AbortError");
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") {
          yield { type: "done", source: "remote", speaker };
          return;
        }
        try {
          const json = JSON.parse(payload);
          const delta = json?.choices?.[0]?.delta || {};
          const piece = delta.content;
          if (typeof piece === "string" && piece.length) {
            sawContent = true;
            yield { type: "token", text: piece };
          }
        } catch {
          /* ignore partial JSON */
        }
      }
    }

    if (!sawContent) {
      throw new Error("Empty model response");
    }
    yield { type: "done", source: "remote", speaker };
  }

  /**
   * @param {{ messages: {role:string, content:string, speaker?:string}[], signal?: AbortSignal }} opts
   */
  async function* generate(opts) {
    const lastLila = lastSpeakerContent(opts.messages, "lila");
    const routed = chooseSpeaker(opts.messages);
    const speaker = routed;
    yield { type: "speaker", speaker: speaker === "dot" ? "dot" : "member" };

    // Hold / “one moment” → brief wait ack (silence felt like the chat was stuck)
    if (routed !== "dot" && isHoldOrChecking(lastLila)) {
      yield* localEngine({ ...opts, speaker: "member" });
      return;
    }

    const next = { ...opts, speaker };

    // Member replies: local-first (remote models go stale / off-script).
    // Opt into remote: localStorage.setItem('CARE_CHAT_REMOTE', '1')
    if (speaker === "member" && !preferRemoteMember()) {
      yield* localEngine(next);
      return;
    }

    try {
      yield* streamRemote(next);
    } catch (err) {
      if (err?.name === "AbortError") throw err;
      console.warn("[care-chat] remote engine failed, using local fallback", err);
      yield* localEngine({ ...opts, speaker: speaker === "dot" ? "dot" : "member" });
    }
  }

  const CLEANUP_PROMPT = `You rewrite unsent Care Team advocate (Lila George) chat drafts before she sends to member Riley Smith.

Goals:
- Warm, professional advocate voice — specific, not generic process-speak
- Mirror Riley’s ask from recent thread when known (e.g. cardiology referral, Dr. Anika Patel, CalPERS PPO Basic)
- One clear next step per message: check referral status, confirm ID, offer scheduling help, or @Dot for plan lookup
- Fix grammar and typos; tighten wording without changing facts Riley already stated
- Do not stack multiple questions; do not give clinical advice
- Replace vague openers (“what’s your question”, bare “how can I help”) with a proper invite that names care today
- Replace bare “should I connect you?” with a specific offer (e.g. check Dr. Patel cardiology referral status)
- Bare “cool” / “ok” after Riley stated a need → briefly acknowledge and say what you’ll do next (e.g. check the referral)
- “I’ll check wait a moment” style → “I’ll check on that referral — one moment.”
- Plain message text only — no quotes, labels, or preamble`;

  function summarizeThreadForCleanup(messages) {
    const recent = (messages || []).slice(-12);
    if (!recent.length) return "";
    return recent
      .map((m) => {
        const who = m.speaker || (m.role === "user" ? "lila" : "riley");
        const label =
          who === "lila" ? "Lila" : who === "dot" ? "Dot" : "Riley";
        const text = bareContent(m.content).slice(0, 200);
        return `${label}: ${text}`;
      })
      .join("\n");
  }

  function localCleanup(text, messages) {
    const draft = String(text || "").trim();
    if (!draft) return "";
    const lower = draft.toLowerCase();
    const patel = threadMentionsPatel(messages || []);

    const bareVagueInvite =
      /^(what[';]?s your question|what;s your question|how can i help|how may i help)[.?!]*$/i.test(
        draft
      ) ||
      (lower.length < 42 &&
        /\b(what[';]?s your question|what;s your question|how can i help|how may i help)\b/.test(
          lower
        ) &&
        !/\b(referral|patel|cardiolog|calpers|schedule)\b/.test(lower));
    if (bareVagueInvite || (lower.length < 24 && /\bquestion\b/.test(lower))) {
      return "Hi Riley — happy to help. What’s going on with care today?";
    }

    if (
      /\b(should i connect|connect you|want me to connect)\b/.test(lower) &&
      !/\breferral\b|\bpatel\b|\bstatus\b|\bcardiolog\b/.test(lower) &&
      lower.length < 80
    ) {
      if (patel) {
        return "I can check whether your cardiology referral to Dr. Anika Patel is still on file — want me to pull that status?";
      }
      return "I can check your specialist referral status on CalPERS PPO Basic — want me to pull that for you?";
    }

    if (
      isAck(draft) &&
      patel &&
      (messages || []).some(
        (m) =>
          (m.speaker === "riley" || m.role === "assistant") &&
          /\breferral\b|\bpatel\b|\bcardiolog\b/i.test(bareContent(m.content))
      )
    ) {
      return "Sure — I’ll check your cardiology referral to Dr. Anika Patel and confirm whether it’s still active.";
    }

    if (isHoldOrChecking(draft) && draft.length < 80) {
      if (patel) {
        return "I’ll check on your cardiology referral to Dr. Anika Patel — one moment.";
      }
      return "I’ll check on that — one moment.";
    }

    if (isHelpCommit(draft) && draft.length < 60) {
      if (patel) {
        return "I can help with that — I’ll look at your cardiology referral to Dr. Anika Patel.";
      }
      return "I can help with that — what should we tackle first?";
    }

    let out = draft
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
    out = out.charAt(0).toUpperCase() + out.slice(1);
    if (!/[.!?]$/.test(out)) out += ".";
    out = out
      .replace(/\bwhat;s your question\b/gi, "what’s going on with care today")
      .replace(/\bI('?ll| will) check wait\b/gi, "I’ll check — wait")
      .replace(/\bill help\b/gi, "I’ll help")
      .replace(/\bI just wanted to\b/gi, "I want to")
      .replace(/\bI was wondering if\b/gi, "Could you")
      .replace(/\bCould you please let me know\b/gi, "Could you let me know")
      .replace(/\bCan you let me know\b/gi, "Could you confirm");
    return out;
  }

  async function rewriteRemote(text, messages, signal) {
    const thread = summarizeThreadForCleanup(messages);
    const userBody = thread
      ? `Recent thread:\n${thread}\n\nDraft to rewrite:\n${text}`
      : `Draft to rewrite:\n${text}`;
    const body = {
      model: modelName(),
      stream: false,
      temperature: 0.3,
      messages: [
        { role: "system", content: CLEANUP_PROMPT },
        {
          role: "user",
          content: userBody,
        },
      ],
    };
    const res = await fetch(apiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: withTimeout(signal, 8000),
    });
    if (!res.ok) throw new Error(`Cleanup API ${res.status}`);
    const json = await res.json();
    const cleaned = String(json?.choices?.[0]?.message?.content || "")
      .replace(/^["“]|["”]$/g, "")
      .trim();
    if (!cleaned) throw new Error("Empty cleanup response");
    return cleaned;
  }

  /**
   * Rewrite an unsent composer draft — warm advocate voice + grammar.
   * @param {{ text: string, messages?: {role:string, content:string, speaker?:string}[], signal?: AbortSignal }} opts
   * @returns {Promise<string>}
   */
  async function rewriteDraft({ text, messages, signal } = {}) {
    const draft = String(text || "").trim();
    if (!draft) return "";
    const history = messages || [];
    try {
      return await rewriteRemote(draft, history, signal);
    } catch (err) {
      if (err?.name === "AbortError") throw err;
      console.warn("[care-chat] cleanup remote failed, using local polish", err);
      return localCleanup(draft, history);
    }
  }

  global.CareChatEngine = {
    generate,
    rewriteDraft,
    chooseSpeaker,
    isHoldOrChecking,
    SYSTEM_PROMPT: MEMBER_SYSTEM_PROMPT,
    MEMBER_SYSTEM_PROMPT,
    DOT_SYSTEM_PROMPT,
    apiUrl,
    modelName,
  };
})(window);

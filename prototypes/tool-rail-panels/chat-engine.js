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
- You (Riley): member seeking help. CalPERS PPO Basic Plan. DOB 05/12/1986. Member ID RS-1986-0512. Cardiology referral interest with Dr. Patel.
- Lila George: Care Team advocate helping YOU. Her messages are labeled “Lila (Care Team)”.
- Dot: Included Health assistant bot. Do not speak as Dot.

Your job: reply as Riley’s next chat bubble only — a natural back-and-forth text, matching what Lila just said.

Turn rules:
- Greeting / check-in (“hi”, “hey Riley”, “what’s good”, “what’s up”) → greet back, then briefly say why you’re here (referral). Do NOT say “got it” or offer documents.
- She agrees / says “sure” / “ok” after you asked for help → thank her and give one concrete detail (Dr. Patel, cardiology, PCP referral) so she can act. Do NOT close the chat or offer to “be around.”
- She asks a real question → answer it as the member.
- Keep 1–2 short sentences. Casual texting voice. Never repeat your last bubble verbatim.

You NEVER:
- Speak like staff (“I’m around if you need more details”, “let me know what you prefer”, “happy to help”)
- Offer to book or walk Lila through steps
- Speak as Lila / Dot / “the Care Team”
- Mention being an AI, a model, or Pollinations

Output plain message text only — no name prefix, no quotes, no stage directions.`;

  const DOT_SYSTEM_PROMPT = `You are Dot — Included Health’s in-chat assistant in the Care App.

Who’s who:
- Dot (you): helpful bot for triage, handoffs, plan facts, and light admin.
- Riley Smith: member (CalPERS PPO Basic Plan, Member ID RS-1986-0512).
- Lila George: Care Team advocate already in this thread.

When to speak: Lila asked you to help, @mentioned Dot, or needs a quick bot-friendly lookup / handoff / wait-time / scheduling assist — not clinical judgment.

Voice: clear, calm, concise (1–3 short sentences). Plain text only — no name prefix, no markdown fences.
You may summarize plan basics, offer to connect or pull status, and confirm next steps for Lila and Riley.
You NEVER pretend to be Riley or Lila, invent clinical advice, or claim you completed an action you can’t verify in this prototype.`;

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

  /** Member-side local NLG — turn-aware, avoids staff voice */
  function localMemberReply(messages) {
    const last = lastSpeakerContent(messages, "lila");
    const lower = last.toLowerCase().trim();
    const prevRiley = lastSpeakerContent(messages, "riley");

    if (isGreeting(last)) {
      return pick(
        [
          "Hey Lila — thanks for hopping on. I need help with a cardiology referral on my CalPERS PPO.",
          "Hi! Not much — mostly hoping you can help me get a specialist referral sorted.",
          "Hey — glad you’re here. Question about a cardiology referral with Dr. Patel.",
        ],
        prevRiley
      );
    }

    if (/\b(thank|thanks|thx)\b/.test(lower)) {
      return pick(
        ["Of course — thank you!", "Appreciate it!", "Thanks, that means a lot."],
        prevRiley
      );
    }

    if (
      /\b(how can i help|how may i help|what.*(can|do).*(need|help)|what('?s| is) (going )?on|what can i do for you)\b/.test(
        lower
      )
    ) {
      return pick(
        [
          "I need a cardiology referral with Dr. Patel — can you help me get that set up on my CalPERS PPO?",
          "Looking for help with a specialist referral — cardiology, preferably Dr. Patel if he’s in network.",
        ],
        prevRiley
      );
    }

    if (/\b(member id|id number|date of birth|dob|verify|confirm your)\b/.test(lower)) {
      return pick(
        [
          "Sure — member ID is RS-1986-0512, DOB 5/12/1986.",
          "Yep, RS-1986-0512. Let me know if you need anything else to verify.",
        ],
        prevRiley
      );
    }

    if (/\b(when|availability|schedule|book|appoint|visit|time)\b/.test(lower)) {
      return pick(
        [
          "Something in the next couple of weeks would be ideal if there’s availability.",
          "Afternoons are easier for me if that helps with scheduling.",
        ],
        prevRiley
      );
    }

    if (/\b(copay|deductible|benefit|coverage|cost|how much)\b/.test(lower)) {
      return pick(
        [
          "Mostly wondering about the specialist copay and whether I need a new referral first.",
          "Yeah — what’s the specialist copay on CalPERS PPO Basic?",
        ],
        prevRiley
      );
    }

    if (/\b(referral|specialist|cardiolog|dr\.?\s*patel|authorization|auth|in.?network|pcp)\b/.test(lower)) {
      return pick(
        [
          "Yes please — Dr. Patel for cardiology if he’s in network. My PCP said the referral should still be active.",
          "Dr. Patel is who my PCP recommended. Can you check if that referral is still good?",
          "That works. Happy to send the PCP note if you need it.",
        ],
        prevRiley
      );
    }

    if (/\b(plan|calpers|ppo|network)\b/.test(lower)) {
      return pick(
        [
          "I’m on CalPERS PPO Basic — mostly focused on getting the cardiology referral lined up.",
          "Yep, CalPERS PPO Basic. Does that change anything for specialist referrals?",
        ],
        prevRiley
      );
    }

    // Short agreement from Lila after Riley asked for help → advance the ask with a detail
    if (isAck(last) || lower.length <= 12) {
      return pick(
        [
          "Thanks! It’s a cardiology referral — preferably with Dr. Patel if he’s in network.",
          "Awesome. My PCP already sent a referral; can you check if it’s still active?",
          "Perfect — should I send over the PCP note, or do you already have it on file?",
        ],
        prevRiley
      );
    }

    // Open / unclear Care Team turn — restate need without “got it” / staff closers
    return pick(
      [
        "Yeah — I’m hoping to get a cardiology referral sorted with Dr. Patel.",
        "Still looking for help on that specialist referral when you have a sec.",
        "Could you help me check the status of my cardiology referral?",
      ],
      prevRiley
    );
  }

  function localDotReply(last) {
    const lower = last.toLowerCase();
    if (/\b(connect|transfer|hand\s*off|care team|human)\b/.test(lower)) {
      return pick([
        "I can keep Lila on this thread and surface anything she needs from the plan side. What should I pull first?",
        "Lila is already here — I can grab plan or auth details in the background while you two talk.",
      ]);
    }
    if (/\b(benefit|coverage|deductible|copay|ppo|calpers|plan|network)\b/.test(lower)) {
      return pick([
        "Riley’s on CalPERS PPO Basic. I can summarize specialist copay / referral rules if that’s helpful.",
        "Quick plan note: CalPERS PPO Basic — specialist visits usually need an active referral. Want the copay range next?",
      ]);
    }
    if (/\b(appoint|schedule|book|visit)\b/.test(lower)) {
      return "I can’t book from here in this prototype, but I can draft the scheduling details for Lila to confirm with Riley.";
    }
    if (/\b(auth|authorization|referral|status)\b/.test(lower)) {
      return "I can flag referral / auth status for cardiology once Lila confirms the provider. Want me to outline what to verify?";
    }
    return pick([
      "On it — tell me what to pull (plan, referral, or network) and I’ll summarize here.",
      "Happy to help. What should I look up for you and Riley?",
    ]);
  }

  /** Local fallback — speaker-aware template NLG with streamed tokens */
  async function* localEngine({ messages, speaker, signal }) {
    const last = lastSpeakerContent(messages, "lila");
    const reply = speaker === "dot" ? localDotReply(last) : localMemberReply(messages);

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

    const res = await fetch(apiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
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
    const speaker = chooseSpeaker(opts.messages);
    yield { type: "speaker", speaker };
    const next = { ...opts, speaker };
    try {
      yield* streamRemote(next);
    } catch (err) {
      if (err?.name === "AbortError") throw err;
      console.warn("[care-chat] remote engine failed, using local fallback", err);
      yield* localEngine(next);
    }
  }

  const CLEANUP_PROMPT = `You rewrite unsent Care Team advocate chat drafts before they send.

Goals:
- Concise, professional, and warm — suitable for member messaging
- Keep the same meaning, facts, names, plan details, and questions
- Fix grammar and tighten wording; do not add new asks or offers
- Plain message text only — no quotes, labels, or preamble`;

  function localCleanup(text) {
    let out = String(text || "")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
    if (!out) return out;
    out = out.charAt(0).toUpperCase() + out.slice(1);
    if (!/[.!?]$/.test(out)) out += ".";
    out = out
      .replace(/\bI just wanted to\b/gi, "I want to")
      .replace(/\bI was wondering if\b/gi, "Could you")
      .replace(/\bCould you please let me know\b/gi, "Could you let me know")
      .replace(/\bCan you let me know\b/gi, "Could you confirm");
    return out;
  }

  async function rewriteRemote(text, signal) {
    const body = {
      model: modelName(),
      stream: false,
      temperature: 0.3,
      messages: [
        { role: "system", content: CLEANUP_PROMPT },
        {
          role: "user",
          content: `Rewrite this draft so it is concise and professional:\n\n${text}`,
        },
      ],
    };
    const res = await fetch(apiUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
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
   * Rewrite an unsent composer draft — concise + professional.
   * @param {{ text: string, signal?: AbortSignal }} opts
   * @returns {Promise<string>}
   */
  async function rewriteDraft({ text, signal } = {}) {
    const draft = String(text || "").trim();
    if (!draft) return "";
    try {
      return await rewriteRemote(draft, signal);
    } catch (err) {
      if (err?.name === "AbortError") throw err;
      console.warn("[care-chat] cleanup remote failed, using local polish", err);
      return localCleanup(draft);
    }
  }

  global.CareChatEngine = {
    generate,
    rewriteDraft,
    chooseSpeaker,
    SYSTEM_PROMPT: MEMBER_SYSTEM_PROMPT,
    MEMBER_SYSTEM_PROMPT,
    DOT_SYSTEM_PROMPT,
    apiUrl,
    modelName,
  };
})(window);

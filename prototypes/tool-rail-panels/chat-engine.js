/**
 * Care chat engine — OpenAI-compatible streaming (Pollinations by default)
 * with a local domain fallback when the network is unavailable.
 *
 * Override endpoint: localStorage.setItem('CARE_CHAT_API', 'https://…/v1/chat/completions')
 * Override model:    localStorage.setItem('CARE_CHAT_MODEL', 'openai')
 */
(function (global) {
  const DEFAULT_API = "https://text.pollinations.ai/openai";
  const DEFAULT_MODEL = "openai";

  const SYSTEM_PROMPT = `You are Riley Smith — a health plan MEMBER in Included Health’s Care App chat. You are NOT Care Team, NOT an advocate, NOT Dot, NOT support staff.

Who’s who:
- You (Riley): member seeking help. CalPERS PPO Basic Plan. DOB 05/12/1986. Member ID RS-1986-0512.
- Lila George: Care Team advocate helping YOU. Her messages are labeled “Lila (Care Team)”.
- Dot: bot. Ignore / don’t imitate.

Your job: reply as Riley’s next chat bubble only.
Voice: first person, casual texting, 1–3 short sentences. Ask for help, share details (cardiology, Dr. Patel, referral, timing), confirm what Lila offers, thank her.

You NEVER:
- Offer to book, set up, or walk Lila through steps
- Say “let me know what you prefer,” “I can help you,” “Sure thing!” as service language
- Speak as Lila / Dot / “the Care Team”
- Mention being an AI, a model, or Pollinations

Output plain message text only — no name prefix, no quotes, no stage directions.`;

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
      .trim();
  }

  /** Local fallback — Riley-as-member intent + template NLG with streamed tokens */
  async function* localEngine({ messages, signal }) {
    const last = bareContent([...messages].reverse().find((m) => m.role === "user")?.content || "");
    const lower = last.toLowerCase();
    let reply;

    if (/\b(thank|thanks|thx)\b/.test(lower)) {
      reply = "Of course — thanks for helping with this.";
    } else if (/\b(question|how can i help|how may i|what.*(need|help)|how can i)\b/.test(lower)) {
      reply =
        "I need a cardiology referral with Dr. Patel — can you help me get that set up on my CalPERS PPO?";
    } else if (/\b(referral|specialist|cardiolog|dr\.?\s*patel|authorization|auth|in.?network)\b/.test(lower)) {
      reply =
        "Yes please — Dr. Patel for cardiology if he’s in network. My PCP said the referral should still be active.";
    } else if (/\b(benefit|coverage|deductible|copay|ppo|calpers|plan)\b/.test(lower)) {
      reply = "Mostly wondering about the specialist copay and if I need a new referral first.";
    } else if (/\b(appoint|schedule|book|visit)\b/.test(lower)) {
      reply = "Something in the next couple of weeks would be ideal if there’s availability.";
    } else if (/^(yes|yeah|yep|sure|ok|okay|maybe)\b/.test(lower.trim()) || lower.length < 28) {
      reply = "Yes please — go ahead and help me with the cardiology referral.";
    } else {
      reply = "Got it. Can you help me get that specialist referral sorted?";
    }

    // Think → type latency (best-practice chat feel)
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
    yield { type: "done", source: "local" };
  }

  async function* streamRemote({ messages, signal }) {
    yield { type: "status", phase: "thinking" };
    // Network RTT buffer before showing typing — avoids flicker on fast failures
    await sleep(350 + Math.random() * 250, signal);

    const labeled = messages.map((m) => {
      const text = bareContent(m.content);
      if (m.role === "user") {
        return { role: "user", content: `Lila (Care Team): ${text}` };
      }
      if (m.role === "assistant") {
        return { role: "assistant", content: `Riley (member): ${text}` };
      }
      return { role: m.role, content: text };
    });

    const body = {
      model: modelName(),
      stream: true,
      temperature: 0.6,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...labeled,
        {
          role: "system",
          content:
            "Reminder: reply as Riley the MEMBER only. Do not speak as Lila or offer Care Team services.",
        },
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
      yield { type: "done", source: "remote" };
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
          yield { type: "done", source: "remote" };
          return;
        }
        try {
          const json = JSON.parse(payload);
          const delta = json?.choices?.[0]?.delta || {};
          // Ignore reasoning-only deltas from some models
          const piece = delta.content;
          if (typeof piece === "string" && piece.length) {
            if (!sawContent) {
              sawContent = true;
            }
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
    yield { type: "done", source: "remote" };
  }

  /**
   * @param {{ messages: {role:string, content:string}[], signal?: AbortSignal }} opts
   */
  async function* generate(opts) {
    try {
      yield* streamRemote(opts);
    } catch (err) {
      if (err?.name === "AbortError") throw err;
      console.warn("[care-chat] remote engine failed, using local fallback", err);
      yield* localEngine(opts);
    }
  }

  const CLEANUP_PROMPT = `You rewrite unsent Care Team advocate chat drafts before they send.

Goals:
- Concise, professional, and warm — suitable for member messaging
- Keep the same meaning, facts, names, plan details, and questions
- Fix grammar and tighten wording; do not add new asks or offers
- Plain message text only — no quotes, labels, or preamble`;

  /** Light offline polish when the rewrite API is unavailable. */
  function localCleanup(text) {
    let out = String(text || "")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim();
    if (!out) return out;
    out = out.charAt(0).toUpperCase() + out.slice(1);
    if (!/[.!?]$/.test(out)) out += ".";
    // Soft tighten of common filler without inventing content
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
    SYSTEM_PROMPT,
    apiUrl,
    modelName,
  };
})(window);

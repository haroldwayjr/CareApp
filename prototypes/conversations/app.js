const esc = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => (reduced ? 0 : ms);
const RILEY = "assets/riley-smith.jpg";
const LILA = "assets/lila-george.jpg";

const TEAMS = [
  { id: "claims", name: "Claims Advocacy", color: "var(--team-claims)" },
  { id: "care", name: "Care Team", color: "var(--team-care)" },
  { id: "pharmacy", name: "Pharmacy & Benefits", color: "var(--team-pharmacy)" },
];

const FILTERS = {
  team: {
    title: "Team",
    options: [
      { id: "all", label: "All teams" },
      { id: "claims", label: "Claims Advocacy" },
      { id: "care", label: "Care Team" },
      { id: "pharmacy", label: "Pharmacy & Benefits" },
    ],
  },
  status: {
    title: "Status",
    options: [
      { id: "any", label: "Any status" },
      { id: "needs", label: "Needs reply" },
      { id: "progress", label: "In progress" },
      { id: "waiting", label: "Waiting on plan" },
    ],
  },
  sort: {
    title: "Sort by",
    options: [
      { id: "newest", label: "Newest first", chip: "Newest" },
      { id: "oldest", label: "Oldest first", chip: "Oldest" },
      { id: "name", label: "Name A–Z", chip: "Name A–Z" },
    ],
  },
};

const OWNERS = [
  { id: "Casey Nguyen", person: "casey", meta: "Available · 2 open tasks · Claims Advocacy" },
  { id: "Jordan Reyes", person: "jordan", meta: "Quarterback · 4 open tasks" },
  { id: "Morgan Diaz", person: "morgan", meta: "Covering Lee · through Mon, Nov 9" },
];

const STATUS_LABEL = {
  needs: "Needs reply",
  progress: "In progress",
  waiting: "Waiting on plan",
};

const people = {
  riley: { name: "Riley Smith", photo: RILEY },
  lila: { name: "Lila George", photo: LILA },
  jordan: { name: "Jordan Reyes", photo: "assets/jordan-reyes.jpg" },
  lee: { name: "Lee Martin", initials: "LM", av: "#efe4d6", fg: "#6a4b28" },
  ana: { name: "Ana Ruiz", initials: "AR", av: "#fde7ef", fg: "#7a3050" },
  marcus: { name: "Marcus Lee", initials: "ML", av: "#e5f3ea", fg: "#1d5a38" },
  dee: { name: "Dee Park", initials: "DP", av: "#f3e8ff", fg: "#5b2d91" },
  sam: { name: "Sam Ito", initials: "SI", av: "#e7f4f4", fg: "#0e5555" },
  priya: { name: "Priya Shah", initials: "PS", av: "#fff1e0", fg: "#8a4b12" },
  omar: { name: "Omar Hassan", initials: "OH", av: "#e8eefc", fg: "#24356e" },
  nina: { name: "Nina Cole", initials: "NC", av: "#fde8e4", fg: "#8a2e24" },
  casey: { name: "Casey Nguyen", photo: "assets/casey-nguyen.jpg" },
  morgan: { name: "Morgan Diaz", photo: "assets/morgan-diaz.jpg" },
  you: { name: "You", initials: "A", av: "#eceff3", fg: "#344054" },
};

function avatar(id, size) {
  const p = people[id];
  const sm = size === "sm" ? " sm" : "";
  if (p.photo) return `<img class="avatar${sm}" src="${p.photo}" alt="" />`;
  return `<span class="avatar-fallback${sm}" style="--av:${p.av};--av-fg:${p.fg}" aria-hidden="true">${p.initials}</span>`;
}

const defaultNote =
  "Referral record requested from Dr. Kim’s office Mon. Once it arrives, resubmit with the referral code. Update Jordan by Thu 3:00 PM.";

const threads = [
  {
    id: "denied",
    team: "claims",
    title: "Denied claim follow-up",
    person: "riley",
    status: "progress",
    when: "12m",
    age: 12,
    assigned: true,
    watching: true,
    unread: false,
    task: true,
    taskTitle: "Denied claim review",
    taskBadge: "Coverage needed",
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["With Riley", "Lila George"],
      ["Task", "Lee Martin"],
      ["Watching", "Jordan Reyes"],
    ],
    next: [
      ["Next step", "Lee reviews denial"],
      ["Expected update", "Thu · 3:00 PM"],
    ],
    conversation: [
      { type: "system", who: "Lila George", action: "joined the conversation", time: "Just now", detail: "Notified Jordan Reyes · quarterback" },
      { type: "date", label: "Today · 9:02 AM" },
      { type: "in", who: "riley", text: "My specialist visit claim got denied. Can someone help me sort it out?", time: "9:02 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "Hi Riley, I’m Jordan, your quarterback. This is already open as “Get my denied claim resolved,” so we’ll keep everything here — no need to start over.", time: "9:05 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "Our claims team is reviewing the denial now. I’ll update you by Thursday at 3:00 PM.", time: "9:08 AM" },
      { type: "in", who: "riley", text: "Yes, Dr. Kim referred me in September.", time: "9:24 AM" },
    ],
    handoff: [
      { type: "system", who: "Morgan Diaz", action: "is covering for Lee Martin", time: "Just now", detail: "Out until Mon, Nov 9 · Jordan stays quarterback" },
      { type: "date", label: "Today · 9:02 AM" },
      { type: "in", who: "riley", text: "My specialist visit claim got denied. Can someone help me sort it out?", time: "9:02 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "Hi Riley, I’m Jordan, your quarterback. This is already open as “Get my denied claim resolved,” so we’ll keep everything here — no need to start over.", time: "9:05 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "Lee is out, so Casey Nguyen is taking the referral follow-up. I’ll still update you by Thursday at 3:00 PM.", time: "9:08 AM" },
      { type: "join", time: "9:20 AM", text: "Lila George (Care Team advocate) joined the conversation" },
      { type: "out", who: "lila", role: "Care Team advocate", text: "Lee Martin is out, so I’m helping Jordan with the referral. Was Dr. Kim the doctor who referred you?", time: "9:21 AM" },
      { type: "in", who: "riley", text: "Yes, Dr. Kim referred me in September.", time: "9:24 AM" },
    ],
    history: [
      { title: "Referral requested", meta: "Lee Martin · Mon, Nov 2 · 4:10 PM" },
      { title: "Task opened", meta: "Jordan Reyes · Today · 9:05 AM" },
      { title: "Conversation started", meta: "Riley Smith · Today · 9:02 AM" },
    ],
    aside: {
      stretches: [
        {
          id: "denial",
          open: true,
          quote: {
            name: "Riley Smith",
            time: "9:02 AM",
            text: "My specialist visit claim got denied. Can someone help me sort it out?",
          },
          messages: [
            { who: "lila", text: "Lee’s out this week. I can stay with Riley, but the referral has to come from Claims Advocacy.", time: "9:14 AM" },
            { who: "you", text: "@Casey Nguyen can you take the referral? Lee is out this week.", time: "9:16 AM" },
            { who: "lila", text: "Yes. I’ll keep the member thread going until Casey picks it up.", time: "9:17 AM" },
          ],
        },
      ],
    },
  },
  {
    id: "oon",
    team: "claims",
    title: "Out-of-network bill",
    person: "ana",
    status: "needs",
    when: "1h",
    age: 60,
    assigned: true,
    watching: false,
    unread: true,
    conversation: [
      { type: "date", label: "Today · 8:14 AM" },
      { type: "in", who: "ana", text: "I got a bill from the imaging center and I thought this was in network. Can you look?", time: "8:14 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "I’m on it, Ana. I’ll check the facility against your plan and write back today.", time: "8:22 AM" },
    ],
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["Member", "Ana Ruiz"],
      ["Status", "Needs reply"],
      ["Updated", "1h ago"],
    ],
  },
  {
    id: "appeal",
    team: "claims",
    title: "Appeal status check",
    person: "marcus",
    status: "waiting",
    when: "Yesterday",
    age: 1500,
    assigned: true,
    watching: true,
    unread: false,
    conversation: [
      { type: "date", label: "Yesterday · 4:40 PM" },
      { type: "in", who: "marcus", text: "Any update on the appeal? The clinic asked me again this morning.", time: "4:40 PM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "The plan has the appeal. I’ll ping you when they post a decision — nothing needed from you today.", time: "4:52 PM" },
    ],
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["Member", "Marcus Lee"],
      ["Status", "Waiting on plan"],
      ["Updated", "Yesterday"],
    ],
  },
  {
    id: "benefits",
    team: "care",
    title: "Benefits question",
    person: "dee",
    status: "needs",
    when: "2m",
    age: 2,
    assigned: true,
    watching: false,
    unread: true,
    conversation: [
      { type: "date", label: "Today · 9:26 AM" },
      { type: "in", who: "dee", text: "Does my plan cover a nutrition visit, or do I need a referral first?", time: "9:26 AM" },
    ],
    details: [
      ["With member", "Lila George"],
      ["Member", "Dee Park"],
      ["Status", "Needs reply"],
      ["Updated", "2m ago"],
    ],
  },
  {
    id: "ccm",
    team: "care",
    title: "CCM follow-up",
    person: "sam",
    status: "progress",
    when: "Yesterday",
    age: 1600,
    assigned: true,
    watching: true,
    unread: false,
    conversation: [
      { type: "date", label: "Yesterday · 11:05 AM" },
      { type: "out", who: "lila", role: "Care Team advocate", text: "Checking in after your care-management call. How did the new inhaler feel overnight?", time: "11:05 AM" },
      { type: "in", who: "sam", text: "Better. I’ll keep the log and send it Friday.", time: "2:18 PM" },
    ],
    details: [
      ["Advocate", "Lila George"],
      ["Member", "Sam Ito"],
      ["Status", "In progress"],
      ["Updated", "Yesterday"],
    ],
  },
  {
    id: "refill",
    team: "pharmacy",
    title: "Specialty refill delay",
    person: "priya",
    status: "needs",
    when: "4m",
    age: 4,
    assigned: true,
    watching: false,
    unread: true,
    conversation: [
      { type: "date", label: "Today · 9:22 AM" },
      { type: "in", who: "priya", text: "The pharmacy says my specialty refill is held. I take it tonight — can someone call them?", time: "9:22 AM" },
    ],
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["Member", "Priya Shah"],
      ["Status", "Needs reply"],
      ["Updated", "4m ago"],
    ],
  },
  {
    id: "auth",
    team: "pharmacy",
    title: "Prior authorization",
    person: "omar",
    status: "progress",
    when: "3h",
    age: 180,
    assigned: true,
    watching: false,
    unread: true,
    conversation: [
      { type: "date", label: "Today · 6:40 AM" },
      { type: "out", who: "jordan", role: "Quarterback", text: "The prior auth is with the plan. I’ll update you when they respond.", time: "6:48 AM" },
      { type: "in", who: "omar", text: "Thank you. The doctor’s office said they faxed the notes yesterday.", time: "7:02 AM" },
    ],
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["Member", "Omar Hassan"],
      ["Status", "In progress"],
      ["Updated", "3h ago"],
    ],
  },
  {
    id: "formulary",
    team: "pharmacy",
    title: "Formulary exception",
    person: "nina",
    status: "waiting",
    when: "Mon",
    age: 2800,
    assigned: true,
    watching: true,
    unread: true,
    conversation: [
      { type: "date", label: "Monday · 3:12 PM" },
      { type: "in", who: "nina", text: "Is the exception still waiting on the plan? The copay they quoted is the brand price.", time: "3:12 PM" },
    ],
    details: [
      ["Quarterback", "Jordan Reyes"],
      ["Member", "Nina Cole"],
      ["Status", "Waiting on plan"],
      ["Updated", "Monday"],
    ],
  },
  {
    id: "lab",
    team: "care",
    title: "Lab result question",
    person: "casey",
    status: "needs",
    when: "25m",
    age: 25,
    assigned: false,
    watching: false,
    unread: false,
    conversation: [
      { type: "date", label: "Today · 9:01 AM" },
      { type: "in", who: "casey", text: "My lab posted and I don’t know which number I’m supposed to watch.", time: "9:01 AM" },
    ],
    details: [
      ["Team", "Care Team"],
      ["Member", "Casey Nguyen"],
      ["Status", "Needs reply"],
      ["Updated", "25m ago"],
    ],
  },
  {
    id: "idcard",
    team: "pharmacy",
    title: "ID card reprint",
    person: "sam",
    status: "waiting",
    when: "2d",
    age: 3200,
    assigned: false,
    watching: false,
    unread: false,
    conversation: [
      { type: "date", label: "Monday · 10:20 AM" },
      { type: "in", who: "sam", text: "Can I get a digital ID card? The pharmacy wouldn’t run the claim without it.", time: "10:20 AM" },
    ],
    details: [
      ["Team", "Pharmacy & Benefits"],
      ["Member", "Sam Ito"],
      ["Status", "Waiting on plan"],
      ["Updated", "2d ago"],
    ],
  },
];

const state = {
  scope: "assigned",
  team: "all",
  status: "any",
  sort: "newest",
  query: "",
  selectedId: null,
  view: "conversation",
  listLoading: false,
  stageLoading: false,
  menu: null,
  owner: "Casey Nguyen",
  note: defaultNote,
  reassigning: false,
  reassigned: false,
  alertDismissed: false,
  drafts: {},
  taskQuotes: {},
  flags: {},
  reminders: {},
  reply: null,
  panel: "details",
  asideFocus: null,
};

const STAFF = [
  { name: "Casey Nguyen", meta: "Claims Advocacy" },
  { name: "Lila George", meta: "Care Team" },
  { name: "Jordan Reyes", meta: "Quarterback" },
];

let listToken = 0;
let stageToken = 0;
let menuTimer = 0;
let panelClear = 0;

const $ = (sel) => document.querySelector(sel);
const live = (text) => {
  $("#live").textContent = text;
};

function chipLabel(kind) {
  const option = FILTERS[kind].options.find((item) => item.id === state[kind]);
  return option.chip || option.label;
}

function paintChips() {
  for (const kind of ["team", "status", "sort"]) {
    const label = $(`[data-chip="${kind}"]`);
    label.textContent = chipLabel(kind);
    const defaults = { team: "all", status: "any", sort: "newest" };
    $(`#chip-${kind}`).classList.toggle("is-set", state[kind] !== defaults[kind]);
  }
}

function paintMenus() {
  for (const [kind, spec] of Object.entries(FILTERS)) {
    const menu = $(`#menu-${kind}`);
    menu.innerHTML = `<p class="menu-title">${spec.title}</p>${spec.options
      .map(
        (option) => `<button class="menu-option" type="button" role="option" data-filter="${kind}" data-value="${option.id}" aria-selected="${state[kind] === option.id}">
          <span class="radio" aria-hidden="true"></span><span>${option.label}</span>
        </button>`,
      )
      .join("")}`;
  }
}

function visibleThreads() {
  const q = state.query.trim().toLowerCase();
  const list = threads.filter((thread) => {
    if (state.scope === "assigned" && !thread.assigned) return false;
    if (state.scope === "watching" && !thread.watching) return false;
    if (state.team !== "all" && thread.team !== state.team) return false;
    if (state.status !== "any" && thread.status !== state.status) return false;
    if (q) {
      const blob = `${thread.title} ${people[thread.person].name} ${thread.taskTitle || ""}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });
  const byAge = (a, b) => a.age - b.age;
  if (state.sort === "oldest") list.sort((a, b) => b.age - a.age);
  else if (state.sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
  else list.sort(byAge);
  return list;
}

function rowHTML(thread) {
  const taskMode = state.selectedId === thread.id && state.view !== "conversation" && thread.task;
  const title = taskMode ? thread.taskTitle : thread.title;
  const dot = thread.unread && !taskMode ? `<span class="unread-dot" aria-hidden="true"></span>` : "";
  const badge = taskMode ? `<span class="soft-badge">${thread.taskBadge}</span>` : "";
  const ownerMeta = state.reassigned ? "Casey Nguyen" : "Lee (OOO)";
  const meta = taskMode
    ? `${people[thread.person].name} · ${ownerMeta}`
    : `${people[thread.person].name} · ${STATUS_LABEL[thread.status]} · ${thread.when}`;
  return `<button class="thread${thread.unread ? " is-unread" : ""}${state.selectedId === thread.id ? " is-selected" : ""}" type="button" data-thread="${thread.id}" style="--accent:${TEAMS.find((team) => team.id === thread.team).color}">
    <span class="thread-copy">
      <span class="thread-title">${dot}<span class="thread-title-text">${title}</span></span>
      <span class="thread-meta">${meta}</span>
    </span>
    ${badge}
  </button>`;
}

function renderList() {
  const root = $("#thread-list");
  if (state.listLoading) {
    root.innerHTML = `<div class="list-skel" aria-busy="true">${Array.from({ length: 6 }, () => `<div class="skel-row"><div class="skeleton skel-line w-48"></div><div class="skeleton skel-line w-70"></div></div>`).join("")}</div>`;
    return;
  }
  const list = visibleThreads();
  if (!list.length) {
    root.innerHTML = `<p class="list-empty">No threads match these filters.</p>`;
    return;
  }
  if (state.sort === "name") {
    root.innerHTML = list.map(rowHTML).join("");
    return;
  }
  root.innerHTML = TEAMS.map((team) => {
    const rows = list.filter((thread) => thread.team === team.id);
    if (!rows.length) return "";
    const unread = rows.filter((thread) => thread.unread).length;
    return `<div class="team-group" style="--group:${team.color}">
      <div class="team-head"><span class="team-name">${team.name}</span>${unread ? `<span class="unread-badge">${unread}</span>` : ""}</div>
      ${rows.map(rowHTML).join("")}
    </div>`;
  }).join("");
}

function reloadList() {
  const token = ++listToken;
  state.listLoading = true;
  renderList();
  window.setTimeout(() => {
    if (token !== listToken) return;
    state.listLoading = false;
    const stillVisible = visibleThreads().some((thread) => thread.id === state.selectedId);
    if (state.selectedId && !stillVisible) {
      state.selectedId = null;
      state.view = "conversation";
      renderStage();
      renderPanel();
    }
    renderList();
  }, wait(280));
}

function glyph(name) {
  const paths = {
    ask: `<path d="M7.5 17.5 5.2 20v-3A6.8 6.8 0 1 1 12 18.2H7.5Z"/>`,
    copy: `<rect x="8.5" y="8.5" width="9" height="11" rx="1.5"/><path d="M7 15.5v-9A1.5 1.5 0 0 1 8.5 5H15"/>`,
    task: `<rect x="5" y="4.5" width="14" height="15" rx="2"/><path d="M8.5 9.5h7M8.5 13.5h7M8.5 17h4"/>`,
    check: `<path d="m6.5 12.5 3.2 3.2 7.3-7.4"/>`,
    reply: `<path d="M9 14 5 10l4-4"/><path d="M5 10h8a6 6 0 0 1 6 6v1"/>`,
    flag: `<path d="M6 20V5"/><path d="M6 5h11l-2.2 3.5L17 12H6"/>`,
    clock: `<circle cx="12" cy="12" r="7"/><path d="M12 8.5V12l2.5 2"/>`,
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
}

function actionButton(label, attrs, icon, done) {
  return `<button class="bubble-action${done ? " is-done" : ""}" type="button" ${attrs} aria-label="${esc(label)}">${glyph(done ? "check" : icon)}<span class="bubble-tip">${esc(label)}</span></button>`;
}

function messageMenu(item, side, person, stretch, thread) {
  if (state.view !== "conversation") return "";
  const hasTask = !!(thread && thread.task);
  const saved = hasTask && (state.taskQuotes[thread.id] || []).some((quote) => quote.text === item.text && quote.time === item.time);
  const taskAction = {
    label: saved ? "On the task" : "Add to task",
    attrs: "data-add-task",
    icon: saved ? "check" : "task",
    done: saved,
  };
  const actions = side === "in"
    ? [
        ...(stretch
          ? []
          : [{ label: "Ask the team", attrs: `data-ask-text="${esc(item.text)}" data-ask-time="${esc(item.time)}" data-ask-who="${esc(person.name)}"`, icon: "ask" }]),
        { label: "Reply", attrs: `data-reply data-reply-name="${esc(person.name)}"`, icon: "reply" },
        ...(hasTask ? [taskAction] : []),
        { label: "Copy", attrs: "data-copy-msg", icon: "copy" },
        { label: "Flag for handoff", attrs: "data-flag", icon: "flag" },
        ...(hasTask ? [{ label: "Remind me", attrs: "data-remind", icon: "clock" }] : []),
      ]
    : [
        { label: "Copy", attrs: "data-copy-msg", icon: "copy" },
        ...(hasTask ? [taskAction] : []),
      ];
  const buttons = actions.map((action) => actionButton(action.label, action.attrs, action.icon, action.done)).join("");
  return `<div class="bubble-menu" role="toolbar" aria-label="Message actions">${buttons}</div>`;
}

function bubble(item) {
  if (item.type === "system") {
    const detail = item.detail ? `<p class="event-detail">${esc(item.detail)}</p>` : "";
    return `<div class="event"><span class="event-dot" aria-hidden="true"></span><div><strong>${esc(item.who)}</strong> ${esc(item.action)}</div><time>${esc(item.time)}</time>${detail}</div>`;
  }
  if (item.type === "date") return `<div class="date-row">${esc(item.label)}</div>`;
  if (item.type === "join") return `<div class="join"><time>${esc(item.time)}</time><strong>${esc(item.text)}</strong></div>`;
  const side = item.type === "out" ? "out" : "in";
  const person = people[item.who];
  const role = side === "out" && item.role ? `<span class="role"> • ${esc(item.role)}</span>` : "";
  const face = avatar(item.who, "sm");
  const by = `<p class="msg-by">${side === "in" ? face : ""}<span class="msg-name">${esc(person.name)}${role}</span>${side === "out" ? face : ""}</p>`;
  const thread = threads.find((entry) => entry.id === state.selectedId);
  const stretch = side === "in" && state.view === "conversation" && thread
    ? [...ensureAside(thread).stretches].reverse().find((entry) => entry.quote && entry.quote.text === item.text && entry.quote.time === item.time)
    : null;
  const linked = stretch ? `<button class="in-aside" type="button" data-open-stretch="${esc(stretch.id)}">In team chat</button>` : "";
  const quoted = item.reply ? `<span class="bubble-reply"><span>${esc(item.reply.name)}</span><span>${esc(item.reply.text)}</span></span>` : "";
  return `<div class="msg ${side}" data-msg-name="${esc(person.name)}" data-msg-time="${esc(item.time)}"><div class="msg-col">${by}<div class="bubble-wrap"><p class="bubble">${quoted}${esc(item.text)}</p></div><div class="msg-meta"><time>${esc(item.time)}</time>${linked}${messageMenu(item, side, person, stretch, thread)}</div></div></div>`;
}

function taskView(thread) {
  if (!thread.task) {
    return `<div class="quiet-empty task-empty">
      <svg class="empty-art task-empty-art" viewBox="0 0 220 180" aria-hidden="true">
        <defs>
          <linearGradient id="task-empty-front" x1="0.1" y1="0" x2="0.8" y2="1">
            <stop offset="0" stop-color="#c9d8ff"/>
            <stop offset="0.55" stop-color="#8aa6f4"/>
            <stop offset="1" stop-color="#5d7fe6"/>
          </linearGradient>
          <linearGradient id="task-empty-back" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stop-color="#f7f9ff"/>
            <stop offset="1" stop-color="#d7e4ff"/>
          </linearGradient>
        </defs>
        <g class="task-empty-back">
          <rect x="62" y="22" width="108" height="128" rx="22" fill="url(#task-empty-back)"/>
        </g>
        <g class="task-empty-front">
          <rect x="42" y="46" width="128" height="104" rx="22" fill="url(#task-empty-front)"/>
          <circle cx="74" cy="78" r="11" fill="none" stroke="#fff" stroke-width="2.5"/>
          <rect x="96" y="72" width="50" height="7" rx="3.5" fill="#fff"/>
          <rect x="62" y="104" width="88" height="7" rx="3.5" fill="#fff" opacity="0.62"/>
          <rect x="62" y="120" width="60" height="7" rx="3.5" fill="#fff" opacity="0.4"/>
        </g>
      </svg>
      <strong>No open task</strong>
      <p>This conversation doesn’t have a task yet.</p>
    </div>`;
  }
  const owner = state.reassigned ? "Casey Nguyen" : "Lee Martin · Out of office";
  const activity = [
    ...((state.reminders[thread.id] || []).map((quote) => ({
      title: "Reminder",
      meta: "You · Thu, Nov 5 · 3:00 PM",
      quote: quote.text,
    }))),
    ...((state.flags[thread.id] || []).map((quote) => ({
      title: "Flagged for handoff",
      meta: `${quote.name} · ${quote.time}`,
      quote: quote.text,
    }))),
    ...((state.taskQuotes[thread.id] || []).map((quote) => ({
      title: "Message added",
      meta: `${quote.name} · ${quote.time}`,
      quote: quote.text,
    }))),
    ...(state.reassigned ? [{ title: "Reassigned to Casey Nguyen", meta: "You · Just now" }] : []),
    ...(thread.history || []),
  ];
  return `<div class="task-view">
    <article class="task-card">
      <header class="task-card-head">
        <div>
          <h3>${esc(thread.taskTitle)}</h3>
          <p class="task-member">${esc(people[thread.person].name)} · CalPERS PPO</p>
        </div>
        ${thread.taskBadge ? `<span class="soft-badge">${esc(thread.taskBadge)}</span>` : ""}
      </header>
      ${kv([
        ["Linked need", "Get my denied claim resolved"],
        ["Claim", "CLM-48213 · Cardiology · Oct 14"],
        ["Denial reason", "No referral on file"],
        ["Owner", owner],
        ["Due", "Thu, Nov 5 · 3:00 PM"],
      ])}
    </article>
    <section>
      <p class="panel-section-label">Last update</p>
      <div class="update-card"><p class="who">Lee Martin · Mon, Nov 2 · 4:10 PM</p><p>Denial reason is “no referral on file.” Requested Dr. Kim’s referral record from the provider office; waiting on fax. Next: resubmit with the referral code once it arrives.</p></div>
    </section>
    <section>
      <p class="panel-section-label">Activity</p>
      <div class="history-list">${activity.map((item) => `<article class="history-item"><strong>${esc(item.title)}</strong><span>${esc(item.meta)}</span>${item.quote ? `<p class="history-quote">${esc(item.quote)}</p>` : ""}</article>`).join("")}</div>
    </section>
  </div>`;
}

function transcriptFor(thread) {
  if (state.view === "task") return taskView(thread);
  const extra = state.drafts[thread.id] || [];
  const items = [...thread.conversation, ...extra];
  if (!items.length) {
    return `<div class="quiet-empty">
      <svg class="empty-art" viewBox="0 0 220 180" aria-hidden="true">
        <defs>
          <linearGradient id="convo-empty-front" x1="0.1" y1="0" x2="0.85" y2="1">
            <stop offset="0" stop-color="#c9d8ff"/>
            <stop offset="0.5" stop-color="#8aa6f4"/>
            <stop offset="1" stop-color="#5d7fe6"/>
          </linearGradient>
          <linearGradient id="convo-empty-back" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stop-color="#f7f9ff"/>
            <stop offset="1" stop-color="#d7e4ff"/>
          </linearGradient>
        </defs>
        <g transform="rotate(-8 140 52)">
          <path fill="url(#convo-empty-back)" d="M86 16h76c11 0 20 9 20 20v32c0 11-9 20-20 20h-22l-14 14v-14H86c-11 0-20-9-20-20V36c0-11 9-20 20-20z"/>
        </g>
        <path fill="url(#convo-empty-front)" d="M34 70h108c13 0 24 11 24 24v36c0 13-11 24-24 24H86l-18 16v-16H34c-13 0-24-11-24-24V94c0-13 11-24 24-24z"/>
        <circle cx="66" cy="112" r="5.5" fill="#fff"/>
        <circle cx="88" cy="112" r="5.5" fill="#fff" opacity="0.72"/>
        <circle cx="110" cy="112" r="5.5" fill="#fff" opacity="0.45"/>
      </svg>
      <strong>New conversation</strong>
      <p>Write a message to start the thread.</p>
    </div>`;
  }
  return items.map(bubble).join("");
}

function tabs(thread) {
  const taskLabel = thread.task ? `Task <span class="quiet">· 1 open</span>` : "Task";
  return `<div class="tabs" role="tablist">
    <button class="tab" type="button" role="tab" data-view="conversation" aria-selected="${state.view === "conversation"}">Conversation</button>
    <button class="tab" type="button" role="tab" data-view="task" aria-selected="${state.view === "task"}">${taskLabel}</button>
  </div>`;
}

function stageSkeleton() {
  return `<div class="stage-skel" aria-busy="true" aria-label="Loading conversation">
    <div class="skeleton skel-line w-32"></div>
    <div class="skeleton skel-bubble"></div>
    <div class="skeleton skel-bubble right"></div>
    <div class="skeleton skel-bubble right short"></div>
  </div>`;
}

function renderStage() {
  const root = $("#stage");
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread) {
    const firstLoad = document.documentElement.matches(".is-page-boot, .is-page-ready");
    root.innerHTML = `<div class="empty${firstLoad ? " is-first-load" : ""}">
      <div class="empty-nothing" aria-hidden="true">
        <svg class="empty-illo" width="134.167" height="165" viewBox="0 0 134.167 165" fill="none" aria-hidden="true">
          <path class="illo-doc" d="M63.2493 0.330285C57.9613 -1.05175 52.5315 2.02977 51.1215 7.2131L26.1703 98.9388C24.7603 104.123 27.9041 109.444 33.1922 110.826L101.082 128.57C106.37 129.952 111.799 126.871 113.21 121.687L132.091 52.2751C132.748 49.8608 132.43 47.2913 131.204 45.1007L115.534 17.1048C114.231 14.7782 112.015 13.0753 109.399 12.3916L63.2493 0.330285Z" fill="url(#empty-doc)"/>
          <path class="illo-folder" d="M123.575 75.0941H56.4912C55.537 75.0918 54.6227 74.7187 53.9491 74.0567L44.4868 64.7203C43.5185 63.6712 42.344 62.8241 41.0336 62.23C39.7232 61.6358 38.3038 61.3067 36.8605 61.2624H12.6399C9.2876 61.2624 6.07259 62.5667 3.70214 64.8882C1.3317 67.2098 0 70.3586 0 73.6418V152.621C0 155.904 1.3317 159.053 3.70214 161.374C6.07259 163.696 9.2876 165 12.6399 165H121.527C124.879 165 128.094 163.696 130.465 161.374C132.835 159.053 134.167 155.904 134.167 152.621V85.4679C134.167 82.7166 133.051 80.078 131.064 78.1325C129.078 76.187 126.384 75.0941 123.575 75.0941Z" fill="url(#empty-folder)"/>
          <defs>
            <linearGradient id="empty-doc" x1="78.9659" y1="-0.558957" x2="78.9616" y2="129.524" gradientUnits="userSpaceOnUse">
              <stop stop-color="#81ADF6" stop-opacity="0.4"/>
              <stop offset="1" stop-color="#A6C8FF"/>
            </linearGradient>
            <linearGradient id="empty-folder" x1="66.8039" y1="164.917" x2="66.8039" y2="60.8431" gradientUnits="userSpaceOnUse">
              <stop stop-color="#578EE8" stop-opacity="0.5"/>
              <stop offset="1" stop-color="#0012E7" stop-opacity="0.6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h2>Select a conversation</h2>
      <p>Choose a thread to open it here.</p>
    </div>`;
    return;
  }
  const onTask = state.view !== "conversation";
  const sub = onTask ? (thread.task ? thread.taskTitle : "Task") : thread.title;
  const body = state.stageLoading
    ? stageSkeleton()
    : `<div class="stage-body rise">${transcriptFor(thread)}</div>${state.view === "conversation" ? composerHTML(thread) : ""}`;
  root.innerHTML = `<div class="thread-top">${avatar(thread.person)}<div><h2>${people[thread.person].name}</h2><p class="sub${onTask ? " is-task" : ""}">${sub}</p></div></div>${tabs(thread)}${body}`;
  const scroller = root.querySelector(".stage-body");
  if (scroller && state.view === "conversation") scroller.scrollTop = scroller.scrollHeight;
  const field = root.querySelector("textarea");
  if (field) {
    field.addEventListener("input", () => {
      const send = root.querySelector(".send");
      const filled = !!field.value.trim();
      send.disabled = !filled;
      field.closest(".composer")?.classList.toggle("is-filled", filled);
      field.style.height = "auto";
      field.style.height = `${Math.min(field.scrollHeight, 120)}px`;
    });
  }
}

function composerHTML(thread) {
  const waiting = thread?.status === "waiting" ? `<p class="composer-note">Waiting on the plan.</p>` : "";
  const reply = state.reply
    ? `<div class="reply-chip"><span class="ask-bar" aria-hidden="true"></span><span class="reply-copy"><span class="reply-name">${esc(state.reply.name)}</span><span class="reply-text">${esc(state.reply.text)}</span></span><button class="icon-button reply-clear" type="button" data-clear-reply aria-label="Remove reply">${closeIcon()}</button></div>`
    : "";
  return `${waiting}<form class="composer" id="composer">${reply}
    <button class="icon-button" type="button" aria-label="Add" data-add>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>
    </button>
    <textarea rows="1" placeholder="Write a message…" aria-label="Message"></textarea>
    <div class="composer-tools">
      <button class="send" type="submit" disabled aria-label="Send">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14"/><path d="m13 6 6 6-6 6"/></svg>
      </button>
    </div>
  </form>`;
}

function kv(rows) {
  return rows.map(([label, value]) => `<div class="kv"><dt>${label}</dt><dd>${value}</dd></div>`).join("");
}

function panelSkeleton() {
  return `<div class="panel-skel" aria-busy="true"><div class="skeleton skel-line w-40"></div><div class="skeleton skel-block"></div><div class="skeleton skel-line w-88"></div><div class="skeleton skel-line w-70"></div><div class="skeleton skel-line w-56"></div></div>`;
}

function alertHTML(tone, title, body) {
  if (state.alertDismissed) return "";
  const icon = tone === "success"
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor"/><path d="m8 12.2 2.4 2.4 5.2-5.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor"/><path d="M12 8v5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16.2" r="1" fill="#fff"/></svg>`;
  return `<div class="alert${tone === "success" ? " success" : ""}" role="status">
    <span class="alert-icon">${icon}</span>
    <div class="alert-copy"><strong>${title}</strong><p>${body}</p></div>
    <button class="alert-close" type="button" data-dismiss-alert aria-label="Dismiss">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>
    </button>
  </div>`;
}

function reviewPanel() {
  const alert = state.reassigned
    ? alertHTML("success", "Casey Nguyen owns this task", "Jordan stays quarterback. Riley will still hear from you by Thursday at 3:00 PM.")
    : alertHTML("warning", "Lee Martin is out of office", "Status changed today at 8:00 AM · back Mon, Nov 9. 1 open task needs a new owner before it’s due Thu at 3:00 PM.");
  const selected = OWNERS.find((item) => item.id === state.owner);
  const first = state.owner.split(" ")[0];
  return `${alert}
    <div class="field menu-root" data-menu-root="owner">
      <span class="field-label">Assign to someone <em>*</em></span>
      <button class="select-trigger" id="owner-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="menu-owner">
        ${avatar(selected.person, "sm")}
        <span class="option-copy"><span>${selected.id}</span><span class="option-meta">${selected.meta}</span></span>
        <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="menu" id="menu-owner" role="listbox" aria-label="Assign to someone" hidden>
        ${OWNERS.map(
          (item) => `<button class="menu-option" type="button" role="option" data-owner="${item.id}" aria-selected="${item.id === state.owner}">
            <span class="radio" aria-hidden="true"></span>
            ${avatar(item.person, "sm")}
            <span class="option-copy"><span>${item.id}</span><span class="option-meta">${item.meta}</span></span>
          </button>`,
        ).join("")}
      </div>
    </div>
    <label class="field"><span class="field-label">Handoff note for ${first}</span>
      <textarea class="note" id="handoff-note">${esc(state.note)}</textarea>
    </label>
    <div class="panel-actions">
      <button class="button button-secondary" type="button" data-cancel>Cancel</button>
      <button class="button button-primary${state.reassigning ? " is-loading" : ""}" type="button" id="reassign" ${state.reassigning || state.reassigned || !state.note.trim() ? "disabled" : ""}>
        ${state.reassigning ? `<span class="button-spinner" aria-hidden="true"></span> Reassigning` : state.reassigned ? "Reassigned" : `Reassign to ${first}`}
      </button>
    </div>`;
}

function ensureAside(thread) {
  if (!thread.aside) thread.aside = { stretches: [] };
  if (!thread.aside.stretches) {
    const legacy = thread.aside;
    thread.aside = {
      stretches: legacy.quote || (legacy.messages && legacy.messages.length)
        ? [{ id: "stretch-legacy", open: Boolean(legacy.open), quote: legacy.quote || null, messages: legacy.messages || [] }]
        : [],
    };
  }
  return thread.aside;
}

function openStretchCount(aside) {
  return aside.stretches.filter((stretch) => stretch.open).length;
}

function activeStretch(aside, openOnly) {
  if (state.asideFocus) {
    const focused = aside.stretches.find((stretch) => stretch.id === state.asideFocus);
    if (focused && (!openOnly || focused.open)) return focused;
  }
  const open = [...aside.stretches].reverse().find((stretch) => stretch.open);
  if (open) return open;
  if (openOnly) return null;
  return aside.stretches[aside.stretches.length - 1] || null;
}

function asideScope(thread) {
  if (thread.id === "denied") return "Care Team · Claims Advocacy";
  const team = TEAMS.find((item) => item.id === thread.team);
  return team ? team.name : "This team";
}

function richText(text) {
  let html = esc(text);
  const names = STAFF.map((person) => person.name).sort((a, b) => b.length - a.length);
  for (const name of names) {
    html = html.replaceAll(`@${esc(name)}`, `<span class="mention">@${esc(name)}</span>`);
  }
  return html;
}

function lockIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="11" width="12" height="9" rx="1.5"/><path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11"/></svg>`;
}

function stretchHTML(stretch) {
  const quote = stretch.quote
    ? `<article class="ask-quote"><span class="ask-bar" aria-hidden="true"></span><div><p class="ask-label">Ask the team${stretch.open ? "" : ` <span class="resolved">· Resolved</span>`}</p><p class="ask-body">${esc(stretch.quote.text)}</p><p class="ask-meta">${esc(stretch.quote.name)} · ${esc(stretch.quote.time)}</p></div></article>`
    : "";
  const messages = stretch.messages.map((item) => {
    if (item.type === "note") return `<p class="aside-note">${esc(item.text)}</p>`;
    const own = item.who === "you";
    const name = own ? "You" : people[item.who].name;
    return `<article class="aside-msg${own ? " own" : ""}"><p class="who">${esc(name)} · ${esc(item.time)}</p><p class="aside-bubble">${richText(item.text)}</p></article>`;
  }).join("");
  return `<section class="aside-stretch${stretch.open ? "" : " is-resolved"}" data-stretch="${esc(stretch.id)}">${quote}${messages}</section>`;
}

function teamPanel(thread) {
  const aside = ensureAside(thread);
  const member = people[thread.person].name.split(" ")[0];
  const open = openStretchCount(aside) > 0;
  const current = activeStretch(aside, true) || activeStretch(aside, false);
  const placeholder = current && current.quote ? "Write a reply to the team..." : "Message the team";
  const body = aside.stretches.length
    ? aside.stretches.map(stretchHTML).join("")
    : `<p class="aside-note">No team messages yet. Ask the team from a member message.</p>`;
  return `<div class="panel-card rise team-panel">
    <div class="panel-head">
      <h2>Team chat</h2>
      <div class="panel-head-actions">
        <button class="button button-secondary button-compact" type="button" id="resolve-aside" ${open ? "" : "disabled"}>${open ? "Resolve" : "Resolved"}</button>
        <button class="icon-button" type="button" data-close aria-label="Close">${closeIcon()}</button>
      </div>
    </div>
    <div class="panel-scroll team-log">
      <div class="privacy-badge">${lockIcon()}<span><span class="privacy-line">Not visible to ${esc(member)}</span><span class="privacy-scope">${esc(asideScope(thread))}</span></span></div>
      ${body}
    </div>
    <form class="composer team-composer" id="team-composer">
      <div class="mention-menu" id="mention-menu" role="listbox" aria-label="Mention a teammate" hidden></div>
      <button class="icon-button" type="button" aria-label="Add for the team" data-aside-tool="add">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>
      </button>
      <textarea rows="1" placeholder="${esc(placeholder)}" aria-label="Message the team"></textarea>
      <div class="composer-tools">
        <button class="send" type="submit" disabled aria-label="Send to the team">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14"/><path d="m13 6 6 6-6 6"/></svg>
        </button>
      </div>
    </form>
  </div>`;
}

function paintRail(thread) {
  const rail = $("#tool-rail");
  const workspace = $("#workspace");
  rail.hidden = !thread;
  workspace.classList.toggle("has-thread", Boolean(thread));
  rail.querySelectorAll("[data-rail]").forEach((button) => {
    const on = Boolean(thread) && state.panel === button.dataset.rail;
    button.classList.toggle("is-active", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const team = rail.querySelector('[data-rail="team"]');
  if (!team) return;
  const count = thread ? openStretchCount(ensureAside(thread)) : 0;
  team.classList.toggle("has-count", count > 0);
  const tip = team.querySelector(".rail-tip");
  if (tip) tip.textContent = count ? `Team chat · ${count}` : "Team chat";
  team.setAttribute("aria-label", count ? `Team chat, ${count} open` : "Team chat");
}

function selectRail(id) {
  if (!state.selectedId || id === "chart") return;
  state.panel = state.panel === id ? null : id;
  renderPanel();
  live(state.panel === "team" ? "Team chat" : state.panel === "details" ? "Details" : "Panel closed");
}

function dismissPanel() {
  if (!state.panel) return;
  state.panel = null;
  renderPanel();
  live("Panel closed");
}

function renderPanel() {
  const workspace = $("#workspace");
  const panel = $("#panel");
  const thread = threads.find((item) => item.id === state.selectedId);
  paintRail(thread);
  if (!thread || !state.panel) {
    workspace.classList.remove("has-panel");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = "";
    return;
  }
  workspace.classList.add("has-panel");
  panel.setAttribute("aria-hidden", "false");
  const review = state.view !== "conversation" && thread.task;
  const team = state.panel === "team";
  if (team && !state.stageLoading) {
    panel.innerHTML = teamPanel(thread);
    const log = panel.querySelector(".team-log");
    const focus = state.asideFocus && panel.querySelector(`[data-stretch="${CSS.escape(state.asideFocus)}"]`);
    if (focus) focus.scrollIntoView({ block: "nearest" });
    else if (log) log.scrollTop = log.scrollHeight;
    bindTeamComposer();
    return;
  }
  const title = review ? "Denied claim review" : "Details";
  const body = state.stageLoading
    ? panelSkeleton()
    : review
      ? reviewPanel(thread)
      : `${kv(thread.details)}${thread.next ? `<p class="panel-section-label">Next step</p>${kv(thread.next)}` : ""}`;
  panel.innerHTML = `<div class="panel-card rise"><div class="panel-head"><h2>${title}</h2><button class="icon-button" type="button" data-close aria-label="Close">${closeIcon()}</button></div><div class="panel-scroll">${body}</div></div>`;
  const note = $("#handoff-note");
  if (note) {
    note.addEventListener("input", () => {
      state.note = note.value;
      const button = $("#reassign");
      if (!state.reassigning && !state.reassigned) button.disabled = !note.value.trim();
    });
  }
}

function bindTeamComposer() {
  const field = $("#team-composer textarea");
  if (!field) return;
  const sync = () => {
    const send = $("#team-composer .send");
    const filled = !!field.value.trim();
    if (send) send.disabled = !filled;
    field.closest(".composer")?.classList.toggle("is-filled", filled);
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 120)}px`;
    paintMentions(mentionQuery(field.value, field.selectionStart));
  };
  field.addEventListener("input", sync);
  field.addEventListener("keyup", sync);
  field.addEventListener("click", sync);
  $("#mention-menu")?.addEventListener("mousedown", (event) => event.preventDefault());
}

function mentionQuery(value, cursor) {
  const match = value.slice(0, cursor).match(/@([A-Za-z ]*)$/);
  return match ? match[1] : null;
}

function paintMentions(query) {
  const menu = $("#mention-menu");
  if (!menu) return;
  if (query == null) {
    menu.hidden = true;
    return;
  }
  const items = STAFF.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  if (!items.length) {
    menu.hidden = true;
    return;
  }
  menu.hidden = false;
  menu.innerHTML = items.map((person) => `<button class="mention-option" type="button" role="option" data-mention="${esc(person.name)}"><strong>${esc(person.name)}</strong><span>${esc(person.meta)}</span></button>`).join("");
}

function insertMention(name) {
  const field = $("#team-composer textarea");
  if (!field) return;
  const cursor = field.selectionStart;
  const next = field.value.replace(/@([A-Za-z ]*)$/, `@${name} `);
  const before = field.value.slice(0, cursor);
  const rewritten = before.replace(/@([A-Za-z ]*)$/, `@${name} `) + field.value.slice(cursor);
  field.value = rewritten || next;
  const at = field.value.indexOf(`@${name} `);
  const pos = at === -1 ? field.value.length : at + name.length + 2;
  field.focus();
  field.setSelectionRange(pos, pos);
  const send = $("#team-composer .send");
  const filled = !!field.value.trim();
  if (send) send.disabled = !filled;
  field.closest(".composer")?.classList.toggle("is-filled", filled);
  paintMentions(null);
}

function openAside(quote, focusId) {
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread) return;
  const aside = ensureAside(thread);
  if (quote) {
    let stretch = aside.stretches.find((entry) => entry.quote && entry.quote.text === quote.text && entry.quote.time === quote.time);
    if (!stretch) {
      stretch = { id: `stretch-${Date.now()}`, open: true, quote, messages: [] };
      aside.stretches.push(stretch);
    } else {
      stretch.open = true;
    }
    state.asideFocus = stretch.id;
  } else if (focusId) {
    state.asideFocus = focusId;
  }
  state.panel = "team";
  state.stageLoading = false;
  renderList();
  renderStage();
  renderPanel();
  live(quote ? "Asked the team" : "Team chat");
}

function resolveAside() {
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread) return;
  const aside = ensureAside(thread);
  const stretch = activeStretch(aside, true);
  if (!stretch) return;
  stretch.open = false;
  stretch.messages.push({ type: "note", text: "Resolved. The task is still open." });
  const next = [...aside.stretches].reverse().find((entry) => entry.open);
  state.asideFocus = next ? next.id : stretch.id;
  renderStage();
  renderPanel();
  live(next ? "Stretch resolved" : "Team aside resolved");
}

function targetStretch(aside) {
  let stretch = activeStretch(aside, true);
  if (stretch) return stretch;
  stretch = activeStretch(aside, false);
  if (stretch) {
    stretch.open = true;
    return stretch;
  }
  stretch = { id: `stretch-${Date.now()}`, open: true, quote: null, messages: [] };
  aside.stretches.push(stretch);
  return stretch;
}

function sendAside(form) {
  const field = form.querySelector("textarea");
  const text = field.value.trim();
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!text || !thread) return;
  const aside = ensureAside(thread);
  const stretch = targetStretch(aside);
  state.asideFocus = stretch.id;
  stretch.messages.push({ who: "you", text, time: "Just now" });
  const mentioned = STAFF.find((person) => text.includes(`@${person.name}`));
  if (mentioned) stretch.messages.push({ type: "note", text: `${mentioned.name} notified` });
  renderStage();
  renderPanel();
  $("#team-composer textarea")?.focus();
  live(mentioned ? `${mentioned.name} notified` : "Sent to the team");
}

function flashAction(button, label, keep) {
  live(label);
  const tip = button.querySelector(".bubble-tip");
  if (!tip) return;
  const previous = tip.dataset.label || tip.textContent;
  tip.dataset.label = keep ? label : previous;
  tip.textContent = label;
  button.classList.add("is-done");
  window.setTimeout(() => {
    if (keep) return;
    button.classList.remove("is-done");
    tip.textContent = tip.dataset.label;
  }, 1400);
}

function quoteFromMessage(node) {
  const msg = node.closest(".msg");
  return {
    name: msg.dataset.msgName,
    time: msg.dataset.msgTime,
    text: msg.querySelector(".bubble").textContent,
  };
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

function copyMessage(button) {
  const text = button.closest(".msg").querySelector(".bubble").textContent;
  const done = () => flashAction(button, "Copied");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => {
      fallbackCopy(text);
      done();
    });
    return;
  }
  fallbackCopy(text);
  done();
}

function addMessageToTask(button) {
  const thread = threads.find((entry) => entry.id === state.selectedId);
  if (!thread || !thread.task) return;
  const quote = quoteFromMessage(button);
  const list = state.taskQuotes[thread.id] || (state.taskQuotes[thread.id] = []);
  if (!list.some((item) => item.text === quote.text && item.time === quote.time)) list.unshift(quote);
  button.innerHTML = `${glyph("check")}<span class="bubble-tip">Added to the task</span>`;
  button.setAttribute("aria-label", "On the task");
  flashAction(button, "Added to the task", true);
}

function replyToMessage(button) {
  const quote = quoteFromMessage(button);
  state.reply = { name: button.dataset.replyName || quote.name, time: quote.time, text: quote.text };
  renderStage();
  $("#composer textarea")?.focus();
  live(`Replying to ${state.reply.name}`);
}

function remember(bucket, quote, label) {
  const thread = threads.find((entry) => entry.id === state.selectedId);
  if (!thread) return;
  const list = state[bucket][thread.id] || (state[bucket][thread.id] = []);
  if (!list.some((item) => item.text === quote.text && item.time === quote.time)) list.unshift(quote);
  live(label);
}

function addAsideTool() {
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread) return;
  const aside = ensureAside(thread);
  const stretch = targetStretch(aside);
  state.asideFocus = stretch.id;
  stretch.messages.push({ type: "note", text: "You added a note for the team" });
  renderStage();
  renderPanel();
}

function closeIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>`;
}

function openThread(id) {
  const thread = threads.find((item) => item.id === id);
  if (thread?.unread) {
    thread.unread = false;
    renderList();
  }
  if (state.selectedId === id && state.view === "conversation" && !state.stageLoading) return;
  closeMenu(true);
  const token = ++stageToken;
  panelClear += 1;
  state.selectedId = id;
  state.view = "conversation";
  state.panel = "details";
  state.asideFocus = null;
  state.stageLoading = true;
  renderList();
  renderStage();
  renderPanel();
  live("Loading conversation");
  window.setTimeout(() => {
    if (token !== stageToken) return;
    state.stageLoading = false;
    renderStage();
    renderPanel();
    live(`Opened ${people[threads.find((item) => item.id === id).person].name}`);
  }, wait(480));
}

function setView(view) {
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread || state.view === view) return;
  closeMenu(true);
  stageToken += 1;
  state.view = view;
  state.stageLoading = false;
  renderList();
  renderStage();
  renderPanel();
  live(view === "conversation" ? "Conversation" : thread.task ? thread.taskTitle : "No open task");
}

function closeConversation() {
  closeMenu(true);
  stageToken += 1;
  const token = ++panelClear;
  state.selectedId = null;
  state.view = "conversation";
  state.stageLoading = false;
  state.panel = null;
  $("#workspace").classList.remove("has-panel");
  $("#panel").setAttribute("aria-hidden", "true");
  paintRail(null);
  renderList();
  renderStage();
  window.setTimeout(() => {
    if (token !== panelClear || state.selectedId) return;
    $("#panel").innerHTML = "";
  }, wait(220));
}

/** View switcher thumb — slide + resize to the checked segment. */
function layoutScopeThumb(animate = true) {
  const root = document.querySelector(".scope");
  const thumb = root?.querySelector(".scope-thumb");
  const active = root?.querySelector('[aria-checked="true"]');
  if (!root || !thumb || !active) return;
  const instant = !animate || reduced;
  if (instant) thumb.classList.add("is-instant");
  const rootRect = root.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const borderLeft = parseFloat(getComputedStyle(root).borderLeftWidth) || 0;
  const borderTop = parseFloat(getComputedStyle(root).borderTopWidth) || 0;
  thumb.style.width = `${Math.round(activeRect.width)}px`;
  thumb.style.height = `${Math.round(activeRect.height)}px`;
  thumb.style.transform = `translate(${Math.round(activeRect.left - rootRect.left - borderLeft)}px, ${Math.round(activeRect.top - rootRect.top - borderTop)}px)`;
  if (instant) {
    void thumb.offsetWidth;
    thumb.classList.remove("is-instant");
  }
}

function setScope(scope) {
  if (state.scope === scope) return;
  state.scope = scope;
  document.querySelectorAll("[data-scope]").forEach((button) => {
    button.setAttribute("aria-checked", button.dataset.scope === scope ? "true" : "false");
  });
  layoutScopeThumb(true);
  live(scope === "all" ? "All conversations" : scope === "assigned" ? "Assigned to you" : "Watching");
  reloadList();
}

function openMenu(id) {
  if (state.menu === id) {
    closeMenu();
    return;
  }
  if (state.menu) closeMenu(true);
  state.menu = id;
  const menu = $(`#menu-${id}`);
  const trigger = document.querySelector(`[aria-controls="menu-${id}"]`);
  menu.hidden = false;
  menu.classList.remove("is-leaving");
  if (trigger) trigger.setAttribute("aria-expanded", "true");
  const selected = menu.querySelector('[aria-selected="true"]') || menu.querySelector("button, p");
  if (selected && selected.focus) selected.focus();
}

function closeMenu(immediate) {
  const id = state.menu;
  if (!id) return;
  const menu = $(`#menu-${id}`);
  const trigger = document.querySelector(`[aria-controls="menu-${id}"]`);
  state.menu = null;
  if (trigger) trigger.setAttribute("aria-expanded", "false");
  if (!menu || menu.hidden) return;
  if (immediate || reduced) {
    menu.hidden = true;
    menu.classList.remove("is-leaving");
    return;
  }
  menu.classList.add("is-leaving");
  window.clearTimeout(menuTimer);
  menuTimer = window.setTimeout(() => {
    menu.hidden = true;
    menu.classList.remove("is-leaving");
  }, 120);
}

function chooseFilter(kind, value) {
  if (state[kind] === value) {
    closeMenu();
    return;
  }
  state[kind] = value;
  paintChips();
  paintMenus();
  closeMenu();
  reloadList();
}

function sendMessage(form) {
  const field = form.querySelector("textarea");
  const text = field.value.trim();
  if (!text || !state.selectedId) return;
  const thread = threads.find((item) => item.id === state.selectedId);
  const item = { type: "out", who: "you", text, time: "Just now", reply: state.reply };
  state.reply = null;
  if (state.view === "task" && thread.handoff) thread.handoff.push(item);
  else {
    state.drafts[thread.id] = state.drafts[thread.id] || [];
    state.drafts[thread.id].push(item);
  }
  if (thread.unread) {
    thread.unread = false;
    renderList();
  }
  renderStage();
}

function reassign() {
  if (state.reassigning || state.reassigned || !state.note.trim()) return;
  state.reassigning = true;
  renderPanel();
  live("Reassigning task");
  window.setTimeout(() => {
    state.reassigning = false;
    state.reassigned = true;
    state.alertDismissed = false;
    const thread = threads.find((item) => item.id === "denied");
    thread.handoff.push({
      type: "system",
      who: "You",
      action: "reassigned the task to Casey Nguyen",
      time: "Just now",
      detail: "Jordan stays quarterback · due Thu at 3:00 PM",
    });
    renderList();
    renderStage();
    renderPanel();
    live("Reassigned to Casey Nguyen");
  }, wait(720));
}

function addAttachment(kind) {
  const thread = threads.find((item) => item.id === state.selectedId);
  if (!thread) return;
  const item = {
    type: "system",
    who: "You",
    action: kind === "add" ? "added a note to the thread" : "attached referral-notes.pdf",
    time: "Just now",
  };
  if (state.view === "task" && thread.handoff) thread.handoff.push(item);
  else {
    state.drafts[thread.id] = state.drafts[thread.id] || [];
    state.drafts[thread.id].push(item);
  }
  renderStage();
}

paintMenus();
paintChips();
renderList();
renderStage();
renderPanel();

document.addEventListener("click", (event) => {
  const scope = event.target.closest("[data-scope]");
  if (scope) {
    setScope(scope.dataset.scope);
    return;
  }
  const chip = event.target.closest(".filter-chip");
  if (chip) {
    openMenu(chip.getAttribute("aria-controls").replace("menu-", ""));
    return;
  }
  const option = event.target.closest("[data-filter]");
  if (option) {
    chooseFilter(option.dataset.filter, option.dataset.value);
    return;
  }
  const thread = event.target.closest("[data-thread]");
  if (thread) {
    openThread(thread.dataset.thread);
    return;
  }
  const ask = event.target.closest("[data-ask-text]");
  if (ask) {
    openAside({ name: ask.dataset.askWho, time: ask.dataset.askTime, text: ask.dataset.askText });
    return;
  }
  const stretchLink = event.target.closest("[data-open-stretch]");
  if (stretchLink) {
    openAside(null, stretchLink.dataset.openStretch);
    return;
  }
  const copyBtn = event.target.closest("[data-copy-msg]");
  if (copyBtn) {
    copyMessage(copyBtn);
    return;
  }
  const addTask = event.target.closest("[data-add-task]");
  if (addTask) {
    addMessageToTask(addTask);
    return;
  }
  const reply = event.target.closest("[data-reply]");
  if (reply) {
    replyToMessage(reply);
    return;
  }
  if (event.target.closest("[data-flag]")) {
    remember("flags", quoteFromMessage(event.target), "Flagged for the next advocate");
    return;
  }
  if (event.target.closest("[data-remind]")) {
    remember("reminders", quoteFromMessage(event.target), "Reminder set for Thu, Nov 5 · 3:00 PM");
    return;
  }
  if (event.target.closest("[data-clear-reply]")) {
    state.reply = null;
    renderStage();
    return;
  }
  const mention = event.target.closest("[data-mention]");
  if (mention) {
    insertMention(mention.dataset.mention);
    return;
  }
  if (event.target.closest("#resolve-aside")) {
    resolveAside();
    return;
  }
  const asideTool = event.target.closest("[data-aside-tool]");
  if (asideTool) {
    addAsideTool();
    return;
  }
  const rail = event.target.closest("[data-rail]");
  if (rail) {
    selectRail(rail.dataset.rail);
    return;
  }
  const view = event.target.closest("[data-view]");
  if (view) {
    setView(view.dataset.view);
    return;
  }
  if (event.target.closest("[data-dismiss-alert]")) {
    state.alertDismissed = true;
    renderPanel();
    return;
  }
  if (event.target.closest("[data-close]")) {
    dismissPanel();
    return;
  }
  if (event.target.closest("[data-cancel]")) {
    state.note = defaultNote;
    state.owner = "Casey Nguyen";
    setView("conversation");
    return;
  }
  if (event.target.closest("#reassign")) {
    reassign();
    return;
  }
  const owner = event.target.closest("[data-owner]");
  if (owner) {
    state.owner = owner.dataset.owner;
    closeMenu();
    renderPanel();
    return;
  }
  if (event.target.closest("#owner-trigger")) {
    openMenu("owner");
    return;
  }
  if (event.target.closest("#alerts-button")) {
    openMenu("alerts");
    return;
  }
  if (event.target.closest("#header-search, #threads-search-toggle")) {
    const open = $("#threads-search-toggle").getAttribute("aria-expanded") === "true";
    if (open && !$("#thread-search").value.trim()) setSearchOpen(false);
    else setSearchOpen(true, { focus: true });
    return;
  }
  if (event.target.closest("[data-add]")) {
    addAttachment("add");
    return;
  }
  if (!event.target.closest("[data-menu-root]")) closeMenu();
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "composer") {
    event.preventDefault();
    sendMessage(event.target);
  }
  if (event.target.id === "team-composer") {
    event.preventDefault();
    sendAside(event.target);
  }
});

function setSearchOpen(open, { focus = false } = {}) {
  const field = $("#thread-search-field");
  $(".threads-head").classList.toggle("is-search-open", open);
  field.toggleAttribute("inert", !open);
  $("#threads-search-toggle").setAttribute("aria-expanded", open ? "true" : "false");
  if (focus) requestAnimationFrame(() => $("#thread-search").focus());
}

function syncSearchClear() {
  $("#thread-search-clear").hidden = !$("#thread-search").value;
}

$("#thread-search").addEventListener("input", (event) => {
  state.query = event.target.value;
  syncSearchClear();
  renderList();
  if (state.selectedId && !visibleThreads().some((thread) => thread.id === state.selectedId)) {
    closeConversation();
  }
});

$("#thread-search-clear").addEventListener("mousedown", (event) => {
  event.preventDefault();
});

$("#thread-search-clear").addEventListener("click", () => {
  const input = $("#thread-search");
  input.value = "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
});

$("#thread-search").addEventListener("blur", () => {
  window.setTimeout(() => {
    if (document.activeElement === $("#threads-search-toggle")) return;
    if (!$("#thread-search").value.trim()) setSearchOpen(false);
  }, 0);
});

$("#new-conversation").addEventListener("click", () => {
  const button = $("#new-conversation");
  if (button.classList.contains("is-loading")) return;
  button.classList.add("is-loading");
  button.disabled = true;
  button.innerHTML = `<span class="button-spinner" aria-hidden="true"></span> Starting`;
  window.setTimeout(() => {
    button.classList.remove("is-loading");
    button.disabled = false;
    button.textContent = "New conversation";
    const id = `draft-${Date.now()}`;
    threads.unshift({
      id,
      team: "care",
      title: "New conversation",
      person: "you",
      status: "progress",
      when: "Just now",
      age: 0,
      assigned: true,
      watching: false,
      unread: false,
      conversation: [],
      details: [
        ["Status", "Draft"],
        ["Owner", "You"],
        ["Team", "Care Team"],
      ],
    });
    state.scope = "assigned";
    document.querySelectorAll("[data-scope]").forEach((item) => {
      item.setAttribute("aria-checked", item.dataset.scope === "assigned" ? "true" : "false");
    });
    layoutScopeThumb(true);
    state.team = "all";
    state.status = "any";
    state.query = "";
    $("#thread-search").value = "";
    syncSearchClear();
    setSearchOpen(false);
    paintChips();
    paintMenus();
    openThread(id);
    window.setTimeout(() => $("#stage textarea")?.focus(), wait(520));
  }, wait(420));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (document.activeElement === $("#thread-search")) {
      if (!$("#thread-search").value.trim()) setSearchOpen(false);
      else $("#thread-search").blur();
      return;
    }
    const mentions = $("#mention-menu");
    if (mentions && !mentions.hidden) {
      mentions.hidden = true;
      return;
    }
    if (state.menu) closeMenu();
    else if (state.panel) dismissPanel();
    else if (state.view !== "conversation") setView("conversation");
    else if (state.selectedId) closeConversation();
    return;
  }
  if (!state.menu || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const items = [...$(`#menu-${state.menu}`).querySelectorAll(".menu-option")];
  if (!items.length) return;
  event.preventDefault();
  const index = items.indexOf(document.activeElement);
  const next = event.key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
  items[next].focus();
});

const RESIZE = {
  threads: { prop: "--threads-width", min: 260, max: 520, dir: 1 },
  panel: { prop: "--panel-width", min: 300, max: 600, dir: -1 },
};
const STAGE_MIN = 420;

function sizeOf(key) {
  return parseFloat(getComputedStyle($("#workspace")).getPropertyValue(RESIZE[key].prop)) || 340;
}

function setSize(key, px) {
  const workspace = $("#workspace");
  const spec = RESIZE[key];
  const metrics = getComputedStyle(workspace);
  const gutter = parseFloat(metrics.getPropertyValue("--gutter")) || 8;
  const railBlock = (parseFloat(metrics.getPropertyValue("--rail-width")) || 56) + gutter;
  const other = key === "threads"
    ? (workspace.classList.contains("has-panel") ? sizeOf("panel") + railBlock + gutter : railBlock)
    : sizeOf("threads") + gutter + railBlock;
  const room = workspace.clientWidth - other - gutter - STAGE_MIN;
  const max = Math.max(spec.min, Math.min(spec.max, room));
  const width = Math.round(Math.min(max, Math.max(spec.min, px)));
  workspace.style.setProperty(spec.prop, `${width}px`);
  const handle = document.querySelector(`[data-resize="${key}"]`);
  handle.setAttribute("aria-valuemin", String(spec.min));
  handle.setAttribute("aria-valuemax", String(max));
  handle.setAttribute("aria-valuenow", String(width));
  return width;
}

document.querySelectorAll("[data-resize]").forEach((handle) => {
  const key = handle.dataset.resize;
  const workspace = $("#workspace");
  let startX = 0;
  let startWidth = 0;
  let dragging = false;

  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    dragging = true;
    startX = event.clientX;
    startWidth = sizeOf(key);
    workspace.classList.add("is-resizing");
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener("pointermove", (event) => {
    if (dragging) setSize(key, startWidth + (event.clientX - startX) * RESIZE[key].dir);
  });
  const end = (event) => {
    if (!dragging) return;
    dragging = false;
    workspace.classList.remove("is-resizing");
    handle.releasePointerCapture?.(event.pointerId);
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
  handle.addEventListener("dblclick", () => {
    workspace.style.removeProperty(RESIZE[key].prop);
  });
  handle.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 32 : 16;
    const grow = RESIZE[key].dir;
    if (event.key === "ArrowRight") setSize(key, sizeOf(key) + step * grow);
    else if (event.key === "ArrowLeft") setSize(key, sizeOf(key) - step * grow);
    else if (event.key === "Home") setSize(key, RESIZE[key].min);
    else if (event.key === "End") setSize(key, RESIZE[key].max);
    else return;
    event.preventDefault();
  });
});

window.addEventListener("resize", () => {
  ["threads", "panel"].forEach((key) => {
    if ($("#workspace").style.getPropertyValue(RESIZE[key].prop)) setSize(key, sizeOf(key));
  });
  layoutScopeThumb(false);
});

layoutScopeThumb(false);
document.fonts?.ready.then(() => layoutScopeThumb(false));

document.querySelectorAll(".global-nav a").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

/** Staggered ease-up on first paint; skipped when prefers-reduced-motion. */
function runPageEntrance() {
  const root = document.documentElement;
  if (!root.classList.contains("is-page-boot")) return;
  if (reduced) {
    root.classList.remove("is-page-boot");
    root.classList.add("is-page-settled");
    return;
  }
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    root.classList.add("is-page-settled");
    root.classList.remove("is-page-ready");
  };
  requestAnimationFrame(() => {
    root.classList.add("is-page-ready");
    root.classList.remove("is-page-boot");
    const last = [...document.querySelectorAll(".page-rise")].pop();
    last?.addEventListener("animationend", (event) => {
      if (event.target === last && event.animationName === "page-rise") finish();
    });
    window.setTimeout(finish, 1100);
  });
}

runPageEntrance();

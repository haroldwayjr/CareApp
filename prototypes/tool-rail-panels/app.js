(() => {
  "use strict";

  const panel = document.querySelector("#context-panel");
  const stage = document.querySelector("#panel-stage");
  const railButtons = [...document.querySelectorAll(".rail-button[data-panel]")];
  const modal = document.querySelector("#modal-layer");
  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const modalFooter = document.querySelector("#modal-footer");
  const toasts = document.querySelector(".toast-region");
  const resizer = document.querySelector("#panel-resizer");
  const workspace = document.querySelector(".workspace");
  const page = document.querySelector(".page");
  const chatCard = document.querySelector(".chat-card");
  const sheetScrim = document.querySelector("#workspace-sheet-scrim");
  const navMenuButton = document.querySelector("#nav-menu-button");
  const navDrawerLayer = document.querySelector("#nav-drawer-layer");
  const navDrawerClose = document.querySelector("#nav-drawer-close");
  const navDrawerScrim = navDrawerLayer?.querySelector(".nav-drawer-scrim");
  const sheetModeMq = window.matchMedia("(max-width: 719px)");
  const compactNavMq = window.matchMedia("(max-width: 1023px)");
  const PANEL_MIN = 320;
  const PANEL_DEFAULT = 400;
  /** Insurance needs room for Prior Authorizations + count badge */
  const PANEL_INSURANCE = 440;

  function isSheetMode() {
    return sheetModeMq.matches;
  }

  function preferredPanelWidth(name) {
    return name === "insurance" ? PANEL_INSURANCE : PANEL_DEFAULT;
  }

  function currentPanelWidth() {
    return (
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--panel-width")) ||
      PANEL_DEFAULT
    );
  }

  /** Expand Insurance if tab labels (and badges) would clip — never shrink a wider size. */
  function ensurePanelFitsTabs() {
    if (isSheetMode() || !panelOpen || activePanel !== "insurance") return;
    const tabs = stage?.querySelector(".ins-tabs");
    if (!tabs) return;
    const buttons = [...tabs.querySelectorAll(":scope > .tab")];
    if (!buttons.length) return;
    /* Sum tab widths — .tabs.scrollWidth equals the panel when the strip stretches. */
    const contentW = buttons.reduce((sum, btn) => sum + btn.offsetWidth, 0);
    const pad =
      (parseFloat(getComputedStyle(tabs).paddingLeft) || 0) +
      (parseFloat(getComputedStyle(tabs).paddingRight) || 0);
    const needed = Math.ceil(contentW + pad + 12);
    const current = currentPanelWidth();
    if (needed > current) setPanelWidth(needed);
  }

  function syncSheetChrome() {
    const sheet = panelOpen && isSheetMode();
    workspace?.classList.toggle("is-sheet-open", sheet);
    chatCard?.classList.toggle("is-dimmed", sheet);
    if (sheetScrim) sheetScrim.hidden = !sheet;
  }

  function openNavDrawer() {
    if (!navDrawerLayer) return;
    navDrawerLayer.classList.add("is-open");
    navDrawerLayer.setAttribute("aria-hidden", "false");
    navMenuButton?.setAttribute("aria-expanded", "true");
  }

  function closeNavDrawer() {
    if (!navDrawerLayer) return;
    navDrawerLayer.classList.remove("is-open");
    navDrawerLayer.setAttribute("aria-hidden", "true");
    navMenuButton?.setAttribute("aria-expanded", "false");
  }

  function isNavDrawerOpen() {
    return navDrawerLayer?.classList.contains("is-open");
  }

  /** Context panel may grow to half the page width. */
  function panelMaxWidth() {
    const basis = page?.clientWidth || workspace?.clientWidth || window.innerWidth;
    return Math.max(PANEL_MIN, Math.floor(basis / 2));
  }

  function setPanelWidth(px) {
    const max = panelMaxWidth();
    const w = Math.round(Math.min(max, Math.max(PANEL_MIN, px)));
    document.documentElement.style.setProperty("--panel-width", `${w}px`);
    document.documentElement.style.setProperty("--panel-width-max", `${max}px`);
    if (resizer) {
      resizer.setAttribute("aria-valuenow", String(w));
      resizer.setAttribute("aria-valuemin", String(PANEL_MIN));
      resizer.setAttribute("aria-valuemax", String(max));
    }
    /* Footer tip depends on ellipsis — remeasure when panel width changes */
    requestAnimationFrame(() => refreshStickyFooterTip());
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function menuPopoverAnchor(el) {
    return (
      el?.closest(
        ".select-wrap, .inline-dob-control, .ins-dropdown-wrap, .view-menu-wrap, .more-menu-wrap, .ct-row-menu-wrap, .ct-search-wrap"
      ) || el?.parentElement
    );
  }

  function clearMenuPopoverPlacement(el) {
    if (!el) return;
    el.classList.remove("opens-up", "is-fixed-popover");
    menuPopoverAnchor(el)?.classList.remove("opens-up");
    if (el.classList.contains("dob-calendar")) {
      el.style.position = "";
      el.style.top = "";
      el.style.right = "";
      el.style.bottom = "";
      el.style.left = "";
      el.style.width = "";
      el.style.zIndex = "";
    }
  }

  /** Nearest real scrollport — skip accordion-body (content-sized, not a clip). */
  function nearestScrollClip(el) {
    let node = el.parentElement;
    while (node && node !== document.documentElement) {
      const { overflowY } = getComputedStyle(node);
      if (overflowY === "auto" || overflowY === "scroll") return node;
      node = node.parentElement;
    }
    return (
      el.closest(".tab-pane, .panel-scroll, .modal-body, .modal") || document.documentElement
    );
  }

  /**
   * DOB calendar: fixed to the viewport so Task list / Save bar (siblings above the
   * scrollport) can’t cover Clear/Today. Prefer below the field; otherwise above chrome.
   */
  function positionDobCalendar(el) {
    const anchor = menuPopoverAnchor(el);
    const trigger =
      el.closest(".inline-dob-wrap")?.querySelector(".inline-dob-trigger") || anchor;
    if (!trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const panelRoot = el.closest(".panel-content") || panel;
    const panelRect = panelRoot?.getBoundingClientRect();
    const gap = 8;
    let bottomLimit = (panelRect?.bottom ?? window.innerHeight) - gap;
    let topLimit = (panelRect?.top ?? 0) + gap;
    panelRoot?.querySelectorAll(".panel-edit-bar, .ins-sticky-footer, .task-list-accordion").forEach((bar) => {
      if (bar.hidden || getComputedStyle(bar).display === "none") return;
      const barRect = bar.getBoundingClientRect();
      if (barRect.height <= 0) return;
      if (barRect.top > triggerRect.top) bottomLimit = Math.min(bottomLimit, barRect.top - gap);
      if (barRect.bottom < triggerRect.top) topLimit = Math.max(topLimit, barRect.bottom + gap);
    });
    const menuHeight = Math.max(el.offsetHeight, el.scrollHeight, 300);
    const spaceBelow = bottomLimit - triggerRect.bottom - gap;
    const openUp = menuHeight > spaceBelow;
    let top = openUp ? triggerRect.top - gap - menuHeight : triggerRect.bottom + gap;
    if (top < topLimit) top = topLimit;
    if (top + menuHeight > bottomLimit) top = Math.max(topLimit, bottomLimit - menuHeight);

    el.classList.add("is-fixed-popover");
    el.classList.toggle("opens-up", openUp);
    anchor?.classList.toggle("opens-up", openUp);
    el.style.position = "fixed";
    el.style.top = `${Math.round(top)}px`;
    el.style.bottom = "auto";
    el.style.left = "auto";
    el.style.right = `${Math.max(gap, Math.round(window.innerWidth - triggerRect.right))}px`;
    el.style.width = "280px";
    el.style.zIndex = "60";
  }

  /** Prefer open downward; flip up when clipped below or colliding with sticky chrome. */
  function positionMenuPopover(el) {
    if (!el || el.hidden) return;
    if (el.classList.contains("dob-calendar")) {
      positionDobCalendar(el);
      return;
    }
    const anchor = menuPopoverAnchor(el);
    if (!anchor) return;
    const gap = 8;
    const clip = nearestScrollClip(el);
    const clipRect = clip.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    /* Keep clear of sticky edit / compare / task footers inside the panel */
    let bottomLimit = clipRect.bottom;
    const panelRoot = el.closest(".panel-content") || panel;
    panelRoot?.querySelectorAll(".panel-edit-bar, .ins-sticky-footer, .task-list-accordion").forEach((bar) => {
      if (bar.hidden || getComputedStyle(bar).display === "none") return;
      const barRect = bar.getBoundingClientRect();
      if (barRect.height > 0 && barRect.top > anchorRect.top && barRect.top <= bottomLimit) {
        bottomLimit = barRect.top;
      }
    });
    const spaceBelow = bottomLimit - anchorRect.bottom - gap;
    const spaceAbove = anchorRect.top - clipRect.top - gap;
    const menuHeight = Math.max(el.offsetHeight, el.scrollHeight, 48);
    const fitsBelow = menuHeight <= spaceBelow;
    const openUp = !fitsBelow && (spaceAbove >= menuHeight || spaceAbove > spaceBelow);
    el.classList.toggle("opens-up", openUp);
    anchor.classList.toggle("opens-up", openUp);
  }

  /** Show a `[hidden]` menu popover (open animation via CSS). */
  function showMenuPopover(el) {
    if (!el) return;
    el.classList.remove("is-leaving");
    clearMenuPopoverPlacement(el);
    /* Place before animating so bottom menus don’t flash open downward */
    el.classList.add("is-measuring");
    el.hidden = false;
    positionMenuPopover(el);
    requestAnimationFrame(() => {
      el.classList.remove("is-measuring");
    });
  }

  /** Hide a menu popover with a short leave animation, then `[hidden]`. */
  function hideMenuPopover(el) {
    if (!el || el.hidden) return;
    if (reduceMotion() || el.classList.contains("is-leaving")) {
      el.classList.remove("is-leaving");
      clearMenuPopoverPlacement(el);
      el.hidden = true;
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      el.classList.remove("is-leaving");
      clearMenuPopoverPlacement(el);
      el.hidden = true;
      el.removeEventListener("animationend", onEnd);
    };
    const onEnd = (event) => {
      if (event.target === el) finish();
    };
    el.classList.add("is-leaving");
    el.addEventListener("animationend", onEnd);
    window.setTimeout(finish, 160);
  }

  function bindPanelResizer() {
    if (!resizer || !panel || !workspace) return;
    resizer.setAttribute("role", "separator");
    resizer.setAttribute("aria-valuemin", String(PANEL_MIN));
    resizer.setAttribute("aria-valuemax", String(panelMaxWidth()));
    resizer.setAttribute("aria-valuenow", String(PANEL_DEFAULT));
    setPanelWidth(currentPanelWidth());

    let dragging = false;
    let startX = 0;
    let startWidth = PANEL_DEFAULT;

    const onPointerMove = (e) => {
      if (!dragging) return;
      const next = startWidth + (startX - e.clientX);
      setPanelWidth(next);
    };
    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      workspace.classList.remove("is-resizing");
      try {
        resizer.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    resizer.addEventListener("pointerdown", (e) => {
      if (panel.classList.contains("is-collapsed")) return;
      e.preventDefault();
      dragging = true;
      startX = e.clientX;
      startWidth = panel.getBoundingClientRect().width;
      workspace.classList.add("is-resizing");
      resizer.setPointerCapture(e.pointerId);
    });
    resizer.addEventListener("pointermove", onPointerMove);
    resizer.addEventListener("pointerup", endDrag);
    resizer.addEventListener("pointercancel", endDrag);

    resizer.addEventListener("keydown", (e) => {
      const step = e.shiftKey ? 32 : 16;
      const current = currentPanelWidth();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPanelWidth(current + step);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPanelWidth(current - step);
      }
      if (e.key === "Home") {
        e.preventDefault();
        setPanelWidth(PANEL_MIN);
      }
      if (e.key === "End") {
        e.preventDefault();
        setPanelWidth(panelMaxWidth());
      }
    });

    /* Keep width within half-page when the viewport shrinks */
    window.addEventListener("resize", () => {
      setPanelWidth(currentPanelWidth());
      requestAnimationFrame(ensurePanelFitsTabs);
    });
  }

  const loaded = new Set(["member"]);
  let activePanel = "member";
  let panelOpen = true;
  let transitionTimer;
  let loaderTimer;
  let lastFocus;

  const insuranceState = {
    tab: "member-plan",
    view: "main",
    networkMode: "in",
    benefitQuery: "",
    compareSelected: [],
    compareNetwork: "in",
    comparePlanIds: ["aetna", "anthem"],
    tipsDismissed: false,
    openDropdown: null,
  };

  const eligibilityState = {
    company: "Demo Premium Company",
    enrolled: true,
    coverageStatus: "Active",
    microsite: "—",
    phoneLine: "—",
    infoOpen: true,
    benefitQuery: "",
    /** @type {"overview"|"benefit"} */
    view: "overview",
    selectedBenefitId: null,
    selectedBenefitIds: new Set([
      "adhoc-outbound",
      "annual-checkup",
      "benefits-navigation",
      "black-care-equity",
    ]),
  };

  const eligibilityInfo = [
    { label: "Insurance Carrier", value: "Aetna" },
    { label: "Street Address", value: "3 State St, Suite 1424" },
    { label: "City", value: "Pasco" },
    { label: "Phone Number", value: "(310) 555-5555" },
    {
      label: "Primary",
      value: "Faustino Morar",
      meta: "DOB: 10/1/1983<br>SSN: ***-**-0000",
    },
    { label: "Insurance Network", value: "Aetna Choice" },
    { label: "Employee ID", value: "600688" },
    { label: "Relationship To Primary subscriber", value: "Self" },
    { label: "Gender", value: "Male" },
    { label: "Email", value: "mock.user@testdomain.com" },
  ];

  const icon = {
    close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
    /* 3px dots at 20×20 — matches Figma more.vertical optical size */
    more: `<svg class="icon-more-vertical" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.25 7.311 12.53 18.03a0.749 0.749 0 0 1 -1.06 0L0.75 7.311"/></svg>`,
    chevronLeft: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.53 23.25 4.811 12.53a0.749 0.749 0 0 1 0-1.06L15.531 0.75"/></svg>`,
    down: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.25 7.311 12.53 18.03a0.749 0.749 0 0 1 -1.06 0L0.75 7.311"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="5.25" width="17.5" height="15.5" rx="2"/><path d="M3.25 9.5h17.5M8 3.25v4M16 3.25v4"/></svg>`,
    up: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.75 17.189 11.47 6.47a.749.749 0 0 1 1.06 0l10.72 10.719"/></svg>`,
    arrowTopRight: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20.25 15.91-15.91"/><path d="M4.91 4.34h15v15"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.19 1.81a3.639 3.639 0 0 0-5.17.035l-14.5 14.5L.75 23.25l6.905-1.771 14.5-14.5a3.637 3.637 0 0 0 .035-5.169Z"/><path d="m16.606 2.26 5.134 5.134"/><path d="m2.521 16.344 5.139 5.13"/></svg>`,
    back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>`,
    check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
    /* Streamline Ultimate Regular — Information Circle (icon/status/info) */
    info: `<svg viewBox="0 0 24 24" aria-hidden="true" class="ins-info-glyph"><circle cx="12" cy="12" r="10.5"/><path d="M12 10.5v6"/><circle class="ins-info-glyph-dot" cx="12" cy="7.5" r="1.125"/></svg>`,
    /* Streamline Ultimate Regular — Filter Sort Lines Descending */
    filter: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M0.75 4.293h22.5M3.146 9.431h17.708M5.543 14.569h12.914M8.72 19.707h6.56"/></svg>`,
    /* Included Health logomark — four nodes + center bridge (matches Care App mark) */
    benefitNodes: `<svg viewBox="0 0 22 24" aria-hidden="true" class="elig-benefit-mark"><path d="M18.6667 24C20.5075 24 21.9999 22.4737 21.9999 20.5909C21.9999 18.7081 20.5075 17.1818 18.6667 17.1818C16.8258 17.1818 15.3335 18.7081 15.3335 20.5909C15.3335 22.4737 16.8258 24 18.6667 24Z"/><path d="M3.33383 6.8182C5.1747 6.8182 6.66702 5.2919 6.66702 3.4091C6.66702 1.52631 5.1747 0 3.33383 0C1.49296 0 0.00063671 1.52631 0.00063671 3.4091C0.00063671 5.2919 1.49296 6.8182 3.33383 6.8182Z"/><path d="M18.6667 6.8182C20.5075 6.8182 21.9999 5.2919 21.9999 3.4091C21.9999 1.52631 20.5075 0 18.6667 0C16.8258 0 15.3335 1.52631 15.3335 3.4091C15.3335 5.2919 16.8258 6.8182 18.6667 6.8182Z"/><path d="M3.33392 24C5.17479 24 6.66711 22.4737 6.66711 20.5909C6.66711 18.7081 5.17479 17.1818 3.33392 17.1818C1.49305 17.1818 0.000724532 18.7081 0.000724532 20.5909C0.000724532 22.4737 1.49305 24 3.33392 24Z"/><path d="M3.33393 15.4091C3.79414 15.4472 6.37323 14.9544 8.41468 14.543C10.1225 14.1988 11.8781 14.1988 13.5859 14.543C15.6274 14.9544 18.2065 15.4472 18.6667 15.4091C20.5076 15.4091 21.9999 13.8828 21.9999 12C21.9999 10.1172 20.5076 8.59091 18.6667 8.59091C17.9639 8.59091 15.5391 9.05288 13.6024 9.4461C11.8837 9.79504 10.1169 9.79504 8.39825 9.4461C6.46152 9.05288 4.03667 8.59091 3.33393 8.59091C1.49303 8.59091 0.000708191 10.1172 0.000708191 12C0.000708191 13.8828 1.49303 15.4091 3.33393 15.4091Z"/></svg>`,
    benefitClinic: `<svg viewBox="0 0 24 24" aria-hidden="true" class="elig-benefit-mark elig-benefit-mark--stroke"><path d="M4 20V8.5A1.5 1.5 0 0 1 5.5 7H9V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7h3.5A1.5 1.5 0 0 1 20 8.5V20"/><path d="M12 10v6M9 13h6"/></svg>`,
    flag: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h11l-1.5 3.5L16 11H5"/></svg>`,
    /* Streamline Ultimate Bold — Flag 1 (filled) */
    flagBold: `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon-flag-bold"><path fill="currentColor" d="M16.55 7.2a.27.27 0 0 1 0-.4l6-4.78c.52-.42.48-.81.42-1S22.67.5 22 .5H6a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h16c.66 0 .88-.32.95-.52s.1-.58-.42-1Z"/><path fill="currentColor" d="M2.51 0A1.5 1.5 0 0 0 1 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 2.51 0Z"/></svg>`,
    /* Soma icon/actions/link — Size=sm Style=outline (horizontal chain) */
    link: `<svg class="ins-copy-link-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8.5615 8.125C8.2477 7.77204 7.86286 7.48936 7.43221 7.29548C7.00155 7.10161 6.53478 7.00092 6.0625 7H4.9375C4.04239 7 3.18395 7.35558 2.55101 7.98851C1.91808 8.62145 1.5625 9.47989 1.5625 10.375C1.5625 11.2701 1.91808 12.1285 2.55101 12.7615C3.18395 13.3944 4.04239 13.75 4.9375 13.75H6.0625C6.53475 13.7489 7.00146 13.6481 7.43209 13.4543C7.86272 13.2604 8.24758 12.9778 8.5615 12.625"/><path d="M11.4385 8.125C11.7522 7.772 12.1371 7.48929 12.5677 7.29542C12.9984 7.10154 13.4652 7.00087 13.9375 7H15.0625C15.9576 7 16.816 7.35558 17.449 7.98851C18.0819 8.62145 18.4375 9.47989 18.4375 10.375C18.4375 11.2701 18.0819 12.1285 17.449 12.7615C16.816 13.3944 15.9576 13.75 15.0625 13.75H13.9375C13.4652 13.749 12.9985 13.6483 12.5678 13.4544C12.1372 13.2605 11.7523 12.9779 11.4385 12.625"/><path d="M6.0625 10.3743H13.9375"/></svg>`,
    /* Streamline Ultimate Regular — Upload Bottom */
    export: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.75V3.75"/><path d="m16.5 8.25-4.5-4.5-4.5 4.5"/><path d="M23.25 15.75v1.5a3 3 0 0 1-3 3H3.75a3 3 0 0 1-3-3v-1.5"/></svg>`,
    /* Filled info mark for Share tips chip */
    infoFilled: `<svg class="ins-tips-info" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="7" fill="currentColor" stroke="none"/><path fill="#fff" stroke="none" d="M6.35 5.9h1.3v4.55h-1.3zm.65-3.15a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"/></svg>`,
  };

  const defaultBenefitDetail = (name, type = "Virtual Care") => ({
    customer: "Included Health",
    type,
    contact: [
      ["Local Phone Number", "No data available"],
      ["Business Hours", "No data available"],
      ["Toll-Free Phone Number", "No data available"],
      ["Backdoor Phone Number", "No data available"],
      ["International Phone Number", "No data available"],
      ["Member Support Email", "No data available"],
      ["Website", "No data available"],
    ],
    memberCommunication: `${name} helps members get the right support through Included Health. Advocates can share program details and next steps during the chat.`,
    careTeamNotes: [
      `Use ${name} when the member’s need matches this benefit’s scope.`,
      "Confirm eligibility and cost before booking or referring.",
    ],
    whenToRecommend: [
      "Member asks how this benefit works",
      "Member needs help finding in-scope care",
      "Member wants cost or coverage clarity",
    ],
    questionsToAsk: [
      "What outcome are you hoping for?",
      "Have you used this benefit before?",
      "Do you have a preferred clinic or clinician?",
    ],
    cost: [
      ["Eligibility", "No data available"],
      ["Cost", "Cost (Saver, Premier, Contribution plans): $0"],
      ["Pre-authorization Requirements", "No data available"],
    ],
    memberInstructions: "No data available",
    resourceLabel: "Virtual Care CC Job Aid",
    resourceHref: "#",
  });

  const memberBenefits = [
    {
      id: "adhoc-outbound",
      name: "Adhoc Outbound Call",
      icon: "nodes",
      recommended: false,
      lastActivity: { primary: "10/14/26 · Lila George", relative: "2 hours ago" },
      jobAid: "Job Aid: Place an outbound care call",
      jobAidLink: "Care call guide",
      description:
        "Supports scheduled or ad-hoc outbound calls so advocates can follow up with members on open care needs.",
      detail: defaultBenefitDetail("Adhoc Outbound Call", "Care Coordination"),
    },
    {
      id: "annual-checkup",
      name: "Annual Check-Up",
      icon: "nodes",
      recommended: true,
      jobAid: "Job Aid: Schedule an [Annual Wellness Visit]",
      jobAidLink: "Annual Wellness Visit",
      description:
        "Helps members complete preventive annual visits and understand what is covered on their plan.",
      detail: defaultBenefitDetail("Annual Check-Up", "Preventive Care"),
    },
    {
      id: "benefits-navigation",
      name: "Benefits Navigation",
      icon: "nodes",
      recommended: true,
      jobAid: "Job Aid: Refer a member to [Virtual Primary Care]",
      jobAidLink: "Virtual Primary Care",
      description:
        "Helps members find and understand their benefits, connect with the right care, and navigate coverage questions with a dedicated Included Health care team.",
      detail: {
        ...defaultBenefitDetail("Benefits Navigation", "Navigation"),
        memberCommunication:
          "Benefits Navigation helps members find and understand their benefits, connect with the right care, and navigate coverage questions with a dedicated Included Health care team.",
        careTeamNotes: [
          "Start here when the member is unsure which benefit applies.",
          "Use the job aid to refer into Virtual Primary Care when clinically appropriate.",
        ],
        whenToRecommend: [
          "Member is confused about coverage or plan rules",
          "Member needs help choosing the next care pathway",
          "Member asks for a general benefits walkthrough",
        ],
        questionsToAsk: [
          "What benefit question can I help clarify today?",
          "Are you looking for virtual or in-person care?",
          "Do you already have a preferred provider?",
        ],
        resourceLabel: "Benefits Navigation Job Aid",
      },
    },
    {
      id: "black-care-equity",
      name: "Black Care Equity Solution",
      icon: "nodes",
      recommended: false,
      jobAid: "Job Aid: Introduce [Black Care Equity]",
      jobAidLink: "Black Care Equity",
      description:
        "Connects members with culturally responsive care resources and equity-focused navigation support.",
      detail: defaultBenefitDetail("Black Care Equity Solution", "Equity Program"),
    },
    {
      id: "brad-test-hcs",
      name: "BradTestHCS",
      icon: "clinic",
      recommended: false,
      jobAid: "Job Aid: Route to [HCS test pathway]",
      jobAidLink: "HCS test pathway",
      description: "Internal test benefit used to validate HCS routing and display in Care App.",
      detail: defaultBenefitDetail("BradTestHCS", "Test Program"),
    },
    {
      id: "cancer-support",
      name: "Cancer Support Program: Nurse Cons…",
      icon: "nodes",
      recommended: false,
      jobAid: "Job Aid: Refer to [Cancer Support]",
      jobAidLink: "Cancer Support",
      description:
        "Provides nurse consults and navigation for members managing a cancer diagnosis or related questions.",
      detail: defaultBenefitDetail("Cancer Support Program", "Specialty Support"),
    },
    {
      id: "care-case-mgmt",
      name: "Care And Case Management",
      icon: "nodes",
      recommended: false,
      jobAid: "Job Aid: Escalate to [Case Management]",
      jobAidLink: "Case Management",
      description:
        "Coordinates complex care needs across clinicians, benefits, and follow-up tasks for the member.",
      detail: {
        ...defaultBenefitDetail("Care And Case Management", "Case Management"),
        titleOverride: "Psychiatry",
        type: "Virtual Care",
        memberCommunication:
          "Behavioral Health (BH) services include virtual mental health and psychiatry. Members can book visits with therapists, psychiatrists, and other BH clinicians for a wide range of concerns.",
        careTeamNotes: [
          "The BH team supports members across anxiety, depression, medication management, and related concerns.",
          "Virtual psychiatry visits can help members access timely evaluation and treatment planning.",
        ],
        whenToRecommend: [
          "I am experiencing anxiety, depression, or mood changes",
          "I need help managing medications for mental health",
          "I want to talk with a psychiatrist or therapist virtually",
        ],
        questionsToAsk: [
          "Are you interested in medication management or talk therapy?",
          "Have you seen a psychiatrist or therapist before?",
          "How urgently do you need to be seen?",
        ],
        resourceLabel: "Virtual Care CC Job Aid",
      },
    },
    {
      id: "carrum-health",
      name: "Carrum Health",
      icon: "clinic",
      recommended: false,
      jobAid: "Job Aid: Refer to [Carrum Health]",
      jobAidLink: "Carrum Health",
      description:
        "Routes members to bundled surgical and specialty care options through the Carrum Health network.",
      detail: defaultBenefitDetail("Carrum Health", "Specialty Network"),
    },
  ];

  /** @type {null | "personal" | "contact" | "account"} */
  let memberEditingSection = null;
  /** Field snapshot at edit start — Save bar only when form ≠ baseline. */
  let memberEditBaseline = null;
  /** Pending navigation after unsaved-changes Dialog (Save / Discard). */
  let pendingLeaveAction = null;
  let unsavedConfirmOpen = false;

  let taskListOpen = false;
  const taskListCount = 0;

  /** Panel table — initial mockup roster */
  let careTeamMembers = [
    { id: "kelly", name: "Kelly Smith", role: "CCA", initial: "K", visibleToMembers: true },
    { id: "secondary", name: "Secondary Clinician", role: "Secondary Clinician", initial: "S", visibleToMembers: true },
    { id: "dietitian-panel", name: "Dietitian", role: "Dietitian", initial: "D", visibleToMembers: true },
    { id: "doula-panel", name: "Doula", role: "Doula", initial: "D", visibleToMembers: true },
    { id: "nurse", name: "Nurse Care Manager", role: "Nurse Care Manager", initial: "N", visibleToMembers: true },
  ];

  /** Manage modal draft — always mirrors panel roster on open; Done writes back. */
  let careTeamDraft = null;
  let careTeamSearchQuery = "";
  let careTeamSearchOpen = false;
  let openCareTeamMenuId = null;

  const careTeamCandidates = [
    { id: "cca-one", name: "CCAOne One", role: "CCA", initial: "C" },
    { id: "cca-two", name: "CCATwo Two", role: "CCA", initial: "C" },
    { id: "cca-three", name: "CCAThree Three", role: "CCA", initial: "C" },
    { id: "dietitian-one", name: "Dietitian One", role: "Dietitian", initial: "D" },
    { id: "dietitian-two", name: "Dietitian Two", role: "Dietitian", initial: "D" },
    { id: "dietitian-three", name: "Dietitian Three", role: "Dietitian", initial: "D" },
    { id: "doula-one", name: "Doula One", role: "Doula", initial: "D" },
    { id: "doula-two", name: "Doula Two", role: "Doula", initial: "D" },
  ];

  const dependents = [
    {
      id: "islea",
      name: "Islea Maggio",
      dob: "12/17/1988 (38 y/o)",
      relationship: "Spouse",
      ssnLast4: "—",
      caregiverOf: "None",
      custodialOf: "None",
      notes: "Some notes",
    },
  ];

  const memberAccordionOpen = {
    personal: true,
    contact: true,
    account: false,
  };

  const memberPersonal = {
    chosenName: "Riley Smith",
    legalName: "Rilenia Smith",
    dob: "05/12/1986 (40y)",
    ssnLast4: "1234",
    genderIdentity: "Female",
    sexAssignedAtBirth: "Female",
    pronouns: "She/her",
    ccmStatus: "Enrolled",
    opFlags: "No COE",
    flags: "VIP",
    communities: "LGBTQ+",
  };

  const memberContact = {
    phone: "(620) 304-2938",
    email: "riley.smith@email.com",
    address: "1234 Fake Street, Phoenix, AZ 17236",
    preferredContact: "Phone",
  };

  const memberAccount = {
    memberId: "RS-1986-0512",
    plan: "CalPERS PPO Basic Plan",
    relationship: "Primary",
  };

  const memberSectionMeta = {
    personal: { title: "Personal Information", toast: "Personal information updated" },
    contact: { title: "Contact Information", toast: "Contact information updated" },
    account: { title: "Account Information", toast: "Account information updated" },
  };

  const personalFields = [
    { key: "chosenName", label: "Chosen name", type: "text" },
    { key: "legalName", label: "Legal name", type: "text" },
    { key: "dob", label: "DOB", type: "date" },
    { key: "ssnLast4", label: "Last 4 of SSN", type: "text" },
    {
      key: "genderIdentity",
      label: "Gender identity",
      type: "select",
      options: ["Female", "Male", "Nonbinary", "Prefer not to say"],
    },
    {
      key: "sexAssignedAtBirth",
      label: "Sex assigned at birth",
      type: "select",
      options: ["Female", "Male", "Intersex", "Unknown"],
    },
    {
      key: "pronouns",
      label: "Pronouns",
      type: "select",
      options: ["She/her", "He/him", "They/them", "She/they", "He/they", "Other"],
    },
    {
      key: "ccmStatus",
      label: "CCM Status",
      type: "select",
      options: ["Enrolled", "Eligible", "Not eligible", "Declined"],
      displayBadge: "badge-success",
    },
    {
      key: "opFlags",
      label: "Op Flags",
      type: "select",
      options: ["No COE", "COE required", "COE on file"],
    },
    {
      key: "flags",
      label: "Flags",
      type: "select",
      options: ["None", "VIP", "High risk", "Care coordinator"],
      displayBadge: "badge-accent",
    },
    {
      key: "communities",
      label: "Communities",
      type: "select",
      options: ["None", "LGBTQ+", "Veteran", "Rural", "LGBTQ+ · Veteran"],
      displayBadge: "badge-accent",
    },
  ];

  const contactFields = [
    { key: "phone", label: "Phone number", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address", label: "Address", type: "textarea" },
    {
      key: "preferredContact",
      label: "Contact preferences",
      type: "select",
      options: ["Phone", "In-App Messaging", "No preference"],
    },
  ];

  const accountFields = [
    { key: "memberId", label: "Member ID", type: "text" },
    {
      key: "plan",
      label: "Plan",
      type: "select",
      options: [
        "CalPERS PPO Basic Plan",
        "CalPERS HMO Standard",
        "CalPERS HDHP",
        "Medicare Advantage",
      ],
    },
    {
      key: "relationship",
      label: "Relationship",
      type: "select",
      options: ["Primary", "Spouse", "Dependent", "Other"],
    },
  ];

  const memberSectionConfig = {
    personal: { fields: personalFields, state: memberPersonal },
    contact: { fields: contactFields, state: memberContact },
    account: { fields: accountFields, state: memberAccount },
  };

  const value = (text, badge = "") =>
    badge ? `<span class="badge ${badge}">${text}</span>` : text;

  const row = (label, content) =>
    `<div class="list-item"><dt>${label}</dt><dd>${content}</dd></div>`;

  const escapeAttr = (text) =>
    String(text)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");

  function displayFieldValue(field, raw) {
    if (field.displayBadge && raw && raw !== "None") {
      return value(raw, field.displayBadge);
    }
    return escapeAttr(raw);
  }

  function parseDobToIso(raw) {
    const text = String(raw ?? "").trim();
    if (!text) return "";
    const slash = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (slash) {
      const [, mm, dd, yyyy] = slash;
      return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    }
    const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
    return "";
  }

  function dobAgeFromIso(iso) {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return null;
    const birth = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDelta = today.getMonth() - birth.getMonth();
    if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) age -= 1;
    return age;
  }

  function formatDobDisplayFromIso(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return "";
    const age = dobAgeFromIso(iso);
    const mm = String(m).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return age == null ? `${mm}/${dd}/${y}` : `${mm}/${dd}/${y} (${age}y)`;
  }

  function formatDobFieldFromIso(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return "";
    return `${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}/${y}`;
  }

  function todayIsoDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  const DOB_MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function setDobViewMonth(wrap, year, month) {
    wrap.dataset.viewYear = String(year);
    wrap.dataset.viewMonth = String(month);
  }

  function dobViewFromIso(iso) {
    const text = iso || todayIsoDate();
    const [y, m] = text.split("-").map(Number);
    const now = new Date();
    return { year: y || now.getFullYear(), month: m || now.getMonth() + 1 };
  }

  function renderDobCalendar(wrap) {
    const cal = wrap.querySelector(".dob-calendar");
    const dateInput = wrap.querySelector(".inline-dob-date");
    if (!cal) return;
    const selected = dateInput?.value || "";
    const today = todayIsoDate();
    let year = Number(wrap.dataset.viewYear);
    let month = Number(wrap.dataset.viewMonth);
    if (!year || !month) {
      const view = dobViewFromIso(selected);
      year = view.year;
      month = view.month;
      setDobViewMonth(wrap, year, month);
    }
    const title = cal.querySelector(".dob-calendar-title");
    if (title) title.textContent = `${DOB_MONTHS[month - 1]} ${year}`;
    const startDow = new Date(year, month - 1, 1).getDay();
    const gridStart = new Date(year, month - 1, 1 - startDow);
    const cells = [];
    for (let i = 0; i < 42; i += 1) {
      const cell = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      const y = cell.getFullYear();
      const m = cell.getMonth() + 1;
      const d = cell.getDate();
      const cellIso = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const classes = ["dob-calendar-day"];
      if (m !== month) classes.push("is-outside");
      if (cellIso === today) classes.push("is-today");
      if (selected && cellIso === selected) classes.push("is-selected");
      cells.push(
        `<button type="button" class="${classes.join(" ")}" data-iso="${cellIso}">${d}</button>`
      );
    }
    const grid = cal.querySelector(".dob-calendar-grid");
    if (grid) grid.innerHTML = cells.join("");
  }

  function syncInlineDobWrap(wrap, updateHidden = true) {
    const dateInput = wrap.querySelector(".inline-dob-date");
    const hidden = wrap.querySelector("input[data-field]");
    const label = wrap.querySelector(".inline-dob-label");
    if (!dateInput) return;
    const iso = dateInput.value;
    if (iso) {
      if (updateHidden && hidden) hidden.value = formatDobDisplayFromIso(iso);
      if (label) {
        label.textContent = formatDobFieldFromIso(iso);
        label.classList.remove("is-placeholder");
      }
    } else {
      if (updateHidden && hidden) hidden.value = "";
      if (label) {
        label.textContent = "MM/DD/YYYY";
        label.classList.add("is-placeholder");
      }
    }
  }

  function inlineControl(sectionId, field, raw) {
    const id = `member-${sectionId}-${field.key}`;
    if (field.type === "select") {
      const options = (field.options || [])
        .map((opt) => {
          const selected = opt === raw;
          return `<button type="button" role="option" class="${selected ? "is-selected" : ""}" data-value="${escapeAttr(opt)}" aria-selected="${selected}">
            <span>${escapeAttr(opt)}</span>${selected ? icon.check : ""}
          </button>`;
        })
        .join("");
      /* Soma Select / Field — trigger + Select / Item popup (trailing check), shared menu motion */
      return `<div class="select-wrap inline-select">
        <input type="hidden" id="${id}" data-field="${field.key}" value="${escapeAttr(raw)}" />
        <button type="button" class="inline-field-control select-trigger" aria-expanded="false" aria-haspopup="listbox" aria-controls="${id}-menu" id="${id}-trigger">
          <span class="select-trigger-label">${escapeAttr(raw)}</span>${icon.down}
        </button>
        <div class="select-menu" id="${id}-menu" role="listbox" hidden>${options}</div>
      </div>`;
    }
    if (field.type === "textarea") {
      return `<textarea class="inline-field-control inline-field-textarea" id="${id}" data-field="${field.key}" rows="2">${escapeAttr(raw)}</textarea>`;
    }
    if (field.type === "date") {
      const iso = parseDobToIso(raw);
      /* Age `(Ny)` only on the saved/read-only label — not beside the picker */
      const display = iso ? formatDobFieldFromIso(iso) : "MM/DD/YYYY";
      const placeholderClass = iso ? "" : " is-placeholder";
      const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        .map((day) => `<span>${day}</span>`)
        .join("");
      return `<div class="inline-dob-wrap">
        <div class="inline-dob-control">
          <button type="button" class="inline-field-control inline-dob-trigger" id="${id}" aria-expanded="false" aria-haspopup="dialog" aria-controls="${id}-cal" aria-label="Date of birth">
            <span class="inline-dob-label${placeholderClass}">${escapeAttr(display)}</span>${icon.calendar}
          </button>
          <div class="dob-calendar" id="${id}-cal" role="dialog" aria-label="Choose date" hidden>
            <div class="dob-calendar-header">
              <button type="button" class="dob-calendar-nav" data-dob-prev aria-label="Previous month">${icon.chevronLeft}</button>
              <div class="dob-calendar-title"></div>
              <button type="button" class="dob-calendar-nav dob-calendar-nav--next" data-dob-next aria-label="Next month">${icon.chevronLeft}</button>
            </div>
            <div class="dob-calendar-weekdays" aria-hidden="true">${weekdays}</div>
            <div class="dob-calendar-grid"></div>
            <div class="dob-calendar-footer">
              <button type="button" class="dob-calendar-action" data-dob-clear>Clear</button>
              <button type="button" class="dob-calendar-action" data-dob-today>Today</button>
            </div>
          </div>
        </div>
        <input type="hidden" class="inline-dob-date" value="${escapeAttr(iso)}" />
        <input type="hidden" data-field="${field.key}" value="${escapeAttr(raw)}" />
      </div>`;
    }
    return `<input class="inline-field-control" id="${id}" type="text" data-field="${field.key}" value="${escapeAttr(raw)}" />`;
  }

  function applyDobIso(wrap, iso) {
    const dateInput = wrap.querySelector(".inline-dob-date");
    if (dateInput) dateInput.value = iso || "";
    syncInlineDobWrap(wrap, true);
    renderDobCalendar(wrap);
    syncMemberEditChrome();
  }

  function closeInlineDobCalendars(except) {
    stage.querySelectorAll(".inline-dob-wrap.is-open").forEach((wrap) => {
      if (wrap === except) return;
      const cal = wrap.querySelector(".dob-calendar");
      const trigger = wrap.querySelector(".inline-dob-trigger");
      if (!cal || cal.hidden) {
        wrap.classList.remove("is-open");
        return;
      }
      hideMenuPopover(cal);
      wrap.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
    });
  }

  function bindInlineDobFields() {
    stage.querySelectorAll(".inline-dob-wrap").forEach((wrap) => {
      const trigger = wrap.querySelector(".inline-dob-trigger");
      const cal = wrap.querySelector(".dob-calendar");
      const dateInput = wrap.querySelector(".inline-dob-date");
      if (!trigger || !cal || !dateInput || wrap.dataset.dobBound === "true") return;
      wrap.dataset.dobBound = "true";
      syncInlineDobWrap(wrap, false);
      renderDobCalendar(wrap);

      const closeCalendar = () => {
        if (cal.hidden) {
          wrap.classList.remove("is-open");
          return;
        }
        hideMenuPopover(cal);
        wrap.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      };

      const openCalendar = () => {
        const view = dobViewFromIso(dateInput.value);
        setDobViewMonth(wrap, view.year, view.month);
        renderDobCalendar(wrap);
        showMenuPopover(cal);
        wrap.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        /* Remeasure after paint — fixed place clears Task list / Save bar */
        requestAnimationFrame(() => {
          positionDobCalendar(cal);
          requestAnimationFrame(() => positionDobCalendar(cal));
        });
      };

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = cal.hidden || cal.classList.contains("is-leaving");
        closeInlineSelects();
        closeInlineDobCalendars(wrap);
        if (opening) openCalendar();
        else closeCalendar();
      });

      cal.addEventListener("click", (event) => {
        event.stopPropagation();
        if (event.target.closest("[data-dob-prev]")) {
          let month = Number(wrap.dataset.viewMonth) - 1;
          let year = Number(wrap.dataset.viewYear);
          if (month < 1) {
            month = 12;
            year -= 1;
          }
          setDobViewMonth(wrap, year, month);
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        if (event.target.closest("[data-dob-next]")) {
          let month = Number(wrap.dataset.viewMonth) + 1;
          let year = Number(wrap.dataset.viewYear);
          if (month > 12) {
            month = 1;
            year += 1;
          }
          setDobViewMonth(wrap, year, month);
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        if (event.target.closest("[data-dob-clear]")) {
          applyDobIso(wrap, "");
          closeCalendar();
          return;
        }
        if (event.target.closest("[data-dob-today]")) {
          applyDobIso(wrap, todayIsoDate());
          closeCalendar();
          return;
        }
        const day = event.target.closest("[data-iso]");
        if (day?.dataset.iso) {
          applyDobIso(wrap, day.dataset.iso);
          closeCalendar();
        }
      });
    });
  }

  function closeInlineSelects(except) {
    stage.querySelectorAll(".inline-select.is-open").forEach((wrap) => {
      if (wrap === except) return;
      const menu = wrap.querySelector(".select-menu");
      const trigger = wrap.querySelector(".select-trigger");
      if (!menu || menu.hidden) {
        wrap.classList.remove("is-open");
        return;
      }
      hideMenuPopover(menu);
      wrap.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
    });
  }

  function bindInlineSelects() {
    stage.querySelectorAll(".inline-select").forEach((wrap) => {
      const trigger = wrap.querySelector(".select-trigger");
      const menu = wrap.querySelector(".select-menu");
      const hidden = wrap.querySelector("input[data-field]");
      const label = wrap.querySelector(".select-trigger-label");
      if (!trigger || !menu || !hidden || !label) return;

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = menu.hidden || menu.classList.contains("is-leaving");
        closeInlineSelects(wrap);
        closeInlineDobCalendars();
        if (opening) {
          showMenuPopover(menu);
          wrap.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        } else {
          hideMenuPopover(menu);
          wrap.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        }
      });

      menu.querySelectorAll("[data-value]").forEach((option) => {
        option.addEventListener("click", (event) => {
          event.stopPropagation();
          const value = option.dataset.value ?? "";
          hidden.value = value;
          label.textContent = value;
          menu.querySelectorAll("[data-value]").forEach((row) => {
            const on = row === option;
            row.classList.toggle("is-selected", on);
            row.setAttribute("aria-selected", String(on));
            const check = row.querySelector("svg");
            if (on && !check) row.insertAdjacentHTML("beforeend", icon.check);
            else if (!on && check) check.remove();
          });
          hideMenuPopover(menu);
          wrap.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
          syncMemberEditChrome();
        });
      });
    });
  }

  function rowsForSection(sectionId, editing) {
    const { fields, state } = memberSectionConfig[sectionId];
    return fields
      .map((field) => {
        const raw = state[field.key] ?? "";
        const content = editing
          ? inlineControl(sectionId, field, raw)
          : displayFieldValue(field, raw);
        const rowClass = editing ? "list-item inline-field" : "list-item";
        return `<div class="${rowClass}"><dt>${field.label}</dt><dd>${content}</dd></div>`;
      })
      .join("");
  }

  function accordionSection(sectionId) {
    const { title } = memberSectionMeta[sectionId];
    const editing = memberEditingSection === sectionId;
    const open = editing || memberAccordionOpen[sectionId];
    const rows = rowsForSection(sectionId, editing);
    const headerAction = editing
      ? `<button class="edit-cancel" type="button" data-cancel-section="${sectionId}">Cancel</button>`
      : `<button class="edit-section" type="button" data-edit-section="${sectionId}" aria-label="Edit ${title}">${icon.edit}</button>`;

    return `
    <section class="accordion${open ? " is-open" : ""}${editing ? " is-editing" : ""}" data-section="${sectionId}">
      <div class="accordion-header-row">
        <button class="accordion-toggle" type="button" aria-expanded="${open}" ${
          editing ? 'data-editing="true"' : ""
        }>
          <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
          <strong>${title}</strong>
        </button>
        ${headerAction}
      </div>
      <div class="accordion-body">
        <dl class="accordion-fields">${rows}</dl>
      </div>
    </section>`;
  }

  function memberEditBarHtml() {
    if (!memberEditingSection) return "";
    return `
      <div class="panel-edit-bar" data-edit-bar>
        <button class="button button-secondary" type="button" data-cancel-section="${memberEditingSection}">Cancel</button>
        <button class="button button-primary" type="button" data-save-section="${memberEditingSection}">Save</button>
      </div>`;
  }

  function memberAccordionsHtml() {
    // Focus mode while editing: only the active section stays in view.
    // Save stays pinned in panel chrome above Task list (not inside the scroll).
    const sections = ["personal", "contact", "account"];
    if (memberEditingSection) {
      return accordionSection(memberEditingSection);
    }
    return sections.map((id) => accordionSection(id)).join("");
  }

  function memberStateForSection(sectionId) {
    return memberSectionConfig[sectionId].state;
  }

  function snapshotMemberSection(sectionId) {
    const state = memberStateForSection(sectionId);
    const snap = {};
    (memberSectionConfig[sectionId].fields || []).forEach((field) => {
      snap[field.key] = String(state[field.key] ?? "").trim();
    });
    return snap;
  }

  function readMemberEditValues(sectionId) {
    const values = {};
    const section = stage.querySelector(`.accordion[data-section="${sectionId}"]`);
    section?.querySelectorAll("[data-field]").forEach((el) => {
      const key = el.dataset.field;
      if (key) values[key] = el.value.trim();
    });
    return values;
  }

  function isMemberEditDirty() {
    if (!memberEditingSection || !memberEditBaseline) return false;
    const current = readMemberEditValues(memberEditingSection);
    const keys = Object.keys(memberEditBaseline);
    if (keys.length !== Object.keys(current).length) return true;
    return keys.some((key) => (current[key] ?? "") !== (memberEditBaseline[key] ?? ""));
  }

  function clearMemberEditChrome() {
    const content = stage.querySelector('.panel-content[data-content="member"]');
    content?.classList.remove("is-section-editing");
    content?.querySelector("[data-edit-bar]")?.remove();
  }

  function syncMemberEditChrome() {
    const content = stage.querySelector('.panel-content[data-content="member"]');
    if (!content) return;
    const editing = Boolean(memberEditingSection);
    const dirty = isMemberEditDirty();
    content.classList.toggle("is-section-editing", editing);
    content.querySelector("[data-edit-bar]")?.remove();
    const taskList = content.querySelector(".task-list-accordion");
    /* Best practice: hide Save/Cancel until something actually changed */
    if (editing && dirty && taskList) {
      taskList.insertAdjacentHTML("beforebegin", memberEditBarHtml());
      content.querySelectorAll("[data-cancel-section]").forEach((btn) => {
        btn.addEventListener("click", () => cancelMemberEdit());
      });
      content.querySelectorAll("[data-save-section]").forEach((btn) => {
        btn.addEventListener("click", () => saveMemberEdit(btn.dataset.saveSection));
      });
    }
  }

  function abandonMemberEdit() {
    memberEditingSection = null;
    memberEditBaseline = null;
    clearMemberEditChrome();
  }

  function commitMemberEditFields(sectionId) {
    const state = memberStateForSection(sectionId);
    const section = stage.querySelector(`.accordion[data-section="${sectionId}"]`);
    section?.querySelectorAll(".inline-dob-wrap").forEach((wrap) => syncInlineDobWrap(wrap, true));
    section?.querySelectorAll("[data-field]").forEach((el) => {
      const key = el.dataset.field;
      if (key) state[key] = el.value.trim();
    });
  }

  /**
   * Leave edit safely. Clean → exit quietly. Dirty → Soma Dialog (Save / Discard).
   * Dismiss / Escape keeps editing.
   */
  function requestLeaveMemberEdit(next) {
    if (!memberEditingSection) {
      next?.();
      return;
    }
    if (!isMemberEditDirty()) {
      abandonMemberEdit();
      const pane = stage.querySelector('.tab-pane[data-pane="member"]');
      if (pane) {
        pane.innerHTML = memberAccordionsHtml();
        bindAccordionActions();
      }
      next?.();
      return;
    }
    pendingLeaveAction = next || null;
    unsavedConfirmOpen = true;
    openModal({
      title: "Save your edits before leaving?",
      body: `<p class="modal-copy">If you discard, your changes will be lost.</p>`,
      footer: `
        <button class="button button-secondary" type="button" id="unsaved-discard">Discard</button>
        <button class="button button-primary" type="button" id="unsaved-save">Save</button>
      `,
      variant: "confirm",
      dismissible: true,
    });
    document.querySelector("#unsaved-discard")?.addEventListener("click", () => {
      const resume = pendingLeaveAction;
      pendingLeaveAction = null;
      unsavedConfirmOpen = false;
      abandonMemberEdit();
      closeModal();
      const pane = stage.querySelector('.tab-pane[data-pane="member"]');
      if (pane) {
        pane.innerHTML = memberAccordionsHtml();
        bindAccordionActions();
      }
      resume?.();
    });
    document.querySelector("#unsaved-save")?.addEventListener("click", () => {
      const sectionId = memberEditingSection;
      const resume = pendingLeaveAction;
      pendingLeaveAction = null;
      unsavedConfirmOpen = false;
      if (sectionId) {
        commitMemberEditFields(sectionId);
        const toast = memberSectionMeta[sectionId]?.toast;
        abandonMemberEdit();
        closeModal();
        if (toast) showToast(toast);
      } else {
        closeModal();
      }
      resume?.();
    });
  }

  function startMemberEdit(sectionId) {
    memberEditingSection = sectionId;
    memberEditBaseline = snapshotMemberSection(sectionId);
    memberAccordionOpen[sectionId] = true;
    refreshMemberPane();
    const pane = stage.querySelector('.tab-pane[data-pane="member"]');
    pane?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelMemberEdit() {
    abandonMemberEdit();
    refreshMemberPane();
  }

  function saveMemberEdit(sectionId) {
    commitMemberEditFields(sectionId);
    const toast = memberSectionMeta[sectionId]?.toast;
    abandonMemberEdit();
    refreshMemberPane();
    if (toast) showToast(toast);
  }

  function refreshMemberPane() {
    const pane = stage.querySelector('.tab-pane[data-pane="member"]');
    if (!pane) return;
    pane.innerHTML = memberAccordionsHtml();
    syncMemberEditChrome();
    bindAccordionActions();
  }

  function taskListHtml() {
    const open = taskListOpen;
    return `
      <footer class="task-list-accordion${open ? " is-open" : ""}" data-task-list>
        <div class="task-list-panel" id="task-list-panel" role="region" aria-label="Task list">
          <p class="task-list-empty">No tasks yet</p>
          <button class="button button-secondary task-list-create" type="button" data-task-create>
            Create Task
          </button>
        </div>
        <button class="task-list-toggle" type="button" aria-expanded="${open}" aria-controls="task-list-panel">
          <strong>Task list</strong>
          <span class="soft-badge soft-warning" aria-label="${taskListCount} tasks">${taskListCount}</span>
          <span class="task-list-chevron" aria-hidden="true">${icon.chevron}</span>
        </button>
      </footer>`;
  }

  function memberTemplate() {
    const editingClass = memberEditingSection ? " is-section-editing" : "";
    return `
    <article class="panel-content${editingClass}" data-content="member">
      <header class="panel-header">
        <h2>Member Information</h2>
        <div class="panel-actions">
          <div class="view-menu-wrap">
            <button class="button button-secondary view-in-button" type="button" aria-expanded="false" aria-haspopup="menu">View in ${icon.down}</button>
            <div class="view-menu" role="menu" hidden>
              <button type="button" role="menuitem" data-destination="Hub">
                <span class="view-menu-icon" aria-hidden="true">${icon.arrowTopRight}</span>
                View in Hub
              </button>
              <button type="button" role="menuitem" data-destination="Athena">
                <span class="view-menu-icon" aria-hidden="true">${icon.arrowTopRight}</span>
                View in Athena
              </button>
            </div>
          </div>
          <div class="more-menu-wrap">
            <button class="icon-button icon-button--more" type="button" aria-label="More member options" aria-expanded="false" aria-haspopup="menu">${icon.more}</button>
            <div class="more-menu" role="menu" hidden>
              <button type="button" role="menuitem" data-more-action="Care call">Care call</button>
              <button type="button" role="menuitem" data-more-action="Schedule appointment">Schedule appointment</button>
              <button type="button" role="menuitem" data-more-action="Search Provider">Search Provider</button>
              <button type="button" role="menuitem" data-more-action="Create a case">Create a case</button>
              <button type="button" role="menuitem" data-more-action="Start CCM Intake">Start CCM Intake</button>
              <button type="button" role="menuitem" data-more-action="Ask KST">Ask KST</button>
              <button type="button" role="menuitem" data-more-action="Send Upcoming Call SMS">Send Upcoming Call SMS</button>
            </div>
          </div>
          <button class="icon-button panel-close" type="button" aria-label="Close Member Information">${icon.close}</button>
        </div>
      </header>
      <div class="tabs" role="tablist">
        <button class="tab is-active" type="button" role="tab" data-tab="member" aria-selected="true">Member</button>
        <button class="tab" type="button" role="tab" data-tab="care-team" aria-selected="false">Care Team <span class="soft-badge soft-neutral tab-count" aria-label="${careTeamMembers.length} care team members">${careTeamMembers.length}</span></button>
        <button class="tab" type="button" role="tab" data-tab="dependents" aria-selected="false">Dependents</button>
      </div>
      <div class="tab-pane" data-pane="member">
        ${memberAccordionsHtml()}
      </div>
      ${memberEditBarHtml()}
      ${taskListHtml()}
    </article>`;
  }

  const insuranceBenefits = [
    ["Individual Deductible", "$300", "$1,500"],
    ["Family Deductible", "$700", "$3,000"],
    ["Standard Coinsurance", "10%", "20%"],
    ["Individual OOP", "$3,500", "$4,500"],
    ["Family OOP", "$7,000", "$9,000"],
    ["Benefit Services", "", "", "section"],
    ["Primary Care Office Visit", "$30 Copay — Deductible does not apply", "Ded/20%"],
    ["Specialist Office Visit", "$40 Copay — Deductible does not apply", "Ded/20%"],
    ["Urgent Care", "$40 Copay — Deductible does not apply", "Ded/20%"],
  ];

  const insurancePlans = [
    { id: "aetna", name: "2026 Aetna PPO Premium", carrier: "Aetna", premium: "$62.76/mo", ihp: true },
    { id: "anthem", name: "2026 Anthem HMO Select", carrier: "Anthem", premium: "$48.50/mo" },
    { id: "cigna", name: "2026 Cigna EPO Plus", carrier: "Cigna", premium: "$55.20/mo" },
  ];

  const priorAuths = [
    ["769681006", "2024/10/01", "2024/10/31", "99213", "1937305", "Dr. Sarah Chen", "Pending"],
    ["734219008", "2024/09/15", "2024/10/15", "99214", "1937305", "Dr. Marcus Webb", "Pending"],
    ["769681006", "2024/07/31", "2024/08/29", "73221", "1", "Dr. Emily Torres", "Approved"],
    ["813471003", "2024/06/01", "2024/06/30", "90837", "1937305", "Dr. James Park", "Denied"],
    ["769681006", "2023/10/03", "2023/11/01", "73221", "1", "Dr. Aisha Rahman", "Approved"],
    ["230145002", "2023/08/08", "2023/09/06", "70450", "1", "Dr. Ben Alvarez", "Approved"],
    ["769681006", "2023/05/12", "2023/06/11", "99215", "1937305", "Dr. Nina Patel", "Approved"],
  ];

  function insuranceTabsHtml() {
    return `<div class="tabs ins-tabs" role="tablist">
      ${[
        ["member-plan", "Member Plan", null],
        ["activity", "Insurance Activity", null],
        ["prior-auth", "Prior Authorizations", priorAuths.length],
      ].map(([id, label, count]) => `<button class="tab${insuranceState.tab === id ? " is-active" : ""}" type="button" role="tab" data-ins-tab="${id}" aria-selected="${insuranceState.tab === id}">${label}${
        count != null ? ` <span class="soft-badge soft-neutral tab-count" aria-label="${count} items">${count}</span>` : ""
      }</button>`).join("")}
    </div>`;
  }

  function insuranceMemberPlanHtml() {
    const q = insuranceState.benefitQuery.trim().toLowerCase();
    const rows = insuranceBenefits.filter((item) => item[3] === "section" || item[0].toLowerCase().includes(q));
    return `<div class="ins-main-pane">
      <dl class="ins-summary">
        ${row("Insurance Provider", "Aetna")}
        ${row("Phone", "111-111-1111")}
        ${row("Plan Name", "Aetna Choice")}
        ${row("Insurance Effective Date", "12/31/2025")}
        ${row("Network Name", "Aetna Choice")}
      </dl>
      <div class="ins-section-head"><h3>Member Plan Details</h3><button class="button button-secondary ins-compact-button" id="ins-compare-open" type="button">Compare plans</button></div>
      <label class="elig-search ins-benefit-search">
        <span class="elig-search-icon" aria-hidden="true">${icon.search}</span>
        <input id="ins-benefit-search" type="search" placeholder="Search benefits..." value="${escapeAttr(insuranceState.benefitQuery)}" />
      </label>
      <div class="ins-table-wrap"><table class="ins-table ins-benefit-table">
        <thead><tr><th>Benefit Name</th><th>In-Network</th><th>Out-of-Network</th></tr></thead>
        <tbody id="ins-benefit-rows">${rows.map((item) => item[3] === "section"
          ? `<tr class="ins-section-row"><th colspan="3">${item[0]}</th></tr>`
          : `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>`;
  }

  function activityMeterHtml(label, spent, total, remaining) {
    const percent = Math.min(100, (spent / total) * 100);
    return `<div class="ins-meter">
      <div class="ins-meter-top"><strong>${label}</strong><span>$${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })} remaining</span></div>
      <div class="ins-progress"><span style="--progress:${percent}%"></span></div>
      <div class="ins-meter-meta"><span>$${spent.toLocaleString(undefined, { minimumFractionDigits: 2 })} spent</span><span>$${total.toLocaleString(undefined, { minimumFractionDigits: 2 })} total</span></div>
    </div>`;
  }

  function insuranceActivityHtml() {
    const out = insuranceState.networkMode === "out";
    const network = out ? "Out-of-network" : "In-network";
    return `<div class="ins-main-pane">
      <div class="ins-activity-toolbar">
        <button class="button button-secondary button-small" id="ins-claims" type="button">${icon.arrowTopRight} View claims</button>
        <div class="ins-segmented ins-segmented--small" role="group" aria-label="Network">
          <span class="ins-segmented-thumb" aria-hidden="true"></span>
          <button type="button" data-ins-network="in" class="${out ? "" : "is-active"}">In-network</button>
          <button type="button" data-ins-network="out" class="${out ? "is-active" : ""}">Out-of-network</button>
        </div>
      </div>
      <section class="ins-meter-card">
        <header>Deductible (${network}) <button class="ins-info" type="button" aria-label="About deductible">${icon.info}<span class="ins-info-tip" role="tooltip">The amount the member pays for covered health care services before the plan begins to pay.</span></button></header>
        ${activityMeterHtml("Individual", 175, 1750, 1575)}
        ${activityMeterHtml("Family", 175, 1750, 1575)}
      </section>
      <section class="ins-meter-card">
        <header>Out-of-pocket maximum (${network}) <button class="ins-info" type="button" aria-label="About out-of-pocket maximum">${icon.info}<span class="ins-info-tip" role="tooltip">The most the member pays for covered services in a plan year. After this amount is reached, the plan pays 100% of covered benefits.</span></button></header>
        ${activityMeterHtml("Individual", out ? 175 : 11225, out ? 1750 : 23804.5, 12579.5)}
        ${activityMeterHtml("Family", out ? 175 : 11225, out ? 1750 : 23804.5, 12579.5)}
      </section>
    </div>`;
  }

  function insurancePriorAuthHtml() {
    const badgeClass = (status) => status === "Approved" ? "soft-success" : status === "Denied" ? "soft-danger" : "soft-warning";
    return `<div class="ins-main-pane">
      <div class="ins-auth-head ins-auth-head--meta">
        <span>Updated 3 minutes ago</span>
      </div>
      <div class="ins-table-wrap ins-auth-scroll"><table class="ins-table ins-auth-table">
        <thead><tr><th>Diagnosis Code</th><th>Start Period</th><th>End Period</th><th>Procedure Code</th><th>Episode ID</th><th>Attending Provider</th><th>Status</th></tr></thead>
        <tbody>${priorAuths.map((r) => `<tr>${r.slice(0, 6).map((v) => `<td>${v}</td>`).join("")}<td><span class="soft-badge ${badgeClass(r[6])}">${r[6]}</span></td></tr>`).join("")}</tbody>
      </table></div>
    </div>`;
  }

  function insuranceMainTemplate() {
    const content = insuranceState.tab === "activity" ? insuranceActivityHtml() : insuranceState.tab === "prior-auth" ? insurancePriorAuthHtml() : insuranceMemberPlanHtml();
    return `<article class="panel-content ins-panel" data-content="insurance">
      <header class="panel-header"><h2>Insurance</h2><button class="icon-button panel-close" type="button" aria-label="Close Insurance">${icon.close}</button></header>
      ${insuranceTabsHtml()}
      <div class="panel-scroll ins-scroll">${content}</div>
      ${taskListHtml()}
    </article>`;
  }

  function insuranceCompareSelectTemplate() {
    const selected = insuranceState.compareSelected;
    const names = selected.map((id) => insurancePlans.find((p) => p.id === id)?.name).filter(Boolean);
    return `<article class="panel-content ins-panel" data-content="insurance">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back"><button class="icon-button panel-back" type="button" data-ins-back="main" aria-label="Back">${icon.chevronLeft}</button><h2>Compare Plans</h2></div>
        <button class="icon-button panel-close" type="button" aria-label="Close Insurance">${icon.close}</button>
      </header>
      <div class="panel-scroll ins-scroll ins-compare-select">
        <div class="ins-plans-heading">
          <h3>Compare up to 2 plans for Riley</h3>
        </div>
        <div class="ins-plan-options">${insurancePlans.map((plan) => {
          const checked = selected.includes(plan.id);
          const disabled = !checked && selected.length >= 2;
          return `<label class="ins-plan-option${checked ? " is-selected" : ""}${disabled ? " is-disabled" : ""}">
            <input type="checkbox" data-ins-plan="${plan.id}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
            <span><strong>${plan.name} ${plan.ihp ? `<span class="soft-badge soft-accent">IHP</span>` : ""}</strong><small>${plan.carrier} · Employee Only: ${plan.premium}</small></span>
          </label>`;
        }).join("")}</div>
        <button class="ins-accordion-row" type="button">Additional Plans <span>${icon.chevron}</span></button>
        <section class="ins-employer"><h3>From the Employer</h3><p class="ins-employer-caption">Share this link so members can explore and compare all available plans.</p>
          <div class="ins-copy-field">${icon.link}<span class="ins-copy-url">https://benefits.employer.com/compare-plans</span><button class="button button-secondary button-small ins-compact-button" id="ins-copy" type="button">Copy link</button></div>
        </section>
      </div>
      <footer class="ins-sticky-footer${selected.length === 0 ? " is-empty" : ""}"${selected.length === 0 ? " hidden" : ""}><span class="ins-sticky-footer-label"><span class="ins-sticky-footer-text">${selected.length === 2 ? `${names[0]} vs. ${names[1]}` : "Select 1 more"}</span><span class="ins-sticky-footer-tip" role="tooltip"></span></span><button class="button button-primary ins-compact-button" id="ins-compare-submit" type="button" ${selected.length === 2 ? "" : "disabled"}>Compare Plans</button></footer>
      ${taskListHtml()}
    </article>`;
  }

  function compareDropdownHtml(kind, label, options, selected, { showIhpInTrigger = true } = {}) {
    const open = insuranceState.openDropdown === kind;
    const selectedOption = options.find(([id]) => id === selected);
    const triggerLabel = label || selectedOption?.[1] || "";
    const ihpInTrigger = showIhpInTrigger && selectedOption?.[2];
    return `<div class="ins-dropdown-wrap${open ? " is-open" : ""}"><button class="ins-dropdown-trigger" type="button" data-ins-dropdown="${kind}" aria-expanded="${open}"><span>${triggerLabel}${ihpInTrigger ? ` <span class="soft-badge soft-accent">IHP</span>` : ""}</span>${icon.down}</button>
      <div class="ins-dropdown-menu" ${open ? "" : "hidden"}>${options.map(([id, text, ihp]) => `<button type="button" data-ins-dropdown-option="${kind}" data-value="${id}" class="${id === selected ? "is-selected" : ""}"><span>${text}${ihp ? ` <span class="soft-badge soft-accent">IHP</span>` : ""}</span>${id === selected ? icon.check : ""}</button>`).join("")}</div>
    </div>`;
  }

  function insuranceCompareControlsHtml() {
    const planOptions = insurancePlans.map((p) => [p.id, p.name.replace("2026 ", "").replace(" Premium", " Premium 2024").replace(" Select", " Select 2024"), p.ihp]);
    const planA = insurancePlans.find((p) => p.id === insuranceState.comparePlanIds[0]);
    const planB = insurancePlans.find((p) => p.id === insuranceState.comparePlanIds[1]);
    const ihpSlot = (show) =>
      `<div class="ins-cmp-ihp-slot">${show ? `<span class="soft-badge soft-accent">IHP</span>` : ""}</div>`;
    const shareTipsHtml = `<div class="ins-share-tips-wrap">
          <button class="ins-share-tips" id="ins-tips" type="button" title="Share these tips" aria-describedby="ins-tips-popover">${icon.infoFilled}<span>Share these tips</span></button>
          <aside class="ins-tips-popover" id="ins-tips-popover" role="tooltip">
            <button type="button" id="ins-tips-close" class="ins-tips-close" aria-label="Close tips" hidden>${icon.close}</button>
            <strong>Don’t forget to share these tips with the member</strong>
            <ul>
              <li><strong>Set up your account and download the app.</strong> Check provider and facility tiers and copays wherever you are.</li>
              <li><strong>Check your cost before you go.</strong> The same service may cost more or less depending on the provider and location.</li>
              <li><strong>Don’t pay at the visit.</strong> You’ll be billed later, even if the office asks you to pay.</li>
            </ul>
          </aside>
        </div>`;
    return `<div class="ins-compare-controls">
          <div class="ins-cmp-col">
            ${ihpSlot(false)}
            ${compareDropdownHtml("network", insuranceState.compareNetwork === "in" ? "In Network" : "Out of Network", [["in", "In Network"], ["out", "Out of Network"]], insuranceState.compareNetwork)}
          </div>
          <div class="ins-cmp-col ins-cmp-col--plan-a">
            ${ihpSlot(Boolean(planA?.ihp))}
            ${compareDropdownHtml("plan-a", "", planOptions, insuranceState.comparePlanIds[0], { showIhpInTrigger: false })}
            ${shareTipsHtml}
          </div>
          <div class="ins-cmp-col">
            ${ihpSlot(Boolean(planB?.ihp))}
            ${compareDropdownHtml("plan-b", "", planOptions, insuranceState.comparePlanIds[1], { showIhpInTrigger: false })}
          </div>
        </div>`;
  }

  function insuranceCompareDetailTemplate() {
    return `<article class="panel-content ins-panel" data-content="insurance">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back"><button class="icon-button panel-back" type="button" data-ins-back="select" aria-label="Back">${icon.chevronLeft}</button><h2>Compare Plans</h2></div>
        <div class="panel-actions"><button class="button button-secondary ins-compact-button" id="ins-export" type="button">${icon.export} Export</button><button class="icon-button panel-close" type="button" aria-label="Close Insurance">${icon.close}</button></div>
      </header>
      <div class="panel-scroll ins-scroll ins-compare-detail">
        ${insuranceCompareControlsHtml()}
        <div class="ins-table-wrap"><table class="ins-table ins-compare-table">
          <colgroup>
            <col class="ins-cmp-col-label" />
            <col class="ins-cmp-col-plan" />
            <col class="ins-cmp-col-plan" />
          </colgroup>
          <tbody>
            <tr class="ins-section-row"><th colspan="3">Premiums</th></tr>
            <tr><td>Employee Only</td><td>$62.76</td><td>$48.50</td></tr>
            <tr><td>Employee and Children</td><td>$118.50</td><td>$95.00</td></tr>
            <tr><td>Employee and Family</td><td>$175.00</td><td>$142.00</td></tr>
            <tr><td>Employee and Spouse</td><td>$132.00</td><td>$105.00</td></tr>
            <tr class="ins-section-row"><th colspan="3">Summary</th></tr>
            <tr><td>Individual Deductible</td><td>$1,000<br>($500 copayment,<br>$500 coinsurance)</td><td>$500</td></tr>
            <tr><td>Family Deductible</td><td>$2,000</td><td>$1,000</td></tr>
            <tr><td>Standard Coinsurance</td><td>20%</td><td>15%</td></tr>
            <tr><td>Individual OOP</td><td>$4,000</td><td>$3,000</td></tr>
            <tr><td>Family OOP</td><td>$8,000</td><td>$6,000</td></tr>
            <tr class="ins-section-row"><th colspan="3">Benefit Services</th></tr>
            <tr><td>Primary Care Visit</td><td>$25</td><td>$20</td></tr>
          </tbody>
        </table></div>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  /** Toggle compare dropdown open state in the live DOM — never remounts .panel-content. */
  function applyCompareDropdownOpenState() {
    const open = insuranceState.openDropdown;
    stage.querySelectorAll(".ins-dropdown-wrap").forEach((wrap) => {
      const trigger = wrap.querySelector("[data-ins-dropdown]");
      const menu = wrap.querySelector(".ins-dropdown-menu");
      if (!trigger || !menu) return;
      const kind = trigger.dataset.insDropdown;
      const isOpen = open === kind;
      wrap.classList.toggle("is-open", isOpen);
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) showMenuPopover(menu);
      else hideMenuPopover(menu);
    });
  }

  function planOptionLabel(planId) {
    const plan = insurancePlans.find((p) => p.id === planId);
    if (!plan) return "";
    return plan.name.replace("2026 ", "").replace(" Premium", " Premium 2024").replace(" Select", " Select 2024");
  }

  /** Apply selection + close menus without replacing controls HTML (avoids panel-in). */
  function applyCompareDropdownSelection(kind, value) {
    if (kind === "network") insuranceState.compareNetwork = value;
    else insuranceState.comparePlanIds[kind === "plan-a" ? 0 : 1] = value;
    insuranceState.openDropdown = null;

    const wrap = stage.querySelector(`[data-ins-dropdown="${kind}"]`)?.closest(".ins-dropdown-wrap");
    if (!wrap) {
      applyCompareDropdownOpenState();
      return;
    }

    const triggerLabel = wrap.querySelector(".ins-dropdown-trigger > span");
    if (triggerLabel) {
      if (kind === "network") {
        triggerLabel.textContent = value === "in" ? "In Network" : "Out of Network";
      } else {
        triggerLabel.textContent = planOptionLabel(value);
      }
    }

    wrap.querySelectorAll("[data-ins-dropdown-option]").forEach((option) => {
      const selected = option.dataset.value === value;
      option.classList.toggle("is-selected", selected);
      const existing = [...option.children].find((el) => el.tagName === "svg");
      if (selected && !existing) option.insertAdjacentHTML("beforeend", icon.check);
      else if (!selected && existing) existing.remove();
    });

    if (kind === "plan-a" || kind === "plan-b") {
      const col = wrap.closest(".ins-cmp-col");
      const slot = col?.querySelector(".ins-cmp-ihp-slot");
      const plan = insurancePlans.find((p) => p.id === value);
      if (slot) {
        slot.innerHTML = plan?.ihp ? `<span class="soft-badge soft-accent">IHP</span>` : "";
      }
    }

    applyCompareDropdownOpenState();
  }

  function bindCompareDetailControls() {
    bindShareTipsHover();
    stage.querySelectorAll("[data-ins-dropdown]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const kind = trigger.dataset.insDropdown;
        insuranceState.openDropdown = insuranceState.openDropdown === kind ? null : kind;
        applyCompareDropdownOpenState();
      });
    });
    stage.querySelectorAll("[data-ins-dropdown-option]").forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        applyCompareDropdownSelection(option.dataset.insDropdownOption, option.dataset.value);
      });
    });
  }

  function insuranceTemplate() {
    if (insuranceState.view === "compare-select") return insuranceCompareSelectTemplate();
    if (insuranceState.view === "compare-detail") return insuranceCompareDetailTemplate();
    return insuranceMainTemplate();
  }

  function layoutInsSegmentedThumb(segmented, { animate = true } = {}) {
    const root = segmented || stage.querySelector(".ins-segmented");
    const thumb = root?.querySelector(".ins-segmented-thumb");
    const active = root?.querySelector("[data-ins-network].is-active");
    if (!root || !thumb || !active) return;
    if (!animate) thumb.classList.add("is-instant");
    const rootRect = root.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    thumb.style.width = `${activeRect.width}px`;
    thumb.style.transform = `translateX(${activeRect.left - rootRect.left}px)`;
    if (!animate) {
      // Force layout so removing is-instant doesn't animate the initial place.
      void thumb.offsetWidth;
      thumb.classList.remove("is-instant");
    }
  }

  /** In-place network toggle — slides thumb; swaps meters without remounting switcher. */
  function syncInsuranceNetworkMode(mode) {
    if (insuranceState.networkMode === mode) return;
    insuranceState.networkMode = mode;
    const pane = stage.querySelector(".ins-main-pane");
    const segmented = stage.querySelector(".ins-segmented");
    const onActivity =
      insuranceState.view === "main" &&
      insuranceState.tab === "activity" &&
      pane &&
      segmented;
    if (onActivity) {
      segmented.querySelectorAll("[data-ins-network]").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.insNetwork === mode);
      });
      layoutInsSegmentedThumb(segmented, { animate: true });
      const tmp = document.createElement("div");
      tmp.innerHTML = insuranceActivityHtml();
      pane.querySelectorAll(".ins-meter-card").forEach((card) => card.remove());
      tmp.querySelectorAll(".ins-meter-card").forEach((card) => pane.appendChild(card));
      return;
    }
    render("insurance");
  }

  /** Swap insurance main-tab body without remounting .panel-content (panel-in animation). */
  function syncInsuranceTab(tabId) {
    if (insuranceState.tab === tabId) return;
    insuranceState.tab = tabId;
    const scroll = stage.querySelector(".ins-panel .ins-scroll");
    const tabs = stage.querySelector(".ins-tabs");
    if (insuranceState.view === "main" && scroll && tabs) {
      tabs.querySelectorAll("[data-ins-tab]").forEach((btn) => {
        const active = btn.dataset.insTab === tabId;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-selected", String(active));
      });
      scroll.innerHTML =
        tabId === "activity"
          ? insuranceActivityHtml()
          : tabId === "prior-auth"
            ? insurancePriorAuthHtml()
            : insuranceMemberPlanHtml();
      bindInsuranceMainTabContent();
      if (tabId === "activity") {
        requestAnimationFrame(() => layoutInsSegmentedThumb(null, { animate: false }));
      }
      return;
    }
    render("insurance");
  }

  function bindInsuranceActivityControls() {
    stage.querySelectorAll("[data-ins-network]").forEach((button) => {
      button.addEventListener("click", () => {
        syncInsuranceNetworkMode(button.dataset.insNetwork);
      });
    });
    stage.querySelector("#ins-claims")?.addEventListener("click", () => showToast("Opening claims"));
    requestAnimationFrame(() => layoutInsSegmentedThumb(null, { animate: false }));
  }

  /**
   * Share tips: coach on first compare-detail visit (sticky + close),
   * then hover/focus only (no close — mouse leave hides).
   */
  function bindShareTipsHover() {
    const wrap = stage.querySelector(".ins-share-tips-wrap");
    const close = stage.querySelector("#ins-tips-close");
    const popover = stage.querySelector("#ins-tips-popover");
    if (!wrap) return;

    let hideTimer = 0;
    const inCoach = () => !insuranceState.tipsDismissed;

    const setHoverMode = () => {
      wrap.classList.remove("is-tip-coach");
      if (close) close.hidden = true;
      if (popover) popover.setAttribute("role", "tooltip");
    };

    const show = () => {
      window.clearTimeout(hideTimer);
      wrap.classList.add("is-tip-open");
    };

    const hide = () => {
      if (inCoach()) return;
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        wrap.classList.remove("is-tip-open");
      }, 120);
    };

    if (inCoach()) {
      wrap.classList.add("is-tip-coach", "is-tip-open");
      if (close) close.hidden = false;
      if (popover) popover.setAttribute("role", "dialog");
    } else {
      setHoverMode();
    }

    wrap.addEventListener("mouseenter", show);
    wrap.addEventListener("mouseleave", hide);
    wrap.addEventListener("focusin", show);
    wrap.addEventListener("focusout", (event) => {
      if (!wrap.contains(event.relatedTarget)) hide();
    });
    close?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      insuranceState.tipsDismissed = true;
      wrap.classList.remove("is-tip-open");
      setHoverMode();
    });
  }

  function bindInsuranceMainTabContent() {
    const benefitSearch = stage.querySelector("#ins-benefit-search");
    benefitSearch?.addEventListener("input", () => {
      insuranceState.benefitQuery = benefitSearch.value;
      const q = insuranceState.benefitQuery.trim().toLowerCase();
      const rows = insuranceBenefits.filter((item) => item[3] === "section" || item[0].toLowerCase().includes(q));
      const body = stage.querySelector("#ins-benefit-rows");
      if (body) {
        body.innerHTML = rows.map((item) => item[3] === "section"
          ? `<tr class="ins-section-row"><th colspan="3">${item[0]}</th></tr>`
          : `<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td></tr>`).join("");
      }
    });
    stage.querySelector("#ins-compare-open")?.addEventListener("click", () => {
      insuranceState.view = "compare-select";
      insuranceState.compareSelected = [];
      render("insurance");
    });
    bindInsuranceActivityControls();
  }

  function syncComparePlanSelection() {
    const selected = insuranceState.compareSelected;
    const names = selected.map((id) => insurancePlans.find((p) => p.id === id)?.name).filter(Boolean);

    stage.querySelectorAll("[data-ins-plan]").forEach((checkbox) => {
      const id = checkbox.dataset.insPlan;
      const checked = selected.includes(id);
      const disabled = !checked && selected.length >= 2;
      const option = checkbox.closest(".ins-plan-option");
      checkbox.checked = checked;
      checkbox.disabled = disabled;
      option?.classList.toggle("is-selected", checked);
      option?.classList.toggle("is-disabled", disabled);
    });

    const footer = stage.querySelector(".ins-sticky-footer");
    const footerLabel = footer?.querySelector(".ins-sticky-footer-label");
    const footerText = footer?.querySelector(".ins-sticky-footer-text");
    const footerTip = footer?.querySelector(".ins-sticky-footer-tip");
    const submit = stage.querySelector("#ins-compare-submit");
    if (footer) {
      const empty = selected.length === 0;
      footer.classList.toggle("is-empty", empty);
      footer.hidden = empty;
    }
    if (footerText) {
      const label =
        selected.length === 2 ? `${names[0]} vs. ${names[1]}` : "Select 1 more";
      footerText.textContent = label;
      if (footerTip) footerTip.textContent = label;
      /* Measure after layout — tip only when the vs. line actually ellipsizes */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          syncStickyFooterTip(footerLabel, footerText, footerTip, selected.length === 2 ? label : "");
        });
      });
    }
    if (submit) submit.disabled = selected.length !== 2;
  }

  function syncStickyFooterTip(label, text, tip, fullLabel) {
    if (!label || !text) return;
    /* Never set native title — it doubles the custom tip */
    label.removeAttribute("title");
    text.removeAttribute("title");
    const canTip = Boolean(fullLabel);
    const truncated = canTip && text.scrollWidth > text.clientWidth + 1;
    label.classList.toggle("is-truncated", truncated);
    if (tip) {
      tip.textContent = truncated ? fullLabel : "";
      tip.toggleAttribute("hidden", !truncated);
    }
  }

  /** Remeasure compare footer tip after panel resize / layout. */
  function refreshStickyFooterTip() {
    const footer = stage?.querySelector(".ins-sticky-footer");
    const label = footer?.querySelector(".ins-sticky-footer-label");
    const text = footer?.querySelector(".ins-sticky-footer-text");
    const tip = footer?.querySelector(".ins-sticky-footer-tip");
    if (!label || !text) return;
    const full = text.textContent?.trim() || "";
    const isComparePair = full.includes(" vs. ");
    syncStickyFooterTip(label, text, tip, isComparePair ? full : "");
  }

  function filteredBenefits() {
    const q = eligibilityState.benefitQuery.trim().toLowerCase();
    if (!q) return memberBenefits;
    return memberBenefits.filter((b) => b.name.toLowerCase().includes(q));
  }

  function benefitById(id) {
    return memberBenefits.find((b) => b.id === id) || memberBenefits[0];
  }

  function benefitIconSvg(kind) {
    return kind === "clinic" ? icon.benefitClinic : icon.benefitNodes;
  }

  function eligibilityInfoRowsHtml() {
    return eligibilityInfo
      .map((item) => {
        const valueHtml = item.meta
          ? `<span class="elig-info-value">${item.value}</span><span class="elig-meta">${item.meta}</span>`
          : `<span class="elig-info-value">${item.value}</span>`;
        return `<div class="list-item elig-info-row"><dt>${item.label}</dt><dd>${valueHtml}</dd></div>`;
      })
      .join("");
  }

  function benefitJobAidHtml(benefit) {
    if (!benefit.jobAid) return "";
    const linked = benefit.jobAid.includes(`[${benefit.jobAidLink}]`)
      ? benefit.jobAid.replace(
          `[${benefit.jobAidLink}]`,
          `<a href="#" class="benefit-tip-link">${benefit.jobAidLink}</a>`
        )
      : `${benefit.jobAid} — <a href="#" class="benefit-tip-link">${benefit.jobAidLink}</a>`;
    return `<p class="benefit-tip-jobaid">${linked}</p>`;
  }

  function benefitRecommendedBadgeHtml() {
    return `<span class="soft-badge soft-success benefit-rec-badge"><span class="benefit-rec-flag" aria-hidden="true">${icon.flagBold}</span><span class="soft-badge-label">Recommended</span></span>`;
  }

  function benefitPopoverHtml(benefit) {
    const badge = benefit.recommended ? benefitRecommendedBadgeHtml() : "";
    return `
      <div class="benefit-tip" role="tooltip">
        <div class="benefit-tip-head">
          <span class="elig-benefit-glyph" aria-hidden="true">${benefitIconSvg(benefit.icon)}</span>
          <strong class="benefit-tip-title">${benefit.name}</strong>
        </div>
        ${badge}
        ${benefitJobAidHtml(benefit)}
        <p class="benefit-tip-desc">${benefit.description}</p>
      </div>`;
  }

  function benefitTrailingHtml(benefit) {
    /* Last Activity column: activity meta, else Recommended badge (right-aligned), else dash */
    if (benefit.lastActivity) {
      return `
        <span class="elig-benefit-activity">
          <span class="elig-benefit-activity-meta">
            <span class="elig-benefit-activity-primary">${benefit.lastActivity.primary}</span>
            <span class="elig-benefit-activity-relative">${benefit.lastActivity.relative}</span>
          </span>
        </span>`;
    }
    if (benefit.recommended) {
      return `
        <span class="elig-benefit-activity elig-benefit-activity--badge">
          ${benefitRecommendedBadgeHtml()}
        </span>`;
    }
    return `
      <span class="elig-benefit-activity">
        <span class="elig-benefit-activity-dash" aria-hidden="true">—</span>
      </span>`;
  }

  function selectedBenefitCount() {
    return eligibilityState.selectedBenefitIds.size;
  }

  function isBenefitSelected(id) {
    return eligibilityState.selectedBenefitIds.has(id);
  }

  function setBenefitSelected(id, on) {
    if (on) eligibilityState.selectedBenefitIds.add(id);
    else eligibilityState.selectedBenefitIds.delete(id);
  }

  function eligibilitySelectedBarHtml() {
    const count = selectedBenefitCount();
    return `<div class="elig-selected-bar" ${count ? "" : "hidden"}>
    <span class="elig-selected-count">${count} benefit(s) selected</span>
    <button type="button" class="button button-primary elig-mark-referred">Mark benefit as referred</button>
  </div>`;
  }

  function refreshBenefitsSelectionBar() {
    const section = stage.querySelector(".elig-benefits");
    if (!section) return;
    let bar = section.querySelector(".elig-selected-bar");
    const html = eligibilitySelectedBarHtml();
    if (bar) bar.outerHTML = html;
    else {
      const head = section.querySelector(".elig-benefits-head");
      head?.insertAdjacentHTML("beforebegin", html);
    }
    bindMarkReferredButton();
  }

  function bindMarkReferredButton() {
    stage.querySelector(".elig-mark-referred")?.addEventListener("click", () => {
      const n = selectedBenefitCount();
      if (!n) return;
      showToast(`Marked ${n} benefit(s) as referred`);
    });
  }

  function eligibilityBenefitsHtml() {
    const items = filteredBenefits();
    if (!items.length) {
      return `<div class="quiet-state quiet-state--compact">No benefits match your search.</div>`;
    }
    return items
      .map(
        (benefit) => `
        <div class="elig-benefit-row${benefit.recommended ? " is-recommended" : ""}" data-benefit-id="${benefit.id}">
          <label class="elig-benefit-check-wrap" onclick="event.stopPropagation()">
            <input type="checkbox" class="elig-benefit-check" data-benefit-select="${benefit.id}" ${isBenefitSelected(benefit.id) ? "checked" : ""} aria-label="Select ${escapeAttr(benefit.name)}" />
          </label>
          <span class="elig-benefit-glyph" aria-hidden="true">${benefitIconSvg(benefit.icon)}</span>
          <div class="elig-benefit-mid">
            <button type="button" class="elig-benefit-name" data-benefit-open="${benefit.id}">
              <span class="elig-benefit-name-text">${benefit.name}</span>
              ${benefitPopoverHtml(benefit)}
            </button>
          </div>
          ${benefitTrailingHtml(benefit)}
        </div>`
      )
      .join("");
  }

  function benefitDetailRows(rows) {
    return rows
      .map(
        ([label, value]) => `
        <div class="list-item">
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>`
      )
      .join("");
  }

  function benefitBullets(items) {
    return `<ul class="benefit-detail-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function eligibilityBenefitDetailTemplate() {
    const benefit = benefitById(eligibilityState.selectedBenefitId);
    const detail = benefit.detail;
    const title = detail.titleOverride || benefit.name;

    return `
    <article class="panel-content" data-content="eligibility">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back">
          <button class="icon-button panel-back" type="button" id="back-elig-benefits" aria-label="Back">${icon.chevronLeft}</button>
          <h2>${title}</h2>
        </div>
        <button class="icon-button panel-close" type="button" aria-label="Close Eligibility">${icon.close}</button>
      </header>
      <div class="panel-scroll benefit-detail">
        <dl class="elig-summary">
          <div class="list-item"><dt>Customer</dt><dd>${detail.customer}</dd></div>
          <div class="list-item"><dt>Type</dt><dd>${detail.type}</dd></div>
        </dl>

        <h3 class="benefit-detail-section">Contact Information</h3>
        <dl class="elig-summary">${benefitDetailRows(detail.contact)}</dl>

        <h3 class="benefit-detail-section">Overview</h3>
        <h4 class="benefit-detail-subhead">Member Communication</h4>
        <div class="benefit-comm-box">${detail.memberCommunication}</div>
        <h4 class="benefit-detail-subhead">Care Team Notes</h4>
        ${detail.careTeamNotes.map((p) => `<p class="benefit-note-p">${p}</p>`).join("")}

        <section class="accordion is-open" data-section="benefit-when">
          <div class="accordion-header-row">
            <button class="accordion-toggle" type="button" aria-expanded="true">
              <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
              <strong>When to recommend</strong>
            </button>
          </div>
          <div class="accordion-body">${benefitBullets(detail.whenToRecommend)}</div>
        </section>
        <section class="accordion is-open" data-section="benefit-ask">
          <div class="accordion-header-row">
            <button class="accordion-toggle" type="button" aria-expanded="true">
              <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
              <strong>Questions to ask</strong>
            </button>
          </div>
          <div class="accordion-body">${benefitBullets(detail.questionsToAsk)}</div>
        </section>

        <h3 class="benefit-detail-section">Cost and Coverage</h3>
        <dl class="elig-summary">${benefitDetailRows(detail.cost)}</dl>

        <h3 class="benefit-detail-section">Guidance</h3>
        <dl class="elig-summary">
          <div class="list-item"><dt>Member Instructions</dt><dd>${detail.memberInstructions}</dd></div>
          <div class="list-item">
            <dt>Resources</dt>
            <dd>
              <a class="benefit-resource-link" href="${detail.resourceHref}">
                ${detail.resourceLabel}
                <span aria-hidden="true">${icon.arrowTopRight}</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function eligibilityOverviewTemplate() {
    const coverageClass = eligibilityState.enrolled
      ? "elig-coverage is-active"
      : "elig-coverage is-inactive";
    const coverageLabel = eligibilityState.enrolled
      ? eligibilityState.coverageStatus
      : "Unenrolled";

    return `
    <article class="panel-content" data-content="eligibility">
      <header class="panel-header">
        <h2>Eligibility</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Eligibility">${icon.close}</button>
      </header>
      <div class="panel-scroll">
        <dl class="elig-summary">
          <div class="list-item">
            <dt>Benefits covered by</dt>
            <dd class="elig-company-dd">
              <span class="elig-company-name">${eligibilityState.company}</span>
              <button class="icon-button elig-edit" type="button" id="edit-enrollment" aria-label="Edit enrollment status">${icon.edit}</button>
            </dd>
          </div>
          <div class="list-item">
            <dt>Coverage status</dt>
            <dd><span class="${coverageClass}">${coverageLabel}</span></dd>
          </div>
          <div class="list-item"><dt>Microsite</dt><dd>${eligibilityState.microsite}</dd></div>
          <div class="list-item"><dt>Dedicated phone line</dt><dd>${eligibilityState.phoneLine}</dd></div>
        </dl>

        <section class="accordion${eligibilityState.infoOpen ? " is-open" : ""}" data-section="elig-info">
          <div class="accordion-header-row">
            <button class="accordion-toggle" type="button" id="toggle-elig-info" aria-expanded="${eligibilityState.infoOpen}">
              <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
              <strong>Eligibility information</strong>
            </button>
          </div>
          <div class="accordion-body">
            <dl class="accordion-fields">${eligibilityInfoRowsHtml()}</dl>
          </div>
        </section>

        <section class="elig-benefits">
          <h3 class="elig-benefits-title">Member benefits</h3>
          <div class="elig-search-row">
            <label class="elig-search">
              <span class="elig-search-icon" aria-hidden="true">${icon.search}</span>
              <input id="elig-benefit-search" type="search" placeholder="Search for benefit" value="${escapeAttr(eligibilityState.benefitQuery)}" />
              <kbd class="elig-search-kbd">⌘K</kbd>
            </label>
            <button class="elig-filter-btn" type="button" id="elig-benefit-filter" aria-label="Filter benefits">${icon.filter}</button>
          </div>
          ${eligibilitySelectedBarHtml()}
          <div class="elig-benefits-head">
            <h5 class="elig-benefits-all">All Benefits</h5>
            <div class="elig-benefits-cols">
              <span>Benefit name</span>
              <span>Last Activity</span>
            </div>
          </div>
          <div class="elig-benefits-list">
            ${eligibilityBenefitsHtml()}
          </div>
        </section>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function eligibilityTemplate() {
    if (eligibilityState.view === "benefit") return eligibilityBenefitDetailTemplate();
    return eligibilityOverviewTemplate();
  }

  const templates = {
    member: memberTemplate,
    insurance: insuranceTemplate,
    eligibility: eligibilityTemplate,
  };

  function skeleton(title) {
    return `
      <article class="panel-content" aria-busy="true" aria-label="Loading ${title}">
        <header class="panel-header"><h2>${title}</h2><button class="icon-button panel-close" type="button">${icon.close}</button></header>
        <div class="skeleton-wrap">
          <div class="skeleton skeleton-badge"></div><div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-line"></div><div class="skeleton skeleton-line short"></div>
          <div class="skeleton skeleton-line"></div><div class="skeleton skeleton-button"></div>
        </div>
      </article>`;
  }

  function titleFor(name) {
    return name === "member" ? "Member Information" : name[0].toUpperCase() + name.slice(1);
  }

  function updateRail(name, expanded) {
    railButtons.forEach((button) => {
      const selected = expanded && button.dataset.panel === name;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function syncBreadcrumb(panelName, expanded) {
    const crumb = document.querySelector(".breadcrumb strong");
    if (!crumb) return;
    crumb.textContent = expanded && panelName === "eligibility" ? "Eligibility" : "Chats";
  }

  function collapsePanel() {
    const doCollapse = () => {
      clearTimeout(transitionTimer);
      clearTimeout(loaderTimer);
      panelOpen = false;
      panel.classList.add("is-collapsed");
      panel.setAttribute("aria-hidden", "true");
      panel.inert = true;
      updateRail(activePanel, false);
      syncBreadcrumb(activePanel, false);
      syncSheetChrome();
      closeModal();
    };
    requestLeaveMemberEdit(doCollapse);
  }

  function isPageEntranceActive() {
    const root = document.documentElement;
    return root.classList.contains("is-page-boot") || root.classList.contains("is-page-ready");
  }

  function render(name, options = {}) {
    clearTimeout(loaderTimer);
    const showLoader = options.forceLoader || (!loaded.has(name) && name !== "member");
    if (showLoader) {
      stage.innerHTML = skeleton(titleFor(name));
      bindPanelActions();
      loaderTimer = window.setTimeout(() => {
        loaded.add(name);
        stage.innerHTML = templates[name]();
        stage.querySelector(".panel-content")?.classList.add("is-content-reveal");
        bindPanelActions();
        requestAnimationFrame(ensurePanelFitsTabs);
        if (options.toastAfter) showToast(options.toastAfter);
      }, options.forceLoader ? 750 : 620);
      return;
    }
    stage.innerHTML = templates[name]();
    /* Skip from-right enter during page-rise — otherwise settle re-triggers panel-in */
    if (!isPageEntranceActive() && !options.skipEnter) {
      stage.querySelector(".panel-content")?.classList.add("is-entering");
    }
    bindPanelActions();
    requestAnimationFrame(ensurePanelFitsTabs);
  }

  function openPanel(name) {
    const switching = panelOpen && activePanel !== name;
    if (name === "insurance" && (!panelOpen || activePanel !== "insurance")) {
      Object.assign(insuranceState, {
        tab: "member-plan",
        view: "main",
        networkMode: "in",
        benefitQuery: "",
        compareSelected: [],
        compareNetwork: "in",
        comparePlanIds: ["aetna", "anthem"],
        tipsDismissed: false,
        openDropdown: null,
      });
    }
    activePanel = name;
    panelOpen = true;
    panel.classList.remove("is-collapsed");
    panel.removeAttribute("inert");
    panel.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-label", `${titleFor(name)} panel`);
    setPanelWidth(preferredPanelWidth(name));
    updateRail(name, true);
    syncBreadcrumb(name, true);
    syncSheetChrome();
    if (switching) {
      stage.classList.add("is-exiting");
      transitionTimer = window.setTimeout(() => {
        stage.classList.remove("is-exiting");
        render(name);
      }, 115);
    } else {
      render(name);
    }
  }

  function openEditEnrollmentModal() {
    const enrolledChecked = eligibilityState.enrolled ? "checked" : "";
    const unenrolledChecked = eligibilityState.enrolled ? "" : "checked";
    openModal({
      title: "Edit enrollment status",
      variant: "enrollment",
      body: `
        <p class="modal-subtitle">${eligibilityState.company}</p>
        <div class="enroll-radios" role="radiogroup" aria-label="Enrollment status">
          <label class="radio-row">
            <input type="radio" name="enrollment-status" value="enrolled" ${enrolledChecked} />
            <span>Enrolled</span>
          </label>
          <label class="radio-row">
            <input type="radio" name="enrollment-status" value="unenrolled" ${unenrolledChecked} />
            <span>Unenrolled</span>
          </label>
        </div>
      `,
      footer: `
        <button class="button button-secondary" type="button" data-close-modal>Cancel</button>
        <button class="button button-primary" type="button" id="modal-save-enrollment">Save</button>
      `,
    });
    document.querySelector("#modal-save-enrollment")?.addEventListener("click", () => {
      const selected = document.querySelector('input[name="enrollment-status"]:checked')?.value;
      if (selected === "unenrolled") {
        openUnenrollConfirmModal();
        return;
      }
      eligibilityState.enrolled = true;
      eligibilityState.coverageStatus = "Active";
      closeModal();
      render("eligibility");
      showToast("Enrollment updated");
    });
  }

  function openUnenrollConfirmModal() {
    openModal({
      title: "Are you sure?",
      body: `<p class="modal-copy">You cannot undo this action once the member is unenrolled.</p>`,
      footer: `
        <button class="button button-secondary" type="button" id="modal-unenroll-cancel">Cancel</button>
        <button class="button button-danger" type="button" id="modal-confirm-unenroll">Yes, unenroll</button>
      `,
      variant: "confirm",
    });
    document.querySelector("#modal-unenroll-cancel")?.addEventListener("click", () => {
      openEditEnrollmentModal();
    });
    document.querySelector("#modal-confirm-unenroll")?.addEventListener("click", () => {
      eligibilityState.enrolled = false;
      eligibilityState.coverageStatus = "Unenrolled";
      closeModal();
      render("eligibility");
      showToast("Member unenrolled");
    });
  }

  function openModal({ title, body, footer, dismissible = true, variant = null }) {
    lastFocus = document.activeElement;
    const dialog = document.querySelector(".modal");
    const alreadyOpen = modal.classList.contains("is-open");
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modalFooter.innerHTML = footer;
    modalFooter.hidden = !footer;
    modal.dataset.dismissible = String(dismissible);
    /* Apply size variant before fade-up so width doesn't jump mid-transition */
    dialog?.classList.remove("modal--care-team", "modal--enrollment", "modal--confirm");
    if (variant === "care-team") dialog?.classList.add("modal--care-team");
    else if (variant === "enrollment") dialog?.classList.add("modal--enrollment");
    else if (variant === "confirm") dialog?.classList.add("modal--confirm");

    if (alreadyOpen) {
      /*
       * Content swap (e.g. enrollment → “Are you sure?”): keep the scrim.
       * Tearing down is-open zeros scrim opacity for a frame → white flash.
       */
      modal.setAttribute("aria-hidden", "false");
      if (dialog && !reduceMotion()) {
        dialog.classList.remove("is-content-swap");
        void dialog.offsetWidth;
        dialog.classList.add("is-content-swap");
      }
    } else {
      /* First open — full enter (scrim + dialog) */
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      void modal.offsetWidth;
      requestAnimationFrame(() => {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      });
    }
    modalFooter.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });
    modal.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);
  }

  function closeModal() {
    if (modal.dataset.dismissible === "false" && modal.classList.contains("is-open")) {
      /* allow programmatic close */
    }
    /* Backdrop / Escape on unsaved Dialog → stay in edit (drop pending leave) */
    if (unsavedConfirmOpen) {
      unsavedConfirmOpen = false;
      pendingLeaveAction = null;
    }
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.dataset.dismissible = "true";
    document.querySelector(".modal")?.classList.remove("modal--care-team", "modal--enrollment", "modal--confirm", "is-content-swap");
    /* Dismiss without Done discards manage draft */
    careTeamDraft = null;
    careTeamSearchQuery = "";
    careTeamSearchOpen = false;
    openCareTeamMenuId = null;
    lastFocus?.focus();
  }

  /** Close View in / more / compare dropdowns (and optional inline selects). */
  function closeOverlayMenus(except) {
    const viewButton = stage.querySelector(".view-in-button");
    const viewMenu = stage.querySelector(".view-menu");
    const moreButton = stage.querySelector(".icon-button--more");
    const moreMenu = stage.querySelector(".more-menu");

    if (except !== "view" && viewMenu && viewButton) {
      hideMenuPopover(viewMenu);
      viewButton.setAttribute("aria-expanded", "false");
    }
    if (except !== "more" && moreMenu && moreButton) {
      hideMenuPopover(moreMenu);
      moreButton.setAttribute("aria-expanded", "false");
    }
    if (except !== "ins-dropdown" && insuranceState.openDropdown) {
      insuranceState.openDropdown = null;
      applyCompareDropdownOpenState();
    }
    if (except !== "care-team" && (openCareTeamMenuId || careTeamSearchOpen)) {
      openCareTeamMenuId = null;
      careTeamSearchOpen = false;
      if (modal.classList.contains("is-open")) refreshCareTeamManageModal(true);
    }
    if (except !== "inline-select") closeInlineSelects();
    if (except !== "inline-dob") closeInlineDobCalendars();
  }

  /** Dismiss floating menus when the event target is outside their wrap. */
  function dismissOverlayMenusOutside(target) {
    const t = target;
    if (!t?.closest) {
      closeOverlayMenus();
      return;
    }
    if (!t.closest(".view-menu-wrap")) {
      const viewMenu = stage.querySelector(".view-menu");
      const viewButton = stage.querySelector(".view-in-button");
      if (viewMenu && !viewMenu.hidden) {
        hideMenuPopover(viewMenu);
        viewButton?.setAttribute("aria-expanded", "false");
      }
    }
    if (!t.closest(".more-menu-wrap")) {
      const moreMenu = stage.querySelector(".more-menu");
      const moreButton = stage.querySelector(".icon-button--more");
      if (moreMenu && !moreMenu.hidden) {
        hideMenuPopover(moreMenu);
        moreButton?.setAttribute("aria-expanded", "false");
      }
    }
    if (!t.closest(".ins-dropdown-wrap") && insuranceState.openDropdown) {
      insuranceState.openDropdown = null;
      applyCompareDropdownOpenState();
    }
    if (
      !t.closest(".ct-row-menu-wrap") &&
      !t.closest(".ct-search-wrap") &&
      (openCareTeamMenuId || careTeamSearchOpen)
    ) {
      openCareTeamMenuId = null;
      careTeamSearchOpen = false;
      if (modal.classList.contains("is-open")) refreshCareTeamManageModal(true);
    }
    if (!t.closest(".inline-select")) closeInlineSelects();
    if (!t.closest(".inline-dob-wrap")) closeInlineDobCalendars();
  }

  function bindPanelActions() {
    stage.querySelector(".panel-close")?.addEventListener("click", collapsePanel);

    const viewButton = stage.querySelector(".view-in-button");
    const viewMenu = stage.querySelector(".view-menu");
    const moreButton = stage.querySelector(".icon-button--more");
    const moreMenu = stage.querySelector(".more-menu");

    viewButton?.addEventListener("click", () => {
      const opening = viewMenu.hidden || viewMenu.classList.contains("is-leaving");
      closeOverlayMenus("view");
      if (opening) showMenuPopover(viewMenu);
      else hideMenuPopover(viewMenu);
      viewButton.setAttribute("aria-expanded", String(opening));
    });
    viewMenu?.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        closeOverlayMenus();
        showToast(`Opening ${button.dataset.destination}`);
      });
    });

    moreButton?.addEventListener("click", () => {
      const opening = moreMenu.hidden || moreMenu.classList.contains("is-leaving");
      closeOverlayMenus("more");
      if (opening) showMenuPopover(moreMenu);
      else hideMenuPopover(moreMenu);
      moreButton.setAttribute("aria-expanded", String(opening));
    });
    moreMenu?.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        closeOverlayMenus();
        showToast(button.dataset.moreAction);
      });
    });

    stage.querySelectorAll(".tab[data-tab]").forEach((tab) => {
      tab.addEventListener("click", () => selectTab(tab.dataset.tab));
    });
    bindAccordionActions();

    bindInsurancePanelActions();

    // Eligibility flow
    stage.querySelector("#edit-enrollment")?.addEventListener("click", openEditEnrollmentModal);
    stage.querySelector("#back-elig-benefits")?.addEventListener("click", () => {
      eligibilityState.view = "overview";
      eligibilityState.selectedBenefitId = null;
      render("eligibility");
    });
    bindBenefitListActions();
  }

  function bindInsurancePanelActions() {
    stage.querySelectorAll("[data-ins-tab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        syncInsuranceTab(tab.dataset.insTab);
      });
    });

    bindInsuranceMainTabContent();
    stage.querySelectorAll("[data-ins-back]").forEach((button) => {
      button.addEventListener("click", () => {
        insuranceState.view = button.dataset.insBack === "main" ? "main" : "compare-select";
        insuranceState.tab = "member-plan";
        insuranceState.openDropdown = null;
        render("insurance");
      });
    });

    stage.querySelectorAll("[data-ins-plan]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const id = checkbox.dataset.insPlan;
        if (checkbox.checked && insuranceState.compareSelected.length < 2) insuranceState.compareSelected.push(id);
        else insuranceState.compareSelected = insuranceState.compareSelected.filter((value) => value !== id);
        /* In-place sync — full render() remounts panel-content and retriggers panel-in */
        syncComparePlanSelection();
      });
    });
    stage.querySelector("#ins-copy")?.addEventListener("click", async () => {
      try { await navigator.clipboard?.writeText("https://benefits.employer.com/compare-plans"); } catch { /* prototype fallback */ }
      showToast("Link copied");
    });
    stage.querySelector("#ins-compare-submit")?.addEventListener("click", () => {
      if (insuranceState.compareSelected.length !== 2) return;
      insuranceState.comparePlanIds = [...insuranceState.compareSelected];
      insuranceState.view = "compare-detail";
      render("insurance");
    });
    stage.querySelector("#ins-export")?.addEventListener("click", () => showToast("Plan comparison exported"));
    bindCompareDetailControls();
    observeStickyFooterTip();
  }

  let stickyFooterTipObserver = null;
  function observeStickyFooterTip() {
    stickyFooterTipObserver?.disconnect();
    stickyFooterTipObserver = null;
    const text = stage.querySelector(".ins-sticky-footer-text");
    if (!text || typeof ResizeObserver === "undefined") {
      refreshStickyFooterTip();
      return;
    }
    stickyFooterTipObserver = new ResizeObserver(() => refreshStickyFooterTip());
    stickyFooterTipObserver.observe(text);
    refreshStickyFooterTip();
  }

  function bindBenefitListActions() {
    const benefitSearch = stage.querySelector("#elig-benefit-search");
    benefitSearch?.addEventListener("input", () => {
      eligibilityState.benefitQuery = benefitSearch.value;
      const list = stage.querySelector(".elig-benefits-list");
      if (list) {
        list.innerHTML = eligibilityBenefitsHtml();
        bindBenefitRowActions();
      }
    });
    stage.querySelector("#elig-benefit-filter")?.addEventListener("click", () => {
      showToast("Benefit filters coming soon");
    });
    bindBenefitRowActions();
    bindMarkReferredButton();
  }

  let benefitTipHideTimer = 0;

  function ensureBenefitTipFloat() {
    let float = document.querySelector(".benefit-tip-float");
    if (!float) {
      float = document.createElement("div");
      float.className = "benefit-tip-float";
      float.setAttribute("role", "tooltip");
      document.body.appendChild(float);
      float.addEventListener("mouseenter", () => window.clearTimeout(benefitTipHideTimer));
      float.addEventListener("mouseleave", () => {
        window.clearTimeout(benefitTipHideTimer);
        benefitTipHideTimer = window.setTimeout(() => hideBenefitTipFloat(), 120);
      });
    }
    return float;
  }

  function hideBenefitTipFloat() {
    const float = document.querySelector(".benefit-tip-float");
    if (!float) return;
    float.classList.remove("is-visible");
    float.innerHTML = "";
  }

  function showBenefitTipFloat(btn) {
    const source = btn.querySelector(".benefit-tip");
    if (!source) return;
    const float = ensureBenefitTipFloat();
    float.innerHTML = source.innerHTML;
    float.classList.add("is-visible");

    const place = () => {
      const rect = btn.getBoundingClientRect();
      const tipRect = float.getBoundingClientRect();
      let left = rect.left - tipRect.width - 10;
      let top = rect.top + rect.height / 2 - tipRect.height / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
      top = Math.max(8, Math.min(top, window.innerHeight - tipRect.height - 8));
      float.style.left = `${left}px`;
      float.style.top = `${top}px`;
    };
    place();
    requestAnimationFrame(place);

    float.querySelectorAll(".benefit-tip-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showToast("Opening job aid");
      });
    });
  }

  function bindBenefitRowActions() {
    stage.querySelectorAll(".elig-benefit-check").forEach((input) => {
      input.addEventListener("change", () => {
        const id =
          input.dataset.benefitSelect ||
          input.closest("[data-benefit-id]")?.dataset.benefitId;
        if (!id) return;
        setBenefitSelected(id, input.checked);
        refreshBenefitsSelectionBar();
      });
    });
    const scheduleHide = () => {
      window.clearTimeout(benefitTipHideTimer);
      benefitTipHideTimer = window.setTimeout(() => hideBenefitTipFloat(), 120);
    };
    const cancelHide = () => window.clearTimeout(benefitTipHideTimer);

    stage.querySelectorAll("[data-benefit-open]").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        cancelHide();
        showBenefitTipFloat(btn);
      });
      btn.addEventListener("mouseleave", scheduleHide);
      btn.addEventListener("focus", () => {
        cancelHide();
        showBenefitTipFloat(btn);
      });
      btn.addEventListener("blur", scheduleHide);
      btn.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          event.preventDefault();
          showToast("Opening job aid");
          return;
        }
        hideBenefitTipFloat();
        eligibilityState.selectedBenefitId = btn.dataset.benefitOpen;
        eligibilityState.view = "benefit";
        render("eligibility");
      });
    });
    stage.querySelectorAll(".benefit-resource-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        showToast("Opening job aid");
      });
    });
  }

  function bindAccordionActions() {
    stage.querySelectorAll(".accordion-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        if (toggle.dataset.editing === "true") return;
        const section = toggle.closest(".accordion");
        const sectionId = section?.dataset.section;
        const open = section.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        if (sectionId && memberAccordionOpen[sectionId] !== undefined) {
          memberAccordionOpen[sectionId] = open;
        }
        if (sectionId === "elig-info") {
          eligibilityState.infoOpen = open;
        }
      });
    });
    stage.querySelectorAll(".edit-section").forEach((edit) => {
      edit.addEventListener("click", () => {
        const sectionId = edit.dataset.editSection;
        if (sectionId) startMemberEdit(sectionId);
      });
    });
    stage.querySelectorAll("[data-cancel-section]").forEach((btn) => {
      btn.addEventListener("click", () => cancelMemberEdit());
    });
    stage.querySelectorAll("[data-save-section]").forEach((btn) => {
      btn.addEventListener("click", () => saveMemberEdit(btn.dataset.saveSection));
    });
    stage.querySelectorAll(".task-list-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const root = toggle.closest(".task-list-accordion");
        taskListOpen = !taskListOpen;
        root?.classList.toggle("is-open", taskListOpen);
        toggle.setAttribute("aria-expanded", String(taskListOpen));
      });
    });
    stage.querySelectorAll("[data-task-create]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        showToast("Create Task");
      });
    });
    bindInlineSelects();
    bindInlineDobFields();
    if (memberEditingSection) {
      const section = stage.querySelector(`.accordion[data-section="${memberEditingSection}"]`);
      const onDirty = () => syncMemberEditChrome();
      section?.querySelectorAll("[data-field], .inline-field-control").forEach((el) => {
        el.addEventListener("input", onDirty);
        el.addEventListener("change", onDirty);
      });
    }
  }

  function careTeamInitial(name) {
    return (name || "?").trim().charAt(0).toUpperCase() || "?";
  }

  function syncCareTeamTabCount() {
    const tab = stage.querySelector('.tab[data-tab="care-team"]');
    if (!tab) return;
    const count = careTeamMembers.length;
    let badge = tab.querySelector(".tab-count");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "soft-badge soft-neutral tab-count";
      tab.appendChild(badge);
    }
    badge.textContent = String(count);
    badge.setAttribute("aria-label", `${count} care team members`);
  }

  function careTeamPanelHtml() {
    const rows = careTeamMembers
      .map(
        (m) => `
        <tr>
          <td>
            <div class="ct-provider">
              <span class="ct-avatar" aria-hidden="true">${m.initial || careTeamInitial(m.name)}</span>
              <span class="ct-provider-name">${m.name}</span>
            </div>
          </td>
          <td class="ct-col-role">${m.role}</td>
        </tr>`
      )
      .join("");

    return `
      <div class="ct-pane">
        <div class="ct-pane-toolbar">
          <button class="icon-button elig-edit" type="button" id="manage-care-team" aria-label="Manage Care Team">${icon.edit}</button>
        </div>
        <div class="ct-table-card">
          <table class="ct-table">
            <thead>
              <tr><th>Provider</th><th class="ct-col-role">Role</th></tr>
            </thead>
            <tbody>
              ${rows || `<tr><td colspan="2" class="ct-empty">No care team members</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  function availableCareTeamCandidates() {
    const onTeam = new Set((careTeamDraft || []).map((m) => m.id));
    const q = careTeamSearchQuery.trim().toLowerCase();
    return careTeamCandidates.filter((c) => {
      if (onTeam.has(c.id)) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q);
    });
  }

  function careTeamManageBodyHtml() {
    const draft = careTeamDraft || [];
    const rows = draft
      .map((m) => {
        const visibility = m.visibleToMembers ? "Visible to members" : "Not visible to members";
        const menuOpen = openCareTeamMenuId === m.id;
        const visibilityAction = m.visibleToMembers ? "Hide from member app" : "Show in member app";
        return `
        <div class="ct-manage-row" data-ct-id="${m.id}">
          <span class="ct-avatar" aria-hidden="true">${m.initial || careTeamInitial(m.name)}</span>
          <div class="ct-manage-meta">
            <span class="ct-manage-name">${m.name}</span>
            <span>${m.role}</span>
          </div>
          <span class="ct-visibility">${visibility}</span>
          <div class="ct-row-menu-wrap">
            <button class="icon-button icon-button--more" type="button" data-ct-menu="${m.id}" aria-label="More options for ${m.name}" aria-expanded="${menuOpen}" aria-haspopup="menu">${icon.more}</button>
            <div class="ct-row-menu" role="menu" ${menuOpen ? "" : "hidden"}>
              <button type="button" role="menuitem" data-ct-visibility="${m.id}">${visibilityAction}</button>
              <button type="button" role="menuitem" data-ct-remove="${m.id}">Remove from care team</button>
            </div>
          </div>
        </div>`;
      })
      .join("");

    const candidates = availableCareTeamCandidates();
    const dropdown = careTeamSearchOpen
      ? `
      <div class="ct-search-dropdown" role="listbox" aria-label="Add Care Team member results">
        ${
          candidates.length
            ? candidates
                .map(
                  (c) => `
            <button type="button" class="ct-search-option" role="option" data-ct-add="${c.id}">
              <strong>${c.name}</strong>
              <span>${c.role}</span>
            </button>`
                )
                .join("")
            : `<p class="ct-search-empty">No matches</p>`
        }
      </div>`
      : "";

    return `
      <div class="ct-manage">
        <div class="ct-search-wrap">
          <label class="ct-search">
            <input id="ct-add-search" type="search" placeholder="Add Care Team member" value="${escapeAttr(careTeamSearchQuery)}" autocomplete="off" />
            <span class="ct-search-icon" aria-hidden="true">${icon.search}</span>
          </label>
          ${dropdown}
        </div>
        <div class="ct-manage-list">
          ${rows || `<p class="ct-search-empty">No care team members yet. Search to add someone.</p>`}
        </div>
      </div>`;
  }

  function bindCareTeamManageModal() {
    const search = document.querySelector("#ct-add-search");
    const openSearch = () => {
      if (careTeamSearchOpen) return;
      careTeamSearchOpen = true;
      refreshCareTeamManageModal(true);
    };
    search?.addEventListener("focus", openSearch);
    search?.addEventListener("click", openSearch);
    search?.addEventListener("input", () => {
      careTeamSearchQuery = search.value;
      careTeamSearchOpen = true;
      refreshCareTeamManageModal(true);
    });
    document.querySelectorAll("[data-ct-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const candidate = careTeamCandidates.find((c) => c.id === btn.dataset.ctAdd);
        if (!candidate || !careTeamDraft) return;
        careTeamDraft.push({ ...candidate, visibleToMembers: true });
        careTeamSearchQuery = "";
        careTeamSearchOpen = false;
        openCareTeamMenuId = null;
        refreshCareTeamManageModal();
      });
    });
    document.querySelectorAll("[data-ct-menu]").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = btn.dataset.ctMenu;
        careTeamSearchOpen = false;
        openCareTeamMenuId = openCareTeamMenuId === id ? null : id;
        refreshCareTeamManageModal(true);
      });
    });
    document.querySelectorAll("[data-ct-visibility]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const member = careTeamDraft?.find((m) => m.id === btn.dataset.ctVisibility);
        if (member) member.visibleToMembers = !member.visibleToMembers;
        openCareTeamMenuId = null;
        refreshCareTeamManageModal();
      });
    });
    document.querySelectorAll("[data-ct-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const member = careTeamDraft?.find((m) => m.id === btn.dataset.ctRemove);
        if (member) openRemoveCareTeamModal(member);
      });
    });
    document.querySelector("#ct-manage-done")?.addEventListener("click", () => {
      careTeamMembers = (careTeamDraft || []).map((m) => ({ ...m }));
      careTeamDraft = null;
      careTeamSearchQuery = "";
      careTeamSearchOpen = false;
      openCareTeamMenuId = null;
      closeModal();
      syncCareTeamTabCount();
      const pane = stage.querySelector(".tab-pane");
      if (pane?.dataset.pane === "care-team") {
        pane.innerHTML = careTeamPanelHtml();
        bindCareTeamPanelActions();
      }
      showToast("Care Team updated");
    });
  }

  function refreshCareTeamManageModal(keepFocus = false) {
    const activeId = document.activeElement?.id;
    const selStart = document.activeElement?.selectionStart;
    const selEnd = document.activeElement?.selectionEnd;
    modalBody.innerHTML = careTeamManageBodyHtml();
    modalFooter.innerHTML = `
      <button class="button button-primary" type="button" id="ct-manage-done">Done</button>
    `;
    modalFooter.hidden = false;
    bindCareTeamManageModal();
    if (keepFocus && activeId === "ct-add-search") {
      const input = document.querySelector("#ct-add-search");
      input?.focus();
      if (typeof selStart === "number" && typeof selEnd === "number") {
        try {
          input.setSelectionRange(selStart, selEnd);
        } catch {
          /* ignore */
        }
      }
    }
  }

  function openManageCareTeamModal() {
    careTeamDraft = careTeamMembers.map((m) => ({ ...m }));
    careTeamSearchQuery = "";
    careTeamSearchOpen = false;
    openCareTeamMenuId = null;
    openModal({
      title: "Manage Care Team",
      body: careTeamManageBodyHtml(),
      footer: `<button class="button button-primary" type="button" id="ct-manage-done">Done</button>`,
      variant: "care-team",
    });
    bindCareTeamManageModal();
  }

  function openRemoveCareTeamModal(member) {
    openCareTeamMenuId = null;
    openModal({
      title: "Remove from Care Team?",
      body: `
        <p class="modal-copy"><strong>${member.name} (${member.role})</strong> will be removed from this member's Care Team. Any open tasks will become unassigned and automatically reassigned when another qualified individual is added to this role.</p>
      `,
      footer: `
        <button class="button button-secondary" type="button" id="ct-remove-no">No</button>
        <button class="button button-danger" type="button" id="ct-remove-yes">Yes, remove</button>
      `,
      variant: "care-team",
    });
    document.querySelector("#ct-remove-no")?.addEventListener("click", () => {
      // Re-open manage with current draft
      openModal({
        title: "Manage Care Team",
        body: careTeamManageBodyHtml(),
        footer: `<button class="button button-primary" type="button" id="ct-manage-done">Done</button>`,
        variant: "care-team",
      });
      bindCareTeamManageModal();
    });
    document.querySelector("#ct-remove-yes")?.addEventListener("click", () => {
      careTeamDraft = (careTeamDraft || []).filter((m) => m.id !== member.id);
      openModal({
        title: "Manage Care Team",
        body: careTeamManageBodyHtml(),
        footer: `<button class="button button-primary" type="button" id="ct-manage-done">Done</button>`,
        variant: "care-team",
      });
      bindCareTeamManageModal();
      showToast(`${member.name} removed`);
    });
  }

  function bindCareTeamPanelActions() {
    stage.querySelector("#manage-care-team")?.addEventListener("click", openManageCareTeamModal);
  }

  function dependentsPanelHtml() {
    if (!dependents.length) {
      return `<div class="quiet-state">No dependents to display.</div>`;
    }
    const cards = dependents
      .map((dep) => {
        const rows = [
          ["Name", dep.name],
          ["DOB", dep.dob],
          ["Relationship", dep.relationship],
          ["Last 4 SSN", dep.ssnLast4],
          ["Is caregiver of", dep.caregiverOf],
          ["Is custodial of", dep.custodialOf],
        ]
          .map(
            ([label, value]) => `
            <div class="dep-row">
              <span class="dep-label">${label}</span>
              <span class="dep-value">${value}</span>
            </div>`
          )
          .join("");

        return `
        <article class="dep-card">
          <header class="dep-card-head">${dep.name}</header>
          <div class="dep-card-body">
            ${rows}
            <div class="dep-notes">
              <span class="dep-label">Member notes</span>
              <p class="dep-notes-text">${dep.notes}</p>
            </div>
          </div>
        </article>`;
      })
      .join("");

    return `<div class="dependents-pane">${cards}</div>`;
  }

  function selectTab(name) {
    const apply = () => {
      stage.querySelectorAll(".tab").forEach((tab) => {
        const selected = tab.dataset.tab === name;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      const pane = stage.querySelector(".tab-pane");
      if (name === "member") {
        pane.dataset.pane = "member";
        pane.innerHTML = memberAccordionsHtml();
        syncMemberEditChrome();
        bindAccordionActions();
      } else if (name === "care-team") {
        pane.dataset.pane = "care-team";
        pane.innerHTML = careTeamPanelHtml();
        bindCareTeamPanelActions();
      } else if (name === "dependents") {
        pane.dataset.pane = "dependents";
        pane.innerHTML = dependentsPanelHtml();
      } else {
        pane.dataset.pane = name;
        pane.innerHTML = `<div class="quiet-state">Nothing to display.</div>`;
      }
    };
    /* Dirty edit → confirm; clean edit → exit quietly and allow the tab change */
    if (memberEditingSection) {
      requestLeaveMemberEdit(apply);
      return;
    }
    apply();
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    toasts.append(toast);
    window.setTimeout(() => {
      toast.classList.add("is-leaving");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    }, 2400);
  }

  railButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.panel;
      const go = () => {
        if (panelOpen && activePanel === name) collapsePanel();
        else openPanel(name);
      };
      if (memberEditingSection && !(panelOpen && activePanel === name && !isMemberEditDirty())) {
        /* Closing same panel or switching tools — gate on dirty edit */
        requestLeaveMemberEdit(go);
        return;
      }
      go();
    });
  });

  bindPanelResizer();

  document.addEventListener("pointerdown", (event) => {
    dismissOverlayMenusOutside(event.target);
  });

  modal.querySelector(".modal-scrim")?.addEventListener("click", () => {
    if (modal.dataset.dismissible !== "false") closeModal();
  });
  modal.querySelector(".modal-header [data-close-modal]")?.addEventListener("click", () => {
    if (modal.dataset.dismissible !== "false") closeModal();
  });
  sheetModeMq.addEventListener("change", () => {
    syncSheetChrome();
  });
  compactNavMq.addEventListener("change", () => {
    if (!compactNavMq.matches) closeNavDrawer();
  });

  sheetScrim?.addEventListener("click", () => collapsePanel());
  navMenuButton?.addEventListener("click", () => {
    if (isNavDrawerOpen()) closeNavDrawer();
    else openNavDrawer();
  });
  navDrawerClose?.addEventListener("click", closeNavDrawer);
  navDrawerScrim?.addEventListener("click", closeNavDrawer);
  navDrawerLayer?.querySelectorAll(".nav-drawer-links a").forEach((a) => {
    a.addEventListener("click", closeNavDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (isNavDrawerOpen()) {
        closeNavDrawer();
        return;
      }
      const hasMenu =
        stage.querySelector(".view-menu:not([hidden])") ||
        stage.querySelector(".more-menu:not([hidden])") ||
        stage.querySelector(".inline-select.is-open") ||
        stage.querySelector(".inline-dob-wrap.is-open") ||
        insuranceState.openDropdown ||
        openCareTeamMenuId ||
        careTeamSearchOpen;
      if (hasMenu) {
        closeOverlayMenus();
        return;
      }
      if (modal.classList.contains("is-open") && modal.dataset.dismissible !== "false") {
        closeModal();
        return;
      }
      if (panelOpen && isSheetMode()) {
        collapsePanel();
      }
    }
  });

  document.querySelectorAll(".soft-badge.is-tippable").forEach((badge) => {
    const tipId = badge.getAttribute("aria-describedby");
    const tip = tipId ? document.getElementById(tipId) : null;
    if (!tip) return;
    const show = () => {
      tip.hidden = false;
    };
    const hide = () => {
      tip.hidden = true;
    };
    badge.addEventListener("mouseenter", show);
    badge.addEventListener("mouseleave", hide);
    badge.addEventListener("focus", show);
    badge.addEventListener("blur", hide);
  });

  const composerField = document.querySelector("#composer-field");
  const composerInput = document.querySelector("#composer-input");
  const composerSend = document.querySelector("#composer-send");
  const composerCleanup = document.querySelector("#composer-cleanup");
  const composerAttach = document.querySelector("#composer-attach");
  const composerAttachInput = document.querySelector("#composer-attach-input");
  const composerEl = document.querySelector(".composer");
  const conversationEl = document.querySelector("#conversation");
  const COMPOSER_INPUT_MAX = 100; /* px — field grows; toolbar stays pinned */
  let cleanupBusy = false;
  /** @type {AbortController | null} */
  let cleanupAbort = null;

  if (composerAttach && composerAttachInput) {
    composerAttach.addEventListener("click", () => {
      composerAttachInput.value = "";
      composerAttachInput.click();
    });
    composerAttachInput.addEventListener("change", () => {
      const file = composerAttachInput.files?.[0];
      if (!file) return;
      showToast(`Attached ${file.name}`);
    });
  }

  /** @type {{ role: 'user' | 'assistant', content: string }[]} */
  const chatHistory = [];
  let chatBusy = false;
  /** @type {AbortController | null} */
  let chatAbort = null;

  const seedChatHistoryFromDom = () => {
    if (!conversationEl || chatHistory.length) return;
    // MCA tool: advocate (Lila) = user · member (Riley) = assistant for the sim engine
    // Skip Dot/agent — those are not Riley and confuse the member persona.
    conversationEl.querySelectorAll(".msg-group").forEach((group) => {
      if (group.classList.contains("msg-group--team")) {
        const bubbles = [...group.querySelectorAll(".msg-bubble")].map((el) => el.textContent.trim());
        if (bubbles.length) chatHistory.push({ role: "user", content: bubbles.join("\n") });
      } else if (group.classList.contains("msg-group--member")) {
        const texts = [...group.querySelectorAll(".msg-bubble")].map((el) => el.textContent.trim());
        if (texts.length) chatHistory.push({ role: "assistant", content: texts.join("\n") });
      }
    });
  };

  const formatClock = (date = new Date()) =>
    date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  const scrollConversationToEnd = (smooth = true) => {
    if (!conversationEl) return;
    conversationEl.scrollTo({
      top: conversationEl.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  /** Ping-pong reply clocks — only the last responder’s timer counts up. */
  const replyTimerState = {
    memberSec: 3,
    youSec: 3,
    /** @type {'member' | 'you'} */
    active: "member",
    intervalId: 0,
  };

  const formatReplyMmSs = (totalSec) => {
    const safe = Math.max(0, Math.floor(totalSec));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const paintReplyTimers = () => {
    const memberEl = document.querySelector('[data-reply-timer="member"]');
    const youEl = document.querySelector('[data-reply-timer="you"]');
    if (memberEl) memberEl.textContent = formatReplyMmSs(replyTimerState.memberSec);
    if (youEl) youEl.textContent = formatReplyMmSs(replyTimerState.youSec);
    document.querySelectorAll(".reply-timer[data-reply-side]").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-reply-side") === replyTimerState.active);
    });
  };

  const startReplyTimerTick = () => {
    window.clearInterval(replyTimerState.intervalId);
    replyTimerState.intervalId = window.setInterval(() => {
      if (replyTimerState.active === "member") replyTimerState.memberSec += 1;
      else replyTimerState.youSec += 1;
      paintReplyTimers();
    }, 1000);
  };

  /** Reset the side that just replied and make it the counting clock; freeze the other. */
  const onReplyTurn = (side) => {
    if (side === "member") {
      replyTimerState.memberSec = 0;
      replyTimerState.active = "member";
    } else {
      replyTimerState.youSec = 0;
      replyTimerState.active = "you";
    }
    paintReplyTimers();
    startReplyTimerTick();
  };

  const bumpReplyTimers = (side) => {
    onReplyTurn(side === "you" ? "you" : "member");
  };

  const setComposerBusy = (busy) => {
    chatBusy = busy;
    composerEl?.classList.toggle("is-busy", busy);
    if (composerInput) composerInput.disabled = busy;
    syncComposerSend();
  };

  /** Team + Dot meta: caption time + SemiBold “Read by Member” once seen */
  const markOutboundMessagesRead = () => {
    conversationEl
      ?.querySelectorAll(".msg-group--team .msg-meta, .msg-group--agent .msg-meta")
      .forEach((meta) => {
        if (meta.querySelector(".msg-meta-status")) return;
        const status = document.createElement("span");
        status.className = "msg-meta-status";
        status.textContent = "Read by Member";
        meta.append(status);
      });
  };

  /** MCA (Lila) outbound — right-aligned brand bubble */
  const appendAdvocateMessage = (text) => {
    const article = document.createElement("article");
    article.className = "msg-group msg-group--team";
    article.innerHTML = `
      <header class="msg-sender-head msg-sender-head--team">
        <div class="msg-team-meta">
          <strong class="msg-sender-name">Lila George</strong>
          <span class="msg-team-sep" aria-hidden="true">•</span>
          <span class="msg-team-role">Care Team member</span>
        </div>
        <img class="avatar-img avatar-img--msg" src="assets/lila-george.jpg" width="20" height="20" alt="" />
      </header>
      <div class="msg-content msg-content--end">
        <div class="msg-stack msg-stack--end">
          <p class="msg-bubble msg-bubble--team"></p>
        </div>
        <footer class="msg-meta msg-meta--end"><time></time></footer>
      </div>`;
    article.querySelector(".msg-bubble").textContent = text;
    const time = article.querySelector("time");
    time.dateTime = new Date().toISOString();
    time.textContent = formatClock();
    conversationEl.append(article);
    scrollConversationToEnd();
    return article;
  };

  /** Simulated member reply — left gray bubble */
  const appendTypingIndicator = () => {
    const article = document.createElement("article");
    article.className = "msg-group msg-group--member is-pending";
    article.setAttribute("aria-label", "Riley Smith is typing");
    article.innerHTML = `
      <header class="msg-sender-head">
        <img class="avatar-img avatar-img--msg" src="assets/riley-smith.jpg" width="20" height="20" alt="" />
        <strong class="msg-sender-name">Riley Smith</strong>
      </header>
      <div class="msg-content">
        <div class="msg-stack">
          <div class="msg-typing msg-typing--member" aria-hidden="true">
            <span class="msg-typing-dot"></span>
            <span class="msg-typing-dot"></span>
            <span class="msg-typing-dot"></span>
          </div>
        </div>
      </div>`;
    conversationEl.append(article);
    scrollConversationToEnd(false);
    return article;
  };

  const promoteTypingToStream = (typingArticle) => {
    const stack = typingArticle.querySelector(".msg-stack");
    stack.innerHTML = `<p class="msg-bubble msg-bubble--member is-streaming" aria-live="polite"></p>`;
    const content = typingArticle.querySelector(".msg-content");
    if (!content.querySelector(".msg-meta")) {
      const footer = document.createElement("footer");
      footer.className = "msg-meta";
      footer.innerHTML = `<time></time>`;
      content.append(footer);
    }
    typingArticle.classList.remove("is-pending");
    typingArticle.removeAttribute("aria-label");
    return stack.querySelector(".msg-bubble");
  };

  const finishStreamedMessage = (bubble, typingArticle) => {
    bubble.classList.remove("is-streaming");
    const time = typingArticle.querySelector("time");
    if (time) {
      time.dateTime = new Date().toISOString();
      time.textContent = formatClock();
    }
    markOutboundMessagesRead();
    scrollConversationToEnd();
  };

  const syncComposerHeight = () => {
    if (!composerInput) return;
    composerInput.style.height = "auto";
    const next = Math.min(composerInput.scrollHeight, COMPOSER_INPUT_MAX);
    composerInput.style.height = `${Math.max(next, 20)}px`;
  };

  const syncComposerSend = () => {
    if (!composerInput || !composerSend) return;
    const hasText = composerInput.value.trim().length > 0;
    const canSend = hasText && !chatBusy && !cleanupBusy;
    composerSend.disabled = !canSend;
    composerSend.classList.toggle("is-active", canSend);
    composerSend.setAttribute("aria-disabled", canSend ? "false" : "true");
    const canCleanup = hasText && !chatBusy && !cleanupBusy;
    if (composerCleanup) {
      composerCleanup.disabled = !canCleanup;
      composerCleanup.classList.toggle("is-busy", cleanupBusy);
      composerCleanup.setAttribute("aria-disabled", canCleanup ? "false" : "true");
    }
    composerField?.classList.toggle("is-filled", hasText);
    syncComposerHeight();
  };

  const cleanupComposerDraft = async () => {
    if (!composerInput || chatBusy || cleanupBusy) return;
    const draft = composerInput.value.trim();
    if (!draft) return;
    if (!globalThis.CareChatEngine?.rewriteDraft) {
      showToast("Clean up failed to load");
      return;
    }

    cleanupAbort?.abort();
    cleanupAbort = new AbortController();
    cleanupBusy = true;
    syncComposerSend();
    composerInput.disabled = true;

    try {
      const cleaned = await CareChatEngine.rewriteDraft({
        text: draft,
        signal: cleanupAbort.signal,
      });
      if (cleaned && cleaned !== draft) {
        composerInput.value = cleaned;
        showToast("Message cleaned up");
      } else if (cleaned) {
        composerInput.value = cleaned;
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error(err);
        showToast("Couldn’t clean up — try again");
      }
    } finally {
      cleanupBusy = false;
      composerInput.disabled = chatBusy;
      syncComposerSend();
      composerInput.focus();
    }
  };

  const sendAdvocateMessage = async () => {
    if (!composerInput || !conversationEl || chatBusy) return;
    const text = composerInput.value.trim();
    if (!text) return;
    if (!globalThis.CareChatEngine?.generate) {
      showToast("Chat engine failed to load");
      return;
    }

    seedChatHistoryFromDom();
    chatAbort?.abort();
    chatAbort = new AbortController();

    composerInput.value = "";
    syncComposerSend();
    appendAdvocateMessage(text);
    chatHistory.push({ role: "user", content: text });
    bumpReplyTimers("you");
    setComposerBusy(true);

    const typingArticle = appendTypingIndicator();
    let bubble = null;
    let assembled = "";

    try {
      for await (const event of CareChatEngine.generate({
        messages: chatHistory.slice(-16),
        signal: chatAbort.signal,
      })) {
        if (event.type === "status" && event.phase === "typing" && !bubble) {
          bubble = promoteTypingToStream(typingArticle);
        }
        if (event.type === "token") {
          if (!bubble) bubble = promoteTypingToStream(typingArticle);
          assembled += event.text;
          bubble.textContent = assembled;
          scrollConversationToEnd(false);
        }
        if (event.type === "done") {
          assembled = assembled
            .replace(/^(Riley\s*\(member\)|Riley|As Riley)\s*[:\-–]\s*/i, "")
            .trim();
          if (!bubble) {
            bubble = promoteTypingToStream(typingArticle);
            bubble.textContent = assembled || "…";
          } else {
            bubble.textContent = assembled || bubble.textContent;
          }
          finishStreamedMessage(bubble, typingArticle);
          chatHistory.push({ role: "assistant", content: assembled });
          bumpReplyTimers("member");
        }
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        typingArticle.remove();
      } else {
        console.error(err);
        typingArticle.remove();
        showToast("Couldn’t get a reply — try again");
      }
    } finally {
      setComposerBusy(false);
      composerInput?.focus();
    }
  };

  composerInput?.addEventListener("input", syncComposerSend);
  composerInput?.addEventListener("keyup", syncComposerSend);
  composerInput?.addEventListener("change", syncComposerSend);
  composerInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendAdvocateMessage();
    }
  });
  composerSend?.addEventListener("click", () => sendAdvocateMessage());
  composerCleanup?.addEventListener("click", () => cleanupComposerDraft());
  syncComposerSend();
  seedChatHistoryFromDom();
  /* Seed thread ends with member — Member Replied is the live clock */
  paintReplyTimers();
  startReplyTimerTick();

  render("member");
  syncSheetChrome();

  /** Staggered ease-up on first paint; skipped when prefers-reduced-motion. */
  function runPageEntrance() {
    const root = document.documentElement;
    if (!root.classList.contains("is-page-boot")) return;
    if (reduceMotion()) {
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
      const rises = [...document.querySelectorAll(".page-rise")];
      const last = rises[rises.length - 1];
      if (last) last.addEventListener("animationend", finish, { once: true });
      window.setTimeout(finish, 1100);
    });
  }
  runPageEntrance();
})();

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
  /** Member field lists go 2-up once the panel is this wide */
  const PANEL_FIELDS_WIDE = 480;

  function isSheetMode() {
    return sheetModeMq.matches;
  }

  function preferredPanelWidth(name) {
    if (name === "insurance") return PANEL_INSURANCE;
    if (name === "provider-search") return PANEL_FIELDS_WIDE;
    return PANEL_DEFAULT;
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
    document.documentElement.classList.toggle("is-panel-fields-wide", w >= PANEL_FIELDS_WIDE);
    if (resizer) {
      resizer.setAttribute("aria-valuenow", String(w));
      resizer.setAttribute("aria-valuemin", String(PANEL_MIN));
      resizer.setAttribute("aria-valuemax", String(max));
    }
    /* Footer tip + tab indicator depend on layout — remeasure when panel width changes */
    requestAnimationFrame(() => {
      refreshStickyFooterTip();
      stage?.querySelectorAll(".tabs").forEach((tabs) => {
        layoutTabsIndicator(tabs, { animate: false });
      });
    });
  }

  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function menuPopoverAnchor(el) {
    return (
      el?.closest(
        ".select-wrap, .inline-dob-control, .ins-dropdown-wrap, .view-menu-wrap, .more-menu-wrap, .ct-row-menu-wrap, .ct-search-wrap, .elig-filter-wrap"
      ) || el?.parentElement
    );
  }

  function clearMenuPopoverPlacement(el) {
    if (!el) return;
    const anchor = el._selectMenuHome || menuPopoverAnchor(el);
    el.classList.remove("opens-up", "is-fixed-popover");
    anchor?.classList.remove("opens-up");
    if (
      el.classList.contains("dob-calendar") ||
      el.classList.contains("ins-dropdown-menu") ||
      el.classList.contains("select-menu")
    ) {
      el.style.position = "";
      el.style.top = "";
      el.style.right = "";
      el.style.bottom = "";
      el.style.left = "";
      el.style.width = "";
      el.style.minWidth = "";
      el.style.maxWidth = "";
      el.style.zIndex = "";
    }
    /* Return menus portaled to <body> back to their wrap */
    if (el.classList.contains("ins-dropdown-menu") && el._insDropdownHome?.isConnected) {
      const home = el._insDropdownHome;
      home.appendChild(el);
      if (home._portedMenu === el) home._portedMenu = null;
      el._insDropdownHome = null;
    }
    if (el.classList.contains("select-menu") && el._selectMenuHome?.isConnected) {
      const home = el._selectMenuHome;
      home.appendChild(el);
      if (home._portedMenu === el) home._portedMenu = null;
      el._selectMenuHome = null;
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

  /**
   * Inline Select / Item: portal to <body> + fixed so accordion `overflow: hidden`
   * (and `.card`) can’t clip the menu. Prefer below the field; flip up if needed.
   */
  function positionSelectMenu(el) {
    const wrap =
      el._selectMenuHome || el.closest(".select-wrap") || menuPopoverAnchor(el);
    const trigger = wrap?.querySelector(".select-trigger");
    if (!wrap || !trigger) return;

    if (el.parentElement !== document.body) {
      el._selectMenuHome = wrap;
      wrap._portedMenu = el;
      document.body.appendChild(el);
    }

    const triggerRect = trigger.getBoundingClientRect();
    /* Wrap stays in the panel — menu may already be on <body> */
    const panelRoot = wrap.closest(".panel-content") || panel;
    const panelRect = panelRoot?.getBoundingClientRect();
    const gap = 4;
    let bottomLimit = (panelRect?.bottom ?? window.innerHeight) - 8;
    let topLimit = (panelRect?.top ?? 0) + 8;
    panelRoot?.querySelectorAll(".panel-edit-bar, .ins-sticky-footer, .task-list-accordion").forEach((bar) => {
      if (bar.hidden || getComputedStyle(bar).display === "none") return;
      const barRect = bar.getBoundingClientRect();
      if (barRect.height <= 0) return;
      if (barRect.top > triggerRect.top) bottomLimit = Math.min(bottomLimit, barRect.top - gap);
      if (barRect.bottom < triggerRect.top) topLimit = Math.max(topLimit, barRect.bottom + gap);
    });
    const menuHeight = Math.max(el.offsetHeight, el.scrollHeight, 48);
    const spaceBelow = bottomLimit - triggerRect.bottom - gap;
    const openUp = menuHeight > spaceBelow;
    let top = openUp ? triggerRect.top - gap - menuHeight : triggerRect.bottom + gap;
    if (top < topLimit) top = topLimit;
    if (top + menuHeight > bottomLimit) top = Math.max(topLimit, bottomLimit - menuHeight);

    el.classList.add("is-fixed-popover");
    el.classList.toggle("opens-up", openUp);
    wrap.classList.toggle("opens-up", openUp);
    const triggerWidth = Math.round(triggerRect.width);
    const rail = document.querySelector(".tool-rail");
    const railLeft = rail ? rail.getBoundingClientRect().left - 8 : window.innerWidth - 8;
    /* Stay inside the panel (and clear of the tool rail) — truncate when narrow */
    const rightEdge = Math.min(
      railLeft,
      (panelRect?.right ?? window.innerWidth) - 8,
      window.innerWidth - 8
    );
    const maxAllowed = Math.max(triggerWidth, rightEdge - Math.round(triggerRect.left));
    el.style.position = "fixed";
    el.style.top = `${Math.round(top)}px`;
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.left = `${Math.round(triggerRect.left)}px`;
    el.style.minWidth = `${triggerWidth}px`;
    el.style.zIndex = "1200";
    /* Measure natural width, then clamp — labels ellipsis when capped */
    el.classList.remove("is-truncated");
    el.style.width = "max-content";
    el.style.maxWidth = "none";
    const natural = Math.ceil(el.getBoundingClientRect().width);
    const menuWidth = Math.min(Math.max(natural, triggerWidth), maxAllowed);
    let left = triggerRect.left;
    if (left + menuWidth > rightEdge) {
      left = Math.max(8, rightEdge - menuWidth);
    }
    el.style.left = `${Math.round(left)}px`;
    el.style.width = `${Math.round(menuWidth)}px`;
    el.style.maxWidth = `${Math.round(menuWidth)}px`;
    el.classList.toggle("is-truncated", menuWidth < natural - 1);
  }

  /**
   * Compare-plan dropdowns: portal to <body> + fixed so `.card { overflow: hidden }`
   * and the tool rail can’t clip them. Prefer below + trigger-left; shift left if needed.
   */
  function positionInsDropdownMenu(el) {
    const wrap =
      el._insDropdownHome ||
      el.closest(".ins-dropdown-wrap") ||
      stage.querySelector(`.ins-dropdown-wrap.is-open`);
    const trigger = wrap?.querySelector(".ins-dropdown-trigger");
    if (!wrap || !trigger) return;

    if (el.parentElement !== document.body) {
      el._insDropdownHome = wrap;
      wrap._portedMenu = el;
      document.body.appendChild(el);
    }

    const triggerRect = trigger.getBoundingClientRect();
    const gap = 4;
    const rail = document.querySelector(".tool-rail");
    const rightLimit = Math.min(
      window.innerWidth - 8,
      rail ? rail.getBoundingClientRect().left - 8 : window.innerWidth - 8
    );

    el.classList.add("is-fixed-popover");
    el.classList.remove("opens-up");
    wrap.classList.remove("opens-up");
    el.hidden = false;
    el.style.position = "fixed";
    el.style.bottom = "auto";
    el.style.right = "auto";
    el.style.minWidth = `${Math.round(triggerRect.width)}px`;
    el.style.width = "max-content";
    el.style.maxWidth = "280px";
    el.style.zIndex = "1200";
    el.style.top = `${Math.round(triggerRect.bottom + gap)}px`;
    el.style.left = `${Math.round(triggerRect.left)}px`;

    const menuRect = el.getBoundingClientRect();
    const menuWidth = Math.min(280, Math.max(menuRect.width, triggerRect.width, 1));
    let left = triggerRect.left;
    if (left + menuWidth > rightLimit) {
      left = Math.max(8, rightLimit - menuWidth);
    }
    /* Always open downward on compare — controls sit near the top of the panel */
    const top = triggerRect.bottom + gap;

    el.style.top = `${Math.round(top)}px`;
    el.style.left = `${Math.round(left)}px`;
  }

  /** Prefer open downward; flip up when clipped below or colliding with sticky chrome. */
  function positionMenuPopover(el) {
    if (!el || el.hidden) return;
    if (el.classList.contains("dob-calendar")) {
      positionDobCalendar(el);
      return;
    }
    if (el.classList.contains("ins-dropdown-menu")) {
      positionInsDropdownMenu(el);
      return;
    }
    if (el.classList.contains("select-menu")) {
      positionSelectMenu(el);
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
      /* Fixed menus need a second pass once visibility is restored */
      if (el.classList.contains("ins-dropdown-menu")) positionInsDropdownMenu(el);
      if (el.classList.contains("select-menu")) positionSelectMenu(el);
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
      requestAnimationFrame(() => {
        ensurePanelFitsTabs();
        syncRailIndicator({ animate: false });
      });
    });
  }

  const loaded = new Set(["assist"]);
  let activePanel = "assist";
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
    additionalPlansOpen: true,
  };

  const assistState = {
    tab: "ask-answers",
    query: "",
  };
  const ASSIST_CONVERSATION_ID = "8f3c2a0b-f69e-4c1d-9a2e-7b1d4ca0bf69";
  const ASSIST_CONVERSATION_ID_DISPLAY = "…a0bf69";
  /** null = not yet played this load; true = armed (wordmark reset); false = consumed until reset. */
  let assistGlowPending = null;

  function resetAssistAiGlow() {
    assistGlowPending = true;
  }

  /** Edge glow once per page load (in-memory); replays after wordmark reset. */
  function shouldPlayAssistGlow() {
    if (assistGlowPending === false) return false;
    if (assistGlowPending === true) {
      assistGlowPending = false; /* one paint only — don't restart on re-render */
      return true;
    }
    assistGlowPending = false;
    return true;
  }

  const ELIG_EMPLOYER_COMPANY = "Demo Premium Company";
  const ELIG_IHP_COMPANY = "Included Health Plan";

  const eligibilityState = {
    company: ELIG_EMPLOYER_COMPANY,
    enrolled: true,
    coverageStatus: "Active",
    microsite: "—",
    phoneLine: "—",
    infoOpen: true,
    benefitQuery: "",
    /** @type {"all"|"ih"|"other"} */
    benefitFilter: "all",
    /** @type {"overview"|"benefit"} */
    view: "overview",
    selectedBenefitId: null,
    selectedBenefitIds: new Set(),
  };

  const PROVIDER_SEARCH_BY_OPTIONS = ["Name", "Specialty", "NPI"];
  const PROVIDER_ADDRESS_OPTIONS = [
    "1 California Street, San Francisco, CA 94111",
    "Phoenix, AZ",
    "San Diego, CA",
    "San Antonio, TX",
    "2000 Alameda de Las Pulgas, San Mateo, CA 94403",
  ];
  const PROVIDER_PLAN_OPTIONS = [
    "Google PPO (Current Year)",
    "Anthem PPO Plan (Current Year)",
    "CalPERS PPO Basic Plan",
  ];
  const PROVIDER_SORT_OPTIONS = [
    ["best", "Best Match"],
    ["distance", "Distance"],
    ["name", "Name A–Z"],
  ];
  const MOCK_PROVIDERS = [
    {
      id: "p1",
      name: "Dr. Julianna Chen, MD",
      specialty: "Obstetrics & Gynecology",
      group: "Associated Obstetrics & Gynecology",
      address: "7210 N Main St Ste 210, Clarkston, MI 48346",
      distanceMiles: 17,
      phone: "(503) 555-0198",
      photoUrl: "assets/providers/lin.jpg",
      acceptingNewPatients: true,
      inNetwork: false,
    },
    {
      id: "p2",
      name: "Dr. Marcus Hale, MD",
      specialty: "Cardiology",
      group: "Bay Area Heart Institute",
      address: "450 Sutter St Ste 1200, San Francisco, CA 94108",
      distanceMiles: 2.4,
      phone: "(415) 555-0144",
      photoUrl: "assets/providers/avatar-sam.jpg",
      acceptingNewPatients: false,
      inNetwork: true,
    },
    {
      id: "p3",
      name: "Dr. Priya Shah, DO",
      specialty: "Family Medicine",
      group: "Mission Primary Care",
      address: "1580 Valencia St, San Francisco, CA 94110",
      distanceMiles: 4.1,
      phone: "(415) 555-0162",
      photoUrl: "assets/providers/avatar-priya.jpg",
      acceptingNewPatients: false,
      inNetwork: false,
    },
    {
      id: "p4",
      name: "Dr. Noah Brooks, MD",
      specialty: "Internal Medicine",
      group: "Cascade Regional Medical Group",
      address: "88 Market St Ste 400, San Francisco, CA 94105",
      distanceMiles: 1.2,
      phone: "(415) 555-0118",
      photoUrl: "assets/providers/avatar-noah.jpg",
      acceptingNewPatients: false,
      inNetwork: false,
    },
    {
      id: "p5",
      name: "Dr. Amara Patel, MD",
      specialty: "Dermatology",
      group: "Pacific Skin & Wellness",
      address: "2100 Webster St Ste 305, San Francisco, CA 94115",
      distanceMiles: 3.6,
      phone: "(415) 555-0177",
      photoUrl: "assets/providers/avatar-amara.jpg",
      acceptingNewPatients: true,
      inNetwork: true,
    },
    {
      id: "p6",
      name: "Dr. Luis Ortega, MD",
      specialty: "Orthopedic Surgery",
      group: "Golden Gate Orthopedics",
      address: "3838 California St Ste 715, San Francisco, CA 94118",
      distanceMiles: 5.8,
      phone: "(415) 555-0133",
      photoUrl: "assets/providers/avatar-luis.jpg",
      acceptingNewPatients: false,
      inNetwork: false,
    },
    {
      id: "p7",
      name: "Dr. Mei Lin, MD",
      specialty: "Endocrinology",
      group: "Northside Community Physicians",
      address: "1100 Van Ness Ave, San Francisco, CA 94109",
      distanceMiles: 2.9,
      phone: "(415) 555-0191",
      photoUrl: "assets/providers/patel.jpg",
      acceptingNewPatients: false,
      inNetwork: false,
    },
    {
      id: "p8",
      name: "Dr. Robert Kensington, MD",
      specialty: "Cardiology",
      group: "City Heart Specialists",
      address: "1 California St Ste 2200, San Francisco, CA 94111",
      distanceMiles: 0.8,
      phone: "(415) 555-0102",
      photoUrl: "assets/providers/avatar-kenji.jpg",
      acceptingNewPatients: false,
      inNetwork: true,
    },
  ];
  const providerSearchDefaults = () => ({
    searchBy: "Name",
    query: "",
    address: PROVIDER_ADDRESS_OPTIONS[0],
    plan: "Google PPO (Current Year)",
    hasSearched: false,
    resultsLoading: false,
    sortBy: "best",
    sortMenuOpen: false,
    selectedIds: new Set(),
  });
  let providerSearchState = providerSearchDefaults();
  let providerResultsLoaderTimer = 0;

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
    /* Same mark as mode-switcher / Select Item — 18px via CSS, stroke 2, brand */
    /* Select / Item — icon/actions/check.bold Size=xs Style=bold */
    check: `<svg class="icon-check-bold" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m23.15 5.4-2.8-2.8a0.5 0.5 0 0 0-0.7 0L7.85 14.4a0.5 0.5 0 0 1-0.7 0l-2.8-2.8a0.5 0.5 0 0 0-0.7 0l-2.8 2.8a0.5 0.5 0 0 0 0 0.7l6.3 6.3a0.5 0.5 0 0 0 0.7 0l15.3-15.3a0.5 0.5 0 0 0 0-0.7Z"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    /* Streamline Ultimate Regular — Search (icon/misc/search) */
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1.472 13.357a9.063 9.063 0 1 0 16.682-7.09 9.063 9.063 0 1 0-16.682 7.09Z"/><path d="m16.221 16.22 7.029 7.03"/></svg>`,
    /* Member more-menu — Streamline Ultimate Regular (same set as mode switcher) */
    phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15.04 22.39.012.007a5.533 5.533 0 0 0 6.884-.755l.774-.774a1.846 1.846 0 0 0 0-2.609L19.449 15a1.846 1.846 0 0 0-2.609 0h0a1.843 1.843 0 0 1-2.608 0L9.014 9.781a1.846 1.846 0 0 1 0-2.609h0a1.843 1.843 0 0 0 0-2.608L5.754 1.3a1.846 1.846 0 0 0-2.609 0l-.774.774a5.535 5.535 0 0 0-.756 6.884l.008.012A49.935 49.935 0 0 0 15.04 22.39Z"/></svg>`,
    /* Streamline Ultimate Regular — Calendar Add 1 */
    calendarAdd: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.25 23.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12"/><path d="M17.25 14.25v6"/><path d="M14.25 17.25h6"/><path d="M.75 6.75h21.5"/><path d="M6.75 3.75v-3"/><path d="M16.25 3.75v-3"/><path d="M22.25 10V3.75a1.5 1.5 0 0 0-1.5-1.5H2.25a1.5 1.5 0 0 0-1.5 1.5v16a1.5 1.5 0 0 0 1.5 1.5H9.5"/></svg>`,
    folderAdd: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.25 18.75H2.447"/><path d="M20.25 8.25v-3a1.5 1.5 0 0 0-1.5-1.5H8.25v-1.5a1.5 1.5 0 0 0-1.5-1.5h-4.5a1.5 1.5 0 0 0-1.5 1.5v14.8a1.7 1.7 0 0 0 3.336.438l2.351-8.154A1.5 1.5 0 0 1 7.879 8.25H21.75a1.5 1.5 0 0 1 1.45 1.886"/><path d="M11.25 17.25a6 6 0 1 0 12 0 6 6 0 1 0-12 0Z"/><path d="M17.25 14.25v6"/><path d="M14.25 17.25h6"/></svg>`,
    taskListAdd: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.25 10.511h5.25"/><path d="M5.25 14.261h3"/><path d="M5.25 18.011h3"/><path d="M9.75 23.25h-7.5a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 2.25 4.5H6a3.75 3.75 0 0 1 7.5 0h3.75A1.5 1.5 0 0 1 18.75 6v2.25"/><path d="M9.75 4.136a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75"/><path d="M17.25 23.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/><path d="M17.25 14.25v6"/><path d="M14.25 17.25h6"/></svg>`,
    chatText: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.25 18-3 2.25v-4.5h-3a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5h16.5a1.5 1.5 0 0 1 1.5 1.5v4.5"/><path d="M5.25 5.25h10.5"/><path d="M5.25 9.75h3"/><path d="M23.25 18.75h-3v4.5l-4.5-4.5h-4.5v-9h12v9z"/><path d="M20.25 12.75h-6"/><path d="M20.25 15.75h-6"/></svg>`,
    /* Streamline Ultimate Regular — Messages Bubble Square Text */
    sms: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.75 18.75h-10.5l-6 4.5v-4.5h-3a1.5 1.5 0 0 1-1.5-1.5v-15a1.5 1.5 0 0 1 1.5-1.5h19.5a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5Z"/><path d="M5.25 7.5h13.5"/><path d="M5.25 12h10.5"/></svg>`,
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
    copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/></svg>`,
    /* Soft Success badge — icon/actions/check.circle Size=xs Style=bold @ 12×12, icon/success */
    checkCircle: `<svg class="provider-check-circle" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm6.93 8.2-6.85 9.29a1 1 0 0 1-1.43.19l-4.89-3.91a1 1 0 0 1-.15-1.41A1 1 0 0 1 7 12.21l4.08 3.26L17.32 7a1 1 0 0 1 1.39-.21 1 1 0 0 1 .22 1.41Z"/></svg>`,
    /* Soma icon/status/sparkles — Streamline Reward Stars 3 (Card / AI) */
    sparkles: `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" class="assist-sparkles-glyph"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M11.3051 1.52853C11.3299 1.43398 11.3853 1.3503 11.4627 1.29059C11.5401 1.23088 11.635 1.19849 11.7328 1.19849C11.8305 1.19849 11.9255 1.23088 12.0029 1.29059C12.0803 1.3503 12.1357 1.43398 12.1605 1.52853C12.355 2.27247 12.569 2.72933 12.8885 3.06711C13.2104 3.40725 13.6808 3.67252 14.4831 3.94192C14.5709 3.9714 14.6472 4.02772 14.7013 4.10293C14.7554 4.17813 14.7845 4.26842 14.7845 4.36105C14.7845 4.45368 14.7554 4.54398 14.7013 4.61918C14.6472 4.69438 14.5709 4.7507 14.4831 4.78018C13.6814 5.04958 13.2098 5.31486 12.8885 5.655C12.569 5.99337 12.3556 6.44964 12.1605 7.19358C12.1355 7.28787 12.08 7.37126 12.0027 7.43075C11.9254 7.49024 11.8306 7.5225 11.7331 7.5225C11.6355 7.5225 11.5407 7.49024 11.4634 7.43075C11.3861 7.37126 11.3307 7.28787 11.3057 7.19358C11.1106 6.44964 10.8966 5.99337 10.5771 5.655C10.2558 5.31486 9.7848 5.04958 8.9825 4.78018C8.89468 4.7507 8.81835 4.69438 8.76427 4.61918C8.71018 4.54398 8.68109 4.45368 8.68109 4.36105C8.68109 4.26842 8.71018 4.17813 8.76427 4.10293C8.81835 4.02772 8.89468 3.9714 8.9825 3.94192C9.7848 3.67252 10.2558 3.40725 10.5771 3.0677C10.8966 2.72933 11.1106 2.27188 11.3051 1.52912V1.52853ZM5.64123 3.99203C5.66601 3.89748 5.72142 3.81381 5.7988 3.75409C5.87619 3.69438 5.97117 3.66199 6.06891 3.66199C6.16666 3.66199 6.26164 3.69438 6.33902 3.75409C6.4164 3.81381 6.47181 3.89748 6.49659 3.99203C6.84734 5.33785 7.24525 6.21679 7.87012 6.88056C8.49616 7.5461 9.39338 8.0401 10.8359 8.52643C10.9237 8.55591 11 8.61223 11.0541 8.68743C11.1082 8.76264 11.1373 8.85293 11.1373 8.94556C11.1373 9.03819 11.1082 9.12848 11.0541 9.20369C11 9.27889 10.9237 9.33521 10.8359 9.36469C9.39338 9.85044 8.49616 10.345 7.87012 11.0106C7.24525 11.6743 6.84734 12.5533 6.49659 13.8991C6.47181 13.9936 6.4164 14.0773 6.33902 14.137C6.26164 14.1967 6.16666 14.2291 6.06891 14.2291C5.97117 14.2291 5.87619 14.1967 5.7988 14.137C5.72142 14.0773 5.66601 13.9936 5.64123 13.8991C5.2899 12.5533 4.89258 11.6743 4.26771 11.0106C3.64108 10.345 2.74445 9.85044 1.30137 9.36469C1.21355 9.33521 1.13722 9.27889 1.08314 9.20369C1.02905 9.12848 0.999959 9.03819 0.999959 8.94556C0.999959 8.85293 1.02905 8.76264 1.08314 8.68743C1.13722 8.61223 1.21355 8.55591 1.30137 8.52643C2.74445 8.0401 3.64167 7.5461 4.26771 6.88056C4.89258 6.21679 5.2899 5.33785 5.64123 3.99203ZM12.6268 9.97364C12.5294 9.97357 12.4347 10.0057 12.3574 10.0649C12.2801 10.1242 12.2246 10.2073 12.1994 10.3014C12.0579 10.8319 11.9064 11.1391 11.6906 11.3625C11.4725 11.5889 11.1448 11.774 10.557 11.9673C10.4686 11.9964 10.3916 12.0526 10.337 12.1281C10.2824 12.2035 10.253 12.2942 10.253 12.3873C10.253 12.4804 10.2824 12.5712 10.337 12.6466C10.3916 12.722 10.4686 12.7783 10.557 12.8073C11.1448 13.0001 11.4725 13.1852 11.6906 13.4116C11.9064 13.6356 12.0579 13.9421 12.1994 14.4727C12.2244 14.567 12.2798 14.6504 12.3571 14.7098C12.4344 14.7693 12.5292 14.8016 12.6268 14.8016C12.7243 14.8016 12.8191 14.7693 12.8964 14.7098C12.9737 14.6504 13.0292 14.567 13.0541 14.4727C13.1956 13.9421 13.3465 13.6356 13.5623 13.4116C13.7804 13.1852 14.1082 13.0001 14.6959 12.8073C14.7843 12.7783 14.8614 12.722 14.916 12.6466C14.9706 12.5712 15 12.4804 15 12.3873C15 12.2942 14.9706 12.2035 14.916 12.1281C14.8614 12.0526 14.7843 11.9964 14.6959 11.9673C14.1082 11.774 13.7804 11.5889 13.5623 11.3625C13.3465 11.1391 13.1956 10.8319 13.0536 10.3014C13.0284 10.2074 12.9729 10.1244 12.8958 10.0651C12.8186 10.0059 12.724 9.9737 12.6268 9.97364Z"/></svg>`,
    /* Filled info mark for Share tips chip */
    infoFilled: `<svg class="ins-tips-info" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="7" fill="currentColor" stroke="none"/><path class="ins-tips-info-mark" fill="currentColor" stroke="none" d="M6.35 5.9h1.3v4.55h-1.3zm.65-3.15a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z"/></svg>`,
    /* Notes / document — matches tool-rail Notes glyph */
    notes: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>`,
    /* Communication — matches tool-rail envelope glyph */
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    /* Simple clinic / building mark for provider cards */
    building: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M14 21h6V10a1 1 0 0 0-1-1h-5"/><path d="M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1"/></svg>`,
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
    {
      id: "adoption-assistance",
      name: "Adoption Assistance",
      icon: "clinic",
      recommended: false,
      jobAid: "Job Aid: Share [Adoption Assistance]",
      jobAidLink: "Adoption Assistance",
      description:
        "Helps members understand employer adoption benefits and next steps for reimbursement or support.",
      detail: defaultBenefitDetail("Adoption Assistance", "Employer Benefit"),
    },
  ];

  /** @type {null | "personal" | "contact" | "account"} */
  let memberEditingSection = null;
  /** Field snapshot at edit start — Save bar only when form ≠ baseline. */
  let memberEditBaseline = null;
  /** True while member section save is in flight (spinner on Save). */
  let memberSaving = false;
  /** True while enter/exit edit focus-mode fade is running. */
  let memberEditTransitioning = false;
  /** Prototype latency so Save spinner is visible when a save takes a while. */
  const MEMBER_SAVE_MS = 900;
  /** Soma-ish moderate fade for member edit focus-mode swap. */
  const MEMBER_EDIT_MOTION_MS = 160;
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

  const DOB_YEAR_MIN = 1920;

  function dobYearMax() {
    return new Date().getFullYear();
  }

  function dobDecadeStart(year) {
    return Math.floor(year / 10) * 10;
  }

  const DOB_MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
    const level = wrap.dataset.dobLevel || "day";
    let year = Number(wrap.dataset.viewYear);
    let month = Number(wrap.dataset.viewMonth);
    if (!year || !month) {
      const view = dobViewFromIso(selected);
      year = view.year;
      month = view.month;
      setDobViewMonth(wrap, year, month);
    }
    year = Math.min(dobYearMax(), Math.max(DOB_YEAR_MIN, year));

    cal.classList.remove("dob-level-day", "dob-level-month", "dob-level-year");
    cal.classList.add(`dob-level-${level}`);

    const weekdays = cal.querySelector(".dob-calendar-weekdays");
    if (weekdays) weekdays.hidden = level !== "day";

    const titleLabel = cal.querySelector(".dob-calendar-title-label");
    const titleBtn = cal.querySelector("[data-dob-title]");
    const prevBtn = cal.querySelector("[data-dob-prev]");
    const nextBtn = cal.querySelector("[data-dob-next]");
    const grid = cal.querySelector(".dob-calendar-grid");
    if (!grid) return;

    grid.className = "dob-calendar-grid";
    let cells = [];

    if (level === "day") {
      grid.classList.add("dob-calendar-grid--days");
      if (titleLabel) titleLabel.textContent = `${DOB_MONTHS[month - 1]} ${year}`;
      if (titleBtn) titleBtn.setAttribute("aria-label", "Choose month and year");
      if (prevBtn) prevBtn.setAttribute("aria-label", "Previous month");
      if (nextBtn) nextBtn.setAttribute("aria-label", "Next month");

      const startDow = new Date(year, month - 1, 1).getDay();
      const gridStart = new Date(year, month - 1, 1 - startDow);
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
    } else if (level === "month") {
      grid.classList.add("dob-calendar-grid--months");
      if (titleLabel) titleLabel.textContent = String(year);
      if (titleBtn) titleBtn.setAttribute("aria-label", "Choose year");
      if (prevBtn) prevBtn.setAttribute("aria-label", "Previous year");
      if (nextBtn) nextBtn.setAttribute("aria-label", "Next year");

      const selectedMonth = selected ? Number(selected.split("-")[1]) : 0;
      const selectedYear = selected ? Number(selected.split("-")[0]) : 0;
      for (let m = 1; m <= 12; m += 1) {
        const classes = ["dob-calendar-pick"];
        if (m === month) classes.push("is-current");
        if (selectedYear === year && selectedMonth === m) classes.push("is-selected");
        cells.push(
          `<button type="button" class="${classes.join(" ")}" data-dob-month="${m}">${DOB_MONTHS_SHORT[m - 1]}</button>`
        );
      }
    } else {
      grid.classList.add("dob-calendar-grid--years");
      let decadeStart = Number(wrap.dataset.viewDecadeStart);
      if (!decadeStart) {
        decadeStart = dobDecadeStart(year);
        wrap.dataset.viewDecadeStart = String(decadeStart);
      }
      const decadeEnd = decadeStart + 11;
      if (titleLabel) titleLabel.textContent = `${decadeStart} – ${decadeEnd}`;
      if (titleBtn) titleBtn.setAttribute("aria-label", "Year range");
      if (prevBtn) prevBtn.setAttribute("aria-label", "Previous years");
      if (nextBtn) nextBtn.setAttribute("aria-label", "Next years");

      const selectedYear = selected ? Number(selected.split("-")[0]) : 0;
      const maxY = dobYearMax();
      for (let y = decadeStart; y <= decadeEnd; y += 1) {
        const outOfRange = y < DOB_YEAR_MIN || y > maxY;
        const classes = ["dob-calendar-pick"];
        if (y === year) classes.push("is-current");
        if (selectedYear === y) classes.push("is-selected");
        if (outOfRange) classes.push("is-disabled");
        const disabled = outOfRange ? ' disabled aria-disabled="true"' : "";
        cells.push(
          `<button type="button" class="${classes.join(" ")}" data-dob-year="${y}"${disabled}>${y}</button>`
        );
      }
    }

    grid.innerHTML = cells.join("");
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
              <button type="button" class="dob-calendar-title" data-dob-title aria-label="Choose month and year">
                <span class="dob-calendar-title-label"></span>
                <span class="dob-calendar-title-chevron" aria-hidden="true">${icon.down}</span>
              </button>
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
      /* Keep is-open until [hidden] so stacking/fade aren’t covered by sibling rows */
      hideMenuPopover(cal);
      trigger?.setAttribute("aria-expanded", "false");
      const release = () => {
        if (cal.hidden) wrap.classList.remove("is-open");
      };
      cal.addEventListener("animationend", release, { once: true });
      window.setTimeout(release, 180);
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
        trigger.setAttribute("aria-expanded", "false");
        const release = () => {
          if (cal.hidden) wrap.classList.remove("is-open");
        };
        cal.addEventListener("animationend", release, { once: true });
        window.setTimeout(release, 180);
      };

      const openCalendar = () => {
        const view = dobViewFromIso(dateInput.value);
        wrap.dataset.dobLevel = "day";
        delete wrap.dataset.viewDecadeStart;
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
        const level = wrap.dataset.dobLevel || "day";
        if (event.target.closest("[data-dob-title]")) {
          if (level === "day") {
            wrap.dataset.dobLevel = "month";
          } else if (level === "month") {
            wrap.dataset.dobLevel = "year";
            wrap.dataset.viewDecadeStart = String(
              dobDecadeStart(Number(wrap.dataset.viewYear))
            );
          } else {
            return;
          }
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        if (event.target.closest("[data-dob-prev]")) {
          if (level === "year") {
            const minDecade = dobDecadeStart(DOB_YEAR_MIN);
            let start = Number(wrap.dataset.viewDecadeStart || minDecade) - 10;
            if (start < minDecade) start = minDecade;
            wrap.dataset.viewDecadeStart = String(start);
          } else if (level === "month") {
            let y = Number(wrap.dataset.viewYear) - 1;
            if (y < DOB_YEAR_MIN) y = DOB_YEAR_MIN;
            setDobViewMonth(wrap, y, Number(wrap.dataset.viewMonth));
          } else {
            let month = Number(wrap.dataset.viewMonth) - 1;
            let year = Number(wrap.dataset.viewYear);
            if (month < 1) {
              month = 12;
              year -= 1;
            }
            if (year < DOB_YEAR_MIN) {
              year = DOB_YEAR_MIN;
              month = 1;
            }
            setDobViewMonth(wrap, year, month);
          }
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        if (event.target.closest("[data-dob-next]")) {
          if (level === "year") {
            const maxDecade = dobDecadeStart(dobYearMax());
            let start = Number(wrap.dataset.viewDecadeStart || maxDecade) + 10;
            if (start > maxDecade) start = maxDecade;
            wrap.dataset.viewDecadeStart = String(start);
          } else if (level === "month") {
            let y = Number(wrap.dataset.viewYear) + 1;
            if (y > dobYearMax()) y = dobYearMax();
            setDobViewMonth(wrap, y, Number(wrap.dataset.viewMonth));
          } else {
            let month = Number(wrap.dataset.viewMonth) + 1;
            let year = Number(wrap.dataset.viewYear);
            if (month > 12) {
              month = 1;
              year += 1;
            }
            if (year > dobYearMax()) {
              year = dobYearMax();
              month = 12;
            }
            setDobViewMonth(wrap, year, month);
          }
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        const monthBtn = event.target.closest("[data-dob-month]");
        if (monthBtn?.dataset.dobMonth) {
          setDobViewMonth(wrap, Number(wrap.dataset.viewYear), Number(monthBtn.dataset.dobMonth));
          wrap.dataset.dobLevel = "day";
          renderDobCalendar(wrap);
          positionMenuPopover(cal);
          return;
        }
        const yearBtn = event.target.closest("[data-dob-year]:not([disabled])");
        if (yearBtn?.dataset.dobYear) {
          const y = Number(yearBtn.dataset.dobYear);
          if (y >= DOB_YEAR_MIN && y <= dobYearMax()) {
            setDobViewMonth(wrap, y, Number(wrap.dataset.viewMonth));
            wrap.dataset.dobLevel = "month";
            delete wrap.dataset.viewDecadeStart;
            renderDobCalendar(wrap);
            positionMenuPopover(cal);
          }
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

  function selectMenuForWrap(wrap) {
    return wrap?.querySelector(".select-menu") || wrap?._portedMenu || null;
  }

  function closeInlineSelects(except) {
    stage.querySelectorAll(".inline-select.is-open").forEach((wrap) => {
      if (wrap === except) return;
      const menu = selectMenuForWrap(wrap);
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
      /* Avoid open→close from double-binding (accordion + notes both call this). */
      if (wrap.dataset.selectBound === "1") return;
      const trigger = wrap.querySelector(".select-trigger");
      const menu = selectMenuForWrap(wrap);
      const hidden = wrap.querySelector("input[data-field]");
      const label = wrap.querySelector(".select-trigger-label");
      if (!trigger || !menu || !hidden || !label) return;
      wrap.dataset.selectBound = "1";

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = menu.hidden || menu.classList.contains("is-leaving");
        closeInlineSelects(wrap);
        closeInlineDobCalendars();
        if (opening) {
          showMenuPopover(menu);
          wrap.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          /* Remeasure after paint — fixed place clears accordion clip / Save bar */
          requestAnimationFrame(() => {
            positionSelectMenu(menu);
            requestAnimationFrame(() => positionSelectMenu(menu));
          });
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
          syncNotesEditChrome();
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
      ? `<button class="button button-ghost button-small edit-cancel" type="button" data-cancel-section="${sectionId}">Cancel</button>`
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
        <div class="accordion-body-inner">
          <div class="accordion-body-pad">
            <dl class="accordion-fields">${rows}</dl>
          </div>
        </div>
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

  function setPrimaryButtonLoading(btn, loading, idleLabel = "Save") {
    if (!btn) return;
    btn.classList.toggle("is-loading", loading);
    btn.disabled = loading;
    btn.setAttribute("aria-busy", String(loading));
    if (loading) {
      btn.innerHTML = `<span class="button-spinner" aria-hidden="true"></span><span>Saving...</span>`;
    } else {
      btn.textContent = idleLabel;
    }
  }

  function syncMemberEditChrome() {
    const content = stage.querySelector('.panel-content[data-content="member"]');
    if (!content) return;
    /* Keep Save spinner / disabled Cancel intact while a save is in flight */
    if (memberSaving) return;
    const editing = Boolean(memberEditingSection);
    const dirty = isMemberEditDirty();
    content.classList.toggle("is-section-editing", editing);
    const hadBar = Boolean(content.querySelector("[data-edit-bar]"));
    content.querySelector("[data-edit-bar]")?.remove();
    const taskList = content.querySelector(".task-list-accordion");
    /* Best practice: hide Save/Cancel until something actually changed */
    if (editing && dirty && taskList) {
      taskList.insertAdjacentHTML("beforebegin", memberEditBarHtml());
      const bar = content.querySelector("[data-edit-bar]");
      if (bar && !hadBar && !reduceMotion()) {
        bar.classList.add("is-edit-bar-enter");
        bar.addEventListener(
          "animationend",
          () => bar.classList.remove("is-edit-bar-enter"),
          { once: true }
        );
      }
      content.querySelectorAll("[data-cancel-section]").forEach((btn) => {
        btn.addEventListener("click", () => cancelMemberEdit());
      });
      content.querySelectorAll("[data-save-section]").forEach((btn) => {
        btn.addEventListener("click", () => saveMemberEdit(btn.dataset.saveSection));
      });
    }
  }

  function waitMemberEditMotion(ms = MEMBER_EDIT_MOTION_MS) {
    if (reduceMotion()) return Promise.resolve();
    return new Promise((r) => window.setTimeout(r, ms));
  }

  function bindMemberEditDirty(section) {
    const onDirty = () => syncMemberEditChrome();
    section?.querySelectorAll("[data-field], .inline-field-control").forEach((el) => {
      el.addEventListener("input", onDirty);
      el.addEventListener("change", onDirty);
    });
  }

  /**
   * Enter focus-mode edit: keep active header mounted; fade siblings + body;
   * swap pencil → Cancel; fade body fields in.
   */
  async function enterMemberEditFocus(sectionId) {
    const pane = stage.querySelector('.tab-pane[data-pane="member"]');
    const active = pane?.querySelector(`.accordion[data-section="${sectionId}"]`);
    if (!pane || !active) {
      memberEditingSection = sectionId;
      memberEditBaseline = snapshotMemberSection(sectionId);
      memberAccordionOpen[sectionId] = true;
      refreshMemberPane();
      return;
    }

    const siblings = [...pane.querySelectorAll(":scope > .accordion")].filter((el) => el !== active);
    const bodyMotion =
      active.querySelector(".accordion-body-pad") ||
      active.querySelector(".accordion-body-inner") ||
      active.querySelector(".accordion-body");
    const editBtn = active.querySelector(".edit-section");

    active.classList.add("is-open");
    memberAccordionOpen[sectionId] = true;

    if (!reduceMotion()) {
      siblings.forEach((el) => el.classList.add("is-edit-sibling-exit"));
      bodyMotion?.classList.add("is-edit-body-exit");
      editBtn?.classList.add("is-header-action-exit");
      await waitMemberEditMotion();
    }

    siblings.forEach((el) => el.remove());

    if (editBtn) {
      editBtn.outerHTML = `<button class="button button-ghost button-small edit-cancel${
        reduceMotion() ? "" : " is-header-action-enter"
      }" type="button" data-cancel-section="${sectionId}">Cancel</button>`;
      const cancelBtn = active.querySelector(".edit-cancel");
      cancelBtn?.addEventListener("click", () => cancelMemberEdit());
      cancelBtn?.addEventListener(
        "animationend",
        () => cancelBtn.classList.remove("is-header-action-enter"),
        { once: true }
      );
    }

    memberEditingSection = sectionId;
    memberEditBaseline = snapshotMemberSection(sectionId);
    active.classList.add("is-editing");
    active.querySelector(".accordion-toggle")?.setAttribute("data-editing", "true");

    if (bodyMotion) {
      bodyMotion.classList.remove("is-edit-body-exit");
      bodyMotion.innerHTML = `<dl class="accordion-fields">${rowsForSection(sectionId, true)}</dl>`;
      if (!reduceMotion()) {
        bodyMotion.classList.add("is-edit-body-enter");
        bodyMotion.addEventListener(
          "animationend",
          () => bodyMotion.classList.remove("is-edit-body-enter"),
          { once: true }
        );
      }
    }

    stage.querySelector('.panel-content[data-content="member"]')?.classList.add("is-section-editing");
    bindInlineSelects();
    bindInlineDobFields();
    bindMemberEditDirty(active);
    syncMemberEditChrome();
  }

  /**
   * Leave focus-mode edit: fade body (header stays through exit), then restore list.
   */
  async function exitMemberEditFocus() {
    const sectionId = memberEditingSection;
    const pane = stage.querySelector('.tab-pane[data-pane="member"]');
    const active = sectionId
      ? pane?.querySelector(`.accordion[data-section="${sectionId}"]`)
      : null;
    const bodyMotion =
      active?.querySelector(".accordion-body-pad") ||
      active?.querySelector(".accordion-body-inner") ||
      active?.querySelector(".accordion-body");
    const cancelBtn = active?.querySelector(".edit-cancel");

    if (active && !reduceMotion()) {
      bodyMotion?.classList.add("is-edit-body-exit");
      cancelBtn?.classList.add("is-header-action-exit");
      await waitMemberEditMotion();
    }

    abandonMemberEdit();
    refreshMemberPane();

    if (reduceMotion() || !sectionId) return;
    const nextPane = stage.querySelector('.tab-pane[data-pane="member"]');
    nextPane?.querySelectorAll(":scope > .accordion").forEach((acc) => {
      if (acc.dataset.section === sectionId) {
        const nextBody =
          acc.querySelector(".accordion-body-pad") ||
          acc.querySelector(".accordion-body-inner") ||
          acc.querySelector(".accordion-body");
        const pencil = acc.querySelector(".edit-section");
        nextBody?.classList.add("is-edit-body-enter");
        pencil?.classList.add("is-header-action-enter");
        nextBody?.addEventListener(
          "animationend",
          () => nextBody.classList.remove("is-edit-body-enter"),
          { once: true }
        );
        pencil?.addEventListener(
          "animationend",
          () => pencil.classList.remove("is-header-action-enter"),
          { once: true }
        );
      } else {
        acc.classList.add("is-edit-sibling-enter");
        acc.addEventListener(
          "animationend",
          () => acc.classList.remove("is-edit-sibling-enter"),
          { once: true }
        );
      }
    });
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
    if (memberSaving || memberEditTransitioning) return;
    if (!memberEditingSection) {
      next?.();
      return;
    }
    if (!isMemberEditDirty()) {
      if (memberEditTransitioning) return;
      memberEditTransitioning = true;
      exitMemberEditFocus()
        .then(() => next?.())
        .finally(() => {
          memberEditTransitioning = false;
        });
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
      closeModal();
      memberEditTransitioning = true;
      exitMemberEditFocus()
        .then(() => resume?.())
        .finally(() => {
          memberEditTransitioning = false;
        });
    });
    document.querySelector("#unsaved-save")?.addEventListener("click", async () => {
      const sectionId = memberEditingSection;
      const resume = pendingLeaveAction;
      const saveBtn = document.querySelector("#unsaved-save");
      const discardBtn = document.querySelector("#unsaved-discard");
      if (!sectionId || memberSaving || memberEditTransitioning) return;
      memberSaving = true;
      setPrimaryButtonLoading(saveBtn, true);
      if (discardBtn) discardBtn.disabled = true;
      await new Promise((r) => window.setTimeout(r, MEMBER_SAVE_MS));
      pendingLeaveAction = null;
      unsavedConfirmOpen = false;
      commitMemberEditFields(sectionId);
      const toast = memberSectionMeta[sectionId]?.toast;
      memberSaving = false;
      closeModal();
      memberEditTransitioning = true;
      try {
        await exitMemberEditFocus();
      } finally {
        memberEditTransitioning = false;
      }
      if (toast) showToast(toast);
      resume?.();
    });
  }

  async function startMemberEdit(sectionId) {
    if (!sectionId || memberEditTransitioning || memberSaving) return;
    memberEditTransitioning = true;
    try {
      await enterMemberEditFocus(sectionId);
      const pane = stage.querySelector('.tab-pane[data-pane="member"]');
      pane?.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
    } finally {
      memberEditTransitioning = false;
    }
  }

  async function cancelMemberEdit() {
    if (memberSaving || memberEditTransitioning) return;
    memberEditTransitioning = true;
    try {
      await exitMemberEditFocus();
    } finally {
      memberEditTransitioning = false;
    }
  }

  async function saveMemberEdit(sectionId) {
    if (!sectionId || memberSaving || memberEditTransitioning) return;
    const content = stage.querySelector('.panel-content[data-content="member"]');
    const saveBtn =
      content?.querySelector(`[data-save-section="${sectionId}"]`) ||
      content?.querySelector("[data-save-section]");
    const cancelBtns = content?.querySelectorAll("[data-cancel-section]");
    memberSaving = true;
    setPrimaryButtonLoading(saveBtn, true);
    cancelBtns?.forEach((btn) => {
      btn.disabled = true;
    });
    content
      ?.querySelectorAll(".accordion.is-editing [data-field], .accordion.is-editing .inline-field-control")
      .forEach((el) => {
        el.disabled = true;
      });
    await new Promise((r) => window.setTimeout(r, MEMBER_SAVE_MS));
    commitMemberEditFields(sectionId);
    const toast = memberSectionMeta[sectionId]?.toast;
    memberSaving = false;
    memberEditTransitioning = true;
    try {
      await exitMemberEditFocus();
    } finally {
      memberEditTransitioning = false;
    }
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
          <span class="task-list-chevron" aria-hidden="true">${icon.chevron}</span>
          <strong>Task list</strong>
          <span class="soft-badge soft-warning" aria-label="${taskListCount} tasks">${taskListCount}</span>
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
              <button type="button" role="menuitem" data-more-action="Care call">
                <span class="more-menu-icon" aria-hidden="true">${icon.phone}</span>Care call
              </button>
              <button type="button" role="menuitem" data-more-action="Schedule appointment">
                <span class="more-menu-icon" aria-hidden="true">${icon.calendarAdd}</span>Schedule appointment
              </button>
              <button type="button" role="menuitem" data-more-action="Search Provider">
                <span class="more-menu-icon" aria-hidden="true">${icon.search}</span>Search Provider
              </button>
              <button type="button" role="menuitem" data-more-action="Create a case">
                <span class="more-menu-icon" aria-hidden="true">${icon.folderAdd}</span>Create a case
              </button>
              <button type="button" role="menuitem" data-more-action="Start CCM Intake">
                <span class="more-menu-icon" aria-hidden="true">${icon.taskListAdd}</span>Start CCM Intake
              </button>
              <button type="button" role="menuitem" data-more-action="Ask KST">
                <span class="more-menu-icon" aria-hidden="true">${icon.chatText}</span>Ask KST
              </button>
              <button type="button" role="menuitem" data-more-action="Send Upcoming Call SMS">
                <span class="more-menu-icon" aria-hidden="true">${icon.sms}</span>Send Upcoming Call SMS
              </button>
            </div>
          </div>
          <button class="icon-button panel-close" type="button" aria-label="Close Member Information">${icon.close}</button>
        </div>
      </header>
      <div class="tabs" role="tablist">
        <span class="tabs-indicator" aria-hidden="true"></span>
        <button class="tab is-active" type="button" role="tab" data-tab="member" aria-selected="true">Member</button>
        <button class="tab" type="button" role="tab" data-tab="care-team" aria-selected="false">Care Team</button>
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
    { id: "kaiser", name: "2026 Kaiser Permanente HMO Classic", carrier: "Kaiser Permanente", premium: "$42.00/mo", additional: true },
    { id: "uhc", name: "2026 UnitedHealthcare HDHP Gold", carrier: "UnitedHealthcare", premium: "$51.25/mo", additional: true },
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
      <span class="tabs-indicator" aria-hidden="true"></span>
      ${[
        ["member-plan", "Member Plan"],
        ["activity", "Insurance Activity"],
        ["prior-auth", "Prior Authorizations"],
      ].map(([id, label]) => `<button class="tab${insuranceState.tab === id ? " is-active" : ""}" type="button" role="tab" data-ins-tab="${id}" aria-selected="${insuranceState.tab === id}">${label}</button>`).join("")}
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
    const count = priorAuths.length;
    const badgeClass = (status) => status === "Approved" ? "soft-success" : status === "Denied" ? "soft-danger" : "soft-warning";
    return `<div class="ins-main-pane">
      <div class="ins-auth-head">
        <div class="ins-auth-title">
          <strong>Prior Authorizations</strong>
          <span class="soft-badge soft-neutral ins-auth-count" aria-label="${count} prior authorizations">${count}</span>
        </div>
        <span class="ins-auth-updated">Updated 3 minutes ago</span>
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

  function insPlanOptionHtml(plan, selected) {
    const checked = selected.includes(plan.id);
    const disabled = !checked && selected.length >= 2;
    return `<label class="ins-plan-option${checked ? " is-selected" : ""}${disabled ? " is-disabled" : ""}">
      <input type="checkbox" data-ins-plan="${plan.id}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""} />
      <span><strong>${plan.name} ${plan.ihp ? `<span class="soft-badge soft-accent">IHP</span>` : ""}</strong><small>${plan.carrier} · Employee Only: ${plan.premium}</small></span>
    </label>`;
  }

  function insuranceCompareSelectTemplate() {
    const selected = insuranceState.compareSelected;
    const names = selected.map((id) => insurancePlans.find((p) => p.id === id)?.name).filter(Boolean);
    const primaryPlans = insurancePlans.filter((p) => !p.additional);
    const additionalPlans = insurancePlans.filter((p) => p.additional);
    const additionalOpen = insuranceState.additionalPlansOpen;
    return `<article class="panel-content ins-panel" data-content="insurance">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back"><button class="icon-button panel-back" type="button" data-ins-back="main" aria-label="Back">${icon.chevronLeft}</button><h2>Compare Plans</h2></div>
        <button class="icon-button panel-close" type="button" aria-label="Close Insurance">${icon.close}</button>
      </header>
      <div class="panel-scroll ins-scroll ins-compare-select">
        <div class="ins-plans-heading">
          <h3>Compare up to 2 plans for Riley</h3>
        </div>
        <div class="ins-plan-options">${primaryPlans.map((plan) => insPlanOptionHtml(plan, selected)).join("")}</div>
        <section class="accordion${additionalOpen ? " is-open" : ""}" data-section="additional-plans">
          <div class="accordion-header-row">
            <button class="accordion-toggle" type="button" aria-expanded="${additionalOpen}">
              <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
              <strong>Additional Plans</strong>
            </button>
          </div>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-body-pad">
                <div class="ins-plan-options">${additionalPlans.map((plan) => insPlanOptionHtml(plan, selected)).join("")}</div>
              </div>
            </div>
          </div>
        </section>
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

  function insDropdownMenuForWrap(wrap) {
    return wrap?.querySelector(".ins-dropdown-menu") || wrap?._portedMenu || null;
  }

  /** Toggle compare dropdown open state in the live DOM — never remounts .panel-content. */
  function applyCompareDropdownOpenState() {
    const open = insuranceState.openDropdown;
    stage.querySelectorAll(".ins-dropdown-wrap").forEach((wrap) => {
      const trigger = wrap.querySelector("[data-ins-dropdown]");
      const menu = insDropdownMenuForWrap(wrap);
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

    (insDropdownMenuForWrap(wrap) || wrap)
      .querySelectorAll("[data-ins-dropdown-option]")
      .forEach((option) => {
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
    const bindDropdownOptions = (root) => {
      root.querySelectorAll("[data-ins-dropdown-option]").forEach((option) => {
        if (option.dataset.boundInsOption) return;
        option.dataset.boundInsOption = "1";
        option.addEventListener("click", (event) => {
          event.stopPropagation();
          applyCompareDropdownSelection(option.dataset.insDropdownOption, option.dataset.value);
        });
      });
    };
    stage.querySelectorAll(".ins-dropdown-wrap").forEach((wrap) => {
      bindDropdownOptions(wrap);
    });
    /* Options may already be portaled from a prior open in this session */
    document.querySelectorAll("body > .ins-dropdown-menu").forEach((menu) => bindDropdownOptions(menu));
  }

  function insuranceTemplate() {
    if (insuranceState.view === "compare-select") return insuranceCompareSelectTemplate();
    if (insuranceState.view === "compare-detail") return insuranceCompareDetailTemplate();
    return insuranceMainTemplate();
  }

  /** Soma Tabs.Indicator — slide + resize to the active tab (full tab width). */
  function layoutTabsIndicator(tabsRoot, { animate = true } = {}) {
    const root = tabsRoot || stage.querySelector(".tabs");
    const indicator = root?.querySelector(".tabs-indicator");
    const active = root?.querySelector(".tab.is-active");
    if (!root || !indicator || !active) return;
    const skipMotion = !animate || reduceMotion();
    if (skipMotion) indicator.classList.add("is-instant");
    const rootRect = root.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const left = activeRect.left - rootRect.left + root.scrollLeft;
    indicator.style.width = `${Math.round(activeRect.width)}px`;
    indicator.style.transform = `translateX(${Math.round(left)}px)`;
    if (skipMotion) {
      void indicator.offsetWidth;
      indicator.classList.remove("is-instant");
    }
  }

  let railIndicatorWasHidden = true;

  /** Soma Rail / Indicator — slide to the active tool (vertical desktop, horizontal sheet). */
  function syncRailIndicator({ animate = true } = {}) {
    const rail = document.querySelector(".tool-rail");
    const indicator = rail?.querySelector(".rail-indicator");
    const active = rail?.querySelector(".rail-button.is-active");
    if (!rail || !indicator) return;
    if (!active) {
      indicator.classList.remove("is-visible");
      railIndicatorWasHidden = true;
      return;
    }
    const skipMotion = !animate || reduceMotion() || railIndicatorWasHidden;
    if (skipMotion) indicator.classList.add("is-instant");
    const railRect = rail.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (isSheetMode()) {
      const x = activeRect.left + activeRect.width / 2 - railRect.left - 10;
      const y = activeRect.top - railRect.top;
      indicator.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    } else {
      const y = activeRect.top + activeRect.height / 2 - railRect.top - 10;
      indicator.style.transform = `translateY(${Math.round(y)}px)`;
    }
    indicator.classList.add("is-visible");
    if (skipMotion) {
      void indicator.offsetWidth;
      indicator.classList.remove("is-instant");
    }
    railIndicatorWasHidden = false;
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
      layoutTabsIndicator(tabs, { animate: true });
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
    bindInsInfoTips();
    requestAnimationFrame(() => layoutInsSegmentedThumb(null, { animate: false }));
  }

  /** Meter info tips: fixed float so `.card` overflow + tool rail can’t cover them. */
  let insInfoTipHideTimer = 0;

  function ensureInsInfoTipFloat() {
    let float = document.querySelector(".ins-info-tip-float");
    if (!float) {
      float = document.createElement("div");
      float.className = "ins-info-tip-float";
      float.setAttribute("role", "tooltip");
      document.body.appendChild(float);
    }
    return float;
  }

  function hideInsInfoTipFloat() {
    const float = document.querySelector(".ins-info-tip-float");
    if (!float) return;
    /* Keep copy during leave so the box doesn’t collapse mid-fade */
    float.classList.remove("is-visible", "opens-below");
  }

  function showInsInfoTipFloat(btn) {
    const source = btn.querySelector(".ins-info-tip");
    if (!source) return;
    const float = ensureInsInfoTipFloat();
    float.textContent = source.textContent;
    float.classList.add("is-visible");

    const place = () => {
      const rect = btn.getBoundingClientRect();
      const tipRect = float.getBoundingClientRect();
      const gap = 4;
      const tipWidth = Math.max(tipRect.width, 240);
      const iconCenterX = rect.left + rect.width / 2;
      /* Prefer above the info icon; flip below only if clipped */
      let top = rect.top - tipRect.height - gap;
      let side = "above";
      if (top < 8) {
        top = rect.bottom + gap;
        side = "below";
      }
      /* Start-align tip to the right of the caret; keep caret on the icon center */
      const arrowInset = 16;
      let left = iconCenterX - arrowInset;
      left = Math.max(8, Math.min(left, window.innerWidth - tipWidth - 8));
      const arrowLeft = Math.max(10, Math.min(iconCenterX - left, tipWidth - 10));
      float.classList.toggle("opens-below", side === "below");
      float.style.left = `${Math.round(left)}px`;
      float.style.top = `${Math.round(top)}px`;
      float.style.setProperty("--tip-arrow-left", `${Math.round(arrowLeft)}px`);
    };
    place();
    requestAnimationFrame(place);
  }

  function bindInsInfoTips() {
    const scheduleHide = () => {
      window.clearTimeout(insInfoTipHideTimer);
      insInfoTipHideTimer = window.setTimeout(() => hideInsInfoTipFloat(), 80);
    };
    const cancelHide = () => window.clearTimeout(insInfoTipHideTimer);

    stage.querySelectorAll(".ins-info").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        cancelHide();
        showInsInfoTipFloat(btn);
      });
      btn.addEventListener("mouseleave", scheduleHide);
      btn.addEventListener("focus", () => {
        cancelHide();
        showInsInfoTipFloat(btn);
      });
      btn.addEventListener("blur", scheduleHide);
    });
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
      insuranceState.additionalPlansOpen = true;
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

  /** Clinic glyphs = employer/other; nodes = Included Health. */
  function benefitSource(benefit) {
    return benefit.icon === "clinic" ? "other" : "ih";
  }

  function benefitFilterHeading(filter = eligibilityState.benefitFilter) {
    if (filter === "ih") return "Included Health Benefits";
    if (filter === "other") return "Other Benefits";
    return "All Benefits";
  }

  function filteredBenefits() {
    const q = eligibilityState.benefitQuery.trim().toLowerCase();
    const filter = eligibilityState.benefitFilter;
    return memberBenefits.filter((b) => {
      if (filter !== "all" && benefitSource(b) !== filter) return false;
      if (q && !b.name.toLowerCase().includes(q)) return false;
      return true;
    });
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
    /* Last Activity: activity meta, else Recommended + dash, else dash alone */
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
          <span class="elig-benefit-activity-dash" aria-hidden="true">—</span>
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
    if (!count) return "";
    return `
      <div class="panel-edit-bar elig-selected-bar" data-elig-selection-bar>
        <span class="elig-selected-count">${count} benefit(s) selected</span>
        <div class="elig-selected-actions">
          <button class="button button-secondary elig-clear-selection" type="button">Cancel</button>
          <button class="button button-primary elig-mark-referred" type="button">Mark benefit as referred</button>
        </div>
      </div>`;
  }

  function clearBenefitSelection() {
    eligibilityState.selectedBenefitIds.clear();
    stage.querySelectorAll(".elig-benefit-check[data-benefit-select]").forEach((input) => {
      input.checked = false;
    });
  }

  function refreshBenefitsSelectionBar() {
    const panel = stage.querySelector('.panel-content[data-content="eligibility"]');
    if (!panel) return;
    const existing = panel.querySelector("[data-elig-selection-bar]");
    const html = eligibilitySelectedBarHtml();
    if (!html) {
      existing?.remove();
      return;
    }
    if (existing) {
      existing.outerHTML = html;
    } else {
      const taskList = panel.querySelector(".task-list-accordion");
      if (taskList) taskList.insertAdjacentHTML("beforebegin", html);
      else panel.insertAdjacentHTML("beforeend", html);
    }
    bindEligSelectionBar();
  }

  function bindEligSelectionBar() {
    stage.querySelector(".elig-clear-selection")?.addEventListener("click", () => {
      clearBenefitSelection();
      refreshBenefitsSelectionBar();
    });
    stage.querySelector(".elig-mark-referred")?.addEventListener("click", () => {
      const n = selectedBenefitCount();
      if (!n) return;
      showToast(`Marked ${n} benefit(s) as referred`);
      clearBenefitSelection();
      refreshBenefitsSelectionBar();
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
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-body-pad">${benefitBullets(detail.whenToRecommend)}</div>
            </div>
          </div>
        </section>
        <section class="accordion is-open" data-section="benefit-ask">
          <div class="accordion-header-row">
            <button class="accordion-toggle" type="button" aria-expanded="true">
              <span class="accordion-chevron" aria-hidden="true">${icon.chevron}</span>
              <strong>Questions to ask</strong>
            </button>
          </div>
          <div class="accordion-body">
            <div class="accordion-body-inner">
              <div class="accordion-body-pad">${benefitBullets(detail.questionsToAsk)}</div>
            </div>
          </div>
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
    const coverageLabel = eligibilityState.enrolled
      ? eligibilityState.coverageStatus
      : "Unenrolled";
    const coverageBadge = eligibilityState.enrolled
      ? "soft-badge soft-success"
      : "soft-badge soft-neutral";

    return `
    <article class="panel-content" data-content="eligibility">
      <header class="panel-header">
        <h2>Eligibility</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Eligibility">${icon.close}</button>
      </header>
      <div class="panel-scroll elig-overview">
        <div class="elig-overview-top">
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
              <dd><span class="${coverageBadge}"><span class="soft-badge-label">${coverageLabel}</span></span></dd>
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
              <div class="accordion-body-inner">
                <div class="accordion-body-pad">
                  <dl class="accordion-fields">${eligibilityInfoRowsHtml()}</dl>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="elig-benefits">
          <div class="elig-benefits-sticky">
            <h3 class="elig-benefits-title">Member benefits</h3>
            <div class="elig-search-row">
              <label class="elig-search">
                <span class="elig-search-icon" aria-hidden="true">${icon.search}</span>
                <input id="elig-benefit-search" type="search" placeholder="Search for benefit" value="${escapeAttr(eligibilityState.benefitQuery)}" autocomplete="off" />
                <button type="button" class="elig-search-kbd" tabindex="-1" aria-label="Focus benefit search">⌘K</button>
              </label>
              <div class="elig-filter-wrap">
                <button
                  class="elig-filter-btn${eligibilityState.benefitFilter !== "all" ? " is-active" : ""}"
                  type="button"
                  id="elig-benefit-filter"
                  aria-label="Filter benefits"
                  aria-expanded="false"
                  aria-haspopup="menu"
                >${icon.filter}</button>
                <div class="elig-filter-menu" role="menu" hidden>
                  <div class="elig-filter-group-label" id="elig-filter-group-label">Filter by</div>
                  <div class="elig-filter-radio-group" role="group" aria-labelledby="elig-filter-group-label">
                  ${[
                    ["all", "All"],
                    ["ih", "Included Health"],
                    ["other", "Other"],
                  ]
                    .map(
                      ([value, label]) => `
                  <button
                    type="button"
                    role="menuitemradio"
                    data-benefit-filter="${value}"
                    aria-checked="${eligibilityState.benefitFilter === value}"
                    class="${eligibilityState.benefitFilter === value ? "is-selected" : ""}"
                  >
                    <span class="menu-radio" aria-hidden="true"></span>
                    <span class="elig-filter-item-label">${label}</span>
                  </button>`
                    )
                    .join("")}
                  </div>
                </div>
              </div>
            </div>
            <div class="elig-benefits-head">
              <h4 class="elig-benefits-all" id="elig-benefits-filter-label">${benefitFilterHeading()}</h4>
              <div class="elig-benefits-cols">
                <span class="elig-benefits-cols-name">Benefit Name</span>
                <span>Last Activity</span>
              </div>
            </div>
          </div>
          <div class="elig-benefits-list">
            ${eligibilityBenefitsHtml()}
          </div>
        </section>
      </div>
      ${eligibilitySelectedBarHtml()}
      ${taskListHtml()}
    </article>`;
  }

  function eligibilityTemplate() {
    if (eligibilityState.view === "benefit") return eligibilityBenefitDetailTemplate();
    return eligibilityOverviewTemplate();
  }


  /* ——— Notes panel ——— */
  const NOTE_TYPE_OPTIONS = [
    "General note",
    "After-hours pharmacy refill follow-up",
    "Open enrollment — plan comparison help",
    "Chat note",
  ];
  const NOTE_DISPOSITION_OPTIONS = [
    "(Chat Only) Non-Business Hours",
    "(Chat Only) Benefits Inquiry",
    "(Chat Only) Claims Support",
  ];
  const NOTE_RESOLUTION_OPTIONS = [
    "Chat Resolved - no follow up needed",
    "Escalated to Care Team",
    "Member to follow up",
  ];

  const notesState = {
    view: "list",
    editingId: null,
    draft: { noteType: "General note", title: "", body: "" },
    notes: [
      {
        id: "note-1",
        title: "After-hours pharmacy refill follow-up",
        noteType: "After-hours pharmacy refill follow-up",
        disposition: "(Chat Only) Non-Business Hours",
        resolution: "Chat Resolved - no follow up needed",
        author: "Solon Gaylord",
        when: "8/13/26, 11:53 AM",
        body:
          "Date: 08/13/2026\nTime: 11:53 AM\nTimezone: EDT\nIntent: Member needed after-hours pharmacy refill guidance. Confirmed coverage and shared next steps for the preferred pharmacy.",
      },
      {
        id: "note-2",
        title: "Chat note",
        noteType: "Open enrollment — plan comparison help",
        disposition: "",
        resolution: "",
        author: "Solon Gaylord",
        when: "8/12/26, 3:18 PM",
        body:
          "Date: 08/12/2026\nTime: 3:18 PM\nTimezone: EDT\nIntent: The member requested to speak with a member advocate about open enrollment plan comparison. Walked through PPO vs HMO tradeoffs and documented preferred next steps.",
      },
      {
        id: "note-3",
        title: "Specialist referral follow-up",
        noteType: "General note",
        disposition: "",
        resolution: "",
        author: "Lila George",
        when: "8/11/26, 9:42 AM",
        body:
          "Date: 08/11/2026\nTime: 9:42 AM\nTimezone: EDT\nIntent: Member asked about a specialist referral on their CalPERS PPO plan. Shared in-network referral steps and confirmed they will message back after scheduling.",
      },
    ],
  };
  let notesEditBaseline = null;
  let notesSaving = false;
  const notesExpandedIds = new Set();

  function notesSelectHtml(id, fieldKey, value, options) {
    const opts = (options || [])
      .map((opt) => {
        const selected = opt === value;
        return `<button type="button" role="option" class="${selected ? "is-selected" : ""}" data-value="${escapeAttr(opt)}" aria-selected="${selected}">
            <span>${escapeAttr(opt)}</span>${selected ? icon.check : ""}
          </button>`;
      })
      .join("");
    return `<div class="select-wrap inline-select">
        <input type="hidden" id="${id}" data-field="${fieldKey}" value="${escapeAttr(value)}" />
        <button type="button" class="inline-field-control select-trigger" aria-expanded="false" aria-haspopup="listbox" aria-controls="${id}-menu" id="${id}-trigger">
          <span class="select-trigger-label">${escapeAttr(value)}</span>${icon.down}
        </button>
        <div class="select-menu" id="${id}-menu" role="listbox" hidden>${opts}</div>
      </div>`;
  }

  function notesFieldLabel(label, { required = false, tip = "" } = {}) {
    const req = required ? ` <span class="notes-required" aria-hidden="true">*</span>` : "";
    const tipBtn = tip
      ? ` <button class="ins-info notes-field-tip" type="button" aria-label="About ${escapeAttr(label)}">${icon.info}<span class="ins-info-tip" role="tooltip">${escapeAttr(tip)}</span></button>`
      : "";
    return `<div class="notes-field-label">${escapeAttr(label)}${req}${tipBtn}</div>`;
  }

  function notesCreateFormHtml() {
    const d = notesState.draft;
    return `
      <div class="notes-form" data-notes-form="create">
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Note Type", { tip: "Choose the category that best matches this note." })}
          ${notesSelectHtml("notes-create-type", "noteType", d.noteType, NOTE_TYPE_OPTIONS)}
        </div>
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Note Title", { required: true })}
          <input class="inline-field-control" id="notes-create-title" type="text" data-field="title" placeholder="Placeholder" value="${escapeAttr(d.title)}" />
        </div>
        <div class="notes-field notes-field--body">
          ${notesFieldLabel("Notes", { required: true })}
          <textarea class="inline-field-control inline-field-textarea" id="notes-create-body" data-field="body" rows="4" placeholder="Enter a description">${escapeAttr(d.body)}</textarea>
        </div>
      </div>`;
  }

  function notesEditFormHtml(note) {
    return `
      <div class="notes-form" data-notes-form="edit">
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Note Type", { tip: "Choose the category that best matches this note." })}
          ${notesSelectHtml("notes-edit-type", "noteType", note.noteType, NOTE_TYPE_OPTIONS)}
        </div>
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Note Title", { required: true })}
          <input class="inline-field-control" id="notes-edit-title" type="text" data-field="title" value="${escapeAttr(note.title)}" />
        </div>
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Primary Disposition", { required: true, tip: "Primary disposition for this chat note." })}
          ${notesSelectHtml("notes-edit-disposition", "disposition", note.disposition, NOTE_DISPOSITION_OPTIONS)}
        </div>
        <div class="notes-field notes-field--compact">
          ${notesFieldLabel("Resolution", { tip: "How this note was resolved." })}
          ${notesSelectHtml("notes-edit-resolution", "resolution", note.resolution, NOTE_RESOLUTION_OPTIONS)}
        </div>
        <div class="notes-field notes-field--body">
          ${notesFieldLabel("Notes", { required: true })}
          <textarea class="inline-field-control inline-field-textarea" id="notes-edit-body" data-field="body" rows="6">${escapeAttr(note.body)}</textarea>
        </div>
      </div>`;
  }

  /** Rough check — refined after paint via syncNotesCardClamps. */
  function noteBodyLikelyClamped(text) {
    const raw = String(text || "").trim();
    if (!raw) return false;
    const lines = raw.split(/\n/).length;
    return lines > 3 || raw.length > 160;
  }

  function notesCardHtml(note) {
    const expanded = notesExpandedIds.has(note.id);
    const bodyHtml = escapeAttr(note.body).replace(/\n/g, "<br>");
    const showToggle = expanded || noteBodyLikelyClamped(note.body);
    const toggleLabel = expanded ? "Show less" : "Show more";
    const toggleIcon = expanded ? icon.up : icon.chevron;
    return `
      <article class="notes-card" data-note-id="${escapeAttr(note.id)}">
        <div class="notes-card-head">
          <span class="notes-card-icon" aria-hidden="true">${icon.notes}</span>
          <div class="notes-card-titles">
            <h4 class="notes-card-title">${escapeAttr(note.noteType || note.title)}</h4>
            <p class="notes-card-meta">${escapeAttr(note.when)} • ${escapeAttr(note.author)}</p>
          </div>
          <button class="edit-section" type="button" data-edit-note="${escapeAttr(note.id)}" aria-label="Edit note">${icon.edit}</button>
        </div>
        <div class="notes-card-body">
          <div class="notes-card-preview${expanded ? " is-expanded" : ""}">
            ${note.disposition ? `<p class="notes-card-kv"><span>Disposition:</span> ${escapeAttr(note.disposition)}</p>` : ""}
            ${note.resolution ? `<p class="notes-card-kv"><span>Resolution:</span> ${escapeAttr(note.resolution)}</p>` : ""}
            <p class="notes-card-text">${bodyHtml}</p>
          </div>
          ${
            showToggle
              ? `<button class="notes-show-more" type="button" data-notes-toggle="${escapeAttr(note.id)}" aria-expanded="${expanded}"><span class="notes-show-more-label">${toggleLabel}</span><span class="notes-show-more-chevron" aria-hidden="true">${toggleIcon}</span></button>`
              : ""
          }
        </div>
      </article>`;
  }

  function syncNotesCardClamps() {
    stage.querySelectorAll(".notes-card").forEach((card) => {
      const preview = card.querySelector(".notes-card-preview");
      const toggle = card.querySelector("[data-notes-toggle]");
      if (!preview || !toggle) return;
      if (preview.classList.contains("is-expanded")) {
        toggle.hidden = false;
        return;
      }
      const overflows = preview.scrollHeight > preview.clientHeight + 1;
      toggle.hidden = !overflows;
    });
  }

  function notesListTemplate() {
    const cards = notesState.notes.map(notesCardHtml).join("");
    return `
    <article class="panel-content" data-content="notes">
      <header class="panel-header">
        <h2>Create Note</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Notes">${icon.close}</button>
      </header>
      <div class="panel-scroll notes-scroll">
        ${notesCreateFormHtml()}
        <h3 class="notes-section-title">All Notes</h3>
        <div class="notes-list">${cards || `<p class="quiet-state">No notes yet</p>`}</div>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function notesEditTemplate() {
    const note = notesState.notes.find((n) => n.id === notesState.editingId);
    if (!note) {
      notesState.view = "list";
      notesState.editingId = null;
      notesEditBaseline = null;
      return notesListTemplate();
    }
    return `
    <article class="panel-content" data-content="notes">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back">
          <button class="icon-button panel-back" type="button" data-notes-back aria-label="Back">${icon.chevronLeft}</button>
          <h2>Edit Note</h2>
        </div>
        <button class="icon-button panel-close" type="button" aria-label="Close Notes">${icon.close}</button>
      </header>
      <div class="panel-scroll notes-scroll">
        ${notesEditFormHtml(note)}
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function notesTemplate() {
    return notesState.view === "edit" ? notesEditTemplate() : notesListTemplate();
  }

  function notesEditBarHtml({ saveDisabled = false } = {}) {
    const saveHint = "Add a title and notes to save";
    const saveBtn = saveDisabled
      ? `<span class="notes-save-wrap" data-notes-save-blocked>
          <button class="button button-primary" type="button" data-notes-save disabled aria-disabled="true">${"Save note"}</button>
          <span class="tooltip tooltip--above" role="tooltip">${saveHint}</span>
        </span>`
      : `<button class="button button-primary" type="button" data-notes-save>Save note</button>`;
    return `
      <div class="panel-edit-bar" data-edit-bar>
        <button class="button button-secondary" type="button" data-notes-cancel>Cancel</button>
        ${saveBtn}
      </div>`;
  }

  function readNotesFormValues() {
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    const values = {};
    content?.querySelectorAll("[data-field]").forEach((el) => {
      const key = el.dataset.field;
      if (key) values[key] = el.value.trim();
    });
    return values;
  }

  function snapshotNotesEdit() {
    const note = notesState.notes.find((n) => n.id === notesState.editingId);
    if (!note) return null;
    return {
      noteType: String(note.noteType ?? "").trim(),
      title: String(note.title ?? "").trim(),
      disposition: String(note.disposition ?? "").trim(),
      resolution: String(note.resolution ?? "").trim(),
      body: String(note.body ?? "").trim(),
    };
  }

  function isNotesEditDirty() {
    if (notesState.view !== "edit" || !notesEditBaseline) return false;
    const current = readNotesFormValues();
    const keys = Object.keys(notesEditBaseline);
    return keys.some((key) => (current[key] ?? "") !== (notesEditBaseline[key] ?? ""));
  }

  function readNotesCreateFields() {
    const current = readNotesFormValues();
    return {
      noteType: (current.noteType ?? notesState.draft.noteType ?? "General note").trim(),
      title: (current.title ?? notesState.draft.title ?? "").trim(),
      body: (current.body ?? notesState.draft.body ?? "").trim(),
    };
  }

  function isNotesCreateReady() {
    if (notesState.view !== "list") return false;
    const { title, body } = readNotesCreateFields();
    return Boolean(title && body);
  }

  /** Any create draft change — shows Cancel/Save before all required fields are filled. */
  function isNotesCreateDirty() {
    if (notesState.view !== "list") return false;
    const { noteType, title, body } = readNotesCreateFields();
    return Boolean(title || body || noteType !== "General note");
  }

  function isNotesDirty() {
    if (notesState.view === "edit") return isNotesEditDirty();
    return isNotesCreateDirty();
  }

  function shouldShowNotesEditBar() {
    if (notesState.view === "edit") return isNotesEditDirty();
    return isNotesCreateDirty();
  }

  function clearNotesFieldErrors(content = stage.querySelector('.panel-content[data-content="notes"]')) {
    content?.querySelectorAll(".notes-field.is-invalid").forEach((field) => {
      field.classList.remove("is-invalid");
      field.querySelector(".notes-field-error")?.remove();
      field.querySelector("[data-field]")?.removeAttribute("aria-invalid");
      field.querySelector("[data-field]")?.removeAttribute("aria-describedby");
    });
  }

  function showNotesCreateFieldErrors() {
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    if (!content || notesState.view !== "list") return;
    clearNotesFieldErrors(content);
    const { title, body } = readNotesCreateFields();
    const missing = [];
    if (!title) missing.push({ field: "title", message: "Title is required" });
    if (!body) missing.push({ field: "body", message: "Notes are required" });
    missing.forEach(({ field, message }, index) => {
      const input = content.querySelector(`[data-field="${field}"]`);
      const wrap = input?.closest(".notes-field");
      if (!wrap || !input) return;
      const errorId = `notes-error-${field}`;
      wrap.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", errorId);
      wrap.insertAdjacentHTML(
        "beforeend",
        `<p class="notes-field-error" id="${errorId}" role="alert">${message}</p>`
      );
      if (index === 0) input.focus();
    });
  }

  function syncNotesCreateFieldErrors() {
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    if (!content || notesState.view !== "list") return;
    if (!content.querySelector(".notes-field.is-invalid")) return;
    const { title, body } = readNotesCreateFields();
    if (title) {
      const titleField = content.querySelector('[data-field="title"]')?.closest(".notes-field");
      titleField?.classList.remove("is-invalid");
      titleField?.querySelector(".notes-field-error")?.remove();
      content.querySelector('[data-field="title"]')?.removeAttribute("aria-invalid");
      content.querySelector('[data-field="title"]')?.removeAttribute("aria-describedby");
    }
    if (body) {
      const bodyField = content.querySelector('[data-field="body"]')?.closest(".notes-field");
      bodyField?.classList.remove("is-invalid");
      bodyField?.querySelector(".notes-field-error")?.remove();
      content.querySelector('[data-field="body"]')?.removeAttribute("aria-invalid");
      content.querySelector('[data-field="body"]')?.removeAttribute("aria-describedby");
    }
  }

  function bindNotesEditBarActions(content) {
    content.querySelector("[data-notes-cancel]")?.addEventListener("click", () => cancelNotesAction());
    content.querySelector("[data-notes-save]")?.addEventListener("click", () => saveNotesAction());
    content.querySelector("[data-notes-save-blocked]")?.addEventListener("click", (event) => {
      event.preventDefault();
      showNotesCreateFieldErrors();
    });
  }

  function syncNotesEditChrome() {
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    if (!content) return;
    if (notesSaving) return;
    const show = shouldShowNotesEditBar();
    const saveDisabled = notesState.view === "list" && !isNotesCreateReady();
    content.classList.toggle("is-section-editing", show || notesState.view === "edit");
    const existing = content.querySelector("[data-edit-bar]");
    const taskList = content.querySelector(".task-list-accordion");

    if (!show) {
      existing?.remove();
      clearNotesFieldErrors(content);
      return;
    }

    /* Same Save enabled state — keep bar mounted (avoids flicker while typing) */
    if (existing && Boolean(existing.querySelector("[data-notes-save]")?.disabled) === saveDisabled) {
      syncNotesCreateFieldErrors();
      return;
    }

    const hadBar = Boolean(existing);
    existing?.remove();
    if (!taskList) return;
    taskList.insertAdjacentHTML("beforebegin", notesEditBarHtml({ saveDisabled }));
    const bar = content.querySelector("[data-edit-bar]");
    if (bar && !hadBar && !reduceMotion()) {
      bar.classList.add("is-edit-bar-enter");
      bar.addEventListener(
        "animationend",
        () => bar.classList.remove("is-edit-bar-enter"),
        { once: true }
      );
    }
    bindNotesEditBarActions(content);
    syncNotesCreateFieldErrors();
  }

  function persistNotesDraftFromDom() {
    if (notesState.view !== "list") return;
    const values = readNotesFormValues();
    notesState.draft = {
      noteType: values.noteType || notesState.draft.noteType || "General note",
      title: values.title || "",
      body: values.body || "",
    };
  }

  function clearNotesDraft() {
    notesState.draft = { noteType: "General note", title: "", body: "" };
  }

  function exitNotesEditView() {
    notesState.view = "list";
    notesState.editingId = null;
    notesEditBaseline = null;
    render("notes");
  }

  function cancelNotesAction() {
    if (notesSaving) return;
    if (notesState.view === "edit") {
      exitNotesEditView();
      return;
    }
    clearNotesFieldErrors();
    clearNotesDraft();
    render("notes");
  }

  async function saveNotesAction() {
    if (notesSaving) return;
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    if (notesState.view === "list" && !isNotesCreateReady()) {
      showNotesCreateFieldErrors();
      return;
    }
    const saveBtn = content?.querySelector("[data-notes-save]");
    const cancelBtn = content?.querySelector("[data-notes-cancel]");
    const values = readNotesFormValues();
    notesSaving = true;
    setPrimaryButtonLoading(saveBtn, true, "Save note");
    if (cancelBtn) cancelBtn.disabled = true;
    content?.querySelectorAll("[data-field], .inline-field-control").forEach((el) => {
      el.disabled = true;
    });
    await new Promise((r) => window.setTimeout(r, MEMBER_SAVE_MS));

    if (notesState.view === "edit" && notesState.editingId) {
      const note = notesState.notes.find((n) => n.id === notesState.editingId);
      if (note) {
        note.noteType = values.noteType || note.noteType;
        note.title = values.title || note.title;
        note.disposition = values.disposition || note.disposition;
        note.resolution = values.resolution || note.resolution;
        note.body = values.body || note.body;
      }
      notesSaving = false;
      notesState.view = "list";
      notesState.editingId = null;
      notesEditBaseline = null;
      render("notes");
      showToast("Note saved");
      return;
    }

    const now = new Date();
    const when = `${now.getMonth() + 1}/${now.getDate()}/${String(now.getFullYear()).slice(-2)}, ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    notesState.notes.unshift({
      id: `note-${Date.now()}`,
      title: values.title,
      noteType: values.noteType || "General note",
      disposition: "",
      resolution: "",
      author: "Solon Gaylord",
      when,
      body: values.body,
    });
    clearNotesDraft();
    notesSaving = false;
    render("notes");
    showToast("Note saved");
  }

  function enterNotesEdit(noteId) {
    const note = notesState.notes.find((n) => n.id === noteId);
    if (!note) return;
    const go = () => {
      notesState.view = "edit";
      notesState.editingId = noteId;
      notesEditBaseline = {
        noteType: String(note.noteType ?? "").trim(),
        title: String(note.title ?? "").trim(),
        disposition: String(note.disposition ?? "").trim(),
        resolution: String(note.resolution ?? "").trim(),
        body: String(note.body ?? "").trim(),
      };
      render("notes");
    };
    if (notesState.view === "list" && isNotesCreateDirty()) {
      requestLeaveNotes(go);
      return;
    }
    go();
  }

  function requestLeaveNotes(next) {
    if (notesSaving) return;
    if (!isNotesDirty()) {
      if (notesState.view === "edit") {
        notesState.view = "list";
        notesState.editingId = null;
        notesEditBaseline = null;
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
      closeModal();
      if (notesState.view === "edit") {
        notesState.view = "list";
        notesState.editingId = null;
        notesEditBaseline = null;
      } else {
        clearNotesDraft();
      }
      resume?.();
    });
    document.querySelector("#unsaved-save")?.addEventListener("click", async () => {
      const resume = pendingLeaveAction;
      const saveBtn = document.querySelector("#unsaved-save");
      const discardBtn = document.querySelector("#unsaved-discard");
      if (notesSaving) return;
      /* Incomplete create — stay on Notes, show required-field errors */
      if (notesState.view === "list" && !isNotesCreateReady()) {
        pendingLeaveAction = null;
        unsavedConfirmOpen = false;
        closeModal();
        showNotesCreateFieldErrors();
        return;
      }
      notesSaving = true;
      setPrimaryButtonLoading(saveBtn, true, "Save note");
      if (discardBtn) discardBtn.disabled = true;
      await new Promise((r) => window.setTimeout(r, MEMBER_SAVE_MS));
      /* Commit without full UI spinner path */
      const values = readNotesFormValues();
      if (notesState.view === "edit" && notesState.editingId) {
        const note = notesState.notes.find((n) => n.id === notesState.editingId);
        if (note) {
          note.noteType = values.noteType || note.noteType;
          note.title = values.title || note.title;
          note.disposition = values.disposition || note.disposition;
          note.resolution = values.resolution || note.resolution;
          note.body = values.body || note.body;
        }
        notesState.view = "list";
        notesState.editingId = null;
        notesEditBaseline = null;
      } else if (values.title && values.body) {
        const now = new Date();
        const when = `${now.getMonth() + 1}/${now.getDate()}/${String(now.getFullYear()).slice(-2)}, ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
        notesState.notes.unshift({
          id: `note-${Date.now()}`,
          title: values.title,
          noteType: values.noteType || "General note",
          disposition: "",
          resolution: "",
          author: "Solon Gaylord",
          when,
          body: values.body,
        });
        clearNotesDraft();
      }
      notesSaving = false;
      pendingLeaveAction = null;
      unsavedConfirmOpen = false;
      closeModal();
      showToast("Note saved");
      resume?.();
    });
  }

  function bindNotesPanelActions() {
    const content = stage.querySelector('.panel-content[data-content="notes"]');
    if (!content) return;

    bindInlineSelects();
    bindInsInfoTips();

    const onDirty = () => {
      persistNotesDraftFromDom();
      syncNotesEditChrome();
    };
    content.querySelectorAll("[data-field], .inline-field-control").forEach((el) => {
      el.addEventListener("input", onDirty);
      el.addEventListener("change", onDirty);
      if (notesState.view === "list" && (el.dataset.field === "title" || el.dataset.field === "body")) {
        el.addEventListener("blur", () => {
          if (!isNotesCreateDirty()) return;
          const key = el.dataset.field;
          const wrap = el.closest(".notes-field");
          if (!wrap) return;
          const empty = !String(el.value || "").trim();
          if (!empty) {
            wrap.classList.remove("is-invalid");
            wrap.querySelector(".notes-field-error")?.remove();
            el.removeAttribute("aria-invalid");
            el.removeAttribute("aria-describedby");
            return;
          }
          if (wrap.classList.contains("is-invalid")) return;
          const message = key === "title" ? "Title is required" : "Notes are required";
          const errorId = `notes-error-${key}`;
          wrap.classList.add("is-invalid");
          el.setAttribute("aria-invalid", "true");
          el.setAttribute("aria-describedby", errorId);
          wrap.insertAdjacentHTML(
            "beforeend",
            `<p class="notes-field-error" id="${errorId}" role="alert">${message}</p>`
          );
        });
      }
    });

    content.querySelectorAll("[data-edit-note]").forEach((btn) => {
      btn.addEventListener("click", () => enterNotesEdit(btn.dataset.editNote));
    });

    content.querySelector("[data-notes-back]")?.addEventListener("click", () => {
      requestLeaveNotes(() => {
        notesState.view = "list";
        notesState.editingId = null;
        notesEditBaseline = null;
        render("notes");
      });
    });

    content.querySelectorAll("[data-notes-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.notesToggle;
        if (!id) return;
        const card = btn.closest(".notes-card");
        const preview = card?.querySelector(".notes-card-preview");
        const label = btn.querySelector(".notes-show-more-label");
        const chevron = btn.querySelector(".notes-show-more-chevron");
        if (!preview || !label || !chevron) return;

        const expanded = !notesExpandedIds.has(id);
        if (expanded) notesExpandedIds.add(id);
        else notesExpandedIds.delete(id);

        /* Toggle in place — full remount reset scroll to top */
        preview.classList.toggle("is-expanded", expanded);
        btn.setAttribute("aria-expanded", String(expanded));
        label.textContent = expanded ? "Show less" : "Show more";
        chevron.innerHTML = expanded ? icon.up : icon.chevron;
      });
    });

    syncNotesEditChrome();
    requestAnimationFrame(() => syncNotesCardClamps());
  }

  function assistSearchPlaceholder() {
    return assistState.tab === "search-documents"
      ? "Search documents..."
      : "Search for answers...";
  }

  function assistTemplate() {
    const askActive = assistState.tab === "ask-answers";
    const docsActive = assistState.tab === "search-documents";
    const glowOnce = shouldPlayAssistGlow() ? " is-glow-once" : "";
    return `
    <article class="panel-content" data-content="assist">
      <header class="panel-header">
        <h2>Conversation context</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Conversation context">${icon.close}</button>
      </header>
      <div class="panel-scroll assist-scroll">
        <div class="assist-meta">
          <div class="assist-id-row">
            <span class="assist-id-line">
              <span class="assist-id-label type-caption">Conversation ID</span>
              <span class="assist-id-wrap">
                <span class="assist-id-text type-h6" tabindex="0" aria-label="Conversation ID ${escapeAttr(ASSIST_CONVERSATION_ID)}">${ASSIST_CONVERSATION_ID_DISPLAY}</span>
                <span class="tooltip tooltip--above" role="tooltip">${escapeAttr(ASSIST_CONVERSATION_ID)}</span>
              </span>
            </span>
            <button class="icon-button assist-copy-id" type="button" data-assist-copy-id aria-label="Copy conversation ID">${icon.copy}</button>
          </div>
          <div class="assist-ai-glow-wrap${glowOnce}">
            <span class="assist-ai-glow" aria-hidden="true"></span>
            <section class="assist-ai-summary" aria-labelledby="assist-ai-title">
              <header class="assist-ai-header">
                <div class="assist-ai-heading">
                  <span class="assist-ai-icon" aria-hidden="true">${icon.sparkles}</span>
                  <h3 class="assist-ai-title" id="assist-ai-title">Member request</h3>
                </div>
                <span class="soft-badge soft-neutral assist-ai-badge" aria-label="Generated by AI">
                  <span class="soft-badge-label">AI</span>
                </span>
              </header>
              <div class="assist-ai-body">
                <p>The member is seeking assistance from the Care Team and has asked to connect with them to discuss their care needs and next steps.</p>
                <p class="assist-ai-next"><strong>Next step:</strong> facilitate that connection.</p>
              </div>
            </section>
          </div>
          <div class="assist-transfer">
            <h3 class="assist-transfer-label">Reason for transfer</h3>
            <p class="assist-transfer-value">Wants to speak to a human.</p>
          </div>
        </div>
        <div class="tabs assist-tabs" role="tablist">
          <span class="tabs-indicator" aria-hidden="true"></span>
          <button class="tab${askActive ? " is-active" : ""}" type="button" role="tab" data-assist-tab="ask-answers" aria-selected="${askActive}">Ask Answers</button>
          <button class="tab${docsActive ? " is-active" : ""}" type="button" role="tab" data-assist-tab="search-documents" aria-selected="${docsActive}">Search Documents</button>
        </div>
        <div class="assist-tab-body">
          <label class="elig-search assist-search">
            <span class="elig-search-icon" aria-hidden="true">${icon.search}</span>
            <input id="assist-search" type="search" placeholder="${escapeAttr(assistSearchPlaceholder())}" value="${escapeAttr(assistState.query)}" autocomplete="off" />
            <button type="button" class="elig-search-kbd" tabindex="-1" aria-label="Focus search">⌘K</button>
          </label>
          <div class="assist-results quiet-state quiet-state--compact" data-assist-results></div>
        </div>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function selectAssistTab(name) {
    if (assistState.tab === name) return;
    assistState.tab = name;
    assistState.query = "";
    const tabs = stage.querySelector('.panel-content[data-content="assist"] .assist-tabs');
    tabs?.querySelectorAll("[data-assist-tab]").forEach((tab) => {
      const selected = tab.dataset.assistTab === name;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    layoutTabsIndicator(tabs, { animate: true });
    const input = stage.querySelector("#assist-search");
    if (input) {
      input.value = "";
      input.placeholder = assistSearchPlaceholder();
    }
  }

  function bindAssistPanelActions() {
    const root = stage.querySelector('.panel-content[data-content="assist"]');
    if (!root) return;

    stage.querySelectorAll("[data-assist-tab]").forEach((tab) => {
      tab.addEventListener("click", () => selectAssistTab(tab.dataset.assistTab));
    });

    stage.querySelector("[data-assist-copy-id]")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard?.writeText(ASSIST_CONVERSATION_ID);
      } catch {
        /* prototype */
      }
      showToast("Copied");
    });

    const search = stage.querySelector("#assist-search");
    const searchKbd = root.querySelector(".elig-search-kbd");
    if (search && searchKbd) {
      const isApple =
        /Mac|iPhone|iPad|iPod/.test(navigator.platform || "") ||
        navigator.userAgentData?.platform === "macOS";
      searchKbd.textContent = isApple ? "⌘K" : "Ctrl+K";
      searchKbd.setAttribute(
        "aria-label",
        isApple ? "Focus search (⌘K or /)" : "Focus search (Ctrl+K or /)"
      );
      searchKbd.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        focusAssistSearch(event);
      });
      search.addEventListener("input", () => {
        assistState.query = search.value;
      });
    }

    requestAnimationFrame(() => {
      const tabs = root.querySelector(".assist-tabs");
      if (tabs) layoutTabsIndicator(tabs, { animate: false });
    });
  }

  /* ——— Communication panel — All conversations ——— */
  const COMM_VISIBLE_INITIAL = 6;
  const communicationState = {
    view: "list",
    activeId: null,
    visibleCount: COMM_VISIBLE_INITIAL,
    conversations: [
      {
        id: "7c3e91a2-4b8f-4d21-9e05-18af4d2f8ad5",
        title: "Specialist referral — Dr. Patel",
        lastMessage: "10/21/2026",
        month: "Oct 2026",
      },
      {
        id: "a1b2c3d4-5e6f-7890-abcd-ef1234567890",
        title: "In-network cardiologist options",
        lastMessage: "10/18/2026",
        month: "Oct 2026",
      },
      {
        id: "f0e1d2c3-b4a5-9687-0fed-cba987654321",
        title: "Pharmacy refill follow-up",
        lastMessage: "10/12/2026",
        month: "Oct 2026",
      },
      {
        id: "11223344-5566-7788-99aa-bbccddeeff00",
        title: "Benefits inquiry — CalPERS PPO",
        lastMessage: "10/03/2026",
        month: "Oct 2026",
      },
      {
        id: "99887766-5544-3322-1100-ffeeddccbbaa",
        title: "Open enrollment plan comparison",
        lastMessage: "09/24/2026",
        month: "Sep 2026",
      },
      {
        id: "deadbeef-cafe-babe-0000-111122223333",
        title: "Prior authorization question",
        lastMessage: "09/16/2026",
        month: "Sep 2026",
      },
      {
        id: "c0ffee00-1234-5678-9abc-def012345678",
        title: "Claims status check",
        lastMessage: "09/08/2026",
        month: "Sep 2026",
      },
      {
        id: "abcdef01-2345-6789-abcd-ef0123456789",
        title: "Care Team handoff",
        lastMessage: "08/27/2026",
        month: "Aug 2026",
      },
      {
        id: "01234567-89ab-cdef-0123-456789abcdef",
        title: "Telehealth visit scheduling",
        lastMessage: "08/14/2026",
        month: "Aug 2026",
      },
    ],
  };

  /** @type {Record<string, { dateLabel: string, turns: Array<{ role: "member" | "agent", time: string, lines: string[], readStatus?: string }> }>} */
  const COMM_THREAD_MOCKS = {
    "7c3e91a2-4b8f-4d21-9e05-18af4d2f8ad5": {
      dateLabel: "Oct 21, 2026",
      turns: [
        {
          role: "member",
          time: "2:14 PM",
          lines: [
            "My PCP referred me to Dr. Patel for cardiology — can you confirm the referral is on file?",
            "Member ID ending in 4821 if that helps.",
          ],
        },
        {
          role: "agent",
          time: "2:16 PM",
          lines: [
            "I see an in-network referral to Dr. Anika Patel (cardiology) effective through Jan 2027. You're good to schedule — want help finding open appointment times?",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "a1b2c3d4-5e6f-7890-abcd-ef1234567890": {
      dateLabel: "Oct 18, 2026",
      turns: [
        {
          role: "member",
          time: "10:02 AM",
          lines: ["I'm looking for in-network cardiologists near Sacramento — preferably someone who takes CalPERS PPO."],
        },
        {
          role: "agent",
          time: "10:05 AM",
          lines: [
            "I pulled three in-network cardiologists within 15 miles. Dr. Patel and Dr. Nguyen both have availability this month. I can share phone numbers and whether they require a referral.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "f0e1d2c3-b4a5-9687-0fed-cba987654321": {
      dateLabel: "Oct 12, 2026",
      turns: [
        {
          role: "member",
          time: "4:48 PM",
          lines: ["My pharmacy said my lisinopril refill was denied — can you check what's blocking it?"],
        },
        {
          role: "agent",
          time: "4:51 PM",
          lines: [
            "The claim shows a prior authorization is required for the 90-day supply. I can start a PA request with your pharmacy details, or you can switch to a 30-day fill today.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "11223344-5566-7788-99aa-bbccddeeff00": {
      dateLabel: "Oct 3, 2026",
      turns: [
        {
          role: "member",
          time: "11:20 AM",
          lines: [
            "I have a question about my CalPERS PPO benefits — do specialist visits need a referral?",
            "I'm trying to book dermatology and don't want a surprise bill.",
          ],
        },
        {
          role: "agent",
          time: "11:23 AM",
          lines: [
            "For your CalPERS PPO plan, most specialists require a PCP referral unless it's urgent care or preventive screening. Dermatology for a new concern typically needs one — I can confirm against your benefit year if you'd like.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "99887766-5544-3322-1100-ffeeddccbbaa": {
      dateLabel: "Sep 24, 2026",
      turns: [
        {
          role: "member",
          time: "9:05 AM",
          lines: ["Open enrollment starts soon — can you compare the PPO vs HMO options for my family?"],
        },
        {
          role: "agent",
          time: "9:08 AM",
          lines: [
            "Happy to help. Your current PPO has broader out-of-network coverage; the HMO lowers premiums but requires PCP gatekeeping. I can send a side-by-side of deductibles and Rx tiers for both.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "deadbeef-cafe-babe-0000-111122223333": {
      dateLabel: "Sep 16, 2026",
      turns: [
        {
          role: "member",
          time: "3:30 PM",
          lines: ["My MRI was scheduled but imaging called saying they need prior auth — where does that stand?"],
        },
        {
          role: "agent",
          time: "3:34 PM",
          lines: [
            "Prior auth PA-88421 is in review; clinical notes were received today. Typical turnaround is 2 business days — I'll notify you as soon as it's approved or if anything else is needed.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "c0ffee00-1234-5678-9abc-def012345678": {
      dateLabel: "Sep 8, 2026",
      turns: [
        {
          role: "member",
          time: "1:12 PM",
          lines: ["Checking on claim #CLM-902184 — it still shows processing on the portal."],
        },
        {
          role: "agent",
          time: "1:15 PM",
          lines: [
            "That claim finished adjudication yesterday: plan paid $842, member responsibility $65. An EOB was mailed — I can resend a digital copy to your email on file.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "abcdef01-2345-6789-abcd-ef0123456789": {
      dateLabel: "Aug 27, 2026",
      turns: [
        {
          role: "member",
          time: "8:44 AM",
          lines: ["Dot connected me earlier — I'd like to continue with the Care Team about my care plan."],
        },
        {
          role: "agent",
          time: "8:46 AM",
          lines: [
            "I've handed this thread to Lila on the Care Team. She'll pick up here with your care plan notes — you should see her reply shortly.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
    "01234567-89ab-cdef-0123-456789abcdef": {
      dateLabel: "Aug 14, 2026",
      turns: [
        {
          role: "member",
          time: "5:02 PM",
          lines: ["Can I schedule a telehealth visit for next week? Prefer morning slots."],
        },
        {
          role: "agent",
          time: "5:05 PM",
          lines: [
            "Yes — telehealth with your PCP is covered the same as in-person. I found Tue and Thu openings at 9:30 AM; say which you prefer and I'll hold the slot.",
          ],
          readStatus: "Read by Member",
        },
      ],
    },
  };

  function commThreadMockFor(conversation) {
    const keyed = COMM_THREAD_MOCKS[conversation.id];
    if (keyed) return keyed;
    return {
      dateLabel: conversation.lastMessage,
      turns: [
        {
          role: "member",
          time: "9:00 AM",
          lines: [`Following up on: ${conversation.title}`],
        },
        {
          role: "agent",
          time: "9:02 AM",
          lines: ["Thanks for reaching out — I'm reviewing your plan details and will follow up with next steps here."],
          readStatus: "Read by Member",
        },
      ],
    };
  }

  function commThreadTurnHtml(turn) {
    if (turn.role === "member") {
      const bubbles = turn.lines.map((line) => `<p class="msg-bubble msg-bubble--member">${escapeAttr(line)}</p>`).join("");
      return `
      <article class="msg-group msg-group--member">
        <header class="msg-sender-head">
          <img class="avatar-img avatar-img--msg" src="assets/riley-smith.jpg" width="20" height="20" alt="" />
          <strong class="msg-sender-name">Riley Smith</strong>
        </header>
        <div class="msg-content">
          <div class="msg-stack">${bubbles}</div>
          <footer class="msg-meta"><time>${escapeAttr(turn.time)}</time></footer>
        </div>
      </article>`;
    }
    const status = turn.readStatus
      ? `<span class="msg-meta-status">${escapeAttr(turn.readStatus)}</span>`
      : "";
    const body = turn.lines.map((line) => `<p class="msg-plain">${escapeAttr(line)}</p>`).join("");
    return `
      <article class="msg-group msg-group--agent">
        <header class="msg-sender-head">
          <img class="logo-dot" src="assets/logo-dot.svg?v=cluster" width="20" height="20" alt="" />
          <span class="msg-sender-name">Dot</span>
        </header>
        <div class="msg-content">
          ${body}
          <footer class="msg-meta">
            <time>${escapeAttr(turn.time)}</time>
            ${status}
          </footer>
        </div>
      </article>`;
  }

  function commThreadBodyHtml(conversation) {
    const mock = commThreadMockFor(conversation);
    const turns = mock.turns.map(commThreadTurnHtml).join("");
    return `
      <p class="msg-date">${escapeAttr(mock.dateLabel)}</p>
      ${turns}`;
  }

  function commThreadComposerHtml() {
    return `
      <footer class="composer comm-thread-composer">
        <div class="composer-field" data-comm-composer-field>
          <label class="composer-input-wrap">
            <span class="visually-hidden">Message</span>
            <textarea class="composer-input" data-comm-composer-input rows="1" placeholder="Describe your issue..."></textarea>
          </label>
          <div class="composer-toolbar">
            <button class="composer-icon-btn composer-icon-btn--attach" type="button" aria-label="Attach an image" tabindex="-1">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                <path d="M1 12h22M12 1v22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25"/>
              </svg>
            </button>
            <div class="composer-toolbar-end">
              <button class="composer-icon-btn composer-icon-btn--rewrite" type="button" aria-label="Clean up" tabindex="-1" disabled>
                ${icon.sparkles}
              </button>
              <button class="composer-send" data-comm-composer-send type="button" disabled aria-label="Send message">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M1.4 3.743a1.5 1.5 0 0 1 1.973-2.077l19.014 9.659a.75.75 0 0 1 0 1.337L3.373 22.334A1.5 1.5 0 0 1 1.4 20.257l5.058-8.264Z" fill="currentColor"/>
                  <path d="M6.453 11.993h16.344" class="composer-send-seam" stroke-linecap="round" stroke-width="1.75"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>`;
  }

  function commIdDisplay(id) {
    const compact = String(id).replace(/-/g, "");
    return `…${compact.slice(-6)}`;
  }

  function commRowHtml(item) {
    const displayId = commIdDisplay(item.id);
    return `
      <article class="comm-row" data-comm-id="${escapeAttr(item.id)}">
        <span class="comm-row-icon" aria-hidden="true">${icon.mail}</span>
        <div class="comm-row-body">
          <h3 class="comm-row-title">${escapeAttr(item.title)}</h3>
          <div class="comm-row-meta">
            <div class="comm-row-id-line">
              <span class="comm-row-id-label type-caption">Conversation ID</span>
              <span class="comm-row-id-wrap">
                <span class="comm-row-id-text type-h6" tabindex="0" aria-label="Conversation ID ${escapeAttr(item.id)}">${escapeAttr(displayId)}</span>
                <span class="tooltip tooltip--above" role="tooltip">${escapeAttr(item.id)}</span>
              </span>
              <button class="icon-button assist-copy-id" type="button" data-comm-copy-id="${escapeAttr(item.id)}" aria-label="Copy conversation ID">${icon.copy}</button>
            </div>
            <p class="comm-row-last">Last message ${escapeAttr(item.lastMessage)}</p>
          </div>
        </div>
      </article>`;
  }

  function communicationListHtml() {
    const visible = communicationState.conversations.slice(0, communicationState.visibleCount);
    const groups = [];
    let currentMonth = null;
    let bucket = [];
    visible.forEach((item) => {
      if (item.month !== currentMonth) {
        if (currentMonth && bucket.length) {
          groups.push({ month: currentMonth, items: bucket });
        }
        currentMonth = item.month;
        bucket = [item];
      } else {
        bucket.push(item);
      }
    });
    if (currentMonth && bucket.length) {
      groups.push({ month: currentMonth, items: bucket });
    }

    const sections = groups
      .map(
        (group) => `
      <section class="comm-month" aria-label="${escapeAttr(group.month)}">
        <h3 class="comm-month-label">${escapeAttr(group.month)}</h3>
        <div class="comm-month-list">${group.items.map(commRowHtml).join("")}</div>
      </section>`
      )
      .join("");

    const hasMore = communicationState.visibleCount < communicationState.conversations.length;
    const loadMore = hasMore
      ? `<button class="button button-secondary comm-load-more" type="button" data-comm-load-more>Load more</button>`
      : "";

    return `${sections}${loadMore}`;
  }

  function communicationListTemplate() {
    return `
    <article class="panel-content" data-content="communication">
      <header class="panel-header">
        <h2>All conversations</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Communication">${icon.close}</button>
      </header>
      <div class="panel-scroll comm-scroll">
        ${communicationListHtml()}
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function communicationThreadTemplate() {
    const conversation = communicationState.conversations.find((c) => c.id === communicationState.activeId);
    if (!conversation) {
      communicationState.view = "list";
      communicationState.activeId = null;
      return communicationListTemplate();
    }
    return `
    <article class="panel-content" data-content="communication">
      <header class="panel-header panel-header--detail">
        <div class="panel-title-stack with-back">
          <button class="icon-button panel-back" type="button" data-comm-back aria-label="Back">${icon.chevronLeft}</button>
          <h2>${escapeAttr(conversation.title)}</h2>
        </div>
        <button class="icon-button panel-close" type="button" aria-label="Close Communication">${icon.close}</button>
      </header>
      <div class="panel-scroll comm-scroll comm-scroll--thread">
        <div class="comm-thread">${commThreadBodyHtml(conversation)}</div>
        ${commThreadComposerHtml()}
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function communicationTemplate() {
    return communicationState.view === "thread" ? communicationThreadTemplate() : communicationListTemplate();
  }

  /** List ↔ thread without remounting .panel-content (avoids full panel-in). */
  function syncCommunicationView({ direction = "forward" } = {}) {
    const root = stage.querySelector('.panel-content[data-content="communication"]');
    if (!root) {
      render("communication", { skipEnter: true });
      return;
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = communicationTemplate();
    const next = tmp.querySelector(".panel-content");
    const nextHeader = next?.querySelector(".panel-header");
    const nextScroll = next?.querySelector(".comm-scroll");
    const curHeader = root.querySelector(".panel-header");
    const curScroll = root.querySelector(".comm-scroll");
    if (!nextHeader || !nextScroll || !curHeader || !curScroll) {
      render("communication", { skipEnter: true });
      return;
    }
    curHeader.replaceWith(nextHeader);
    curScroll.replaceWith(nextScroll);
    if (!reduceMotion()) {
      const animClass = direction === "back" ? "is-comm-drill-back" : "is-comm-drill-forward";
      [nextHeader, nextScroll].forEach((el) => {
        el.classList.add(animClass);
        el.addEventListener(
          "animationend",
          () => el.classList.remove(animClass),
          { once: true }
        );
      });
    }
    root.querySelector(".panel-close")?.addEventListener("click", collapsePanel);
    bindCommunicationPanelActions();
  }

  function syncCommThreadComposer(root) {
    const input = root.querySelector("[data-comm-composer-input]");
    const send = root.querySelector("[data-comm-composer-send]");
    const field = root.querySelector("[data-comm-composer-field]");
    if (!input || !send) return;
    const hasText = input.value.trim().length > 0;
    send.disabled = !hasText;
    send.classList.toggle("is-active", hasText);
    send.setAttribute("aria-disabled", hasText ? "false" : "true");
    field?.classList.toggle("is-filled", hasText);
  }

  function bindCommunicationListActions(root) {
    root.querySelectorAll(".comm-row").forEach((row) => {
      row.addEventListener("click", (event) => {
        if (event.target.closest("[data-comm-copy-id]")) return;
        const id = row.dataset.commId;
        if (!id) return;
        communicationState.view = "thread";
        communicationState.activeId = id;
        syncCommunicationView({ direction: "forward" });
      });
    });

    root.querySelectorAll("[data-comm-copy-id]").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        event.stopPropagation();
        const id = btn.dataset.commCopyId;
        if (!id) return;
        try {
          await navigator.clipboard?.writeText(id);
        } catch {
          /* prototype */
        }
        showToast("Copied");
      });
    });

    root.querySelector("[data-comm-load-more]")?.addEventListener("click", () => {
      communicationState.visibleCount = Math.min(
        communicationState.visibleCount + 3,
        communicationState.conversations.length
      );
      /* Swap list only — full render() re-triggers panel-in from the right */
      const scroll = root.querySelector(".comm-scroll");
      if (!scroll) return;
      scroll.innerHTML = communicationListHtml();
      bindCommunicationListActions(root);
    });
  }

  function bindCommunicationPanelActions() {
    const root = stage.querySelector('.panel-content[data-content="communication"]');
    if (!root) return;
    bindCommunicationListActions(root);

    root.querySelector("[data-comm-back]")?.addEventListener("click", () => {
      communicationState.view = "list";
      communicationState.activeId = null;
      syncCommunicationView({ direction: "back" });
    });

    const composerInput = root.querySelector("[data-comm-composer-input]");
    if (composerInput) {
      composerInput.addEventListener("input", () => syncCommThreadComposer(root));
      syncCommThreadComposer(root);
    }
  }

  /* ——— Activity panel — member timeline ——— */
  const activityState = {
    status: "all",
    type: "all",
    alertDismissed: false,
    openFilter: null,
    events: [
      {
        id: "act-chat-support-sep",
        month: "Sep 2026",
        title: "Chat Support",
        meta: "Last updated: 9/22/26, 2:48 PM",
        status: "in-progress",
        type: "chat",
        linked: true,
        expanded: false,
        detail: "Care Team is actively assisting Riley with billing questions on this chat thread.",
      },
      {
        id: "act-therapy-root-sep",
        month: "Sep 2026",
        title: "Therapy visit with Dr. Robert Root, MD",
        meta: "Appointment: 9/22/26, 1:00 PM - 2:00 PM Pacific",
        status: "in-progress",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Virtual therapy session scheduled with Dr. Robert Root. Member confirmed attendance.",
        length: "60 mins",
        timezone: "Pacific",
        reason: "Therapy",
        created: "9/20/26 9:00 AM",
        apptId: "APT-ROOT-922",
        serviceId: "SD-88214",
      },
      {
        id: "act-ccm-enrollment-sep",
        month: "Sep 2026",
        title: "CCM enrollment status change",
        meta: "Last updated: 9/22/26, 11:07 AM",
        status: "in-progress",
        type: "enrollment",
        linked: false,
        expanded: false,
        detail: "Chronic Care Management enrollment moved to in review pending PCP attestation.",
        prevStatus: "Enrolled: Other",
        newStatus: "Enrolled: Care Manager",
        changedAt: "9/22/26, 11:07 AM",
      },
      {
        id: "act-vpc-quinn-sep",
        month: "Sep 2026",
        title: "Virtual Primary Care visit with Dr. Jose Quinn, MD",
        meta: "Appointment: 9/22/26, 10:00 AM - 10:30 AM Pacific",
        status: "in-progress",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Primary care video visit with Dr. Jose Quinn for medication follow-up.",
        length: "30 mins",
        timezone: "Pacific",
        reason: "Medication follow-up",
        created: "9/15/26 2:10 PM",
        apptId: "APT-QUINN-917",
        serviceId: "SD-77102",
      },
      {
        id: "act-support-issue-sep",
        month: "Sep 2026",
        title: "Support issue submitted",
        meta: "Last updated: 9/22/26, 10:58 AM",
        status: "in-progress",
        type: "support",
        linked: true,
        expanded: false,
        detail: "Member submitted a support ticket regarding portal access; Care Team is investigating.",
        subject: "Portal access issue",
        recipient: "Member",
        caseId: "16037",
      },
      {
        id: "act-referral-pc-sep",
        month: "Sep 2026",
        title: "Concierge Referral for Primary Care",
        meta: "Last updated: 9/22/26, 10:56 AM",
        status: "in-progress",
        type: "referral",
        linked: true,
        expanded: false,
        detail: "Concierge referral opened to match Riley with an in-network primary care provider.",
        specialty: "Primary Care",
        provider: "Pending match",
        referralId: "REF-PC-915",
        created: "9/22/26, 10:56 AM",
      },
      {
        id: "act-pharmacy-refill-aug",
        month: "Aug 2026",
        title: "Pharmacy refill request",
        meta: "Last updated: 8/28/26, 4:12 PM",
        status: "completed",
        type: "support",
        linked: true,
        expanded: false,
        detail: "90-day refill for atorvastatin approved and routed to member’s preferred pharmacy.",
      },
      {
        id: "act-bh-visit-aug",
        month: "Aug 2026",
        title: "Behavioral health visit with Dr. Amira Shah, PhD",
        meta: "Appointment: 8/19/26, 3:00 PM - 3:50 PM Pacific",
        status: "completed",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Completed telehealth session; follow-up scheduled for September.",
      },
      {
        id: "act-chat-benefits-aug",
        month: "Aug 2026",
        title: "Chat Support",
        meta: "Last updated: 8/14/26, 11:33 AM",
        status: "completed",
        type: "chat",
        linked: true,
        expanded: false,
        detail: "Resolved questions about specialist copay and referral requirements.",
      },
      {
        id: "act-ccm-checkin-aug",
        month: "Aug 2026",
        title: "CCM care plan check-in",
        meta: "Last updated: 8/7/26, 9:05 AM",
        status: "completed",
        type: "enrollment",
        linked: false,
        expanded: false,
        detail: "Care manager documented monthly goals and medication adherence notes.",
      },
      {
        id: "act-lab-referral-jul",
        month: "Jul 2026",
        title: "Concierge Referral for Lab Services",
        meta: "Last updated: 7/30/26, 2:18 PM",
        status: "completed",
        type: "referral",
        linked: true,
        expanded: false,
        detail: "Member matched to in-network lab; fasting instructions sent via message.",
      },
      {
        id: "act-vpc-jul",
        month: "Jul 2026",
        title: "Virtual Primary Care visit with Dr. Jose Quinn, MD",
        meta: "Appointment: 7/22/26, 9:30 AM - 10:00 AM Pacific",
        status: "completed",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Annual wellness review; labs ordered and preventive care checklist updated.",
      },
      {
        id: "act-support-id-card-jul",
        month: "Jul 2026",
        title: "Support issue submitted",
        meta: "Last updated: 7/15/26, 1:44 PM",
        status: "completed",
        type: "support",
        linked: true,
        expanded: false,
        detail: "Digital ID card not loading in the app; issue resolved after cache reset.",
      },
      {
        id: "act-therapy-jul",
        month: "Jul 2026",
        title: "Therapy visit with Dr. Robert Root, MD",
        meta: "Appointment: 7/8/26, 1:00 PM - 2:00 PM Pacific",
        status: "completed",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Session completed; member reported improved sleep and stress management.",
      },
      {
        id: "act-chat-jun",
        month: "Jun 2026",
        title: "Chat Support",
        meta: "Last updated: 6/25/26, 5:02 PM",
        status: "completed",
        type: "chat",
        linked: true,
        expanded: false,
        detail: "Helped member locate in-network dermatology options near home.",
      },
      {
        id: "act-derm-referral-jun",
        month: "Jun 2026",
        title: "Concierge Referral for Dermatology",
        meta: "Last updated: 6/18/26, 10:21 AM",
        status: "completed",
        type: "referral",
        linked: true,
        expanded: false,
        detail: "Referral booked with Dr. Lena Ortiz; appointment confirmation emailed.",
      },
      {
        id: "act-enrollment-jun",
        month: "Jun 2026",
        title: "CCM enrollment status change",
        meta: "Last updated: 6/10/26, 8:40 AM",
        status: "completed",
        type: "enrollment",
        linked: false,
        expanded: false,
        detail: "Member enrolled in Chronic Care Management with assigned care manager.",
      },
      {
        id: "act-nutrition-jun",
        month: "Jun 2026",
        title: "Nutrition consult with Priya Nair, RD",
        meta: "Appointment: 6/3/26, 11:00 AM - 11:45 AM Pacific",
        status: "completed",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Nutrition plan shared; grocery list and follow-up goals documented.",
      },
      {
        id: "act-pt-may",
        month: "May 2026",
        title: "Physical therapy visit with Sam Ortiz, DPT",
        meta: "Appointment: 5/20/26, 4:00 PM - 4:45 PM Pacific",
        status: "completed",
        type: "visit",
        linked: true,
        expanded: false,
        detail: "Home exercise program provided for lower back mobility.",
      },
      {
        id: "act-support-claims-may",
        month: "May 2026",
        title: "Support issue submitted",
        meta: "Last updated: 5/12/26, 3:27 PM",
        status: "completed",
        type: "support",
        linked: true,
        expanded: false,
        detail: "Claim status clarified; EOB explanation shared with the member.",
      },
      {
        id: "act-visit-cancelled-may",
        month: "May 2026",
        title: "Therapy visit with Dr. Robert Root, MD",
        meta: "Appointment: 5/8/26, 2:00 PM - 3:00 PM Pacific",
        status: "cancelled",
        type: "visit",
        linked: false,
        expanded: false,
        detail: "Visit was cancelled by the member before the scheduled start time.",
      },
      {
        id: "act-chat-cancelled-may",
        month: "May 2026",
        title: "Chat Support",
        meta: "Last updated: 5/3/26, 10:15 AM",
        status: "cancelled",
        type: "chat",
        linked: false,
        expanded: false,
        detail: "Support chat was closed without resolution at the member's request.",
      },
    ],
  };

  const ACTIVITY_STATUS_OPTIONS = [
    ["all", "All"],
    ["in-progress", "In progress"],
    ["cancelled", "Cancelled"],
    ["completed", "Completed"],
  ];

  const ACTIVITY_TYPE_OPTIONS = [
    ["all", "All"],
    ["chat", "Chat"],
    ["visit", "Visit"],
    ["enrollment", "Enrollment"],
    ["support", "Support"],
    ["referral", "Referral"],
  ];

  function activityStatusLabel(status) {
    if (status === "in-progress") return "In progress";
    if (status === "cancelled") return "Cancelled";
    if (status === "completed") return "Completed";
    return "All";
  }

  function activityTypeLabel(type) {
    const found = ACTIVITY_TYPE_OPTIONS.find(([value]) => value === type);
    return found ? found[1] : "All";
  }

  function activityBadgeHtml(status) {
    const label = activityStatusLabel(status);
    if (status === "cancelled") {
      return `<span class="soft-badge soft-danger"><span class="soft-badge-label">${escapeAttr(label)}</span></span>`;
    }
    if (status === "completed") {
      return `<span class="soft-badge soft-success"><span class="soft-badge-label">${escapeAttr(label)}</span></span>`;
    }
    return `<span class="soft-badge soft-neutral"><span class="soft-badge-label">${escapeAttr(label)}</span></span>`;
  }

  function activityMetaValue(meta, prefix) {
    if (!meta) return "—";
    const re = new RegExp(`^${prefix}\\s*`, "i");
    return meta.replace(re, "") || meta;
  }

  function activityDetailFieldHtml(field) {
    const full = field.span === 2 ? " activity-detail-field--full" : "";
    const raw = field.value == null || field.value === "" ? "—" : String(field.value);
    const copyVal = field.copy ? String(field.copy) : "";
    const copy = copyVal
      ? `<button class="icon-button activity-detail-copy" type="button" data-activity-copy="${escapeAttr(copyVal)}" aria-label="Copy ${escapeAttr(field.label)}">${icon.copy}</button>`
      : "";
    return `<div class="activity-detail-field${full}">
      <div class="activity-detail-label-row">
        <span class="activity-detail-label">${escapeAttr(field.label)}</span>
        ${copy}
      </div>
      <p class="activity-detail-value">${escapeAttr(raw)}</p>
    </div>`;
  }

  function activityFieldsFor(item) {
    if (Array.isArray(item.fields) && item.fields.length) return item.fields;
    const idTail = item.id.replace(/^act-/, "").slice(-6).toUpperCase();
    if (item.type === "visit") {
      return [
        { label: "Description", value: item.detail || "", span: 2 },
        { label: "Appointment Length", value: item.length || "30 mins" },
        { label: "Member's timezone", value: item.timezone || "Pacific" },
        { label: "Reason for visit", value: item.reason || "Follow-up" },
        { label: "Appointment Dates", value: item.apptDates || activityMetaValue(item.meta, "Appointment:"), span: 2 },
        { label: "Date created", value: item.created || "—" },
        { label: "Appt ID", value: item.apptId || `APT-${idTail}`, copy: item.apptId || `APT-${idTail}` },
        {
          label: "Service Delivery ID",
          value: item.serviceId || `SD-${idTail}`,
          copy: item.serviceId || `SD-${idTail}`,
        },
      ];
    }
    if (item.type === "enrollment") {
      return [
        { label: "Previous status", value: item.prevStatus || "Not enrolled" },
        { label: "New status", value: item.newStatus || "In review" },
        { label: "Status changed", value: item.changedAt || activityMetaValue(item.meta, "Last updated:"), span: 2 },
        { label: "Description", value: item.detail || "", span: 2 },
      ];
    }
    if (item.type === "support") {
      return [
        { label: "Subject", value: item.subject || item.title, span: 2 },
        { label: "Description", value: item.detail || "", span: 2 },
        { label: "Recipient", value: item.recipient || "Care Team" },
        { label: "Member Patient Case ID", value: item.caseId || "16037", copy: item.caseId || "16037" },
      ];
    }
    if (item.type === "referral") {
      return [
        { label: "Description", value: item.detail || "", span: 2 },
        { label: "Specialty", value: item.specialty || "Primary Care" },
        { label: "Provider", value: item.provider || "—" },
        { label: "Referral ID", value: item.referralId || `REF-${idTail}`, copy: item.referralId || `REF-${idTail}` },
        { label: "Date created", value: item.created || activityMetaValue(item.meta, "Last updated:") },
      ];
    }
    if (item.type === "chat") {
      return [
        { label: "Summary", value: item.detail || "", span: 2 },
        {
          label: "Conversation ID",
          value: item.conversationId || `CONV-${idTail}`,
          copy: item.conversationId || `CONV-${idTail}`,
        },
        { label: "Last updated", value: activityMetaValue(item.meta, "Last updated:") },
      ];
    }
    return null;
  }

  function activityDetailHtml(item) {
    const fields = activityFieldsFor(item);
    if (fields?.length) {
      return `<div class="activity-detail-grid" id="activity-detail-${escapeAttr(item.id)}">${fields
        .map(activityDetailFieldHtml)
        .join("")}</div>`;
    }
    return `<div class="activity-row-detail" id="activity-detail-${escapeAttr(item.id)}">${escapeAttr(
      item.detail || ""
    )}</div>`;
  }

  function filteredActivityEvents() {
    return activityState.events.filter((item) => {
      if (activityState.status !== "all" && item.status !== activityState.status) return false;
      if (activityState.type !== "all" && item.type !== activityState.type) return false;
      return true;
    });
  }

  function activityTitleHtml(item) {
    if (item.linked) {
      return `<a
        class="activity-row-title activity-row-title--link"
        href="#"
        data-activity-title-link="${escapeAttr(item.id)}"
      >${escapeAttr(item.title)}</a>`;
    }
    return `<h3 class="activity-row-title">${escapeAttr(item.title)}</h3>`;
  }

  function activityRowHtml(item) {
    const expanded = item.expanded;
    const cancelled = item.status === "cancelled";
    return `
      <article
        class="activity-row${expanded ? " is-expanded" : ""}${cancelled ? " is-cancelled" : ""}"
        data-activity-id="${escapeAttr(item.id)}"
      >
        <div class="activity-row-header">
          <button
            class="activity-row-toggle"
            type="button"
            aria-expanded="${expanded}"
            aria-controls="activity-detail-${escapeAttr(item.id)}"
            aria-label="${expanded ? "Collapse" : "Expand"} ${escapeAttr(item.title)}"
          >
            <span class="accordion-chevron activity-row-chevron" aria-hidden="true">${icon.chevron}</span>
          </button>
          <div class="activity-row-text">
            ${activityTitleHtml(item)}
            <p class="activity-row-meta">${escapeAttr(item.meta)}</p>
          </div>
          ${activityBadgeHtml(item.status)}
        </div>
        <div class="activity-row-body">
          <div class="activity-row-body-inner">
            ${activityDetailHtml(item)}
          </div>
        </div>
      </article>`;
  }

  function syncActivityRowDuration(row) {
    const body = row?.querySelector(".activity-row-body");
    const measure =
      row?.querySelector(".activity-detail-grid") ||
      row?.querySelector(".activity-row-detail") ||
      row?.querySelector(".activity-row-body-inner");
    if (!body || !measure) return;
    if (reduceMotion()) {
      body.style.setProperty("--motion-duration-accordion-open", "0ms");
      body.style.setProperty("--motion-duration-accordion-close", "0ms");
      return;
    }
    const height = Math.max(measure.scrollHeight, 1);
    const openMs = Math.round(Math.min(560, Math.max(280, height * 1)));
    const closeMs = Math.round(Math.min(450, Math.max(230, height * 0.8)));
    body.style.setProperty("--motion-duration-accordion-open", `${openMs}ms`);
    body.style.setProperty("--motion-duration-accordion-close", `${closeMs}ms`);
  }

  function activityListHtml() {
    const visible = filteredActivityEvents();
    const groups = [];
    let currentMonth = null;
    let bucket = [];
    visible.forEach((item) => {
      if (item.month !== currentMonth) {
        if (currentMonth && bucket.length) {
          groups.push({ month: currentMonth, items: bucket });
        }
        currentMonth = item.month;
        bucket = [item];
      } else {
        bucket.push(item);
      }
    });
    if (currentMonth && bucket.length) {
      groups.push({ month: currentMonth, items: bucket });
    }

    if (!groups.length) {
      return `<div class="quiet-state quiet-state--compact">No activity matches these filters.</div>`;
    }

    return groups
      .map(
        (group) => `
      <section class="activity-month" aria-label="${escapeAttr(group.month)}">
        <h3 class="activity-month-label">${escapeAttr(group.month)}</h3>
        <div class="activity-month-list">${group.items.map(activityRowHtml).join("")}</div>
      </section>`
      )
      .join("");
  }

  function activityFilterMenuHtml(kind, options, selected, menuId, groupLabel) {
    const open = activityState.openFilter === kind;
    const triggerId = kind === "status" ? "activity-status-filter" : "activity-type-filter";
    const active = selected !== "all";
    return `
      <div class="elig-filter-wrap activity-filter-wrap${open ? " is-open" : ""}">
        <button
          class="inline-field-control select-trigger activity-filter-trigger${active ? " is-active" : ""}"
          type="button"
          id="${triggerId}"
          data-activity-filter="${kind}"
          aria-label="${kind === "status" ? "Filter by status" : "Filter by type"}"
          aria-expanded="${open}"
          aria-haspopup="menu"
        >
          <span class="select-trigger-label">${kind === "status" ? "Status" : "Type"}</span>${icon.down}
        </button>
        <div class="elig-filter-menu activity-filter-menu" role="menu" id="${menuId}" ${open ? "" : "hidden"}>
          <div class="elig-filter-group-label" id="${menuId}-label">${escapeAttr(groupLabel)}</div>
          <div class="elig-filter-radio-group" role="group" aria-labelledby="${menuId}-label">
            ${options
              .map(
                ([value, label]) => `
            <button
              type="button"
              role="menuitemradio"
              data-activity-${kind}="${value}"
              aria-checked="${selected === value}"
              class="${selected === value ? "is-selected" : ""}"
            >
              <span class="menu-radio" aria-hidden="true"></span>
              <span class="elig-filter-item-label">${escapeAttr(label)}</span>
            </button>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
  }

  function activityToolbarHtml() {
    return `
      <div class="activity-toolbar">
        <div class="activity-toolbar-filters">
          ${activityFilterMenuHtml("status", ACTIVITY_STATUS_OPTIONS, activityState.status, "activity-status-menu", "Status")}
          ${activityFilterMenuHtml("type", ACTIVITY_TYPE_OPTIONS, activityState.type, "activity-type-menu", "Type")}
        </div>
        <button class="button button-ghost button-small activity-clear" type="button" data-activity-clear>Clear</button>
      </div>`;
  }

  function activityAlertHtml() {
    if (activityState.alertDismissed) return "";
    return `
      <div class="activity-alert" role="status">
        <span class="activity-alert-icon" aria-hidden="true">${icon.infoFilled}</span>
        <div class="activity-alert-copy">
          <p class="activity-alert-title">More member events coming soon.</p>
          <p class="activity-alert-body">Use Type filter to view what's included today.</p>
        </div>
        <button class="icon-button activity-alert-dismiss" type="button" data-activity-alert-dismiss aria-label="Dismiss activity info">${icon.close}</button>
      </div>`;
  }

  function activityTemplate() {
    return `
    <article class="panel-content" data-content="activity">
      <header class="panel-header">
        <h2>Activity</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Activity">${icon.close}</button>
      </header>
      <div class="panel-scroll activity-scroll">
        <div class="activity-alert-slot" data-activity-alert>${activityAlertHtml()}</div>
        <div class="activity-toolbar-sticky" data-activity-toolbar>${activityToolbarHtml()}</div>
        <div class="activity-list-region" data-activity-list>
          ${activityListHtml()}
        </div>
      </div>
      ${taskListHtml()}
    </article>`;
  }

  function syncActivityFilterMenuDom(kind) {
    const root = stage.querySelector('.panel-content[data-content="activity"]');
    if (!root) return;
    const selected = kind === "status" ? activityState.status : activityState.type;
    root.querySelectorAll(`[data-activity-${kind}]`).forEach((option) => {
      const value = option.getAttribute(`data-activity-${kind}`) || "all";
      const on = value === selected;
      option.setAttribute("aria-checked", String(on));
      option.classList.toggle("is-selected", on);
    });
    const trigger = root.querySelector(`#activity-${kind}-filter`);
    const active = selected !== "all";
    trigger?.classList.toggle("is-active", active);
  }

  function closeActivityFilterMenus() {
    activityState.openFilter = null;
    const root = stage.querySelector('.panel-content[data-content="activity"]');
    if (!root) return;
    root.querySelectorAll(".activity-filter-wrap").forEach((wrap) => wrap.classList.remove("is-open"));
    root.querySelectorAll(".activity-filter-trigger").forEach((btn) => btn.setAttribute("aria-expanded", "false"));
    root.querySelectorAll(".activity-filter-menu").forEach((menu) => {
      hideMenuPopover(menu);
      menu.hidden = true;
    });
  }

  function openActivityFilterMenu(kind) {
    const root = stage.querySelector('.panel-content[data-content="activity"]');
    if (!root) return;
    const menuId = kind === "status" ? "activity-status-menu" : "activity-type-menu";
    const menu = root.querySelector(`#${menuId}`);
    const trigger = root.querySelector(`#activity-${kind}-filter`);
    const wrap = trigger?.closest(".activity-filter-wrap");
    if (!menu || !trigger) return;
    activityState.openFilter = kind;
    wrap?.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    menu.hidden = false;
    showMenuPopover(menu);
  }

  function syncActivityList(options = {}) {
    const root = stage.querySelector('.panel-content[data-content="activity"]');
    if (!root) return;
    if (options.chrome) {
      const alertSlot = root.querySelector("[data-activity-alert]");
      const toolbar = root.querySelector("[data-activity-toolbar]");
      if (alertSlot) alertSlot.innerHTML = activityAlertHtml();
      if (toolbar) toolbar.innerHTML = activityToolbarHtml();
      bindActivityToolbarActions(root);
    }
    const list = root.querySelector("[data-activity-list]");
    if (list) list.innerHTML = activityListHtml();
    bindActivityListActions(root);
  }

  function toggleActivityRowExpand(row) {
    const id = row?.dataset.activityId;
    if (!id || !row) return;
    const item = activityState.events.find((e) => e.id === id);
    if (!item) return;
    const toggle = row.querySelector(".activity-row-toggle");
    syncActivityRowDuration(row);
    item.expanded = !item.expanded;
    row.classList.toggle("is-expanded", item.expanded);
    toggle?.setAttribute("aria-expanded", String(item.expanded));
    toggle?.setAttribute(
      "aria-label",
      `${item.expanded ? "Collapse" : "Expand"} ${item.title}`
    );
  }

  function bindActivityListActions(root = stage) {
    /* Whole header expands (chevron, meta, badge). Title links navigate only. */
    root.querySelectorAll(".activity-row-header").forEach((header) => {
      header.addEventListener("click", (event) => {
        if (event.target.closest("[data-activity-title-link]")) return;
        toggleActivityRowExpand(header.closest(".activity-row"));
      });
    });

    root.querySelectorAll(".activity-row-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleActivityRowExpand(toggle.closest(".activity-row"));
      });
    });

    root.querySelectorAll("[data-activity-title-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const id = link.getAttribute("data-activity-title-link");
        const item = activityState.events.find((e) => e.id === id);
        showToast(item ? `Open ${item.title}` : "Opening activity");
      });
    });

    root.querySelectorAll("[data-activity-copy]").forEach((btn) => {
      btn.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const text = btn.getAttribute("data-activity-copy");
        if (!text) return;
        try {
          await navigator.clipboard?.writeText(text);
        } catch {
          /* prototype */
        }
        showToast("Copied");
      });
    });
  }

  function bindActivityToolbarActions(root = stage) {
    root.querySelector("[data-activity-clear]")?.addEventListener("click", () => {
      activityState.status = "all";
      activityState.type = "all";
      closeActivityFilterMenus();
      syncActivityList({ chrome: true });
    });

    root.querySelector("[data-activity-alert-dismiss]")?.addEventListener("click", () => {
      activityState.alertDismissed = true;
      syncActivityList({ chrome: true });
    });

    ["status", "type"].forEach((kind) => {
      const trigger = root.querySelector(`#activity-${kind}-filter`);
      const menuId = kind === "status" ? "activity-status-menu" : "activity-type-menu";
      const menu = root.querySelector(`#${menuId}`);
      trigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        const opening = activityState.openFilter !== kind;
        closeOverlayMenus("activity-filter");
        closeActivityFilterMenus();
        if (opening) openActivityFilterMenu(kind);
      });
      menu?.querySelectorAll(`[data-activity-${kind}]`).forEach((option) => {
        option.addEventListener("click", () => {
          const next = option.getAttribute(`data-activity-${kind}`) || "all";
          if (kind === "status") activityState.status = next;
          else activityState.type = next;
          syncActivityFilterMenuDom(kind);
          closeActivityFilterMenus();
          syncActivityList({ chrome: true });
        });
      });
    });

    if (activityState.openFilter) {
      const menu = root.querySelector(
        `#activity-${activityState.openFilter === "status" ? "status" : "type"}-menu`
      );
      if (menu) {
        menu.hidden = false;
        requestAnimationFrame(() => showMenuPopover(menu));
      }
    }
  }

  function bindActivityPanelActions() {
    const root = stage.querySelector('.panel-content[data-content="activity"]');
    if (!root) return;
    bindActivityToolbarActions(root);
    bindActivityListActions(root);
  }

  function providerSearchPlaceholder() {
    if (providerSearchState.searchBy === "Specialty") return "Search by specialty";
    if (providerSearchState.searchBy === "NPI") return "Search by NPI";
    return "Search by name";
  }

  function providerSearchEmptyIllustration() {
    return `<img class="provider-lookup-empty-art" src="assets/provider-lookup-empty.png" width="88" height="73" alt="" draggable="false" />`;
  }

  function providerSortLabel() {
    return PROVIDER_SORT_OPTIONS.find(([value]) => value === providerSearchState.sortBy)?.[1] || "Best Match";
  }

  function filterProviderResults() {
    const q = String(providerSearchState.query || "")
      .trim()
      .toLowerCase();
    if (!q) return [...MOCK_PROVIDERS];
    const by = providerSearchState.searchBy;
    return MOCK_PROVIDERS.filter((p) => {
      if (by === "Specialty") return p.specialty.toLowerCase().includes(q);
      if (by === "NPI") return p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
      return p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q);
    });
  }

  function sortProviderResults(list) {
    const sorted = [...list];
    if (providerSearchState.sortBy === "distance") {
      sorted.sort((a, b) => a.distanceMiles - b.distanceMiles);
    } else if (providerSearchState.sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }

  function providerBadgesHtml(provider) {
    const badges = [];
    if (provider.acceptingNewPatients) {
      badges.push(
        `<span class="soft-badge soft-success"><span class="provider-badge-check" aria-hidden="true">${icon.checkCircle}</span><span class="soft-badge-label">Accepting new patients</span></span>`
      );
    }
    if (provider.inNetwork) {
      badges.push(
        `<span class="soft-badge soft-neutral"><span class="soft-badge-label">In network</span></span>`
      );
    }
    if (!badges.length) return "";
    return `<div class="provider-card-badges">${badges.join("")}</div>`;
  }

  function providerCopyText(provider) {
    const dist =
      provider.distanceMiles % 1 === 0
        ? `${provider.distanceMiles} mi`
        : `${provider.distanceMiles.toFixed(1)} mi`;
    return [
      provider.name,
      provider.specialty,
      provider.group,
      `${provider.address} · ${dist}`,
      provider.phone,
    ].join("\n");
  }

  function providerCardHtml(provider) {
    const checked = providerSearchState.selectedIds.has(provider.id);
    const dist =
      provider.distanceMiles % 1 === 0
        ? `${provider.distanceMiles} mi`
        : `${provider.distanceMiles.toFixed(1)} mi`;
    return `
      <article class="provider-card${checked ? " is-selected" : ""}" data-provider-id="${escapeAttr(provider.id)}">
        <div class="provider-card-lead">
          <label class="provider-card-check">
            <input type="checkbox" data-provider-select="${escapeAttr(provider.id)}" ${checked ? "checked" : ""} aria-label="Select ${escapeAttr(provider.name)}" />
          </label>
          <img class="provider-card-avatar" src="${escapeAttr(provider.photoUrl)}" width="40" height="40" alt="" draggable="false" />
        </div>
        <div class="provider-card-body">
          <div class="provider-card-identity">
            <div class="provider-card-name-row">
              <button type="button" class="provider-card-name">${escapeAttr(provider.name)}</button>
              <button type="button" class="provider-card-copy" data-provider-copy="${escapeAttr(provider.id)}" aria-label="Copy ${escapeAttr(provider.name)}">
                ${icon.copy}
              </button>
            </div>
            <p class="provider-card-specialty">${escapeAttr(provider.specialty)}</p>
          </div>
          ${providerBadgesHtml(provider)}
          <p class="provider-card-meta">
            <span class="provider-card-group">${escapeAttr(provider.group)}</span>
            <span class="provider-card-dot" aria-hidden="true">·</span>
            <span>${escapeAttr(provider.address)}</span>
            <span class="provider-card-dot" aria-hidden="true">·</span>
            <span>${escapeAttr(dist)}</span>
          </p>
          <a class="provider-card-phone" href="tel:${escapeAttr(provider.phone.replace(/[^\d+]/g, ""))}">${escapeAttr(provider.phone)}</a>
        </div>
      </article>`;
  }

  function providerSortControlHtml() {
    const open = providerSearchState.sortMenuOpen;
    return `
      <div class="select-wrap inline-select provider-sort-wrap${open ? " is-open" : ""}">
        <button
          class="inline-field-control select-trigger provider-sort-trigger"
          type="button"
          id="provider-sort-trigger"
          aria-label="Sort by"
          aria-expanded="${open}"
          aria-haspopup="menu"
        >
          <span class="select-trigger-label">${escapeAttr(providerSortLabel())}</span>${icon.down}
        </button>
        <div class="elig-filter-menu provider-sort-menu" role="menu" ${open ? "" : "hidden"}>
          <div class="elig-filter-group-label" id="provider-sort-group-label">Sort by</div>
          <div class="elig-filter-radio-group" role="group" aria-labelledby="provider-sort-group-label">
            ${PROVIDER_SORT_OPTIONS.map(
              ([value, label]) => `
            <button
              type="button"
              role="menuitemradio"
              data-provider-sort="${value}"
              aria-checked="${providerSearchState.sortBy === value}"
              class="${providerSearchState.sortBy === value ? "is-selected" : ""}"
            >
              <span class="menu-radio" aria-hidden="true"></span>
              <span class="elig-filter-item-label">${escapeAttr(label)}</span>
            </button>`
            ).join("")}
          </div>
        </div>
      </div>`;
  }

  function providerResultsSkeletonHtml() {
    return `
      <div class="provider-results-toolbar">
        <div class="provider-results-copy">
          <h4 class="provider-results-title">Results</h4>
          <span class="skeleton skeleton-line provider-results-count-skel" aria-hidden="true"></span>
        </div>
        <div class="skeleton skeleton-line provider-sort-skel" aria-hidden="true"></div>
      </div>
      <div class="provider-results-list" aria-busy="true" aria-label="Loading providers">
        ${[0, 1, 2, 3]
          .map(
            () => `
        <div class="provider-card provider-card--skeleton">
          <div class="provider-card-lead">
            <span class="skeleton provider-skel-check"></span>
            <span class="skeleton provider-skel-avatar"></span>
          </div>
          <div class="provider-card-body">
            <span class="skeleton skeleton-line provider-skel-name"></span>
            <span class="skeleton skeleton-line provider-skel-specialty"></span>
            <span class="skeleton skeleton-line provider-skel-meta"></span>
            <span class="skeleton skeleton-line provider-skel-phone"></span>
          </div>
        </div>`
          )
          .join("")}
      </div>`;
  }

  function providerResultsBodyHtml() {
    if (!providerSearchState.hasSearched) {
      return `
        <div class="quiet-state provider-lookup-empty">
          ${providerSearchEmptyIllustration()}
          <p>Provider results will show here</p>
        </div>`;
    }
    if (providerSearchState.resultsLoading) {
      return providerResultsSkeletonHtml();
    }
    const results = sortProviderResults(filterProviderResults());
    const count = results.length;
    const cards = results.map(providerCardHtml).join("");
    return `
      <div class="provider-results-toolbar">
        <div class="provider-results-copy">
          <h4 class="provider-results-title">Results</h4>
          <span class="provider-results-found">${count} provider${count === 1 ? "" : "s"} found</span>
        </div>
        ${providerSortControlHtml()}
      </div>
      <div class="provider-results-list">
        ${
          cards ||
          `<div class="quiet-state quiet-state--compact">No providers match your search.</div>`
        }
      </div>`;
  }

  function runProviderSearch() {
    syncProviderSearchFromDom();
    clearTimeout(providerResultsLoaderTimer);
    providerSearchState.hasSearched = true;
    providerSearchState.resultsLoading = true;
    providerSearchState.sortMenuOpen = false;
    render("provider-search", { skipEnter: true });
    providerResultsLoaderTimer = window.setTimeout(() => {
      providerSearchState.resultsLoading = false;
      render("provider-search", { skipEnter: true });
    }, 620);
  }

  function syncProviderSortMenuDom() {
    const content = stage.querySelector('.panel-content[data-content="provider-search"]');
    if (!content) return;
    const label = content.querySelector("#provider-sort-trigger .select-trigger-label");
    if (label) label.textContent = providerSortLabel();
    content.querySelectorAll("[data-provider-sort]").forEach((option) => {
      const on = option.dataset.providerSort === providerSearchState.sortBy;
      option.setAttribute("aria-checked", String(on));
      option.classList.toggle("is-selected", on);
    });
  }

  function selectedProviderCount() {
    return providerSearchState.selectedIds.size;
  }

  function providerSelectedBarHtml() {
    const count = selectedProviderCount();
    if (!count) return "";
    const label = `${count} provider${count === 1 ? "" : "s"} selected`;
    return `
      <div class="panel-edit-bar provider-selected-bar" data-provider-selection-bar>
        <span class="provider-selected-count">${label}</span>
        <div class="provider-selected-actions">
          <button class="button button-ghost" type="button" data-provider-selection-clear>Clear</button>
          <button class="button button-primary" type="button" data-provider-send>Send to member</button>
        </div>
      </div>`;
  }

  function clearProviderSelection() {
    providerSearchState.selectedIds.clear();
    stage.querySelectorAll("[data-provider-select]").forEach((input) => {
      input.checked = false;
      input.closest(".provider-card")?.classList.remove("is-selected");
    });
  }

  function refreshProviderSelectionBar() {
    const panel = stage.querySelector('.panel-content[data-content="provider-search"]');
    if (!panel) return;
    const existing = panel.querySelector("[data-provider-selection-bar]");
    const html = providerSelectedBarHtml();
    if (!html) {
      existing?.remove();
      return;
    }
    if (existing) {
      existing.outerHTML = html;
    } else {
      const taskList = panel.querySelector(".task-list-accordion");
      if (taskList) taskList.insertAdjacentHTML("beforebegin", html);
      else panel.insertAdjacentHTML("beforeend", html);
      panel
        .querySelector("[data-provider-selection-bar]")
        ?.classList.add("is-edit-bar-enter");
    }
    bindProviderSelectionBar();
  }

  function bindProviderSelectionBar() {
    stage.querySelector("[data-provider-selection-clear]")?.addEventListener("click", () => {
      clearProviderSelection();
      refreshProviderSelectionBar();
    });
    stage.querySelector("[data-provider-send]")?.addEventListener("click", () => {
      const n = selectedProviderCount();
      if (!n) return;
      showToast(
        n === 1 ? "Sent 1 provider to member" : `Sent ${n} providers to member`
      );
      clearProviderSelection();
      refreshProviderSelectionBar();
    });
  }

  function bindProviderResultCardActions(root = stage) {
    const syncCardSelection = (checkbox) => {
      const id = checkbox.dataset.providerSelect;
      if (!id) return;
      if (checkbox.checked) providerSearchState.selectedIds.add(id);
      else providerSearchState.selectedIds.delete(id);
      checkbox.closest(".provider-card")?.classList.toggle("is-selected", checkbox.checked);
      refreshProviderSelectionBar();
    };

    root.querySelectorAll("[data-provider-select]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => syncCardSelection(checkbox));
    });

    root.querySelectorAll(".provider-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        const t = event.target;
        if (
          t.closest("a, button, input, label.provider-card-check") ||
          t.closest("[data-provider-copy]")
        ) {
          return;
        }
        const checkbox = card.querySelector("[data-provider-select]");
        if (!checkbox) return;
        checkbox.checked = !checkbox.checked;
        syncCardSelection(checkbox);
      });
    });

    root.querySelectorAll("[data-provider-copy]").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.stopPropagation();
        const id = button.dataset.providerCopy;
        const provider = MOCK_PROVIDERS.find((item) => item.id === id);
        if (!provider) return;
        const text = providerCopyText(provider);
        try {
          await navigator.clipboard.writeText(text);
          showToast("Provider copied");
        } catch {
          showToast("Couldn’t copy provider");
        }
      });
    });
  }

  function refreshProviderResultsList({ ease = true } = {}) {
    const content = stage.querySelector('.panel-content[data-content="provider-search"]');
    const list = content?.querySelector(".provider-results-list");
    if (!content || !list || providerSearchState.resultsLoading) return;

    const results = sortProviderResults(filterProviderResults());
    const countEl = content.querySelector(".provider-results-found");
    if (countEl) {
      countEl.textContent = `${results.length} provider${results.length === 1 ? "" : "s"} found`;
    }

    const cards = results.map(providerCardHtml).join("");
    list.innerHTML =
      cards ||
      `<div class="quiet-state quiet-state--compact">No providers match your search.</div>`;
    bindProviderResultCardActions(list);

    if (ease) {
      list.querySelectorAll(".provider-card").forEach((card, index) => {
        card.classList.add("is-sort-enter");
        card.style.setProperty("--provider-sort-delay", `${Math.min(index, 8) * 28}ms`);
      });
    }
  }

  function providerSearchTemplate() {
    const s = providerSearchState;
    return `
    <article class="panel-content" data-content="provider-search">
      <header class="panel-header">
        <h2>Provider Lookup</h2>
        <button class="icon-button panel-close" type="button" aria-label="Close Provider Lookup">${icon.close}</button>
      </header>
      <div class="panel-scroll provider-lookup">
        <div class="provider-lookup-filters">
          <div class="provider-lookup-form">
            <div class="notes-field">
              ${notesFieldLabel("Search by")}
              ${notesSelectHtml("provider-search-by", "searchBy", s.searchBy, PROVIDER_SEARCH_BY_OPTIONS)}
            </div>
            <div class="notes-field">
              ${notesFieldLabel("Search for")}
              <label class="provider-lookup-query">
                <span class="provider-lookup-query-icon" aria-hidden="true">${icon.search}</span>
                <input id="provider-search-query" type="search" data-field="query" placeholder="${escapeAttr(providerSearchPlaceholder())}" value="${escapeAttr(s.query)}" autocomplete="off" />
              </label>
            </div>
            <div class="notes-field">
              ${notesFieldLabel("Address")}
              ${notesSelectHtml("provider-search-address", "address", s.address, PROVIDER_ADDRESS_OPTIONS)}
            </div>
            <div class="notes-field">
              ${notesFieldLabel("Insurance plan")}
              ${notesSelectHtml("provider-search-plan", "plan", s.plan, PROVIDER_PLAN_OPTIONS)}
            </div>
          </div>
          <div class="provider-lookup-actions">
            <button class="button button-secondary button-small" type="button" data-provider-clear>Clear</button>
            <button class="button button-primary button-small" type="button" data-provider-search>Search</button>
          </div>
        </div>
        <section class="provider-lookup-results">
          ${providerResultsBodyHtml()}
        </section>
      </div>
      ${providerSelectedBarHtml()}
      ${taskListHtml()}
    </article>`;
  }

  function syncProviderSearchFromDom() {
    const content = stage.querySelector('.panel-content[data-content="provider-search"]');
    if (!content) return;
    providerSearchState.searchBy =
      content.querySelector('[data-field="searchBy"]')?.value || providerSearchState.searchBy;
    providerSearchState.query = content.querySelector('[data-field="query"]')?.value ?? "";
    providerSearchState.address = content.querySelector('[data-field="address"]')?.value ?? "";
    providerSearchState.plan =
      content.querySelector('[data-field="plan"]')?.value || providerSearchState.plan;
  }

  function closeProviderSortMenu() {
    providerSearchState.sortMenuOpen = false;
    const wrap = stage.querySelector(".provider-sort-wrap");
    const btn = stage.querySelector("#provider-sort-trigger");
    const menu = stage.querySelector(".provider-sort-menu");
    if (wrap) wrap.classList.remove("is-open");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (menu) {
      hideMenuPopover(menu);
      menu.hidden = true;
    }
  }

  function bindProviderSearchPanelActions() {
    const content = stage.querySelector('.panel-content[data-content="provider-search"]');
    if (!content) return;

    bindInlineSelects();

    content.querySelectorAll(".inline-select").forEach((wrap) => {
      const hidden = wrap.querySelector("input[data-field]");
      if (!hidden) return;
      wrap.querySelectorAll("[data-value]").forEach((option) => {
        option.addEventListener("click", () => {
          const key = hidden.dataset.field;
          const value = option.dataset.value ?? "";
          if (key === "searchBy") {
            providerSearchState.searchBy = value;
            render("provider-search", { skipEnter: true });
          } else if (key === "address") {
            providerSearchState.address = value;
          } else if (key === "plan") {
            providerSearchState.plan = value;
          }
        });
      });
    });

    content.querySelectorAll('[data-field="query"]').forEach((el) => {
      el.addEventListener("input", () => {
        syncProviderSearchFromDom();
      });
      el.addEventListener("change", () => {
        syncProviderSearchFromDom();
      });
      el.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        runProviderSearch();
      });
    });

    content.querySelector("[data-provider-clear]")?.addEventListener("click", () => {
      clearTimeout(providerResultsLoaderTimer);
      providerSearchState = providerSearchDefaults();
      render("provider-search", { skipEnter: true });
    });

    content.querySelector("[data-provider-search]")?.addEventListener("click", () => {
      runProviderSearch();
    });

    bindProviderResultCardActions(content);
    bindProviderSelectionBar();

    const sortBtn = content.querySelector("#provider-sort-trigger");
    const sortMenu = content.querySelector(".provider-sort-menu");
    sortBtn?.addEventListener("click", (event) => {
      event.stopPropagation();
      const opening = !providerSearchState.sortMenuOpen;
      closeOverlayMenus("provider-sort");
      providerSearchState.sortMenuOpen = opening;
      sortBtn.setAttribute("aria-expanded", String(opening));
      content.querySelector(".provider-sort-wrap")?.classList.toggle("is-open", opening);
      if (opening && sortMenu) {
        sortMenu.hidden = false;
        showMenuPopover(sortMenu);
      } else if (sortMenu) {
        hideMenuPopover(sortMenu);
        sortMenu.hidden = true;
      }
    });

    content.querySelectorAll("[data-provider-sort]").forEach((option) => {
      option.addEventListener("click", () => {
        const next = option.dataset.providerSort || "best";
        if (next === providerSearchState.sortBy) {
          closeProviderSortMenu();
          return;
        }
        providerSearchState.sortBy = next;
        providerSearchState.sortMenuOpen = false;
        closeProviderSortMenu();
        syncProviderSortMenuDom();
        refreshProviderResultsList({ ease: true });
      });
    });

    if (providerSearchState.sortMenuOpen && sortMenu) {
      sortMenu.hidden = false;
      requestAnimationFrame(() => showMenuPopover(sortMenu));
    }
  }


  const templates = {
    assist: assistTemplate,
    member: memberTemplate,
    insurance: insuranceTemplate,
    eligibility: eligibilityTemplate,
    notes: notesTemplate,
    communication: communicationTemplate,
    activity: activityTemplate,
    "provider-search": providerSearchTemplate,
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
    if (name === "assist") return "Conversation context";
    if (name === "member") return "Member Information";
    if (name === "notes") return "Notes";
    if (name === "communication") return "All conversations";
    if (name === "activity") return "Activity";
    if (name === "provider-search") return "Provider Lookup";
    return name[0].toUpperCase() + name.slice(1);
  }

  function updateRail(name, expanded) {
    railButtons.forEach((button) => {
      const selected = expanded && button.dataset.panel === name;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    syncRailIndicator({ animate: expanded });
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
    requestLeaveMemberEdit(() => requestLeaveNotes(doCollapse));
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
    if (options.skipEnter) {
      stage.querySelector(".panel-content")?.classList.add("is-content-reveal");
    } else if (!isPageEntranceActive()) {
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
        additionalPlansOpen: true,
      });
    }
    activePanel = name;
    panelOpen = true;
    panel.classList.remove("is-collapsed");
    panel.removeAttribute("inert");
    panel.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-label", `${titleFor(name)} panel`);
    /* Keep user resize across tabs — only grow for panels that need a wider floor */
    setPanelWidth(Math.max(currentPanelWidth(), preferredPanelWidth(name)));
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
        <p class="modal-subtitle">${ELIG_EMPLOYER_COMPANY}</p>
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
      eligibilityState.company = ELIG_EMPLOYER_COMPANY;
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
      eligibilityState.company = ELIG_IHP_COMPANY;
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
    if (except !== "elig-filter") closeBenefitFilterMenu();
    if (except !== "provider-sort") closeProviderSortMenu();
    if (except !== "activity-filter") closeActivityFilterMenus();
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
    /* Benefit filter + provider sort both use .elig-filter-wrap — close each by id/class */
    if (!t.closest("#elig-benefit-filter") && !t.closest(".elig-filter-menu:not(.provider-sort-menu)")) {
      closeBenefitFilterMenu();
    }
    if (!t.closest(".provider-sort-wrap") && !t.closest(".provider-sort-menu")) {
      closeProviderSortMenu();
    }
    if (!t.closest(".activity-filter-wrap")) {
      closeActivityFilterMenus();
    }
    if (
      !t.closest(".ins-dropdown-wrap") &&
      !t.closest(".ins-dropdown-menu") &&
      insuranceState.openDropdown
    ) {
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
    if (!t.closest(".inline-select") && !t.closest(".select-menu")) closeInlineSelects();
    if (!t.closest(".inline-dob-wrap")) closeInlineDobCalendars();
    if (!t.closest(".mode-switcher-wrap")) closeModeSwitcherMenu();
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
        const action = button.dataset.moreAction;
        if (action === "Search Provider") {
          openPanel("provider-search");
          return;
        }
        showToast(action);
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
    bindNotesPanelActions();
    bindAssistPanelActions();
    bindCommunicationPanelActions();
    bindActivityPanelActions();
    bindProviderSearchPanelActions();

    requestAnimationFrame(() => {
      stage.querySelectorAll(".tabs").forEach((tabs) => {
        layoutTabsIndicator(tabs, { animate: false });
      });
    });
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

  function syncEligBenefitsListMinHeight() {
    const scroller = stage.querySelector(".panel-scroll.elig-overview");
    const sticky = stage.querySelector(".elig-benefits-sticky");
    const list = stage.querySelector(".elig-benefits-list");
    if (!scroller || !sticky || !list) return;
    const min = Math.max(120, scroller.clientHeight - sticky.offsetHeight - 8);
    list.style.minHeight = `${min}px`;
  }

  function refreshBenefitListDom() {
    const scroller = stage.querySelector(".panel-scroll.elig-overview");
    const sticky = stage.querySelector(".elig-benefits-sticky");
    const scrollerTop = scroller?.getBoundingClientRect().top ?? 0;
    const yBefore = sticky?.getBoundingClientRect().top;
    const wasStuck = sticky && yBefore != null && yBefore <= scrollerTop + 8;
    const list = stage.querySelector(".elig-benefits-list");
    if (list) {
      list.innerHTML = eligibilityBenefitsHtml();
      bindBenefitRowActions();
    }
    const heading = stage.querySelector("#elig-benefits-filter-label");
    if (heading) heading.textContent = benefitFilterHeading();
    const filterBtn = stage.querySelector("#elig-benefit-filter");
    filterBtn?.classList.toggle("is-active", eligibilityState.benefitFilter !== "all");
    refreshBenefitsSelectionBar();
    syncEligBenefitsListMinHeight();
    // Keep Member benefits chrome glued when the list shortens (scroll clamping).
    if (scroller && sticky && yBefore != null) {
      if (wasStuck) {
        const topInScroller =
          sticky.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
        scroller.scrollTop = Math.max(0, topInScroller);
      } else {
        const yAfter = sticky.getBoundingClientRect().top;
        if (yAfter !== yBefore) scroller.scrollTop += yAfter - yBefore;
      }
    }
  }

  function syncBenefitFilterMenu() {
    const btn = stage.querySelector("#elig-benefit-filter");
    const menu = btn?.closest(".elig-filter-wrap")?.querySelector(".elig-filter-menu");
    if (!menu) return;
    menu.querySelectorAll("[data-benefit-filter]").forEach((option) => {
      const on = option.dataset.benefitFilter === eligibilityState.benefitFilter;
      option.setAttribute("aria-checked", String(on));
      option.classList.toggle("is-selected", on);
    });
  }

  function closeBenefitFilterMenu() {
    const btn = stage.querySelector("#elig-benefit-filter");
    const menu = btn?.closest(".elig-filter-wrap")?.querySelector(".elig-filter-menu");
    if (menu && !menu.hidden) hideMenuPopover(menu);
    btn?.setAttribute("aria-expanded", "false");
  }

  function bindBenefitListActions() {
    const benefitSearch = stage.querySelector("#elig-benefit-search");
    benefitSearch?.addEventListener("input", () => {
      eligibilityState.benefitQuery = benefitSearch.value;
      refreshBenefitListDom();
    });

    const searchKbd = stage.querySelector(".elig-search-kbd");
    if (searchKbd) {
      const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || "");
      searchKbd.textContent = isApple ? "⌘K" : "Ctrl+K";
      searchKbd.title = isApple
        ? "Focus search (⌘K or /)"
        : "Focus search (Ctrl+K or /)";
      searchKbd.setAttribute(
        "aria-label",
        isApple ? "Focus benefit search, shortcut Command K or slash" : "Focus benefit search, shortcut Control K or slash"
      );
      searchKbd.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        focusBenefitSearch(event);
      });
    }

    const filterBtn = stage.querySelector("#elig-benefit-filter");
    const filterMenu = filterBtn?.closest(".elig-filter-wrap")?.querySelector(".elig-filter-menu");
    filterBtn?.addEventListener("click", () => {
      if (!filterMenu) return;
      const opening = filterMenu.hidden || filterMenu.classList.contains("is-leaving");
      closeOverlayMenus("elig-filter");
      if (opening) {
        syncBenefitFilterMenu();
        showMenuPopover(filterMenu);
        filterBtn.setAttribute("aria-expanded", "true");
      } else {
        hideMenuPopover(filterMenu);
        filterBtn.setAttribute("aria-expanded", "false");
      }
    });
    filterMenu?.querySelectorAll("[data-benefit-filter]").forEach((option) => {
      option.addEventListener("click", () => {
        eligibilityState.benefitFilter = option.dataset.benefitFilter || "all";
        syncBenefitFilterMenu();
        refreshBenefitListDom();
        closeBenefitFilterMenu();
      });
    });

    bindBenefitRowActions();
    bindEligSelectionBar();
    syncEligBenefitsListMinHeight();
  }

  window.addEventListener("resize", () => {
    if (stage.querySelector(".elig-benefits-list")) syncEligBenefitsListMinHeight();
  });

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
    /* Keep copy during leave so the box doesn’t collapse mid-fade */
    float.classList.remove("is-visible");
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
      let left = rect.left - tipRect.width - 4;
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

  /**
   * Scale accordion open/close duration with content height so tall sections
   * (e.g. Personal Information) don’t rush. Clamped so short ones stay snappy.
   * Close stays a bit faster than open.
   */
  function syncAccordionBodyDuration(section) {
    const body = section?.querySelector(".accordion-body");
    const measure =
      section?.querySelector(".accordion-body-pad") ||
      section?.querySelector(".accordion-body-inner");
    if (!body || !measure) return;
    if (reduceMotion()) {
      body.style.setProperty("--motion-duration-accordion-open", "0ms");
      body.style.setProperty("--motion-duration-accordion-close", "0ms");
      return;
    }
    const height = Math.max(measure.scrollHeight, 1);
    const openMs = Math.round(Math.min(560, Math.max(280, height * 1)));
    const closeMs = Math.round(Math.min(450, Math.max(230, height * 0.8)));
    body.style.setProperty("--motion-duration-accordion-open", `${openMs}ms`);
    body.style.setProperty("--motion-duration-accordion-close", `${closeMs}ms`);
  }

  function bindAccordionActions() {
    stage.querySelectorAll(".accordion-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        if (toggle.dataset.editing === "true") return;
        const section = toggle.closest(".accordion");
        const sectionId = section?.dataset.section;
        syncAccordionBodyDuration(section);
        const open = section.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
        if (sectionId && memberAccordionOpen[sectionId] !== undefined) {
          memberAccordionOpen[sectionId] = open;
        }
        if (sectionId === "elig-info") {
          eligibilityState.infoOpen = open;
        }
        if (sectionId === "additional-plans") {
          insuranceState.additionalPlansOpen = open;
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

  function syncCareTeamCount() {
    const badge = stage.querySelector(".ct-count");
    if (!badge) return;
    const count = careTeamMembers.length;
    badge.textContent = String(count);
    badge.setAttribute("aria-label", `${count} care team members`);
  }

  function careTeamPanelHtml() {
    const count = careTeamMembers.length;
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
        <div class="ct-section-head">
          <div class="ct-section-title">
            <strong>Current Care Team</strong>
            <span class="soft-badge soft-neutral ct-count" aria-label="${count} care team members">${count}</span>
          </div>
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

    const count = draft.length;

    return `
      <div class="ct-manage">
        <div class="ct-search-wrap">
          ${notesFieldLabel("Add someone")}
          <label class="elig-search">
            <span class="elig-search-icon" aria-hidden="true">${icon.search}</span>
            <input id="ct-add-search" type="search" placeholder="Search by name or role" value="${escapeAttr(careTeamSearchQuery)}" autocomplete="off" aria-label="Search to add someone" />
          </label>
          ${dropdown}
        </div>
        <div class="ct-manage-heading-row">
          <h5>Current Care Team</h5>
          <span class="soft-badge soft-neutral ct-count" aria-label="${count} care team members">${count}</span>
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
      syncCareTeamCount();
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
      const tabs = stage.querySelector('.panel-content[data-content="member"] > .tabs');
      tabs?.querySelectorAll(".tab[data-tab]").forEach((tab) => {
        const selected = tab.dataset.tab === name;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });
      layoutTabsIndicator(tabs, { animate: true });
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

  function dismissToast(toast) {
    if (!toast || toast.classList.contains("is-leaving")) return;
    toast.classList.add("is-leaving");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");

    const label = document.createElement("span");
    label.className = "toast-message";
    label.textContent = message;

    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "toast-dismiss";
    dismiss.setAttribute("aria-label", "Dismiss");
    dismiss.innerHTML = `
      <svg viewBox="0 0 14 14" aria-hidden="true" focusable="false">
        <path d="M3 3l8 8M11 3L3 11" fill="none" stroke-linecap="round"/>
      </svg>
    `;
    dismiss.addEventListener("click", () => dismissToast(toast));

    toast.append(label, dismiss);
    toasts.append(toast);

    const dwellMs = 5000;
    window.setTimeout(() => dismissToast(toast), dwellMs);
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
        requestLeaveMemberEdit(() => requestLeaveNotes(go));
        return;
      }
      if (activePanel === "notes" && isNotesDirty() && !(panelOpen && activePanel === name && !isNotesDirty())) {
        requestLeaveNotes(go);
        return;
      }
      if (activePanel === "notes" && notesState.view === "edit" && !isNotesDirty() && !(panelOpen && name === "notes")) {
        notesState.view = "list";
        notesState.editingId = null;
        notesEditBaseline = null;
      }
      go();
    });
  });

  let colorMode = localStorage.getItem("care-color-mode") || "system";
  const modeSwitcherButton = document.getElementById("mode-switcher-button");
  const modeSwitcherMenu = document.getElementById("mode-switcher-menu");
  const modeSwitcherOptions = modeSwitcherMenu
    ? [...modeSwitcherMenu.querySelectorAll(".mode-switcher-option")]
    : [];
  const colorSchemeMq = window.matchMedia("(prefers-color-scheme: dark)");

  function resolvedSystemDark() {
    return colorSchemeMq.matches;
  }

  function syncHtmlColorMode() {
    const root = document.documentElement;
    if (colorMode === "dark") {
      root.setAttribute("data-color-mode", "dark");
      return;
    }
    if (colorMode === "light") {
      root.removeAttribute("data-color-mode");
      return;
    }
    if (resolvedSystemDark()) root.setAttribute("data-color-mode", "dark");
    else root.removeAttribute("data-color-mode");
  }

  function updateModeSwitcherUi() {
    modeSwitcherOptions.forEach((opt) => {
      const selected = opt.dataset.mode === colorMode;
      opt.setAttribute("aria-checked", selected ? "true" : "false");
    });
  }

  function applyColorMode(mode) {
    colorMode = mode;
    localStorage.setItem("care-color-mode", colorMode);
    syncHtmlColorMode();
    updateModeSwitcherUi();
  }

  function closeModeSwitcherMenu() {
    if (!modeSwitcherMenu || modeSwitcherMenu.hidden) return;
    modeSwitcherMenu.hidden = true;
    modeSwitcherButton?.setAttribute("aria-expanded", "false");
  }

  function openModeSwitcherMenu() {
    if (!modeSwitcherMenu || !modeSwitcherButton) return;
    modeSwitcherMenu.hidden = false;
    modeSwitcherButton.setAttribute("aria-expanded", "true");
  }

  function toggleModeSwitcherMenu() {
    if (!modeSwitcherMenu) return;
    if (modeSwitcherMenu.hidden) openModeSwitcherMenu();
    else closeModeSwitcherMenu();
  }

  applyColorMode(colorMode);

  colorSchemeMq.addEventListener("change", () => {
    if (colorMode === "system") syncHtmlColorMode();
  });

  modeSwitcherButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleModeSwitcherMenu();
  });

  modeSwitcherOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      applyColorMode(opt.dataset.mode || "system");
      closeModeSwitcherMenu();
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
    syncRailIndicator({ animate: false });
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

  document.querySelector(".wordmark")?.addEventListener("click", (event) => {
    event.preventDefault();
    resetAssistAiGlow();
    if (panelOpen && activePanel === "assist") {
      render("assist", { skipEnter: true });
    }
  });

  function isBenefitSearchVisible(el) {
    if (!el?.isConnected) return false;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function isEditableKeyTarget(target) {
    if (!(target instanceof Element)) return false;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      return !target.readOnly && !target.disabled;
    }
    if (target instanceof HTMLSelectElement) return true;
    return target.isContentEditable;
  }

  function flashSearchShortcut(shell) {
    shell?.classList.remove("is-shortcut-flash");
    void shell?.offsetWidth;
    shell?.classList.add("is-shortcut-flash");
    window.setTimeout(() => shell?.classList.remove("is-shortcut-flash"), 600);
  }

  function focusPanelSearchInput(input, event) {
    if (!isBenefitSearchVisible(input)) return false;
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const shell = input.closest(".elig-search");
    input.scrollIntoView({ block: "nearest", inline: "nearest" });
    input.focus({ preventScroll: true });
    try {
      input.select();
    } catch {
      /* type=search may reject select in some engines */
    }
    flashSearchShortcut(shell);
    return true;
  }

  function focusAssistSearch(event) {
    if (activePanel !== "assist" || !panelOpen) return false;
    return focusPanelSearchInput(stage?.querySelector("#assist-search"), event);
  }

  function focusBenefitSearch(event) {
    if (activePanel !== "eligibility") return false;
    return focusPanelSearchInput(stage?.querySelector("#elig-benefit-search"), event);
  }

  /*
   * Focus panel search (Assist or Eligibility benefits):
   * - ⌘/Ctrl+K when the field is on screen (capture — beat inputs)
   * - "/" when not typing in another field (Cursor / Chrome often steal ⌘K)
   */
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented || event.repeat || event.altKey) return;

      const isK =
        event.code === "KeyK" || event.key === "k" || event.key === "K";
      const modK =
        isK && (event.metaKey || event.ctrlKey) && !event.shiftKey;
      const slash =
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        (event.key === "/" || event.code === "Slash") &&
        !isEditableKeyTarget(event.target);

      if (!modK && !slash) return;
      if (panelOpen && activePanel === "assist") {
        if (focusAssistSearch(event)) return;
      }
      if (activePanel === "eligibility") {
        focusBenefitSearch(event);
      }
    },
    true
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (isNavDrawerOpen()) {
        closeNavDrawer();
        return;
      }
      if (modeSwitcherMenu && !modeSwitcherMenu.hidden) {
        closeModeSwitcherMenu();
        return;
      }
      const hasMenu =
        stage.querySelector(".view-menu:not([hidden])") ||
        stage.querySelector(".more-menu:not([hidden])") ||
        stage.querySelector(".elig-filter-menu:not([hidden])") ||
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
    const show = () => tip.classList.add("is-visible");
    const hide = () => tip.classList.remove("is-visible");
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

  /** @type {{ role: 'user' | 'assistant', content: string, speaker?: 'lila' | 'riley' | 'dot' }[]} */
  const chatHistory = [];
  let chatBusy = false;
  /** @type {AbortController | null} */
  let chatAbort = null;

  const seedChatHistoryFromDom = () => {
    if (!conversationEl || chatHistory.length) return;
    // MCA tool: Lila = user · Riley / Dot = assistant (speaker tagged for routing)
    conversationEl.querySelectorAll(".msg-group").forEach((group) => {
      if (group.classList.contains("msg-group--team")) {
        const bubbles = [...group.querySelectorAll(".msg-bubble")].map((el) => el.textContent.trim());
        if (bubbles.length) {
          chatHistory.push({ role: "user", content: bubbles.join("\n"), speaker: "lila" });
        }
      } else if (group.classList.contains("msg-group--member")) {
        const texts = [...group.querySelectorAll(".msg-bubble")].map((el) => el.textContent.trim());
        if (texts.length) {
          chatHistory.push({ role: "assistant", content: texts.join("\n"), speaker: "riley" });
        }
      } else if (group.classList.contains("msg-group--agent")) {
        const plain = group.querySelector(".msg-plain")?.textContent?.trim();
        if (plain) chatHistory.push({ role: "assistant", content: plain, speaker: "dot" });
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

  /** Dot only: caption time + SemiBold “Read by Member” once seen (MCA keeps time only) */
  const markOutboundMessagesRead = () => {
    conversationEl?.querySelectorAll(".msg-group--team .msg-meta-status").forEach((el) => el.remove());
    conversationEl?.querySelectorAll(".msg-group--agent .msg-meta").forEach((meta) => {
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

  /** Pending reply — Riley (member) or Dot (agent) */
  const appendTypingIndicator = (speaker = "member") => {
    const isDot = speaker === "dot";
    const article = document.createElement("article");
    article.className = `msg-group ${isDot ? "msg-group--agent" : "msg-group--member"} is-pending`;
    article.dataset.replySpeaker = isDot ? "dot" : "member";
    article.setAttribute("aria-label", isDot ? "Dot is typing" : "Riley Smith is typing");
    article.innerHTML = isDot
      ? `
      <header class="msg-sender-head">
        <img class="logo-dot" src="assets/logo-dot.svg?v=cluster" width="20" height="20" alt="" />
        <span class="msg-sender-name">Dot</span>
      </header>
      <div class="msg-content">
        <div class="msg-stack">
          <div class="msg-typing" aria-hidden="true">
            <span class="msg-typing-dot"></span>
            <span class="msg-typing-dot"></span>
            <span class="msg-typing-dot"></span>
          </div>
        </div>
      </div>`
      : `
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
    const isDot = typingArticle.dataset.replySpeaker === "dot";
    const stack = typingArticle.querySelector(".msg-stack");
    stack.innerHTML = isDot
      ? `<p class="msg-plain is-streaming" aria-live="polite"></p>`
      : `<p class="msg-bubble msg-bubble--member is-streaming" aria-live="polite"></p>`;
    const content = typingArticle.querySelector(".msg-content");
    if (!content.querySelector(".msg-meta")) {
      const footer = document.createElement("footer");
      footer.className = "msg-meta";
      footer.innerHTML = isDot
        ? `<time></time><span class="msg-meta-status">Read by Member</span>`
        : `<time></time>`;
      content.append(footer);
    }
    typingArticle.classList.remove("is-pending");
    typingArticle.removeAttribute("aria-label");
    return stack.querySelector(".msg-plain, .msg-bubble");
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
    chatHistory.push({ role: "user", content: text, speaker: "lila" });
    bumpReplyTimers("you");
    setComposerBusy(true);

    let typingArticle = null;
    let bubble = null;
    let assembled = "";
    let replySpeaker = "member";

    try {
      for await (const event of CareChatEngine.generate({
        messages: chatHistory.slice(-16),
        signal: chatAbort.signal,
      })) {
        if (event.type === "speaker") {
          replySpeaker = event.speaker === "dot" ? "dot" : "member";
          typingArticle = appendTypingIndicator(replySpeaker);
        }
        if (event.type === "status" && event.phase === "typing" && typingArticle && !bubble) {
          bubble = promoteTypingToStream(typingArticle);
        }
        if (event.type === "token") {
          if (!typingArticle) {
            typingArticle = appendTypingIndicator(replySpeaker);
          }
          if (!bubble) bubble = promoteTypingToStream(typingArticle);
          assembled += event.text;
          bubble.textContent = assembled;
          scrollConversationToEnd(false);
        }
        if (event.type === "done") {
          const speaker = event.speaker === "dot" || replySpeaker === "dot" ? "dot" : "riley";
          assembled = assembled
            .replace(/^(Riley\s*\(member\)|Riley|As Riley|Dot(?:\s*\(assistant\))?)\s*[:\-–]\s*/i, "")
            .trim();
          if (!typingArticle) typingArticle = appendTypingIndicator(speaker === "dot" ? "dot" : "member");
          if (!bubble) {
            bubble = promoteTypingToStream(typingArticle);
            bubble.textContent = assembled || "…";
          } else {
            bubble.textContent = assembled || bubble.textContent;
          }
          finishStreamedMessage(bubble, typingArticle);
          chatHistory.push({
            role: "assistant",
            content: assembled,
            speaker,
          });
          bumpReplyTimers("member");
        }
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        typingArticle?.remove();
      } else {
        console.error(err);
        typingArticle?.remove();
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

  panel.setAttribute("aria-label", `${titleFor("assist")} panel`);
  render("assist", { skipEnter: true });
  updateRail("assist", true);
  syncSheetChrome();
  requestAnimationFrame(() => syncRailIndicator({ animate: false }));

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

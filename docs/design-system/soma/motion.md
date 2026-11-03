# Soma — motion

**Canonical sources**

| Audience | Link |
|---|---|
| Eng (GitHub) | https://github.com/haroldwayjr/soma-ui-library/blob/master/docs/motion.md |
| Library UI | https://soma-ui-library.vercel.app/ui-library/foundation/motion |
| Design (Figma) | https://www.figma.com/design/hB1NzwMnZt2ALeR0OslaWi/Soma-Design-System?node-id=6040-28556 |

Duration + easing primitives/semantics and Accordion · Progress · Switch · **Tooltip** · **Modal** · **Menu / Select** · **Skeleton** recipes. Do not maintain a second full copy in CareApp — update the library doc and Figma Foundation page, then keep this pointer current.

**Tooltip (summary):** enter `normal` + `emphasized`; leave `fast` + `exit`; ~4px settle **emerging away from the parent** on the open axis (below → start `-4px` Y; above / side → start toward the anchor); default **200ms** hover-intent on all tips (leave immediate; open-by-default / coach skips delay).

**Modal (summary):** enter/leave `moderate`; scrim `standard` enter / `exit` leave; dialog `emphasized` enter / `exit` leave; **12px** Y settle (below → rest), no scale; scrim + dialog together. Content swap (scrim stays): `normal` + `emphasized`, **6px**. Prototype enter is live; leave should reverse settle (prototype currently snaps).

**Menu / Select (summary):** shared popup recipe for **Menu / Popup**, **Select / Popup**, overflow / View menus, filter menus, and DOB calendar — not Tooltip, not Modal. Enter `moderate` + `emphasized` (prototype **180ms**); leave `fast` + `exit` (prototype **120ms**). Fade + scale from the trigger: enter **0.96 → 1** with **~6px** Y settle **emerging from the trigger** (open down → start `-6px`; open up → `+6px`); leave **1 → 0.98** with **~4px** Y on the same axis. `transform-origin` on the trigger corner (flip when `opens-up`). Trigger chevron rotate (if any) uses the same enter curve. No hover-intent delay. Reduced motion → instant show/hide (skip leave). Prototype: `tool-rail-panels` `menu-popover-in` / `-out`.

**Menu / Select (positioning):** Scroll or resize while the trigger is at least partly visible → **stay open and reposition** (track the trigger). Trigger **fully clipped** by its scrollport or off-screen → **dismiss** with the normal leave. Resize alone does **not** close while the trigger remains a valid visible anchor. Same rule for Menu and Select — do not fork.

**Skeleton (summary):** sheen band loop **1100ms** · `linear` · infinite (`translateX(-100%)` → `100%` over soft `transparent` → `skeleton/shimmer` → `transparent`). Not a `motion.duration.*` role (same class as Spinner cycles). Figma **Appearance=Shimmer** is static preview only. Reduced motion → Rest / paused. Converge product away from legacy 2.6s ease-in-out.

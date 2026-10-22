# Soma — motion

**Canonical sources**

| Audience | Link |
|---|---|
| Eng (GitHub) | https://github.com/haroldwayjr/soma-ui-library/blob/master/docs/motion.md |
| Design (Figma) | https://www.figma.com/design/hB1NzwMnZt2ALeR0OslaWi/Soma-Design-System?node-id=6040-28556 |

Duration + easing primitives/semantics and Accordion · Progress · Switch · **Tooltip** · **Modal** · **Skeleton** recipes. Do not maintain a second full copy in CareApp — update the library doc and Figma Foundation page, then keep this pointer current.

**Tooltip (summary):** enter `normal` + `emphasized`; leave `fast` + `exit`; ~4px settle **emerging away from the parent** on the open axis (below → start `-4px` Y; above / side → start toward the anchor); default **200ms** hover-intent on all tips (leave immediate; open-by-default / coach skips delay).

**Modal (summary):** enter/leave `moderate`; scrim `standard` enter / `exit` leave; dialog `emphasized` enter / `exit` leave; **12px** Y settle (below → rest), no scale; scrim + dialog together. Content swap (scrim stays): `normal` + `emphasized`, **6px**. Prototype enter is live; leave should reverse settle (prototype currently snaps).

**Skeleton (summary):** sheen band loop **1100ms** · `linear` · infinite (`translateX(-100%)` → `100%` over soft `transparent` → `skeleton/shimmer` → `transparent`). Not a `motion.duration.*` role (same class as Spinner cycles). Figma **Appearance=Shimmer** is static preview only. Reduced motion → Rest / paused. Converge product away from legacy 2.6s ease-in-out.

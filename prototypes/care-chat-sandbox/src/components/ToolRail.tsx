import { Tooltip } from '@base-ui/react/tooltip'
import { Icon, type IconName } from './icons'
import * as s from './ToolRail.css'

export type PanelName = 'member' | 'eligibility' | 'insurance'

const tools: Array<{ id: PanelName; label: string; icon: IconName }> = [
  { id: 'member', label: 'Member Info', icon: 'user' },
  { id: 'eligibility', label: 'Eligibility', icon: 'clipboardHealth' },
  { id: 'insurance', label: 'Insurance', icon: 'insurance' },
]

export function ToolRail({
  active,
  onToggle,
}: {
  active: PanelName | null
  onToggle: (panel: PanelName) => void
}) {
  return (
    <Tooltip.Provider delay={250}>
      <nav className={s.rail} aria-label="Member tools">
        {tools.map((tool) => (
          <Tooltip.Root key={tool.id}>
            <Tooltip.Trigger
              render={
                <button
                  className={`${s.tool} ${active === tool.id ? s.active : ''}`}
                  aria-label={tool.label}
                  aria-pressed={active === tool.id}
                  onClick={() => onToggle(tool.id)}
                >
                  <Icon name={tool.icon} size={24} />
                </button>
              }
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="left" sideOffset={8}>
                <Tooltip.Popup className={s.tooltip}>{tool.label}</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </nav>
    </Tooltip.Provider>
  )
}

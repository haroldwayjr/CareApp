import type { ReactNode } from 'react'
import { IconButton } from './ui/IconButton'
import * as s from './ContextPanel.css'

export function ContextPanel({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <aside className={s.panel} aria-label={title}>
      <header className={s.panelHeader}>
        <h2 className={s.title}>{title}</h2>
        <IconButton icon="close" label={`Close ${title}`} onClick={onClose} />
      </header>
      {children}
    </aside>
  )
}

import type { ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { IconButton } from './IconButton'
import {
  backdrop,
  modal,
  modalActions,
  modalDanger,
  modalDescription,
  modalHeader,
  modalTitle,
} from './ui.css'

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  danger = false,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  actions?: ReactNode
  danger?: boolean
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={backdrop} />
        <Dialog.Popup className={`${modal} ${danger ? modalDanger : ''}`}>
          <div className={modalHeader}>
            <div>
              <Dialog.Title className={modalTitle}>{title}</Dialog.Title>
              {description && <Dialog.Description className={modalDescription}>{description}</Dialog.Description>}
            </div>
            <Dialog.Close render={<IconButton icon="close" label="Close dialog" />} />
          </div>
          {children}
          {actions && <div className={modalActions}>{actions}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

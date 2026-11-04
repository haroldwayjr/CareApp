import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '../icons'
import { iconButton } from './ui.css'

export function IconButton({
  icon,
  label,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconName; label: string }) {
  return (
    <button className={iconButton} aria-label={label} title={label} {...props}>
      <Icon name={icon} size={18} />
    </button>
  )
}

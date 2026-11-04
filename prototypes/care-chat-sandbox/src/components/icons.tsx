import type { HTMLAttributes } from 'react'
import user from '../assets/icons/user.svg?raw'
import insurance from '../assets/icons/insurance.svg?raw'
import clipboardHealth from '../assets/icons/clipboard-health.svg?raw'
import edit from '../assets/icons/edit.svg?raw'
import cancel from '../assets/icons/cancel.svg?raw'
import deleteIcon from '../assets/icons/delete.svg?raw'
import add from '../assets/icons/add.svg?raw'
import check from '../assets/icons/check.svg?raw'
import arrowLeft from '../assets/icons/arrow-left.svg?raw'
import close from '../assets/icons/close.svg?raw'
import chevronRight from '../assets/icons/chevron-right.svg?raw'
import chevronDown from '../assets/icons/chevron-down.svg?raw'
import search from '../assets/icons/search.svg?raw'

const sources = {
  user,
  insurance,
  clipboardHealth,
  edit,
  cancel,
  delete: deleteIcon,
  add,
  check,
  arrowLeft,
  close,
  chevronRight,
  chevronDown,
  search,
} as const

export type IconName = keyof typeof sources

const normalize = (source: string) =>
  source
    .replace(/\s*\d+\|\s*/g, '')
    .replace(/stroke="(?:#[0-9A-Fa-f]{3,8}|black)"/g, 'stroke="currentColor"')
    .replace(/fill="(?:#[0-9A-Fa-f]{3,8}|black)"/g, 'fill="currentColor"')
    .replace('<svg ', '<svg width="100%" height="100%" aria-hidden="true" focusable="false" ')

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      style={{ display: 'inline-flex', width: size, height: size, ...props.style }}
      dangerouslySetInnerHTML={{ __html: normalize(sources[name]) }}
    />
  )
}

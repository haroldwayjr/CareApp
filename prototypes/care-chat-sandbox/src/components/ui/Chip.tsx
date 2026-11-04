import type { HTMLAttributes } from 'react'
import { chip } from './ui.css'

export function Chip(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className={chip} {...props} />
}

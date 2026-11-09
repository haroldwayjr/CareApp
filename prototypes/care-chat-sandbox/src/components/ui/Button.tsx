import type { ButtonHTMLAttributes } from 'react'
import { button, disabledButton } from './ui.css'

export function Button({
  tone = 'secondary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: keyof typeof button }) {
  return <button className={`${button[tone]} ${disabledButton} ${className}`} {...props} />
}

import type { InputHTMLAttributes } from 'react'
import { Icon } from '../icons'
import { searchIcon, searchInput, searchWrap } from './ui.css'

export function SearchField(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={searchWrap}>
      <Icon className={searchIcon} name="search" size={18} />
      <input className={searchInput} type="search" {...props} />
    </div>
  )
}

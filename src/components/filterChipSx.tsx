import type { HTMLAttributes } from 'react'

/** Shared pill chip style for filter tags (modal selects + applied filters). */
export const filterChipSx = {
  height: 28,
  fontSize: 13,
  fontWeight: 400,
  borderRadius: 100,
  bgcolor: '#EFF1F3',
  color: 'rgba(0, 0, 0, 0.87)',
  letterSpacing: 0,
  border: 'none',
  pl: 0.5,
  '& .MuiChip-label': {
    px: 1,
  },
  '& .MuiChip-deleteIcon': {
    width: 16,
    height: 16,
    ml: 0.25,
    mr: 0.875,
    color: 'rgba(0, 0, 0, 0.55)',
    '&:hover': { color: 'rgba(0, 0, 0, 0.8)' },
  },
} as const

/** Simple thin X matching the filter tag close affordance. */
export function FilterChipDeleteIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      focusable="false"
      aria-hidden
      {...props}
    >
      <path
        d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

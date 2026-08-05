import type {
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
} from 'react'
import Chip from '@mui/material/Chip'
import type { SxProps, Theme } from '@mui/material/styles'

/** Shared gap between removable filter tags (popup + results row). */
export const REMOVABLE_FILTER_TAG_GAP = 0.75

/** Neutral filled chip styles — single source for popup + results-row tags. */
export const removableFilterTagSx: SxProps<Theme> = {
  height: 28,
  maxWidth: '100%',
  fontSize: 13,
  fontWeight: 400,
  borderRadius: 100,
  bgcolor: 'action.hover',
  color: 'text.primary',
  letterSpacing: 0,
  border: 'none',
  pl: 0.5,
  '& .MuiChip-label': {
    px: 1,
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& .MuiChip-deleteIcon': {
    width: 24,
    height: 24,
    ml: 0.25,
    mr: 0.5,
    p: '4px',
    boxSizing: 'border-box',
    color: 'text.secondary',
    '&:hover': { color: 'text.primary' },
  },
}

/** Simple thin X matching the filter tag close affordance. */
function FilterTagDeleteIcon({
  'aria-label': ariaLabel,
  ...props
}: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      focusable="false"
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
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

type RemovableFilterTagProps = {
  label: string
  onDelete: () => void
  /** Optional tooltip; defaults to label. */
  title?: string
  /** Stop Select/Menu open when interacting inside a field. */
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onClick?: MouseEventHandler<HTMLDivElement>
}

/**
 * Canonical removable filter tag — used for in-field selection chips in the
 * filters popup and applied-filter chips on the results row.
 */
export function RemovableFilterTag({
  label,
  onDelete,
  title,
  onMouseDown,
  onClick,
}: RemovableFilterTagProps) {
  return (
    <Chip
      size="small"
      variant="filled"
      label={label}
      title={title ?? label}
      deleteIcon={<FilterTagDeleteIcon aria-label={`Remove ${label}`} />}
      onDelete={onDelete}
      onMouseDown={onMouseDown}
      onClick={onClick}
      sx={removableFilterTagSx}
    />
  )
}

/** Helper for Select renderValue: prevent the select from toggling on chip interaction. */
export function stopSelectChipEvent(event: MouseEvent) {
  event.stopPropagation()
  event.preventDefault()
}

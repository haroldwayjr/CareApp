import type {
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
} from 'react'
import Chip from '@mui/material/Chip'
import type { SxProps, Theme } from '@mui/material/styles'

/** Shared gap between removable filter chips (popup + results row). */
export const REMOVABLE_FILTER_CHIP_GAP = 0.75

/** Neutral filled chip styles — single source for popup + results-row chips. */
export const removableFilterChipSx: SxProps<Theme> = {
  height: 28,
  maxWidth: '100%',
  fontSize: 14,
  fontWeight: 400,
  borderRadius: 100,
  bgcolor: '#F3F4F6',
  color: 'text.primary',
  letterSpacing: 0,
  border: '1px solid',
  borderColor: 'divider',
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
    ml: 0.5,
    mr: 0.25,
    p: '4px',
    boxSizing: 'border-box',
    color: 'icon.tertiary',
    '&:hover': { color: 'text.primary' },
  },
}

/** Simple thin X matching the filter chip close affordance. */
function FilterChipDeleteIcon({
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

type RemovableFilterChipProps = {
  label: string
  onDelete: () => void
  /** Optional tooltip; defaults to label. */
  title?: string
  /** Stop Select/Menu open when interacting inside a field. */
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onClick?: MouseEventHandler<HTMLDivElement>
}

/**
 * Canonical removable filter chip — used for in-field selection chips in the
 * filters popup and applied-filter chips on the results row.
 */
export function RemovableFilterChip({
  label,
  onDelete,
  title,
  onMouseDown,
  onClick,
}: RemovableFilterChipProps) {
  return (
    <Chip
      size="small"
      variant="filled"
      label={label}
      title={title ?? label}
      deleteIcon={<FilterChipDeleteIcon aria-label={`Remove ${label}`} />}
      onDelete={onDelete}
      onMouseDown={onMouseDown}
      onClick={onClick}
      sx={removableFilterChipSx}
    />
  )
}

/** Helper for Select renderValue: prevent the select from toggling on chip interaction. */
export function stopSelectChipEvent(event: MouseEvent) {
  event.stopPropagation()
  event.preventDefault()
}

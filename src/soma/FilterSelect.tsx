import { useState } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { soma } from './tokens'

export type FilterOption = {
  id: string
  label: string
}

type FilterSelectProps = {
  label: string
  options: FilterOption[]
  value: string[]
  onChange: (next: string[]) => void
}

function summary(label: string, options: FilterOption[], value: string[]) {
  if (value.length === 0) return label
  const first = options.find((option) => option.id === value[0])?.label ?? value[0]
  if (value.length === 1) return `${label}: ${first}`
  return `${label}: ${first} +${value.length - 1}`
}

/** Outlined chip trigger + multi-select menu. Spike stand-in, not a Soma master. */
export function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const active = value.length > 0

  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id])
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        aria-haspopup="listbox"
        aria-expanded={anchor ? 'true' : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        endIcon={<AppIcon name="chevronDown" sx={{ fontSize: 16 }} />}
        sx={{
          ...soma.type.body1,
          height: 32,
          px: `${soma.space[12]}px`,
          borderColor: active ? soma.border.strong : soma.border.subtle,
          color: soma.text.primary,
          bgcolor: active ? soma.surface.subtle : soma.surface.default,
          '&:hover': { bgcolor: soma.surface.subtle, borderColor: soma.border.strong },
        }}
      >
        {summary(label, options, value)}
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              minWidth: 200,
              borderRadius: `${soma.radius.md}px`,
              border: '1px solid',
              borderColor: soma.border.subtle,
              boxShadow: soma.shadow.lg,
            },
          },
        }}
      >
        <Typography sx={{ ...soma.type.subtitle3, color: soma.text.secondary, px: 2, pt: 1, pb: 0.5 }}>
          {label}
        </Typography>
        {options.map((option) => {
          const checked = value.includes(option.id)
          return (
            <MenuItem
              key={option.id}
              role="option"
              aria-selected={checked}
              onClick={() => toggle(option.id)}
              sx={{ ...soma.type.subtitle2, gap: 1 }}
            >
              <Checkbox
                size="small"
                checked={checked}
                tabIndex={-1}
                sx={{ p: 0, color: soma.icon.tertiary, '&.Mui-checked': { color: soma.action.primary } }}
              />
              {option.label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

type AppliedChipProps = {
  label: string
  onDismiss: () => void
}

export function AppliedChip({ label, onDismiss }: AppliedChipProps) {
  return (
    <Stack
      direction="row"
      component="span"
      sx={{
        alignItems: 'center',
        height: 28,
        pl: `${soma.space[12]}px`,
        pr: '2px',
        gap: `${soma.inline.xs}px`,
        borderRadius: soma.radius.full,
        bgcolor: soma.surface.subtle,
        border: '1px solid',
        borderColor: soma.border.neutralSubtle,
      }}
    >
      <Typography component="span" sx={{ ...soma.type.subtitle3, color: soma.text.primary }}>
        {label}
      </Typography>
      <Button
        aria-label={`Remove ${label}`}
        onClick={onDismiss}
        sx={{ minWidth: 24, width: 24, height: 24, p: 0, borderRadius: soma.radius.full, color: soma.icon.tertiary }}
      >
        <AppIcon name="close" sx={{ fontSize: 12 }} />
      </Button>
    </Stack>
  )
}

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { soma } from '../soma/tokens'
import type { DueWindow, Filters, Health, SortKey, WatcherFilter } from './mockDashboard'

type TableFiltersProps = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
}

const HEALTH: { id: Health; label: string }[] = [
  { id: 'critical', label: 'Critical' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'good', label: 'Good' },
]

const WATCHERS: { id: WatcherFilter; label: string }[] = [
  { id: 'me', label: 'I’m watching' },
  { id: 'multiple', label: 'Multiple watchers' },
]

const DUE: { id: DueWindow; label: string }[] = [
  { id: 'overdue', label: 'Overdue' },
  { id: 'today', label: 'Due today' },
  { id: 'week', label: 'Next 7 days' },
]

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'panel', label: 'Panel order' },
  { id: 'health', label: 'Health grade' },
  { id: 'due', label: 'Due date' },
  { id: 'member', label: 'Member name' },
]

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        borderRadius: soma.radius.full,
        border: '1.5px solid',
        borderColor: selected ? soma.action.primary : soma.border.strong,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {selected ? (
        <Box sx={{ width: 8, height: 8, borderRadius: soma.radius.full, bgcolor: soma.action.primary }} />
      ) : null}
    </Box>
  )
}

function RadioRow({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <MenuItem onClick={onClick} sx={{ minHeight: 36, gap: 1, borderRadius: `${soma.radius.sm}px` }}>
      <RadioMark selected={selected} />
      <Typography sx={{ ...soma.type.body1, color: soma.text.primary }}>{label}</Typography>
    </MenuItem>
  )
}

export function TableFilters({ filters, onChange }: TableFiltersProps) {
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null)
  const [sortAnchor, setSortAnchor] = useState<HTMLElement | null>(null)
  const active = Boolean(filters.health || filters.watchers || filters.due)

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        aria-pressed={active}
        onClick={(event) => setFilterAnchor(event.currentTarget)}
        sx={{
          height: 36,
          borderRadius: soma.radius.full,
          textTransform: 'none',
          ...soma.type.subtitle2,
          px: 1.75,
        }}
      >
        Filters
      </Button>
      <Button
        variant="outlined"
        onClick={(event) => setSortAnchor(event.currentTarget)}
        sx={{
          height: 36,
          borderRadius: soma.radius.full,
          textTransform: 'none',
          ...soma.type.subtitle2,
          px: 1.75,
        }}
      >
        Sort
      </Button>
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              p: 1,
              borderRadius: `${soma.radius.lg}px`,
              boxShadow: soma.shadow.lg,
            },
          },
          list: { sx: { py: 0 } },
        }}
      >
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, px: 1.5, py: 0.75 }}>
          Health Grade
        </Typography>
        {HEALTH.map((option) => (
          <RadioRow
            key={option.id}
            label={option.label}
            selected={filters.health === option.id}
            onClick={() => onChange({ health: filters.health === option.id ? null : option.id })}
          />
        ))}
        <Divider sx={{ my: 0.5, borderColor: soma.border.hairline }} />
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, px: 1.5, py: 0.75 }}>
          Watchers
        </Typography>
        {WATCHERS.map((option) => (
          <RadioRow
            key={option.id}
            label={option.label}
            selected={filters.watchers === option.id}
            onClick={() => onChange({ watchers: filters.watchers === option.id ? null : option.id })}
          />
        ))}
        <Divider sx={{ my: 0.5, borderColor: soma.border.hairline }} />
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, px: 1.5, py: 0.75 }}>
          Due Date
        </Typography>
        {DUE.map((option) => (
          <RadioRow
            key={option.id}
            label={option.label}
            selected={filters.due === option.id}
            onClick={() => onChange({ due: filters.due === option.id ? null : option.id })}
          />
        ))}
      </Menu>
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={() => setSortAnchor(null)}
        slotProps={{
          paper: {
            sx: { width: 220, borderRadius: `${soma.radius.lg}px`, boxShadow: soma.shadow.lg },
          },
        }}
      >
        {SORTS.map((option) => (
          <MenuItem
            key={option.id}
            selected={filters.sort === option.id}
            onClick={() => {
              onChange({ sort: option.id })
              setSortAnchor(null)
            }}
            sx={soma.type.body1}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}

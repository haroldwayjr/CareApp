import { useMemo, useState, type KeyboardEvent, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import Typography from '@mui/material/Typography'
import { alpha, type Theme } from '@mui/material/styles'
import { AppIcon } from '../icons/AppIcon'
import { SEARCH_CONTROL_HEIGHT } from './SearchFormBar'
import {
  RemovableFilterTag,
  REMOVABLE_FILTER_TAG_GAP,
  stopSelectChipEvent,
} from './RemovableFilterTag'
import {
  AVAILABILITY_DAY_OPTIONS,
  AVAILABILITY_HOUR_OPTIONS,
  DISTANCE_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  TIER_OPTIONS,
  countActiveFilters,
  type ProviderFilters,
} from '../data/mockCareResults'

// TODO(P3): Confirm before persisting applied filters in the URL query string
// for shareable / restorable filter state.

export type OpenFilterMenu =
  | 'gender'
  | 'tier'
  | 'distance'
  | 'language'
  | null

type FilterDrawerProps = {
  open: boolean
  draft: ProviderFilters
  /** Live provider count for the current draft + search (before Apply). */
  draftResultCount: number
  openMenu: OpenFilterMenu
  onClose: () => void
  onDraftChange: (next: ProviderFilters) => void
  onOpenMenuChange: (menu: OpenFilterMenu) => void
  onApply: () => void
  onClear: () => void
}

const LANGUAGE_PREVIEW_COUNT = 8
const CHIP_FIELD_MAX_HEIGHT = 96

/** Same border as MUI outlined inputs (.MuiOutlinedInput-notchedOutline) in light mode. */
const outlinedFieldBorder = (theme: Theme) =>
  alpha(theme.palette.common.black, 0.23)

/** Match SearchFormBar outlined controls (height, radius, chevron). */
const selectSx = {
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: 0,
  bgcolor: 'background.paper',
  borderRadius: 1,
  minHeight: SEARCH_CONTROL_HEIGHT,
  '& .MuiSelect-select': {
    py: 1,
    px: 1.5,
    display: 'flex',
    alignItems: 'center',
    minHeight: SEARCH_CONTROL_HEIGHT - 2,
    boxSizing: 'border-box',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: outlinedFieldBorder,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: Theme) => alpha(theme.palette.common.black, 0.87),
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: 2,
    borderColor: 'primary.main',
  },
  '& .MuiSelect-icon': {
    fontSize: 28,
    right: 8,
    color: 'icon.secondary',
  },
}

const menuPaperSx = {
  borderRadius: 1,
  mt: 0.5,
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  border: 1,
  borderColor: 'divider',
}

const menuItemSx = {
  fontSize: 14,
  fontWeight: 400,
  minHeight: 44,
  py: 0.75,
  gap: 0.5,
  alignItems: 'center',
}

const placeholderSx = {
  fontSize: 14,
  fontWeight: 400,
  // ~7:1 on white — meets WCAG AA 4.5:1 for placeholder text
  color: 'rgba(0, 0, 0, 0.6)',
}

function FieldLabel({
  id,
  children,
}: {
  id?: string
  children: string
}) {
  return (
    <Typography
      id={id}
      component="label"
      sx={{
        fontSize: 14,
        fontWeight: 600,
        color: 'text.primary',
        lineHeight: 1.4,
        letterSpacing: 0,
      }}
    >
      {children}
    </Typography>
  )
}

function FieldHeader({
  label,
  labelId,
  canClear,
  onClear,
  clearLabel,
}: {
  label: string
  labelId: string
  canClear: boolean
  onClear: () => void
  clearLabel: string
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ mb: 1, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <FieldLabel id={labelId}>{label}</FieldLabel>
      {canClear ? (
        <Button
          size="small"
          onClick={onClear}
          aria-label={clearLabel}
          sx={{
            minWidth: 0,
            px: 0.75,
            py: 0.25,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0,
            textTransform: 'none',
          }}
        >
          Clear
        </Button>
      ) : null}
    </Stack>
  )
}

function SelectedChips({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (next: string[]) => void
}) {
  if (selected.length === 0) {
    return (
      <Typography component="span" sx={placeholderSx}>
        Any
      </Typography>
    )
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: REMOVABLE_FILTER_TAG_GAP,
        maxHeight: CHIP_FIELD_MAX_HEIGHT,
        overflowY: 'auto',
        py: 0.25,
        width: '100%',
      }}
    >
      {selected.map((value) => (
        <RemovableFilterTag
          key={value}
          label={value}
          onDelete={() => onChange(selected.filter((item) => item !== value))}
          onMouseDown={stopSelectChipEvent}
          onClick={(event: MouseEvent) => {
            event.stopPropagation()
          }}
        />
      ))}
    </Box>
  )
}

function MultiFilterSelect({
  label,
  options,
  values,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  label: string
  options: readonly string[]
  values: string[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChange: (next: string[]) => void
}) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`
  const listboxId = `${labelId}-listbox`

  function handleChange(event: SelectChangeEvent<string[]>) {
    const next = event.target.value
    onChange(typeof next === 'string' ? next.split(',') : next)
  }

  return (
    <Box>
      <FieldHeader
        label={label}
        labelId={labelId}
        canClear={values.length > 0}
        clearLabel={`Clear ${label}`}
        onClear={() => onChange([])}
      />
      <FormControl fullWidth size="small">
        <Select
          multiple
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput notched={false} />}
          labelId={labelId}
          aria-labelledby={labelId}
          sx={selectSx}
          renderValue={(selected) => (
            <SelectedChips selected={selected} onChange={onChange} />
          )}
          MenuProps={{
            disableScrollLock: true,
            slotProps: {
              paper: { sx: menuPaperSx },
              list: {
                id: listboxId,
                dense: true,
                role: 'listbox',
                'aria-multiselectable': true,
                'aria-labelledby': labelId,
                sx: { py: 0.5, maxHeight: 280 },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              role="option"
              aria-selected={values.includes(option)}
              sx={menuItemSx}
            >
              <Checkbox
                size="small"
                checked={values.includes(option)}
                tabIndex={-1}
                disableRipple
                sx={{ p: 1, mr: 0.5 }}
                slotProps={{
                  input: { 'aria-hidden': true },
                }}
              />
              <ListItemText
                primary={option}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                    },
                  },
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

function SingleFilterSelect({
  label,
  options,
  value,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChange: (next: string) => void
}) {
  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`
  const isPlaceholder = value === 'Best Nearby' || value === 'Any'

  return (
    <Box>
      <FieldHeader
        label={label}
        labelId={labelId}
        canClear={value !== 'Best Nearby'}
        clearLabel={`Clear ${label}`}
        onClear={() => onChange('Best Nearby')}
      />
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          input={<OutlinedInput notched={false} />}
          labelId={labelId}
          aria-labelledby={labelId}
          sx={{
            ...selectSx,
            color: isPlaceholder ? 'rgba(0, 0, 0, 0.6)' : 'text.primary',
          }}
          renderValue={(selected) => (
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: 0,
                color: isPlaceholder ? 'rgba(0, 0, 0, 0.6)' : 'text.primary',
              }}
            >
              {selected}
            </Typography>
          )}
          MenuProps={{
            disableScrollLock: true,
            slotProps: {
              paper: { sx: menuPaperSx },
              list: {
                dense: true,
                role: 'listbox',
                'aria-labelledby': labelId,
                sx: { py: 0.5 },
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              role="option"
              aria-selected={value === option}
              sx={menuItemSx}
            >
              <Radio
                size="small"
                checked={value === option}
                tabIndex={-1}
                disableRipple
                sx={{ p: 1, mr: 0.5 }}
                slotProps={{
                  input: { 'aria-hidden': true },
                }}
              />
              <ListItemText
                primary={option}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                    },
                  },
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

/** Searchable language multi-select: search + scrollable list, Show more when browsing. */
function LanguageFilterSelect({
  values,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  values: string[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChange: (next: string[]) => void
}) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const labelId = 'language-label'

  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!normalizedQuery) return [...LANGUAGE_OPTIONS]
    return LANGUAGE_OPTIONS.filter((language) =>
      language.toLowerCase().includes(normalizedQuery),
    )
  }, [normalizedQuery])

  const visibleOptions = useMemo(() => {
    if (normalizedQuery || expanded) return filtered
    return filtered.slice(0, LANGUAGE_PREVIEW_COUNT)
  }, [expanded, filtered, normalizedQuery])

  const hiddenCount = filtered.length - visibleOptions.length

  function handleChange(event: SelectChangeEvent<string[]>) {
    const next = event.target.value
    onChange(typeof next === 'string' ? next.split(',') : next)
  }

  function handleClose() {
    setQuery('')
    setExpanded(false)
    onClose()
  }

  return (
    <Box>
      <FieldHeader
        label="Language"
        labelId={labelId}
        canClear={values.length > 0}
        clearLabel="Clear Language"
        onClear={() => onChange([])}
      />
      <FormControl fullWidth size="small">
        <Select
          multiple
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={handleClose}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput notched={false} />}
          labelId={labelId}
          aria-labelledby={labelId}
          sx={selectSx}
          renderValue={(selected) => (
            <SelectedChips selected={selected} onChange={onChange} />
          )}
          MenuProps={{
            disableScrollLock: true,
            autoFocus: false,
            slotProps: {
              paper: {
                sx: {
                  ...menuPaperSx,
                  maxHeight: 360,
                  display: 'flex',
                  flexDirection: 'column',
                },
              },
              list: {
                dense: true,
                role: 'listbox',
                'aria-multiselectable': true,
                'aria-labelledby': labelId,
                sx: {
                  py: 0,
                  maxHeight: 300,
                  overflow: 'auto',
                },
                subheader: <li />,
              },
            },
          }}
        >
          <ListSubheader
            sx={{
              bgcolor: 'background.paper',
              borderBottom: 1,
              borderColor: 'divider',
              lineHeight: 'normal',
              py: 1,
              px: 1.5,
              position: 'sticky',
              top: 0,
              zIndex: 2,
            }}
            onClickCapture={(event) => event.stopPropagation()}
          >
            <TextField
              size="small"
              fullWidth
              autoFocus
              placeholder="Search languages"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setExpanded(true)
              }}
              onKeyDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AppIcon
                        name="search"
                        sx={{ fontSize: 18, color: 'text.secondary' }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontSize: 14,
                  bgcolor: 'background.paper',
                  minHeight: SEARCH_CONTROL_HEIGHT,
                },
              }}
            />
          </ListSubheader>

          {visibleOptions.length === 0 ? (
            <MenuItem disabled sx={{ fontSize: 14, color: 'text.secondary' }}>
              No languages match “{query.trim()}”
            </MenuItem>
          ) : (
            visibleOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                role="option"
                aria-selected={values.includes(option)}
                sx={menuItemSx}
              >
                <Checkbox
                  size="small"
                  checked={values.includes(option)}
                  tabIndex={-1}
                  disableRipple
                  sx={{ p: 1, mr: 0.5 }}
                  slotProps={{
                    input: { 'aria-hidden': true },
                  }}
                />
                <ListItemText
                  primary={option}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 14,
                        fontWeight: 400,
                        letterSpacing: 0,
                      },
                    },
                  }}
                />
              </MenuItem>
            ))
          )}

          {!normalizedQuery && hiddenCount > 0 ? (
            <MenuItem
              dense
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setExpanded(true)
              }}
              sx={{
                ...menuItemSx,
                justifyContent: 'center',
                color: 'primary.main',
                fontWeight: 500,
                borderTop: 1,
                borderColor: 'divider',
                position: 'sticky',
                bottom: 0,
                bgcolor: 'background.paper',
                zIndex: 1,
              }}
            >
              Show more ({hiddenCount})
            </MenuItem>
          ) : null}
        </Select>
      </FormControl>
    </Box>
  )
}

const DAY_SHORT_LABEL: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
}

const HOUR_TOGGLE_META: {
  value: string
  title: string
  range: string
}[] = [
  {
    value: 'Morning - 5AM to 12PM',
    title: 'Morning',
    range: '5AM–12PM',
  },
  {
    value: 'Afternoon - 12PM to 5PM',
    title: 'Afternoon',
    range: '12PM–5PM',
  },
  {
    value: 'Evening - 5PM to 9PM',
    title: 'Evening',
    range: '5PM–9PM',
  },
]

/** Soft-selected standalone toggles — full 4-sided border, no ToggleButtonGroup clipping. */
const availabilityToggleSx = {
  flex: 1,
  minWidth: 0,
  minHeight: 44,
  py: 1.25,
  px: 0.5,
  textTransform: 'none' as const,
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: 0,
  lineHeight: 1.2,
  borderRadius: 1.5,
  border: '1px solid',
  borderColor: outlinedFieldBorder,
  color: 'text.primary',
  bgcolor: 'background.paper',
  boxSizing: 'border-box' as const,
  '&.Mui-selected': {
    color: 'text.primary',
    borderColor: 'primary.main',
    border: '1px solid',
    fontWeight: 500,
    // Inset ring + 1px border ≈ 2px outline without layout shift.
    boxShadow: (theme: Theme) =>
      `inset 0 0 0 1px ${theme.palette.primary.main}`,
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.04),
    '&:hover': {
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.07),
      borderColor: 'primary.main',
    },
  },
  '&:hover': {
    bgcolor: 'action.hover',
  },
  '&:focus-visible': {
    outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}

const availabilitySubLabelSx = {
  m: 0,
  mb: 0.5,
  fontSize: 12,
  fontWeight: 500,
  color: 'text.secondary',
  letterSpacing: '0.02em',
}

/**
 * Compact availability: Mon–Fri day toggles + time toggles (standalone ToggleButtons).
 * Clear is always reserved in the header (visibility toggled) to avoid layout shift.
 */
function AvailabilityFilterSelect({
  values,
  onChange,
}: {
  values: string[]
  onChange: (next: string[]) => void
}) {
  const labelId = 'availability-label'
  const hasSelection = values.length > 0
  const selectedDays = values.filter((value) =>
    (AVAILABILITY_DAY_OPTIONS as readonly string[]).includes(value),
  )
  const selectedHours = values.filter((value) =>
    (AVAILABILITY_HOUR_OPTIONS as readonly string[]).includes(value),
  )

  function toggleValue(option: string) {
    onChange(
      values.includes(option)
        ? values.filter((item) => item !== option)
        : [...values, option],
    )
  }

  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 0.5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          id={labelId}
          component="label"
          sx={{
            m: 0,
            fontSize: 14,
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.4,
            letterSpacing: 0,
          }}
        >
          Availability
        </Typography>
        <Button
          size="small"
          onClick={() => onChange([])}
          disabled={!hasSelection}
          aria-label="Clear Availability"
          tabIndex={hasSelection ? 0 : -1}
          sx={{
            minWidth: 48,
            px: 0.75,
            py: 0.25,
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: 0,
            textTransform: 'none',
            visibility: hasSelection ? 'visible' : 'hidden',
            pointerEvents: hasSelection ? 'auto' : 'none',
          }}
        >
          Clear
        </Button>
      </Stack>

      <Stack spacing={1.5}>
        <Box>
          <Typography
            component="p"
            id="availability-days-heading"
            sx={availabilitySubLabelSx}
          >
            Days
          </Typography>

          <Box
            role="group"
            aria-labelledby="availability-days-heading"
            sx={{ display: 'flex', gap: 1 }}
          >
            {AVAILABILITY_DAY_OPTIONS.map((day) => {
              const selected = selectedDays.includes(day)
              return (
                <ToggleButton
                  key={day}
                  value={day}
                  selected={selected}
                  onChange={() => toggleValue(day)}
                  aria-label={day}
                  aria-pressed={selected}
                  disableRipple
                  sx={availabilityToggleSx}
                >
                  {DAY_SHORT_LABEL[day] ?? day}
                </ToggleButton>
              )
            })}
          </Box>
        </Box>

        <Box>
          <Typography
            component="p"
            id="availability-times-heading"
            sx={availabilitySubLabelSx}
          >
            Times
          </Typography>
          <Box
            role="group"
            aria-labelledby="availability-times-heading"
            sx={{ display: 'flex', gap: 1 }}
          >
            {HOUR_TOGGLE_META.map((hour) => {
              const selected = selectedHours.includes(hour.value)
              return (
                <ToggleButton
                  key={hour.value}
                  value={hour.value}
                  selected={selected}
                  onChange={() => toggleValue(hour.value)}
                  aria-label={`${hour.title} ${hour.range}`}
                  aria-pressed={selected}
                  title={`${hour.title} (${hour.range})`}
                  disableRipple
                  sx={{
                    ...availabilityToggleSx,
                    flexDirection: 'column',
                    gap: 0.25,
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {hour.title}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      opacity: 0.75,
                      lineHeight: 1.2,
                    }}
                  >
                    {hour.range}
                  </Box>
                </ToggleButton>
              )
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

/** Centered filters modal using MUI Select, Checkbox, and Chip. */
export function FilterDrawer({
  open,
  draft,
  draftResultCount,
  openMenu,
  onClose,
  onDraftChange,
  onOpenMenuChange,
  onApply,
  onClear,
}: FilterDrawerProps) {
  const draftActive = countActiveFilters(draft) > 0

  function handleDialogKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.defaultPrevented) return
    const target = event.target as HTMLElement | null
    if (!target) return
    // Don't apply while typing in search / focused on a button.
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'BUTTON' ||
      target.getAttribute('role') === 'button'
    ) {
      return
    }
    event.preventDefault()
    onApply()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      transitionDuration={{ enter: 220, exit: 160 }}
      onKeyDown={handleDialogKeyDown}
      aria-labelledby="filters-dialog-title"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(33, 33, 33, 0.42)',
          },
        },
        paper: {
          sx: {
            borderRadius: 2,
            width: { xs: '100%', sm: '100%' },
            maxWidth: { xs: '100%', sm: 560 },
            m: { xs: 1.5, sm: 2 },
            height: 'auto',
            maxHeight: 'calc(100vh - 32px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          },
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: { xs: 2, sm: 3 },
          pt: 1.5,
          pb: 0.5,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Typography
          id="filters-dialog-title"
          component="h2"
          sx={{
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'text.primary',
          }}
        >
          Filters
        </Typography>
        <IconButton
          aria-label="Close filters"
          onClick={onClose}
          edge="end"
          sx={{
            width: 44,
            height: 44,
            color: 'icon.secondary',
            '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
          }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              fontSize: 26,
              lineHeight: 1,
              fontWeight: 300,
              display: 'block',
              mt: '-2px',
            }}
          >
            ×
          </Box>
        </IconButton>
      </Stack>

      <Stack
        spacing={2.5}
        sx={{
          px: { xs: 2, sm: 3 },
          pb: 2,
          pt: 2,
          overflow: 'auto',
          minHeight: 0,
          flex: 1,
        }}
      >
        <SingleFilterSelect
          label="Distance"
          options={DISTANCE_OPTIONS}
          value={draft.distance}
          open={openMenu === 'distance'}
          onOpen={() => onOpenMenuChange('distance')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(distance) =>
            onDraftChange({
              ...draft,
              distance: distance as ProviderFilters['distance'],
            })
          }
        />

        <AvailabilityFilterSelect
          values={draft.availability}
          onChange={(availability) =>
            onDraftChange({ ...draft, availability })
          }
        />

        <LanguageFilterSelect
          values={draft.languages}
          open={openMenu === 'language'}
          onOpen={() => onOpenMenuChange('language')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(languages) => onDraftChange({ ...draft, languages })}
        />

        <MultiFilterSelect
          label="Gender"
          options={GENDER_OPTIONS}
          values={draft.genders}
          open={openMenu === 'gender'}
          onOpen={() => onOpenMenuChange('gender')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(genders) => onDraftChange({ ...draft, genders })}
        />

        <MultiFilterSelect
          label="Tier Level"
          options={TIER_OPTIONS}
          values={draft.tiers}
          open={openMenu === 'tier'}
          onOpen={() => onOpenMenuChange('tier')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(tiers) => onDraftChange({ ...draft, tiers })}
        />
      </Stack>

      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)', flexShrink: 0 }} />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          bgcolor: 'background.paper',
        }}
      >
        <Button
          color="primary"
          onClick={onClear}
          disabled={!draftActive}
          sx={{ fontWeight: 500, px: 0, minWidth: 0 }}
        >
          Reset filters
        </Button>
        <Button
          variant="contained"
          onClick={onApply}
          sx={{ minWidth: 128, px: 2 }}
        >
          {draftResultCount === 0
            ? 'No providers match'
            : draftResultCount === 1
              ? 'Show 1 provider'
              : `Show ${draftResultCount} providers`}
        </Button>
      </Stack>
    </Dialog>
  )
}

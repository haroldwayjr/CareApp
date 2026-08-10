import { useMemo, useState, type KeyboardEvent, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
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
import { RiseTransition, RISE_DURATION_MS } from './RiseTransition'
import {
  AVAILABILITY_DAY_OPTIONS,
  AVAILABILITY_HOUR_OPTIONS,
  DISTANCE_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  TIER_OPTIONS,
  countActiveFilters,
  isAvailabilityDateValue,
  isAvailabilityHourValue,
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
/** RemovableFilterTag height — one chip row reserved in every filter field. */
const FILTER_CHIP_ROW_HEIGHT = 28
/**
 * Fixed field height with one chip row + vertical padding + borders.
 * Empty and selected states must share this height to avoid layout shift.
 */
const FILTER_FIELD_HEIGHT = 48
/** Header row reserves Clear button space in both states. */
const FILTER_HEADER_MIN_HEIGHT = 32

/** Same border as MUI outlined inputs (.MuiOutlinedInput-notchedOutline) in light mode. */
const outlinedFieldBorder = (theme: Theme) =>
  alpha(theme.palette.common.black, 0.23)

/** Match SearchFormBar outlined controls — fixed height for layout-stable filters. */
const selectSx = {
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: 0,
  bgcolor: 'background.paper',
  borderRadius: 1,
  height: FILTER_FIELD_HEIGHT,
  minHeight: FILTER_FIELD_HEIGHT,
  boxSizing: 'border-box' as const,
  '& .MuiSelect-select': {
    py: 0,
    px: 1.5,
    display: 'flex',
    alignItems: 'center',
    height: FILTER_FIELD_HEIGHT - 2,
    minHeight: FILTER_FIELD_HEIGHT - 2,
    maxHeight: FILTER_FIELD_HEIGHT - 2,
    boxSizing: 'border-box',
    overflow: 'hidden',
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
  color: 'text.secondary',
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
        fontSize: 16,
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
      sx={{
        mb: 0.5,
        minHeight: FILTER_HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FieldLabel id={labelId}>{label}</FieldLabel>
      {/* Always mounted — visibility toggled — so Clear never shifts layout. */}
      <Button
        size="small"
        onClick={onClear}
        disabled={!canClear}
        aria-label={clearLabel}
        tabIndex={canClear ? 0 : -1}
        sx={{
          minWidth: 48,
          px: 0.75,
          py: 0.25,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: 0,
          textTransform: 'none',
          visibility: canClear ? 'visible' : 'hidden',
          pointerEvents: canClear ? 'auto' : 'none',
        }}
      >
        Clear
      </Button>
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
        alignItems: 'center',
        gap: REMOVABLE_FILTER_TAG_GAP,
        // Stay within the fixed one-row field height; overflow scrolls.
        height: FILTER_CHIP_ROW_HEIGHT,
        maxHeight: FILTER_CHIP_ROW_HEIGHT,
        overflowX: 'auto',
        overflowY: 'hidden',
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
  /** When true, menu flips above the field if there isn’t room below (Tier Level). */
  smartMenuPlacement = false,
}: {
  label: string
  options: readonly string[]
  values: string[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChange: (next: string[]) => void
  smartMenuPlacement?: boolean
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
            ...(smartMenuPlacement
              ? {
                  // Last field sits above the sticky footer — open upward so Apply stays visible.
                  // Popover can still flip if there isn’t room above the field.
                  anchorOrigin: {
                    vertical: 'top' as const,
                    horizontal: 'left' as const,
                  },
                  transformOrigin: {
                    vertical: 'bottom' as const,
                    horizontal: 'left' as const,
                  },
                  marginThreshold: 8,
                  PaperProps: { sx: { maxHeight: 320 } },
                }
              : {}),
            slotProps: {
              paper: {
                sx: smartMenuPlacement
                  ? { ...menuPaperSx, maxHeight: 320 }
                  : menuPaperSx,
              },
              list: {
                id: listboxId,
                dense: true,
                role: 'listbox',
                'aria-multiselectable': true,
                'aria-labelledby': labelId,
                sx: {
                  py: 0.5,
                  maxHeight: smartMenuPlacement ? 320 : 280,
                },
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
  value: (typeof AVAILABILITY_HOUR_OPTIONS)[number]
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

/** Soft-selected standalone day toggles — full borders, no ToggleButtonGroup clipping. */
const availabilityDayToggleSx = {
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

/** Soft-selected standalone time toggles — full borders, no ToggleButtonGroup clipping. */
const availabilityTimeToggleSx = {
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
  flexDirection: 'column' as const,
  gap: 0.25,
  '&.Mui-selected': {
    color: 'text.primary',
    borderColor: 'primary.main',
    border: '1px solid',
    fontWeight: 500,
    boxShadow: (theme: Theme) =>
      `inset 0 0 0 1px ${theme.palette.primary.main}`,
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.05),
    '&:hover': {
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
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
  mt: 2,
  mb: 0.75,
  fontSize: 12,
  fontWeight: 500,
  color: 'text.primary',
  letterSpacing: '0.02em',
}

/**
 * Availability: Mon–Fri day toggles + multi-select time-of-day toggles.
 * Values are weekday names and/or hour option strings.
 */
function AvailabilityFilterSelect({
  values,
  onChange,
}: {
  values: string[]
  onChange: (next: string[]) => void
}) {
  const labelId = 'availability-label'
  const selectedDays = values.filter((value) =>
    (AVAILABILITY_DAY_OPTIONS as readonly string[]).includes(value),
  )
  const selectedHours = values.filter(isAvailabilityHourValue)

  function toggleValue(option: string) {
    // Drop any leftover ISO calendar dates from the previous picker.
    const cleaned = values.filter((value) => !isAvailabilityDateValue(value))
    onChange(
      cleaned.includes(option)
        ? cleaned.filter((item) => item !== option)
        : [...cleaned, option],
    )
  }

  return (
    <Box>
      <FieldHeader
        label="Availability"
        labelId={labelId}
        canClear={values.length > 0}
        clearLabel="Clear Availability"
        onClear={() => onChange([])}
      />

      <Typography
        component="p"
        id="availability-days-heading"
        sx={{ ...availabilitySubLabelSx, mt: 0 }}
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
              sx={availabilityDayToggleSx}
            >
              {DAY_SHORT_LABEL[day] ?? day}
            </ToggleButton>
          )
        })}
      </Box>

      <Typography
        component="p"
        sx={availabilitySubLabelSx}
      >
        Times
      </Typography>
      <Box
        role="group"
        aria-label="Time of day"
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
              sx={availabilityTimeToggleSx}
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
      keepMounted
      slots={{ transition: RiseTransition }}
      transitionDuration={{
        enter: RISE_DURATION_MS,
        exit: RISE_DURATION_MS,
      }}
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
          overflowY: 'auto',
          minHeight: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
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
          smartMenuPlacement
        />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: (theme) => theme.zIndex.tooltip,
          px: { xs: 2, sm: 3 },
          py: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          boxShadow: 3,
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

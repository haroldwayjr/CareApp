import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { filterChipSx, FilterChipDeleteIcon } from './filterChipSx.tsx'
import {
  AVAILABILITY_DAY_OPTIONS,
  AVAILABILITY_HOUR_OPTIONS,
  DISTANCE_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  TIER_OPTIONS,
  type ProviderFilters,
} from '../data/mockCareResults'

export type OpenFilterMenu =
  | 'gender'
  | 'tier'
  | 'distance'
  | 'language'
  | 'availability'
  | null

type FilterDrawerProps = {
  open: boolean
  draft: ProviderFilters
  openMenu: OpenFilterMenu
  onClose: () => void
  onDraftChange: (next: ProviderFilters) => void
  onOpenMenuChange: (menu: OpenFilterMenu) => void
  onApply: () => void
  onClear: () => void
}

const LANGUAGE_PREVIEW_COUNT = 8

const selectSx = {
  fontSize: 14,
  fontWeight: 400,
  bgcolor: 'background.paper',
  '& .MuiSelect-select': {
    py: 1.25,
    display: 'flex',
    alignItems: 'center',
    minHeight: 24,
  },
  '& .MuiSelect-icon': {
    fontSize: 28,
    right: 8,
    color: 'icon.secondary',
  },
} as const

const menuPaperSx = {
  borderRadius: 1,
  mt: 0.5,
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  border: 1,
  borderColor: 'divider',
} as const

const menuItemSx = {
  fontSize: 14,
  fontWeight: 400,
  py: 0.75,
  gap: 0.5,
} as const

const sectionHeaderSx = {
  lineHeight: '32px',
  fontSize: 13,
  fontWeight: 700,
  color: 'text.primary',
  bgcolor: 'background.paper',
  px: 2,
  py: 0.5,
  position: 'sticky',
  top: 0,
  zIndex: 1,
} as const

function FieldLabel({ children }: { children: string }) {
  return (
    <Typography
      component="label"
      sx={{
        mb: 1,
        display: 'block',
        fontSize: 14,
        fontWeight: 600,
        color: 'text.primary',
        lineHeight: 1.4,
      }}
    >
      {children}
    </Typography>
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
      <Typography
        component="span"
        sx={{ fontSize: 14, fontWeight: 400, color: 'text.secondary' }}
      >
        Any
      </Typography>
    )
  }
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
      {selected.map((value) => (
        <Chip
          key={value}
          size="small"
          label={value}
          deleteIcon={<FilterChipDeleteIcon />}
          onDelete={() => onChange(selected.filter((item) => item !== value))}
          onMouseDown={(event) => {
            event.stopPropagation()
            event.preventDefault()
          }}
          sx={filterChipSx}
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
  function handleChange(event: SelectChangeEvent<string[]>) {
    const next = event.target.value
    onChange(typeof next === 'string' ? next.split(',') : next)
  }

  return (
    <Box>
      <FieldLabel>{label}</FieldLabel>
      <FormControl fullWidth size="small">
        <Select
          multiple
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={selectSx}
          renderValue={(selected) => (
            <SelectedChips selected={selected} onChange={onChange} />
          )}
          MenuProps={{
            disableScrollLock: true,
            slotProps: {
              paper: { sx: menuPaperSx },
              list: { dense: true, sx: { py: 0.5, maxHeight: 280 } },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={menuItemSx}>
              <Checkbox
                size="small"
                checked={values.includes(option)}
                sx={{ p: 0.75 }}
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
  return (
    <Box>
      <FieldLabel>{label}</FieldLabel>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          input={<OutlinedInput />}
          sx={{
            ...selectSx,
            color:
              value === 'Best Nearby' || value === 'Any'
                ? 'text.secondary'
                : 'text.primary',
          }}
          MenuProps={{
            disableScrollLock: true,
            slotProps: {
              paper: { sx: menuPaperSx },
              list: { dense: true, sx: { py: 0.5 } },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={menuItemSx}>
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
      <FieldLabel>Language</FieldLabel>
      <FormControl fullWidth size="small">
        <Select
          multiple
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={handleClose}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput />}
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
              <MenuItem key={option} value={option} sx={menuItemSx}>
                <Checkbox
                  size="small"
                  checked={values.includes(option)}
                  sx={{ p: 0.75 }}
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

/**
 * Availability as grouped days + hours (matches care filter pattern).
 * Selections update draft immediately; dialog Apply commits filters.
 */
function AvailabilityFilterSelect({
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
  function handleChange(event: SelectChangeEvent<string[]>) {
    const next = event.target.value
    onChange(typeof next === 'string' ? next.split(',') : next)
  }

  function renderOption(option: string) {
    return (
      <MenuItem key={option} value={option} sx={menuItemSx}>
        <Checkbox
          size="small"
          checked={values.includes(option)}
          sx={{ p: 0.75 }}
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
    )
  }

  return (
    <Box>
      <FieldLabel>Availability</FieldLabel>
      <FormControl fullWidth size="small">
        <Select
          multiple
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={values}
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={selectSx}
          renderValue={(selected) => (
            <SelectedChips selected={selected} onChange={onChange} />
          )}
          MenuProps={{
            disableScrollLock: true,
            slotProps: {
              paper: {
                sx: {
                  ...menuPaperSx,
                  maxWidth: 360,
                },
              },
              list: {
                dense: true,
                sx: { py: 0.5, maxHeight: 420, overflow: 'auto' },
                subheader: <li />,
              },
            },
          }}
        >
          <ListSubheader sx={sectionHeaderSx}>by Days:</ListSubheader>
          {AVAILABILITY_DAY_OPTIONS.map(renderOption)}
          <ListSubheader sx={{ ...sectionHeaderSx, mt: 0.5 }}>
            by Hours:
          </ListSubheader>
          {AVAILABILITY_HOUR_OPTIONS.map(renderOption)}
        </Select>
      </FormControl>
    </Box>
  )
}

/** Centered filters modal using MUI Select, Checkbox, and Chip. */
export function FilterDrawer({
  open,
  draft,
  openMenu,
  onClose,
  onDraftChange,
  onOpenMenuChange,
  onApply,
  onClear,
}: FilterDrawerProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      transitionDuration={{ enter: 220, exit: 160 }}
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
            maxWidth: { xs: '100%', sm: 480 },
            m: { xs: 1.5, sm: 2 },
            height: 'auto',
            maxHeight: 'calc(100vh - 32px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            overflow: 'visible',
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
          pt: 2.5,
          pb: 1.5,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
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
            width: 40,
            height: 40,
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
        sx={{ px: { xs: 2, sm: 3 }, pb: 3, pt: 0.5, overflow: 'auto' }}
      >
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

        <LanguageFilterSelect
          values={draft.languages}
          open={openMenu === 'language'}
          onOpen={() => onOpenMenuChange('language')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(languages) => onDraftChange({ ...draft, languages })}
        />

        <AvailabilityFilterSelect
          values={draft.availability}
          open={openMenu === 'availability'}
          onOpen={() => onOpenMenuChange('availability')}
          onClose={() => onOpenMenuChange(null)}
          onChange={(availability) =>
            onDraftChange({ ...draft, availability })
          }
        />
      </Stack>

      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />

      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          color="primary"
          onClick={onClear}
          sx={{ fontWeight: 500, px: 0, minWidth: 0 }}
        >
          Reset filters
        </Button>
        <Button variant="contained" onClick={onApply} sx={{ minWidth: 96 }}>
          Apply
        </Button>
      </Stack>
    </Dialog>
  )
}

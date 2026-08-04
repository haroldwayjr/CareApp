import { useMemo, useRef, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import {
  ADDRESS_OPTIONS,
  FILTER_BY_OPTIONS,
  getSearchSuggestions,
  INSURANCE_OPTIONS,
} from '../data/mockCareResults'

/** Matches MUI `size="small"` outlined TextField / Select height. */
export const SEARCH_CONTROL_HEIGHT = 40

/** Outline fieldset sits on top of the control; let clicks reach the input/select beneath. */
const outlinedHitAreaSx = {
  '& .MuiOutlinedInput-notchedOutline': { pointerEvents: 'none' },
} as const

type OpenSelect = 'address' | 'insurance' | 'filterBy' | null

/** Open after the current pointer event finishes so the menu isn't immediately closed. */
function scheduleOpenSelect(
  setOpenSelect: (value: OpenSelect) => void,
  next: OpenSelect,
) {
  window.setTimeout(() => setOpenSelect(next), 0)
}

export type SearchFormValues = {
  address: string
  insurance: string
  filterBy: string
  searchTerm: string
}

type SearchFormBarProps = {
  values: SearchFormValues
  onChange: (values: SearchFormValues) => void
  onSearch: () => void
}

export function SearchFormBar({ values, onChange, onSearch }: SearchFormBarProps) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [openSelect, setOpenSelect] = useState<OpenSelect>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const canSearch = values.searchTerm.trim().length > 0

  const suggestions = useMemo(
    () => getSearchSuggestions(values.filterBy, values.searchTerm),
    [values.filterBy, values.searchTerm],
  )

  const showSuggestions = suggestionsOpen && suggestions.length > 0

  function patch(partial: Partial<SearchFormValues>) {
    onChange({ ...values, ...partial })
  }

  function clearSearch(event?: MouseEvent) {
    event?.stopPropagation()
    patch({ searchTerm: '' })
    setSuggestionsOpen(false)
  }

  function selectSuggestion(option: string) {
    patch({ searchTerm: option })
    setSuggestionsOpen(false)
  }

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: 'center', width: '100%' }}
    >
      <FormControl size="small" sx={{ flex: 1, minWidth: 0, ...outlinedHitAreaSx }}>
        <InputLabel
          shrink
          id="address-label"
          sx={{ cursor: 'pointer' }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            scheduleOpenSelect(setOpenSelect, 'address')
          }}
        >
          Address
        </InputLabel>
        <Select
          labelId="address-label"
          label="Address"
          notched
          open={openSelect === 'address'}
          onOpen={() => setOpenSelect('address')}
          onClose={() => setOpenSelect(null)}
          value={values.address}
          onChange={(event) => patch({ address: event.target.value })}
          sx={{ height: SEARCH_CONTROL_HEIGHT }}
        >
          {ADDRESS_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ flex: 1, minWidth: 0, ...outlinedHitAreaSx }}>
        <InputLabel
          shrink
          id="insurance-label"
          sx={{ cursor: 'pointer' }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            scheduleOpenSelect(setOpenSelect, 'insurance')
          }}
        >
          Available insurance plans
        </InputLabel>
        <Select
          labelId="insurance-label"
          label="Available insurance plans"
          notched
          open={openSelect === 'insurance'}
          onOpen={() => setOpenSelect('insurance')}
          onClose={() => setOpenSelect(null)}
          value={values.insurance}
          onChange={(event) => patch({ insurance: event.target.value })}
          sx={{ height: SEARCH_CONTROL_HEIGHT }}
        >
          {INSURANCE_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ flex: 1, minWidth: 0, ...outlinedHitAreaSx }}>
        <InputLabel
          shrink
          id="filter-by-label"
          sx={{ cursor: 'pointer' }}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
            scheduleOpenSelect(setOpenSelect, 'filterBy')
          }}
        >
          Filter by
        </InputLabel>
        <Select
          labelId="filter-by-label"
          label="Filter by"
          notched
          open={openSelect === 'filterBy'}
          onOpen={() => setOpenSelect('filterBy')}
          onClose={() => setOpenSelect(null)}
          value={values.filterBy}
          onChange={(event) => {
            patch({ filterBy: event.target.value, searchTerm: '' })
            setSuggestionsOpen(false)
          }}
          sx={{ height: SEARCH_CONTROL_HEIGHT }}
        >
          {FILTER_BY_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ClickAwayListener onClickAway={() => setSuggestionsOpen(false)}>
        <Box ref={searchWrapRef} sx={{ flex: 1, minWidth: 0, position: 'relative' }}>
          <TextField
            id="search-term"
            size="small"
            fullWidth
            label="Search term"
            placeholder="Enter search term"
            value={values.searchTerm}
            onChange={(event) => {
              const next = event.target.value
              patch({ searchTerm: next })
              setSuggestionsOpen(next.trim().length > 0)
            }}
            onFocus={() => {
              if (suggestions.length > 0) setSuggestionsOpen(true)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && canSearch) {
                setSuggestionsOpen(false)
                onSearch()
              }
              if (event.key === 'Escape') setSuggestionsOpen(false)
            }}
            sx={{
              ...outlinedHitAreaSx,
              '& .MuiOutlinedInput-root': {
                height: SEARCH_CONTROL_HEIGHT,
                cursor: 'text',
              },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
                htmlFor: 'search-term',
                sx: { cursor: 'pointer' },
              },
              htmlInput: {
                id: 'search-term',
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ pointerEvents: 'none' }}>
                    <AppIcon name="search" sx={{ fontSize: 18 }} color="action" />
                  </InputAdornment>
                ),
                endAdornment: values.searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear search term"
                      size="small"
                      edge="end"
                      // Keep focus from leaving the field before click fires.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={clearSearch}
                    >
                      <BoxCloseIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />

          {showSuggestions ? (
            <Paper
              elevation={3}
              sx={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                zIndex: 20,
                borderRadius: 1,
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {suggestions.map((option) => (
                  <Box
                    key={option}
                    component="li"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSuggestion(option)}
                    sx={{
                      px: 2,
                      py: 1.25,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14, letterSpacing: 0, color: 'text.primary' }}
                    >
                      {option}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          ) : null}
        </Box>
      </ClickAwayListener>

      <Button
        variant="outlined"
        color="primary"
        disabled={!canSearch}
        onClick={onSearch}
        sx={{
          height: SEARCH_CONTROL_HEIGHT,
          minHeight: SEARCH_CONTROL_HEIGHT,
          px: 2,
          flexShrink: 0,
        }}
      >
        Search
      </Button>
    </Stack>
  )
}

/** Minimal clear “×” matching the compact field chrome. */
function BoxCloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M3.5 3.5l7 7m0-7l-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function defaultSearchFormValues(): SearchFormValues {
  return {
    address: ADDRESS_OPTIONS[0],
    insurance: INSURANCE_OPTIONS[0],
    filterBy: FILTER_BY_OPTIONS[0],
    searchTerm: '',
  }
}

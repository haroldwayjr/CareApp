import { useMemo, useRef, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
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
import {
  SEARCH_CONTROL_HEIGHT,
  SOMA_BORDER_HAIRLINE,
  SomaFieldShell,
  SomaSelectField,
} from './SomaField'

export { SEARCH_CONTROL_HEIGHT }

type OpenSelect = 'address' | 'insurance' | 'filterBy' | null

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

const fieldFlexSx = {
  flex: { xs: '1 1 auto', md: 1 },
  width: { xs: '100%', md: 'auto' },
  minWidth: 0,
} as const

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
      direction={{ xs: 'column', md: 'row' }}
      spacing={1.5}
      useFlexGap
      sx={{
        alignItems: { xs: 'stretch', md: 'flex-end' },
        width: '100%',
        flexWrap: { md: 'nowrap' },
      }}
    >
      <SomaSelectField
        id="address"
        label="Address"
        value={values.address}
        options={ADDRESS_OPTIONS}
        open={openSelect === 'address'}
        onOpen={() => setOpenSelect('address')}
        onClose={() => setOpenSelect(null)}
        onChange={(address) => patch({ address })}
        sx={fieldFlexSx}
      />

      <SomaSelectField
        id="insurance"
        label="Available insurance plans"
        value={values.insurance}
        options={INSURANCE_OPTIONS}
        open={openSelect === 'insurance'}
        onOpen={() => setOpenSelect('insurance')}
        onClose={() => setOpenSelect(null)}
        onChange={(insurance) => patch({ insurance })}
        sx={fieldFlexSx}
      />

      <SomaSelectField
        id="filter-by"
        label="Filter by"
        value={values.filterBy}
        options={FILTER_BY_OPTIONS}
        open={openSelect === 'filterBy'}
        onOpen={() => setOpenSelect('filterBy')}
        onClose={() => setOpenSelect(null)}
        onChange={(filterBy) => {
          patch({ filterBy, searchTerm: '' })
          setSuggestionsOpen(false)
        }}
        sx={fieldFlexSx}
      />

      <ClickAwayListener onClickAway={() => setSuggestionsOpen(false)}>
        <Box
          ref={searchWrapRef}
          sx={{
            ...fieldFlexSx,
            position: 'relative',
          }}
        >
          <SomaFieldShell label="Search term" labelId="search-term-label">
            <TextField
              id="search-term"
              size="small"
              fullWidth
              hiddenLabel
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
              aria-labelledby="search-term-label"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: SEARCH_CONTROL_HEIGHT,
                  borderRadius: '8px',
                  cursor: 'text',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: SOMA_BORDER_HAIRLINE,
                    borderWidth: 1,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'text.secondary',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 1,
                  },
                },
                '& .MuiOutlinedInput-input': {
                  fontSize: 14,
                  py: 0,
                  height: SEARCH_CONTROL_HEIGHT,
                  boxSizing: 'border-box',
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ pointerEvents: 'none' }}>
                      <AppIcon
                        name="search"
                        sx={{ fontSize: 18, color: 'icon.secondary' }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: values.searchTerm ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clear search term"
                        size="small"
                        edge="end"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={clearSearch}
                        sx={{ color: 'icon.tertiary' }}
                      >
                        <BoxCloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                },
              }}
            />
          </SomaFieldShell>

          {showSuggestions ? (
            <Paper
              elevation={0}
              sx={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                zIndex: 20,
                borderRadius: '8px',
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                boxShadow: '0 4px 16px rgba(16,29,56,0.12)',
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
          width: { xs: '100%', md: 'auto' },
          borderRadius: 100,
        }}
      >
        Search
      </Button>
    </Stack>
  )
}

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

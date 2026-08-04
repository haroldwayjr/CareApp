import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Select from '@mui/material/Select'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from './icons/AppIcon'
import { AppShell } from './components/AppShell'
import { CareResultCard } from './components/CareResultCard'
import { CareResultCardSkeleton } from './components/CareResultCardSkeleton'
import { FilterDrawer, type OpenFilterMenu } from './components/FilterDrawer'
import { filterChipSx, FilterChipDeleteIcon } from './components/filterChipSx.tsx'
import { ProviderOverviewDrawer } from './components/ProviderOverviewDrawer'
import { ResultsMap } from './components/ResultsMap'
import {
  APP_SHELL_HEIGHT,
  RESULTS_TOOLBAR_OFFSET,
  ResultsBackHeader,
  ResultsPageChrome,
} from './components/ResultsPageChrome'
import { SearchLanding } from './components/SearchLanding'
import {
  defaultSearchFormValues,
  SearchFormBar,
  type SearchFormValues,
} from './components/SearchFormBar'
import {
  buildFilterChips,
  countActiveFilters,
  emptyFilters,
  filterProviders,
  mockProviders,
  removeFilterChip,
  sortProviders,
  type ProviderFilters,
} from './data/mockCareResults'

type View = 'home' | 'results'

/** Simulated fetch delay after Search so the skeleton can be perceived. */
const SEARCH_LOADING_MS = 750

export default function App() {
  const [view, setView] = useState<View>('home')
  const [formValues, setFormValues] = useState<SearchFormValues>(
    defaultSearchFormValues,
  )
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('')
  const [resultsLoading, setResultsLoading] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<OpenFilterMenu>(null)
  const [draftFilters, setDraftFilters] =
    useState<ProviderFilters>(emptyFilters)
  const [appliedFilters, setAppliedFilters] =
    useState<ProviderFilters>(emptyFilters)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [overviewId, setOverviewId] = useState<string | null>(null)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [listedIds, setListedIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Best match')
  const [page, setPage] = useState(1)
  const loadingTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current != null) {
        window.clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  const visibleResults = useMemo(() => {
    const filtered = filterProviders(
      mockProviders,
      appliedFilters,
      appliedSearchTerm,
    )
    return sortProviders(filtered, sortBy)
  }, [appliedFilters, appliedSearchTerm, sortBy])
  const activeCount = countActiveFilters(appliedFilters)
  const chips = buildFilterChips(appliedFilters)
  const isFiltered = activeCount > 0

  function goHome() {
    if (loadingTimeoutRef.current != null) {
      window.clearTimeout(loadingTimeoutRef.current)
      loadingTimeoutRef.current = null
    }
    setResultsLoading(false)
    setView('home')
    setDrawerOpen(false)
    setOpenMenu(null)
    setSelectedId(null)
    setOverviewId(null)
    setOverviewOpen(false)
  }

  const overviewProvider =
    overviewId == null
      ? null
      : (visibleResults.find((result) => result.id === overviewId) ??
        mockProviders.find((result) => result.id === overviewId) ??
        null)

  function openProviderOverview(id: string) {
    setSelectedId(id)
    setOverviewId(id)
    setOverviewOpen(true)
  }

  function closeProviderOverview() {
    setOverviewOpen(false)
    setSelectedId(null)
  }

  function openFilters(menu: OpenFilterMenu = null) {
    setDraftFilters(appliedFilters)
    setOpenMenu(menu)
    setDrawerOpen(true)
  }

  function closeFilters() {
    setDrawerOpen(false)
    setOpenMenu(null)
  }

  function applyFilters() {
    setAppliedFilters(draftFilters)
    setDrawerOpen(false)
    setOpenMenu(null)
    setSelectedId(null)
    setPage(1)
  }

  function resetAllFilters() {
    setDraftFilters(emptyFilters)
    setAppliedFilters(emptyFilters)
    setOpenMenu(null)
    setSelectedId(null)
    setPage(1)
  }

  function toggleListed(id: string) {
    const match = mockProviders.find((item) => item.id === id)
    const name = match?.name ?? 'Provider'
    const removing = listedIds.includes(id)
    setListedIds((current) =>
      removing ? current.filter((item) => item !== id) : [...current, id],
    )
    setToast(
      removing
        ? `Prototype only — ${name} removed from list.`
        : `Prototype only — ${name} added to list.`,
    )
  }

  function handleSearch() {
    if (loadingTimeoutRef.current != null) {
      window.clearTimeout(loadingTimeoutRef.current)
    }

    setAppliedSearchTerm(formValues.searchTerm)
    setAppliedFilters(emptyFilters)
    setDraftFilters(emptyFilters)
    setSelectedId(null)
    setOverviewOpen(false)
    setOverviewId(null)
    setPage(1)
    setResultsLoading(true)
    setView('results')

    loadingTimeoutRef.current = window.setTimeout(() => {
      setResultsLoading(false)
      loadingTimeoutRef.current = null
    }, SEARCH_LOADING_MS)
  }

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <AppShell
        onBrandClick={goHome}
        onNavClick={(item) => {
          if (item === 'Search') goHome()
          else setToast(`Prototype only — ${item} is not connected.`)
        }}
      />

      {view === 'home' ? (
        <Box
          key="home"
          className="enter-fade-up-delay"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
        >
          <SearchLanding
            values={formValues}
            onChange={setFormValues}
            onSearch={handleSearch}
            onBack={goHome}
          />
        </Box>
      ) : (
        <Box
          key="results"
          className="enter-fade-up-delay"
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
        >
          <ResultsPageChrome
            header={<ResultsBackHeader onBack={goHome} />}
            search={
              <SearchFormBar
                values={formValues}
                onChange={setFormValues}
                onSearch={handleSearch}
              />
            }
            searchTerm={appliedSearchTerm}
            resultCount={visibleResults.length}
            loading={resultsLoading}
            actions={
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 2 }}
                sx={{
                  alignItems: 'center',
                  flexShrink: 0,
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ alignItems: 'center' }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                      color: 'text.primary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sort By:
                  </Typography>
                  <Select
                    variant="standard"
                    disableUnderline
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    inputProps={{ 'aria-label': 'Sort by' }}
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                      color: 'text.secondary',
                      '& .MuiSelect-select': {
                        py: 0.5,
                        pr: '24px !important',
                        pl: 0,
                        display: 'flex',
                        alignItems: 'center',
                      },
                      '& .MuiSelect-icon': {
                        color: 'text.primary',
                        right: 0,
                      },
                    }}
                  >
                    <MenuItem value="Best match">Best match</MenuItem>
                    <MenuItem value="Distance">Distance</MenuItem>
                    <MenuItem value="Quality">Quality</MenuItem>
                  </Select>
                </Stack>
                <Button
                  variant="outlined"
                  startIcon={
                    <AppIcon
                      name="filter"
                      sx={{ fontSize: 18, color: 'text.primary' }}
                    />
                  }
                  onClick={() => openFilters()}
                  aria-label={
                    activeCount > 0
                      ? `Filters, ${activeCount} applied`
                      : 'Filters'
                  }
                  sx={{
                    borderRadius: 1,
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                    color: 'text.primary',
                    fontWeight: 400,
                    fontSize: 14,
                    letterSpacing: 0,
                    px: 1.5,
                    py: 0.75,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'rgba(0, 0, 0, 0.87)',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  Filters
                  {activeCount > 0 ? (
                    <Box
                      component="span"
                      aria-hidden
                      sx={{
                        ml: 1,
                        minWidth: 20,
                        height: 20,
                        px: 0.5,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {activeCount}
                    </Box>
                  ) : null}
                </Button>
              </Stack>
            }
            chips={
              isFiltered ? (
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: 'wrap', alignItems: 'center' }}
                >
                  {chips.map((chip) => (
                    <Chip
                      key={chip.id}
                      label={chip.label}
                      size="small"
                      deleteIcon={<FilterChipDeleteIcon />}
                      onDelete={() => {
                        setAppliedFilters((current) =>
                          removeFilterChip(current, chip.id),
                        )
                        setPage(1)
                      }}
                      sx={filterChipSx}
                    />
                  ))}
                  <Button
                    size="small"
                    color="primary"
                    onClick={resetAllFilters}
                    sx={{ fontSize: 12, fontWeight: 500 }}
                  >
                    Reset filters
                  </Button>
                </Stack>
              ) : null
            }
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  lg: 'minmax(0, 856fr) minmax(280px, 520fr)',
                },
                gap: 2,
                alignItems: 'start',
                flex: 1,
              }}
            >
              <Stack spacing={2} onClick={() => setSelectedId(null)} sx={{ minHeight: 120, minWidth: 0 }}>
                {resultsLoading ? (
                  <CareResultCardSkeleton count={4} />
                ) : (
                  <>
                    {visibleResults.map((result, index) => (
                      <CareResultCard
                        key={result.id}
                        result={result}
                        index={index + 1}
                        highlighted={selectedId === result.id}
                        inList={listedIds.includes(result.id)}
                        onSelect={openProviderOverview}
                        onCopyName={(label) =>
                          setToast(`Copied details for ${label} to clipboard.`)
                        }
                        onToggleList={toggleListed}
                      />
                    ))}

                    {visibleResults.length === 0 ? (
                      <Box
                        sx={{
                          p: { xs: 2.5, sm: 4 },
                          textAlign: 'center',
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          No providers match these filters
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          Reset or adjust filters to update the list and map.
                        </Typography>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          sx={{ justifyContent: 'center' }}
                        >
                          <Button onClick={resetAllFilters}>Reset filters</Button>
                          <Button variant="contained" onClick={() => openFilters()}>
                            Adjust filters
                          </Button>
                        </Stack>
                      </Box>
                    ) : null}
                  </>
                )}
              </Stack>

              <Box sx={{ minWidth: 0 }}>
                <ResultsMap
                  results={resultsLoading ? [] : visibleResults}
                  selectedId={resultsLoading ? null : selectedId}
                  onSelect={setSelectedId}
                  stickyTop={APP_SHELL_HEIGHT + RESULTS_TOOLBAR_OFFSET}
                />
              </Box>
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                pt: 1,
              }}
            >
              <Pagination
                count={Math.max(1, Math.ceil(visibleResults.length / 10) || 7)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
              />
              <Typography variant="body2" color="text.secondary">
                Providers per page: 10
              </Typography>
            </Stack>
          </ResultsPageChrome>
        </Box>
      )}

      <FilterDrawer
        open={drawerOpen}
        draft={draftFilters}
        openMenu={openMenu}
        onClose={closeFilters}
        onDraftChange={setDraftFilters}
        onOpenMenuChange={setOpenMenu}
        onApply={applyFilters}
        onClear={() => setDraftFilters(emptyFilters)}
      />

      <ProviderOverviewDrawer
        open={overviewOpen}
        provider={overviewProvider}
        onClose={closeProviderOverview}
        onExited={() => setOverviewId(null)}
        onCopyName={(label) =>
          setToast(`Copied name for ${label} to clipboard.`)
        }
      />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

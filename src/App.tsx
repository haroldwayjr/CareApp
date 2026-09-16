import { useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
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
import { IncludedHealthPlanKey } from './components/IncludedHealthPlanKey'
import {
  RemovableFilterChip,
  REMOVABLE_FILTER_CHIP_GAP,
} from './components/RemovableFilterChip'
import { ProviderOverviewDrawer } from './components/ProviderOverviewDrawer'
import { SendToMemberDialog } from './components/SendToMemberDialog'
import { ResultsMap } from './components/ResultsMap'
import {
  APP_SHELL_HEIGHT,
  RESULTS_CONTENT_TOP_GAP,
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
  SomaMenuRadio,
  somaMenuItemSx,
  somaMenuPaperSlotProps,
} from './components/SomaField'
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

/** Simulated fetch delay after Search so the key + soft skeleton can settle. */
const SEARCH_LOADING_MS = 1100

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50] as const

const SORT_OPTIONS = ['Best match', 'Distance', 'Quality'] as const

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
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('Best match')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(10)
  const [resultsToolbarHeight, setResultsToolbarHeight] = useState(
    RESULTS_TOOLBAR_OFFSET,
  )
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
  const draftPreviewCount = useMemo(
    () =>
      filterProviders(mockProviders, draftFilters, appliedSearchTerm).length,
    [draftFilters, appliedSearchTerm],
  )
  const pageCount = Math.max(1, Math.ceil(visibleResults.length / pageSize))
  const pagedResults = useMemo(() => {
    const start = (page - 1) * pageSize
    return visibleResults.slice(start, start + pageSize)
  }, [visibleResults, page, pageSize])
  const activeCount = countActiveFilters(appliedFilters)
  const chips = buildFilterChips(appliedFilters)
  const isFiltered = activeCount > 0
  const mapStickyTop =
    APP_SHELL_HEIGHT + resultsToolbarHeight + RESULTS_CONTENT_TOP_GAP
  const listedProviders = useMemo(
    () =>
      listedIds
        .map((id) => mockProviders.find((p) => p.id === id))
        .filter((p): p is (typeof mockProviders)[number] => p != null),
    [listedIds],
  )

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount))
  }, [pageCount])

  function removeAppliedChip(chipId: string) {
    setAppliedFilters((current) => {
      const next = removeFilterChip(current, chipId)
      if (drawerOpen) {
        setDraftFilters(next)
      }
      return next
    })
    setPage(1)
  }

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
    setListedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function clearListed() {
    setListedIds([])
  }

  function handleSendToMember(email: string) {
    setSendDialogOpen(false)
    setToast(`Prototype only — list sent to ${email}.`)
    setListedIds([])
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
        onPrototypeAction={setToast}
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
            onToolbarHeightChange={setResultsToolbarHeight}
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
                      color: 'text.secondary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {'Sort:'}
                  </Typography>
                  <Select
                    variant="standard"
                    disableUnderline
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    inputProps={{ 'aria-label': 'Sort by' }}
                    renderValue={(selected) => (
                      <Typography
                        component="span"
                        sx={{
                          fontSize: 14,
                          fontWeight: 400,
                          letterSpacing: 0,
                          color: 'text.primary',
                        }}
                      >
                        {selected}
                      </Typography>
                    )}
                    sx={{
                      fontSize: 14,
                      fontWeight: 400,
                      letterSpacing: 0,
                      color: 'text.primary',
                      '& .MuiSelect-select': {
                        py: 0.5,
                        pr: '24px !important',
                        pl: 0,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary',
                      },
                      '& .MuiSelect-icon': {
                        color: 'text.primary',
                        right: 0,
                      },
                    }}
                    MenuProps={{
                      disableScrollLock: true,
                      slotProps: {
                        paper: somaMenuPaperSlotProps,
                        list: {
                          dense: true,
                          role: 'listbox',
                          'aria-label': 'Sort by',
                          sx: { py: 0 },
                        },
                      },
                    }}
                  >
                    {SORT_OPTIONS.map((option) => {
                      const selected = sortBy === option
                      return (
                        <MenuItem
                          key={option}
                          value={option}
                          role="option"
                          aria-selected={selected}
                          selected={selected}
                          disableGutters
                          sx={somaMenuItemSx}
                        >
                          <SomaMenuRadio selected={selected} />
                          <Typography
                            component="span"
                            sx={{
                              flex: 1,
                              fontSize: 14,
                              fontWeight: 500,
                              lineHeight: '20px',
                              letterSpacing: 0,
                              color: 'text.primary',
                            }}
                          >
                            {option}
                          </Typography>
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Stack>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <IconButton
                    color="primary"
                    onClick={() => openFilters()}
                    aria-label={
                      activeCount > 0
                        ? `Filters, ${activeCount} applied`
                        : 'Filters'
                    }
                    aria-haspopup="dialog"
                    aria-expanded={drawerOpen}
                    sx={{
                      width: 40,
                      height: 40,
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: '50%',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'rgba(0, 35, 128, 0.04)' },
                    }}
                  >
                    <AppIcon
                      name="filter"
                      sx={{ fontSize: 18, color: 'inherit' }}
                    />
                  </IconButton>
                  {activeCount > 0 ? (
                    <Box
                      component="span"
                      aria-hidden
                      sx={{
                        position: 'absolute',
                        top: -6,
                        right: -8,
                        minWidth: 18,
                        height: 18,
                        px: 0.5,
                        borderRadius: 10,
                        bgcolor: 'primary.main',
                        color: '#fff',
                        fontSize: 11,
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
                </Box>
              </Stack>
            }
            chips={
              isFiltered ? (
                <Stack
                  direction="row"
                  useFlexGap
                  sx={{
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: REMOVABLE_FILTER_CHIP_GAP,
                  }}
                >
                  {chips.map((chip) => (
                    <RemovableFilterChip
                      key={chip.id}
                      label={chip.label}
                      onDelete={() => removeAppliedChip(chip.id)}
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
              <Stack
                spacing={2}
                useFlexGap
                onClick={() => setSelectedId(null)}
                sx={{ minHeight: 120, minWidth: 0 }}
              >
                <Box
                  sx={{ display: { xs: 'block', lg: 'none' } }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <IncludedHealthPlanKey variant="banner" />
                </Box>

                {resultsLoading ? (
                  <Box className="results-soft-enter" sx={{ opacity: 0.72 }}>
                    <CareResultCardSkeleton count={3} />
                  </Box>
                ) : (
                  <Stack spacing={2} className="results-soft-enter">
                    {pagedResults.map((result, index) => (
                      <CareResultCard
                        key={result.id}
                        result={result}
                        index={(page - 1) * pageSize + index + 1}
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
                          py: { xs: 2.5, sm: 4 },
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{ fontWeight: 600, color: 'text.primary' }}
                        >
                          No providers match these filters
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Clear or adjust filters to update the list and map.
                        </Typography>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1.5}
                          sx={{ justifyContent: 'center', mt: 2 }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={resetAllFilters}
                          >
                            Clear filters
                          </Button>
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => openFilters()}
                          >
                            Adjust filters
                          </Button>
                        </Stack>
                      </Box>
                    ) : null}
                  </Stack>
                )}
              </Stack>

              <Stack
                spacing={2}
                useFlexGap
                sx={{
                  minWidth: 0,
                  position: { lg: 'sticky' },
                  top: { lg: mapStickyTop },
                  height: { lg: `calc(100dvh - ${mapStickyTop}px)` },
                  maxHeight: { lg: `calc(100dvh - ${mapStickyTop}px)` },
                  alignSelf: { lg: 'start' },
                }}
              >
                <Box
                  sx={{ display: { xs: 'none', lg: 'block' }, flexShrink: 0 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <IncludedHealthPlanKey variant="sidebar" />
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    minHeight: { xs: 280, sm: 360, lg: 0 },
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <ResultsMap
                    results={resultsLoading ? [] : pagedResults}
                    selectedId={resultsLoading ? null : selectedId}
                    onSelect={setSelectedId}
                    stickyTop={mapStickyTop}
                    indexOffset={(page - 1) * pageSize}
                    fillParent
                  />
                </Box>
              </Stack>
            </Box>

            {listedIds.length > 0 ? (
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{
                  // Full-width sticky footer — page-level send action stays visible while scrolling.
                  position: 'sticky',
                  bottom: 0,
                  zIndex: 9,
                  alignItems: { xs: 'stretch', sm: 'center' },
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  mt: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: '8px',
                  bgcolor: 'background.paper',
                  boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 500, letterSpacing: 0 }}>
                  {listedIds.length}{' '}
                  {listedIds.length === 1 ? 'provider' : 'providers'} selected
                </Typography>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    alignItems: 'center',
                    justifyContent: { xs: 'flex-end', sm: 'flex-end' },
                  }}
                >
                  <Button
                    onClick={clearListed}
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: 0,
                      textTransform: 'none',
                      color: 'text.secondary',
                      minWidth: 0,
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSendDialogOpen(true)}
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: 0,
                      textTransform: 'none',
                      px: 2,
                    }}
                  >
                    Send to member
                  </Button>
                </Stack>
              </Stack>
            ) : null}

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
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
                disabled={resultsLoading || visibleResults.length === 0}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}
              >
                <Typography
                  component="label"
                  htmlFor="providers-per-page"
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Providers per page:
                </Typography>
                <Select
                  id="providers-per-page"
                  size="small"
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(
                      Number(event.target.value) as (typeof PAGE_SIZE_OPTIONS)[number],
                    )
                    setPage(1)
                  }}
                  inputProps={{ 'aria-label': 'Providers per page' }}
                  sx={{
                    minWidth: 72,
                    fontSize: 14,
                    letterSpacing: 0,
                    '& .MuiSelect-select': {
                      py: 0.75,
                    },
                  }}
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Stack>
          </ResultsPageChrome>
        </Box>
      )}

      <FilterDrawer
        open={drawerOpen}
        draft={draftFilters}
        draftResultCount={draftPreviewCount}
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
          setToast(`Copied details for ${label} to clipboard.`)
        }
      />

      <SendToMemberDialog
        open={sendDialogOpen}
        providers={listedProviders}
        onClose={() => setSendDialogOpen(false)}
        onSend={handleSendToMember}
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

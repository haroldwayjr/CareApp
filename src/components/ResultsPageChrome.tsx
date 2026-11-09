import { useEffect, useRef, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { BackLink } from './BackLink'

/** Matches AppShell sticky toolbar height. */
export const APP_SHELL_HEIGHT = 56

/** Approx. sticky results toolbar height for map offset under app shell. */
export const RESULTS_TOOLBAR_OFFSET = 64

/** Space between sticky filters toolbar and results content (cards / plan key). */
export const RESULTS_CONTENT_TOP_GAP = 12

type ResultsPageChromeProps = {
  header: ReactNode
  search: ReactNode
  searchTerm: string
  resultCount: number
  loading?: boolean
  /** Right-side controls (sort, filters). */
  actions: ReactNode
  chips?: ReactNode
  children: ReactNode
  /** Fires when the sticky results toolbar height changes (compact/expanded). */
  onToolbarHeightChange?: (height: number) => void
}

/**
 * Results page chrome: header + search scroll away; results summary + actions
 * stick under the app shell. Expanded state shows “Search results for” above
 * “{term} ({count})”; compact (scrolled) keeps only the term + count.
 */
export function ResultsPageChrome({
  header,
  search,
  searchTerm,
  resultCount,
  loading = false,
  actions,
  chips,
  children,
  onToolbarHeightChange,
}: ResultsPageChromeProps) {
  const [compact, setCompact] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const displayTerm = searchTerm.trim() || 'All providers'

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${APP_SHELL_HEIGHT}px 0px 0px 0px`,
      },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const toolbar = toolbarRef.current
    if (!toolbar || !onToolbarHeightChange) return

    const report = () => {
      onToolbarHeightChange(Math.round(toolbar.getBoundingClientRect().height))
    }
    report()

    const observer = new ResizeObserver(report)
    observer.observe(toolbar)
    return () => observer.disconnect()
  }, [onToolbarHeightChange, compact, chips, loading])

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ px: { xs: 2, md: 3 }, pt: 1.5, pb: 0 }}>{header}</Box>

      <Box sx={{ px: { xs: 2, md: 3 }, pt: 2 }}>{search}</Box>

      {/* Marks end of scroll-away chrome (title + search). */}
      <Box ref={sentinelRef} aria-hidden sx={{ height: 1, width: '100%' }} />

      <Box
        ref={toolbarRef}
        component="section"
        aria-label="Results controls"
        sx={{
          position: 'sticky',
          top: APP_SHELL_HEIGHT,
          zIndex: 10,
          bgcolor: 'background.paper',
          px: { xs: 2, md: 3 },
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: '#D0D5DD',
          // Always-on seam so chrome reads separate from results (stronger when scrolled).
          boxShadow: compact
            ? '0 2px 6px rgba(0,0,0,0.08)'
            : '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'box-shadow 200ms cubic-bezier(0.33, 0, 0.2, 1)',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              component="p"
              aria-hidden={compact}
              sx={{
                m: 0,
                mb: compact ? 0 : '2px',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: 0,
                lineHeight: 1.2,
                color: 'text.secondary',
                opacity: compact ? 0 : 1,
                maxHeight: compact ? 0 : 18,
                overflow: 'hidden',
                transform: compact ? 'translateY(-4px)' : 'translateY(0)',
                transition: [
                  'opacity 200ms cubic-bezier(0.33, 0, 0.2, 1)',
                  'transform 200ms cubic-bezier(0.33, 0, 0.2, 1)',
                  'max-height 200ms cubic-bezier(0.33, 0, 0.2, 1)',
                ].join(', '),
                pointerEvents: 'none',
              }}
            >
              Search results for
            </Typography>

            {loading ? (
              <Skeleton
                animation={false}
                className="skeleton-shimmer"
                variant="text"
                width={220}
                height={22}
              />
            ) : (
              <Typography
                component="h2"
                sx={{
                  m: 0,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: 0,
                  lineHeight: 1.25,
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {displayTerm} ({resultCount})
              </Typography>
            )}
          </Box>

          {actions}
        </Stack>

        {chips ? <Box sx={{ mt: 1 }}>{chips}</Box> : null}
      </Box>

      <Box
        sx={{
          px: { xs: 2, md: 3 },
          // Slight seam under sticky filters toolbar before cards / plan key.
          pt: `${RESULTS_CONTENT_TOP_GAP}px`,
          pb: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

type ResultsBackHeaderProps = {
  onBack: () => void
  title?: string
}

export function ResultsBackHeader({
  onBack,
  title = 'Search Provider',
}: ResultsBackHeaderProps) {
  return (
    <>
      <BackLink onClick={onBack}>Back to Profile</BackLink>
      <Typography
        variant="h5"
        component="h1"
        color="text.primary"
        sx={{
          // Match SearchLanding page title scale.
          fontSize: { xs: 20, sm: 22 },
          fontWeight: 400,
          letterSpacing: 0,
          lineHeight: 1.3,
          mt: 1,
        }}
      >
        {title}
      </Typography>
    </>
  )
}

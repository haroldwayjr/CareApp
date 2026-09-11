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
}: ResultsPageChromeProps) {
  const [compact, setCompact] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
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

      <Box sx={{ px: { xs: 2, md: 3 }, pt: 4 }}>{search}</Box>

      {/* Marks end of scroll-away chrome (title + search). */}
      <Box ref={sentinelRef} aria-hidden sx={{ height: 1, width: '100%' }} />

      <Box
        component="section"
        aria-label="Results controls"
        sx={{
          position: 'sticky',
          top: APP_SHELL_HEIGHT,
          zIndex: 10,
          bgcolor: 'background.paper',
          px: { xs: 2, md: 3 },
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: compact ? '0 1px 0 rgba(0,0,0,0.04)' : 'none',
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
                color: 'text.primary',
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
                height={26}
              />
            ) : (
              <Typography
                component="h2"
                sx={{
                  m: 0,
                  fontSize: 18,
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
          pt: 2,
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
          fontSize: { xs: 24, sm: 28 },
          fontWeight: 400,
          letterSpacing: 0,
          lineHeight: 1.25,
          mt: 1,
        }}
      >
        {title}
      </Typography>
    </>
  )
}

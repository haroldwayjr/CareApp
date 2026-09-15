import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import verificationBadge from '../assets/chips/verification-badge.svg'

const BADGE_PREFERRED = {
  bgcolor: 'secondary.soft',
  color: 'secondary.dark',
  border: 'none',
} as const

const BADGE_STANDARD = {
  bgcolor: '#fff4e5',
  color: '#9a3412',
  border: 'none',
} as const

const badgeSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 24,
  px: 1,
  borderRadius: '6px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '16px',
  letterSpacing: 0,
  whiteSpace: 'nowrap',
} as const

type IncludedHealthPlanKeyProps = {
  /** banner: responsive row/column; sidebar: stacked column for narrow map column. */
  variant?: 'banner' | 'sidebar'
}

/**
 * Explains Preferred vs Standard badges on the results list.
 * Always visible on the results view (not dismissible).
 */
export function IncludedHealthPlanKey({
  variant = 'banner',
}: IncludedHealthPlanKeyProps) {
  const isSidebar = variant === 'sidebar'
  return (
    <Paper
      variant="outlined"
      component="aside"
      aria-label="Included Health Plan key"
      sx={{
        p: 2,
        borderRadius: '8px',
        // Match provider card outline (no elevation).
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 'none',
      }}
    >
      <Typography
        component="h3"
        sx={{
          m: 0,
          mb: 1.5,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: 0,
          color: 'text.primary',
        }}
      >
        Included Health Plan Key
      </Typography>

      <Stack
        direction={isSidebar ? 'column' : { xs: 'column', md: 'row' }}
        spacing={isSidebar ? 1.25 : { xs: 1.25, md: 4 }}
        useFlexGap
        sx={{
          alignItems: isSidebar ? 'stretch' : { xs: 'stretch', md: 'center' },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            flex: '0 1 auto',
            minWidth: 0,
          }}
        >
          <Box component="span" sx={{ ...badgeSx, ...BADGE_PREFERRED }}>
            Preferred
          </Box>
          <Box
            component="img"
            src={verificationBadge}
            alt=""
            aria-hidden
            sx={{ width: 16, height: 16, flexShrink: 0 }}
          />
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: 0,
              color: 'text.primary',
            }}
          >
            Highest quality providers with lower copays.
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            flex: '0 1 auto',
            minWidth: 0,
          }}
        >
          <Box component="span" sx={{ ...badgeSx, ...BADGE_STANDARD }}>
            Standard
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: 0,
              color: 'text.primary',
            }}
          >
            In-network, but copays are higher than Preferred.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

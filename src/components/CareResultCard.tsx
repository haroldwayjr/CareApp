import type { MouseEvent } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import verificationBadge from '../assets/chips/verification-badge.svg'
import type { NetworkStatus, ProviderResult } from '../data/mockCareResults'
import { formatProviderCopyText } from '../utils/formatProviderCopyText'

const CHIP_SUCCESS = {
  bgcolor: '#EFFDF0',
  color: '#045623',
  border: 'none',
} as const

const CHIP_ERROR = {
  bgcolor: '#FEECEC',
  color: '#D13238',
  border: 'none',
} as const

/** Soft Standard — Care App MUI `warning` (image 4 / text.warning). */
const CHIP_STANDARD = {
  bgcolor: '#fff4e5',
  color: '#9a3412',
  border: 'none',
} as const

/** Soft Preferred — Care App MUI `secondary.soft` (#f3e5f5 / purple/50). */
const CHIP_PREFERRED = {
  bgcolor: 'secondary.soft',
  color: 'secondary.dark',
  border: 'none',
} as const

type ChipTone = {
  bgcolor: string
  color: string
  border?: string
}

const chipSx = {
  borderRadius: '6px',
  fontWeight: 500,
  fontSize: 12,
  height: 24,
  letterSpacing: 0,
  pl: 0.75,
  '& .MuiChip-icon': {
    ml: 0,
    mr: 0.5,
    color: 'inherit',
    opacity: 1,
    marginLeft: '4px',
    marginRight: '2px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiChip-label': {
    pl: 0.5,
    pr: 1.25,
    display: 'inline-flex',
    alignItems: 'center',
  },
} as const

type NetworkIconVariant = 'solid' | 'outline' | 'error' | 'warning'

function NetworkStatusIcon({ variant }: { variant: NetworkIconVariant }) {
  const filled = variant === 'solid' || variant === 'error'
  const isError = variant === 'error'
  const color =
    isError ? '#B71C1C' : variant === 'warning' ? '#E65100' : '#1B5E20'

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        bgcolor: filled ? color : 'transparent',
        border: filled ? 'none' : `1.5px solid ${color}`,
        color: filled ? '#fff' : color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        fontWeight: 700,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {isError ? (
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.75 2.75 9.25 9.25M9.25 2.75 2.75 9.25"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.4 6.2 4.9 8.7 9.6 3.4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Box>
  )
}

function TierCopayChipLabel({
  prefix,
  copay,
}: {
  prefix: string
  copay: number
}) {
  return (
    <Box
      component="span"
      sx={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25em' }}
    >
      <Box component="span" sx={{ fontWeight: 500 }}>
        {prefix}
      </Box>
      <Box component="span" sx={{ fontWeight: 700 }}>
        ${copay} Copay
      </Box>
    </Box>
  )
}

function getNetworkChip(
  status: NetworkStatus,
): { label: string; tone: ChipTone; icon: NetworkIconVariant } | null {
  switch (status) {
    case 'in_network_tier_1':
    case 'in_network_tier_2':
      return { label: 'In-network', tone: CHIP_SUCCESS, icon: 'solid' }
    case 'out_of_network':
      return { label: 'Out of network', tone: CHIP_ERROR, icon: 'error' }
    default:
      return null
  }
}

type CareResultCardProps = {
  result: ProviderResult
  index: number
  highlighted?: boolean
  inList?: boolean
  onToggleList: (id: string) => void
  onSelect: (id: string) => void
  onCopyName?: (label: string) => void
}

export function CareResultCard({
  result,
  highlighted = false,
  inList = false,
  onToggleList,
  onSelect,
  onCopyName,
}: CareResultCardProps) {
  const displayName = `${result.name}, ${result.credentials}`
  const copyText = formatProviderCopyText(result)
  const isPreferred = result.tier === 'Preferred'
  // Preferred cards show "In network"; Standard cards only show the yellow tier/copay badge
  // unless network is out-of-network (those still need a status chip).
  const rawNetworkChip = getNetworkChip(result.networkStatus)
  const networkChip =
    !isPreferred &&
    rawNetworkChip &&
    (result.networkStatus === 'in_network_tier_1' ||
      result.networkStatus === 'in_network_tier_2')
      ? null
      : rawNetworkChip
  const tierChipTone = isPreferred ? CHIP_PREFERRED : CHIP_STANDARD
  const tierPrefix = isPreferred ? 'Preferred Provider:' : 'Standard Provider:'

  async function handleCopyName(event: MouseEvent) {
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(copyText)
      onCopyName?.(displayName)
    } catch {
      onCopyName?.(displayName)
    }
  }

  return (
    <Paper
      variant="outlined"
      onClick={(event) => {
        event.stopPropagation()
        onSelect(result.id)
      }}
      sx={{
        p: 2,
        borderRadius: '8px',
        borderColor: inList || highlighted ? 'primary.main' : 'divider',
        // Checkbox selection: blue outline only. Map/overview highlight keeps soft fill.
        bgcolor: highlighted && !inList ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
      }}
    >
      <Stack direction="row" spacing={1.125} sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <Avatar
            src={result.photoUrl}
            alt=""
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#BDBDBD',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {result.initials}
          </Avatar>
          {isPreferred ? (
            <Box
              component="img"
              src={verificationBadge}
              alt=""
              aria-hidden
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
              }}
            />
          ) : null}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: 'center', minWidth: 0 }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: 15, sm: 16 },
                    fontWeight: 600,
                    lineHeight: 1.3,
                    letterSpacing: 0,
                    color: 'text.primary',
                  }}
                >
                  {displayName}
                </Typography>
                <IconButton
                  size="small"
                  aria-label={`Copy provider details for ${displayName}`}
                  onClick={handleCopyName}
                  sx={{ color: 'text.secondary', p: 0.5 }}
                >
                  <AppIcon name="copy" sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  mt: 0,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  letterSpacing: 0,
                  color: 'text.secondary',
                }}
              >
                {result.specialty}
              </Typography>
            </Box>
            <Checkbox
              checked={inList}
              onClick={(event) => event.stopPropagation()}
              onChange={() => onToggleList(result.id)}
              aria-label={
                inList
                  ? `Remove ${displayName} from list`
                  : `Add ${displayName} to list`
              }
              sx={{ p: 0.5, mt: -0.5, flexShrink: 0 }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', mt: 1 }}
          >
            <Chip
              size="small"
              {...(isPreferred
                ? {
                    icon: (
                      <Box
                        component="img"
                        src={verificationBadge}
                        alt=""
                        aria-hidden
                        sx={{ width: 14, height: 14 }}
                      />
                    ),
                  }
                : {})}
              label={
                <TierCopayChipLabel prefix={tierPrefix} copay={result.copay} />
              }
              sx={{ ...chipSx, ...tierChipTone }}
            />
            {networkChip ? (
              <Chip
                size="small"
                icon={<NetworkStatusIcon variant={networkChip.icon} />}
                label={networkChip.label}
                sx={{ ...chipSx, ...networkChip.tone }}
              />
            ) : null}
          </Stack>

          <Typography
            component="p"
            sx={{
              m: 0,
              mt: 1.5,
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 1.4,
              color: 'text.primary',
            }}
          >
            <Box component="span" sx={{ fontWeight: 600 }}>
              {result.group}
            </Box>
            <Box component="span" sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {' '}
              {result.address}
            </Box>
            <Box component="span" sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {' '}
              • {Math.round(result.distanceMiles)} mi
            </Box>
          </Typography>

          <Link
            href={`tel:${result.phone}`}
            underline="always"
            onClick={(event) => event.stopPropagation()}
            sx={{
              display: 'inline-block',
              mt: 0.5,
              fontSize: 14,
              letterSpacing: 0,
            }}
          >
            {result.phone}
          </Link>
        </Box>
      </Stack>
    </Paper>
  )
}

import type { MouseEvent, ReactNode } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import blueDistinctionIcon from '../assets/chips/blue-distinction.png'
import lgbtqAffirmingIcon from '../assets/chips/lgbtq-affirming.png'
import type {
  NetworkStatus,
  ProviderBadge,
  ProviderResult,
} from '../data/mockCareResults'
import { formatProviderCopyText } from '../utils/formatProviderCopyText'

const CHIP_SUCCESS = {
  bgcolor: '#E8F5E9',
  color: '#1B5E20',
} as const

const CHIP_ERROR = {
  bgcolor: '#FFEBEE',
  color: '#B71C1C',
} as const

const CHIP_WARNING = {
  bgcolor: '#FFF3E0',
  color: '#E65100',
} as const

const CHIP_NEUTRAL = {
  bgcolor: '#F5F5F5',
  color: '#424242',
} as const

type ChipTone = {
  bgcolor: string
  color: string
}

const chipSx = {
  borderRadius: 1,
  fontWeight: 500,
  fontSize: 13,
  height: 28,
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
  const color =
    variant === 'error' ? '#B71C1C' : variant === 'warning' ? '#E65100' : '#1B5E20'

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
      {variant === 'error' ? '×' : '✓'}
    </Box>
  )
}

function GlyphIcon({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        lineHeight: 1,
        flexShrink: 0,
        color: 'inherit',
      }}
    >
      {children}
    </Box>
  )
}

/** Exact chip logos from design assets, tinted via CSS mask. */
function ChipAssetIcon({
  src,
  size = 16,
  color = 'currentColor',
}: {
  src: string
  size?: number
  color?: string
}) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'inline-block',
        bgcolor: color,
        opacity: 1,
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}

/** Video camera mark matching the Offers telehealth chip asset. */
function TelehealthIcon() {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'inherit',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.25" y="4.25" width="8.5" height="7.5" rx="1.25" fill="currentColor" />
        <path
          d="M10.5 6.1v3.8L14.25 12V4L10.5 6.1Z"
          fill="currentColor"
        />
      </svg>
    </Box>
  )
}

/** Outlined heart for Premium care physician chips. */
function PremiumCareIcon() {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 18,
        height: 18,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'inherit',
        lineHeight: 0,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
        style={{ display: 'block' }}
      >
        <path
          d="M8 13.6S3.5 10.7 3.5 7.35c0-1.45 1.15-2.6 2.6-2.6.8 0 1.5.37 1.9.95.4-.58 1.1-.95 1.9-.95 1.45 0 2.6 1.15 2.6 2.6 0 3.35-4.5 6.25-4.5 6.25Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}

const NETWORK_CHIP: Record<
  NetworkStatus,
  { label: string; tone: ChipTone; icon: NetworkIconVariant }
> = {
  in_network_tier_1: {
    label: 'In network: Tier 1',
    tone: CHIP_SUCCESS,
    icon: 'solid',
  },
  in_network_tier_2: {
    label: 'In network: Tier 2',
    tone: CHIP_SUCCESS,
    icon: 'outline',
  },
  out_of_network: {
    label: 'Out of network',
    tone: CHIP_ERROR,
    icon: 'error',
  },
  in_network_some_locations: {
    label: 'In network at some locations',
    tone: CHIP_WARNING,
    icon: 'warning',
  },
}

const BADGE_CHIP: Record<
  ProviderBadge,
  {
    label: string
    tone: ChipTone
    glyph?: string
    customIcon?: 'blue_distinction' | 'lgbtq_affirming' | 'telehealth' | 'premium_care'
  }
> = {
  premium_care_physician: {
    label: 'Premium care physician',
    tone: CHIP_NEUTRAL,
    customIcon: 'premium_care',
  },
  blue_distinction_center: {
    label: 'Blue Distinction Center',
    tone: CHIP_NEUTRAL,
    customIcon: 'blue_distinction',
  },
  offers_telehealth: {
    label: 'Offers telehealth',
    tone: CHIP_SUCCESS,
    customIcon: 'telehealth',
  },
  lgbtq_affirming: {
    label: 'LGBTQ+ affirming',
    tone: CHIP_SUCCESS,
    customIcon: 'lgbtq_affirming',
  },
  free_standing_imaging: {
    label: 'Free Standing Image Center',
    tone: CHIP_SUCCESS,
  },
  hospital_affiliated: {
    label: 'Hospital-affiliated',
    tone: CHIP_SUCCESS,
  },
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
  index,
  highlighted = false,
  inList = false,
  onToggleList,
  onSelect,
  onCopyName,
}: CareResultCardProps) {
  const displayName = `${result.name}, ${result.credentials}`
  const copyText = formatProviderCopyText(result)

  const network = NETWORK_CHIP[result.networkStatus]

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
        borderColor: highlighted ? 'primary.main' : 'divider',
        bgcolor: highlighted ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Avatar
          src={result.photoUrl}
          alt=""
          sx={{
            width: 56,
            height: 56,
            bgcolor: '#BDBDBD',
            color: '#fff',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {result.initials}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'flex-start' },
            }}
          >
            <Box sx={{ minWidth: 0 }}>
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
                  {index}. {displayName}
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
            <Button
              variant={inList ? 'contained' : 'outlined'}
              size="medium"
              color="primary"
              aria-pressed={inList}
              onClick={(event) => {
                event.stopPropagation()
                onToggleList(result.id)
              }}
              sx={{
                flexShrink: 0,
                alignSelf: { xs: 'stretch', sm: 'flex-start' },
                ...(inList
                  ? {
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                      },
                    }
                  : null),
              }}
            >
              {inList ? 'Remove from list' : 'Add to list'}
            </Button>
          </Stack>

          <Typography
            sx={{
              mt: 1.5,
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 0,
              color: 'text.primary',
            }}
          >
            {result.group}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: 0,
              color: 'text.primary',
            }}
          >
            {result.address} · {result.distanceMiles.toFixed(1)} mi
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

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', mt: 1.5 }}
          >
            <Chip
              size="small"
              icon={<NetworkStatusIcon variant={network.icon} />}
              label={network.label}
              sx={{ ...chipSx, ...network.tone }}
            />
            <Chip
              size="small"
              label={`$${result.copay} copay`}
              sx={{
                ...chipSx,
                ...CHIP_SUCCESS,
                pl: 0,
                '& .MuiChip-label': {
                  pl: 1.25,
                  pr: 1.25,
                },
              }}
            />
            {result.tier === 'Tier 2' ? (
              <Chip
                size="small"
                icon={<NetworkStatusIcon variant="outline" />}
                label={`Tier 2 | $${result.copay} copay`}
                sx={{ ...chipSx, ...CHIP_SUCCESS }}
              />
            ) : null}
            {result.badges.map((badge) => {
              const meta = BADGE_CHIP[badge]
              const icon =
                meta.customIcon === 'blue_distinction' ? (
                  <ChipAssetIcon
                    src={blueDistinctionIcon}
                    size={14}
                    color={meta.tone.color}
                  />
                ) : meta.customIcon === 'lgbtq_affirming' ? (
                  <ChipAssetIcon
                    src={lgbtqAffirmingIcon}
                    size={13}
                    color={meta.tone.color}
                  />
                ) : meta.customIcon === 'telehealth' ? (
                  <TelehealthIcon />
                ) : meta.customIcon === 'premium_care' ? (
                  <PremiumCareIcon />
                ) : meta.glyph ? (
                  <GlyphIcon>{meta.glyph}</GlyphIcon>
                ) : undefined
              return (
                <Chip
                  key={badge}
                  size="small"
                  icon={icon}
                  label={meta.label}
                  sx={{
                    ...chipSx,
                    ...meta.tone,
                    ...(icon ? null : { pl: 1.25 }),
                  }}
                />
              )
            })}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}

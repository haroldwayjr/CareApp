import { useMemo, useState, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import blueDistinctionIcon from '../assets/chips/blue-distinction.png'
import lgbtqAffirmingIcon from '../assets/chips/lgbtq-affirming.png'
import {
  getProviderOverview,
  type ProviderBadge,
  type ProviderResult,
} from '../data/mockCareResults'
import { AppIcon } from '../icons/AppIcon'
import { formatProviderCopyText } from '../utils/formatProviderCopyText'

const DRAWER_WIDTH = 440

const CHIP_SUCCESS = {
  bgcolor: '#E8F5E9',
  color: '#1B5E20',
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

const BADGE_META: Partial<
  Record<
    ProviderBadge,
    {
      label: string
      tone: ChipTone
      customIcon?: 'blue_distinction' | 'lgbtq_affirming' | 'telehealth' | 'premium_care'
    }
  >
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
        <path d="M10.5 6.1v3.8L14.25 12V4L10.5 6.1Z" fill="currentColor" />
      </svg>
    </Box>
  )
}

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

function OutlinedHeartIcon({ size = 14 }: { size?: number }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'inherit',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
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

function StatusGlyph({
  tone,
  positive,
}: {
  tone?: 'success' | 'warning' | 'error'
  positive?: boolean
}) {
  const resolvedTone = tone ?? (positive === false ? 'error' : 'success')

  if (resolvedTone === 'warning') {
    return (
      <Box
        component="span"
        aria-hidden
        sx={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          bgcolor: 'transparent',
          border: '1.5px solid #E65100',
          color: '#E65100',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.2 6.2 4.8 8.8 9.8 3.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    )
  }

  const isSuccess = resolvedTone === 'success'
  const color = isSuccess ? '#2E7D32' : '#C62828'
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        bgcolor: color,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {isSuccess ? (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.2 6.2 4.8 8.8 9.8 3.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 3 9 9M9 3 3 9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </Box>
  )
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 20,
        height: 20,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        transition: 'transform 220ms cubic-bezier(0.33, 0, 0.2, 1)',
        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3.2 5.2 7 9l3.8-3.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  )
}

function InfoRow({
  label,
  children,
  divider = true,
}: {
  label: string
  children: ReactNode
  divider?: boolean
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '148px 1fr' },
        gap: { xs: 0.75, sm: 1.5 },
        alignItems: 'start',
        py: 1.5,
        borderBottom: divider ? '1px solid' : 'none',
        borderColor: 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: 'text.secondary',
          lineHeight: 1.45,
          pt: 0.25,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ minWidth: 0 }}>{children}</Box>
    </Box>
  )
}

function LocationDetailRow({
  label,
  children,
  divider = true,
}: {
  label: string
  children: ReactNode
  divider?: boolean
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        py: 1.25,
        borderBottom: divider ? '1px solid' : 'none',
        borderColor: 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 400,
          color: 'text.secondary',
          lineHeight: 1.45,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 0.75,
          minWidth: 0,
          textAlign: 'right',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

function NeutralChip({
  label,
  icon,
}: {
  label: string
  icon?: ReactNode
}) {
  return (
    <Chip
      size="small"
      label={label}
      icon={icon ? <Box component="span">{icon}</Box> : undefined}
      sx={{ ...chipSx, ...CHIP_NEUTRAL }}
    />
  )
}

function ExpandableChipRow({
  items,
  collapsedCount,
  getIcon,
}: {
  items: string[]
  collapsedCount: number
  getIcon?: (item: string) => ReactNode | undefined
}) {
  const [expanded, setExpanded] = useState(false)
  const needsToggle = items.length > collapsedCount
  const visible = expanded || !needsToggle ? items : items.slice(0, collapsedCount)

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.75,
          alignItems: 'center',
        }}
      >
        {visible.map((item) => (
          <NeutralChip key={item} label={item} icon={getIcon?.(item)} />
        ))}
      </Box>
      {needsToggle ? (
        <Link
          component="button"
          type="button"
          underline="hover"
          onClick={() => setExpanded((value) => !value)}
          sx={{
            mt: 0.75,
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 500,
            color: 'primary.main',
            cursor: 'pointer',
            border: 0,
            bgcolor: 'transparent',
            p: 0,
            fontFamily: 'inherit',
          }}
        >
          {expanded ? 'Show less' : 'Show all'}
        </Link>
      ) : null}
    </Box>
  )
}

function CollapsibleSection({
  title,
  count,
  defaultExpanded = true,
  children,
}: {
  title: string
  count: number
  defaultExpanded?: boolean
  children: ReactNode
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <Box>
      <Box
        component="button"
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          border: 0,
          bgcolor: 'transparent',
          cursor: 'pointer',
          px: 0,
          py: 1.25,
          fontFamily: 'inherit',
          textAlign: 'left',
          '&:hover .section-title': {
            color: 'primary.main',
          },
        }}
      >
        <Typography
          className="section-title"
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: 'text.primary',
            transition: 'color 160ms ease',
          }}
        >
          {title} ({count})
        </Typography>
        <ChevronIcon expanded={expanded} />
      </Box>
      <Collapse in={expanded} timeout={260} easing="cubic-bezier(0.33, 0, 0.2, 1)">
        <Box sx={{ pb: 1 }}>{children}</Box>
      </Collapse>
    </Box>
  )
}

type ProviderOverviewDrawerProps = {
  open: boolean
  provider: ProviderResult | null
  onClose: () => void
  onExited?: () => void
  onCopyName?: (label: string) => void
}

export function ProviderOverviewDrawer({
  open,
  provider,
  onClose,
  onExited,
  onCopyName,
}: ProviderOverviewDrawerProps) {
  const overview = useMemo(
    () => (provider ? getProviderOverview(provider) : null),
    [provider],
  )

  const displayName = provider
    ? `${provider.name}, ${provider.credentials}`
    : ''

  async function handleCopy() {
    if (!provider) return
    const copyText = formatProviderCopyText(provider)
    try {
      await navigator.clipboard.writeText(copyText)
    } catch {
      // Clipboard may be unavailable in some environments.
    }
    onCopyName?.(displayName)
  }

  function badgeIcon(badge: ProviderBadge, color: string) {
    const meta = BADGE_META[badge]
    if (!meta?.customIcon) return undefined
    if (meta.customIcon === 'telehealth') return <TelehealthIcon />
    if (meta.customIcon === 'premium_care') return <PremiumCareIcon />
    if (meta.customIcon === 'blue_distinction') {
      return <ChipAssetIcon src={blueDistinctionIcon} size={14} color={color} />
    }
    if (meta.customIcon === 'lgbtq_affirming') {
      return <ChipAssetIcon src={lgbtqAffirmingIcon} size={13} color={color} />
    }
    return undefined
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 320, exit: 240 }}
      slotProps={{
        transition: {
          onExited: () => {
            document.body.style.removeProperty('overflow')
            document.body.style.removeProperty('padding-right')
            onExited?.()
          },
        },
        backdrop: {
          sx: {
            bgcolor: 'rgba(33, 33, 33, 0.42)',
            transition: 'opacity 280ms cubic-bezier(0.33, 0, 0.2, 1) !important',
          },
        },
        paper: {
          sx: {
            width: { xs: '100%', sm: DRAWER_WIDTH },
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
            transition: 'transform 320ms cubic-bezier(0.33, 0, 0.2, 1) !important',
            borderRadius: 0,
          },
        },
      }}
    >
      {provider && overview ? (
        <>
          <Box sx={{ flexShrink: 0 }}>
            <Stack
              direction="row"
              sx={{
                px: { xs: 2, sm: 3 },
                py: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: 1.3,
                  letterSpacing: 0,
                  color: 'text.primary',
                }}
              >
                Provider Overview
              </Typography>
              <IconButton
                aria-label="Close provider overview"
                onClick={onClose}
                edge="end"
                sx={{
                  width: 44,
                  height: 44,
                  color: 'icon.secondary',
                  transition: 'background-color 160ms ease, color 160ms ease',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'icon.primary',
                  },
                }}
              >
                <Box
                  component="span"
                  aria-hidden
                  sx={{
                    fontSize: 28,
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

            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.08)' }} />

            <Box sx={{ px: { xs: 2, sm: 3 }, pt: 2, pb: 1 }}>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{ alignItems: 'center', minWidth: 0 }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: 'text.primary',
                  }}
                >
                  {displayName}
                </Typography>
                <IconButton
                  size="small"
                  aria-label={`Copy name for ${displayName}`}
                  onClick={handleCopy}
                  sx={{ color: 'text.secondary', p: 0.5 }}
                >
                  <AppIcon name="copy" sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              px: { xs: 2, sm: 3 },
              pb: 3,
              overscrollBehavior: 'contain',
            }}
          >
            <Stack spacing={0}>
              <Box>
                <InfoRow label="Specialties">
                  <ExpandableChipRow
                    items={overview.specialties}
                    collapsedCount={1}
                  />
                </InfoRow>
                <InfoRow label="Conditions Treated">
                  <ExpandableChipRow
                    items={overview.conditions}
                    collapsedCount={3}
                    getIcon={(item) =>
                      /heart/i.test(item) ? <OutlinedHeartIcon /> : undefined
                    }
                  />
                </InfoRow>
                <InfoRow label="Services Offered">
                  <ExpandableChipRow
                    items={overview.services}
                    collapsedCount={1}
                  />
                </InfoRow>
                {provider.badges.length > 0 ? (
                  <InfoRow label="Misc">
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.75,
                      }}
                    >
                      {provider.badges.map((badge) => {
                        const meta = BADGE_META[badge]
                        if (!meta) return null
                        const icon = badgeIcon(badge, meta.tone.color)
                        return (
                          <Chip
                            key={badge}
                            size="small"
                            label={meta.label}
                            icon={
                              icon ? (
                                <Box component="span" sx={{ display: 'inline-flex' }}>
                                  {icon}
                                </Box>
                              ) : undefined
                            }
                            sx={{
                              ...chipSx,
                              ...meta.tone,
                              ...(meta.customIcon === 'lgbtq_affirming' ||
                              meta.customIcon === 'blue_distinction'
                                ? {
                                    height: 26,
                                    fontSize: 12.5,
                                    '& .MuiChip-icon': { mr: 0.35 },
                                  }
                                : null),
                            }}
                          />
                        )
                      })}
                    </Box>
                  </InfoRow>
                ) : null}
                <InfoRow label="Gender">
                  <Typography sx={{ fontSize: 14, lineHeight: 1.45 }}>
                    {provider.gender}
                  </Typography>
                </InfoRow>
                <InfoRow label="Provider NPI">
                  <Typography sx={{ fontSize: 14, lineHeight: 1.45 }}>
                    {overview.npi}
                  </Typography>
                </InfoRow>
                <InfoRow label="Trained at">
                  <Typography sx={{ fontSize: 14, lineHeight: 1.45 }}>
                    {overview.trainedAt}
                  </Typography>
                </InfoRow>
                <InfoRow label="Hospital Affiliations">
                  <Typography sx={{ fontSize: 14, lineHeight: 1.45 }}>
                    {overview.hospitalAffiliations.join(', ')}
                  </Typography>
                </InfoRow>
              </Box>

              <CollapsibleSection
                title="Locations"
                count={overview.locations.length}
                defaultExpanded
              >
                <Stack spacing={1.5}>
                  {overview.locations.map((location) => (
                    <Box
                      key={location.address}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        px: 2,
                        pt: 2,
                        pb: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          lineHeight: 1.4,
                          mb: 0.5,
                        }}
                      >
                        {location.address}
                      </Typography>
                      {location.statuses.map((status) => (
                        <LocationDetailRow key={status.label} label={status.label}>
                          <StatusGlyph positive={status.positive === true} />
                        </LocationDetailRow>
                      ))}
                      <LocationDetailRow label="Distance">
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: 1.4,
                            color: 'text.primary',
                          }}
                        >
                          {location.distanceMiles.toFixed(1)} miles away
                        </Typography>
                      </LocationDetailRow>
                      <LocationDetailRow label="Copay">
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: 1.4,
                            color: 'text.primary',
                          }}
                        >
                          ${location.copay}
                        </Typography>
                      </LocationDetailRow>
                      <LocationDetailRow label="Network Status">
                        <StatusGlyph tone={location.networkTone} />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: 1.4,
                            color:
                              location.networkTone === 'warning'
                                ? '#E65100'
                                : location.networkTone === 'error'
                                  ? 'error.main'
                                  : 'text.primary',
                          }}
                        >
                          {location.networkLabel}
                        </Typography>
                      </LocationDetailRow>
                      <LocationDetailRow label="Phone" divider={false}>
                        <Link
                          href={`tel:${location.phone.replace(/\D/g, '')}`}
                          underline="always"
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: 1.4,
                          }}
                        >
                          {location.phone}
                        </Link>
                      </LocationDetailRow>
                    </Box>
                  ))}
                </Stack>
              </CollapsibleSection>

              <CollapsibleSection
                title="Member's Insurance Coverage"
                count={overview.insurancePlans.length}
                defaultExpanded
              >
                <Box
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    px: 2,
                    pt: 2,
                    pb: 0.5,
                  }}
                >
                  <Box sx={{ pb: 0.5 }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: 1.4,
                        color: 'text.primary',
                      }}
                    >
                      {overview.insuranceCarrier}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#2E7D32',
                        mt: 0.25,
                        lineHeight: 1.35,
                      }}
                    >
                      {
                        overview.insurancePlans.filter(
                          (plan) => !/out of network/i.test(plan.networkLabel),
                        ).length
                      }{' '}
                      In Network
                    </Typography>
                  </Box>
                  {overview.insurancePlans.map((plan, index) => {
                    const planTone: 'success' | 'warning' | 'error' =
                      /out of network/i.test(plan.networkLabel)
                        ? 'error'
                        : /some locations/i.test(plan.networkLabel)
                          ? 'warning'
                          : 'success'
                    const isLast = index === overview.insurancePlans.length - 1
                    return (
                      <LocationDetailRow
                        key={plan.name}
                        label={plan.name}
                        divider={!isLast}
                      >
                        <StatusGlyph tone={planTone} />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: 1.4,
                            color:
                              planTone === 'warning'
                                ? '#E65100'
                                : planTone === 'error'
                                  ? 'error.main'
                                  : 'text.primary',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {plan.networkLabel}
                        </Typography>
                      </LocationDetailRow>
                    )
                  })}
                </Box>
              </CollapsibleSection>
            </Stack>
          </Box>
        </>
      ) : null}
    </Drawer>
  )
}

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  ACTIVITY_ITEMS,
  DEMO_STEPS,
  MEMBER_QUARTERBACK,
  closedChatsForMember,
  getDemoInteraction,
  getMessagesThroughStep,
  getTimelineForDemo,
  SCOPE_COUNTS,
  THREAD_TEAMS,
  type ChatMessage,
  type ProceedChoiceId,
  type ScopeFilter,
  type StatusCardData,
  type ClosedChat,
  type ThreadItem,
  type ThreadTeam,
  type TimelineEvent,
} from '../data/mockConversations'
import { AppIcon } from '../icons/AppIcon'
import {
  somaMenuItemSx,
  somaMenuPaperSlotProps,
} from './SomaField'
import avatarMarcus from '../assets/figma/messaging/marcus-bennett.jpg'
import avatarRiley from '../assets/figma/messaging/avatar-riley.png'
import logoDot from '../assets/figma/logo-dot.svg'

/** Soma semantic values used by this spike (see docs/design-system/soma). */
const soma = {
  textPrimary: '#101828',
  textSecondary: '#344054',
  textTertiary: '#475467',
  textBrand: '#002380',
  textWarning: '#75600A',
  textWarningStrong: '#9A6700',
  textOnBrand: '#FFFFFF',
  surfaceDefault: '#FFFFFF',
  surfaceSubtle: '#F3F5F8',
  surfaceBrandSoft: '#F2F5FF',
  surfaceBrandSubtle: '#E0EAFF',
  surfaceSuccessSoft: '#E8F8EC',
  surfaceWarningWeak: '#FDF2E9',
  borderSubtle: '#D0D5DD',
  borderWeakest: '#E4E7EC',
  borderPanel: '#E3E7EB',
  actionPrimary: '#002380',
  actionPrimaryDisabled: 'rgba(0, 35, 128, 0.2)',
  actionGhostSelected: 'rgba(0, 9, 166, 0.08)',
  actionGhostSelectedText: '#0009A6',
  success: '#16B04A',
  iconTertiary: '#667085',
  radiusXxs: '2px',
  radiusSm: '6px',
  radiusMd: '8px',
  radiusXl: '12px',
  radius2xl: '16px',
  radius3xl: '20px',
  radius4xl: '24px',
  radiusFull: '9999px',
} as const

const panelShadow = '0px 1px 2px 0px rgba(0, 0, 0, 0.04)'

/** Gutter between panels — also the resize hit target, so the cards stay 16px apart. */
const PANEL_GUTTER = 16
const THREADS_MIN = 240
const THREADS_MAX = 520
const THREADS_DEFAULT = 320
const SIDE_MIN = 340
const SIDE_MAX = 640
const SIDE_DEFAULT = 440
/** Preferred floor for the conversation column while a gutter is dragged. */
const CENTER_MIN = 360
const THREADS_WIDTH_KEY = 'care.conversations.threadsWidth'
const SIDE_WIDTH_KEY = 'care.conversations.sideWidth'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function readStoredWidth(key: string, fallback: number, min: number, max: number) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw == null || raw === '') return fallback
    const stored = Number(raw)
    if (!Number.isFinite(stored)) return fallback
    return clamp(stored, min, max)
  } catch {
    return fallback
  }
}

function PanelResizeHandle({
  label,
  value,
  min,
  max,
  active,
  visibleFrom,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onKeyDown,
  onDoubleClick,
}: {
  label: string
  value: number
  min: number
  max: number
  active: boolean
  visibleFrom: 'md' | 'lg'
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
  onDoubleClick: () => void
}) {
  return (
    <Box
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      sx={{
        display: { xs: 'none', [visibleFrom]: 'flex' },
        flex: `0 0 ${PANEL_GUTTER}px`,
        width: PANEL_GUTTER,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'col-resize',
        touchAction: 'none',
        position: 'relative',
        '&:focus-visible': {
          outline: `2px solid ${soma.actionPrimary}`,
          outlineOffset: -2,
          borderRadius: soma.radiusSm,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 12,
          bottom: 12,
          left: '50%',
          width: 2,
          transform: 'translateX(-50%)',
          borderRadius: soma.radiusFull,
          bgcolor: active ? soma.actionPrimary : 'transparent',
          transition: 'background-color 120ms ease',
        },
        '&:hover::before, &:focus-visible::before': {
          bgcolor: active ? soma.actionPrimary : soma.borderSubtle,
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: 4,
          height: 36,
          borderRadius: soma.radiusFull,
          bgcolor: active ? soma.actionPrimary : soma.iconTertiary,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </Box>
  )
}

type ConversationsPageProps = {
  onPrototypeAction?: (message: string) => void
}

/** Slide between Assigned / Watching / All. Matches Soma emphasized settle. */
const SCOPE_SLIDE_MS = 240
const SCOPE_SLIDE_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function ScopePills({
  value,
  onChange,
}: {
  value: ScopeFilter
  onChange: (next: ScopeFilter) => void
}) {
  const options: { id: ScopeFilter; label: string; count: number }[] = [
    { id: 'assigned', label: 'Assigned', count: SCOPE_COUNTS.assigned },
    { id: 'watching', label: 'Watching', count: SCOPE_COUNTS.watching },
    { id: 'all', label: 'All', count: SCOPE_COUNTS.all },
  ]
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [indicator, setIndicator] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)
  const reduceMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    function measure() {
      const current = trackRef.current
      const button = current?.querySelector<HTMLElement>(
        `[data-scope="${value}"]`,
      )
      if (!current || !button) return
      const trackRect = current.getBoundingClientRect()
      const buttonRect = button.getBoundingClientRect()
      const style = window.getComputedStyle(current)
      const borderLeft = Number.parseFloat(style.borderLeftWidth) || 0
      const borderTop = Number.parseFloat(style.borderTopWidth) || 0
      const next = {
        x: Math.round(buttonRect.left - trackRect.left - borderLeft),
        y: Math.round(buttonRect.top - trackRect.top - borderTop),
        width: Math.round(buttonRect.width),
        height: Math.round(buttonRect.height),
      }
      setIndicator((previous) =>
        previous &&
        previous.x === next.x &&
        previous.y === next.y &&
        previous.width === next.width &&
        previous.height === next.height
          ? previous
          : next,
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [value])

  return (
    <Box
      ref={trackRef}
      role="group"
      aria-label="Conversation view"
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        p: '4px',
        borderRadius: '10px',
        border: `1px solid ${soma.borderSubtle}`,
        bgcolor: soma.surfaceDefault,
        height: 42,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: indicator?.width ?? 0,
          height: indicator?.height ?? 0,
          borderRadius: soma.radiusMd,
          bgcolor: soma.actionGhostSelected,
          transform: `translate(${indicator?.x ?? 0}px, ${indicator?.y ?? 0}px)`,
          opacity: indicator ? 1 : 0,
          pointerEvents: 'none',
          transition: reduceMotion
            ? 'none'
            : `transform ${SCOPE_SLIDE_MS}ms ${SCOPE_SLIDE_EASE}, width ${SCOPE_SLIDE_MS}ms ${SCOPE_SLIDE_EASE}, height ${SCOPE_SLIDE_MS}ms ${SCOPE_SLIDE_EASE}`,
        }}
      />
      {options.map((option) => {
        const selected = value === option.id
        return (
          <Box
            key={option.id}
            component="button"
            type="button"
            data-scope={option.id}
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              border: 0,
              cursor: 'pointer',
              px: 1.75,
              py: 1,
              borderRadius: soma.radiusMd,
              bgcolor: 'transparent',
              color: selected
                ? soma.actionGhostSelectedText
                : soma.textSecondary,
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: selected ? 600 : 400,
              lineHeight: '18px',
              transition: reduceMotion
                ? 'none'
                : `color ${SCOPE_SLIDE_MS}ms ${SCOPE_SLIDE_EASE}`,
            }}
          >
            <Box component="span">{option.label}</Box>
            <Box
              component="span"
              sx={{
                fontSize: 13,
                color: selected
                  ? soma.actionGhostSelectedText
                  : soma.textTertiary,
                fontWeight: selected ? 600 : 400,
                transition: reduceMotion
                  ? 'none'
                  : `color ${SCOPE_SLIDE_MS}ms ${SCOPE_SLIDE_EASE}`,
              }}
            >
              {option.count}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

function FilterChip({ label }: { label: string }) {
  return (
    <Box
      component="button"
      type="button"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        minHeight: 24,
        pl: 1,
        pr: 0.5,
        py: 0.5,
        borderRadius: soma.radiusFull,
        border: `1px solid ${soma.borderSubtle}`,
        bgcolor: soma.surfaceDefault,
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          color: soma.textPrimary,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: 16,
          height: 16,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: soma.iconTertiary,
        }}
      >
        <AppIcon name="chevronDown" sx={{ fontSize: 10 }} />
      </Box>
    </Box>
  )
}

function CountBadge({ value }: { value: number }) {
  return (
    <Box
      sx={{
        minWidth: 25,
        height: 18,
        px: 0.75,
        borderRadius: soma.radiusFull,
        bgcolor: soma.actionPrimary,
        color: soma.textOnBrand,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        lineHeight: '16px',
      }}
    >
      {value}
    </Box>
  )
}

function ThreadRow({
  thread,
  selected,
  onSelect,
}: {
  thread: ThreadItem
  selected: boolean
  onSelect: () => void
}) {
  const unread = Boolean(thread.unread)
  return (
    <Box
      component="button"
      type="button"
      onClick={onSelect}
      sx={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        px: 1.5,
        py: 1.25,
        borderRadius: '10px',
        bgcolor: selected ? soma.surfaceBrandSoft : 'transparent',
        borderBottom: selected ? 0 : `1px solid ${soma.borderSubtle}`,
        '&:hover': {
          bgcolor: selected ? soma.surfaceBrandSoft : soma.surfaceSubtle,
        },
      }}
    >
      <Stack spacing={0.5}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: unread || selected ? 600 : 400,
            lineHeight: '20px',
            color: soma.textPrimary,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {unread ? (
            <Box
              component="span"
              aria-hidden
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: soma.actionPrimary,
                flexShrink: 0,
              }}
            />
          ) : null}
          {thread.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: unread ? 600 : 400,
            lineHeight: unread ? '16px' : '18px',
            color: unread ? soma.textPrimary : soma.textTertiary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {`${thread.member} · ${thread.status} · ${thread.time}`}
        </Typography>
      </Stack>
    </Box>
  )
}

function TeamGroup({
  team,
  selectedId,
  onSelect,
}: {
  team: ThreadTeam
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'stretch' }}>
      <Box
        sx={{
          width: 4,
          borderRadius: soma.radiusFull,
          bgcolor: team.accent,
          flexShrink: 0,
          alignSelf: 'stretch',
        }}
      />
      <Stack spacing={0} sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', pb: 1 }}
        >
          <Typography
            sx={{
              flex: 1,
              fontSize: 16,
              fontWeight: 600,
              lineHeight: '20px',
              color: soma.textPrimary,
            }}
          >
            {team.name}
          </Typography>
          <CountBadge value={team.badge} />
        </Stack>
        <Stack>
          {team.threads.map((thread) => (
            <ThreadRow
              key={thread.id}
              thread={thread}
              selected={selectedId === thread.id}
              onSelect={() => onSelect(thread.id)}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

function StaffOnlyCard({
  title,
  body,
  time,
  children,
  cardRef,
}: {
  title: string
  body: string
  time: string
  children?: ReactNode
  cardRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <Stack
      ref={cardRef}
      direction="row"
      spacing={1}
      role="region"
      aria-label={`${title} — not visible to member`}
      sx={{ alignItems: 'flex-start', width: '100%' }}
    >
      <Box
        component="img"
        src={logoDot}
        alt=""
        sx={{ width: 20, height: 20, flexShrink: 0, mt: 0.25 }}
      />
      <Stack spacing={1} sx={{ flex: 1, minWidth: 0, maxWidth: 520 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              color: soma.textSecondary,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="span"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: soma.radiusSm,
              bgcolor: soma.surfaceBrandSoft,
              border: `1px solid ${soma.borderSubtle}`,
              color: soma.textBrand,
              fontSize: 11,
              fontWeight: 600,
              lineHeight: '16px',
              whiteSpace: 'nowrap',
            }}
          >
            Not visible to member
          </Typography>
        </Stack>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            border: `1px solid ${soma.borderSubtle}`,
            borderRadius: soma.radiusMd,
            bgcolor: soma.surfaceDefault,
            overflow: 'hidden',
            boxShadow: panelShadow,
          }}
        >
          <Box
            aria-hidden
            sx={{
              width: 4,
              flexShrink: 0,
              bgcolor: soma.actionPrimary,
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={1} sx={{ px: 2, py: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  color: soma.textPrimary,
                }}
              >
                {body}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: '16px',
                  color: soma.textTertiary,
                }}
              >
                {time}
              </Typography>
            </Stack>
            {children}
          </Box>
        </Box>
      </Stack>
    </Stack>
  )
}

/** Matches member Messages Claims highlight card (mx-m4 HighlightInProgressCard). */
function StatusCard({ card }: { card: StatusCardData }) {
  return (
    <Box
      component="article"
      sx={{
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        border: `1px solid ${soma.borderWeakest}`,
        borderRadius: soma.radius4xl,
        bgcolor: soma.surfaceDefault,
        p: 1.5,
      }}
    >
      <Box
        sx={{
          alignSelf: 'flex-start',
          px: 1,
          py: 0.25,
          borderRadius: soma.radiusFull,
          bgcolor: soma.surfaceWarningWeak,
          color: soma.textWarningStrong,
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '16px',
        }}
      >
        {card.chip}
      </Box>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          lineHeight: '24px',
          color: soma.textPrimary,
        }}
      >
        {card.title}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar
          src={avatarMarcus}
          alt=""
          sx={{ width: 28, height: 28 }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '20px',
              color: soma.textPrimary,
            }}
          >
            {card.ownerName}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              color: soma.textPrimary,
            }}
          >
            {card.ownerRole}
          </Typography>
        </Box>
      </Stack>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '20px',
          color: soma.textTertiary,
          mt: 0.5,
        }}
      >
        {card.description}
      </Typography>
      <Box sx={{ mt: 'auto', width: '100%' }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '20px',
            color: soma.textPrimary,
          }}
        >
          {card.expectedUpdateLabel}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '20px',
            color: soma.textPrimary,
          }}
        >
          {card.expectedUpdateValue}
        </Typography>
      </Box>
    </Box>
  )
}

function ChatBubble({
  message,
  choiceDisabled,
  timeDisabled,
  selectedTime,
  onChoice,
  onTimeSelect,
  staffCardRef,
}: {
  message: ChatMessage
  choiceDisabled?: boolean
  timeDisabled?: boolean
  selectedTime?: string
  onChoice?: (id: ProceedChoiceId) => void
  onTimeSelect?: (value: string) => void
  staffCardRef?: RefObject<HTMLDivElement | null>
}) {
  const kind = message.kind ?? 'text'

  if (kind === 'system') {
    return (
      <Stack spacing={0.5} sx={{ textAlign: 'center', width: '100%' }}>
        {message.time ? (
          <Typography
            sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary }}
          >
            {message.time}
          </Typography>
        ) : null}
        <Typography
          sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary }}
        >
          {message.body}
        </Typography>
      </Stack>
    )
  }

  if (kind === 'statusCard' && message.statusCard) {
    return (
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'flex-start', width: '100%' }}
      >
        <Box
          component="img"
          src={logoDot}
          alt=""
          sx={{ width: 20, height: 20, flexShrink: 0 }}
        />
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{ fontSize: 12, lineHeight: '16px', color: soma.textSecondary }}
          >
            Dot
          </Typography>
          <StatusCard card={message.statusCard} />
        </Stack>
      </Stack>
    )
  }

  if (kind === 'choices' && message.choices) {
    return (
      <StaffOnlyCard
        time={message.time}
        title="Dot"
        body={message.body}
        cardRef={staffCardRef}
      >
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            borderTop: `1px solid ${soma.borderSubtle}`,
          }}
        >
          {message.choices.map((choice, index) => (
            <Box
              key={choice.id}
              component="li"
              sx={{
                borderBottom:
                  index < message.choices!.length - 1
                    ? `1px solid ${soma.borderSubtle}`
                    : 0,
              }}
            >
              <Box
                component="button"
                type="button"
                disabled={choiceDisabled}
                onClick={() => onChoice?.(choice.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  border: 0,
                  bgcolor: 'transparent',
                  textAlign: 'left',
                  cursor: choiceDisabled ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  px: 2,
                  py: 1.25,
                  opacity: choiceDisabled ? 0.55 : 1,
                  '&:hover': choiceDisabled
                    ? undefined
                    : { bgcolor: soma.surfaceSubtle },
                  '&:disabled': { color: soma.textTertiary },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: soma.textPrimary,
                  }}
                >
                  {choice.label}
                </Typography>
                <AppIcon
                  name="chevronDown"
                  sx={{
                    fontSize: 12,
                    color: soma.iconTertiary,
                    transform: 'rotate(-90deg)',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </StaffOnlyCard>
    )
  }

  if (kind === 'timeSelect' && message.timeOptions) {
    return (
      <StaffOnlyCard
        time={message.time}
        title="Dot"
        body={message.body}
        cardRef={staffCardRef}
      >
        <Box sx={{ px: 2, pb: 2 }}>
          <Select
            size="small"
            displayEmpty
            fullWidth
            value={selectedTime ?? ''}
            disabled={timeDisabled}
            onChange={(event: SelectChangeEvent) =>
              onTimeSelect?.(event.target.value)
            }
            renderValue={(value) =>
              value
                ? (message.timeOptions?.find((opt) => opt.value === value)
                    ?.label ?? value)
                : 'Select time needed'
            }
            inputProps={{ 'aria-label': 'Investigation time needed' }}
            MenuProps={{
              disableScrollLock: true,
              slotProps: {
                paper: somaMenuPaperSlotProps,
                list: { dense: true, sx: { py: 0 } },
              },
            }}
            sx={{
              fontSize: 14,
              borderRadius: soma.radiusSm,
              bgcolor: soma.surfaceDefault,
              '& .MuiSelect-select': { py: 1 },
            }}
          >
            {message.timeOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disableGutters
                sx={somaMenuItemSx}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </StaffOnlyCard>
    )
  }

  const isSpecialist = message.side === 'specialist'
  const isAgent = message.side === 'agent'

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'flex-start',
        justifyContent: isSpecialist ? 'flex-end' : 'flex-start',
        width: '100%',
      }}
    >
      {!isSpecialist ? (
        isAgent ? (
          <Box
            component="img"
            src={logoDot}
            alt=""
            sx={{ width: 20, height: 20, flexShrink: 0 }}
          />
        ) : (
          <Avatar src={avatarRiley} alt="" sx={{ width: 20, height: 20 }} />
        )
      ) : null}
      <Stack
        spacing={1}
        sx={{
          flex: 1,
          maxWidth: 720,
          alignItems: isSpecialist ? 'flex-end' : 'flex-start',
          minWidth: 0,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: isSpecialist ? 'flex-end' : 'flex-start',
            maxWidth: 680,
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              color: soma.textSecondary,
            }}
          >
            {message.name}
          </Typography>
          {message.role ? (
            <>
              <Box
                aria-hidden
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: soma.borderSubtle,
                }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: '16px',
                  color: soma.textTertiary,
                }}
              >
                {message.role}
              </Typography>
            </>
          ) : null}
        </Stack>

        <Stack
          spacing={1}
          sx={{
            maxWidth: 600,
            width: '100%',
            alignItems: isSpecialist ? 'flex-end' : 'flex-start',
          }}
        >
          {isAgent ? (
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: '20px',
                color: soma.textPrimary,
                maxWidth: 568,
              }}
            >
              {message.body}
            </Typography>
          ) : (
            <Box
              sx={{
                maxWidth: 600,
                p: 2,
                bgcolor: isSpecialist
                  ? soma.surfaceBrandSubtle
                  : soma.surfaceSubtle,
                borderRadius: isSpecialist
                  ? `${soma.radius3xl} ${soma.radiusXxs} ${soma.radius3xl} ${soma.radius3xl}`
                  : `${soma.radiusXxs} ${soma.radius3xl} ${soma.radius3xl} ${soma.radius3xl}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  color: soma.textPrimary,
                }}
              >
                {message.body}
              </Typography>
            </Box>
          )}

          <Typography
            sx={{
              fontSize: 12,
              lineHeight: '16px',
              color: soma.textTertiary,
            }}
          >
            {message.time}
          </Typography>
        </Stack>
      </Stack>
      {isSpecialist ? (
        <Avatar src={avatarMarcus} alt="" sx={{ width: 20, height: 20 }} />
      ) : null}
    </Stack>
  )
}

function Composer({
  onAction,
}: {
  onAction?: (message: string) => void
}) {
  const [draft, setDraft] = useState('')
  const canSend = draft.trim().length > 0

  return (
    <Box
      sx={{
        width: '100%',
        border: `1px solid ${soma.borderSubtle}`,
        borderRadius: soma.radiusXl,
        bgcolor: soma.surfaceDefault,
        pt: 2,
        px: 1.5,
        pb: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <InputBase
        multiline
        minRows={1}
        maxRows={4}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Write a message..."
        sx={{
          px: 1,
          fontSize: 14,
          lineHeight: '20px',
          color: soma.textPrimary,
          '& .MuiInputBase-input::placeholder': {
            color: soma.textTertiary,
            opacity: 1,
          },
        }}
      />
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <IconButton
          aria-label="Attach"
          size="small"
          onClick={() => onAction?.('Prototype only — attach is not connected.')}
          sx={{ color: soma.textBrand, width: 36, height: 36 }}
        >
          <AppIcon name="add" sx={{ fontSize: 16 }} />
        </IconButton>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <IconButton
            aria-label="Rewrite with AI"
            size="small"
            onClick={() =>
              onAction?.('Prototype only — rewrite is not connected.')
            }
            sx={{ color: soma.textBrand, width: 36, height: 36 }}
          >
            <AppIcon name="editSparkle" sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            aria-label="Send"
            size="small"
            disabled={!canSend}
            onClick={() => {
              onAction?.('Prototype only — message sent locally.')
              setDraft('')
            }}
            sx={{
              width: 36,
              height: 36,
              bgcolor: canSend
                ? soma.actionPrimary
                : soma.actionPrimaryDisabled,
              color: soma.textOnBrand,
              '&:hover': {
                bgcolor: canSend ? '#001A5C' : soma.actionPrimaryDisabled,
              },
              '&.Mui-disabled': {
                bgcolor: soma.actionPrimaryDisabled,
                color: soma.textOnBrand,
              },
            }}
          >
            <AppIcon name="send" sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  )
}

type RailPanel = 'details' | 'chat' | 'activity' | 'communication'

function ContextCard({
  title,
  onClose,
  children,
  backLabel,
  onBack,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  backLabel?: string
  onBack?: () => void
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        bgcolor: soma.surfaceDefault,
        border: `1px solid ${soma.borderPanel}`,
        borderRadius: soma.radius2xl,
        boxShadow: panelShadow,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 64,
          px: 2.5,
          borderBottom: `1px solid ${soma.borderSubtle}`,
        }}
      >
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', minWidth: 0 }}>
          {onBack ? (
            <IconButton aria-label={backLabel ?? 'Back'} onClick={onBack} sx={{ color: soma.iconTertiary }}>
              <AppIcon name="chevronDown" sx={{ fontSize: 16, transform: 'rotate(90deg)' }} />
            </IconButton>
          ) : null}
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: '24px',
              color: soma.textPrimary,
            }}
          >
            {title}
          </Typography>
        </Stack>
        <IconButton aria-label={`Close ${title}`} onClick={onClose} sx={{ color: soma.iconTertiary }}>
          <AppIcon name="close" sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', px: 2.5, py: 0.5 }}>{children}</Box>
    </Box>
  )
}

function DetailRows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <Stack>
      {rows.map((row) => (
        <Stack
          key={row.label}
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            py: 1.75,
            borderBottom: `1px solid ${soma.borderWeakest}`,
          }}
        >
          <Typography sx={{ fontSize: 14, lineHeight: '20px', color: soma.textTertiary }}>
            {row.label}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '20px',
              color: soma.textPrimary,
              textAlign: 'right',
            }}
          >
            {row.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

function ClosedChatsPanel({
  member,
  onClose,
}: {
  member: string
  onClose: () => void
}) {
  const chats = closedChatsForMember(member)
  const [active, setActive] = useState<ClosedChat | null>(null)

  if (active) {
    return (
      <ContextCard
        title={active.title}
        onClose={onClose}
        onBack={() => setActive(null)}
        backLabel="Back to closed conversations"
      >
        <Typography sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary, pt: 1.5, pb: 2 }}>
          {active.outcome} · Last message {active.lastMessage}
        </Typography>
        <Stack spacing={2} sx={{ pb: 2 }}>
          {active.turns.map((turn) => (
            <Stack key={`${turn.time}-${turn.from}`} spacing={0.5}>
              <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: soma.textSecondary }}>
                {turn.from}
              </Typography>
              <Box
                sx={{
                  alignSelf: 'flex-start',
                  maxWidth: '100%',
                  px: 1.5,
                  py: 1.25,
                  borderRadius: soma.radiusXl,
                  bgcolor: soma.surfaceSubtle,
                }}
              >
                <Typography sx={{ fontSize: 14, lineHeight: '20px', color: soma.textPrimary }}>
                  {turn.body}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary }}>
                {turn.time}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </ContextCard>
    )
  }

  const months: { month: string; items: ClosedChat[] }[] = []
  for (const chat of chats) {
    const group = months.find((entry) => entry.month === chat.month)
    if (group) group.items.push(chat)
    else months.push({ month: chat.month, items: [chat] })
  }

  return (
    <ContextCard title="Closed conversations" onClose={onClose}>
      {chats.length === 0 ? (
        <Typography sx={{ fontSize: 14, lineHeight: '20px', color: soma.textTertiary, py: 3 }}>
          No closed conversations for {member}.
        </Typography>
      ) : (
        months.map((group) => (
          <Stack key={group.month} spacing={0} sx={{ pt: 2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: soma.textTertiary, pb: 0.5 }}>
              {group.month}
            </Typography>
            {group.items.map((chat) => (
              <Box
                key={chat.id}
                component="button"
                type="button"
                onClick={() => setActive(chat)}
                sx={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  border: 0,
                  borderBottom: `1px solid ${soma.borderWeakest}`,
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  px: 0,
                  py: 1.5,
                  fontFamily: 'inherit',
                  '&:hover': { bgcolor: soma.surfaceSubtle },
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: soma.textPrimary }}>
                  {chat.title}
                </Typography>
                <Typography sx={{ fontSize: 12, lineHeight: '16px', color: soma.textSecondary, mt: 0.25 }}>
                  {chat.outcome}
                </Typography>
                <Typography sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary, mt: 0.25 }}>
                  Last message {chat.lastMessage}
                </Typography>
              </Box>
            ))}
          </Stack>
        ))
      )}
    </ContextCard>
  )
}

function MemberToolRail({
  panel,
  member,
  status,
  updated,
  timeline,
  onSelect,
  onClose,
}: {
  panel: RailPanel | null
  member: string
  status: string
  updated: string
  timeline: TimelineEvent[]
  onSelect: (next: RailPanel) => void
  onClose: () => void
}) {
  const items: { id: RailPanel; label: string; icon: 'info' | 'chat' | 'chart' | 'mail' }[] = [
    { id: 'details', label: 'Details', icon: 'info' },
    { id: 'chat', label: 'Team chat', icon: 'chat' },
    { id: 'activity', label: 'Activity', icon: 'chart' },
    { id: 'communication', label: 'Closed conversations', icon: 'mail' },
  ]

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'stretch', minWidth: 0, minHeight: 0, flex: 1 }}>
      {panel ? (
        <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex' }}>
          {panel === 'details' ? (
            <ContextCard title="Details" onClose={onClose}>
              <DetailRows
                rows={[
                  { label: 'Quarterback', value: MEMBER_QUARTERBACK[member] ?? 'Jordan Reyes' },
                  { label: 'Member', value: member },
                  { label: 'Status', value: status },
                  { label: 'Updated', value: updated },
                ]}
              />
            </ContextCard>
          ) : null}
          {panel === 'chat' ? (
            <ContextCard title="Team chat" onClose={onClose}>
              <Typography sx={{ fontSize: 14, lineHeight: '20px', color: soma.textTertiary, py: 2 }}>
                No separate team thread on this conversation.
              </Typography>
            </ContextCard>
          ) : null}
          {panel === 'activity' ? (
            <ContextCard title="Activity" onClose={onClose}>
              <Stack spacing={2} sx={{ py: 2 }}>
                {timeline.map((event) => (
                  <Stack key={event.id} spacing={0.25}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', color: soma.textPrimary }}>
                      {event.title}
                    </Typography>
                    <Typography sx={{ fontSize: 12, lineHeight: '16px', color: soma.textSecondary }}>
                      {event.detail}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </ContextCard>
          ) : null}
          {panel === 'communication' ? (
            <ClosedChatsPanel key={member} member={member} onClose={onClose} />
          ) : null}
        </Box>
      ) : null}
      <Stack
        component="nav"
        aria-label="Member tools"
        spacing={0.5}
        sx={{
          flex: '0 0 auto',
          alignSelf: 'flex-start',
          p: 0.75,
          bgcolor: soma.surfaceDefault,
          border: `1px solid ${soma.borderPanel}`,
          borderRadius: '28px',
          boxShadow: panelShadow,
        }}
      >
        {items.map((item) => {
          const selected = panel === item.id
          return (
            <IconButton
              key={item.id}
              aria-label={item.label}
              aria-pressed={selected}
              onClick={() => onSelect(item.id)}
              sx={{
                width: 40,
                height: 40,
                color: selected ? soma.actionGhostSelectedText : soma.iconTertiary,
                bgcolor: selected ? soma.surfaceBrandSubtle : 'transparent',
                '&:hover': {
                  bgcolor: selected ? soma.surfaceBrandSubtle : soma.surfaceSubtle,
                },
              }}
            >
              <AppIcon name={item.icon} sx={{ fontSize: 20 }} />
            </IconButton>
          )
        })}
      </Stack>
    </Stack>
  )
}

export function ConversationsPage({ onPrototypeAction }: ConversationsPageProps) {
  const [scope, setScope] = useState<ScopeFilter>('assigned')
  const [selectedId, setSelectedId] = useState('denied-claim')
  const [railPanel, setRailPanel] = useState<RailPanel | null>('details')
  const [threadTab, setThreadTab] = useState<'conversation' | 'task'>(
    'conversation',
  )
  const [demoStep, setDemoStep] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const threadEndRef = useRef<HTMLDivElement | null>(null)
  const staffCardRef = useRef<HTMLDivElement | null>(null)
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const [threadsWidth, setThreadsWidth] = useState(() =>
    readStoredWidth(THREADS_WIDTH_KEY, THREADS_DEFAULT, THREADS_MIN, THREADS_MAX),
  )
  const [sideWidth, setSideWidth] = useState(() =>
    readStoredWidth(SIDE_WIDTH_KEY, SIDE_DEFAULT, SIDE_MIN, SIDE_MAX),
  )
  const [dragging, setDragging] = useState<'threads' | 'side' | null>(null)
  const threadsWidthRef = useRef(threadsWidth)
  const sideWidthRef = useRef(sideWidth)
  const dragRef = useRef<{
    which: 'threads' | 'side'
    startX: number
    startThreads: number
    startSide: number
  } | null>(null)

  const isDeniedClaimDemo = selectedId === 'denied-claim'
  const interaction = getDemoInteraction(demoStep)
  const demoComplete = interaction === 'done'
  const visibleMessages = useMemo(
    () => (isDeniedClaimDemo ? getMessagesThroughStep(demoStep) : []),
    [demoStep, isDeniedClaimDemo],
  )
  const timeline = useMemo(
    () => getTimelineForDemo(isDeniedClaimDemo && demoComplete),
    [demoComplete, isDeniedClaimDemo],
  )

  const selectedThread = useMemo(() => {
    for (const team of THREAD_TEAMS) {
      const match = team.threads.find((thread) => thread.id === selectedId)
      if (match) return match
    }
    return THREAD_TEAMS[0]?.threads[0]
  }, [selectedId])

  useEffect(() => {
    // Keep Dot's staff card in the thread flow; bring it into view without
    // hiding the conversation above (avoid block:end on a tall card).
    const target =
      interaction === 'choices' || interaction === 'timeSelect'
        ? staffCardRef.current
        : threadEndRef.current
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [demoStep, interaction, visibleMessages.length])

  function advanceDemo() {
    setDemoStep((current) => Math.min(current + 1, DEMO_STEPS.length - 1))
  }

  function handleChoice(id: ProceedChoiceId) {
    if (id !== 'investigate') {
      onPrototypeAction?.(
        `Prototype only — “${id}” is not connected in this demo.`,
      )
      return
    }
    advanceDemo()
  }

  function handleTimeSelect(value: string) {
    if (value !== '3-days') {
      onPrototypeAction?.(
        'Prototype only — select 3 days to continue this demo.',
      )
      setSelectedTime(value)
      return
    }
    setSelectedTime(value)
    advanceDemo()
  }

  function handleSelectThread(id: string) {
    setSelectedId(id)
    if (id === 'denied-claim') {
      setDemoStep(0)
      setSelectedTime('')
    }
  }

  useEffect(() => {
    threadsWidthRef.current = threadsWidth
    sideWidthRef.current = sideWidth
    try {
      window.localStorage.setItem(THREADS_WIDTH_KEY, String(threadsWidth))
      window.localStorage.setItem(SIDE_WIDTH_KEY, String(sideWidth))
    } catch {
      /* private mode — widths still work for this session */
    }
  }, [threadsWidth, sideWidth])

  useEffect(() => {
    function fitPanels() {
      const total = layoutRef.current?.clientWidth ?? 0
      if (!total || !window.matchMedia('(min-width:900px)').matches) return
      const showSide = railPanel != null && window.matchMedia('(min-width:1200px)').matches
      const gutters = (showSide ? 2 : 1) * PANEL_GUTTER
      const available = Math.max(0, total - gutters - CENTER_MIN)
      let nextThreads = threadsWidthRef.current
      let nextSide = sideWidthRef.current
      if (!showSide) {
        nextThreads = clamp(
          nextThreads,
          THREADS_MIN,
          Math.min(THREADS_MAX, Math.max(THREADS_MIN, available)),
        )
      } else if (nextThreads + nextSide > available) {
        const share = nextThreads / (nextThreads + nextSide)
        nextThreads = clamp(Math.round(available * share), THREADS_MIN, THREADS_MAX)
        nextSide = clamp(available - nextThreads, SIDE_MIN, SIDE_MAX)
        if (nextThreads + nextSide > available) {
          nextThreads = clamp(available - nextSide, THREADS_MIN, THREADS_MAX)
        }
      }
      if (nextThreads !== threadsWidthRef.current) setThreadsWidth(nextThreads)
      if (showSide && nextSide !== sideWidthRef.current) setSideWidth(nextSide)
    }
    fitPanels()
    window.addEventListener('resize', fitPanels)
    return () => window.removeEventListener('resize', fitPanels)
  }, [railPanel])

  useEffect(() => {
    if (!dragging) return
    const previousCursor = document.body.style.cursor
    const previousUserSelect = document.body.style.userSelect
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    return () => {
      document.body.style.cursor = previousCursor
      document.body.style.userSelect = previousUserSelect
    }
  }, [dragging])

  function sidePanelVisible() {
    return railPanel != null && window.matchMedia('(min-width:1200px)').matches
  }

  function applyDrag(clientX: number) {
    const drag = dragRef.current
    const layout = layoutRef.current
    if (!drag || !layout) return
    const dx = clientX - drag.startX
    const total = layout.clientWidth
    const showSide = sidePanelVisible()
    const gutters = (showSide ? 2 : 1) * PANEL_GUTTER
    if (drag.which === 'threads') {
      const reserved = (showSide ? drag.startSide : 0) + gutters + CENTER_MIN
      const max = Math.min(THREADS_MAX, Math.max(THREADS_MIN, total - reserved))
      setThreadsWidth(clamp(drag.startThreads + dx, THREADS_MIN, max))
      return
    }
    const reserved = drag.startThreads + gutters + CENTER_MIN
    const max = Math.min(SIDE_MAX, Math.max(SIDE_MIN, total - reserved))
    setSideWidth(clamp(drag.startSide - dx, SIDE_MIN, max))
  }

  function beginResize(
    which: 'threads' | 'side',
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      which,
      startX: event.clientX,
      startThreads: threadsWidth,
      startSide: sideWidth,
    }
    setDragging(which)
  }

  function moveResize(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    applyDrag(event.clientX)
  }

  function endResize(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return
    dragRef.current = null
    setDragging(null)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  function resizeLimits(which: 'threads' | 'side') {
    const total = layoutRef.current?.clientWidth ?? 0
    const showSide = sidePanelVisible()
    const gutters = (showSide ? 2 : 1) * PANEL_GUTTER
    if (which === 'threads') {
      const reserved = (showSide ? sideWidth : 0) + gutters + CENTER_MIN
      const max = Math.min(THREADS_MAX, Math.max(THREADS_MIN, total - reserved))
      return { min: THREADS_MIN, max }
    }
    const reserved = threadsWidth + gutters + CENTER_MIN
    const max = Math.min(SIDE_MAX, Math.max(SIDE_MIN, total - reserved))
    return { min: SIDE_MIN, max }
  }

  function nudgeResize(
    which: 'threads' | 'side',
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    const step = event.shiftKey ? 32 : 16
    const grow = event.key === 'ArrowRight' || event.key === 'ArrowUp'
    const shrink = event.key === 'ArrowLeft' || event.key === 'ArrowDown'
    if (!grow && !shrink && event.key !== 'Home' && event.key !== 'End') return
    event.preventDefault()
    const limits = resizeLimits(which)
    const delta = which === 'threads' ? (grow ? step : -step) : grow ? -step : step
    if (which === 'threads') {
      if (event.key === 'Home') setThreadsWidth(limits.min)
      else if (event.key === 'End') setThreadsWidth(limits.max)
      else setThreadsWidth((current) => clamp(current + delta, limits.min, limits.max))
      return
    }
    // The side gutter sits on the panel's left edge, so ArrowLeft widens it.
    if (event.key === 'Home') setSideWidth(limits.min)
    else if (event.key === 'End') setSideWidth(limits.max)
    else setSideWidth((current) => clamp(current + delta, limits.min, limits.max))
  }

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: soma.surfaceDefault,
        px: { xs: 2, md: 3 },
        pt: 2.5,
        pb: 2,
        gap: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: 24,
              fontWeight: 500,
              lineHeight: '32px',
              color: soma.textPrimary,
            }}
          >
            Conversations
          </Typography>
          <ScopePills value={scope} onChange={setScope} />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            onPrototypeAction?.(
              'Prototype only — new conversation is not connected.',
            )
          }
          sx={{
            minHeight: 40,
            px: 2,
            alignSelf: { xs: 'stretch', sm: 'center' },
          }}
        >
          New conversation
        </Button>
      </Stack>

      <Box
        ref={layoutRef}
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 0 },
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            bgcolor: soma.surfaceDefault,
            border: `1px solid ${soma.borderPanel}`,
            borderRadius: soma.radius2xl,
            boxShadow: panelShadow,
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            minHeight: 0,
            overflow: 'hidden',
            width: { xs: '100%', md: threadsWidth },
            flex: { xs: '1 1 auto', md: '0 0 auto' },
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: '24px',
              color: soma.textPrimary,
              py: 0.5,
            }}
          >
            Threads
          </Typography>

          <Stack spacing={1.5} sx={{ pb: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                height: 40,
                px: 1.5,
                borderRadius: soma.radiusSm,
                border: `1px solid ${soma.borderSubtle}`,
                bgcolor: soma.surfaceDefault,
              }}
            >
              <AppIcon
                name="search"
                sx={{ fontSize: 20, color: soma.iconTertiary }}
              />
              <InputBase
                placeholder="Search threads"
                fullWidth
                sx={{
                  fontSize: 14,
                  lineHeight: '20px',
                  color: soma.textPrimary,
                  '& .MuiInputBase-input::placeholder': {
                    color: soma.textTertiary,
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <Stack
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap', gap: '6px 8px' }}
            >
              <FilterChip label="All teams" />
              <FilterChip label="Any status" />
              <FilterChip label="Newest" />
            </Stack>
          </Stack>

          <Stack
            spacing={3.5}
            sx={{ flex: 1, minHeight: 0, overflow: 'auto', pr: 0.5 }}
          >
            {THREAD_TEAMS.map((team) => (
              <TeamGroup
                key={team.id}
                team={team}
                selectedId={selectedId}
                onSelect={handleSelectThread}
              />
            ))}
          </Stack>
        </Box>

        <PanelResizeHandle
          label="Resize threads panel"
          value={threadsWidth}
          min={THREADS_MIN}
          max={THREADS_MAX}
          active={dragging === 'threads'}
          visibleFrom="md"
          onPointerDown={(event) => beginResize('threads', event)}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onKeyDown={(event) => nudgeResize('threads', event)}
          onDoubleClick={() => setThreadsWidth(THREADS_DEFAULT)}
        />

        <Box
          sx={{
            bgcolor: soma.surfaceDefault,
            border: `1px solid ${soma.borderPanel}`,
            borderRadius: soma.radius2xl,
            boxShadow: panelShadow,
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            minHeight: 520,
            minWidth: 0,
            flex: '1 1 auto',
            overflow: 'hidden',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              pb: 1.5,
              borderBottom: `1px solid ${soma.borderSubtle}`,
              minHeight: 48,
            }}
          >
            <Avatar
              src={avatarRiley}
              alt=""
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: '24px',
                  color: soma.textPrimary,
                }}
              >
                {selectedThread?.member ?? 'Riley Smith'}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  lineHeight: '16px',
                  color: soma.textWarning,
                }}
              >
                {selectedThread?.title ?? 'Denied claim follow-up'}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              position: 'relative',
              borderBottom: `1px solid ${soma.borderSubtle}`,
            }}
          >
            {(
              [
                { id: 'conversation', label: 'Conversation' },
                {
                  id: 'task',
                  label: demoComplete
                    ? 'Task · Investigate'
                    : 'Task · In progress',
                },
              ] as const
            ).map((tab) => {
              const active = threadTab === tab.id
              return (
                <Box
                  key={tab.id}
                  component="button"
                  type="button"
                  onClick={() => {
                    setThreadTab(tab.id)
                    if (tab.id === 'task') setRailPanel('activity')
                  }}
                  sx={{
                    position: 'relative',
                    border: 0,
                    background: 'transparent',
                    cursor: 'pointer',
                    px: 1.5,
                    py: '7px',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    lineHeight: '20px',
                    color: active ? soma.textBrand : soma.textTertiary,
                  }}
                >
                  {tab.label}
                  {active ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 2,
                        bgcolor: soma.actionPrimary,
                      }}
                    />
                  ) : null}
                </Box>
              )
            })}
          </Stack>

          <Stack
            spacing={2}
            sx={{ flex: 1, minHeight: 0, overflow: 'auto', pr: 0.5 }}
          >
            {ACTIVITY_ITEMS.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={1}
                sx={{ alignItems: 'flex-start', p: 1.5 }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    mt: 0.75,
                    borderRadius: '50%',
                    bgcolor: soma.actionPrimary,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: 'space-between', mb: 0.5 }}
                  >
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: soma.textPrimary,
                      }}
                    >
                      {item.primary}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        lineHeight: '16px',
                        color: soma.textTertiary,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.time}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: '16px',
                      color: soma.textSecondary,
                    }}
                  >
                    {item.secondary}
                  </Typography>
                </Box>
              </Stack>
            ))}

            {isDeniedClaimDemo ? (
              visibleMessages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  choiceDisabled={interaction !== 'choices'}
                  timeDisabled={interaction !== 'timeSelect'}
                  selectedTime={selectedTime}
                  onChoice={handleChoice}
                  onTimeSelect={handleTimeSelect}
                  staffCardRef={
                    message.kind === 'choices' || message.kind === 'timeSelect'
                      ? staffCardRef
                      : undefined
                  }
                />
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: 14,
                  color: soma.textTertiary,
                  textAlign: 'center',
                  py: 4,
                }}
              >
                Guided demo lives on Denied claim follow-up.
              </Typography>
            )}
            <div ref={threadEndRef} />
          </Stack>

          <Composer onAction={onPrototypeAction} />
        </Box>

        <PanelResizeHandle
          label="Resize member panel"
          value={sideWidth}
          min={SIDE_MIN}
          max={SIDE_MAX}
          active={dragging === 'side'}
          visibleFrom="lg"
          onPointerDown={(event) => beginResize('side', event)}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onKeyDown={(event) => nudgeResize('side', event)}
          onDoubleClick={() => setSideWidth(SIDE_DEFAULT)}
        />

        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            width: { lg: railPanel ? sideWidth : 'auto' },
            flex: '0 0 auto',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <MemberToolRail
            panel={railPanel}
            member={selectedThread?.member ?? 'Riley Smith'}
            status={selectedThread?.status ?? 'In progress'}
            updated={selectedThread?.time ?? 'Today'}
            timeline={
              isDeniedClaimDemo
                ? timeline
                : [
                    {
                      id: 'open-status',
                      title: selectedThread?.title ?? 'Conversation',
                      detail: `${selectedThread?.status ?? 'In progress'} · ${selectedThread?.time ?? ''}`,
                    },
                  ]
            }
            onSelect={setRailPanel}
            onClose={() => setRailPanel(null)}
          />
        </Box>
      </Box>
    </Box>
  )
}

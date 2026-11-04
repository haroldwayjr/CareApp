import { useEffect, useMemo, useRef, useState } from 'react'
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
  getDemoInteraction,
  getMessagesThroughStep,
  getTaskDetailsForDemo,
  getTimelineForDemo,
  SCOPE_COUNTS,
  THREAD_TEAMS,
  type ChatMessage,
  type ProceedChoiceId,
  type ScopeFilter,
  type StatusCardData,
  type TaskDetail,
  type ThreadItem,
  type ThreadTeam,
  type TimelineEvent,
} from '../data/mockConversations'
import { AppIcon } from '../icons/AppIcon'
import {
  somaMenuItemSx,
  somaMenuPaperSlotProps,
} from './SomaField'
import avatarMarcus from '../assets/figma/messaging/avatar-marcus.png'
import avatarRiley from '../assets/figma/messaging/avatar-riley.png'
import logoDot from '../assets/figma/logo-dot.svg'

/** Soma semantic values used by this spike (see docs/design-system/soma). */
const soma = {
  textPrimary: '#101828',
  textSecondary: '#344054',
  textTertiary: '#475467',
  textBrand: '#002380',
  textWarning: '#75600A',
  textOnBrand: '#FFFFFF',
  surfaceDefault: '#FFFFFF',
  surfaceSubtle: '#F3F5F8',
  surfaceBrandSoft: '#F2F5FF',
  surfaceBrandSubtle: '#E0EAFF',
  surfaceSuccessSoft: '#E8F8EC',
  borderSubtle: '#D0D5DD',
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
  radiusFull: '9999px',
} as const

const panelShadow = '0px 1px 2px 0px rgba(0, 0, 0, 0.04)'

type ConversationsPageProps = {
  onPrototypeAction?: (message: string) => void
}

function ScopePills({
  value,
  onChange,
}: {
  value: ScopeFilter
  onChange: (next: ScopeFilter) => void
}) {
  const options: { id: ScopeFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: SCOPE_COUNTS.all },
    { id: 'assigned', label: 'Assigned', count: SCOPE_COUNTS.assigned },
    { id: 'watching', label: 'Watching', count: SCOPE_COUNTS.watching },
  ]

  return (
    <Box
      sx={{
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
      {options.map((option) => {
        const selected = value === option.id
        return (
          <Box
            key={option.id}
            component="button"
            type="button"
            onClick={() => onChange(option.id)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              border: 0,
              cursor: 'pointer',
              px: selected ? 1.75 : 1.5,
              py: selected ? 1 : 0.75,
              borderRadius: selected ? soma.radiusMd : soma.radiusFull,
              bgcolor: selected ? soma.actionGhostSelected : 'transparent',
              color: selected
                ? soma.actionGhostSelectedText
                : soma.textSecondary,
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: selected ? 600 : 400,
              lineHeight: selected ? '18px' : 'normal',
            }}
          >
            <Box component="span">{option.label}</Box>
            <Box
              component="span"
              sx={{
                fontSize: selected ? 13 : 12,
                color: selected
                  ? soma.actionGhostSelectedText
                  : soma.textTertiary,
                fontWeight: selected ? 600 : 400,
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

function StatusCard({ card }: { card: StatusCardData }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 420,
        border: `1px solid ${soma.borderSubtle}`,
        borderRadius: soma.radiusMd,
        bgcolor: soma.surfaceBrandSoft,
        p: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: '20px',
              color: soma.textPrimary,
            }}
          >
            {card.title}
          </Typography>
          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: soma.radiusSm,
              bgcolor: soma.surfaceSuccessSoft,
              color: soma.success,
              fontSize: 11,
              fontWeight: 500,
              lineHeight: '16px',
            }}
          >
            {card.badge}
          </Box>
        </Stack>
        <Stack spacing={0.75}>
          <DetailRow label="Owner" value={card.owner} />
          <DetailRow label="Next step" value={card.nextStep} />
          <DetailRow label="Follow-up" value={card.due} />
        </Stack>
      </Stack>
    </Box>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
      <Typography
        sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          color: soma.textPrimary,
          textAlign: 'right',
        }}
      >
        {value}
      </Typography>
    </Stack>
  )
}

function ChatBubble({
  message,
  choiceDisabled,
  timeDisabled,
  selectedTime,
  onChoice,
  onTimeSelect,
}: {
  message: ChatMessage
  choiceDisabled?: boolean
  timeDisabled?: boolean
  selectedTime?: string
  onChoice?: (id: ProceedChoiceId) => void
  onTimeSelect?: (value: string) => void
}) {
  const kind = message.kind ?? 'text'

  if (kind === 'system') {
    return (
      <Stack spacing={0.5} sx={{ textAlign: 'center', width: '100%' }}>
        <Typography
          sx={{ fontSize: 12, lineHeight: '16px', color: soma.textTertiary }}
        >
          {message.time}
        </Typography>
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

          {kind === 'choices' && message.choices ? (
            <Stack
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap', gap: 1, pt: 0.5 }}
            >
              {message.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="outlined"
                  color="primary"
                  size="small"
                  disabled={choiceDisabled}
                  onClick={() => onChoice?.(choice.id)}
                  sx={{
                    borderRadius: soma.radiusFull,
                    px: 1.5,
                    py: 0.75,
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'none',
                    minHeight: 32,
                  }}
                >
                  {choice.label}
                </Button>
              ))}
            </Stack>
          ) : null}

          {kind === 'timeSelect' && message.timeOptions ? (
            <Select
              size="small"
              displayEmpty
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
                minWidth: 180,
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
          ) : null}

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

function TaskProgressPanel({
  open,
  onClose,
  details,
  timeline,
}: {
  open: boolean
  onClose: () => void
  details: TaskDetail[]
  timeline: TimelineEvent[]
}) {
  if (!open) return null

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        bgcolor: soma.surfaceDefault,
        border: `1px solid ${soma.borderPanel}`,
        borderRadius: soma.radius2xl,
        boxShadow: panelShadow,
        overflow: 'hidden',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        pb: 2.5,
      }}
    >
      <Box sx={{ px: 2 }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
            py: 1.5,
            borderBottom: `1px solid ${soma.borderSubtle}`,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: '24px',
              color: soma.textPrimary,
            }}
          >
            Task progress
          </Typography>
          <IconButton
            aria-label="Close task progress"
            onClick={onClose}
            sx={{ color: soma.iconTertiary, width: 40, height: 40 }}
          >
            <AppIcon name="close" sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Stack sx={{ pt: 1 }}>
          {details.map((detail) => (
            <Stack
              key={detail.label}
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: 'center',
                py: 1,
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: '20px',
                  color: soma.textPrimary,
                  whiteSpace: 'nowrap',
                }}
              >
                {detail.label}
              </Typography>
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 14,
                  lineHeight: '20px',
                  color: soma.textPrimary,
                  textAlign: 'right',
                }}
              >
                {detail.value}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack sx={{ px: 2, pt: 2 }}>
          {timeline.map((event, index) => {
            const isLast = index === timeline.length - 1
            return (
              <Stack
                key={event.id}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'flex-start' }}
              >
                <Stack
                  sx={{
                    width: 10,
                    alignItems: 'center',
                    pt: 0.75,
                    alignSelf: 'stretch',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: event.active
                        ? soma.actionPrimary
                        : soma.borderSubtle,
                      flexShrink: 0,
                    }}
                  />
                  {!isLast ? (
                    <Box
                      sx={{
                        width: 1,
                        flex: 1,
                        bgcolor: soma.borderSubtle,
                        mt: 0.5,
                      }}
                    />
                  ) : null}
                </Stack>
                <Stack spacing={0.25} sx={{ flex: 1, pb: isLast ? 0 : 2 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: '18px',
                      color: soma.textPrimary,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      lineHeight: '16px',
                      color: soma.textSecondary,
                    }}
                  >
                    {event.detail}
                  </Typography>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </Box>
    </Box>
  )
}

export function ConversationsPage({ onPrototypeAction }: ConversationsPageProps) {
  const [scope, setScope] = useState<ScopeFilter>('assigned')
  const [selectedId, setSelectedId] = useState('denied-claim')
  const [taskOpen, setTaskOpen] = useState(true)
  const [threadTab, setThreadTab] = useState<'conversation' | 'task'>(
    'conversation',
  )
  const [demoStep, setDemoStep] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const threadEndRef = useRef<HTMLDivElement | null>(null)

  const isDeniedClaimDemo = selectedId === 'denied-claim'
  const interaction = getDemoInteraction(demoStep)
  const demoComplete = interaction === 'done'
  const visibleMessages = useMemo(
    () => (isDeniedClaimDemo ? getMessagesThroughStep(demoStep) : []),
    [demoStep, isDeniedClaimDemo],
  )
  const taskDetails = useMemo(
    () => getTaskDetailsForDemo(isDeniedClaimDemo && demoComplete),
    [demoComplete, isDeniedClaimDemo],
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
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [demoStep, visibleMessages.length])

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
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(260px, 300px) minmax(0, 1fr)',
            lg: taskOpen
              ? 'minmax(280px, 320px) minmax(0, 1fr) minmax(300px, 360px)'
              : 'minmax(280px, 320px) minmax(0, 1fr)',
          },
          gap: 2,
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
                    if (tab.id === 'task') setTaskOpen(true)
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
            spacing={3}
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

          {isDeniedClaimDemo && interaction === 'continue' ? (
            <Stack
              direction="row"
              sx={{ justifyContent: 'flex-end', pb: 0.5 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={advanceDemo}
                sx={{ minHeight: 40, px: 2 }}
              >
                Continue
              </Button>
            </Stack>
          ) : null}

          <Composer onAction={onPrototypeAction} />
        </Box>

        <TaskProgressPanel
          open={taskOpen}
          onClose={() => setTaskOpen(false)}
          details={taskDetails}
          timeline={timeline}
        />
      </Box>
    </Box>
  )
}

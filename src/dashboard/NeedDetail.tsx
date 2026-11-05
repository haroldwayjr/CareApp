import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { Breadcrumb } from '../soma/Breadcrumb'
import { ChatComposer } from '../soma/ChatThread'
import { MoreActions } from '../soma/MoreActions'
import { SomaAlert } from '../soma/SomaAlert'
import { SomaBadge } from '../soma/SomaBadge'
import { soma } from '../soma/tokens'
import { MAYA_ID, ownerShort, type MemberNeed } from './mockDashboard'

type NeedDetailProps = {
  need: MemberNeed
  onBack: () => void
  onCoverage: () => void
  onAssign: () => void
  onToast: (message: string) => void
}

const panelSx = {
  bgcolor: soma.surface.default,
  border: '1px solid',
  borderColor: soma.border.subtle,
  borderRadius: `${soma.radius['2xl']}px`,
  boxShadow: soma.shadow.sm,
  minHeight: 560,
  overflow: 'hidden',
} as const

function PanelTitle({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 52,
        pb: 1.5,
        borderBottom: '1px solid',
        borderColor: soma.border.subtle,
      }}
    >
      <Typography sx={{ ...soma.type.h3, color: soma.text.primary }}>{title}</Typography>
      {onClose ? (
        <IconButton aria-label={`Close ${title}`} onClick={onClose} sx={{ color: soma.icon.tertiary }}>
          <AppIcon name="close" sx={{ fontSize: 18 }} />
        </IconButton>
      ) : null}
    </Stack>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline', py: 0.75 }}>
      <Typography sx={{ ...soma.type.body2, color: soma.text.secondary, flexShrink: 0 }}>{label}</Typography>
      <Typography sx={{ ...soma.type.body1, color: soma.text.primary, ml: 'auto', textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  )
}

function Timeline({
  events,
}: {
  events: { title: string; meta: string; tone: 'neutral' | 'warning' | 'brand' }[]
}) {
  const color = {
    neutral: soma.icon.tertiary,
    warning: soma.icon.warning,
    brand: soma.action.primary,
  }
  return (
    <Stack>
      {events.map((event, index) => (
        <Stack key={event.title} direction="row" spacing={1.5}>
          <Stack sx={{ alignItems: 'center', width: 10, pt: '6px' }}>
            <Box sx={{ width: 10, height: 10, borderRadius: soma.radius.full, bgcolor: color[event.tone] }} />
            {index < events.length - 1 ? (
              <Box sx={{ width: '1px', flex: 1, minHeight: 28, bgcolor: soma.border.subtle, mt: 0.5 }} />
            ) : null}
          </Stack>
          <Box sx={{ pb: index < events.length - 1 ? 2 : 0 }}>
            <Typography sx={{ ...soma.type.body2, color: soma.text.primary }}>{event.title}</Typography>
            <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>{event.meta}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

function Initial({ letter }: { letter: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 20,
        height: 20,
        borderRadius: soma.radius.full,
        bgcolor: soma.surface.subtle,
        color: soma.text.secondary,
        display: 'grid',
        placeItems: 'center',
        ...soma.type.badgeSmall,
        flexShrink: 0,
      }}
    >
      {letter}
    </Box>
  )
}

export function NeedDetail({ need, onBack, onCoverage, onAssign, onToast }: NeedDetailProps) {
  const maya = need.id === MAYA_ID
  const [tab, setTab] = useState<'conversation' | 'task'>('conversation')
  const topic = maya ? 'Change PT clinic' : need.issue
  const owner = maya ? 'Casey' : ownerShort(need.owner)

  return (
    <Stack spacing={`${soma.stack.md}px`} sx={{ p: { xs: 2, md: 2 }, pb: 4 }}>
      <Breadcrumb items={[{ label: 'Dashboard', onClick: onBack }, { label: need.name }, { label: topic }]} />

      {maya ? (
        <SomaAlert
          tone="danger"
          title="Reassigned for Lee Park (OOO)"
          description="Morgan reassigned this referral to Casey Nguyen at 9:14 AM with handoff notes (current clinic context · Tue/Thu PM preferred)."
          actions={[
            { label: 'Reassign', onClick: onAssign },
            { label: 'Lee’s Coverage', onClick: onCoverage },
          ]}
        />
      ) : null}

      <Stack direction="row" spacing={1} sx={{ alignItems: 'stretch' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1fr) 360px' },
            gap: `${soma.stack.md}px`,
            flex: 1,
            minWidth: 0,
          }}
        >
          <Stack spacing={2} sx={{ ...panelSx, p: 2 }}>
            <PanelTitle title={topic} />
            <SomaBadge tone={need.health === 'critical' ? 'danger' : need.health === 'moderate' ? 'warning' : 'success'} label={need.health === 'critical' ? 'Critical' : need.health === 'moderate' ? 'Moderate' : 'Good'} />
            <Typography sx={{ ...soma.type.caption, color: soma.text.primary }}>
              {maya
                ? 'Member Maya Chen · Owner Casey · Watchers Jordan · Due Today 11:00 AM'
                : `Member ${need.name} · Owner ${owner} · Due ${need.dueLabel}`}
            </Typography>
            <Typography sx={{ ...soma.type.h5, color: soma.text.primary }}>Summary</Typography>
            <Typography sx={{ ...soma.type.body1, color: soma.text.primary }}>
              {maya
                ? 'Member requested a change to their PT clinic and want’s some In-network options.'
                : need.next}
            </Typography>
            <Typography sx={{ ...soma.type.h5, color: soma.text.primary }}>History</Typography>
            <Timeline
              events={
                maya
                  ? [
                      {
                        title: 'Linked to need “Change PT clinic”',
                        meta: 'Today 9:06 AM · no duplicate created',
                        tone: 'neutral',
                      },
                      {
                        title: 'Jordan started referral task',
                        meta: 'Today 9:08 AM · Owner Casey Nguyen · Jordan watching',
                        tone: 'warning',
                      },
                      {
                        title: 'Reassigned from Lee Park (OOO) to Casey Nguyen',
                        meta: 'Today 9:20 AM · by Morgan · handoff notes carried over',
                        tone: 'neutral',
                      },
                      {
                        title: 'In progress · Casey Nguyen',
                        meta: 'Today 9:20 AM · shortlisting in-network PT near 94107',
                        tone: 'brand',
                      },
                    ]
                  : [
                      {
                        title: need.issue,
                        meta: `Owner ${need.owner} · Due ${need.dueLabel}`,
                        tone: 'brand',
                      },
                    ]
              }
            />
          </Stack>

          <Stack spacing={1.5} sx={{ ...panelSx, p: 2.5 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', pb: 1.5, borderBottom: '1px solid', borderColor: soma.border.subtle }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: soma.radius.full,
                  bgcolor: soma.surface.subtle,
                  color: soma.text.secondary,
                  display: 'grid',
                  placeItems: 'center',
                  ...soma.type.subtitle2,
                }}
              >
                {need.initials.slice(0, 1)}
              </Box>
              <Box>
                <Typography sx={{ ...soma.type.h4, color: soma.text.primary }}>{need.name}</Typography>
                <Typography sx={{ ...soma.type.caption, color: soma.icon.warning }}>{topic}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" sx={{ borderBottom: '1px solid', borderColor: soma.border.subtle }}>
              {(
                [
                  ['conversation', 'Conversation'],
                  ['task', 'Task · 1 open'],
                ] as const
              ).map(([id, label]) => (
                <Button
                  key={id}
                  onClick={() => setTab(id)}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 0,
                    px: 1.5,
                    minHeight: 34,
                    color: tab === id ? soma.text.brand : soma.text.tertiary,
                    ...soma.type.body1,
                    fontWeight: tab === id ? 600 : 400,
                    borderBottom: '2px solid',
                    borderColor: tab === id ? soma.action.primary : 'transparent',
                  }}
                >
                  {label}
                </Button>
              ))}
            </Stack>

            {tab === 'task' ? (
              <Stack spacing={1} sx={{ py: 1 }}>
                <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>{topic}</Typography>
                <Typography sx={{ ...soma.type.body2, color: soma.text.secondary }}>
                  {maya
                    ? '1 open task · Owner Casey Nguyen · Due Thu 4:00 PM'
                    : `1 open task · Owner ${need.owner} · Due ${need.dueLabel}`}
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: 'auto', pr: 0.5 }}>
                {maya ? (
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: soma.radius.full, bgcolor: soma.action.primary, mt: 0.75 }} />
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
                        <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>
                          Casey Nguyen owns the referral
                        </Typography>
                        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>Just now</Typography>
                      </Stack>
                      <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>
                        Jordan watching · Lee Park OOO covered
                      </Typography>
                    </Box>
                  </Stack>
                ) : null}
                <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, textAlign: 'center' }}>
                  Today · 9:02 AM
                </Typography>
                <MemberBubble
                  name={need.name}
                  time="9:02 AM"
                  body={
                    maya
                      ? 'Can you help me switch PT clinics? My current place isn’t working out — still need something in-network near SoMa.'
                      : need.issue
                  }
                />
                {maya ? (
                  <>
                    <AgentBubble
                      name="Jordan"
                      role="Quarterback · relationship owner"
                      time="9:05 AM"
                      body="On it — I’ve linked this to a specialist referral for an in-network PT clinic near you. Casey owns the referral; I’ll share options here."
                    />
                    <AgentBubble
                      name="Jordan"
                      role="Quarterback · relationship owner"
                      time="9:14 AM"
                      body="Casey is shortlisting 3 in-network alternatives near 94107. I’ll update you when options are ready."
                    />
                    <Box>
                      <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, textAlign: 'center' }}>
                        9:20 AM
                      </Typography>
                      <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, textAlign: 'center' }}>
                        Morgan reassigned referral from Lee Park (OOO) to Casey Nguyen
                      </Typography>
                    </Box>
                    <AgentBubble
                      name="Casey Nguyen"
                      role="Referral specialist"
                      time="9:20 AM"
                      body="Thanks Jordan — I have Maya’s Tue/Thu PM preference and will confirm wait times on the shortlist."
                    />
                    <MemberBubble name="Maya Chen" time="9:24 AM" body="Prefer something close to SoMa if possible. Thank you!" />
                  </>
                ) : null}
              </Stack>
            )}
            <ChatComposer onSend={() => onToast('Prototype only — message not sent.')} />
          </Stack>

          <Stack spacing={2} sx={{ ...panelSx, p: 2 }}>
            <PanelTitle title="Details" onClose={() => onToast('Prototype only — the details panel stays open.')} />
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button variant="outlined" size="small" onClick={onAssign}>
                Reassign
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onToast('Prototype only — team message is not connected.')}
              >
                Message team member
              </Button>
              <MoreActions
                label="Change conversation status"
                actions={[
                  { label: 'Mark resolved', onClick: () => onToast('Prototype only — still open.') },
                  { label: 'Close', tone: 'danger', onClick: () => onToast('Prototype only — task stays open.') },
                ]}
              />
            </Stack>
            <Stack>
              <DetailRow label="Quarterback" value={maya ? 'Jordan' : 'Jordan'} />
              <DetailRow label="Task owner" value={maya ? 'Casey Nguyen' : need.owner} />
              <DetailRow label="Watcher" value={maya ? 'Jordan' : need.watching ? 'Jordan' : '—'} />
              <DetailRow label="Member" value={need.name} />
            </Stack>
            <Typography sx={{ ...soma.type.h5, color: soma.text.primary }}>Next step</Typography>
            <Stack>
              <DetailRow
                label="Action"
                value={maya ? 'Shortlist 3 clinics near 94107' : need.next}
              />
              <DetailRow label="Expected update" value={maya ? 'Thu · 4:00 PM' : need.dueLabel} />
              <DetailRow label="Preference" value={maya ? 'Tue/Thu PM · near SoMa' : '—'} />
            </Stack>
          </Stack>
        </Box>

        <Stack
          spacing={1}
          sx={{
            width: 56,
            alignItems: 'center',
            py: 1.5,
            border: '1px solid',
            borderColor: soma.border.subtle,
            borderRadius: `${soma.radius['2xl']}px`,
            bgcolor: soma.surface.default,
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <IconButton aria-label="Dashboard" onClick={onBack} sx={{ color: soma.icon.brand }}>
            <AppIcon name="home" sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton aria-label="Conversation" sx={{ color: soma.icon.tertiary }}>
            <AppIcon name="copy" sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            aria-label="Activity"
            onClick={() => onToast('Prototype only — activity is not connected.')}
            sx={{ color: soma.icon.tertiary }}
          >
            <AppIcon name="list" sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            aria-label="Details"
            onClick={() => onToast('Prototype only — this rail stays on the detail page.')}
            sx={{ color: soma.icon.tertiary }}
          >
            <AppIcon name="info" sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

function MemberBubble({ name, time, body }: { name: string; time: string; body: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
      <Initial letter={name.slice(0, 1)} />
      <Stack spacing={0.5} sx={{ alignItems: 'flex-start', maxWidth: 520 }}>
        <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>{name}</Typography>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: soma.surface.subtle,
            borderRadius: `${soma.radius['3xl']}px`,
            borderTopLeftRadius: `${soma.radius.xxs}px`,
          }}
        >
          <Typography sx={{ ...soma.type.body1, color: soma.text.primary }}>{body}</Typography>
        </Box>
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>{time}</Typography>
      </Stack>
    </Stack>
  )
}

function AgentBubble({ name, role, time, body }: { name: string; role: string; time: string; body: string }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <Stack spacing={0.5} sx={{ alignItems: 'flex-end', maxWidth: 520 }}>
        <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>
          {name} · {role}
        </Typography>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: soma.surface.brandSubtle,
            borderRadius: `${soma.radius['3xl']}px`,
            borderTopRightRadius: `${soma.radius.xxs}px`,
          }}
        >
          <Typography sx={{ ...soma.type.body1, color: soma.text.primary }}>{body}</Typography>
        </Box>
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>{time}</Typography>
      </Stack>
      <Initial letter={name.slice(0, 1)} />
    </Stack>
  )
}

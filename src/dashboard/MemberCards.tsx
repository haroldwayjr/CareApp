import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { MoreActions } from '../soma/MoreActions'
import { SomaAlert } from '../soma/SomaAlert'
import { SomaCard } from '../soma/SomaCard'
import { soma } from '../soma/tokens'
import { MAYA_ID, type MemberNeed } from './mockDashboard'
import { NeedBadges } from './NeedBadges'

type MemberCardsProps = {
  needs: MemberNeed[]
  hiddenCount: number
  healthyHidden: boolean
  onOpen: (id: string) => void
  onAssign: (id: string) => void
  onToast: (message: string) => void
}

function Initials({ initials }: { initials: string }) {
  return (
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
        ...soma.type.caption,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </Box>
  )
}

function MemberCard({
  need,
  onOpen,
  onAssign,
  onToast,
}: {
  need: MemberNeed
  onOpen: (id: string) => void
  onAssign: (id: string) => void
  onToast: (message: string) => void
}) {
  const maya = need.id === MAYA_ID
  const unowned = need.owner === 'Unowned'
  return (
    <SomaCard sx={{ display: 'flex', flexDirection: 'column', gap: `${soma.stack.sm}px`, minHeight: 180 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
        <Initials initials={need.initials} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>{need.name}</Typography>
        </Box>
        <NeedBadges need={need} showHealthIcon />
      </Stack>
      <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>
        {maya
          ? `Task owner ${need.owner} · Watcher ${need.watchers} · ${need.timeLabel} open`
          : `Owner ${need.owner} · Watchers ${need.watchers} · ${need.timeLabel} open`}
      </Typography>
      {maya ? (
        <SomaAlert
          tone="danger"
          title="Lee OOO · Morgan reassigned to Casey"
          description="Referral ownership moved. Jordan still owns Maya's relationship and is watching. Member thread unchanged."
          actions={[
            { label: 'Open task', onClick: () => onOpen(need.id) },
            { label: 'Message Maya', onClick: () => onToast('Prototype only — message not sent.') },
          ]}
        />
      ) : null}
      <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>{need.issue}</Typography>
      <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>Next: {need.next}</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end', mt: 'auto' }}>
        {maya ? (
          <>
            <Button variant="contained" color="primary" size="small" onClick={() => onOpen(need.id)}>
              Open
            </Button>
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={() => onToast('Prototype only — update drafted for Maya.')}
            >
              Update Maya
            </Button>
          </>
        ) : unowned ? (
          <>
            <Button variant="contained" color="primary" size="small" onClick={() => onAssign(need.id)}>
              Assign to...
            </Button>
            <Button variant="outlined" color="primary" size="small" onClick={() => onOpen(need.id)}>
              Open
            </Button>
          </>
        ) : (
          <Button variant="outlined" color="primary" size="small" onClick={() => onOpen(need.id)}>
            Open
          </Button>
        )}
        <MoreActions
          label={`More actions for ${need.name}`}
          actions={[
            { label: 'Open', onClick: () => onOpen(need.id) },
            { label: 'Assign', onClick: () => onAssign(need.id) },
          ]}
        />
      </Stack>
    </SomaCard>
  )
}

export function MemberCards({
  needs,
  hiddenCount,
  healthyHidden,
  onOpen,
  onAssign,
  onToast,
}: MemberCardsProps) {
  return (
    <Stack spacing={`${soma.stack.md}px`}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: `${soma.stack.md}px`,
        }}
      >
        {needs.map((need) => (
          <MemberCard
            key={need.id}
            need={need}
            onOpen={onOpen}
            onAssign={onAssign}
            onToast={onToast}
          />
        ))}
      </Box>
      {hiddenCount > 0 ? (
        <Box
          sx={{
            border: '1px solid',
            borderColor: soma.border.subtle,
            borderRadius: `${soma.radius.md}px`,
            px: 2,
            py: 1.5,
          }}
        >
          <Typography sx={{ ...soma.type.body2, color: soma.text.secondary }}>
            {healthyHidden ? 'Healthy · hidden by filter' : `${hiddenCount} members hidden by filter`}
          </Typography>
        </Box>
      ) : null}
    </Stack>
  )
}

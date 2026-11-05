import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SomaCard } from '../soma/SomaCard'
import { soma } from '../soma/tokens'
import { ViewSwitcher } from '../soma/ViewSwitcher'
import type { MemberNeed } from './mockDashboard'
import { NeedBadges } from './NeedBadges'

type SpecialistWorkProps = {
  needs: MemberNeed[]
  onOpen: (id: string) => void
  onHandBack: (id: string) => void
  onRole: (persona: 'jordan' | 'casey') => void
  onToast: (message: string) => void
}

function findByName(needs: MemberNeed[], name: string) {
  return needs.find((need) => need.name === name)
}

function WorkRow({
  need,
  title,
  meta,
  footnote,
  actions,
}: {
  need: MemberNeed
  title: string
  meta: string
  footnote?: string
  actions: { label: string; onClick: () => void; emphasis?: 'contained' | 'outlined' | 'text' }[]
}) {
  return (
    <SomaCard>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
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
          {need.initials}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
            <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>{title}</Typography>
            <NeedBadges need={{ ...need, watching: false }} />
          </Stack>
          <Typography sx={{ ...soma.type.body2, color: soma.text.secondary, mt: 0.5 }}>{meta}</Typography>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 1.5 }}>
            {actions.map((action) => (
              <Button
                key={action.label}
                size="small"
                color="primary"
                variant={action.emphasis ?? 'outlined'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
          {footnote ? (
            <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, mt: 1 }}>{footnote}</Typography>
          ) : null}
        </Box>
      </Stack>
    </SomaCard>
  )
}

export function SpecialistWork({ needs, onOpen, onHandBack, onRole, onToast }: SpecialistWorkProps) {
  const maya = findByName(needs, 'Maya Chen')
  const riley = findByName(needs, 'Riley West')
  const sam = findByName(needs, 'Sam Okonkwo')
  const dana = findByName(needs, 'Dana Whitfield')
  const luis = findByName(needs, 'Luis Andrade')
  const pinned = [maya, riley].filter((need): need is MemberNeed => Boolean(need))
  const assigned = [sam, dana, luis].filter((need): need is MemberNeed => Boolean(need))

  function rowActions(need: MemberNeed, primary: string) {
    return [
      { label: 'Open', emphasis: 'outlined' as const, onClick: () => onOpen(need.id) },
      { label: primary, emphasis: 'outlined' as const, onClick: () => onToast(`Prototype only — ${primary} is not sent.`) },
      { label: need.name === 'Maya Chen' ? 'Log clinics' : 'Update status', emphasis: 'text' as const, onClick: () => onToast('Prototype only — status unchanged.') },
      { label: 'Hand back to QB', emphasis: 'text' as const, onClick: () => onHandBack(need.id) },
    ]
  }

  return (
    <Stack spacing={`${soma.stack.md}px`} sx={{ p: { xs: 2, md: 3 }, pb: 6 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography component="h1" sx={{ ...soma.type.h2, color: soma.text.primary }}>
            Casey’s Work
          </Typography>
          <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>
            Casey Nguyen · Referral specialist · Covering Lee Park (OOO) · Updated 1:42 PM PT
          </Typography>
        </Box>
        <ViewSwitcher
          ariaLabel="Role"
          value="S"
          onChange={(id) => onRole(id === 'Q' ? 'jordan' : 'casey')}
          options={[
            { id: 'Q', label: 'Q' },
            { id: 'S', label: 'S' },
          ]}
        />
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: `${soma.stack.md}px` }}>
        <SomaCard>
          <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>Assigned to me</Typography>
          <Typography sx={{ ...soma.type.displaySmall, color: soma.text.primary }}>5</Typography>
        </SomaCard>
        <SomaCard>
          <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>Due soon</Typography>
          <Typography sx={{ ...soma.type.displaySmall, color: soma.text.primary }}>2</Typography>
        </SomaCard>
        <SomaCard>
          <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>Waiting on member</Typography>
          <Typography sx={{ ...soma.type.displaySmall, color: soma.text.primary }}>1</Typography>
        </SomaCard>
      </Box>

      <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>Responses waiting · pinned</Typography>
      {pinned.map((need) => (
        <WorkRow
          key={need.id}
          need={need}
          title={
            need.name === 'Maya Chen'
              ? 'Maya Chen · In-network PT clinic'
              : `${need.name} · Imaging referral`
          }
          meta={
            need.name === 'Maya Chen'
              ? 'Reassigned today by Morgan · Due Thu 4 PM · Next: Shortlist 3 clinics near ZIP 94107'
              : 'Due Today 5 PM · Next: Confirm in-network facility'
          }
          footnote={
            need.name === 'Maya Chen'
              ? 'Watcher: Jordan (QB) · Relationship owner unchanged'
              : 'View full member profile'
          }
          actions={rowActions(need, need.name === 'Maya Chen' ? 'Update Jordan' : 'Reply')}
        />
      ))}

      <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>Assigned needs · prioritized</Typography>
      {assigned.map((need) => (
        <WorkRow
          key={need.id}
          need={need}
          title={`${need.name} · ${need.issue}`}
          meta={`Due this week · Next: ${need.next}`}
          footnote="View full member profile"
          actions={rowActions(need, 'Reply')}
        />
      ))}
    </Stack>
  )
}

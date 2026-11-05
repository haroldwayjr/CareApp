import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SomaCard } from '../soma/SomaCard'
import { soma } from '../soma/tokens'
import type { MemberNeed } from './mockDashboard'

const COVERAGE_IDS = ['maya-chen', 'amara-diallo', 'noah-patel', 'kenji-sato'] as const

const COPY: Record<string, { title: string; meta: string; suggested: string; primary: 'Reassign' | 'Claim' }> = {
  'maya-chen': {
    title: 'Maya Chen · Find in-network PT clinic',
    meta: 'Assigned by Jordan · Lee started intake · OOO today · Watcher Jordan',
    suggested: 'Casey Nguyen',
    primary: 'Reassign',
  },
  'amara-diallo': {
    title: 'Amara Diallo · New specialty start',
    meta: 'Lee owned · 1 open need · Suggest: Avery Cole',
    suggested: 'Avery Cole',
    primary: 'Claim',
  },
  'noah-patel': {
    title: 'Noah Patel · Quantity limit exception',
    meta: 'Lee owned · 2 open needs · Suggest: Casey Nguyen',
    suggested: 'Casey Nguyen',
    primary: 'Claim',
  },
  'kenji-sato': {
    title: 'Kenji Sato · Step therapy review',
    meta: 'Lee owned · 1 open need · Suggest: Avery Cole',
    suggested: 'Avery Cole',
    primary: 'Claim',
  },
}

type CoverageReassignmentProps = {
  needs: MemberNeed[]
  onOpen: (id: string) => void
  onAssign: (id: string, suggested: string) => void
}

export function CoverageReassignment({ needs, onOpen, onAssign }: CoverageReassignmentProps) {
  const rows = COVERAGE_IDS.map((id) => needs.find((need) => need.id === id)).filter(
    (need): need is MemberNeed => Boolean(need),
  )

  return (
    <Stack spacing={`${soma.stack.md}px`} sx={{ p: { xs: 2, md: 3 }, pb: 6 }}>
      <Stack spacing={0.5}>
        <Typography component="h1" sx={{ ...soma.type.h2, color: soma.text.primary }}>
          Coverage · Lee Park OOO
        </Typography>
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>
          Morgan Blake · Referral coverage lead · Reassign Lee’s open work with handoff context
        </Typography>
      </Stack>
      {rows.map((need) => {
        const copy = COPY[need.id]
        return (
          <SomaCard key={need.id}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
              <Stack spacing={0.25} sx={{ flex: 1 }}>
                <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>
                  {copy.title}
                </Typography>
                <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>
                  {copy.meta}
                  {need.owner !== 'Lee Park' && need.id !== 'maya-chen' ? ` · Now ${need.owner}` : ''}
                  {need.id === 'maya-chen' ? ` · Task owner ${need.owner}` : ''}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onAssign(need.id, copy.suggested)}
                >
                  {copy.primary === 'Reassign' ? 'Reassign...' : 'Claim'}
                </Button>
                {copy.primary === 'Reassign' ? (
                  <Button variant="outlined" color="primary" size="small" onClick={() => onOpen(need.id)}>
                    Open
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onAssign(need.id, copy.suggested)}
                  >
                    Assign
                  </Button>
                )}
              </Stack>
            </Stack>
          </SomaCard>
        )
      })}
    </Stack>
  )
}

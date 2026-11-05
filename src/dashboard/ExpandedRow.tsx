import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SomaAlert } from '../soma/SomaAlert'
import { SomaCard } from '../soma/SomaCard'
import { soma } from '../soma/tokens'
import { MAYA_ID, type MemberNeed } from './mockDashboard'

type ExpandedRowProps = {
  need: MemberNeed
  onOpenThread: () => void
  onToast: (message: string) => void
}

export function ExpandedRow({ need, onOpenThread, onToast }: ExpandedRowProps) {
  const maya = need.id === MAYA_ID
  return (
    <Stack
      spacing={`${soma.stack.md}px`}
      sx={{
        px: 2,
        py: 2,
        bgcolor: soma.surface.default,
        borderBottom: '1px solid',
        borderColor: soma.border.hairline,
      }}
    >
      <Typography sx={{ ...soma.type.h4, color: soma.text.primary }}>{need.issue}</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr 1fr' },
          gap: `${soma.stack.md}px`,
        }}
      >
        {maya ? (
          <SomaAlert
            tone="danger"
            title="Reassigned for Lee Park (OOO)"
            description="Morgan reassigned this referral to Casey Nguyen at 9:14 AM with handoff notes (current clinic context · Tue/Thu PM preferred). Jordan remains watcher. Member thread unchanged."
            actions={[
              { label: 'Open thread', onClick: onOpenThread },
              {
                label: 'Message Casey',
                onClick: () => onToast('Prototype only — Message Casey is not connected.'),
              },
            ]}
          />
        ) : (
          <SomaCard>
            <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>Ownership</Typography>
            <Typography sx={{ ...soma.type.body2, color: soma.text.secondary, mt: 1 }}>
              Owner {need.owner}. Watchers {need.watcherCount}. Due {need.dueLabel}.
            </Typography>
          </SomaCard>
        )}
        <SomaCard>
          <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>Most Recent Message</Typography>
          <Typography sx={{ ...soma.type.body2, color: soma.text.secondary, mt: 1 }}>
            {maya
              ? 'Maya: Can you help me switch PT clinics? My current place isn’t working out — still need something in-network near SoMa.'
              : `${need.name.split(' ')[0]}: ${need.issue}`}
          </Typography>
        </SomaCard>
        <SomaCard>
          <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>
            {maya ? 'Next step · Owner Casey · Due Thu 4 PM' : `Next step · Due ${need.dueLabel}`}
          </Typography>
          <Typography sx={{ ...soma.type.body2, color: soma.text.secondary, mt: 1 }}>
            {maya
              ? 'Shortlist 3 in-network alternatives near 94107. Confirm wait times, then Jordan shares options with Maya.'
              : need.next}
          </Typography>
        </SomaCard>
      </Box>
    </Stack>
  )
}

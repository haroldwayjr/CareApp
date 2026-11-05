import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { soma } from '../soma/tokens'
import { ASSIGNEES } from './mockDashboard'

type AssigneeDialogProps = {
  open: boolean
  memberName: string
  suggested: string
  onClose: () => void
  onConfirm: (owner: string) => void
}

export function AssigneeDialog({
  open,
  memberName,
  suggested,
  onClose,
  onConfirm,
}: AssigneeDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: `${soma.radius.md}px`,
            p: 1,
            width: 420,
          },
        },
      }}
    >
      {open ? (
        <AssigneeForm
          key={`${memberName}-${suggested}`}
          memberName={memberName}
          suggested={suggested}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      ) : null}
    </Dialog>
  )
}

function AssigneeForm({
  memberName,
  suggested,
  onClose,
  onConfirm,
}: Omit<AssigneeDialogProps, 'open'>) {
  const [owner, setOwner] = useState(suggested)

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
        <AppIcon name="info" sx={{ fontSize: 22, color: soma.icon.brand, mt: '2px' }} />
        <Stack spacing={0.5}>
          <Typography sx={{ ...soma.type.h4, color: soma.text.primary }}>Assign owner</Typography>
          <Typography sx={{ ...soma.type.body1, color: soma.text.secondary }}>
            Choose who should own {memberName}. This updates the dashboard, specialist list, and coverage queue.
          </Typography>
        </Stack>
      </Stack>
      <TextField
        select
        label="Assignee"
        value={owner}
        onChange={(event) => setOwner(event.target.value)}
        fullWidth
        size="small"
      >
        {ASSIGNEES.map((name) => (
          <MenuItem key={name} value={name} sx={soma.type.subtitle2}>
            {name}
          </MenuItem>
        ))}
      </TextField>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => onConfirm(owner)}>
          Assign
        </Button>
      </Stack>
    </Stack>
  )
}

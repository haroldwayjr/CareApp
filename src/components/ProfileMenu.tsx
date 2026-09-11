import { useState, type MouseEvent } from 'react'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import type { Theme } from '@mui/material/styles'

const AVAILABILITY = [
  'Available',
  'Unavailable',
  'Away from Desk',
  'Break',
  'Meal',
] as const

const WORK_ACTIVITY = [
  'Catch Up Time',
  'Coaching',
  'Complex Case',
  'Meeting',
  'Outreach',
  'Project',
  'Shift Wrap-up',
  'Special',
  'System Issue',
  'Task Time',
  'Tickets',
  'Training',
] as const

type Status =
  | (typeof AVAILABILITY)[number]
  | (typeof WORK_ACTIVITY)[number]

type ProfileMenuProps = {
  onAction?: (message: string) => void
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const path =
    direction === 'left' ? 'm13.5 4.5-6 6 6 6' : 'm10.5 4.5 6 6-6 6'

  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 24 24"
      sx={{ width: 18, height: 18, color: 'icon.tertiary', flexShrink: 0 }}
    >
      <Box
        component="path"
        d={path}
        sx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.75,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </Box>
  )
}

function Checkmark() {
  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 24 24"
      sx={{ width: 18, height: 18, color: 'primary.main', flexShrink: 0 }}
    >
      <Box
        component="path"
        d="m5 12.5 4.25 4.25L19 7"
        sx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </Box>
  )
}

function signalColor(status: Status, theme: Theme) {
  if (status === 'Available') return theme.palette.success.main
  if (status === 'Unavailable') return theme.palette.icon.tertiary
  if ((AVAILABILITY as readonly Status[]).includes(status)) {
    return theme.palette.warning.main
  }
  return theme.palette.error.main
}

function StatusSignal({
  status,
  filled = false,
}: {
  status: Status
  filled?: boolean
}) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          border: 2,
          borderColor: (theme) => signalColor(status, theme),
          bgcolor: filled
            ? (theme) => signalColor(status, theme)
            : 'transparent',
        }}
      />
    </Box>
  )
}

const rowSx = {
  minHeight: 40,
  px: 2,
  py: 1,
  gap: 1.25,
  color: 'text.primary',
  '&:hover': {
    bgcolor: 'action.hover',
  },
}

export function ProfileMenu({ onAction }: ProfileMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [level, setLevel] = useState<1 | 2>(1)
  const [status, setStatus] = useState<Status>('Available')
  const open = Boolean(anchorEl)

  function openMenu(event: MouseEvent<HTMLElement>) {
    setLevel(1)
    setAnchorEl(event.currentTarget)
  }

  function closeMenu() {
    setAnchorEl(null)
    setLevel(1)
  }

  function runPrototypeAction(label: string) {
    onAction?.(`Prototype only — ${label}.`)
    closeMenu()
  }

  function selectStatus(nextStatus: Status) {
    setStatus(nextStatus)
    closeMenu()
  }

  function renderStatusRow(option: Status) {
    const selected = option === status

    return (
      <ListItemButton
        key={option}
        selected={selected}
        onClick={() => selectStatus(option)}
        role="menuitemradio"
        aria-checked={selected}
        sx={{
          ...rowSx,
          '&.Mui-selected': { bgcolor: 'transparent' },
          '&.Mui-selected:hover': { bgcolor: 'action.hover' },
        }}
      >
        <StatusSignal status={option} filled={option === 'Available'} />
        <Typography sx={{ flex: 1, fontSize: 14, color: 'text.primary' }}>
          {option}
        </Typography>
        {selected ? <Checkmark /> : null}
      </ListItemButton>
    )
  }

  return (
    <>
      <IconButton
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
        size="small"
        sx={{ p: 0.5 }}
      >
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              width: 12,
              minWidth: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: (theme) => signalColor(status, theme),
              border: 2,
              borderColor: 'background.paper',
            },
          }}
        >
          <Avatar
            alt="Profile"
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            HW
          </Avatar>
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              mt: 1,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              boxShadow: '0 4px 16px rgba(16,29,56,0.12)',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box
          role="menu"
          aria-label={level === 1 ? 'Profile menu' : 'Status menu'}
          sx={{ py: 0.5, maxHeight: 420, overflowY: 'auto' }}
        >
          {level === 1 ? (
            <>
              <ListItemButton
                onClick={() => runPrototypeAction('Account Settings')}
                role="menuitem"
                sx={rowSx}
              >
                Account Settings
              </ListItemButton>
              <Divider sx={{ my: 0.5 }} />
              <ListItemButton
                onClick={() => setLevel(2)}
                role="menuitem"
                sx={rowSx}
              >
                <StatusSignal status={status} filled={status === 'Available'} />
                <Typography sx={{ flex: 1, fontSize: 14, color: 'text.primary' }}>
                  {status}
                </Typography>
                <Chevron direction="right" />
              </ListItemButton>
              {['Admin', 'Get help', 'Logout'].map((label) => (
                <ListItemButton
                  key={label}
                  onClick={() => runPrototypeAction(label)}
                  role="menuitem"
                  sx={rowSx}
                >
                  {label}
                </ListItemButton>
              ))}
            </>
          ) : (
            <>
              <ListItemButton
                onClick={() => setLevel(1)}
                role="menuitem"
                sx={rowSx}
              >
                <Chevron direction="left" />
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  Status
                </Typography>
              </ListItemButton>
              <Divider sx={{ my: 0.5 }} />
              <Typography
                component="div"
                sx={{
                  px: 2,
                  py: 0.75,
                  color: 'text.secondary',
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: '18px',
                }}
              >
                Availability
              </Typography>
              {AVAILABILITY.map(renderStatusRow)}
              <Typography
                component="div"
                sx={{
                  px: 2,
                  pt: 1.25,
                  pb: 0.75,
                  color: 'text.secondary',
                  fontSize: 12,
                  fontWeight: 600,
                  lineHeight: '18px',
                }}
              >
                Work activity
              </Typography>
              {WORK_ACTIVITY.map(renderStatusRow)}
            </>
          )}
        </Box>
      </Popover>
    </>
  )
}

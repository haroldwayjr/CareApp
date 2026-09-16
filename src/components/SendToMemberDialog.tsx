import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { ProviderResult } from '../data/mockCareResults'
import { RiseTransition, RISE_DURATION_MS } from './RiseTransition'

type SendToMemberDialogProps = {
  open: boolean
  providers: ProviderResult[]
  onClose: () => void
  onSend: (email: string) => void
}

/**
 * Prototype modal to email selected providers to a member.
 */
export function SendToMemberDialog({
  open,
  providers,
  onClose,
  onSend,
}: SendToMemberDialogProps) {
  const [email, setEmail] = useState('marcus.j@email.com')

  function handleSend() {
    onSend(email.trim())
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false}
      slots={{ transition: RiseTransition }}
      transitionDuration={{
        enter: RISE_DURATION_MS,
        exit: RISE_DURATION_MS,
      }}
      aria-labelledby="send-to-member-title"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(33, 33, 33, 0.42)' },
        },
        paper: {
          sx: {
            borderRadius: 2,
            width: { xs: '100%', sm: '100%' },
            maxWidth: { xs: '100%', sm: 520 },
            m: { xs: 1.5, sm: 2 },
            maxHeight: 'calc(100vh - 32px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <DialogTitle
        id="send-to-member-title"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 1,
          px: 3,
          pt: 2.5,
          pb: 1,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0,
        }}
      >
        Send provider list to member
        <IconButton
          aria-label="Close"
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary', mt: -0.5, mr: -1 }}
        >
          <Box
            component="span"
            aria-hidden
            sx={{
              width: 20,
              height: 20,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5 15 15M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Box>
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 0, pb: 1 }}>
        <Typography
          sx={{
            mb: 2.5,
            fontSize: 14,
            lineHeight: 1.45,
            color: 'text.secondary',
            letterSpacing: 0,
          }}
        >
          The email will include a list of all locations & network statuses for
          the selected providers.
        </Typography>

        <Typography
          component="label"
          htmlFor="send-to-email"
          sx={{
            display: 'block',
            mb: 0.75,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0,
            color: 'text.primary',
          }}
        >
          Send to
        </Typography>
        <TextField
          id="send-to-email"
          fullWidth
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          size="small"
          sx={{
            mb: 2.5,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: 14,
            },
          }}
        />

        <Stack spacing={1.5} sx={{ maxHeight: 240, overflow: 'auto' }}>
          {providers.map((provider) => (
            <Box
              key={provider.id}
              sx={{
                px: 1.5,
                py: 1.25,
                borderRadius: '8px',
                bgcolor: 'grey.50',
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0,
                  lineHeight: 1.35,
                  color: 'text.primary',
                }}
              >
                {provider.name}, {provider.credentials}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: 0,
                  lineHeight: 1.4,
                  color: 'text.secondary',
                }}
              >
                {provider.specialty}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: 0,
                  lineHeight: 1.4,
                  color: 'text.secondary',
                }}
              >
                {provider.address} • {Math.round(provider.distanceMiles)} mi
              </Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1.5,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Button
          onClick={onClose}
          color="inherit"
          sx={{
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: 0,
            color: 'text.secondary',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={!email.trim() || providers.length === 0}
          sx={{ fontWeight: 500, fontSize: 14, letterSpacing: 0, px: 2.5 }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

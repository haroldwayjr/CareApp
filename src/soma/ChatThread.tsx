import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { soma } from './tokens'

export type ChatSide = 'member' | 'specialist'

export type ChatLine = {
  id: string
  side: ChatSide
  name: string
  role?: string
  body: string
  meta?: string
}

export function ChatMessage({ line }: { line: ChatLine }) {
  const member = line.side === 'member'
  return (
    <Stack
      spacing={`${soma.stack.xs}px`}
      sx={{ alignItems: member ? 'flex-start' : 'flex-end' }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Box
          aria-hidden
          sx={{
            width: 20,
            height: 20,
            borderRadius: soma.radius.full,
            bgcolor: soma.surface.subtle,
            color: soma.text.secondary,
            ...soma.type.badgeSmall,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {line.name.slice(0, 1)}
        </Box>
        <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>
          {line.name}
          {line.role ? ` · ${line.role}` : ''}
        </Typography>
      </Stack>
      <Box
        sx={{
          maxWidth: 420,
          px: `${soma.inset.md}px`,
          py: `${soma.inset.sm}px`,
          borderRadius: `${soma.radius['3xl']}px`,
          borderTopLeftRadius: member ? `${soma.radius.xxs}px` : undefined,
          borderTopRightRadius: member ? undefined : `${soma.radius.xxs}px`,
          bgcolor: member ? soma.surface.subtle : soma.surface.brandSubtle,
        }}
      >
        <Typography sx={{ ...soma.type.body1, color: soma.text.primary }}>{line.body}</Typography>
      </Box>
      {line.meta ? (
        <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, maxWidth: 420 }}>
          {line.meta}
        </Typography>
      ) : null}
    </Stack>
  )
}

type ChatComposerProps = {
  onSend: () => void
}

/** Static composer. Send does not append a message. */
export function ChatComposer({ onSend }: ChatComposerProps) {
  return (
    <Stack
      spacing={`${soma.stack.sm}px`}
      sx={{
        width: '100%',
        px: `${soma.inset.md}px`,
        pt: `${soma.space[16]}px`,
        pb: `${soma.inset.md}px`,
        borderRadius: `${soma.radius.xl}px`,
        bgcolor: soma.surface.default,
        border: '1px solid',
        borderColor: soma.border.subtle,
      }}
    >
      <Typography sx={{ ...soma.type.body1, color: soma.text.tertiary, pl: 1 }}>
        Write a message...
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          aria-label="Attach"
          variant="text"
          color="primary"
          sx={{ minWidth: 36, width: 36, height: 36, p: 0, borderRadius: soma.radius.full }}
        >
          <AppIcon name="add" sx={{ fontSize: 18 }} />
        </Button>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button
            aria-label="Rewrite"
            variant="text"
            color="primary"
            sx={{ minWidth: 36, width: 36, height: 36, p: 0, borderRadius: soma.radius.full }}
          >
            <AppIcon name="sparkles" sx={{ fontSize: 18 }} />
          </Button>
          <Button
            aria-label="Send"
            variant="contained"
            color="primary"
            onClick={onSend}
            sx={{ minWidth: 36, width: 36, height: 36, p: 0, borderRadius: soma.radius.full }}
          >
            <AppIcon name="send" sx={{ fontSize: 16, color: soma.icon.onBrand }} />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

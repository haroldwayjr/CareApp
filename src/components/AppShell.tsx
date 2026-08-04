import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import logomark from '../assets/figma/logomark.svg'

const NAV_ITEMS = ['Dashboard', 'My Work', 'Schedule', 'Search'] as const

type AppShellProps = {
  onBrandClick?: () => void
  onNavClick?: (item: (typeof NAV_ITEMS)[number]) => void
}

export function AppShell({ onBrandClick, onNavClick }: AppShellProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="enter-fade-up"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 62,
          height: 62,
          px: { xs: 2, md: 3 },
          gap: { xs: 1, md: 2 },
          '&.MuiToolbar-root': {
            minHeight: 62,
          },
        }}
      >
        <Stack direction="row" spacing={{ xs: 1.5, md: 3 }} sx={{ alignItems: 'center', minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
            onClick={onBrandClick}
          >
            <Box
              component="img"
              src={logomark}
              alt=""
              sx={{ width: 18, height: 20, display: 'block' }}
            />
            <Typography
              component="span"
              sx={{
                color: 'primary.main',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 0,
                lineHeight: '24px',
              }}
            >
              Care App
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'center',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Button
                key={item}
                color="inherit"
                onClick={() => onNavClick?.(item)}
                sx={{
                  borderRadius: 1,
                  px: 1,
                  py: 0.75,
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: 0,
                  lineHeight: '24px',
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ flex: 1 }} />

        {/* Order matches reference: theme, settings, notifications, account */}
        <Stack direction="row" spacing={0.5} sx={{ color: '#3A3B3F', flexShrink: 0 }}>
          <IconButton
            aria-label="Toggle light and dark mode"
            color="inherit"
            size="small"
            sx={{ color: 'inherit', display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <AppIcon name="theme" sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="Settings"
            color="inherit"
            size="small"
            sx={{ color: 'inherit', display: { xs: 'none', sm: 'inline-flex' } }}
          >
            <AppIcon name="settings" sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="Notifications"
            color="inherit"
            size="small"
            sx={{ color: 'inherit' }}
          >
            <AppIcon name="notifications" sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="Account"
            color="inherit"
            size="small"
            sx={{ color: 'inherit' }}
          >
            <AppIcon name="account" sx={{ fontSize: 24 }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import logomark from '../assets/figma/logomark.svg'
import { soma } from '../soma/tokens'
import { ProfileMenu } from './ProfileMenu'

const NAV_ITEMS = ['Dashboard', 'My Work', 'Schedule', 'Search'] as const

export type NavItem = (typeof NAV_ITEMS)[number]

type AppShellProps = {
  onBrandClick?: () => void
  onNavClick?: (item: NavItem) => void
  onPrototypeAction?: (message: string) => void
  activeNav?: NavItem
  navItems?: readonly NavItem[]
  avatarInitial?: string
}

export function AppShell({
  onBrandClick,
  onNavClick,
  onPrototypeAction,
  activeNav,
  navItems = NAV_ITEMS,
  avatarInitial = 'HW',
}: AppShellProps) {
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
          minHeight: 56,
          height: 56,
          px: { xs: 2, md: 3 },
          gap: { xs: 1, md: 2 },
          '&.MuiToolbar-root': {
            minHeight: 56,
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
            {navItems.map((item) => {
              const active = item === activeNav
              return (
                <Button
                  key={item}
                  color="inherit"
                  onClick={() => onNavClick?.(item)}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    position: 'relative',
                    borderRadius: `${soma.radius.sm}px`,
                    px: 1.5,
                    height: 56,
                    color: active ? soma.text.brand : soma.text.tertiary,
                    ...(active ? soma.type.h5 : soma.type.body1),
                    '&::after': active
                      ? {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 2,
                          bgcolor: soma.action.primary,
                        }
                      : undefined,
                  }}
                >
                  {item}
                </Button>
              )
            })}
          </Stack>
        </Stack>

        <Box sx={{ flex: 1 }} />

        {/* Order matches reference: theme, settings, notifications, account */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: 'center', color: 'icon.tertiary', flexShrink: 0 }}
        >
          <IconButton
            aria-label="Toggle light and dark mode"
            color="inherit"
            size="small"
            sx={{ color: 'icon.tertiary' }}
          >
            <AppIcon name="theme" sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="Settings"
            color="inherit"
            size="small"
            sx={{
              color: 'icon.tertiary',
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          >
            <AppIcon name="settings" sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            aria-label="Notifications"
            color="inherit"
            size="small"
            sx={{ color: 'icon.tertiary' }}
          >
            <AppIcon name="notifications" sx={{ fontSize: 24 }} />
          </IconButton>
          <ProfileMenu onAction={onPrototypeAction} initial={avatarInitial} />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

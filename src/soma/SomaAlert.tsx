import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { AppIcon, type AppIconName } from '../icons/AppIcon'
import { soma } from './tokens'

export type AlertTone = 'brand' | 'success' | 'warning' | 'danger'

const tonePaint: Record<
  AlertTone,
  { fill: string; border: string; accent: string; icon: AppIconName; ink: string }
> = {
  brand: {
    fill: soma.surface.brandSoft,
    border: soma.border.brandSubtle,
    accent: soma.action.primary,
    icon: 'info',
    ink: soma.icon.brand,
  },
  success: {
    fill: soma.surface.successSoft,
    border: soma.border.successSubtle,
    accent: soma.action.success,
    icon: 'checkCircle',
    ink: soma.icon.success,
  },
  warning: {
    fill: soma.surface.warningSoft,
    border: soma.border.warningSubtle,
    accent: soma.icon.warning,
    icon: 'warning',
    ink: soma.icon.warning,
  },
  danger: {
    fill: soma.surface.dangerSoft,
    border: soma.border.dangerSubtle,
    accent: soma.action.danger,
    icon: 'error',
    ink: soma.icon.danger,
  },
}

export type AlertAction = {
  label: string
  onClick: () => void
}

type SomaAlertProps = {
  tone: AlertTone
  title: string
  description?: string
  actions?: AlertAction[]
  children?: ReactNode
}

/** Soft alert. Actions are small text buttons, per Soma (not outlined). */
export function SomaAlert({
  tone,
  title,
  description,
  actions,
  children,
}: SomaAlertProps) {
  const paint = tonePaint[tone]
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: `${soma.radius.md}px`,
        border: '1px solid',
        borderColor: paint.border,
        boxShadow: soma.shadow.lg,
        bgcolor: paint.fill,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: paint.accent,
        }}
      />
      <Stack
        direction="row"
        spacing={`${soma.inline.md}px`}
        sx={{ p: `${soma.inset.md}px`, pl: `${soma.inset.md + 4}px` }}
      >
        <AppIcon name={paint.icon} sx={{ fontSize: 20, color: paint.ink, mt: '2px' }} />
        <Stack spacing={`${soma.stack.xs}px`} sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>
            {title}
          </Typography>
          {description ? (
            <Typography sx={{ ...soma.type.body2, color: soma.text.secondary }}>
              {description}
            </Typography>
          ) : null}
          {children}
          {actions && actions.length > 0 ? (
            <Stack direction="row" spacing={`${soma.inline.sm}px`} sx={{ pt: `${soma.stack.sm}px` }}>
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={action.onClick}
                  sx={{ ...soma.type.subtitle3, px: 1, minWidth: 0 }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  )
}

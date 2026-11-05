import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import { soma } from './tokens'

export type BadgeTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent'

const tonePaint: Record<
  BadgeTone,
  { fill: string; border: string; ink: string; weight: number }
> = {
  neutral: {
    fill: soma.surface.subtle,
    border: soma.border.neutralSubtle,
    ink: soma.text.primary,
    weight: 400,
  },
  brand: {
    fill: soma.surface.brandSoft,
    border: soma.border.brandSubtle,
    ink: soma.text.brand,
    weight: 500,
  },
  success: {
    fill: soma.surface.successSoft,
    border: soma.border.successSubtle,
    ink: soma.text.successSubtle,
    weight: 500,
  },
  warning: {
    fill: soma.surface.warningSoft,
    border: soma.border.warningSubtle,
    ink: soma.text.warningSubtle,
    weight: 500,
  },
  danger: {
    fill: soma.surface.dangerSoft,
    border: soma.border.dangerSubtle,
    ink: soma.text.dangerSubtle,
    weight: 500,
  },
  accent: {
    fill: soma.surface.accentSoft,
    border: soma.border.accentSubtle,
    ink: soma.text.accentSubtle,
    weight: 500,
  },
}

type SomaBadgeProps = {
  tone?: BadgeTone
  label: string
  icon?: ReactNode
}

export function SomaBadge({ tone = 'neutral', label, icon }: SomaBadgeProps) {
  const paint = tonePaint[tone]
  return (
    <Stack
      direction="row"
      component="span"
      sx={{
        alignItems: 'center',
        gap: `${soma.space[4]}px`,
        px: `${soma.space[8]}px`,
        py: `${soma.space[2]}px`,
        borderRadius: `${soma.radius.sm}px`,
        bgcolor: paint.fill,
        border: '1px solid',
        borderColor: paint.border,
        color: paint.ink,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      <Typography
        component="span"
        sx={{
          ...soma.type.badgeSmall,
          fontWeight: paint.weight,
          color: 'inherit',
        }}
      >
        {label}
      </Typography>
    </Stack>
  )
}

import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { soma } from './tokens'

type SomaCardProps = {
  children: ReactNode
  sx?: SxProps<Theme>
  onClick?: () => void
}

export function SomaCard({ children, sx, onClick }: SomaCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
          bgcolor: soma.surface.default,
          border: '1px solid',
          borderColor: soma.border.subtle,
          borderRadius: `${soma.radius.md}px`,
          p: `${soma.inset.md}px`,
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  )
}

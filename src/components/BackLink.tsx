import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

type BackLinkProps = {
  children: ReactNode
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

/** Soma Back Link — primary blue return nav. */
export function BackLink({ children, onClick }: BackLinkProps) {
  return (
    <ButtonBase
      onClick={onClick}
      focusRipple
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        p: 0.5,
        borderRadius: 1,
        color: 'primary.main',
        '&:hover': {
          color: 'primary.dark',
          bgcolor: 'transparent',
        },
        '&.Mui-focusVisible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
    >
      <Box
        component="svg"
        aria-hidden
        viewBox="0 0 24 24"
        sx={{ width: 16, height: 16, flexShrink: 0 }}
      >
        <Box
          component="path"
          d="M19 12H5m0 0 6-6m-6 6 6 6"
          sx={{
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.5,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          letterSpacing: 0,
          color: 'inherit',
        }}
      >
        {children}
      </Typography>
    </ButtonBase>
  )
}

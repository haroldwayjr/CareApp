import Stack from '@mui/material/Stack'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { soma } from './tokens'

export type Crumb = {
  label: string
  onClick?: () => void
}

type BreadcrumbProps = {
  items: Crumb[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Stack
      direction="row"
      component="nav"
      aria-label="Breadcrumb"
      spacing={`${soma.inline.xs}px`}
      sx={{ alignItems: 'center', flexWrap: 'wrap' }}
    >
      {items.map((item, index) => {
        const current = index === items.length - 1
        return (
          <Stack
            key={`${item.label}-${index}`}
            direction="row"
            spacing={`${soma.inline.xs}px`}
            sx={{ alignItems: 'center' }}
          >
            {index > 0 ? (
              <Typography component="span" sx={{ ...soma.type.body1, color: soma.text.tertiary }}>
                /
              </Typography>
            ) : null}
            {current || !item.onClick ? (
              <Typography
                component="span"
                aria-current={current ? 'page' : undefined}
                sx={{
                  ...(current ? soma.type.subtitle2 : soma.type.body1),
                  color: current ? soma.text.primary : soma.text.secondary,
                }}
              >
                {item.label}
              </Typography>
            ) : (
              <ButtonBase
                onClick={item.onClick}
                sx={{
                  ...soma.type.body1,
                  color: soma.text.secondary,
                  borderRadius: `${soma.radius.xs}px`,
                  '&:hover': { color: soma.text.primary },
                }}
              >
                {item.label}
              </ButtonBase>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { AppIcon, type AppIconName } from '../icons/AppIcon'
import { soma } from './tokens'

export type SwitcherOption = {
  id: string
  label: string
  icon?: AppIconName
}

type ViewSwitcherProps = {
  ariaLabel: string
  options: SwitcherOption[]
  value: string
  onChange: (id: string) => void
  iconOnly?: boolean
}

/** Elevated view switcher. Stand-in for DensityToggle and RoleSwitcher. */
export function ViewSwitcher({
  ariaLabel,
  options,
  value,
  onChange,
  iconOnly = false,
}: ViewSwitcherProps) {
  return (
    <Box
      role="group"
      aria-label={ariaLabel}
      sx={{
        display: 'inline-flex',
        height: 40,
        p: 0,
        borderRadius: `${soma.radius.sm}px`,
        bgcolor: soma.surface.subtle,
        border: '1px solid',
        borderColor: soma.border.subtle,
      }}
    >
      {options.map((option) => {
        const selected = option.id === value
        return (
          <ButtonBase
            key={option.id}
            aria-pressed={selected}
            aria-label={option.label}
            onClick={() => onChange(option.id)}
            sx={{
              px: iconOnly ? `${soma.space[12]}px` : `${soma.space[12]}px`,
              minWidth: iconOnly ? 40 : 0,
              borderRadius: `${soma.radius.sm}px`,
              bgcolor: selected ? soma.surface.default : 'transparent',
              boxShadow: selected ? soma.shadow.sm : 'none',
              border: '1px solid',
              borderColor: selected ? soma.border.subtle : 'transparent',
              color: selected ? soma.text.brand : soma.text.tertiary,
              ...soma.type.body1,
              fontWeight: selected ? 600 : 400,
              gap: `${soma.inline.xs}px`,
            }}
          >
            {option.icon ? (
              <AppIcon name={option.icon} sx={{ fontSize: 18, color: 'inherit' }} />
            ) : null}
            {iconOnly ? null : option.label}
          </ButtonBase>
        )
      })}
    </Box>
  )
}

import type { SvgIconProps } from '@mui/material/SvgIcon'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import type { ComponentType } from 'react'

/**
 * Icon names used by the app. Keep this list product-facing (not MUI-specific)
 * so the implementation can switch to Streamline later.
 */
export type AppIconName = 'home' | 'settings' | 'search'

type IconComponent = ComponentType<SvgIconProps>

/**
 * Current backend: Material Icons (`@mui/icons-material`).
 *
 * Streamline is NOT integrated yet. Missing:
 * - no Streamline npm package in package.json / node_modules
 * - no Streamline SVG/font assets under public/ or src/assets/
 *
 * To swap later: replace `materialIconMap` with Streamline components/assets
 * while keeping `AppIconName` and this export stable.
 */
const materialIconMap: Record<AppIconName, IconComponent> = {
  home: HomeOutlinedIcon,
  settings: SettingsOutlinedIcon,
  search: SearchOutlinedIcon,
}

export type AppIconProps = SvgIconProps & {
  name: AppIconName
}

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = materialIconMap[name]
  return <Icon {...props} />
}

import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'
import type { ComponentType } from 'react'
import homeSvg from './streamline/home.svg?raw'
import settingsSvg from './streamline/settings.svg?raw'
import searchSvg from './streamline/search.svg?raw'

/**
 * Icon names used by the app. Keep this list product-facing
 * so call sites stay independent of the icon vendor.
 */
export type AppIconName = 'home' | 'settings' | 'search'

type IconComponent = ComponentType<SvgIconProps>

/**
 * Streamline Material Pro — Outlined Line assets under `./streamline/`.
 * Raw SVGs are wrapped in MUI `SvgIcon` so existing `SvgIconProps` keep working.
 */
function streamlineIcon(rawSvg: string): IconComponent {
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24'
  const pathMatch = rawSvg.match(/<path[^>]*\sd="([^"]+)"/i)
  const pathD = pathMatch?.[1] ?? ''

  return function StreamlineIcon(props: SvgIconProps) {
    return (
      <SvgIcon viewBox={viewBox} {...props}>
        <path d={pathD} fill="currentColor" />
      </SvgIcon>
    )
  }
}

const streamlineIconMap: Record<AppIconName, IconComponent> = {
  home: streamlineIcon(homeSvg),
  settings: streamlineIcon(settingsSvg),
  search: streamlineIcon(searchSvg),
}

export type AppIconProps = SvgIconProps & {
  name: AppIconName
}

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = streamlineIconMap[name]
  return <Icon {...props} />
}

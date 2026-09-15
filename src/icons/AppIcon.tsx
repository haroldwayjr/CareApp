import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'
import type { ComponentType } from 'react'
import homeSvg from './streamline/home.svg?raw'
import settingsSvg from './streamline/settings.svg?raw'
import searchSvg from './streamline/search.svg?raw'
import themeSvg from './streamline/theme.svg?raw'
import notificationsSvg from './streamline/notifications.svg?raw'
import accountSvg from './streamline/account.svg?raw'
import filterSvg from './streamline/filter.svg?raw'
import copySvg from './streamline/copy.svg?raw'
import infoSvg from './streamline/info.svg?raw'

/**
 * Icon names used by the app. Keep this list product-facing
 * so call sites stay independent of the icon vendor.
 */
export type AppIconName =
  | 'home'
  | 'settings'
  | 'search'
  | 'theme'
  | 'notifications'
  | 'account'
  | 'filter'
  | 'copy'
  | 'info'

type IconComponent = ComponentType<SvgIconProps>

/**
 * Streamline assets under `./streamline/`.
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

/** Multi-path Regular 3.0 stroke icons (optional filled circles for i-dots). */
function streamlineStrokeIcon(rawSvg: string): IconComponent {
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24'
  const paths = [...rawSvg.matchAll(/<path[^>]*\sd="([^"]+)"/gi)].map(
    (match) => match[1],
  )
  const circles = [
    ...rawSvg.matchAll(
      /<circle[^>]*\scx="([^"]+)"[^>]*\scy="([^"]+)"[^>]*\sr="([^"]+)"[^>]*>/gi,
    ),
  ].map((match) => ({
    cx: match[1],
    cy: match[2],
    r: match[3],
  }))

  return function StreamlineStrokeIcon(props: SvgIconProps) {
    return (
      <SvgIcon viewBox={viewBox} fill="none" {...props}>
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {circles.map((circle) => (
          <circle
            key={`${circle.cx}-${circle.cy}-${circle.r}`}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill="currentColor"
          />
        ))}
      </SvgIcon>
    )
  }
}

const streamlineIconMap: Record<AppIconName, IconComponent> = {
  home: streamlineIcon(homeSvg),
  settings: streamlineIcon(settingsSvg),
  search: streamlineIcon(searchSvg),
  theme: streamlineStrokeIcon(themeSvg),
  notifications: streamlineIcon(notificationsSvg),
  account: streamlineIcon(accountSvg),
  filter: streamlineStrokeIcon(filterSvg),
  copy: streamlineIcon(copySvg),
  info: streamlineStrokeIcon(infoSvg),
}

export type AppIconProps = SvgIconProps & {
  name: AppIconName
}

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = streamlineIconMap[name]
  return <Icon {...props} />
}

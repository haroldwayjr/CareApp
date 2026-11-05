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
import eyeSvg from './streamline/eye.svg?raw'
import moreVerticalSvg from './streamline/more-vertical.svg?raw'
import chevronDownSvg from './streamline/chevron-down.svg?raw'
import closeSvg from './streamline/close.svg?raw'
import infoSvg from './streamline/info.svg?raw'
import warningSvg from './streamline/warning.svg?raw'
import errorSvg from './streamline/error.svg?raw'
import checkCircleSvg from './streamline/check-circle.svg?raw'
import addSvg from './streamline/add.svg?raw'
import sparklesSvg from './streamline/sparkles.svg?raw'
import sendSvg from './streamline/send.svg?raw'
import gridSvg from './streamline/grid.svg?raw'
import listSvg from './streamline/list.svg?raw'
import chevronRightSvg from './streamline/chevron-right.svg?raw'
import editSvg from './streamline/edit.svg?raw'
import clockSvg from './streamline/clock.svg?raw'
import trashSvg from './streamline/trash.svg?raw'

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
  | 'eye'
  | 'moreVertical'
  | 'chevronDown'
  | 'close'
  | 'info'
  | 'warning'
  | 'error'
  | 'checkCircle'
  | 'add'
  | 'sparkles'
  | 'send'
  | 'grid'
  | 'list'
  | 'chevronRight'
  | 'edit'
  | 'clock'
  | 'trash'

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

/** Multi-path Regular 3.0 stroke icons (e.g. Light Mode Dark Light). */
function streamlineStrokeIcon(rawSvg: string): IconComponent {
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24'
  const paths = [...rawSvg.matchAll(/<path[^>]*\sd="([^"]+)"/gi)].map(
    (match) => match[1],
  )

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
      </SvgIcon>
    )
  }
}

/** Keeps fill icons filled and stroke icons stroked. */
function assetIcon(rawSvg: string): IconComponent {
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24'
  const filled = /fill="currentColor"/.test(rawSvg)
  const paths = [...rawSvg.matchAll(/<path\b([^>]*)\/?>/gi)].map((match) => {
    const d = match[1].match(/\sd="([^"]+)"/)?.[1] ?? ''
    return d
  })

  return function AssetIcon(props: SvgIconProps) {
    return (
      <SvgIcon viewBox={viewBox} fill={filled ? 'currentColor' : 'none'} {...props}>
        {paths.map((d) =>
          filled ? (
            <path key={d} d={d} fill="currentColor" />
          ) : (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ),
        )}
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
  filter: streamlineIcon(filterSvg),
  copy: streamlineIcon(copySvg),
  eye: assetIcon(eyeSvg),
  moreVertical: assetIcon(moreVerticalSvg),
  chevronDown: assetIcon(chevronDownSvg),
  close: assetIcon(closeSvg),
  info: assetIcon(infoSvg),
  warning: assetIcon(warningSvg),
  error: assetIcon(errorSvg),
  checkCircle: assetIcon(checkCircleSvg),
  add: assetIcon(addSvg),
  sparkles: assetIcon(sparklesSvg),
  send: assetIcon(sendSvg),
  grid: assetIcon(gridSvg),
  list: assetIcon(listSvg),
  chevronRight: assetIcon(chevronRightSvg),
  edit: assetIcon(editSvg),
  clock: assetIcon(clockSvg),
  trash: assetIcon(trashSvg),
}

export type AppIconProps = SvgIconProps & {
  name: AppIconName
}

export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = streamlineIconMap[name]
  return <Icon {...props} />
}

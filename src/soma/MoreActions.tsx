import { Fragment, useState } from 'react'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { AppIcon, type AppIconName } from '../icons/AppIcon'
import { soma } from './tokens'

export type MoreAction = {
  label: string
  onClick: () => void
  icon?: AppIconName
  tone?: 'danger'
  dividerBefore?: boolean
}

type MoreActionsProps = {
  label: string
  actions: MoreAction[]
}

export function MoreActions({ label, actions }: MoreActionsProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  return (
    <>
      <IconButton
        aria-label={label}
        size="small"
        onClick={(event) => {
          event.stopPropagation()
          setAnchor(event.currentTarget)
        }}
        sx={{
          width: 36,
          height: 36,
          color: soma.icon.tertiary,
        }}
      >
        <AppIcon name="moreVertical" sx={{ fontSize: 18 }} />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        onClick={(event) => event.stopPropagation()}
        slotProps={{
          paper: {
            sx: {
              width: 248,
              borderRadius: `${soma.radius.lg}px`,
              boxShadow: soma.shadow.lg,
            },
          },
        }}
      >
        {actions.map((action) => {
          const color = action.tone === 'danger' ? soma.text.danger : soma.text.primary
          return (
            <Fragment key={action.label}>
              {action.dividerBefore ? <Divider sx={{ my: 0.5, borderColor: soma.border.hairline }} /> : null}
              <MenuItem
                onClick={() => {
                  setAnchor(null)
                  action.onClick()
                }}
                sx={{ ...soma.type.body1, color, gap: 1.5, minHeight: 36 }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', color }}>
                  {action.icon ? <AppIcon name={action.icon} sx={{ fontSize: 16 }} /> : null}
                  {action.label}
                </Stack>
              </MenuItem>
            </Fragment>
          )
        })}
      </Menu>
    </>
  )
}

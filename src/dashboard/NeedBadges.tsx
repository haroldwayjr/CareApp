import Stack from '@mui/material/Stack'
import { AppIcon } from '../icons/AppIcon'
import { SomaBadge } from '../soma/SomaBadge'
import { soma } from '../soma/tokens'
import { healthLabel, layerLabel, type MemberNeed } from './mockDashboard'

export function NeedBadges({
  need,
  showHealthIcon = false,
  only,
}: {
  need: MemberNeed
  showHealthIcon?: boolean
  only?: 'health' | 'layer'
}) {
  const healthTone =
    need.health === 'critical' ? 'danger' : need.health === 'moderate' ? 'warning' : 'success'
  const healthIcon =
    need.health === 'critical' ? 'error' : need.health === 'moderate' ? 'warning' : 'checkCircle'
  const layerTone =
    need.priority === 'emergency' ? 'danger' : need.priority === 'manual' ? 'accent' : 'neutral'

  return (
    <Stack direction="row" spacing={0.5} useFlexGap sx={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
      {need.watching && !only ? (
        <SomaBadge
          tone="brand"
          label="Watching"
          icon={<AppIcon name="eye" sx={{ fontSize: 12, color: soma.icon.brand }} />}
        />
      ) : null}
      {only !== 'layer' ? (
        <SomaBadge
          tone={healthTone}
          label={healthLabel(need.health)}
          icon={
            showHealthIcon ? (
              <AppIcon name={healthIcon} sx={{ fontSize: 12, color: 'inherit' }} />
            ) : undefined
          }
        />
      ) : null}
      {only !== 'health' ? <SomaBadge tone={layerTone} label={layerLabel(need.priority)} /> : null}
    </Stack>
  )
}

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { soma } from '../soma/tokens'

type HealthSparklineProps = {
  values: number[]
}

/** Spike stand-in. Soma has no chart component. */
export function HealthSparkline({ values }: HealthSparklineProps) {
  const width = 960
  const height = 112
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width
    const y = height - 8 - value * (height - 20)
    return `${x},${y}`
  })
  const line = `M${points.join(' L')}`
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: soma.border.subtle,
        borderRadius: `${soma.radius.md}px`,
        p: `${soma.inset.md}px`,
        bgcolor: soma.surface.default,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }}>
          Member health
        </Typography>
        <Typography sx={{ ...soma.type.caption, color: soma.text.primary }}>
          Moderate → Critical{' '}
          <Box component="span" sx={{ color: soma.text.danger }}>
            · 2 levels · 14d
          </Box>
        </Typography>
      </Stack>
      <Box
        component="svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Member health declined from moderate to critical over 14 days"
        sx={{ width: '100%', height: 112, display: 'block' }}
      >
        <defs>
          <linearGradient id="maya-health" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={soma.border.dangerSubtle} />
            <stop offset="100%" stopColor={soma.surface.dangerSoft} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#maya-health)" />
        <path d={line} fill="none" stroke={soma.action.danger} strokeWidth="3" />
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 0.5 }}>
        <Typography sx={{ ...soma.type.caption, color: soma.text.successSubtle }}>Good</Typography>
        <Typography sx={{ ...soma.type.caption, color: soma.text.warningSubtle }}>Moderate</Typography>
        <Typography sx={{ ...soma.type.caption, color: soma.text.danger }}>Critical</Typography>
      </Stack>
      <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary, mt: 0.5 }}>
        14-day health. Declined after Lee OOO · reassignment lag. Watching alerts on for Jordan.
      </Typography>
    </Box>
  )
}

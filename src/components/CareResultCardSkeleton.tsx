import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import type { SkeletonProps } from '@mui/material/Skeleton'

type CareResultCardSkeletonProps = {
  /** Number of placeholder cards to render. */
  count?: number
}

function ShimmerSkeleton(props: SkeletonProps) {
  return (
    <Skeleton
      animation={false}
      className="skeleton-shimmer"
      {...props}
    />
  )
}

function CareResultCardSkeletonItem() {
  return (
    <Paper
      variant="outlined"
      aria-hidden
      sx={{ p: 2, borderRadius: '8px', borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <ShimmerSkeleton variant="circular" width={56} height={56} />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ShimmerSkeleton variant="text" width="58%" height={22} />
              <ShimmerSkeleton
                variant="text"
                width="36%"
                height={18}
                sx={{ mt: 0.25 }}
              />
            </Box>
            <ShimmerSkeleton
              variant="rounded"
              width={96}
              height={30}
              sx={{ flexShrink: 0, borderRadius: 1 }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', mt: 1 }}
          >
            <ShimmerSkeleton
              variant="rounded"
              width={128}
              height={24}
              sx={{ borderRadius: 1 }}
            />
            <ShimmerSkeleton
              variant="rounded"
              width={168}
              height={24}
              sx={{ borderRadius: 1 }}
            />
          </Stack>

          <ShimmerSkeleton variant="text" width="78%" height={18} sx={{ mt: 1.5 }} />
          <ShimmerSkeleton variant="text" width="28%" height={18} sx={{ mt: 0.5 }} />
        </Box>
      </Stack>
    </Paper>
  )
}

export function CareResultCardSkeleton({
  count = 3,
}: CareResultCardSkeletonProps) {
  return (
    <Stack spacing={2} aria-busy="true" aria-label="Loading search results">
      {Array.from({ length: count }, (_, index) => (
        <CareResultCardSkeletonItem key={index} />
      ))}
    </Stack>
  )
}

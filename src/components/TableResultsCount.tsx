import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export type TableResultsCountProps = {
  /** Total row count in the current result set. */
  total: number
  /** Count of checked rows. Derived from the table checkbox column. */
  selectedCount: number
  /** Deselect all rows (header + body checkboxes). */
  onClear: () => void
}

function resultsLabel(total: number, selectedCount: number): string {
  if (selectedCount > 0) {
    return `${selectedCount} of ${total} selected`
  }
  return `${total} results`
}

/**
 * Table / Results — toolbar count above the table.
 * Keep this live region mounted in both states so the first selection announces.
 * Do not put Clear inside the live region.
 */
export function TableResultsCount({
  total,
  selectedCount,
  onClear,
}: TableResultsCountProps) {
  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
      <Box
        component="div"
        aria-live="polite"
        aria-atomic="true"
        sx={{
          typography: 'body2',
          fontWeight: 500,
          color: 'text.secondary',
          lineHeight: '20px',
        }}
      >
        {resultsLabel(total, selectedCount)}
      </Box>
      {selectedCount > 0 ? (
        <Button
          variant="text"
          size="small"
          onClick={onClear}
          sx={{ minWidth: 0, px: 0.5, py: 0, fontWeight: 400 }}
        >
          Clear
        </Button>
      ) : null}
    </Stack>
  )
}

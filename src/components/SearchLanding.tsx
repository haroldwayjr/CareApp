import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import emptyStateArt from '../assets/figma/search-empty.png'
import {
  SearchFormBar,
  type SearchFormValues,
} from './SearchFormBar'

export type { SearchFormValues }

type SearchLandingProps = {
  values: SearchFormValues
  onChange: (values: SearchFormValues) => void
  onSearch: () => void
  onBack?: () => void
}

export function SearchLanding({
  values,
  onChange,
  onSearch,
  onBack,
}: SearchLandingProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 1.5,
          pb: 0,
        }}
      >
        <Button
          color="primary"
          size="small"
          onClick={onBack}
          startIcon={
            <Typography component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
              ←
            </Typography>
          }
          sx={{ px: 0.5, minWidth: 0, mb: 0 }}
        >
          Back to Profile
        </Button>
        <Typography
          variant="h5"
          component="h1"
          color="text.primary"
          sx={{
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 0,
            lineHeight: 1.25,
            mt: 1.5,
          }}
        >
          Search Provider
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          px: 3,
          pt: 3,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <SearchFormBar values={values} onChange={onChange} onSearch={onSearch} />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            py: 6,
            transform: 'translateY(-40px)',
            // Decorative empty state; keep visual lift without stealing form clicks.
            pointerEvents: 'none',
          }}
        >
          <Box
            component="img"
            src={emptyStateArt}
            alt=""
            sx={{ width: 260, height: 191, objectFit: 'contain' }}
          />
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', letterSpacing: 0 }}
          >
            Search for a term to view providers
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import emptyStateArt from '../assets/figma/search-empty.png'
import { BackLink } from './BackLink'
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
          px: { xs: 2, md: 3 },
          pt: 1.5,
          pb: 0,
        }}
      >
        <BackLink onClick={onBack}>Back to Profile</BackLink>
        <Typography
          variant="h5"
          component="h1"
          color="text.primary"
          sx={{
            // App page title: below marketing display, above body — saves chrome height.
            fontSize: { xs: 20, sm: 22 },
            fontWeight: 400,
            letterSpacing: 0,
            lineHeight: 1.3,
            mt: 1,
          }}
        >
          Search Provider
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          px: { xs: 2, md: 3 },
          // Heading → form gap.
          pt: 2,
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
            py: { xs: 3, md: 6 },
            transform: { xs: 'none', md: 'translateY(-40px)' },
            // Decorative empty state; keep visual lift without stealing form clicks.
            pointerEvents: 'none',
          }}
        >
          <Box
            component="img"
            src={emptyStateArt}
            alt=""
            sx={{
              width: { xs: 200, sm: 260 },
              height: { xs: 147, sm: 191 },
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', letterSpacing: 0, textAlign: 'center', px: 2 }}
          >
            Search for a term to view providers
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

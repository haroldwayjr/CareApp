import { useEffect } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MAP_DEFAULT_CENTER,
  googleMapsPlaceUrl,
  type ProviderResult,
} from '../data/mockCareResults'

type ResultsMapProps = {
  results: ProviderResult[]
  selectedId: string | null
  onSelect: (id: string) => void
  /** Sticky offset from viewport top (app shell + results toolbar). */
  stickyTop?: number
  /** 0-based offset so pin labels match paginated list numbering. */
  indexOffset?: number
  /** When true, fill a flex parent instead of sticky viewport height. */
  fillParent?: boolean
}

function createPinIcon(label: string | number, selected: boolean) {
  // ~1.4× prior sizes (28 / 34) — tip stays at iconAnchor bottom-center.
  const size = selected ? 48 : 40
  const fontSize = selected ? 15 : 14
  return L.divIcon({
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        display:grid;
        place-items:center;
        transform:translateY(2px);
      ">
        <div style="
          width:${size - 4}px;
          height:${size - 4}px;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          background:${selected ? '#00077a' : '#0009a6'};
          border:2px solid #ffffff;
          box-shadow:0 2px 6px rgba(0,0,0,0.28);
          display:grid;
          place-items:center;
        ">
          <span style="
            transform:rotate(45deg);
            color:#fff;
            font:700 ${fontSize}px/1 Figtree, system-ui, sans-serif;
            letter-spacing:0;
          ">${label}</span>
        </div>
      </div>
    `,
  })
}

/** Leaflet measures the container once on init; remeasure when layout settles or resizes. */
function InvalidateSize() {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()
    const invalidate = () => {
      map.invalidateSize({ animate: false })
    }

    invalidate()
    const frame = window.requestAnimationFrame(invalidate)
    const timeouts = [0, 100, 300].map((ms) => window.setTimeout(invalidate, ms))

    const observer = new ResizeObserver(invalidate)
    observer.observe(container)
    window.addEventListener('resize', invalidate)

    return () => {
      window.cancelAnimationFrame(frame)
      timeouts.forEach((id) => window.clearTimeout(id))
      observer.disconnect()
      window.removeEventListener('resize', invalidate)
    }
  }, [map])

  return null
}

function FitResults({ results }: { results: ProviderResult[] }) {
  const map = useMap()

  useEffect(() => {
    map.invalidateSize({ animate: false })
    if (results.length === 0) {
      map.setView([MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng], 12)
      return
    }
    if (results.length === 1) {
      map.setView([results[0].lat, results[0].lng], 13)
      return
    }
    const bounds = L.latLngBounds(
      results.map((result) => [result.lat, result.lng] as [number, number]),
    )
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 })
  }, [map, results])

  return null
}

function FocusSelected({
  results,
  selectedId,
}: {
  results: ProviderResult[]
  selectedId: string | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedId) return
    const match = results.find((result) => result.id === selectedId)
    if (!match) return
    map.panTo([match.lat, match.lng], { animate: true })
  }, [map, results, selectedId])

  return null
}

export function ResultsMap({
  results,
  selectedId,
  onSelect,
  stickyTop = 72,
  indexOffset = 0,
  fillParent = false,
}: ResultsMapProps) {
  // Fill the viewport under sticky chrome so the map runs to the bottom edge.
  const desktopHeight = `calc(100dvh - ${stickyTop}px)`

  return (
    <Paper
      variant="outlined"
      sx={{
        ...(fillParent
          ? {
              height: { xs: 280, sm: 360, lg: '100%' },
              minHeight: { xs: 280, sm: 360, lg: 0 },
              position: 'relative',
              flex: 1,
              alignSelf: 'stretch',
            }
          : {
              height: { xs: 280, sm: 360, lg: desktopHeight },
              minHeight: { xs: 280, sm: 360, lg: desktopHeight },
              position: { xs: 'relative', lg: 'sticky' },
              top: { lg: stickyTop },
              alignSelf: 'start',
            }),
        width: '100%',
        overflow: 'hidden',
        bgcolor: '#dfe8ef',
        '& .leaflet-container': {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          fontFamily: 'inherit',
          zIndex: 0,
        },
        '& .leaflet-control-zoom a': {
          width: 28,
          height: 28,
          lineHeight: '28px',
          fontSize: 16,
          color: 'rgba(0,0,0,0.75)',
        },
        // Beat Leaflet's default `.leaflet-container a { color: #0078A8 }` teal.
        '& .leaflet-container a.MuiButton-root': {
          color: (theme) => theme.palette.primary.main,
          '&:hover': {
            color: (theme) => theme.palette.primary.dark,
          },
          '& .MuiButton-startIcon, & .MuiSvgIcon-root': {
            color: 'inherit',
          },
        },
      }}
    >
      <MapContainer
        center={[MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng]}
        zoom={12}
        scrollWheelZoom
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <InvalidateSize />
        <FitResults results={results} />
        <FocusSelected results={results} selectedId={selectedId} />

        {results.map((result, index) => {
          const selected = result.id === selectedId
          const label = indexOffset + index + 1
          return (
            <Marker
              key={result.id}
              position={[result.lat, result.lng]}
              icon={createPinIcon(label, selected)}
              eventHandlers={{
                click: () => onSelect(result.id),
              }}
            >
              <Popup>
                <Stack spacing={0.5} sx={{ minWidth: 160 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 0 }}>
                    {label}. {result.name}, {result.credentials}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', letterSpacing: 0 }}>
                    {result.specialty}
                  </Typography>
                  <Typography sx={{ fontSize: 13, letterSpacing: 0 }}>
                    {result.address}
                  </Typography>
                  <Button
                    component="a"
                    href={googleMapsPlaceUrl(
                      result.lat,
                      result.lng,
                      result.address,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    variant="text"
                    color="primary"
                    startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                    aria-label={`Open ${result.name} in Google Maps`}
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                    sx={{
                      mt: 0.25,
                      alignSelf: 'flex-start',
                      px: 0.5,
                      minHeight: 32,
                      textTransform: 'none',
                      fontWeight: 400,
                      fontSize: 12,
                      letterSpacing: 0,
                      color: (theme) => theme.palette.primary.main,
                      '&:hover': {
                        color: (theme) => theme.palette.primary.dark,
                        bgcolor: 'transparent',
                      },
                      '& .MuiButton-startIcon, & .MuiSvgIcon-root': {
                        color: 'inherit',
                      },
                    }}
                  >
                    Open in Google Maps
                  </Button>
                </Stack>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Paper>
  )
}

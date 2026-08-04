import { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
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
  type ProviderResult,
} from '../data/mockCareResults'

type ResultsMapProps = {
  results: ProviderResult[]
  selectedId: string | null
  onSelect: (id: string) => void
  /** Sticky offset from viewport top (app shell + results toolbar). */
  stickyTop?: number
}

function createPinIcon(label: string | number, selected: boolean) {
  const size = selected ? 34 : 28
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
            font:700 11px/1 Figtree, system-ui, sans-serif;
            letter-spacing:0;
          ">${label}</span>
        </div>
      </div>
    `,
  })
}

function FitResults({ results }: { results: ProviderResult[] }) {
  const map = useMap()

  useEffect(() => {
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
}: ResultsMapProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        minHeight: 540,
        position: 'sticky',
        top: stickyTop,
        overflow: 'hidden',
        bgcolor: '#dfe8ef',
        '& .leaflet-container': {
          width: '100%',
          height: '100%',
          minHeight: 540,
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
      }}
    >
      <MapContainer
        center={[MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng]}
        zoom={12}
        scrollWheelZoom
        style={{ width: '100%', height: '100%', minHeight: 540 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitResults results={results} />
        <FocusSelected results={results} selectedId={selectedId} />

        {results.map((result, index) => {
          const selected = result.id === selectedId
          return (
            <Marker
              key={result.id}
              position={[result.lat, result.lng]}
              icon={createPinIcon(index + 1, selected)}
              eventHandlers={{
                click: () => onSelect(result.id),
              }}
            >
              <Popup>
                <Stack spacing={0.5} sx={{ minWidth: 160 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: 0 }}>
                    {index + 1}. {result.name}, {result.credentials}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', letterSpacing: 0 }}>
                    {result.specialty}
                  </Typography>
                  <Typography sx={{ fontSize: 13, letterSpacing: 0 }}>
                    {result.address}
                  </Typography>
                </Stack>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Paper>
  )
}

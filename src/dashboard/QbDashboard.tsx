import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { SomaCard } from '../soma/SomaCard'
import { soma } from '../soma/tokens'
import { ViewSwitcher } from '../soma/ViewSwitcher'
import { MAYA_ID, type Filters, type Kpis, type MemberNeed } from './mockDashboard'
import { MemberCards } from './MemberCards'
import { MemberTable } from './MemberTable'
import { TableFilters } from './TableFilters'

type QbDashboardProps = {
  density: 'cards' | 'table'
  personaInitial: 'Q' | 'S'
  filters: Filters
  filtered: MemberNeed[]
  totalCount: number
  kpis: Kpis
  paged: MemberNeed[]
  page: number
  pageCount: number
  expandedId: string | null
  onDensity: (density: 'cards' | 'table') => void
  onRole: (persona: 'jordan' | 'casey') => void
  onFilters: (patch: Partial<Filters>) => void
  onToggle: (id: string) => void
  onOpen: (id: string) => void
  onAssign: (id: string) => void
  onWatch: (id: string) => void
  onPage: (page: number) => void
  onToast: (message: string) => void
}

function Kpi({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <SomaCard>
      <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>{label}</Typography>
      <Typography sx={{ ...soma.type.displaySmall, color: soma.text.primary }}>{value}</Typography>
      <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>{hint}</Typography>
    </SomaCard>
  )
}

export function QbDashboard({
  density,
  personaInitial,
  filters,
  filtered,
  totalCount,
  kpis,
  paged,
  page,
  pageCount,
  expandedId,
  onDensity,
  onRole,
  onFilters,
  onToggle,
  onOpen,
  onAssign,
  onWatch,
  onPage,
  onToast,
}: QbDashboardProps) {
  const filteredView = Boolean(filters.health || filters.watchers || filters.due || filters.query)
  const hidden = totalCount - filtered.length
  const mayaOpen = expandedId === MAYA_ID

  return (
    <Stack spacing={`${soma.stack.md}px`} sx={{ p: { xs: 2, md: 3 }, pb: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography component="h1" sx={{ ...soma.type.h2, color: soma.text.primary }}>
            Jordan’s Dashboard
          </Typography>
          <Typography sx={{ ...soma.type.caption, color: soma.text.tertiary }}>
            {mayaOpen
              ? 'Last updated · Today 1:42 PM PT · Maya changing PT clinics · Row expanded'
              : `Last updated · Today 1:42 PM PT · ${totalCount} members · Maya needs help changing PT clinics${filteredView ? ' · Filtered' : ''}`}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ViewSwitcher
            ariaLabel="Density"
            iconOnly
            value={density}
            onChange={(id) => onDensity(id as 'cards' | 'table')}
            options={[
              { id: 'cards', label: 'Cards', icon: 'grid' },
              { id: 'table', label: 'Table', icon: 'list' },
            ]}
          />
          <ViewSwitcher
            ariaLabel="Role"
            value={personaInitial}
            onChange={(id) => onRole(id === 'S' ? 'casey' : 'jordan')}
            options={[
              { id: 'Q', label: 'Q' },
              { id: 'S', label: 'S' },
            ]}
          />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: `${soma.stack.md}px`,
        }}
      >
        <Kpi label="Open" value={kpis.open} hint="Needs attention" />
        <Kpi label="Priority" value={kpis.priority} hint="Emergency + manual" />
        <Kpi label="Delayed" value={kpis.delayed} hint="Past next step" />
        <Kpi label="Owner unavailable" value={kpis.ownerUnavailable} hint="Lee OOO · covered" />
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ alignItems: { md: 'center' } }}>
        <TextField
          value={filters.query}
          onChange={(event) => onFilters({ query: event.target.value })}
          placeholder="Search members, owners, or topics…"
          size="small"
          fullWidth
          slotProps={{ htmlInput: { 'aria-label': 'Search members' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 38,
              borderRadius: `${soma.radius.md}px`,
              ...soma.type.body1,
            },
          }}
        />
        <TableFilters filters={filters} onChange={onFilters} />
      </Stack>

      {density === 'cards' ? (
        <MemberCards
          needs={filtered}
          hiddenCount={hidden}
          healthyHidden={false}
          onOpen={onOpen}
          onAssign={onAssign}
          onToast={onToast}
        />
      ) : (
        <MemberTable
          needs={paged}
          expandedId={expandedId}
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          onToggle={onToggle}
          onOpen={onOpen}
          onWatch={onWatch}
          onPage={onPage}
          onToast={onToast}
        />
      )}
    </Stack>
  )
}

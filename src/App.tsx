import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import { AppShell, type NavItem } from './components/AppShell'
import { AssigneeDialog } from './dashboard/AssigneeDialog'
import { CoverageReassignment } from './dashboard/CoverageReassignment'
import { NeedDetail } from './dashboard/NeedDetail'
import { QbDashboard } from './dashboard/QbDashboard'
import { SpecialistWork } from './dashboard/SpecialistWork'
import { useDashboardState } from './dashboard/useDashboardState'
import { ProviderSearchApp } from './search/ProviderSearchApp'

export default function App() {
  const dash = useDashboardState()
  const { state, dispatch } = dash
  const activeNav: NavItem =
    state.screen === 'search' ? 'Search' : state.screen === 'work' ? 'My Work' : 'Dashboard'
  const navItems: NavItem[] =
    state.screen === 'work'
      ? ['My Work', 'Schedule', 'Search']
      : ['Dashboard', 'My Work', 'Schedule', 'Search']

  function onNav(item: NavItem) {
    if (item === 'Dashboard') dispatch({ type: 'openDashboard' })
    else if (item === 'My Work') dispatch({ type: 'openWork' })
    else if (item === 'Search') dispatch({ type: 'openSearch' })
    else dispatch({ type: 'toast', message: 'Prototype only — Schedule is not connected.' })
  }

  function assign(id: string, suggested = 'Casey Nguyen') {
    dispatch({ type: 'openAssign', needId: id, suggested })
  }

  const assigneeNeed = state.needs.find((need) => need.id === state.assignee?.needId)

  return (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AppShell
        activeNav={activeNav}
        navItems={navItems}
        avatarInitial={dash.persona.initial}
        onBrandClick={() => dispatch({ type: 'openDashboard' })}
        onNavClick={onNav}
        onPrototypeAction={(message) => dispatch({ type: 'toast', message })}
      />

      {state.screen === 'search' ? <ProviderSearchApp /> : null}
      {state.screen === 'dashboard' ? (
        <QbDashboard
          density={state.density}
          personaInitial="Q"
          filters={state.filters}
          filtered={dash.filtered}
          totalCount={state.needs.length}
          kpis={dash.kpis}
          paged={dash.paged}
          page={dash.page}
          pageCount={dash.pageCount}
          expandedId={state.expandedId}
          onDensity={(density) => dispatch({ type: 'density', density })}
          onRole={(persona) => dispatch({ type: 'role', persona })}
          onFilters={(patch) => dispatch({ type: 'patchFilters', patch })}
          onToggle={(id) => dispatch({ type: 'toggleExpanded', id })}
          onOpen={(id) => dispatch({ type: 'openNeed', id })}
          onAssign={(id) => assign(id)}
          onWatch={(id) => dispatch({ type: 'toggleWatch', id })}
          onPage={(page) => dispatch({ type: 'page', page })}
          onToast={(message) => dispatch({ type: 'toast', message })}
        />
      ) : null}
      {state.screen === 'need' && dash.selected ? (
        <NeedDetail
          need={dash.selected}
          onBack={() => dispatch({ type: 'openDashboard' })}
          onCoverage={() => dispatch({ type: 'openCoverage' })}
          onAssign={() => {
            if (dash.selected) assign(dash.selected.id, 'Casey Nguyen')
          }}
          onToast={(message) => dispatch({ type: 'toast', message })}
        />
      ) : null}
      {state.screen === 'work' ? (
        <SpecialistWork
          needs={state.needs}
          onOpen={(id) => dispatch({ type: 'openNeed', id })}
          onHandBack={(id) => dispatch({ type: 'assign', needId: id, owner: 'Jordan Ellis' })}
          onRole={(persona) => dispatch({ type: 'role', persona })}
          onToast={(message) => dispatch({ type: 'toast', message })}
        />
      ) : null}
      {state.screen === 'coverage' ? (
        <CoverageReassignment
          needs={state.needs}
          onOpen={(id) => dispatch({ type: 'openNeed', id })}
          onAssign={(id, suggested) => assign(id, suggested)}
        />
      ) : null}

      <AssigneeDialog
        open={Boolean(state.assignee)}
        memberName={assigneeNeed?.name ?? 'this member'}
        suggested={state.assignee?.suggested ?? 'Casey Nguyen'}
        onClose={() => dispatch({ type: 'closeAssign' })}
        onConfirm={(owner) => {
          if (state.assignee) {
            dispatch({ type: 'assign', needId: state.assignee.needId, owner })
          }
        }}
      />

      <Snackbar
        open={Boolean(state.toast)}
        autoHideDuration={2500}
        onClose={() => dispatch({ type: 'toast', message: null })}
        message={state.toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

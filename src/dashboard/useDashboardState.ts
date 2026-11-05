import { useMemo, useReducer } from 'react'
import {
  createNeeds,
  emptyFilters,
  filterNeeds,
  kpisFor,
  PAGE_SIZE,
  PERSONAS,
  type Density,
  type Filters,
  type MemberNeed,
  type PersonaId,
  type Screen,
} from './mockDashboard'

export type AssigneeDialog = {
  needId: string
  suggested: string
}

export type DashboardState = {
  screen: Screen
  persona: PersonaId
  density: Density
  filters: Filters
  expandedId: string | null
  page: number
  selectedId: string | null
  needs: MemberNeed[]
  toast: string | null
  assignee: AssigneeDialog | null
}

type Action =
  | { type: 'openDashboard' }
  | { type: 'openSearch' }
  | { type: 'openWork' }
  | { type: 'openCoverage' }
  | { type: 'openNeed'; id: string }
  | { type: 'density'; density: Density }
  | { type: 'role'; persona: 'jordan' | 'casey' }
  | { type: 'patchFilters'; patch: Partial<Filters> }
  | { type: 'toggleExpanded'; id: string }
  | { type: 'page'; page: number }
  | { type: 'toast'; message: string | null }
  | { type: 'openAssign'; needId: string; suggested: string }
  | { type: 'closeAssign' }
  | { type: 'assign'; needId: string; owner: string }
  | { type: 'toggleWatch'; id: string }

const initialState: DashboardState = {
  screen: 'dashboard',
  persona: 'jordan',
  density: 'table',
  filters: emptyFilters,
  expandedId: null,
  page: 1,
  selectedId: null,
  needs: createNeeds(),
  toast: null,
  assignee: null,
}

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case 'openDashboard':
      return {
        ...state,
        screen: 'dashboard',
        persona: 'jordan',
        selectedId: null,
        assignee: null,
      }
    case 'openSearch':
      return { ...state, screen: 'search', assignee: null }
    case 'openWork':
      return { ...state, screen: 'work', persona: 'casey', assignee: null }
    case 'openCoverage':
      return { ...state, screen: 'coverage', persona: 'morgan', assignee: null }
    case 'openNeed':
      return {
        ...state,
        screen: 'need',
        selectedId: action.id,
        assignee: null,
      }
    case 'density':
      return { ...state, density: action.density, page: 1 }
    case 'role':
      return action.persona === 'jordan'
        ? { ...state, persona: 'jordan', screen: 'dashboard' }
        : { ...state, persona: 'casey', screen: 'work' }
    case 'patchFilters':
      return {
        ...state,
        filters: { ...state.filters, ...action.patch },
        page: 1,
        expandedId: null,
      }
    case 'toggleExpanded':
      return {
        ...state,
        expandedId: state.expandedId === action.id ? null : action.id,
      }
    case 'page':
      return { ...state, page: action.page, expandedId: null }
    case 'toast':
      return { ...state, toast: action.message }
    case 'openAssign':
      return {
        ...state,
        assignee: { needId: action.needId, suggested: action.suggested },
      }
    case 'closeAssign':
      return { ...state, assignee: null }
    case 'assign': {
      const needs = state.needs.map((need) =>
        need.id === action.needId
          ? {
              ...need,
              owner: action.owner,
              ownerUnavailable: false,
            }
          : need,
      )
      return {
        ...state,
        needs,
        assignee: null,
        toast: `Assigned to ${action.owner}.`,
      }
    }
    case 'toggleWatch': {
      const needs = state.needs.map((need) => {
        if (need.id !== action.id) return need
        const watching = !need.watching
        return {
          ...need,
          watching,
          watcherCount: Math.max(1, need.watcherCount + (watching ? 1 : -1)),
        }
      })
      const need = needs.find((item) => item.id === action.id)
      return {
        ...state,
        needs,
        toast: need?.watching ? `You’re watching ${need.name}.` : `Removed your watch on ${need?.name}.`,
      }
    }
    default:
      return state
  }
}

export function useDashboardState() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const filtered = useMemo(
    () => filterNeeds(state.needs, state.filters),
    [state.needs, state.filters],
  )
  const kpis = useMemo(() => kpisFor(filtered), [filtered])
  const panel = useMemo(() => kpisFor(state.needs), [state.needs])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(state.page, pageCount)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const selected = state.needs.find((need) => need.id === state.selectedId) ?? null
  const owners = useMemo(() => {
    const names = new Set(state.needs.map((need) => need.owner))
    return [...names].sort()
  }, [state.needs])

  return {
    state,
    dispatch,
    filtered,
    kpis,
    panel,
    page,
    pageCount,
    paged,
    selected,
    owners,
    persona: PERSONAS[state.persona],
  }
}

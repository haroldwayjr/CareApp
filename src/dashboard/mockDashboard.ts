export type Health = 'critical' | 'moderate' | 'good'
export type PriorityLayer = 'emergency' | 'manual' | 'system'
export type Screen = 'dashboard' | 'need' | 'work' | 'coverage' | 'search'
export type Density = 'cards' | 'table'
export type PersonaId = 'jordan' | 'casey' | 'morgan'
export type Team = 'QB' | 'Specialist' | 'Coverage'

export type MemberNeed = {
  id: string
  name: string
  initials: string
  health: Health
  owner: string
  watchers: string
  timeLabel: string
  hoursOpen: number
  issue: string
  next: string
  priority: PriorityLayer
  watching: boolean
  delayed: boolean
  ownerUnavailable: boolean
  team: Team
  dueOffsetDays: number
  dueLabel: string
  watcherCount: number
}

type NeedDraft = Omit<MemberNeed, 'dueOffsetDays' | 'dueLabel' | 'watcherCount'>

export type Persona = {
  id: PersonaId
  name: string
  role: string
  initial: string
  short: string
}

export const PERSONAS: Record<PersonaId, Persona> = {
  jordan: {
    id: 'jordan',
    name: 'Jordan Ellis',
    role: 'Quarterback',
    initial: 'J',
    short: 'Jordan',
  },
  casey: {
    id: 'casey',
    name: 'Casey Nguyen',
    role: 'Referral specialist',
    initial: 'C',
    short: 'Casey',
  },
  morgan: {
    id: 'morgan',
    name: 'Morgan Blake',
    role: 'Referral coverage lead',
    initial: 'M',
    short: 'Morgan',
  },
}

export const ASSIGNEES = [
  'Casey Nguyen',
  'Avery Cole',
  'Jordan Ellis',
  'Morgan Blake',
  'Alex Rivera',
]

export const MAYA_ID = 'maya-chen'
export const PAGE_SIZE = 25

export const mayaHealthSeries = [
  0.38, 0.4, 0.42, 0.41, 0.46, 0.5, 0.55, 0.58, 0.62, 0.7, 0.76, 0.82, 0.88, 0.93,
]

export type ChatSide = 'member' | 'specialist'

export type ThreadMessage = {
  id: string
  side: ChatSide
  name: string
  role?: string
  body: string
  meta?: string
}

export const mayaThread: ThreadMessage[] = [
  {
    id: 'm1',
    side: 'member',
    name: 'Faustine Morar',
    body: "Hi — can you help me find a physical therapy clinic that's in network? Prefer something close to SoMa.",
    meta: 'Member asked Jordan for PT help · specialist task linked\nLila George · Quarterback · relationship owner',
  },
  {
    id: 'm2',
    side: 'specialist',
    name: 'Jordan Ellis',
    role: 'Quarterback',
    body: "On it — I've asked our referral specialist to shortlist in-network PT options near you. I'll share them here.",
  },
]

const seed: NeedDraft[] = [
  {
    id: 'devon-brooks',
    name: 'Devon Brooks',
    initials: 'DB',
    health: 'critical',
    owner: 'Jordan Ellis',
    watchers: 'Jordan',
    timeLabel: '5d',
    hoursOpen: 120,
    issue: 'Benefits appeal stalled',
    next: 'Assign claims specialist',
    priority: 'emergency',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: MAYA_ID,
    name: 'Maya Chen',
    initials: 'MC',
    health: 'critical',
    owner: 'Casey Nguyen',
    watchers: 'Jordan',
    timeLabel: '2d',
    hoursOpen: 48,
    issue: 'Change PT clinic',
    next: 'In-network options · Jordan updating Maya',
    priority: 'manual',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'Specialist',
  },
  {
    id: 'elena-vargas',
    name: 'Elena Vargas',
    initials: 'EV',
    health: 'critical',
    owner: 'Jordan Ellis',
    watchers: 'Jordan',
    timeLabel: '2d',
    hoursOpen: 50,
    issue: 'Appeals packet incomplete',
    next: 'Assign appeals',
    priority: 'system',
    watching: true,
    delayed: true,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'riley-smith',
    name: 'Riley Smith',
    initials: 'RS',
    health: 'moderate',
    owner: 'Shared',
    watchers: 'Jordan',
    timeLabel: '1d',
    hoursOpen: 26,
    issue: 'Multiple needs in thread',
    next: 'Specialist handoff',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'taylor-kim',
    name: 'Taylor Kim',
    initials: 'TK',
    health: 'moderate',
    owner: 'Alex Rivera',
    watchers: 'Jordan',
    timeLabel: '2d',
    hoursOpen: 46,
    issue: 'Care transition follow-up',
    next: 'Confirm discharge plan',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'amara-diallo',
    name: 'Amara Diallo',
    initials: 'AD',
    health: 'moderate',
    owner: 'Avery Cole',
    watchers: 'Jordan',
    timeLabel: '18h',
    hoursOpen: 18,
    issue: 'New specialty start',
    next: 'Claim from team queue',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'Coverage',
  },
  {
    id: 'noah-patel',
    name: 'Noah Patel',
    initials: 'NP',
    health: 'moderate',
    owner: 'Kenji Sato',
    watchers: 'Luis L.',
    timeLabel: '12h',
    hoursOpen: 12,
    issue: 'Quantity limit exception',
    next: 'Clinical note',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'Specialist',
  },
  {
    id: 'luis-andrade',
    name: 'Luis Andrade',
    initials: 'LA',
    health: 'good',
    owner: 'Shared',
    watchers: 'Jordan',
    timeLabel: '9h',
    hoursOpen: 9,
    issue: 'Formulary exception',
    next: 'Gather clinicals',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    initials: 'PP',
    health: 'good',
    owner: 'Kenji Sato',
    watchers: 'Alex M.',
    timeLabel: '4h',
    hoursOpen: 4,
    issue: 'Benefits verification',
    next: 'Confirm eligibility',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'chris-nguyen',
    name: 'Chris Nguyen',
    initials: 'CN',
    health: 'good',
    owner: 'Maya Chen',
    watchers: 'Stacy',
    timeLabel: '1d',
    hoursOpen: 24,
    issue: 'Specialty refill timing',
    next: 'Coordinate pharmacy',
    priority: 'manual',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'Specialist',
  },
  {
    id: 'ben-okoro',
    name: 'Ben Okoro',
    initials: 'BO',
    health: 'good',
    owner: 'Shared',
    watchers: 'Alex M.',
    timeLabel: '3h',
    hoursOpen: 3,
    issue: 'Welcome outreach',
    next: 'Send intro',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'aisha-rahman',
    name: 'Aisha Rahman',
    initials: 'AR',
    health: 'moderate',
    owner: 'Luis Andrade',
    watchers: 'Alex M.',
    timeLabel: '6h',
    hoursOpen: 6,
    issue: 'New diagnosis support',
    next: 'Schedule follow-up',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'sam-okonkwo',
    name: 'Sam Okonkwo',
    initials: 'SO',
    health: 'critical',
    owner: 'Avery Cole',
    watchers: 'Jordan',
    timeLabel: '3d',
    hoursOpen: 72,
    issue: 'Ortho referral follow-up',
    next: 'Confirm facility',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'Coverage',
  },
  {
    id: 'kenji-sato',
    name: 'Kenji Sato',
    initials: 'KS',
    health: 'good',
    owner: 'Lee Park',
    watchers: 'Morgan',
    timeLabel: '1d',
    hoursOpen: 30,
    issue: 'Step therapy review',
    next: 'Confirm clinical criteria',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: true,
    team: 'Coverage',
  },
]

const GENERATED_NAMES = [
  'Riley West',
  'Dana Whitfield',
  'Alex Rivera',
  'Lila George',
  'Noah Kim',
  'Priya Nair',
  'Samir Shah',
  'Elena Cho',
  'Chris Alvarez',
  'Maya Brooks',
  'Jordan Hale',
  'Avery Cole',
  'Luis Ortega',
  'Amara Singh',
  'Ben Carter',
  'Taylor Brooks',
  'Devon Hale',
  'Priya Shah',
  'Noah Brooks',
  'Aisha Cole',
  'Kenji Alvarez',
  'Riley Cho',
  'Dana Ortega',
  'Alex Singh',
  'Lila Carter',
  'Samir Hale',
  'Elena Ortega',
  'Chris Shah',
  'Maya Alvarez',
  'Jordan Nair',
  'Avery Brooks',
  'Luis Cho',
  'Amara Carter',
  'Ben Shah',
  'Taylor Ortega',
  'Devon Nair',
]

const ISSUES = [
  'Benefits verification',
  'Referral follow-up',
  'Imaging scheduling',
  'Pharmacy exception',
  'Care plan check-in',
  'Eligibility question',
  'Discharge summary',
  'Prior auth renewal',
]

const OWNERS = ['Unowned', 'Shared', 'Alex Rivera', 'Casey Nguyen', 'Kenji Sato', 'Jordan Ellis']

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

const panelExtras: NeedDraft[] = [
  {
    id: 'sofia-reyes',
    name: 'Sofia Reyes',
    initials: 'SR',
    health: 'critical',
    owner: 'Jordan Ellis',
    watchers: 'Jordan',
    timeLabel: 'Today',
    hoursOpen: 6,
    issue: 'Urgent specialty start',
    next: 'Assign referral',
    priority: 'emergency',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'dana-whitfield',
    name: 'Dana Whitfield',
    initials: 'DW',
    health: 'moderate',
    owner: 'Casey Nguyen',
    watchers: 'Jordan',
    timeLabel: 'Nov 12',
    hoursOpen: 40,
    issue: 'PT auth renewal',
    next: 'Waiting on member',
    priority: 'manual',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'Specialist',
  },
  {
    id: 'evan-brooks',
    name: 'Evan Brooks',
    initials: 'EB',
    health: 'moderate',
    owner: 'Casey Nguyen',
    watchers: 'Jordan',
    timeLabel: 'Nov 8',
    hoursOpen: 30,
    issue: 'PT clinic waitlist',
    next: 'Update member',
    priority: 'system',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'Specialist',
  },
  {
    id: 'jonah-pierce',
    name: 'Jonah Pierce',
    initials: 'JP',
    health: 'moderate',
    owner: 'Kenji Sato',
    watchers: 'Jordan',
    timeLabel: 'Nov 10',
    hoursOpen: 36,
    issue: 'PA clinicals incomplete',
    next: 'Request labs',
    priority: 'system',
    watching: false,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
  {
    id: 'leo-martinez',
    name: 'Leo Martinez',
    initials: 'LM',
    health: 'moderate',
    owner: 'Jordan Ellis',
    watchers: 'Jordan',
    timeLabel: 'Nov 17',
    hoursOpen: 20,
    issue: 'Multi-need triage',
    next: 'Set owner',
    priority: 'manual',
    watching: true,
    delayed: false,
    ownerUnavailable: false,
    team: 'QB',
  },
]

const TABLE_ORDER = [
  MAYA_ID,
  'devon-brooks',
  'elena-vargas',
  'sam-okonkwo',
  'sofia-reyes',
  'amara-diallo',
  'dana-whitfield',
  'evan-brooks',
  'jonah-pierce',
  'leo-martinez',
]

const DUE_META: Record<string, { dueOffsetDays: number; dueLabel: string; watcherCount: number }> = {
  [MAYA_ID]: { dueOffsetDays: 0, dueLabel: 'Today 11:00 AM', watcherCount: 1 },
  'devon-brooks': { dueOffsetDays: 1, dueLabel: 'Tomorrow 3:00 PM', watcherCount: 3 },
  'elena-vargas': { dueOffsetDays: 3, dueLabel: 'Nov 7', watcherCount: 2 },
  'sam-okonkwo': { dueOffsetDays: 10, dueLabel: 'Nov 14', watcherCount: 1 },
  'sofia-reyes': { dueOffsetDays: 0, dueLabel: 'Today 5:00 PM', watcherCount: 2 },
  'amara-diallo': { dueOffsetDays: 7, dueLabel: 'Nov 11', watcherCount: 1 },
  'dana-whitfield': { dueOffsetDays: 8, dueLabel: 'Nov 12', watcherCount: 2 },
  'evan-brooks': { dueOffsetDays: 4, dueLabel: 'Nov 8', watcherCount: 1 },
  'jonah-pierce': { dueOffsetDays: 6, dueLabel: 'Nov 10', watcherCount: 2 },
  'leo-martinez': { dueOffsetDays: 13, dueLabel: 'Nov 17', watcherCount: 3 },
  'riley-smith': { dueOffsetDays: 2, dueLabel: 'Nov 6', watcherCount: 1 },
  'luis-andrade': { dueOffsetDays: 4, dueLabel: 'Nov 8', watcherCount: 1 },
  'chris-nguyen': { dueOffsetDays: 6, dueLabel: 'Nov 10', watcherCount: 2 },
}

function dueLabelFor(offset: number) {
  if (offset < 0) return offset === -1 ? 'Yesterday' : `${Math.abs(offset)}d overdue`
  if (offset === 0) return 'Today'
  if (offset === 1) return 'Tomorrow'
  return `Nov ${4 + offset}`
}

function finish(draft: NeedDraft, index: number): MemberNeed {
  const meta = DUE_META[draft.id]
  const dueOffsetDays = meta?.dueOffsetDays ?? (index % 14) - 3
  return {
    ...draft,
    dueOffsetDays,
    dueLabel: meta?.dueLabel ?? dueLabelFor(dueOffsetDays),
    watcherCount: meta?.watcherCount ?? (draft.watching ? 1 : 2),
    timeLabel: meta?.dueLabel ?? dueLabelFor(dueOffsetDays),
  }
}

function generatedNeeds(count: number): NeedDraft[] {
  return GENERATED_NAMES.filter((name) => name !== 'Dana Whitfield')
    .slice(0, count)
    .map((name, index) => {
    const health: Health = index % 5 === 0 ? 'critical' : index % 2 === 0 ? 'moderate' : 'good'
    const priority: PriorityLayer = index % 11 === 0 ? 'manual' : 'system'
    const hours = 2 + ((index * 5) % 80)
    const owner = OWNERS[index % OWNERS.length]
    return {
      id: `member-${index + 1}`,
      name,
      initials: initials(name),
      health,
      owner,
      watchers: index % 3 === 0 ? 'Jordan' : 'Alex M.',
      timeLabel: hours >= 24 ? `${Math.round(hours / 24)}d` : `${hours}h`,
      hoursOpen: hours,
      issue: ISSUES[index % ISSUES.length],
      next: 'Review next step',
      priority,
      watching: index % 7 === 0,
      delayed: false,
      ownerUnavailable: false,
      team: index % 4 === 0 ? 'Specialist' : 'QB',
    }
  })
}

export function createNeeds(): MemberNeed[] {
  const named = [...seed, ...panelExtras]
  const drafts = [...named, ...generatedNeeds(50 - named.length)]
  const rank = new Map(TABLE_ORDER.map((id, index) => [id, index]))
  drafts.sort((a, b) => (rank.get(a.id) ?? 500) - (rank.get(b.id) ?? 500))
  return drafts.map(finish)
}

export type DueWindow = 'overdue' | 'today' | 'week'
export type WatcherFilter = 'me' | 'multiple'
export type SortKey = 'panel' | 'health' | 'due' | 'member'

export type Filters = {
  query: string
  health: Health | null
  watchers: WatcherFilter | null
  due: DueWindow | null
  sort: SortKey
}

export const emptyFilters: Filters = {
  query: '',
  health: null,
  watchers: null,
  due: null,
  sort: 'panel',
}

export function topicOf(need: MemberNeed) {
  return `${need.issue} · ${need.next}`
}

export function ownerShort(owner: string) {
  const known: Record<string, string> = {
    'Casey Nguyen': 'Casey',
    'Jordan Ellis': 'Jordan',
    'Avery Cole': 'Avery C.',
    'Kenji Sato': 'Kenji S.',
    'Priya Shah': 'Priya N.',
    'Alex Rivera': 'Alex M.',
    'Lee Park': 'Lee P.',
    'Morgan Blake': 'Morgan',
    'Luis Andrade': 'Luis A.',
  }
  return known[owner] ?? owner.split(' ')[0]
}

export function watcherLabel(need: MemberNeed) {
  if (need.id === 'jonah-pierce') return 'Multiple +1'
  if (need.watcherCount > 1) return `Multiple +${need.watcherCount}`
  return need.watching ? 'Jordan' : ownerShort(need.watchers)
}

export function filterNeeds(needs: MemberNeed[], filters: Filters) {
  const query = filters.query.trim().toLowerCase()
  const matched = needs.filter((need) => {
    if (filters.health && need.health !== filters.health) return false
    if (filters.watchers === 'me' && !need.watching) return false
    if (filters.watchers === 'multiple' && need.watcherCount < 2) return false
    if (filters.due === 'overdue' && need.dueOffsetDays >= 0) return false
    if (filters.due === 'today' && need.dueOffsetDays !== 0) return false
    if (filters.due === 'week' && (need.dueOffsetDays < 0 || need.dueOffsetDays > 7)) return false
    if (!query) return true
    const haystack = `${need.name} ${need.owner} ${topicOf(need)}`.toLowerCase()
    return haystack.includes(query)
  })
  return sortNeeds(matched, filters.sort)
}

const HEALTH_RANK: Record<Health, number> = { critical: 0, moderate: 1, good: 2 }

export function sortNeeds(needs: MemberNeed[], sort: SortKey) {
  if (sort === 'panel') return needs
  const copy = [...needs]
  if (sort === 'due') copy.sort((a, b) => a.dueOffsetDays - b.dueOffsetDays || a.name.localeCompare(b.name))
  else if (sort === 'member') copy.sort((a, b) => a.name.localeCompare(b.name))
  else copy.sort((a, b) => HEALTH_RANK[a.health] - HEALTH_RANK[b.health] || a.dueOffsetDays - b.dueOffsetDays)
  return copy
}

export type Kpis = {
  open: number
  priority: number
  delayed: number
  ownerUnavailable: number
  watching: number
}

export function kpisFor(needs: MemberNeed[]): Kpis {
  return {
    open: needs.length,
    priority: needs.filter((need) => need.priority === 'emergency' || need.priority === 'manual').length,
    delayed: needs.filter((need) => need.delayed).length,
    ownerUnavailable: needs.filter((need) => need.ownerUnavailable).length,
    watching: needs.filter((need) => need.watching).length,
  }
}

export const HEALTH_OPTIONS: { id: Health; label: string }[] = [
  { id: 'critical', label: 'Critical' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'good', label: 'Good' },
]

export const LAYER_OPTIONS: { id: PriorityLayer; label: string }[] = [
  { id: 'emergency', label: 'Emergency' },
  { id: 'manual', label: 'Manual' },
  { id: 'system', label: 'System' },
]

export function healthLabel(health: Health) {
  if (health === 'critical') return 'Critical'
  if (health === 'moderate') return 'Moderate'
  return 'Good'
}

export function layerLabel(layer: PriorityLayer) {
  if (layer === 'emergency') return 'Emergency'
  if (layer === 'manual') return 'Manual'
  return 'System'
}

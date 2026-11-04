export type ScopeFilter = 'all' | 'assigned' | 'watching'

export type ThreadStatus =
  | 'In progress'
  | 'Needs reply'
  | 'Waiting on plan'

export type ThreadItem = {
  id: string
  title: string
  member: string
  status: ThreadStatus
  time: string
  unread?: boolean
  selected?: boolean
}

export type ThreadTeam = {
  id: string
  name: string
  accent: string
  badge: number
  threads: ThreadItem[]
}

export type ChatSide = 'member' | 'specialist' | 'agent'

export type ChatMessageKind =
  | 'text'
  | 'system'
  | 'choices'
  | 'timeSelect'
  | 'statusCard'

export type ProceedChoiceId =
  | 'recommendation'
  | 'reassign'
  | 'resolve'
  | 'investigate'

export type ProceedChoice = {
  id: ProceedChoiceId
  label: string
}

export type TimeSelectOption = {
  value: string
  label: string
}

export type StatusCardData = {
  title: string
  badge: string
  owner: string
  nextStep: string
  due: string
}

export type ChatMessage = {
  id: string
  side: ChatSide
  name: string
  role?: string
  body: string
  time: string
  avatar?: 'riley' | 'marcus' | 'dot'
  kind?: ChatMessageKind
  choices?: ProceedChoice[]
  timeOptions?: TimeSelectOption[]
  statusCard?: StatusCardData
}

export type DemoInteraction = 'continue' | 'choices' | 'timeSelect' | 'done'

export type DemoStep = {
  id: number
  interaction: DemoInteraction
  messages: ChatMessage[]
}

export type ActivityItem = {
  id: string
  primary: string
  secondary: string
  time: string
  unread?: boolean
}

export type TaskDetail = {
  label: string
  value: string
}

export type TimelineEvent = {
  id: string
  title: string
  detail: string
  active?: boolean
}

export const SCOPE_COUNTS = {
  all: 48,
  assigned: 12,
  watching: 4,
} as const

export const THREAD_TEAMS: ThreadTeam[] = [
  {
    id: 'claims',
    name: 'Claims Advocacy',
    accent: '#1F7C7C',
    badge: 1,
    threads: [
      {
        id: 'denied-claim',
        title: 'Denied claim follow-up',
        member: 'Riley Smith',
        status: 'In progress',
        time: '12m',
        selected: true,
      },
      {
        id: 'oon-bill',
        title: 'Out-of-network bill',
        member: 'Ana Ruiz',
        status: 'Needs reply',
        time: '1h',
        unread: true,
      },
      {
        id: 'appeal-status',
        title: 'Appeal status check',
        member: 'Marcus Lee',
        status: 'Waiting on plan',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'care-team',
    name: 'Care Team',
    accent: '#7D3FC0',
    badge: 1,
    threads: [
      {
        id: 'benefits',
        title: 'Benefits question',
        member: 'Dee Park',
        status: 'Needs reply',
        time: '2m',
        unread: true,
      },
      {
        id: 'ccm',
        title: 'CCM follow-up',
        member: 'Sam Ito',
        status: 'In progress',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy & Benefits',
    accent: '#B85A00',
    badge: 3,
    threads: [],
  },
]

export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: 'reassign',
    primary: 'Dot reassigned this task to Marcus Bennett',
    secondary: 'Notified Jordan Reyes · watching this thread',
    time: '2m ago',
    unread: true,
  },
]

export const PROCEED_CHOICES: ProceedChoice[] = [
  { id: 'recommendation', label: 'Recommendation from Dot' },
  { id: 'reassign', label: 'Reassign' },
  { id: 'resolve', label: 'Resolve immediately' },
  { id: 'investigate', label: 'Investigate' },
]

export const INVESTIGATE_TIME_OPTIONS: TimeSelectOption[] = [
  { value: '1-day', label: '1 day' },
  { value: '3-days', label: '3 days' },
  { value: '1-week', label: '1 week' },
]

export const CLAIMS_STATUS_CARD: StatusCardData = {
  title: 'Claims task in progress',
  badge: 'In progress',
  owner: 'Marcus Bennett',
  nextStep: 'Investigate denied claim',
  due: 'Due in 3 days',
}

/** Guided click-through beats for the Denied claim thread. */
export const DEMO_STEPS: DemoStep[] = [
  {
    id: 0,
    interaction: 'continue',
    messages: [
      {
        id: 'sys-join',
        side: 'agent',
        name: 'System',
        body: 'Marcus Bennett (Claims Specialist) joined the conversation',
        time: '9:20 AM',
        kind: 'system',
      },
      {
        id: 'm0',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: 'Hi Riley — I’m Marcus, and I’ve picked up your denied claim. To get this moving, can you tell me which visit this is about and roughly when it happened?',
        time: '9:22 AM',
        avatar: 'marcus',
        kind: 'text',
      },
    ],
  },
  {
    id: 1,
    interaction: 'continue',
    messages: [
      {
        id: 'm1',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: 'Thanks. One more — was Dr. Kim the referring doctor, and do you still have the referral or denial letter handy?',
        time: '9:23 AM',
        avatar: 'marcus',
        kind: 'text',
      },
    ],
  },
  {
    id: 2,
    interaction: 'continue',
    messages: [
      {
        id: 'm2',
        side: 'member',
        name: 'Riley Smith',
        body: 'Yeah — cardiology visit in September. Dr. Kim referred me, and I still have the denial letter from the plan.',
        time: '9:24 AM',
        avatar: 'riley',
        kind: 'text',
      },
    ],
  },
  {
    id: 3,
    interaction: 'choices',
    messages: [
      {
        id: 'dot-proceed',
        side: 'agent',
        name: 'Dot',
        body: 'Riley confirmed the September cardiology visit and referral from Dr. Kim. How do you want to proceed, Marcus?',
        time: '9:25 AM',
        avatar: 'dot',
        kind: 'choices',
        choices: PROCEED_CHOICES,
      },
    ],
  },
  {
    id: 4,
    interaction: 'timeSelect',
    messages: [
      {
        id: 'marcus-investigate',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: 'Investigate',
        time: '9:26 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'dot-time',
        side: 'agent',
        name: 'Dot',
        body: 'Got it — I’ll park this as Investigate. How much time do you need before the next update?',
        time: '9:26 AM',
        avatar: 'dot',
        kind: 'timeSelect',
        timeOptions: INVESTIGATE_TIME_OPTIONS,
      },
    ],
  },
  {
    id: 5,
    interaction: 'done',
    messages: [
      {
        id: 'marcus-days',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: '3 days',
        time: '9:27 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'dot-confirm',
        side: 'agent',
        name: 'Dot',
        body: 'Locked in. I’ve marked the claims task as Investigate with a 3-day follow-up.',
        time: '9:27 AM',
        avatar: 'dot',
        kind: 'text',
      },
      {
        id: 'status-card',
        side: 'agent',
        name: 'Dot',
        body: '',
        time: '9:27 AM',
        avatar: 'dot',
        kind: 'statusCard',
        statusCard: CLAIMS_STATUS_CARD,
      },
    ],
  },
]

export const TASK_DETAILS: TaskDetail[] = [
  { label: 'Task owner', value: 'Marcus Bennett' },
  { label: 'Next step', value: 'Resubmit with referral code' },
  { label: 'Expected update', value: 'Wed · 12:00 PM' },
  { label: 'Watcher', value: 'Jordan Reyes · view only' },
]

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    title: 'Assigned to Marcus Bennett',
    detail: 'Mon 9:08 AM · by Dot',
  },
  {
    id: 't2',
    title: 'In progress · Marcus Bennett',
    detail: 'Tue 10:05 AM · referral record received; resubmitting claim',
    active: true,
  },
]

export function getMessagesThroughStep(step: number): ChatMessage[] {
  const capped = Math.max(0, Math.min(step, DEMO_STEPS.length - 1))
  return DEMO_STEPS.slice(0, capped + 1).flatMap((beat) => beat.messages)
}

export function getDemoInteraction(step: number): DemoInteraction {
  const beat = DEMO_STEPS[Math.max(0, Math.min(step, DEMO_STEPS.length - 1))]
  return beat?.interaction ?? 'done'
}

export function getTaskDetailsForDemo(complete: boolean): TaskDetail[] {
  if (!complete) return TASK_DETAILS
  return [
    { label: 'Task owner', value: 'Marcus Bennett' },
    { label: 'Next step', value: 'Investigate denied claim' },
    { label: 'Expected update', value: 'Due in 3 days' },
    { label: 'Watcher', value: 'Jordan Reyes · view only' },
  ]
}

export function getTimelineForDemo(complete: boolean): TimelineEvent[] {
  if (!complete) return TIMELINE_EVENTS
  return [
    {
      id: 't1',
      title: 'Assigned to Marcus Bennett',
      detail: 'Mon 9:08 AM · by Dot',
    },
    {
      id: 't2',
      title: 'In progress · Marcus Bennett',
      detail: 'Tue 10:05 AM · referral record received; resubmitting claim',
    },
    {
      id: 't3',
      title: 'Investigate started · Marcus Bennett',
      detail: 'Today · follow-up in 3 days',
      active: true,
    },
  ]
}

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

/** Member Messages–style Claims highlight card (visual parity with mx-m4). */
export type StatusCardData = {
  chip: string
  title: string
  ownerName: string
  ownerRole: string
  description: string
  expectedUpdateLabel: string
  expectedUpdateValue: string
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

export type DemoInteraction = 'choices' | 'timeSelect' | 'done'

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

export const INVESTIGATE_TIME_OPTIONS: TimeSelectOption[] = Array.from(
  { length: 10 },
  (_, i) => {
    const days = i + 1
    return {
      value: `${days}-day${days === 1 ? '' : 's'}`,
      label: `${days} day${days === 1 ? '' : 's'}`,
    }
  },
)

export const CLAIMS_STATUS_CARD: StatusCardData = {
  chip: 'Claims',
  title: 'Claim for Lymphatic Specialist',
  ownerName: 'Marcus Bennett',
  ownerRole: 'Claims Specialist',
  description:
    'We are investigating ways to resubmit this claim on your behalf.',
  expectedUpdateLabel: 'Expected update',
  expectedUpdateValue: 'Thu 11/5/26',
}

/**
 * Guided click-through for the Denied claim thread.
 * Step 0 lands with the member lymphatic transcript already visible;
 * the first action is Dot’s staff-only proceed choices.
 */
export const DEMO_STEPS: DemoStep[] = [
  {
    id: 0,
    interaction: 'choices',
    messages: [
      {
        id: 'dot-intro',
        side: 'agent',
        name: 'Dot',
        body: "Hello! I'm Dot. I'm here to help you navigate your healthcare and answer any questions along the way. What can I help you with today?",
        time: 'Friday · 8:42 PM',
        avatar: 'dot',
        kind: 'text',
      },
      {
        id: 'member-denial',
        side: 'member',
        name: 'Riley Smith',
        body: "I just got a denial notice in the mail for a claim for a lymphatic specialist. I'd like to follow up.",
        time: 'Friday · 8:43 PM',
        avatar: 'riley',
        kind: 'text',
      },
      {
        id: 'dot-handoff',
        side: 'agent',
        name: 'Dot',
        body: "I'll connect you with a claims specialist. It's Friday night, so they're offline until Monday. You can expect an update on Monday.",
        time: 'Friday · 8:43 PM',
        avatar: 'dot',
        kind: 'text',
      },
      {
        id: 'caption-monday',
        side: 'agent',
        name: 'System',
        body: 'Monday',
        time: '',
        kind: 'system',
      },
      {
        id: 'marcus-intro',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: "Hi, I'm Marcus Bennett, a claims specialist. I've been assigned to your lymphatic specialist claim.",
        time: '9:12 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'marcus-ask',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: "Can you share a bit more about the denial notice? I'll investigate it and look for a way to resubmit the claim.",
        time: '9:12 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'member-details',
        side: 'member',
        name: 'Riley Smith',
        body: "I have Anthem and I was told the provider was in network, but turns out they weren't. I submitted the out of network claim in June and just got the denial.",
        time: '9:15 AM',
        avatar: 'riley',
        kind: 'text',
      },
      {
        id: 'marcus-investigate-msg',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: 'That sounds frustrating. I will need some time to reach out to your insurance and investigate this denial. I will keep you updated on each step along the way. Is there anything else I can help with today?',
        time: '9:16 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'member-how-update',
        side: 'member',
        name: 'Riley Smith',
        body: "No, that's it. How will I know if there's an update?",
        time: '9:17 AM',
        avatar: 'riley',
        kind: 'text',
      },
      {
        id: 'marcus-prefs',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: "Great question. You can monitor this request at the top of your Messages tab, and you'll get an email and/or SMS based on your communication preferences.",
        time: '9:18 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'member-thanks',
        side: 'member',
        name: 'Riley Smith',
        body: "Thanks, that's all.",
        time: '9:18 AM',
        avatar: 'riley',
        kind: 'text',
      },
      {
        id: 'marcus-close',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: "Thank you, I'll reach out with an update.",
        time: '9:19 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'dot-proceed',
        side: 'agent',
        name: 'Dot',
        body: 'Riley shared an Anthem out-of-network denial for a lymphatic specialist claim (submitted in June). How do you want to proceed?',
        time: '9:20 AM',
        avatar: 'dot',
        kind: 'choices',
        choices: PROCEED_CHOICES,
      },
    ],
  },
  {
    id: 1,
    interaction: 'timeSelect',
    messages: [
      {
        id: 'marcus-investigate',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: 'Investigate',
        time: '9:21 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'dot-time',
        side: 'agent',
        name: 'Dot',
        body: 'Got it — I’ll park this as Investigate. How much time do you need before the next update?',
        time: '9:21 AM',
        avatar: 'dot',
        kind: 'timeSelect',
        timeOptions: INVESTIGATE_TIME_OPTIONS,
      },
    ],
  },
  {
    id: 2,
    interaction: 'done',
    messages: [
      {
        id: 'marcus-days',
        side: 'specialist',
        name: 'Marcus Bennett',
        role: 'Claims Specialist',
        body: '3 days',
        time: '9:22 AM',
        avatar: 'marcus',
        kind: 'text',
      },
      {
        id: 'dot-confirm',
        side: 'agent',
        name: 'Dot',
        body: 'Locked in. I’ve marked the lymphatic specialist claim as Investigate with a follow-up by Thu 11/5/26. Here’s the same status card the member sees in Messages.',
        time: '9:22 AM',
        avatar: 'dot',
        kind: 'text',
      },
      {
        id: 'status-card',
        side: 'agent',
        name: 'Dot',
        body: '',
        time: '9:22 AM',
        avatar: 'dot',
        kind: 'statusCard',
        statusCard: CLAIMS_STATUS_CARD,
      },
    ],
  },
]

export const TASK_DETAILS: TaskDetail[] = [
  { label: 'Task owner', value: 'Marcus Bennett' },
  {
    label: 'Next step',
    value: 'Investigate ways to resubmit lymphatic claim',
  },
  { label: 'Expected update', value: 'Thu 11/5/26' },
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
    detail: 'Mon 9:19 AM · member confirmed OON Anthem denial; investigating resubmit',
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
    {
      label: 'Next step',
      value: 'Investigate ways to resubmit lymphatic claim',
    },
    { label: 'Expected update', value: 'Thu 11/5/26' },
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
      detail: 'Mon 9:19 AM · member confirmed OON Anthem denial; investigating resubmit',
    },
    {
      id: 't3',
      title: 'Investigate started · Marcus Bennett',
      detail: 'Today · expected update Thu 11/5/26',
      active: true,
    },
  ]
}

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

export type ClosedChatTurn = {
  from: string
  time: string
  body: string
}

/** An ended conversation kept on the member, not in the open queue. */
export type ClosedChat = {
  id: string
  member: string
  title: string
  month: string
  lastMessage: string
  outcome: string
  turns: ClosedChatTurn[]
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

/** Quarterback shown on the member Details rail. */
export const MEMBER_QUARTERBACK: Record<string, string> = {
  'Riley Smith': 'Jordan Reyes',
  'Ana Ruiz': 'Jordan Reyes',
  'Marcus Lee': 'Jordan Reyes',
  'Dee Park': 'Jordan Reyes',
  'Sam Ito': 'Jordan Reyes',
}

export const CLOSED_CHATS: ClosedChat[] = [
  {
    id: 'riley-referral',
    member: 'Riley Smith',
    title: 'Specialist referral — Dr. Patel',
    month: 'Oct 2026',
    lastMessage: 'Oct 21, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Riley Smith',
        time: '2:14 PM',
        body: 'My PCP referred me to Dr. Patel for cardiology. Can you confirm the referral is on file?',
      },
      {
        from: 'Jordan Reyes',
        time: '2:16 PM',
        body: 'Referral to Dr. Anika Patel is in network and active through Jan 2027. You are good to schedule.',
      },
    ],
  },
  {
    id: 'riley-pharmacy',
    member: 'Riley Smith',
    title: 'Pharmacy refill follow-up',
    month: 'Oct 2026',
    lastMessage: 'Oct 12, 2026',
    outcome: 'Member to follow up',
    turns: [
      {
        from: 'Riley Smith',
        time: '4:48 PM',
        body: 'The pharmacy said my lisinopril refill was denied. Can you see what is blocking it?',
      },
      {
        from: 'Jordan Reyes',
        time: '4:51 PM',
        body: 'The 90-day supply needs a prior authorization. I can start that, or you can fill 30 days today.',
      },
    ],
  },
  {
    id: 'riley-benefits',
    member: 'Riley Smith',
    title: 'Benefits inquiry — CalPERS PPO',
    month: 'Oct 2026',
    lastMessage: 'Oct 3, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Riley Smith',
        time: '11:20 AM',
        body: 'Do specialist visits on my CalPERS PPO need a referral? I am booking dermatology.',
      },
      {
        from: 'Jordan Reyes',
        time: '11:23 AM',
        body: 'Most specialists need a PCP referral. Dermatology for a new concern does. Preventive screening does not.',
      },
    ],
  },
  {
    id: 'ana-oon',
    member: 'Ana Ruiz',
    title: 'Out-of-network explanation',
    month: 'Aug 2026',
    lastMessage: 'Aug 14, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Ana Ruiz',
        time: '9:40 AM',
        body: 'Why was the imaging bill processed as out of network?',
      },
      {
        from: 'Jordan Reyes',
        time: '9:52 AM',
        body: 'The facility was out of network for that date. I sent the EOB breakdown and the in-network locations nearby.',
      },
    ],
  },
  {
    id: 'marcus-pa',
    member: 'Marcus Lee',
    title: 'Prior authorization question',
    month: 'Sep 2026',
    lastMessage: 'Sep 16, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Marcus Lee',
        time: '3:30 PM',
        body: 'Did the plan approve the prior authorization for the specialist visit?',
      },
      {
        from: 'Jordan Reyes',
        time: '3:41 PM',
        body: 'Yes. The authorization is on file through the visit date. Nothing else is needed from you.',
      },
    ],
  },
  {
    id: 'marcus-claims',
    member: 'Marcus Lee',
    title: 'Claims status check',
    month: 'Sep 2026',
    lastMessage: 'Sep 8, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Marcus Lee',
        time: '1:05 PM',
        body: 'Can you tell me where my June claim stands?',
      },
      {
        from: 'Jordan Reyes',
        time: '1:12 PM',
        body: 'That claim was paid. I walked through the EOB and what posted to your deductible.',
      },
    ],
  },
  {
    id: 'marcus-chat-support',
    member: 'Marcus Lee',
    title: 'Chat support',
    month: 'May 2026',
    lastMessage: 'May 3, 2026',
    outcome: "Closed at member's request",
    turns: [
      {
        from: 'Marcus Lee',
        time: '10:02 AM',
        body: 'I need to stop this chat. I will call the plan myself.',
      },
      {
        from: 'Jordan Reyes',
        time: '10:15 AM',
        body: 'Understood. I closed the chat with no resolution, at your request. The messages stay on your record.',
      },
    ],
  },
  {
    id: 'dee-enrollment',
    member: 'Dee Park',
    title: 'Open enrollment plan comparison',
    month: 'Sep 2026',
    lastMessage: 'Sep 24, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Dee Park',
        time: '9:05 AM',
        body: 'Can you compare the PPO and HMO for my family before open enrollment?',
      },
      {
        from: 'Jordan Reyes',
        time: '9:08 AM',
        body: 'The PPO keeps out-of-network coverage. The HMO lowers the premium and requires a PCP referral. I sent the side-by-side.',
      },
    ],
  },
  {
    id: 'sam-ccm',
    member: 'Sam Ito',
    title: 'CCM enrollment',
    month: 'Jun 2026',
    lastMessage: 'Jun 10, 2026',
    outcome: 'Resolved — no follow-up',
    turns: [
      {
        from: 'Sam Ito',
        time: '8:22 AM',
        body: 'Am I enrolled in chronic care management yet?',
      },
      {
        from: 'Jordan Reyes',
        time: '8:40 AM',
        body: 'Yes. Enrollment posted on June 10 and a care manager is assigned.',
      },
    ],
  },
]

export function closedChatsForMember(member: string): ClosedChat[] {
  return CLOSED_CHATS.filter((chat) => chat.member === member)
}

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

import chenPhoto from '../assets/providers/chen.jpg'
import patelPhoto from '../assets/providers/patel.jpg'
import linPhoto from '../assets/providers/lin.jpg'

export type NetworkStatus =
  | 'in_network_tier_1'
  | 'in_network_tier_2'
  | 'out_of_network'

export type ProviderBadge =
  | 'premium_care_physician'
  | 'blue_distinction_center'
  | 'offers_telehealth'
  | 'lgbtq_affirming'
  | 'free_standing_imaging'
  | 'hospital_affiliated'

export type ProviderResult = {
  id: string
  name: string
  credentials: string
  specialty: string
  group: string
  address: string
  distanceMiles: number
  phone: string
  gender: 'Female' | 'Male' | 'Non-binary'
  tier: 'Preferred' | 'Standard'
  /** Network chip variant from the care design system. */
  networkStatus: NetworkStatus
  /** Extra designation / misc / imaging chips. */
  badges: ProviderBadge[]
  language: string
  acceptingNewPatients: boolean
  /** Weekdays the provider has open appointments (prototype). */
  availableDays: string[]
  /** Daypart windows the provider offers (prototype). */
  availableHours: string[]
  copay: number
  initials: string
  /** Optional portrait; when omitted, a gray initials avatar is shown. */
  photoUrl?: string
  lat: number
  lng: number
}
export const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary'] as const
export const TIER_OPTIONS = ['Preferred', 'Standard'] as const
export const DISTANCE_OPTIONS = [
  'Best Nearby',
  'Within 10 miles',
  'Within 25 miles',
  'Within 50 miles',
  'Within 100 miles',
] as const

/** Common languages A–Z for the language filter (searchable long list). */
export const LANGUAGE_OPTIONS = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Assamese',
  'Azerbaijani',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bosnian',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cebuano',
  'Chinese (Cantonese)',
  'Chinese (Mandarin)',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Filipino',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Greek',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Hindi',
  'Hmong',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Korean',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latvian',
  'Lithuanian',
  'Macedonian',
  'Malay',
  'Malayalam',
  'Maltese',
  'Marathi',
  'Mongolian',
  'Nepali',
  'Norwegian',
  'Oromo',
  'Pashto',
  'Persian (Farsi)',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Romanian',
  'Russian',
  'Serbian',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zulu',
] as const

export const AVAILABILITY_DAY_OPTIONS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
] as const

export const AVAILABILITY_HOUR_OPTIONS = [
  'Morning - 5AM to 12PM',
  'Afternoon - 12PM to 5PM',
  'Evening - 5PM to 9PM',
] as const

/** Alias: weekdays are the only selectable days. */
export const AVAILABILITY_WEEKDAY_OPTIONS = AVAILABILITY_DAY_OPTIONS

export const AVAILABILITY_OPTIONS = [
  ...AVAILABILITY_DAY_OPTIONS,
  ...AVAILABILITY_HOUR_OPTIONS,
] as const

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** True when the availability value is an ISO calendar date (YYYY-MM-DD). */
export function isAvailabilityDateValue(value: string): boolean {
  return ISO_DATE_RE.test(value)
}

/** True when the availability value is a time-of-day option. */
export function isAvailabilityHourValue(value: string): boolean {
  return (AVAILABILITY_HOUR_OPTIONS as readonly string[]).includes(value)
}

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

/** Map an ISO date to a weekday name used by provider schedules. */
export function weekdayFromIsoDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return WEEKDAY_NAMES[date.getDay()]
}

/** Chip label for an ISO availability date (e.g. "Mon, Aug 10"). */
export function formatAvailabilityDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/** Format a Date as local YYYY-MM-DD for filter storage. */
export function toAvailabilityIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export type ProviderFilters = {
  genders: string[]
  tiers: string[]
  distance: (typeof DISTANCE_OPTIONS)[number]
  languages: string[]
  availability: string[]
}

export const emptyFilters: ProviderFilters = {
  genders: [],
  tiers: [],
  distance: 'Best Nearby',
  languages: [],
  availability: [],
}

export const ADDRESS_OPTIONS = [
  '1234 180th St, Sibley, IA 52381',
  '88 Market St, San Francisco, CA',
] as const

export const INSURANCE_OPTIONS = [
  'Unspecified',
  'Aetna PPO',
  'Blue Cross HMO',
] as const

export const FILTER_BY_OPTIONS = [
  'Specialties/Conditions',
  'People',
  'Places',
  'NPI',
] as const

/** Prototype specialty/condition suggestions for search autocomplete. */
export const SPECIALTY_CONDITION_SUGGESTIONS = [
  'Diagnostic Imaging or Radiology Center',
  'Internal Medicine Doctor (Internist)',
  'Infertility and Reproduction Doctor',
  'Urinary Tract Infection (UTI) Doctor',
  'Family Medicine Doctor',
  'Cardiology Doctor',
  'Dermatology Doctor',
  'Orthopedic Surgery',
  'Pediatric Care',
  'Mental Health / Psychiatry',
  'Physical Therapy',
  'Urgent Care Center',
] as const

/**
 * Extra phrases that should match a provider specialty when the full suggestion
 * label (or a related alias) is used as the search term.
 */
const SPECIALTY_ALIASES: Record<string, string[]> = {
  'Internal Medicine': ['internist', 'internal medicine doctor'],
  'Family Medicine': ['family medicine doctor', 'family doctor'],
  'Cardiology': ['cardiology doctor', 'cardiologist'],
  'Dermatology': ['dermatology doctor', 'dermatologist'],
  'Orthopedic Surgery': ['orthopedic', 'orthopedics', 'orthopaedic'],
  Pediatrics: ['pediatric', 'pediatric care', 'pediatrics'],
  Psychiatry: ['mental health', 'psychiatrist', 'behavioral health'],
  'Physical Therapy': ['physical therapist', 'physio'],
  Radiology: ['diagnostic imaging', 'radiology center', 'radiologist'],
  'Reproductive Endocrinology': [
    'infertility',
    'reproduction',
    'infertility and reproduction',
  ],
  Urology: ['urinary tract', 'uti', 'urinary tract infection'],
  'Urgent Care': ['urgent care center', 'urgent care'],
}

const SEARCH_STOPWORDS = new Set([
  'and',
  'or',
  'the',
  'for',
  'doctor',
  'doctors',
  'center',
  'care',
])

function tokenizeSearch(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[()/]/g, ' ')
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !SEARCH_STOPWORDS.has(token))
}

function matchesProviderSearch(
  result: ProviderResult,
  rawTerm: string,
): boolean {
  const term = rawTerm.trim().toLowerCase()
  if (!term) return true

  const specialty = result.specialty.toLowerCase()
  const haystack =
    `${result.name} ${result.specialty} ${result.group}`.toLowerCase()

  if (haystack.includes(term)) return true
  // Suggestion labels are longer than specialty names, e.g.
  // "Internal Medicine Doctor (Internist)" should still hit "Internal Medicine".
  if (term.includes(specialty)) return true

  const aliases = SPECIALTY_ALIASES[result.specialty] ?? []
  if (aliases.some((alias) => term.includes(alias) || alias.includes(term))) {
    return true
  }

  const tokens = tokenizeSearch(term)
  if (tokens.length === 0) return false

  const specialtyTokens = tokenizeSearch(specialty)
  // Require the full specialty phrase to be covered so partial words like
  // "therapy" alone don't cross-match unrelated specialties.
  if (
    specialtyTokens.length > 0 &&
    specialtyTokens.every((specialtyToken) =>
      tokens.some(
        (token) =>
          specialtyToken.includes(token) || token.includes(specialtyToken),
      ),
    )
  ) {
    return true
  }

  // People / place style queries: match name or clinic tokens only.
  const nameGroup = `${result.name} ${result.group}`.toLowerCase()
  return tokens.some((token) => nameGroup.includes(token))
}

/** Prototype place suggestions for search autocomplete. */
export const PLACE_SUGGESTIONS = [
  'Cascade Regional Medical Group',
  'Prairie Horizon Health Partners',
  'Sibley Family & Primary Care Clinic',
  'Northside Community Physicians Network',
  'Lakeside Comprehensive Care Center',
  'Midwest Advanced Cardiology Associates',
  'Sibley Advanced Dermatology Clinic',
  'Prairie Orthopedic & Sports Medicine',
] as const

export function getSearchSuggestions(
  filterBy: string,
  query: string,
): string[] {
  const term = query.trim().toLowerCase()
  if (term.length === 0) return []

  let pool: string[] = []
  if (filterBy === 'People') {
    pool = mockProviders.map(
      (provider) => `${provider.name}, ${provider.credentials}`,
    )
  } else if (filterBy === 'Places') {
    pool = [...PLACE_SUGGESTIONS]
  } else if (filterBy === 'NPI') {
    pool = mockProviders.map(
      (provider) =>
        `${provider.name} · NPI ${1000000000 + Number(provider.id) * 111}`,
    )
  } else {
    // Specialties/Conditions (default)
    pool = [...SPECIALTY_CONDITION_SUGGESTIONS]
  }

  return pool
    .filter((option) => option.toLowerCase().includes(term))
    .slice(0, 8)
}

const mockProvidersBase: Omit<
  ProviderResult,
  'availableDays' | 'availableHours'
>[] = [
  {
    id: '1',
    name: 'Dr. James Alexander Chen',
    credentials: 'DO',
    specialty: 'Internal Medicine',
    group: 'Cascade Regional Medical Group',
    address: '4120 Northwest Maplewood Avenue, Suite 210, Sibley, IA 51249',
    distanceMiles: 12.4,
    phone: '(712) 555-0142',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['premium_care_physician', 'offers_telehealth'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'JC',
    photoUrl: chenPhoto,
    lat: 43.4052,
    lng: -95.7614,
  },
  {
    id: '2',
    name: 'Dr. Amara Srinivasan Patel',
    credentials: 'MD',
    specialty: 'Internal Medicine',
    group: 'Prairie Horizon Health Partners',
    address: '2890 South Riverside Road, Sibley, IA 51249',
    distanceMiles: 18.2,
    phone: '(712) 555-0198',
    gender: 'Female',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['lgbtq_affirming'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'AP',
    photoUrl: patelPhoto,
    lat: 43.4186,
    lng: -95.7288,
  },
  {
    id: '3',
    name: 'Dr. Luis Ortega',
    credentials: 'MD',
    specialty: 'Family Medicine',
    group: 'Sibley Family & Primary Care Clinic',
    address: '1501 West Lakeview Boulevard, Sibley, IA 51249',
    distanceMiles: 8.6,
    phone: '(712) 555-0111',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['offers_telehealth'],
    language: 'Spanish',
    acceptingNewPatients: false,
    copay: 300,
    initials: 'LO',
    lat: 43.3914,
    lng: -95.7462,
  },
  {
    id: '4',
    name: 'Dr. Mei Lin',
    credentials: 'MD',
    specialty: 'Internal Medicine',
    group: 'Northside Community Physicians Network',
    address: '220 North Harbor Lane, Sibley, IA 51238',
    distanceMiles: 24.1,
    phone: '(712) 555-0177',
    gender: 'Female',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['blue_distinction_center'],
    language: 'Chinese (Mandarin)',
    acceptingNewPatients: true,
    copay: 35,
    initials: 'ML',
    photoUrl: linPhoto,
    lat: 43.4028,
    lng: -95.7125,
  },
  {
    id: '5',
    name: 'Dr. Noah Brooks',
    credentials: 'DO',
    specialty: 'Internal Medicine',
    group: 'Cascade Regional Medical Group',
    address: '7 Cedar Court, Sibley, IA 51249',
    distanceMiles: 31.5,
    phone: '(712) 555-0133',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: [],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'NB',
    lat: 43.3789,
    lng: -95.7721,
  },
  {
    id: '6',
    name: 'Dr. Sofia Thanh Nguyen',
    credentials: 'MD',
    specialty: 'Internal Medicine',
    group: 'Lakeside Comprehensive Care Center',
    address: '501 East Lakeview Drive, Sibley, IA 51249',
    distanceMiles: 42.0,
    phone: '(712) 555-0160',
    gender: 'Female',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['offers_telehealth'],
    language: 'Vietnamese',
    acceptingNewPatients: false,
    copay: 300,
    initials: 'SN',
    lat: 43.4241,
    lng: -95.6984,
  },
  {
    id: '7',
    name: 'Dr. Elena Gabriela Vasquez',
    credentials: 'MD',
    specialty: 'Family Medicine',
    group: 'Sibley Family & Primary Care Clinic',
    address: '18 East Prairie Street, Sibley, IA 51249',
    distanceMiles: 6.2,
    phone: '(712) 555-0184',
    gender: 'Female',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['lgbtq_affirming', 'offers_telehealth'],
    language: 'Spanish',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'EV',
    lat: 43.3972,
    lng: -95.7391,
  },
  {
    id: '8',
    name: 'Dr. Marcus Everett Hale',
    credentials: 'MD',
    specialty: 'Cardiology',
    group: 'Midwest Advanced Cardiology Associates',
    address: '7421 Independence Commerce Parkway, Suite 100, Sibley, IA 51249',
    distanceMiles: 14.8,
    phone: '(712) 555-0201',
    gender: 'Male',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['premium_care_physician', 'blue_distinction_center'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 45,
    initials: 'MH',
    lat: 43.4115,
    lng: -95.7558,
  },
  {
    id: '9',
    name: 'Dr. Priya Shah',
    credentials: 'MD',
    specialty: 'Cardiology',
    group: 'Midwest Advanced Cardiology Associates',
    address: '902 Heartland Parkway, Suite 200, Sibley, IA 51249',
    distanceMiles: 15.1,
    phone: '(712) 555-0202',
    gender: 'Female',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: [],
    language: 'English',
    acceptingNewPatients: false,
    copay: 300,
    initials: 'PS',
    lat: 43.4122,
    lng: -95.7541,
  },
  {
    id: '10',
    name: 'Dr. Hannah Orth',
    credentials: 'MD',
    specialty: 'Dermatology',
    group: 'Sibley Advanced Dermatology Clinic',
    address: '44 North Birch Road, Sibley, IA 51246',
    distanceMiles: 9.4,
    phone: '(712) 555-0210',
    gender: 'Female',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['offers_telehealth'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 40,
    initials: 'HO',
    lat: 43.3886,
    lng: -95.7629,
  },
  {
    id: '11',
    name: 'Dr. Kevin Park',
    credentials: 'DO',
    specialty: 'Orthopedic Surgery',
    group: 'Prairie Orthopedic & Sports Medicine',
    address: '310 Sports Medicine Way, Sibley, IA 51249',
    distanceMiles: 11.7,
    phone: '(712) 555-0222',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['hospital_affiliated'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'KP',
    lat: 43.4068,
    lng: -95.7412,
  },
  {
    id: '12',
    name: 'Dr. Aisha Rahman',
    credentials: 'MD',
    specialty: 'Pediatrics',
    group: 'Lakeside Comprehensive Care Center',
    address: '120 Childrens Lane, Sibley, IA 51249',
    distanceMiles: 7.9,
    phone: '(712) 555-0233',
    gender: 'Female',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['lgbtq_affirming', 'premium_care_physician'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 30,
    initials: 'AR',
    lat: 43.4004,
    lng: -95.7695,
  },
  {
    id: '13',
    name: 'Dr. Benjamin Christopher Crowe',
    credentials: 'MD',
    specialty: 'Psychiatry',
    group: 'Northside Community Physicians Network',
    address: '55 Wellness Boulevard, Sibley, IA 51249',
    distanceMiles: 16.3,
    phone: '(712) 555-0244',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['offers_telehealth', 'lgbtq_affirming'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'BC',
    lat: 43.4198,
    lng: -95.7334,
  },
  {
    id: '14',
    name: 'Dr. Claire Fontaine',
    credentials: 'PT, DPT',
    specialty: 'Physical Therapy',
    group: 'Prairie Horizon Health Partners',
    address: '77 Rehabilitation Court, Sibley, IA 51238',
    distanceMiles: 10.2,
    phone: '(712) 555-0255',
    gender: 'Female',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: [],
    language: 'English',
    acceptingNewPatients: true,
    copay: 35,
    initials: 'CF',
    lat: 43.3935,
    lng: -95.7208,
  },
  {
    id: '15',
    name: 'Dr. Owen Blake',
    credentials: 'MD',
    specialty: 'Radiology',
    group: 'Cascade Regional Medical Group',
    address: '200 Imaging Center Drive, Sibley, IA 51249',
    distanceMiles: 13.6,
    phone: '(712) 555-0266',
    gender: 'Male',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['free_standing_imaging'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 40,
    initials: 'OB',
    lat: 43.4089,
    lng: -95.7487,
  },
  {
    id: '16',
    name: 'Dr. Nadia Okonkwo',
    credentials: 'MD',
    specialty: 'Reproductive Endocrinology',
    group: 'Prairie Horizon Health Partners',
    address: '88 Fertility Way, Sibley, IA 51249',
    distanceMiles: 19.5,
    phone: '(712) 555-0277',
    gender: 'Female',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['offers_telehealth'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'NO',
    lat: 43.4157,
    lng: -95.7176,
  },
  {
    id: '17',
    name: 'Dr. Ryan Kessler',
    credentials: 'MD',
    specialty: 'Urology',
    group: 'Northside Community Physicians Network',
    address: '401 Kidney Court, Sibley, IA 51249',
    distanceMiles: 22.0,
    phone: '(712) 555-0288',
    gender: 'Male',
    tier: 'Standard',
    networkStatus: 'in_network_tier_2',
    badges: ['hospital_affiliated'],
    language: 'English',
    acceptingNewPatients: true,
    copay: 300,
    initials: 'RK',
    lat: 43.3861,
    lng: -95.7349,
  },
  {
    id: '18',
    name: 'Dr. Jade Morales',
    credentials: 'MD',
    specialty: 'Urgent Care',
    group: 'Lakeside Comprehensive Care Center',
    address: '1 Immediate Care Plaza, Sibley, IA 51249',
    distanceMiles: 5.4,
    phone: '(712) 555-0299',
    gender: 'Non-binary',
    tier: 'Preferred',
    networkStatus: 'in_network_tier_1',
    badges: ['offers_telehealth', 'lgbtq_affirming'],
    language: 'Spanish',
    acceptingNewPatients: true,
    copay: 45,
    initials: 'JM',
    lat: 43.3948,
    lng: -95.7522,
  },
]

/** Attach prototype day/hour schedules used by the Availability filter. */
export const mockProviders: ProviderResult[] = mockProvidersBase.map(
  (provider, index) => {
    const availableDays = AVAILABILITY_DAY_OPTIONS.filter(
      (_, dayIndex) => (index + dayIndex) % 3 !== 0,
    )
    const availableHours = AVAILABILITY_HOUR_OPTIONS.filter(
      (_, hourIndex) => (index + hourIndex) % 2 === 0,
    )
    return {
      ...provider,
      availableDays:
        availableDays.length > 0
          ? [...availableDays]
          : ['Monday', 'Wednesday', 'Friday'],
      availableHours:
        availableHours.length > 0
          ? [...availableHours]
          : ['Morning - 5AM to 12PM'],
    }
  },
)

/** Center of the prototype search area (Sibley, IA). */
export const MAP_DEFAULT_CENTER = { lat: 43.3991, lng: -95.7517 } as const

export type OverviewLocationStatus = {
  label: string
  value: string
  positive: boolean | null
}

export type OverviewLocation = {
  address: string
  statuses: OverviewLocationStatus[]
  distanceMiles: number
  tierLevel: ProviderResult['tier']
  copay: number
  networkLabel: string
  networkTone: 'success' | 'warning' | 'error'
  phone: string
}

export type OverviewInsurancePlan = {
  name: string
  networkLabel: string
}

export type ProviderOverview = {
  specialties: string[]
  conditions: string[]
  services: string[]
  npi: string
  trainedAt: string
  hospitalAffiliations: string[]
  locations: OverviewLocation[]
  insuranceCarrier: string
  insurancePlans: OverviewInsurancePlan[]
}

const SPECIALTY_OVERVIEW: Record<
  string,
  { specialties: string[]; conditions: string[]; services: string[] }
> = {
  'Internal Medicine': {
    specialties: ['Internal Medicine', 'Primary Care', 'Preventive Medicine'],
    conditions: [
      'Hypertension',
      'Diabetes',
      'High Cholesterol',
      'Thyroid Disorders',
      'Fatigue',
    ],
    services: ['Annual Physical', 'Chronic Care Management', 'Lab Orders'],
  },
  'Family Medicine': {
    specialties: ['Family Medicine', 'Primary Care'],
    conditions: ['Wellness Visits', 'Cold & Flu', 'Asthma', 'Minor Injuries'],
    services: ['Family Care', 'Vaccinations', 'Same-day Sick Visits'],
  },
  Cardiology: {
    specialties: ['Cardiology', 'Interventional Cardiology'],
    conditions: [
      'Pulmonary Hypertension',
      'Heart Health',
      'Atrial Flutter',
      'Coronary Artery Disease',
      'Heart Failure',
    ],
    services: ['Coronary Angioplasty (PCI)', 'EKG', 'Stress Testing'],
  },
  Dermatology: {
    specialties: ['Dermatology'],
    conditions: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer Screening'],
    services: ['Skin Biopsy', 'Mole Removal', 'Phototherapy'],
  },
  'Orthopedic Surgery': {
    specialties: ['Orthopedic Surgery', 'Sports Medicine'],
    conditions: ['Joint Pain', 'Fractures', 'ACL Injury', 'Arthritis'],
    services: ['Joint Replacement', 'Arthroscopy', 'Physical Therapy Referral'],
  },
  Pediatrics: {
    specialties: ['Pediatrics', 'Adolescent Medicine'],
    conditions: ['Well-child Visits', 'Asthma', 'Ear Infections', 'Allergies'],
    services: ['Immunizations', 'Developmental Screening'],
  },
  Psychiatry: {
    specialties: ['Psychiatry', 'Behavioral Health'],
    conditions: ['Anxiety', 'Depression', 'ADHD', 'PTSD'],
    services: ['Medication Management', 'Therapy Referral'],
  },
  'Physical Therapy': {
    specialties: ['Physical Therapy'],
    conditions: ['Back Pain', 'Post-surgical Rehab', 'Sports Injury'],
    services: ['Manual Therapy', 'Therapeutic Exercise'],
  },
  Radiology: {
    specialties: ['Radiology', 'Diagnostic Imaging'],
    conditions: ['Imaging Follow-up', 'Screening Mammography'],
    services: ['MRI', 'CT Scan', 'X-Ray'],
  },
  'Reproductive Endocrinology': {
    specialties: ['Reproductive Endocrinology', 'Infertility'],
    conditions: ['Infertility', 'PCOS', 'Endometriosis'],
    services: ['Fertility Evaluation', 'IVF Consultation'],
  },
  Urology: {
    specialties: ['Urology'],
    conditions: ['UTI', 'Kidney Stones', 'Prostate Health'],
    services: ['Cystoscopy', 'Ultrasound'],
  },
  'Urgent Care': {
    specialties: ['Urgent Care'],
    conditions: ['Minor Injury', 'Infection', 'Sprains'],
    services: ['X-Ray', 'Stitches', 'Rapid Testing'],
  },
}

const TRAINED_AT = [
  'University Hospital-SUNY',
  'University of Iowa Hospitals',
  'Mayo Clinic',
  'Northwestern Memorial',
]

const HOSPITALS = [
  'Stanford Medical Center',
  'Sibley Community Hospital',
  'Prairie Regional Medical Center',
  'Lakeside Medical Center',
]

function networkOverviewLabel(status: NetworkStatus): string {
  switch (status) {
    case 'in_network_tier_1':
    case 'in_network_tier_2':
      return 'In Network'
    case 'out_of_network':
      return 'Out of network'
  }
}

function networkOverviewTone(
  status: NetworkStatus,
): 'success' | 'warning' | 'error' {
  return status === 'out_of_network' ? 'error' : 'success'
}

/** Inserts a suite into a street address while preserving city, state, and ZIP. */
function buildLocationAddress(baseAddress: string, suiteNumber: number): string {
  const suiteLabel = `Suite ${suiteNumber}`
  const withExistingSuite =
    /^(.+?),\s*Suite\s+[\w-]+,\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})$/
  const withZip = /^(.+?),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5})$/

  const existingSuiteMatch = baseAddress.match(withExistingSuite)
  if (existingSuiteMatch) {
    const [, street, city, state, zip] = existingSuiteMatch
    return `${street}, ${suiteLabel}, ${city}, ${state} ${zip}`
  }

  const zipMatch = baseAddress.match(withZip)
  if (zipMatch) {
    const [, street, city, state, zip] = zipMatch
    return `${street}, ${suiteLabel}, ${city}, ${state} ${zip}`
  }

  return baseAddress
}

/** Builds overview panel content from a provider result. */
export function getProviderOverview(provider: ProviderResult): ProviderOverview {
  const catalog =
    SPECIALTY_OVERVIEW[provider.specialty] ?? {
      specialties: [provider.specialty],
      conditions: ['General Care'],
      services: ['Consultation'],
    }
  const seed = Number(provider.id) || 1
  const npi = String(1000000000 + seed * 111147).slice(0, 10)

  return {
    specialties: catalog.specialties,
    conditions: catalog.conditions,
    services: catalog.services,
    npi,
    trainedAt: TRAINED_AT[seed % TRAINED_AT.length],
    hospitalAffiliations: [
      HOSPITALS[seed % HOSPITALS.length],
      ...(seed % 3 === 0 ? [HOSPITALS[(seed + 1) % HOSPITALS.length]] : []),
    ],
    locations: [
      {
        address: buildLocationAddress(provider.address, 100 + seed),
        statuses: [
          {
            label: 'Accepting New Patients',
            value: provider.acceptingNewPatients ? 'Yes' : 'No',
            positive: provider.acceptingNewPatients,
          },
          {
            label: 'Allows Third-Party Scheduling',
            value: seed % 2 === 0 ? 'Yes' : 'No',
            positive: seed % 2 === 0,
          },
          {
            label: 'Telemedicine Available',
            value: provider.badges.includes('offers_telehealth') ? 'Yes' : 'No',
            positive: provider.badges.includes('offers_telehealth'),
          },
          {
            label: 'Next Appointment',
            value: seed % 4 === 0 ? 'Unavailable' : 'Available',
            positive: seed % 4 !== 0,
          },
          {
            label: 'Required Referral',
            value: seed % 3 === 0 ? 'Yes' : 'No',
            positive: seed % 3 === 0,
          },
          {
            label: 'Requires Records',
            value: seed % 5 === 0 ? 'Yes' : 'No',
            positive: seed % 5 === 0,
          },
        ],
        distanceMiles: provider.distanceMiles,
        tierLevel: provider.tier,
        copay: provider.copay,
        networkLabel: networkOverviewLabel(provider.networkStatus),
        networkTone: networkOverviewTone(provider.networkStatus),
        phone: provider.phone,
      },
    ],
    insuranceCarrier: 'Anthem',
    insurancePlans: [
      {
        name: 'PPO Plan',
        networkLabel: networkOverviewLabel(provider.networkStatus),
      },
      {
        name: 'PPO COBRA',
        networkLabel: networkOverviewLabel(provider.networkStatus),
      },
      {
        name: 'gHIP Plan',
        networkLabel: networkOverviewLabel(provider.networkStatus),
      },
      {
        name: 'gHIP Plan COBRA',
        networkLabel: networkOverviewLabel(provider.networkStatus),
      },
    ],
  }
}

export function googleMapsPlaceUrl(lat: number, lng: number, address?: string) {
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng)
  const query = hasCoords
    ? `${lat},${lng}`
    : (address?.trim() || `${lat},${lng}`)
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function googleMapsAreaUrl(lat: number, lng: number, zoom = 12) {
  return `https://www.google.com/maps/@${lat},${lng},${zoom}z`
}

function distanceLimit(label: ProviderFilters['distance']): number | null {
  if (label === 'Best Nearby') return null
  const match = label.match(/(\d+)/)
  return match ? Number(match[1]) : null
}

function tierRank(tier: ProviderResult['tier']): number {
  return tier === 'Preferred' ? 0 : 1
}

function networkRank(status: NetworkStatus): number {
  switch (status) {
    case 'in_network_tier_1':
      return 0
    case 'in_network_tier_2':
      return 1
    case 'out_of_network':
      return 2
  }
}

/**
 * Best match ranks providers by network (Tier 1 / in-network first), cost
 * (copay), access (accepting new patients), then proximity.
 */
export function compareByBestMatch(
  a: ProviderResult,
  b: ProviderResult,
): number {
  const networkDiff = networkRank(a.networkStatus) - networkRank(b.networkStatus)
  if (networkDiff !== 0) return networkDiff

  const tierDiff = tierRank(a.tier) - tierRank(b.tier)
  if (tierDiff !== 0) return tierDiff

  if (a.copay !== b.copay) return a.copay - b.copay

  const accessDiff =
    Number(b.acceptingNewPatients) - Number(a.acceptingNewPatients)
  if (accessDiff !== 0) return accessDiff

  return a.distanceMiles - b.distanceMiles
}

/** Quality emphasizes network tier and access, then cost. */
export function compareByQuality(a: ProviderResult, b: ProviderResult): number {
  const networkDiff = networkRank(a.networkStatus) - networkRank(b.networkStatus)
  if (networkDiff !== 0) return networkDiff

  const tierDiff = tierRank(a.tier) - tierRank(b.tier)
  if (tierDiff !== 0) return tierDiff

  const accessDiff =
    Number(b.acceptingNewPatients) - Number(a.acceptingNewPatients)
  if (accessDiff !== 0) return accessDiff

  if (a.copay !== b.copay) return a.copay - b.copay

  return a.distanceMiles - b.distanceMiles
}

export function sortProviders(
  results: ProviderResult[],
  sortBy: string,
): ProviderResult[] {
  const sorted = [...results]
  if (sortBy === 'Distance') {
    sorted.sort((a, b) => a.distanceMiles - b.distanceMiles)
  } else if (sortBy === 'Quality') {
    sorted.sort(compareByQuality)
  } else {
    // Default / "Best match"
    sorted.sort(compareByBestMatch)
  }
  return sorted
}

export function filterProviders(
  results: ProviderResult[],
  filters: ProviderFilters,
  searchTerm: string,
): ProviderResult[] {
  const maxDistance = distanceLimit(filters.distance)

  return results.filter((result) => {
    if (!matchesProviderSearch(result, searchTerm)) return false
    if (
      filters.genders.length > 0 &&
      !filters.genders.includes(result.gender)
    ) {
      return false
    }
    if (filters.tiers.length > 0 && !filters.tiers.includes(result.tier)) {
      return false
    }
    if (
      filters.languages.length > 0 &&
      !filters.languages.includes(result.language)
    ) {
      return false
    }
    if (filters.availability.length > 0) {
      const selectedHours = filters.availability.filter((label) =>
        isAvailabilityHourValue(label),
      )
      const selectedWeekdays = filters.availability.flatMap((label) => {
        if (isAvailabilityDateValue(label)) {
          return [weekdayFromIsoDate(label)]
        }
        if ((AVAILABILITY_DAY_OPTIONS as readonly string[]).includes(label)) {
          return [label]
        }
        return []
      })
      if (
        selectedWeekdays.length > 0 &&
        !selectedWeekdays.some((day) => result.availableDays.includes(day))
      ) {
        return false
      }
      if (
        selectedHours.length > 0 &&
        !selectedHours.some((hour) => result.availableHours.includes(hour))
      ) {
        return false
      }
    }
    if (maxDistance != null && result.distanceMiles > maxDistance) {
      return false
    }
    return true
  })
}

export function countActiveFilters(filters: ProviderFilters): number {
  return (
    filters.genders.length +
    filters.tiers.length +
    filters.languages.length +
    filters.availability.length +
    (filters.distance !== 'Best Nearby' ? 1 : 0)
  )
}

/** Structural equality for draft vs applied filter comparison. */
export function filtersEqual(a: ProviderFilters, b: ProviderFilters): boolean {
  const sameList = (left: string[], right: string[]) =>
    left.length === right.length && left.every((item, index) => item === right[index])
  return (
    a.distance === b.distance &&
    sameList(a.genders, b.genders) &&
    sameList(a.tiers, b.tiers) &&
    sameList(a.languages, b.languages) &&
    sameList(a.availability, b.availability)
  )
}

const AVAILABILITY_CHIP_LABELS: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  'Morning - 5AM to 12PM': 'Morning',
  'Afternoon - 12PM to 5PM': 'Afternoon',
  'Evening - 5PM to 9PM': 'Evening',
}

export type FilterChip = { id: string; label: string }

export function buildFilterChips(filters: ProviderFilters): FilterChip[] {
  const chips: FilterChip[] = []
  for (const gender of filters.genders) {
    chips.push({ id: `gender:${gender}`, label: gender })
  }
  for (const tier of filters.tiers) {
    chips.push({ id: `tier:${tier}`, label: tier })
  }
  for (const language of filters.languages) {
    chips.push({ id: `lang:${language}`, label: language })
  }
  for (const availability of filters.availability) {
    chips.push({
      id: `avail:${availability}`,
      label: isAvailabilityDateValue(availability)
        ? formatAvailabilityDateLabel(availability)
        : (AVAILABILITY_CHIP_LABELS[availability] ?? availability),
    })
  }
  if (filters.distance !== 'Best Nearby') {
    chips.push({ id: 'distance', label: filters.distance })
  }
  return chips
}

/** Toolbar summary: "Any", a single chip label, or "N filters". */
export function buildFilterSummary(filters: ProviderFilters): string {
  const count = countActiveFilters(filters)
  if (count === 0) return 'Any'
  const chips = buildFilterChips(filters)
  // Count lives on the filter-icon badge; trigger shows the first applied label.
  return chips[0]?.label ?? 'Any'
}

export function removeFilterChip(
  filters: ProviderFilters,
  chipId: string,
): ProviderFilters {
  if (chipId.startsWith('gender:')) {
    const value = chipId.slice(7)
    return {
      ...filters,
      genders: filters.genders.filter((item) => item !== value),
    }
  }
  if (chipId.startsWith('tier:')) {
    const value = chipId.slice(5)
    return { ...filters, tiers: filters.tiers.filter((item) => item !== value) }
  }
  if (chipId.startsWith('lang:')) {
    const value = chipId.slice(5)
    return {
      ...filters,
      languages: filters.languages.filter((item) => item !== value),
    }
  }
  if (chipId.startsWith('avail:')) {
    const value = chipId.slice(6)
    return {
      ...filters,
      availability: filters.availability.filter((item) => item !== value),
    }
  }
  if (chipId === 'distance') {
    return { ...filters, distance: 'Best Nearby' }
  }
  return filters
}

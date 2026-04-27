import { IconType } from 'react-icons'
import { FiTarget, FiTrendingUp, FiUsers, FiMap, FiAward, FiZap } from 'react-icons/fi'

export interface WhyItem {
  icon: IconType
  title: string
  description: string
}

export interface LearnItem {
  title: string
  description: string
}

export interface BonusItem {
  title: string
  highlight?: boolean
}

export interface AudienceItem {
  text: string
}
export interface NotAudienceItem {
  text: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TestimonialItem {
  quote: string
  name: string
}

export const WHY_ITEMS: WhyItem[] = [
  {
    icon: FiTarget,
    title: 'Strategic Clarity',
    description:
      'Understand the invisible dynamics that determine who accelerates and who stagnates.',
  },
  {
    icon: FiTrendingUp,
    title: 'From Effort to Leverage',
    description:
      'Learn how to design leverage into your professional life so effort compounds instead of draining you.',
  },
  {
    icon: FiUsers,
    title: 'Environment & Proximity',
    description:
      'Identify the invisible forces shaping your growth and how to intentionally optimise them.',
  },
  {
    icon: FiMap,
    title: 'Practical Frameworks',
    description:
      'Gain actionable frameworks you can apply immediately — not just ideas you forget next week.',
  },
  {
    icon: FiAward,
    title: 'Value Recognition',
    description:
      'Convert your skills, experience, and potential into recognised value that creates influence and income growth.',
  },
  {
    icon: FiZap,
    title: 'Intentional Growth',
    description:
      'Move from reactive hustle to intentional growth by building systems that support thriving.',
  },
]

export const LEARN_ITEMS: LearnItem[] = [
  {
    title: 'Hard Work vs Positioning',
    description:
      'Understand why hard work without positioning leads to exhaustion instead of expansion, and how to design leverage into your professional life.',
  },
  {
    title: 'Invisible Growth Forces',
    description:
      'Learn how to identify the invisible forces shaping your growth — including environment, proximity, value perception, and strategic alignment.',
  },
  {
    title: 'Value Conversion',
    description:
      'Discover how to convert your skills, experience, and potential into recognised value that creates influence, income growth, and advancement.',
  },
  {
    title: 'Reactive to Intentional',
    description:
      'Learn how to move from reactive hustle to intentional growth by building systems that support thriving rather than survival.',
  },
  {
    title: 'Strategic Blueprint',
    description:
      'Leave with a clearer blueprint for your next strategic move — whether career progression, business expansion, or leadership elevation.',
  },
  {
    title: 'Structured Networking',
    description:
      'Engage with like-minded professionals in meaningful, structured networking designed to create lasting strategic connections.',
  },
]

export const BONUS_ITEMS: BonusItem[] = [
  { title: '20% Discount on Vision Clarity Call with Coach Ayoola', highlight: true },
  { title: 'Free Access to Prime Counsel E-Book: From Raw Value to Market Value' },
  { title: 'Certificate of Participation' },
  { title: 'Access to Prime Counsel Newsletter & Growth Community' },
]

export const AUDIENCE_ITEMS: AudienceItem[] = [
  { text: 'Early to mid-career professionals' },
  { text: 'Emerging leaders' },
  { text: 'Entrepreneurs and founders' },
  { text: 'Students & Graduates seeking strategic clarity' },
  { text: 'Individuals who feel stuck despite consistent effort' },
]
export const NOTAUDIENCE_ITEMS: NotAudienceItem[] = [
  {
    text: "You're looking for a magic pill or a get-rich-quick scheme (this is real work, just done smarter)",
  },
  { text: "You're not willing to actually put yourself out there and build a personal brand" },
  { text: "You just want to 'take notes' without taking action" },
  { text: "You're not ready to bet on yourself yet" },
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is this a motivational seminar?',
    answer:
      'No. It is a structured strategic masterclass focused on positioning, leverage, and sustainable growth.',
  },
  {
    question: 'Will there be networking opportunities?',
    answer:
      'Yes. There will be structured networking and meaningful engagement throughout the day.',
  },
  {
    question: 'Do I need to be a business owner to attend?',
    answer: 'No. The principles apply to professionals, entrepreneurs, and emerging leaders alike.',
  },
  {
    question: 'Will materials be provided?',
    answer:
      'Yes. You will receive a certificate and access to the E-book: From Raw Value to Market Value.',
  },
  {
    question: 'Are tickets refundable?',
    answer:
      'Tickets are non-refundable. However, you will receive the replay as the event will be livestreamed.',
  },
]

export const TESTIMONIALS: TestimonialItem[] = [
  { quote: 'SPM gave me clarity I had been lacking for years.', name: 'Great' },
  { quote: 'I left with structure, not just motivation.', name: 'Precious' },
  { quote: 'This was strategy, not inspiration.', name: 'Samuel' },
]

export const EVENT_DETAILS = {
  date: 'Saturday, 25th April, 2026',
  time: '10:00am – 4:00pm',
  venue: 'Hampton by Hilton London Luton Airport',
  address: '42–50 Kimpton Road, Luton, LU2 0NB',
}

export const CONTACT_INFO = {
  email: 'info@primecounsel.co.uk',
  phone: '+44 777 448 3791',
  instagram: 'https://instagram.com/primecounsel_',
  youtube: 'https://youtube.com/@primecounsel',
  tiktok: 'https://www.tiktok.com/@primecounsel_',
}

export const BANK_DETAILS = {
  bankName: 'Starling Bank',
  accountName: 'Prime Counsel Limited',
  accountNumber: '15827477',
  sortCode: '60-83-71',
}

export const REGISTER_URL = 'https://selfany.com/YTWGNEEXVC'

import {
  Mic,
  Compass,
  ClipboardList,
  Users,
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Globe,
} from 'lucide-react'

import aleto from '@/assets/images/brands/aleto.png'
import btGroup from '@/assets/images/brands/bt-group.png'
import p2beme from '@/assets/images/brands/P2beme.png'
import ukYouth from '@/assets/images/brands/uk-youth.png'
import wcb from '@/assets/images/brands/WC-B.png'

//navLinks
export const navLinks: {
  label: string
  path: string
  subItems?: { label: string; path: string }[]
}[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  {
    label: 'Events',
    path: '/events',
    subItems: [
      { label: 'SPM 1', path: '/events/spm-1' },
      { label: 'SPM 2', path: '/events/spm-2' },
      { label: 'SPM 3', path: '/events/spm-3' },
    ],
  },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

// Home Page
export const identityCards = [
  { icon: Briefcase, label: 'Leadership Institute' },
  { icon: GraduationCap, label: 'Development Academy' },
  { icon: Users, label: 'Mentorship Organisation' },
  { icon: Globe, label: 'Global Movement' },
]

export const pillars = [
  {
    title: 'Leadership Intelligence',
    desc: 'Developing strategic thinking and decision-making frameworks for complex environments.',
  },
  {
    title: 'Identity & Mindset Development',
    desc: 'Building leaders from the inside out through identity-first transformation.',
  },
  {
    title: 'Structured Mentorship',
    desc: 'Institutional mentorship models that produce consistent, measurable growth.',
  },
  {
    title: 'Faith-Informed Ethics',
    desc: 'Embedding ethical conviction into every level of leadership practice.',
  },
  {
    title: 'Global Positioning',
    desc: 'Preparing emerging leaders for visibility and impact on the international stage.',
  },
]

export const convictions = [
  {
    num: '01',
    title: 'Leadership Is Engineered, Not Inherited',
    desc: 'True leadership is developed through intentional structure, not left to chance or charisma.',
  },
  {
    num: '02',
    title: 'Identity Precedes Influence',
    desc: 'Before you can lead others, you must know who you are and why you exist.',
  },
  {
    num: '03',
    title: 'Ethics Are Non-Negotiable',
    desc: 'Sustainable leadership is built on moral clarity and principled decision-making.',
  },
]

export const HomeServices = [
  {
    icon: Mic,
    title: 'Talks & Keynotes',
    desc: 'High-impact keynotes for corporate, academic and leadership events',
  },
  {
    icon: Compass,
    title: 'Coaching & Mentorship',
    desc: 'Structured 1:1 and group coaching for emerging and senior leaders',
  },
  {
    icon: ClipboardList,
    title: 'Workshops & Training',
    desc: 'Intensive leadership training programs and strategic workshops',
  },
  {
    icon: Building2,
    title: 'Organisational Advisory',
    desc: 'Strategic advisory for organisations developing leadership culture',
  },
]

export const statistics = [
  {
    num: '1000+',
    label: 'Individuals Mentored and Coached',
  },
  {
    num: '50+',
    label: 'Workshops, Webinars, and Keynote talks delivered',
  },
  {
    num: '10+',
    label: 'Client Organisations Served',
  },
  {
    num: '20',
    label: 'Global Reach: UK, Nigeria, and beyond',
  },
]

export const testimonials = [
  {
    name: 'Samuel',
    location: 'United Kingdom',
    programme: 'Vision Clarity Call',
    text: '“My Vision Clarity Call with Coach Ayoola through Prime Counsel was far more than a coaching session. From the moment I completed the onboarding form, it was clear that the process was intentional and well structured. By the time the session began, Coach Ayoola already had a deep understanding of my challenges and aspirations. What followed was a powerful conversation that helped me bring clarity to areas of my life and career that had felt scattered for years. I left with a renewed sense of direction and a clear framework for the next phase of my journey.”',
  },
  {
    name: 'Mercy',
    location: 'USA',
    programme: 'Vision Clarity Call',
    text: '“The Vision Clarity Call was one of the most insightful leadership conversations I have had. The Prime Counsel onboarding process encouraged deep reflection even before the session began, which made the discussion with Coach Ayoola incredibly focused and productive. What impressed me most was his ability to translate complex ideas about purpose, growth, and positioning into practical steps I could immediately apply. It felt less like a consultation and more like a strategic reset.”',
  },
  {
    name: 'Anthony',
    location: 'United Kingdom',
    programme: 'One-to-One Mentorship',
    text: '“My 1-to-1 mentorship experience with Coach Ayoola through Prime Counsel was transformational. The structure of the programme and the depth of the conversations made the journey both intentional and impactful. Coach Ayoola has a unique ability to challenge your thinking while guiding you with wisdom and clarity. Over the course of the mentorship, I developed stronger discipline, clearer priorities, and a more strategic approach to my personal and professional growth.”',
    featured: true,
  },
  {
    name: 'Collins',
    location: 'Nigeria',
    programme: 'Prime Emerging Leaders Cohort',
    text: '“The Prime Emerging Leaders Cohort was one of the most enriching leadership development experiences I have been part of. From the onboarding stage to the final session, the programme was thoughtfully designed to help participants reflect deeply and grow intentionally. Each cohort session combined strategic insight with practical application, and the learning environment created by Prime Counsel encouraged open conversation, accountability, and genuine transformation. I finished the programme with greater clarity about my purpose and the discipline required to pursue it.”',
  },
  {
    name: 'Anne Macaulay',
    location: 'SPM 1.0 Participant',
    programme: 'Strategic Positioning Masterclass (SPM 1.0)',
    text: '“Attending the Strategic Positioning Masterclass (SPM 1.0) hosted by Prime Counsel in December 2025, was a defining moment in my professional journey. The level of insight shared during the session reshaped how I think about positioning, value, and long-term career strategy. Beyond the teaching itself, the audience experience and the quality of individuals in the room created an environment that encouraged deeper thinking and meaningful connections. The leverage I gained from the ideas and the network has genuinely expanded my horizon and shifted the trajectory of my career.”',
  },
]


export const clientsLogo = [
    {
        id: 1,
        logo: aleto,
    },
    {
        id: 2,
        logo: btGroup,
    },
    {
        id: 3,
        logo: p2beme,
    },
    {
        id: 4,
        logo: ukYouth,
    },
    {
        id: 5,
        logo: wcb,
    },
];



//About Page
export const AboutConvictions = [
  {
    title: 'Leadership is a discipline, not a personality trait',
    body: 'We believe leadership can be taught, structured, and developed. It is not reserved for the charismatic — it belongs to the disciplined.',
  },
  {
    title: 'Identity precedes strategy',
    body: 'Before you can lead others, you must know who you are. Identity is the foundation upon which all strategic decisions rest.',
  },
  {
    title: 'Ethics is non-negotiable at every altitude',
    body: 'Whether leading a team of five or a nation of millions, ethical conviction must remain constant and uncompromised.',
  },
  {
    title: 'Faith and intellect are not in conflict',
    body: 'We hold that spiritual conviction and intellectual rigour complement one another, producing leaders of depth and substance.',
  },
  {
    title: 'Development must be structured, not accidental',
    body: "Growth that lasts requires architecture. We reject the notion that leadership simply 'happens' — it must be engineered.",
  },
  {
    title: 'Mentorship is an institutional responsibility',
    body: 'Organisations that fail to mentor are organisations that fail to sustain. We embed mentorship into the DNA of institutions.',
  },
  {
    title: 'Global thinking is a leadership requirement',
    body: 'In a connected world, leaders must think beyond borders. We prepare leaders for international visibility and impact.',
  },
]

export const missions = [
  'To develop leaders who combine strategic depth with ethical clarity.',
  'To institutionalize mentorship within organisations.',
  'To equip emerging leaders for global impact and visibility.',
  'To challenge conventional thinking about leadership and influence.',
  'To build a global community of leaders committed to excellence and integrity.',
]

//Services
export const services = [
  {
    icon: Mic,
    tag: "High-Impact Strategic Speaking",
    title: 'Talks & Keynotes',
    desc: 'Insight-rich keynote presentations for conferences, universities, corporate institutions, and leadership summits. Not motivational performances strategic interventions.',
    cta: 'Enquire on speaking Engagement',
    link: '/contact',
    tags: ['In-person', 'Virtual', 'Hybrid'],
  },
  {
    icon: Users,
    tag: "Structured Personal Leadership Development",
    title: 'Coaching & Mentorship',
    desc: 'From Vision Clarity Intensives to 10-Week Strategic Mentorship programmes. Identity work, strategic positioning, and execution planning for sustainable growth.',
    cta: 'Enquire on speaking Engagement',
    link: '/services',
    tags: ['One-to-One Coaching', 'Vision Clarity Intensive', '10-Week Programme'],
  },
  {
    icon: BookOpen,
    tag: "Applied Leadership Development",
    title: 'Workshops & Training',
    desc: 'Practical, outcomes-driven workshops for organisations, campuses, and leadership teams. Structured around frameworks, measurable objectives, and actionable strategies.',
    cta: 'Book a Workshop',
    link: '/contact',
    tags: ['Half-day', 'Full-day', 'Multi-session Cohorts'],
  },
  {
    icon: Building2,
    tag: "Leadership Architecture & Transformation",
    title: 'Organisational Advisory',
    desc: 'We partner with institutions to design sustainable leadership development pipelines and transformation frameworks for long-term cultural and strategic impact.',
    cta: 'Talk to our Advisory team',
    link: '/contact',
    tags: ['Custom L&D Programmes', 'Pipeline Development', 'Culture Design'],
  },
]

//Services Page
export const serviceBlocks = [
  {
    title: 'Talks & Keynotes',
    desc: 'High-impact keynotes delivered to corporate, academic, faith-based, and youth leadership environments.',
    outcomes: 'Inspired, challenged, and repositioned audiences',
    idealFor: 'Conferences, corporate events, universities, youth summits',
    cta: 'Enquire About a Talk →',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    title: 'Coaching & Mentorship',
    desc: 'Structured 1:1 and cohort coaching programs for emerging to senior leaders.',
    outcomes: 'Clarity of identity, sharpened strategy, sustained development',
    idealFor: 'Professionals aged 18–45, executives, organisational leaders',
    cta: 'Begin Coaching →',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
  },
  {
    title: 'Workshops & Training',
    desc: 'Intensive half-day and full-day leadership development workshops.',
    outcomes: 'Actionable frameworks, team alignment, leadership culture shift',
    idealFor: 'Corporate teams, student bodies, faith organisations',
    cta: 'Book a Workshop →',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
  },
  {
    title: 'Organisational Advisory',
    desc: 'Strategic advisory for organisations building and sustaining leadership pipelines.',
    outcomes: 'Cultural transformation, leadership infrastructure, structured development programs',
    idealFor: 'Corporates, NGOs, educational institutions, faith organisations',
    cta: 'Request Advisory →',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80',
  },
]

//Shop Page
export const products = [
  {
    id: 'architecture-of-leadership',
    title: 'The Architecture of Leadership',
    category: 'Book',
    desc: 'A structured framework for building sustainable leadership capacity',
    price: '£19.99',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    longDesc:
      'This foundational text lays out the Prime Counsel model for developing leadership capacity that lasts. Drawing from over a decade of institutional experience, it provides frameworks, case studies, and actionable strategies for leaders at every level.',
    gains: [
      'A complete leadership development framework',
      'Identity-first leadership methodology',
      'Strategic positioning tools',
      'Ethical decision-making models',
    ],
    whoFor:
      'Emerging and established leaders looking for a structured, rigorous approach to personal and professional leadership growth.',
  },
  {
    id: 'strategic-identity-blueprint',
    title: 'Strategic Identity Blueprint',
    category: 'Digital Resource',
    desc: 'A step-by-step framework for leaders to define and own their strategic identity',
    price: '£9.99',
    img: 'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=500&q=80',
    longDesc:
      'This digital resource walks leaders through the process of defining their strategic identity. It provides exercises, frameworks, and reflection tools designed to produce clarity and conviction.',
    gains: [
      'Identity mapping exercises',
      'Strategic positioning templates',
      'Personal brand architecture',
      'Values alignment framework',
    ],
    whoFor:
      'Leaders and professionals seeking to clarify their personal brand and leadership identity.',
  },
  {
    id: 'leadership-development-workbook',
    title: 'The Leadership Development Workbook',
    category: 'Workbook',
    desc: '90-day structured workbook for personal and professional leadership growth',
    price: '£14.99',
    img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    longDesc:
      'A 90-day guided workbook designed to build consistent leadership habits. Each week focuses on a different dimension of the Prime Counsel leadership architecture.',
    gains: [
      'Daily leadership exercises',
      'Weekly reflection prompts',
      'Monthly milestone assessments',
      'Accountability frameworks',
    ],
    whoFor:
      'Anyone committed to a disciplined, structured approach to their leadership development journey.',
  },
  {
    id: 'executive-positioning-toolkit',
    title: 'Executive Positioning Toolkit',
    category: 'Digital Resource',
    desc: 'Templates, frameworks, and positioning tools for senior-level development',
    price: '£24.99',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80',
    longDesc:
      'A comprehensive toolkit designed for senior leaders and executives. Includes templates for strategic planning, positioning frameworks, and development tracking tools.',
    gains: [
      'Executive positioning canvas',
      'Strategic planning templates',
      'Stakeholder mapping tools',
      'Development tracking dashboards',
    ],
    whoFor:
      'Senior leaders, executives, and organisational heads looking to refine their strategic positioning and leadership infrastructure.',
  },
  {
    id: 'faith-ethics-leadership',
    title: 'Faith, Ethics & Leadership',
    category: 'Book',
    desc: 'Exploring the intersection of ethical conviction and leadership excellence',
    price: '£17.99',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
    longDesc:
      'This book examines how faith-informed ethics can strengthen rather than limit leadership effectiveness. It challenges the secular-sacred divide and presents a compelling case for conviction-led leadership.',
    gains: [
      'Ethical leadership frameworks',
      'Faith-intellect integration models',
      'Case studies from global leaders',
      'Conviction-based decision tools',
    ],
    whoFor:
      'Leaders who want to integrate their faith and ethical convictions into their professional leadership practice.',
  },
  {
    id: 'global-positioning-framework',
    title: 'Global Positioning Framework',
    category: 'Framework',
    desc: 'A structured guide to positioning emerging leaders on the international stage',
    price: '£12.99',
    img: 'https://images.unsplash.com/photo-1568027762272-e4da8b386fe9?w=500&q=80',
    longDesc:
      'This framework PDF provides step-by-step guidance for leaders seeking international visibility and impact. It covers personal branding, cross-cultural competence, and strategic networking.',
    gains: [
      'Global visibility roadmap',
      'Cross-cultural leadership tools',
      'International networking strategies',
      'Personal brand architecture for global audiences',
    ],
    whoFor:
      'Emerging leaders with global ambitions who want a structured pathway to international positioning.',
  },
]

export const CONTACT_INFO = {
  email: 'info@primecounsel.co.uk',
  phone: '+44 777 448 3791',
  instagram: 'https://instagram.com/primecounsel_',
  youtube: 'https://youtube.com/@primecounsel',
  tiktok: 'https://www.tiktok.com/@primecounsel_',
}

export const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

import { supabase } from '@/lib/supabase'

const STATIC_CERTIFICATES = [
  {
    id: 'cert-tesla-001',
    title: 'Tesla Energy Storage & Grid Integration Specialist (TES-GIS) — Tesla Global Learning & Innovation Academy',
    image_url: '/assets/cert_tesla.png',
    created_at: '2026-06-02',
  },
  {
    id: 'cert-huawei-001',
    title: 'Huawei Certified ICT Professional (HCIP) — Huawei Global Learning Center',
    image_url: '/assets/cert_huawei.png',
    created_at: '2025-05-07',
  },
  {
    id: 'cert-ati-001',
    title: 'Software Engineering & Programming — American Technology Institute',
    image_url: '/assets/cert_ati.png',
    created_at: '2025-11-08',
  },
]

const STATIC_PROJECTS = [
  {
    id: 'proj-eturkey-001',
    title: 'eTurkey — Real Estate Platform',
    description:
      'A modern real estate web platform for buying and renting properties in Antalya, Turkey. Features 3D building visualization, property search, and developer-direct listings.',
    image_url: '/assets/eturkey.png',
    live_url: 'https://ruslankyzyljol-ai.github.io/eturkey1/',
    created_at: '2026-06-01',
  },
]

const STATIC_TECH_STACKS = [
  { id: 'ts-001', name: 'TypeScript',   logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',  created_at: '2024-01-01' },
  { id: 'ts-002', name: 'React.js',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',              created_at: '2024-01-02' },
  { id: 'ts-003', name: 'Next.js',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',            created_at: '2024-01-03' },
  { id: 'ts-004', name: 'Node.js',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',            created_at: '2024-01-04' },
  { id: 'ts-005', name: 'Python',       logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',            created_at: '2024-01-05' },
  { id: 'ts-006', name: 'PostgreSQL',   logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',    created_at: '2024-01-06' },
  { id: 'ts-007', name: 'Tailwind CSS', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',                created_at: '2024-01-07' },
  { id: 'ts-008', name: 'Git',          logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                  created_at: '2024-01-08' },
  { id: 'ts-009', name: 'Docker',       logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',            created_at: '2024-01-09' },
  { id: 'ts-010', name: 'Supabase',     logo_url: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg',                            created_at: '2024-01-10' },
]

// Projects & Certificates: STATIC ONLY — ignore Supabase to prevent duplicates
export const fetchProjects = async () => {
  return STATIC_PROJECTS
}

export const fetchCertificates = async () => {
  return STATIC_CERTIFICATES
}

// Tech stacks: merge static + Supabase (no duplicates)
export const fetchTechStacks = async () => {
  try {
    const { data } = await supabase
      .from('tech_stack')
      .select('*')
      .order('created_at', { ascending: true })
    const supabaseData = data || []
    const supabaseIds = new Set(supabaseData.map((i: any) => i.id))
    const filtered = STATIC_TECH_STACKS.filter((i) => !supabaseIds.has(i.id))
    return [...filtered, ...supabaseData]
  } catch {
    return STATIC_TECH_STACKS
  }
}

import { Deal, DealStage, Priority, Contact } from './types';

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    companyName: 'Acme AI',
    oneLiner: 'Generative AI for Enterprise Legal Compliance',
    logoUrl: 'https://picsum.photos/40/40?random=1',
    stage: DealStage.SCREENING,
    priority: Priority.HOT,
    leadInvestor: 'Jane Doe',
    dealSource: 'Inbound',
    sector: ['B2B SaaS', 'AI-Enabled'],
    investmentSize: '£2M - £3M',
    valuation: '£15M Pre',
    lastActivity: '2023-10-24T10:00:00Z',
    foundedYear: 2022,
    website: 'acme.ai',
    metrics: { revenue: '£1.2M ARR', growth: '140%', burn: '£80k/mo' },
    thesis: 'Strong team from DeepMind, solving a massive regulatory pain point.'
  },
  {
    id: '2',
    companyName: 'GreenFlow',
    oneLiner: 'Carbon accounting platform for logistics',
    logoUrl: 'https://picsum.photos/40/40?random=2',
    stage: DealStage.DEEP_DIVE,
    priority: Priority.TRACKING,
    leadInvestor: 'John Smith',
    dealSource: 'Warm Intro',
    sector: ['Climate', 'Logistics'],
    investmentSize: '£5M',
    valuation: '£25M Pre',
    lastActivity: '2023-10-22T14:30:00Z',
    foundedYear: 2021,
    website: 'greenflow.io',
    metrics: { revenue: '£3.5M ARR', growth: '80%', burn: '£120k/mo' },
    thesis: 'Regulatory tailwinds in EU driving adoption. Stickiness is high.'
  },
  {
    id: '3',
    companyName: 'MediMatch',
    oneLiner: 'Marketplace for temporary medical staffing',
    logoUrl: 'https://picsum.photos/40/40?random=3',
    stage: DealStage.IC_REVIEW,
    priority: Priority.HOT,
    leadInvestor: 'Sarah Connor',
    dealSource: 'Intermediary',
    sector: ['HealthTech', 'Marketplace'],
    investmentSize: '£8M',
    valuation: '£40M Pre',
    lastActivity: '2023-10-25T09:00:00Z',
    foundedYear: 2020,
    website: 'medimatch.com',
    metrics: { revenue: '£8M GMV', growth: '200%', burn: 'Profitable' },
    thesis: 'Network effects kicking in. Unit economics are best in class.'
  },
  {
    id: '4',
    companyName: 'Nebula Infra',
    oneLiner: 'Serverless GPU orchestration',
    logoUrl: 'https://picsum.photos/40/40?random=4',
    stage: DealStage.SOURCING,
    priority: Priority.COLD,
    leadInvestor: 'Mike Ross',
    dealSource: 'Outreach',
    sector: ['Infrastructure', 'DevTools'],
    investmentSize: '£1M',
    valuation: '£8M Pre',
    lastActivity: '2023-10-20T11:15:00Z',
    foundedYear: 2023,
    website: 'nebula.dev',
    metrics: { revenue: '£100k ARR', growth: '20%', burn: '£50k/mo' },
    thesis: 'Early stage but tech is proprietary. Watching for developer adoption.'
  },
  {
    id: '5',
    companyName: 'FinPulse',
    oneLiner: 'Embedded lending for gig workers',
    logoUrl: 'https://picsum.photos/40/40?random=5',
    stage: DealStage.TERM_SHEET,
    priority: Priority.HOT,
    leadInvestor: 'Jane Doe',
    dealSource: 'Portfolio Ref',
    sector: ['FinTech'],
    investmentSize: '£4M',
    valuation: '£22M Pre',
    lastActivity: '2023-10-26T16:45:00Z',
    foundedYear: 2021,
    website: 'finpulse.co',
    metrics: { revenue: '£2.1M ARR', growth: '110%', burn: '£150k/mo' },
    thesis: 'Category leader in UK. Expanding to EU next quarter.'
  }
];

export const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Alice Walker', role: 'Partner', company: 'Sequoia', email: 'alice@sequoia.com', type: 'VC', lastContact: '2 days ago' },
  { id: '2', name: 'Bob Stone', role: 'Founder', company: 'Acme AI', email: 'bob@acme.ai', type: 'Founder', lastContact: 'Yesterday' },
  { id: '3', name: 'Charlie Dent', role: 'Banker', company: 'Goldman Sachs', email: 'c.dent@gs.com', type: 'Intermediary', lastContact: '1 week ago' },
];

export const PIPELINE_COLUMNS = [
  DealStage.SOURCING,
  DealStage.SCREENING,
  DealStage.DEEP_DIVE,
  DealStage.IC_REVIEW,
  DealStage.TERM_SHEET,
  DealStage.CLOSED_WON
];

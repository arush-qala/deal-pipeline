export enum DealStage {
  SOURCING = 'Sourcing',
  SCREENING = 'Screening',
  FIRST_MEETING = 'First Meeting',
  DEEP_DIVE = 'Deep Dive',
  IC_REVIEW = 'IC Review',
  TERM_SHEET = 'Term Sheet',
  DUE_DILIGENCE = 'Due Diligence',
  CLOSED_WON = 'Closed Won',
  PASSED = 'Passed'
}

export enum Priority {
  HOT = 'Hot',
  TRACKING = 'Tracking',
  COLD = 'Cold'
}

export interface Deal {
  id: string;
  companyName: string;
  oneLiner: string;
  logoUrl: string;
  stage: DealStage;
  priority: Priority;
  leadInvestor: string;
  dealSource: string;
  sector: string[];
  investmentSize: string;
  valuation: string;
  lastActivity: string;
  foundedYear: number;
  website: string;
  metrics: {
    revenue: string;
    growth: string;
    burn: string;
  };
  thesis: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  type: 'Founder' | 'Intermediary' | 'VC' | 'Advisor';
  lastContact: string;
}

export interface ChartData {
  name: string;
  value: number;
}

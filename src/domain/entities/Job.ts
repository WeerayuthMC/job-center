export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  description: string;
  requirements: string[];
  category: JobCategory;
  type: JobType;
  level: JobLevel;
  postedDate: Date;
  applicationDeadline?: Date;
  sourceUrl: string;
  source: string;
  isActive: boolean;
}

export enum JobCategory {
  SOFTWARE_DEVELOPMENT = 'software-development',
  WEB_DEVELOPMENT = 'web-development',
  MOBILE_DEVELOPMENT = 'mobile-development',
  DATA_SCIENCE = 'data-science',
  DEVOPS = 'devops',
  CYBERSECURITY = 'cybersecurity',
  PRODUCT_MANAGEMENT = 'product-management',
  UI_UX_DESIGN = 'ui-ux-design',
  QUALITY_ASSURANCE = 'quality-assurance',
  SYSTEM_ADMINISTRATION = 'system-administration'
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship'
}

export enum JobLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  LEAD = 'lead',
  MANAGER = 'manager'
}
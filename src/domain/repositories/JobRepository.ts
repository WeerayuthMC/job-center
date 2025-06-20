import { Job, JobCategory, JobLevel, JobType } from '../entities/Job';

export interface JobRepository {
  findAll(): Promise<Job[]>;
  findByCategory(category: JobCategory): Promise<Job[]>;
  findByLevel(level: JobLevel): Promise<Job[]>;
  findByType(type: JobType): Promise<Job[]>;
  findByLocation(location: string): Promise<Job[]>;
  findById(id: string): Promise<Job | null>;
  save(job: Job): Promise<Job>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<Job[]>;
}
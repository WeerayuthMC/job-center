import { Job, JobCategory, JobLevel, JobType } from '../entities/Job';
import { JobRepository } from '../repositories/JobRepository';

export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async getAllJobs(): Promise<Job[]> {
    return await this.jobRepository.findAll();
  }

  async getJobsByCategory(category: JobCategory): Promise<Job[]> {
    return await this.jobRepository.findByCategory(category);
  }

  async getJobsByLevel(level: JobLevel): Promise<Job[]> {
    return await this.jobRepository.findByLevel(level);
  }

  async getJobsByType(type: JobType): Promise<Job[]> {
    return await this.jobRepository.findByType(type);
  }

  async getJobsByLocation(location: string): Promise<Job[]> {
    return await this.jobRepository.findByLocation(location);
  }

  async getJobById(id: string): Promise<Job | null> {
    return await this.jobRepository.findById(id);
  }

  async createJob(job: Omit<Job, 'id'>): Promise<Job> {
    const newJob: Job = {
      ...job,
      id: this.generateId(),
    };
    return await this.jobRepository.save(newJob);
  }

  async searchJobs(query: string): Promise<Job[]> {
    return await this.jobRepository.search(query);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
import { Job, JobCategory, JobLevel, JobType } from '../../domain/entities/Job';
import { JobRepository } from '../../domain/repositories/JobRepository';

export class InMemoryJobRepository implements JobRepository {
  private jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'Tech Company Thailand',
      location: 'กรุงเทพมหานคร',
      salary: '50,000 - 80,000 บาท',
      description: 'เรากำลังมองหา Senior Frontend Developer ที่มีประสบการณ์ในการพัฒนา Web Application ด้วย React และ TypeScript',
      requirements: ['React', 'TypeScript', 'HTML/CSS', 'JavaScript ES6+', 'Git'],
      category: JobCategory.WEB_DEVELOPMENT,
      type: JobType.FULL_TIME,
      level: JobLevel.SENIOR,
      postedDate: new Date('2024-01-15'),
      applicationDeadline: new Date('2024-02-15'),
      sourceUrl: 'https://example.com/job/1',
      source: 'JobsDB Thailand',
      isActive: true
    },
    {
      id: '2',
      title: 'Junior Software Engineer',
      company: 'Digital Startup',
      location: 'เชียงใหม่',
      salary: '25,000 - 35,000 บาท',
      description: 'ร่วมงานกับทีมพัฒนาซอฟต์แวร์ในการสร้าง Application ที่น่าสนใจ',
      requirements: ['JavaScript', 'Node.js', 'MySQL', 'API Development'],
      category: JobCategory.SOFTWARE_DEVELOPMENT,
      type: JobType.FULL_TIME,
      level: JobLevel.JUNIOR,
      postedDate: new Date('2024-01-12'),
      sourceUrl: 'https://example.com/job/2',
      source: 'LinkedIn Thailand',
      isActive: true
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'Cloud Solutions Co.',
      location: 'กรุงเทพมหานคร',
      salary: '60,000 - 90,000 บาท',
      description: 'จัดการระบบ Infrastructure และ CI/CD Pipeline สำหรับทีมพัฒนา',
      requirements: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Jenkins'],
      category: JobCategory.DEVOPS,
      type: JobType.FULL_TIME,
      level: JobLevel.MIDDLE,
      postedDate: new Date('2024-01-10'),
      sourceUrl: 'https://example.com/job/3',
      source: 'Indeed Thailand',
      isActive: true
    }
  ];

  async findAll(): Promise<Job[]> {
    return this.jobs.filter(job => job.isActive);
  }

  async findByCategory(category: JobCategory): Promise<Job[]> {
    return this.jobs.filter(job => job.category === category && job.isActive);
  }

  async findByLevel(level: JobLevel): Promise<Job[]> {
    return this.jobs.filter(job => job.level === level && job.isActive);
  }

  async findByType(type: JobType): Promise<Job[]> {
    return this.jobs.filter(job => job.type === type && job.isActive);
  }

  async findByLocation(location: string): Promise<Job[]> {
    return this.jobs.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase()) && job.isActive
    );
  }

  async findById(id: string): Promise<Job | null> {
    const job = this.jobs.find(job => job.id === id && job.isActive);
    return job || null;
  }

  async save(job: Job): Promise<Job> {
    const existingIndex = this.jobs.findIndex(j => j.id === job.id);
    if (existingIndex >= 0) {
      this.jobs[existingIndex] = job;
    } else {
      this.jobs.push(job);
    }
    return job;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.jobs.findIndex(job => job.id === id);
    if (index >= 0) {
      this.jobs[index].isActive = false;
      return true;
    }
    return false;
  }

  async search(query: string): Promise<Job[]> {
    const searchTerm = query.toLowerCase();
    return this.jobs.filter(job => 
      job.isActive && (
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm))
      )
    );
  }
}
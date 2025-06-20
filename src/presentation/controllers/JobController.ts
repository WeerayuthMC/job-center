import { Request, Response } from 'express';
import { JobService } from '../../domain/usecases/JobService';
import { JobCategory, JobLevel, JobType } from '../../domain/entities/Job';

export class JobController {
  constructor(private jobService: JobService) {}

  async getAllJobs(req: Request, res: Response): Promise<void> {
    try {
      const jobs = await this.jobService.getAllJobs();
      res.json({
        success: true,
        data: jobs,
        total: jobs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch jobs',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getJobsByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;
      if (!Object.values(JobCategory).includes(category as JobCategory)) {
        res.status(400).json({
          success: false,
          message: 'Invalid category'
        });
        return;
      }
      
      const jobs = await this.jobService.getJobsByCategory(category as JobCategory);
      res.json({
        success: true,
        data: jobs,
        total: jobs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch jobs by category',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getJobsByLevel(req: Request, res: Response): Promise<void> {
    try {
      const { level } = req.params;
      if (!Object.values(JobLevel).includes(level as JobLevel)) {
        res.status(400).json({
          success: false,
          message: 'Invalid level'
        });
        return;
      }
      
      const jobs = await this.jobService.getJobsByLevel(level as JobLevel);
      res.json({
        success: true,
        data: jobs,
        total: jobs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch jobs by level',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getJobById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const job = await this.jobService.getJobById(id);
      
      if (!job) {
        res.status(404).json({
          success: false,
          message: 'Job not found'
        });
        return;
      }
      
      res.json({
        success: true,
        data: job
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch job',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async searchJobs(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
        return;
      }
      
      const jobs = await this.jobService.searchJobs(q);
      res.json({
        success: true,
        data: jobs,
        total: jobs.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search jobs',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
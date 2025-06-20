import express from 'express';
import cors from 'cors';
import path from 'path';
import { JobController } from './presentation/controllers/JobController';
import { JobService } from './domain/usecases/JobService';
import { InMemoryJobRepository } from './infrastructure/database/InMemoryJobRepository';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Dependency injection
const jobRepository = new InMemoryJobRepository();
const jobService = new JobService(jobRepository);
const jobController = new JobController(jobService);

// API Routes
app.get('/api/jobs', (req, res) => jobController.getAllJobs(req, res));
app.get('/api/jobs/category/:category', (req, res) => jobController.getJobsByCategory(req, res));
app.get('/api/jobs/level/:level', (req, res) => jobController.getJobsByLevel(req, res));
app.get('/api/jobs/search', (req, res) => jobController.searchJobs(req, res));
app.get('/api/jobs/:id', (req, res) => jobController.getJobById(req, res));

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Job Center API server is running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/jobs`);
});

export default app;
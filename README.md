# Job Center Thailand

🏢 เว็บแอปพลิเคชันสำหรับรวบรวมข้อมูลการเปิดรับสมัครงานจากเว็บต่างๆในประเทศไทย โดยเน้นงานด้าน IT เป็นหลัก

## 🚀 Features

- **TypeScript** - Type-safe development
- **TailWind CSS** - Modern responsive design
- **Clean Architecture** - Organized code structure
- **REST API** - RESTful web services
- **Job Categorization** - Organized by profession and job function
- **Search & Filter** - Advanced job search functionality
- **Thai Language Support** - Full Thai language interface

## 🏗️ Architecture

```
src/
├── domain/           # Business logic layer
│   ├── entities/     # Domain models
│   ├── repositories/ # Data access interfaces
│   └── usecases/     # Business use cases
├── infrastructure/   # External concerns
│   ├── database/     # Data persistence
│   ├── external/     # External services
│   └── web/         # Web framework
├── application/      # Application services
│   ├── services/     # Application services
│   └── dto/         # Data transfer objects
├── presentation/     # Presentation layer
│   ├── controllers/  # HTTP controllers
│   └── middleware/   # HTTP middleware
└── shared/          # Shared utilities
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: HTML5, JavaScript ES6+, TailWind CSS
- **Architecture**: Clean Architecture
- **Data**: In-memory storage (ready for database integration)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd job-center

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## 🔧 Development

```bash
# Run in development mode with auto-reload
npm run dev
```

## 🌐 API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `GET /api/jobs/category/:category` - Get jobs by category
- `GET /api/jobs/level/:level` - Get jobs by level
- `GET /api/jobs/search?q=query` - Search jobs

### Categories
- `web-development` - Web Development
- `software-development` - Software Development
- `mobile-development` - Mobile Development
- `data-science` - Data Science
- `devops` - DevOps
- `cybersecurity` - Cybersecurity

### Levels
- `entry` - Entry Level
- `junior` - Junior
- `middle` - Middle
- `senior` - Senior
- `lead` - Lead
- `manager` - Manager

## 🎯 Usage

1. **Start the server**: `npm start`
2. **Access the web app**: Open `http://localhost:3000`
3. **Browse jobs**: View all available IT jobs
4. **Search**: Use the search bar to find specific jobs
5. **Filter**: Use category, level, and type filters
6. **Apply**: Click "สมัครงาน" to visit the original job posting

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Web scraping for job data collection
- [ ] User authentication and saved jobs
- [ ] Email notifications for job alerts
- [ ] Company profiles and reviews
- [ ] Salary insights and analytics
- [ ] Mobile app development

## 📝 License

This project is licensed under the ISC License.
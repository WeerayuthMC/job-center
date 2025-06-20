// Job Center Thailand - Frontend Application
class JobCenterApp {
    constructor() {
        this.jobs = [];
        this.filteredJobs = [];
        this.currentSearch = '';
        this.currentFilters = {
            category: '',
            level: '',
            type: ''
        };
        
        this.init();
    }

    async init() {
        await this.loadJobs();
        this.setupEventListeners();
        this.renderJobs();
        this.updateStatistics();
    }

    async loadJobs() {
        try {
            const response = await fetch('/api/jobs');
            const data = await response.json();
            if (data.success) {
                this.jobs = data.data;
                this.filteredJobs = [...this.jobs];
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
            this.showError('ไม่สามารถโหลดข้อมูลงานได้');
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Filter functionality
        const categoryFilter = document.getElementById('categoryFilter');
        const levelFilter = document.getElementById('levelFilter');
        const typeFilter = document.getElementById('typeFilter');

        categoryFilter.addEventListener('change', () => this.handleFilter());
        levelFilter.addEventListener('change', () => this.handleFilter());
        typeFilter.addEventListener('change', () => this.handleFilter());
    }

    async handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            try {
                const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data.success) {
                    this.filteredJobs = data.data;
                    this.currentSearch = query;
                }
            } catch (error) {
                console.error('Error searching jobs:', error);
                this.showError('ไม่สามารถค้นหางานได้');
            }
        } else {
            this.filteredJobs = [...this.jobs];
            this.currentSearch = '';
        }
        
        this.applyFilters();
        this.renderJobs();
    }

    async handleFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        const levelFilter = document.getElementById('levelFilter');
        const typeFilter = document.getElementById('typeFilter');

        this.currentFilters = {
            category: categoryFilter.value,
            level: levelFilter.value,
            type: typeFilter.value
        };

        // Start with search results or all jobs
        let jobsToFilter = this.currentSearch ? this.filteredJobs : [...this.jobs];

        // Apply category filter
        if (this.currentFilters.category) {
            try {
                const response = await fetch(`/api/jobs/category/${this.currentFilters.category}`);
                const data = await response.json();
                if (data.success) {
                    jobsToFilter = jobsToFilter.filter(job => 
                        data.data.some(filteredJob => filteredJob.id === job.id)
                    );
                }
            } catch (error) {
                console.error('Error filtering by category:', error);
            }
        }

        // Apply level filter
        if (this.currentFilters.level) {
            try {
                const response = await fetch(`/api/jobs/level/${this.currentFilters.level}`);
                const data = await response.json();
                if (data.success) {
                    jobsToFilter = jobsToFilter.filter(job => 
                        data.data.some(filteredJob => filteredJob.id === job.id)
                    );
                }
            } catch (error) {
                console.error('Error filtering by level:', error);
            }
        }

        // Apply type filter (client-side for now)
        if (this.currentFilters.type) {
            jobsToFilter = jobsToFilter.filter(job => job.type === this.currentFilters.type);
        }

        this.filteredJobs = jobsToFilter;
        this.renderJobs();
    }

    applyFilters() {
        // This method applies current filters to the search results
        if (this.currentFilters.category || this.currentFilters.level || this.currentFilters.type) {
            // Re-apply filters after search
            this.handleFilter();
        }
    }

    renderJobs() {
        const jobListings = document.getElementById('jobListings');
        const jobCount = document.getElementById('jobCount');
        
        jobCount.textContent = this.filteredJobs.length;

        if (this.filteredJobs.length === 0) {
            jobListings.innerHTML = `
                <div class="p-8 text-center text-gray-500">
                    <div class="text-4xl mb-4">🔍</div>
                    <p>ไม่พบตำแหน่งงานที่ตรงกับเงื่อนไขการค้นหา</p>
                </div>
            `;
            return;
        }

        jobListings.innerHTML = this.filteredJobs.map(job => this.createJobCard(job)).join('');
    }

    createJobCard(job) {
        const postedDate = new Date(job.postedDate).toLocaleDateString('th-TH');
        const categoryLabel = this.getCategoryLabel(job.category);
        const levelLabel = this.getLevelLabel(job.level);
        const typeLabel = this.getTypeLabel(job.type);

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 mb-2">${job.title}</h4>
                                <p class="text-blue-600 font-medium mb-2">🏢 ${job.company}</p>
                                <p class="text-gray-600 mb-2">📍 ${job.location}</p>
                                ${job.salary ? `<p class="text-green-600 font-medium mb-2">💰 ${job.salary}</p>` : ''}
                            </div>
                        </div>
                        
                        <p class="text-gray-700 mb-4 line-clamp-3">${job.description}</p>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${job.requirements.slice(0, 5).map(req => 
                                `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${req}</span>`
                            ).join('')}
                            ${job.requirements.length > 5 ? `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">+${job.requirements.length - 5} เพิ่มเติม</span>` : ''}
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">${categoryLabel}</span>
                            <span class="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">${levelLabel}</span>  
                            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">${typeLabel}</span>
                        </div>
                        
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <span>📅 โพสต์เมื่อ: ${postedDate}</span>
                            <span>🌐 ${job.source}</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 md:mt-0 md:ml-6">
                        <button 
                            onclick="window.open('${job.sourceUrl}', '_blank')"
                            class="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            สมัครงาน
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryLabel(category) {
        const labels = {
            'web-development': 'พัฒนาเว็บ',
            'software-development': 'พัฒนาซอฟต์แวร์',
            'mobile-development': 'พัฒนาแอปมือถือ',
            'data-science': 'วิทยาการข้อมูล',
            'devops': 'DevOps',
            'cybersecurity': 'ความปลอดภัยไซเบอร์',
            'product-management': 'บริหารผลิตภัณฑ์',
            'ui-ux-design': 'UI/UX Design',
            'quality-assurance': 'ประกันคุณภาพ',
            'system-administration': 'ดูแลระบบ'
        };
        return labels[category] || category;
    }

    getLevelLabel(level) {
        const labels = {
            'entry': 'Entry Level',
            'junior': 'Junior',
            'middle': 'Middle',
            'senior': 'Senior',
            'lead': 'Lead',
            'manager': 'Manager'
        };
        return labels[level] || level;
    }

    getTypeLabel(type) {
        const labels = {
            'full-time': 'เต็มเวลา',
            'part-time': 'พาร์ทไทม์',
            'contract': 'สัญญาจ้าง',
            'freelance': 'ฟรีแลนซ์',
            'internship': 'ฝึกงาน'
        };
        return labels[type] || type;
    }

    updateStatistics() {
        const totalJobs = document.getElementById('totalJobs');
        const newJobs = document.getElementById('newJobs');
        const itJobs = document.getElementById('itJobs');
        const companiesCount = document.getElementById('companiesCount');

        totalJobs.textContent = this.jobs.length;
        
        // Calculate new jobs (posted within last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newJobsCount = this.jobs.filter(job => new Date(job.postedDate) > weekAgo).length;
        newJobs.textContent = newJobsCount;
        
        // All jobs are IT jobs in this system
        itJobs.textContent = this.jobs.length;
        
        // Count unique companies
        const uniqueCompanies = new Set(this.jobs.map(job => job.company));
        companiesCount.textContent = uniqueCompanies.size;
    }

    showError(message) {
        // Simple error display - could be enhanced with a proper toast system
        alert(message);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobCenterApp();
});
# JobPlatform
Albanian Balkan Job Portal
🚀 JobConnect: Multilingual Job Matching Platform
JobConnect is a modern, full-stack recruitment platform designed to bridge the gap between workers and companies across the Balkans. Built with a focus on speed, high-end UI/UX, and security, it supports English, Albanian (Shqip), and Macedonian (Македонски) out of the box.
![License](https://img.shields.io/badge/License-MIT-green.svg) ![.NET version](https://img.shields.io/badge/.NET-8.0-blue.svg) ![React version](https://img.shields.io/badge/React-18-blue.svg) ![UI](https://img.shields.io/badge/UI-TailwindCSS-38B2AC.svg)

✨ Key Features
🌍 Global Localization (i18n)
•  Instant Language Switching: Full UI localization using react-i18next.
•  Bilingual Search: Backend logic optimized for cross-language filtering.
🔐 Secure Identity Management
•  RBAC (Role-Based Access Control): Separate workflows for Candidates (Workers) and Companies (Employers).
•  JWT Security: Stateless authentication with encrypted tokens.
•  Identity Logic: Password hashing and secure role assignment via ASP.NET Core Identity.
🏢 Employer Command Centre
•  Job Management: Create, edit, and track active job listings.
•  Applicant Tracking: Dedicated dashboard for companies to review candidates in real-time.
🧑💻 Seeker Experience
•  Live Search & Filters: Debounced search and categorized filtering for a smooth browsing experience.
•  Professional Job Details: Detailed view panels with sticky stats and clean typography.

🛠️ The Tech Stack
| Layer | Technology | | :--- | :--- | | Frontend | React 18 (TypeScript), Vite, Tailwind CSS, Lucide Icons | | Backend | .NET 8 Web API, EF Core | | Database | SQLite (Persisted via Docker Volumes) | | Security | JWT (JSON Web Tokens), ASP.NET Core Identity | | Localization | i18next & react-i18next |

🏗️ Folder Structure
JobPlatform/
├── backend/            # .NET 8 Web API Project
│   ├── Controllers/    # Auth, Jobs, and Application Logic
│   ├── Data/           # DbContext and Model Definitions
│   └── jobs.db         # Persistent SQLite Database
├── frontend/           # React TypeScript Project
│   ├── src/
│   │   ├── components/ # Reusable UI pieces
│   │   ├── pages/      # Full-screen views (Auth, Board, Dashboard)
│   │   ├── services/   # Axios API configurations
│   │   └── i18n/       # SQ/MK/EN Translation dictionaries
└── docker-compose.yml  # Orchestration file

🚀 Getting Started
1. Prerequisites
•  [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
•  [Node.js (v18+)](https://nodejs.org/)
•  [Docker](https://www.docker.com/) (Optional for containerized run)
2. Manual Setup
Backend:
cd backend
dotnet run
Frontend:
cd frontend
npm install
npm run dev
3. Docker Launch (One Command)
docker-compose up --build
The app will be available at:
•  Frontend: http://localhost:3000
•  Backend API: http://localhost:5000

👨🏫 Educational Justifications
This project serves as a showcase for:
•  Performance: Implementing IQueryable for efficient database querying.
•  UX: Using debounced inputs to reduce API server load.
•  Design: Modern UI principles including Glassmorphism, Rounded UI, and Responsive Grid layouts.

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobBoard from './pages/JobBoard';
import JobDetails from './pages/JobDetails';
import Auth from './pages/Auth';
import CompanyDashboard from './pages/CompanyDashboard';

//darkMode: 'class', must have in tailwind.config.js for dark mode to work properly


export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<JobBoard />} />
                        <Route path="/job/:id" element={<JobDetails />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/dashboard" element={<CompanyDashboard />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

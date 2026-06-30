import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';
import JobCard from '../components/JobCard';
import api from './api';
import SearchBar from './components/SearchBar';

export default function JobBoard() {
    const { t } = useTranslation();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            api.get(`/api/jobs?search=${search}&category=${category}`)
                .then(res => setJobs(res.data));
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, category]);

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Hero Section with Search */}
            <div className="bg-white border-b border-gray-100 pb-16 pt-24 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                    {t('hero_title')} <span className="text-blue-600">{t('hero_blue')}</span>
                </h1>
                <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                    {t('hero_subtitle')}
                </p>

                {/* Floating Search Bar */}
                <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-16 pr-6 py-6 bg-white border border-gray-200 rounded-[2rem] shadow-xl focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg"
                        placeholder={t('search_placeholder')}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">

                {/* Sidebar Filters */}
                <aside className="lg:col-span-1 space-y-8">
                    <div>
                        <h4 className="flex items-center gap-2 font-black text-gray-900 uppercase text-xs tracking-widest mb-6">
                            <SlidersHorizontal size={14} /> {t('filter_by_category')}
                        </h4>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                            {['All', 'IT', 'Construction', 'Healthcare', 'Finance'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${category === cat
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                            : 'bg-white text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {t(`cat_${cat.toLowerCase()}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Jobs Grid */}
                <div className="lg:col-span-3">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black text-gray-900">
                            {jobs.length} <span className="text-gray-400 font-medium text-lg ml-2">{t('results_found')}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobs.map((job: any) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

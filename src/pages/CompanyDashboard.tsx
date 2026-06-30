import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Users, Briefcase, Plus,
    ExternalLink, UserCheck
} from 'lucide-react';
import api from '../services/api';

export default function CompanyDashboard() {
    const { t } = useTranslation();
    const [stats, setStats] = useState<any[]>([]);

    useEffect(() => {
        api.get('/api/applications/my-applicants').then(res => setStats(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-2">{t('company_dashboard')}</h1>
                        <p className="text-gray-500 font-medium">{t('welcome_employer')}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-blue-100 transition-all active:scale-95">
                        <Plus size={20} /> {t('post_new_job')}
                    </button>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        icon={<Briefcase />}
                        value={stats.length}
                        label={t('active_listings')}
                        color="bg-indigo-600"
                    />
                    <StatCard
                        icon={<Users />}
                        value={stats.reduce((acc, curr) => acc + curr.totalApplicants, 0)}
                        label={t('total_applicants')}
                        color="bg-blue-600"
                    />
                    <StatCard
                        icon={<UserCheck />}
                        value="--"
                        label={t('interviews')}
                        color="bg-emerald-500"
                    />
                </div>

                {/* Active Jobs Table */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900">{t('my_listings')}</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-8 py-5 font-black text-xs uppercase tracking-widest text-gray-400">{t('job_title')}</th>
                                    <th className="px-8 py-5 font-black text-xs uppercase tracking-widest text-gray-400">{t('applicants')}</th>
                                    <th className="px-8 py-5 font-black text-xs uppercase tracking-widest text-gray-400 text-right">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 font-medium">
                                {stats.map((job, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="text-gray-900 font-bold text-lg">{job.jobTitle}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {/* Visual Avatar Placeholder */}
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                                            👤
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-blue-600 font-black ml-2">+{job.totalApplicants}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="text-gray-400 hover:text-blue-600 p-2 transition-colors">
                                                <ExternalLink size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Stat Card Component
function StatCard({ icon, value, label, color }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
                {icon}
            </div>
            <div>
                <div className="text-3xl font-black text-gray-900">{value}</div>
                <div className="text-gray-400 font-bold text-sm uppercase tracking-tighter">{label}</div>
            </div>
        </div>
    );
}

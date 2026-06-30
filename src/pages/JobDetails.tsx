import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Building2, Calendar, ChevronLeft, Briefcase, Info, MapPin
} from 'lucide-react';
import api from '../services/api';

export default function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [job, setJob] = useState<any>(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        api.get(`/api/jobs/${id}`).then(res => setJob(res.data));
    }, [id]);

    const handleApply = async () => {
        setApplying(true);
        try {
            await api.post('/api/applications/apply', { jobId: parseInt(id!) });
            alert(t('apply_success'));
        } catch (err: any) {
            alert(err.response?.data || t('apply_error'));
        } finally {
            setApplying(false);
        }
    };

    if (!job) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Top Navigation */}
            <div className="max-w-4xl mx-auto px-6 pt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-bold text-sm mb-8"
                >
                    <ChevronLeft size={18} /> {t('back_to_list')}
                </button>

                {/* Header Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                    {t(`cat_${job.category.toLowerCase()}`)}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                    <Calendar size={14} /> {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                                {job.title}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600 text-lg">
                                <Building2 className="text-blue-600" size={24} />
                                <span className="font-bold">{job.companyName}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleApply}
                            disabled={applying}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition transform active:scale-95 disabled:opacity-50"
                        >
                            {applying ? t('applying') : t('apply_now')}
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <Info className="text-blue-600" /> {t('job_description')}
                            </h3>
                            <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                                {job.description}
                            </div>
                        </div>
                    </div>

                    {/* Quick Info Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-10">
                            <h3 className="font-black mb-6 text-sm uppercase tracking-widest text-blue-400">
                                {t('quick_stats')}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-800 p-3 rounded-xl">
                                        <Briefcase size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">{t('role_type')}</p>
                                        <p className="font-bold">{t('full_time')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-800 p-3 rounded-xl">
                                        <MapPin size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">{t('location')}</p>
                                        <p className="font-bold">{t('remote_local')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

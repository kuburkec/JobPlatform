import { Building2, Clock, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function JobCard({ job }: { job: any }) {
    const { t } = useTranslation();

    return (
        <div className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            {/* Category Tag */}
            <div className="flex justify-between items-start mb-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    {t(`cat_${job.category.toLowerCase()}`)}
                </span>
                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
            </h3>

            <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Building2 size={16} />
                    <span className="font-medium">{job.companyName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Clock size={16} />
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Description Preview */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                {job.description}
            </p>

            {/* Action Button */}
            <Link
                to={`/job/${job.id}`}
                className="block w-full text-center py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
            >
                {t('view_details')}
            </Link>
        </div>
    );
}

import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
//declaration of the props interface for the SearchBar component


interface Props {
    onSearch: (term: string) => void;

}
export default function SearchBar({ onSearch }: Props) {
    const { t } = useTranslation();

    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                onChange={(e) => onSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                placeholder={t('search_placeholder')}
            />
        </div>

    );
}

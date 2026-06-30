import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Briefcase, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-black text-blue-600">
                    <Briefcase size={28} />
                    <span>JobConnect</span>
                </Link>

                <div className="flex items-center gap-6">
                    <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-yellow-400">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="flex bg-gray-50 dark:bg-gray-700 p-1 rounded-xl">
                        {['en', 'sq', 'mk'].map(lng => (
                            <button key={lng} onClick={() => i18n.changeLanguage(lng)}
                                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${i18n.language === lng ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' : 'text-gray-400'}`}>
                                {lng}
                            </button>
                        ))}
                    </div>

                    {localStorage.getItem('token') ? (
                        <button onClick={handleLogout} className="text-red-500 font-bold text-sm flex items-center gap-2">
                            <LogOut size={18} /> {t('logout')}
                        </button>
                    ) : (
                        <Link to="/auth" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-100">{t('login')}</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
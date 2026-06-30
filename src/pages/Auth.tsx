import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, UserCircle, ArrowRight, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // State to toggle between Login and Register
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('Candidate'); // Candidate or Company

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        try {
            const res = await api.post(endpoint, { email, password, userType });

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userType', res.data.userType);
                navigate('/'); // Go to home page
            } else {
                setIsLogin(true); // Switch to login after successful register
                alert(t('register_success'));
            }
        } catch (err) {
            alert(t('auth_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:row">
                <div className="grid md:grid-cols-2">

                    {/* Left Side: Illustration & Welcome */}
                    <div className="bg-indigo-600 p-12 text-white flex flex-col justify-center">
                        <h2 className="text-4xl font-bold mb-6">
                            {isLogin ? t('welcome_back') : t('start_journey')}
                        </h2>
                        <p className="text-indigo-100 mb-8 text-lg">
                            {isLogin ? t('login_subtitle') : t('register_subtitle')}
                        </p>
                        <div className="hidden md:block">
                            <div className="bg-indigo-500/30 p-6 rounded-2xl border border-indigo-400/30 backdrop-blur-sm">
                                <p className="italic">"The best way to predict the future is to create it."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Simple Form */}
                    <div className="p-12">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isLogin ? t('login') : t('register')}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div className="flex gap-4 p-1 bg-gray-100 rounded-xl mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setUserType('Candidate')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${userType === 'Candidate' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                                    >
                                        {t('candidate')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUserType('Company')}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${userType === 'Company' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                                    >
                                        {t('company')}
                                    </button>
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder={t('email')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    placeholder={t('password')}
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition transform active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : isLogin ? t('login_btn') : t('register_btn')}
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-gray-500 hover:text-indigo-600 text-sm font-semibold transition"
                            >
                                {isLogin ? t('no_account') : t('already_account')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

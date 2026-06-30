import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "welcome_back": "Welcome Back",
                "login_subtitle": "Find your next opportunity.",
                "login": "Sign In",
                "email": "Email Address",
                "password": "Password",
                "login_btn": "Sign In",
                "no_account": "No account? Register",
                "nav_dashboard": "Dashboard",
                "logout": "Logout",
                "hero_title": "Find your",
                "hero_blue": "Dream Job"
            }
        },
        mk: {
            translation: {
                "welcome_back": "Добредојдовте назад",
                "login_subtitle": "Најдете ја вашата следна можност.",
                "login": "Најави се",
                "email": "Е-пошта",
                "password": "Лозинка",
                "login_btn": "Најави се",
                "no_account": "Немате сметка? Регистрирајте се",
                "nav_dashboard": "Панел",
                "logout": "Одјави се",
                "hero_title": "Најди ја твојата",
                "hero_blue": "Работа од соништата"
            }
        },
        sq: {
            translation: {
                "welcome_back": "Mirëseerdhët sërish",
                "login_subtitle": "Gjeni mundësinë tuaj të radhës.",
                "login": "Identifikohu",
                "email": "Email adresa",
                "password": "Fjalëkalimi",
                "login_btn": "Identifikohu",
                "no_account": "Nuk keni llogari? Regjistrohuni",
                "nav_dashboard": "Paneli",
                "logout": "Dil",
                "hero_title": "Gjej punën e",
                "hero_blue": "Ëndrrave tuaja"
            }
        }
    },
    lng: "mk",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;
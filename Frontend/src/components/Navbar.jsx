import { useState, useRef, useEffect } from "react";
import {
  Leaf,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { t , i18n } = useTranslation();

  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef(null);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }

    if (langRef.current && !langRef.current.contains(event.target)) {
      setLangOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  setLangOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition"
        >
          <Leaf className="text-brand-green dark:text-emerald-400" />
          Krishi AI
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300 font-medium">
          <Link
  to="/"
  className="hover:text-brand-green dark:hover:text-emerald-400 transition"
>
  {t("nav.home")}
</Link>

<Link
  to="/dashboard"
  className="hover:text-brand-green dark:hover:text-emerald-400 transition"
>
  {t("nav.dashboard")}
</Link>

<Link
  to="/features/irrigation"
  className="hover:text-brand-green dark:hover:text-emerald-400 transition"
>
  {t("nav.irrigation_advisor")}
</Link>

<Link
  to="/crop-prediction"
  className="hover:text-brand-green dark:hover:text-emerald-400 transition"
>
  {t("nav.crop_prediction")}
</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />

{/* Language Switcher */}
<div className="relative" ref={langRef}>
  <button
    onClick={() => setLangOpen(!langOpen)}
    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    <Globe size={18} />
    <span className="text-sm font-medium">
      {i18n.language === "hi"
        ? "हिं"
        : i18n.language === "ta"
        ? "த"
        : i18n.language === "ur"
        ? "اردو"
        : "EN"}
    </span>

    <ChevronDown
      size={14}
      className={`transition-transform ${
        langOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {langOpen && (
    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
      <button
        onClick={() => changeLanguage("en")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        🇬🇧 English
      </button>

      <button
        onClick={() => changeLanguage("hi")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        🇮🇳 हिन्दी
      </button>

      <button
        onClick={() => changeLanguage("ta")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        🇮🇳 தமிழ்
      </button>

      <button
        onClick={() => changeLanguage("ur")}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        🇵🇰 اردو
      </button>
    </div>
  )}
</div>

          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <User size={18} />
                <span className="font-medium">{t("nav.profile")}</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">

                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {user?.name || "User"}
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    to="/user-dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <LayoutDashboard size={18} />
                    {t("nav.my_dashboard")}
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <LogOut size={18} />
                    {t("nav.logout")}
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-gray-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition"
              >
                {t("nav.login")}
              </Link>

              <Link
                to="/register"
                className="bg-brand-green hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-5 py-2 rounded-full font-semibold transition"
              >
                {t("nav.get_started")}
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
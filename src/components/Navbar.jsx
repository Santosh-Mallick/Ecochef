// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/uiSlice";
import { logout } from "../../store/kitchenSlice";
import { Moon, Sun, UserCircle, LogOut, User, Settings } from "lucide-react";
import img from "../assets/logoimg.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const isAuthenticated = useSelector((state) => state.kitchen.auth);
  const profile = useSelector((state) => state.kitchen.profile);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isDarkMode 
        ? "bg-slate-900/80 border-slate-800 text-white" 
        : "bg-white/80 border-slate-100 text-slate-600"
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
        
        {/* Left Side: Logo */}
        <div className="flex items-center z-10">
           <Link to="/" className="text-2xl font-black text-emerald-600 flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-emerald-600 rounded-lg shadow-sm" /> */}
            <img className="w-35 h-14" src={img} alt="EcoChef Logo" />
          </Link>
        </div>

        {/* ✅ Center: Navigation Links (Absolute Centering) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-10 font-bold uppercase tracking-widest text-xs">
          <Link to="/recipes" className="hover:text-emerald-500 transition-colors py-2">Recipes</Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 z-10">
          {/* Theme Toggle */}
          <button 
            onClick={() => dispatch(toggleTheme())} 
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
          </button>

          <div className="h-5 w-1px bg-slate-200 dark:bg-slate-700 mx-1" />

          {isAuthenticated ? (
            <div className="flex items-center gap-1">
              {/* Profile Link */}
              <Link 
                to="/profile" 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {profile.name?.charAt(0) || "C"}
                </div>
                <span className="text-sm font-bold hidden xl:inline">
                  {profile.name?.split(' ')[0]}
                </span>
              </Link>
              
              {/* ✅ Settings Icon (Navigates to Profile) */}
              <button 
                onClick={() => navigate('/profile')}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                title="Account Settings"
              >
                <Settings size={20} />
              </button>

              <button 
                onClick={() => dispatch(logout())}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <UserCircle size={28} className="text-emerald-500" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
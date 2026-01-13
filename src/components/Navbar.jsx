// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/uiSlice";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-black text-emerald-600 flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-lg" />
          EcoChef AI
        </Link>

        <div className="hidden md:flex gap-8 text-slate-600 font-medium">
          <Link to="/recipes" className="hover:text-emerald-600">
            Recipes
          </Link>
          <Link to="/inventory" className="hover:text-emerald-600">
            My Fridge
          </Link>
          <Link to="/analytics" className="hover:text-emerald-600">
            Sustainability
          </Link>
        </div>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Sun size={20} className="text-slate-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { setLogin } from '../../store/kitchenSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (data.success) {
        console.log("Login successful");
        // Save token to localStorage
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
        }
        // Dispatch setLogin with data from your API
        dispatch(setLogin({ 
          token: data.access_token,
          user: data.user || { email: email, name: "Chef" } 
        }));
        navigate('/');
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h2>
          <p className="text-slate-500">Sign in to manage your EcoChef kitchen</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                }`}
                placeholder="chef@ecochef.ai"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                }`}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-500 font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
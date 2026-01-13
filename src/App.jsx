// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import './app.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 transition-colors duration-300">
        <Navbar/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Radar, Info, SatelliteDish, Users } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US');
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Animated dots background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div key={i} className={`absolute w-1 h-1 rounded-full bg-blue-400/30 animate-pulse`} style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
                {/* Animated wave at bottom */}
                <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 320"><path fill="#2563eb33" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,197.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center pt-12 pb-8">
                <img src="/imd-logo.png" alt="IMD Logo" className="w-32 h-32 mb-4 drop-shadow-lg" onError={e => (e.currentTarget.style.display = 'none')} />
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg text-center">Doppler Weather Radar Control Panel</h1>
                <p className="text-blue-200 text-lg mb-2 text-center">Indian Meteorological Department - Scientific Grade Interface</p>
                <div className="flex flex-col items-center mb-6">
                    <div className="text-blue-300 text-lg font-mono bg-blue-900/40 px-6 py-2 rounded-full shadow-lg mb-2 animate-glow">
                        {formattedDate} &nbsp;|&nbsp; {formattedTime}
                    </div>
                    <div className="text-blue-400 text-xs">Chennai, Tamil Nadu, India</div>
                </div>
                <p className="text-slate-200 mb-8 text-center">By Chennai Institute of Technology Students - IMD Project</p>
                {/* Main Card/Glassmorphism */}
                <div className="w-full max-w-lg flex flex-col items-center bg-slate-800/70 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-md px-8 py-12 mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center justify-center gap-4 w-full py-7 rounded-2xl bg-gradient-to-r from-blue-700 via-green-600 to-cyan-600 text-white font-extrabold text-2xl shadow-xl hover:scale-105 transition-all duration-200 animate-pulse-glow mb-10 border-4 border-blue-500/40"
                        style={{ boxShadow: '0 0 32px 4px #38bdf8aa' }}
                    >
                        <Radar className="w-10 h-10 animate-spin-slow" />
                        RADAR CONTROL
                    </button>
                    <div className="flex flex-row gap-6 w-full justify-center">
                        <button onClick={() => navigate('/about')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow transition"><Info className="w-5 h-5" /> ABOUT</button>
                        <button onClick={() => navigate('/live-data')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-lg shadow transition"><SatelliteDish className="w-5 h-5" /> LIVE DATA</button>
                        <button onClick={() => navigate('/credits')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold text-lg shadow transition"><Users className="w-5 h-5" /> CREDITS</button>
                    </div>
                </div>
            </div>
        </div>
    );
} 
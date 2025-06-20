import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (id === 'VYARK' && password === 'VYARK') {
            setError('');
            navigate('/home');
        } else {
            setError('Invalid ID or Password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
            {/* Animated dots background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div key={i} className={`absolute w-1 h-1 rounded-full bg-blue-400/30 animate-pulse`} style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
                {/* Animated wave at bottom */}
                <svg className="absolute bottom-0 left-0 w-full h-32" viewBox="0 0 1440 320"><path fill="#2563eb33" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,197.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
            <form onSubmit={handleLogin} className="relative z-10 bg-slate-800/90 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center border border-blue-500/30">
                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Doppler Weather Radar</h1>
                <p className="text-blue-200 mb-6">Admin Login</p>
                {error && <div className="mb-4 text-red-400 animate-shake">{error}</div>}
                <input
                    type="text"
                    placeholder="Enter ID"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-700 text-white border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-700 text-white border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition">LOGIN</button>
            </form>
        </div>
    );
} 
import { useNavigate } from 'react-router-dom';
import { supervisors, teamMembers, institution } from '../data/team';

export default function Credits() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
            {/* Header */}
            <div className="w-full bg-blue-900/80 py-4 px-6 flex items-center justify-between shadow-lg sticky top-0 z-10">
                <button onClick={() => navigate('/home')} className="text-white text-lg font-bold hover:underline">&lt; Back</button>
                <h2 className="text-2xl font-bold text-white text-center flex-1">Project Credits</h2>
                <div className="w-24" />
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-8">
                {/* Supervisor Info */}
                <div className="text-center mb-8">
                    <h3 className="text-xl text-blue-200 font-semibold mb-2">Project Supervisor(s):</h3>
                    {supervisors.map(s => (
                        <div key={s.name} className="text-lg text-white mb-1">{s.name}, <span className="text-blue-400">{s.title}</span></div>
                    ))}
                    <div className="text-blue-300 text-base mt-2">India Meteorological Department (IMD)</div>
                </div>
                {/* Team Section */}
                <h3 className="text-2xl text-orange-400 font-bold text-center mb-6">Development Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
                    {teamMembers.map(member => (
                        <div key={member.name} className="bg-slate-800/80 border-2 border-blue-700 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:border-orange-400 transition-transform duration-200">
                            <img src={member.photo} alt={member.name} className="w-36 h-36 object-cover rounded-full mb-4 border-4 border-blue-500 shadow-lg" onError={e => (e.currentTarget.style.display = 'none')} />
                            <div className="text-xl font-bold text-white mb-1 text-center">{member.name}</div>
                            <div className="text-orange-300 text-base mb-2 text-center whitespace-pre-line">{member.role}</div>
                            <div className="text-blue-200 text-sm mb-2 text-center">Chennai Institute of Technology</div>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded-full text-xs font-semibold mb-2 transition">LinkedIn</a>
                            <div className="text-blue-300 text-xs text-center">{member.email}</div>
                        </div>
                    ))}
                </div>
                {/* Institution Info */}
                <div className="text-center text-lg text-white mb-2">
                    <div className="mb-2">Institution Name: <span className="text-blue-300 font-semibold">{institution.name}</span></div>
                    <div className="mb-2">Affiliated Organisation: <span className="text-blue-300 font-semibold">{institution.org}</span></div>
                </div>
                <div className="text-center text-orange-300 text-base mt-4">Special Thanks to:<br />{institution.thanks}<br />for their support and guidance</div>
            </div>
        </div>
    );
} 
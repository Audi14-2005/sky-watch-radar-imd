import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-blue-900/80 py-4 px-6 flex items-center justify-between shadow-lg">
                <button onClick={() => navigate('/home')} className="text-white text-lg font-bold hover:underline">&lt; Back</button>
                <h2 className="text-2xl font-bold text-white text-center flex-1">About the Project</h2>
                <div className="w-24" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto py-12 px-4 gap-12">
                <div className="flex-1 text-slate-200 text-lg leading-relaxed">
                    <p>This Doppler Weather Radar simulation is an educational project developed by students of Chennai Institute of Technology under the guidance of India Meteorological Department (IMD).</p>
                    <p className="mt-4">The system demonstrates the principles of weather radar technology using Arduino microcontrollers to control servo motors that adjust the radar's elevation and azimuth angles.</p>
                    <ul className="mt-4 list-disc list-inside">
                        <li>Arduino Uno controller</li>
                        <li>Two servo motors for positioning</li>
                        <li>Two potentiometers for manual control</li>
                        <li>Custom Processing visualization software</li>
                    </ul>
                    <p className="mt-4">The simulation shows how weather radars detect precipitation and measure its intensity, movement, and elevation characteristics.</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <img src="/radarpic3.png" alt="Radar" className="w-96 h-96 object-contain rounded-xl shadow-2xl border-4 border-blue-800" onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
            </div>
        </div>
    );
} 
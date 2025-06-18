
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, RadialBarChart, RadialBar } from 'recharts';
import { Activity, Zap, CloudRain } from 'lucide-react';

export const DataVisualization = () => {
  // Mock data for demonstrations
  const signalData = [
    { angle: 0, strength: -45, echo: 12 },
    { angle: 30, strength: -52, echo: 8 },
    { angle: 60, strength: -38, echo: 22 },
    { angle: 90, strength: -41, echo: 18 },
    { angle: 120, strength: -55, echo: 5 },
    { angle: 150, strength: -33, echo: 28 },
    { angle: 180, strength: -47, echo: 15 },
    { angle: 210, strength: -44, echo: 20 },
    { angle: 240, strength: -58, echo: 3 },
    { angle: 270, strength: -36, echo: 25 },
    { angle: 300, strength: -49, echo: 11 },
    { angle: 330, strength: -42, echo: 17 },
  ];

  const rainfallData = [
    { time: '00:00', intensity: 0.5 },
    { time: '04:00', intensity: 1.2 },
    { time: '08:00', intensity: 2.8 },
    { time: '12:00', intensity: 4.1 },
    { time: '16:00', intensity: 3.2 },
    { time: '20:00', intensity: 1.8 },
  ];

  const dopplerData = [
    { name: 'Approaching', value: 35, fill: '#ef4444' },
    { name: 'Receding', value: 45, fill: '#3b82f6' },
    { name: 'Stationary', value: 20, fill: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Signal Strength Chart */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Signal Strength vs Angle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis dataKey="angle" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="strength" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Echo Intensity */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Echo Intensity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis dataKey="angle" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="echo" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rainfall Pattern */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CloudRain className="w-5 h-5" />
            Rainfall Intensity (mm/hr)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Doppler Velocity */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Doppler Velocity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart data={dopplerData} innerRadius="30%" outerRadius="90%">
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 50]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <RadialBar dataKey="value" cornerRadius={4} />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Live Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">-42 dBm</div>
              <div className="text-sm text-blue-200">Avg Signal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">2.3 mm/hr</div>
              <div className="text-sm text-blue-200">Rain Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">15.2 m/s</div>
              <div className="text-sm text-blue-200">Wind Speed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">240°</div>
              <div className="text-sm text-blue-200">Wind Dir</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

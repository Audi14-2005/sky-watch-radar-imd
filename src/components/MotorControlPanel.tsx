
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, Home, Square, RotateCw, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MotorControlPanelProps {
  azimuth: number;
  elevation: number;
  isScanning: boolean;
  onAzimuthChange: (value: number) => void;
  onElevationChange: (value: number) => void;
  onScanToggle: () => void;
}

export const MotorControlPanel = ({
  azimuth,
  elevation,
  isScanning,
  onAzimuthChange,
  onElevationChange,
  onScanToggle
}: MotorControlPanelProps) => {
  const [speed, setSpeed] = useState(98.9);
  const [rpm, setRpm] = useState(29.7);
  const [speedControl, setSpeedControl] = useState([100]);
  const [accelerationRate, setAccelerationRate] = useState([0.3]);
  const [motorMode, setMotorMode] = useState<'manual' | 'auto'>('manual');

  // Real-time data arrays - similar to Processing code
  const [speedData, setSpeedData] = useState([
    { time: '0s', value: 0 },
    { time: '1s', value: 0 },
    { time: '2s', value: 0 },
    { time: '3s', value: 0 },
    { time: '4s', value: 0 },
  ]);

  const [positionData, setPositionData] = useState([
    { time: '0s', value: 0 },
    { time: '1s', value: 0 },
    { time: '2s', value: 0 },
    { time: '3s', value: 0 },
    { time: '4s', value: azimuth },
  ]);

  // Update graphs when azimuth changes - like Processing's updateHistory()
  useEffect(() => {
    const currentRPM = (speedControl[0] / 100) * 30; // Convert speed percentage to RPM
    setRpm(currentRPM);
    
    // Update speed data
    setSpeedData(prev => {
      const newData = [...prev];
      newData.shift(); // Remove first element
      newData.push({ 
        time: `${newData.length}s`, 
        value: parseFloat(currentRPM.toFixed(1))
      });
      return newData;
    });

    // Update position data with actual azimuth value
    setPositionData(prev => {
      const newData = [...prev];
      newData.shift(); // Remove first element
      newData.push({ 
        time: `${newData.length}s`, 
        value: parseFloat(azimuth.toFixed(1))
      });
      return newData;
    });
  }, [azimuth, speedControl]);

  // Simulate motor speed based on control input
  useEffect(() => {
    const targetSpeed = (speedControl[0] / 100) * 100; // Convert to percentage for display
    setSpeed(targetSpeed);
    
    // Update RPM calculation similar to Processing code
    const calculatedRPM = Math.abs(speedControl[0] / 100 * 30);
    setRpm(calculatedRPM);
  }, [speedControl]);

  const handleSpeedPreset = (percentage: number) => {
    setSpeedControl([percentage]);
  };

  const handleHomePosition = () => {
    onAzimuthChange(0);
    onElevationChange(45);
  };

  return (
    <div className="space-y-6">
      {/* Motor Status Header */}
      <Card className="bg-gradient-to-r from-slate-800/80 to-blue-900/80 border-blue-500/30 shadow-lg shadow-blue-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <Settings className="w-6 h-6 text-blue-400" />
            Azimuth Motor Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-700/50 p-3 rounded-lg border border-blue-500/20">
              <div className="text-blue-200">Angle:</div>
              <div className="text-xl font-bold text-white">{azimuth.toFixed(1)}°</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-green-500/20">
              <div className="text-green-200">Speed:</div>
              <div className="text-xl font-bold text-white">{speed.toFixed(1)}%</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-yellow-500/20">
              <div className="text-yellow-200">RPM:</div>
              <div className="text-xl font-bold text-white">{rpm.toFixed(1)}</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-purple-500/20">
              <div className="text-purple-200">Direction:</div>
              <div className="text-xl font-bold text-white">
                {speedControl[0] > 0 ? 'CLOCKWISE' : speedControl[0] < 0 ? 'COUNTER-CW' : 'STOPPED'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Control Buttons */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Button
              onClick={handleHomePosition}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <Home className="w-4 h-4 mr-2" />
              HOME
            </Button>
            <Button
              onClick={onScanToggle}
              className={`font-medium ${
                isScanning 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Square className="w-4 h-4 mr-2" />
              {isScanning ? 'STOP' : 'START'}
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              RC
            </Button>
            <Button
              onClick={() => setMotorMode(motorMode === 'manual' ? 'auto' : 'manual')}
              className={`font-medium ${
                motorMode === 'manual' 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-cyan-600 hover:bg-cyan-700'
              }`}
            >
              {motorMode === 'manual' ? 'MANUAL MODE' : 'AUTO MODE'}
            </Button>
          </div>

          {/* Speed Presets */}
          <div className="mb-6">
            <Label className="text-blue-200 mb-3 block">Speed Presets</Label>
            <div className="grid grid-cols-5 gap-2">
              {[-100, -50, 0, 50, 100].map((percentage) => (
                <Button
                  key={percentage}
                  onClick={() => handleSpeedPreset(percentage)}
                  variant="outline"
                  size="sm"
                  className={`${
                    speedControl[0] === percentage
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                  }`}
                >
                  {percentage > 0 ? '+' : ''}{percentage}%
                </Button>
              ))}
            </div>
          </div>

          {/* Speed Control Slider */}
          <div className="space-y-3 mb-6">
            <Label className="text-blue-200">Speed Control (%): {speedControl[0]}</Label>
            <Slider
              value={speedControl}
              onValueChange={setSpeedControl}
              max={100}
              min={-100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Acceleration Rate */}
          <div className="space-y-3">
            <Label className="text-blue-200">Acceleration Rate: {accelerationRate[0]}</Label>
            <Slider
              value={accelerationRate}
              onValueChange={setAccelerationRate}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Charts - Updated with live data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speed Chart */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              SPEED (RPM)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[-35, 35]} />
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
                  dataKey="value" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Position Chart - Now properly updates with azimuth */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RotateCw className="w-5 h-5 text-yellow-400" />
              POSITION (°)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={positionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 360]} />
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
                  dataKey="value" 
                  stroke="#eab308" 
                  strokeWidth={3}
                  dot={{ fill: '#eab308', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

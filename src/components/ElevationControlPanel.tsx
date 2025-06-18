
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Settings, Home, Square, RotateCw, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ElevationControlPanelProps {
  elevation: number;
  isScanning: boolean;
  onElevationChange: (value: number) => void;
  onScanToggle: () => void;
}

export const ElevationControlPanel = ({
  elevation,
  isScanning,
  onElevationChange,
  onScanToggle
}: ElevationControlPanelProps) => {
  const [targetElevation, setTargetElevation] = useState(elevation);
  const [elevationSpeed, setElevationSpeed] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [elevationControl, setElevationControl] = useState([elevation]);
  const [elevationSmoothing, setElevationSmoothing] = useState([0.1]);

  // Real-time data arrays for elevation tracking
  const [elevationData, setElevationData] = useState([
    { time: '0s', value: elevation },
    { time: '1s', value: elevation },
    { time: '2s', value: elevation },
    { time: '3s', value: elevation },
    { time: '4s', value: elevation },
  ]);

  const [elevationSpeedData, setElevationSpeedData] = useState([
    { time: '0s', value: 0 },
    { time: '1s', value: 0 },
    { time: '2s', value: 0 },
    { time: '3s', value: 0 },
    { time: '4s', value: 0 },
  ]);

  // Update graphs when elevation changes
  useEffect(() => {
    // Calculate speed based on elevation change
    const currentSpeed = Math.abs(targetElevation - elevation) > 0.1 ? 
      (targetElevation - elevation) * 10 : 0;
    setElevationSpeed(currentSpeed);
    setIsMoving(Math.abs(targetElevation - elevation) > 0.1);
    
    // Update elevation data
    setElevationData(prev => {
      const newData = [...prev];
      newData.shift();
      newData.push({ 
        time: `${newData.length}s`, 
        value: parseFloat(elevation.toFixed(1))
      });
      return newData;
    });

    // Update speed data
    setElevationSpeedData(prev => {
      const newData = [...prev];
      newData.shift();
      newData.push({ 
        time: `${newData.length}s`, 
        value: parseFloat(currentSpeed.toFixed(1))
      });
      return newData;
    });
  }, [elevation, targetElevation]);

  const handleElevationPreset = (angle: number) => {
    setTargetElevation(angle);
    setElevationControl([angle]);
    onElevationChange(angle);
  };

  const handleHomePosition = () => {
    handleElevationPreset(45);
  };

  const handleSliderChange = (value: number[]) => {
    setElevationControl(value);
    setTargetElevation(value[0]);
    onElevationChange(value[0]);
  };

  return (
    <div className="space-y-6">
      {/* Elevation Status Header */}
      <Card className="bg-gradient-to-r from-slate-800/80 to-purple-900/80 border-purple-500/30 shadow-lg shadow-purple-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <Settings className="w-6 h-6 text-purple-400" />
            Elevation Motor Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-700/50 p-3 rounded-lg border border-purple-500/20">
              <div className="text-purple-200">Current:</div>
              <div className="text-xl font-bold text-white">{elevation.toFixed(1)}°</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-blue-500/20">
              <div className="text-blue-200">Target:</div>
              <div className="text-xl font-bold text-white">{targetElevation.toFixed(1)}°</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-green-500/20">
              <div className="text-green-200">Speed:</div>
              <div className="text-xl font-bold text-white">{Math.abs(elevationSpeed).toFixed(1)}°/s</div>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-yellow-500/20">
              <div className="text-yellow-200">Status:</div>
              <div className="text-xl font-bold text-white">
                {isMoving ? 'MOVING' : 'STABLE'}
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
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
              {isScanning ? 'STOP' : 'SCAN'}
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              RC
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              BEAM: {isMoving ? 'MOVING' : 'STABLE'}
            </Button>
          </div>

          {/* Elevation Presets */}
          <div className="mb-6">
            <Label className="text-purple-200 mb-3 block">Elevation Presets</Label>
            <div className="grid grid-cols-5 gap-2">
              {[0, 30, 45, 60, 90].map((angle) => (
                <Button
                  key={angle}
                  onClick={() => handleElevationPreset(angle)}
                  variant="outline"
                  size="sm"
                  className={`${
                    Math.abs(targetElevation - angle) < 1
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                  }`}
                >
                  {angle}°
                </Button>
              ))}
            </div>
          </div>

          {/* Elevation Control Slider */}
          <div className="space-y-3 mb-6">
            <Label className="text-purple-200">Elevation Control (°): {elevationControl[0].toFixed(1)}</Label>
            <Slider
              value={elevationControl}
              onValueChange={handleSliderChange}
              max={90}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Smoothing Rate */}
          <div className="space-y-3">
            <Label className="text-purple-200">Movement Smoothing: {elevationSmoothing[0].toFixed(2)}</Label>
            <Slider
              value={elevationSmoothing}
              onValueChange={setElevationSmoothing}
              max={1}
              min={0.01}
              step={0.01}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Elevation Angle Chart */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RotateCw className="w-5 h-5 text-purple-400" />
              ELEVATION ANGLE (°)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={elevationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.2)" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 90]} />
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
                  stroke="#a855f7" 
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Elevation Speed Chart */}
        <Card className="bg-slate-800/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              ELEVATION SPEED (°/s)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={elevationSpeedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[-20, 20]} />
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
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

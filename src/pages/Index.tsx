
import { useState } from 'react';
import { RadarDish3D } from '@/components/RadarDish3D';
import { ControlPanel } from '@/components/ControlPanel';
import { DataVisualization } from '@/components/DataVisualization';
import { StatusPanel } from '@/components/StatusPanel';
import { NetworkPanel } from '@/components/NetworkPanel';
import { ExportPanel } from '@/components/ExportPanel';

const Index = () => {
  const [azimuth, setAzimuth] = useState(0);
  const [elevation, setElevation] = useState(45);
  const [isScanning, setIsScanning] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'wifi' | 'bluetooth'>('wifi');
  const [isConnected, setIsConnected] = useState(true);

  const handleAzimuthChange = (value: number) => {
    setAzimuth(value);
    console.log(`Azimuth changed to: ${value}°`);
  };

  const handleElevationChange = (value: number) => {
    setElevation(value);
    console.log(`Elevation changed to: ${value}°`);
  };

  const handleScanToggle = () => {
    setIsScanning(!isScanning);
    console.log(`Scanning ${!isScanning ? 'started' : 'stopped'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              IMD Radar Control System
            </h1>
            <p className="text-blue-200">Indian Meteorological Department - Scientific Grade Interface</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <ControlPanel
            azimuth={azimuth}
            elevation={elevation}
            isScanning={isScanning}
            onAzimuthChange={handleAzimuthChange}
            onElevationChange={handleElevationChange}
            onScanToggle={handleScanToggle}
          />
          
          <NetworkPanel
            connectionMode={connectionMode}
            onConnectionModeChange={setConnectionMode}
            isConnected={isConnected}
            onConnectionToggle={() => setIsConnected(!isConnected)}
          />
          
          <ExportPanel />
        </div>

        {/* Center Column - 3D Visualization */}
        <div className="space-y-6">
          <RadarDish3D 
            azimuth={azimuth}
            elevation={elevation}
            isScanning={isScanning}
          />
          
          <StatusPanel
            azimuth={azimuth}
            elevation={elevation}
            isScanning={isScanning}
            connectionMode={connectionMode}
          />
        </div>

        {/* Right Column - Data Visualization */}
        <div className="space-y-6">
          <DataVisualization />
        </div>
      </div>
    </div>
  );
};

export default Index;

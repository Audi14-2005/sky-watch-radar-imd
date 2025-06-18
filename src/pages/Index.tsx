import { useState, useEffect } from 'react';
import { RadarDish3D } from '@/components/RadarDish3D';
import { MotorControlPanel } from '@/components/MotorControlPanel';
import { DataVisualization } from '@/components/DataVisualization';
import { StatusPanel } from '@/components/StatusPanel';
import { NetworkPanel } from '@/components/NetworkPanel';
import { ExportPanel } from '@/components/ExportPanel';

const Index = () => {
  const [azimuth, setAzimuth] = useState(45.5);
  const [elevation, setElevation] = useState(45);
  const [isScanning, setIsScanning] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'wifi' | 'bluetooth'>('wifi');
  const [isConnected, setIsConnected] = useState(true);

  // Add motor simulation variables similar to Processing code
  const [azimuthSpeed, setAzimuthSpeed] = useState(0); // Current speed percentage
  const [targetAzimuthSpeed, setTargetAzimuthSpeed] = useState(0); // Target speed
  const [azimuthAcceleration] = useState(0.2); // Speed change rate

  // Simulate motor movement like in Processing code
  useEffect(() => {
    const interval = setInterval(() => {
      // Smoothly adjust speed toward target (like Processing's updateAzimuth)
      setAzimuthSpeed(prevSpeed => {
        let newSpeed = prevSpeed;
        if (Math.abs(newSpeed - targetAzimuthSpeed) > azimuthAcceleration) {
          if (newSpeed < targetAzimuthSpeed) {
            newSpeed += azimuthAcceleration;
          } else {
            newSpeed -= azimuthAcceleration;
          }
        } else {
          newSpeed = targetAzimuthSpeed;
        }
        return newSpeed;
      });

      // Update azimuth angle based on speed (like Processing code)
      if (azimuthSpeed !== 0) {
        setAzimuth(prevAzimuth => {
          const maxRPM = 30.0;
          const angleIncrement = (azimuthSpeed * maxRPM) / 600.0; // Similar to Processing scaling
          let newAzimuth = prevAzimuth + angleIncrement;
          
          // Keep angle within 0-360 range
          newAzimuth = newAzimuth % 360;
          if (newAzimuth < 0) newAzimuth += 360;
          
          return newAzimuth;
        });
      }

      // Scanning mode simulation
      if (isScanning && azimuthSpeed === 0) {
        setAzimuth(prevAzimuth => {
          let newAzimuth = prevAzimuth + 0.5; // Slow automatic scan
          newAzimuth = newAzimuth % 360;
          return newAzimuth;
        });
      }
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [azimuthSpeed, targetAzimuthSpeed, azimuthAcceleration, isScanning]);

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
    
    // When scanning starts, set a moderate speed
    if (!isScanning) {
      setTargetAzimuthSpeed(20); // 20% speed for scanning
    } else {
      setTargetAzimuthSpeed(0); // Stop when scanning stops
    }
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
            <div className="mt-2 text-xs text-blue-300">
              Speed: {azimuthSpeed.toFixed(1)}% | Mode: {isScanning ? 'AUTO SCAN' : 'MANUAL'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Enhanced Motor Controls */}
        <div className="xl:col-span-2 space-y-6">
          <MotorControlPanel
            azimuth={azimuth}
            elevation={elevation}
            isScanning={isScanning}
            onAzimuthChange={handleAzimuthChange}
            onElevationChange={handleElevationChange}
            onScanToggle={handleScanToggle}
          />
        </div>

        {/* Right Column - 3D Visualization and Status */}
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

          <NetworkPanel
            connectionMode={connectionMode}
            onConnectionModeChange={setConnectionMode}
            isConnected={isConnected}
            onConnectionToggle={() => setIsConnected(!isConnected)}
          />
          
          <ExportPanel />
        </div>
      </div>

      {/* Bottom Row - Data Visualization */}
      <div className="mt-6">
        <DataVisualization />
      </div>
    </div>
  );
};

export default Index;

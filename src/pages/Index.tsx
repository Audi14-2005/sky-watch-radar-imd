import { useState, useEffect } from 'react';
import { RadarDish3D } from '@/components/RadarDish3D';
import { MotorControlPanel } from '@/components/MotorControlPanel';
import { ElevationControlPanel } from '@/components/ElevationControlPanel';
import { StatusPanel } from '@/components/StatusPanel';
import { ExportPanel } from '@/components/ExportPanel';

const Index = () => {
  const [azimuth, setAzimuth] = useState(45.5);
  const [elevation, setElevation] = useState(45);
  const [isScanning, setIsScanning] = useState(false);
  const [connectionMode, setConnectionMode] = useState<'wifi' | 'bluetooth'>('wifi');
  const [isConnected, setIsConnected] = useState(true);
  const [controlMode, setControlMode] = useState<'azimuth' | 'elevation'>('azimuth');

  // Add motor simulation variables similar to Processing code
  const [azimuthSpeed, setAzimuthSpeed] = useState(0);
  const [targetAzimuthSpeed, setTargetAzimuthSpeed] = useState(0);
  const [azimuthAcceleration, setAzimuthAcceleration] = useState(0.2);

  // Elevation simulation variables
  const [targetElevation, setTargetElevation] = useState(45);
  const [elevationSmoothing, setElevationSmoothing] = useState(0.1);

  // Simulate motor movement like in Processing code
  const [azimuthHistory, setAzimuthHistory] = useState(Array(200).fill(azimuth));
  const [azimuthSpeedHistory, setAzimuthSpeedHistory] = useState(Array(200).fill(0));
  const [elevationHistory, setElevationHistory] = useState(Array(200).fill(elevation));
  const [elevationSpeedHistory, setElevationSpeedHistory] = useState(Array(200).fill(0));
  const [motorMode, setMotorMode] = useState<'manual' | 'auto'>('manual');

  useEffect(() => {
    const interval = setInterval(() => {
      // Update azimuth motor simulation
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

      // Update azimuth angle based on speed
      if (azimuthSpeed !== 0) {
        setAzimuth(prevAzimuth => {
          const maxRPM = 30.0;
          const angleIncrement = (azimuthSpeed * maxRPM) / 600.0;
          let newAzimuth = prevAzimuth + angleIncrement;

          newAzimuth = newAzimuth % 360;
          if (newAzimuth < 0) newAzimuth += 360;

          // Update history
          setAzimuthHistory(h => [...h.slice(1), newAzimuth]);
          setAzimuthSpeedHistory(h => [...h.slice(1), azimuthSpeed]);
          return newAzimuth;
        });
      }

      // Update elevation simulation
      setElevation(prevElevation => {
        const speed = (targetElevation - prevElevation) * elevationSmoothing;
        setElevationSpeedHistory(h => [...h.slice(1), speed]);
        if (Math.abs(targetElevation - prevElevation) > 0.1) {
          const newElevation = prevElevation + speed;
          setElevationHistory(h => [...h.slice(1), newElevation]);
          return newElevation;
        }
        setElevationHistory(h => [...h.slice(1), targetElevation]);
        return targetElevation;
      });

      // Scanning mode simulation
      if (isScanning) {
        if (controlMode === 'azimuth' && azimuthSpeed === 0) {
          setAzimuth(prevAzimuth => {
            let newAzimuth = prevAzimuth + 0.5;
            newAzimuth = newAzimuth % 360;
            setAzimuthHistory(h => [...h.slice(1), newAzimuth]);
            return newAzimuth;
          });
        } else if (controlMode === 'elevation') {
          setElevation(prevElevation => {
            let newElevation = prevElevation + 0.2;
            if (newElevation > 90) newElevation = 0;
            setElevationHistory(h => [...h.slice(1), newElevation]);
            return newElevation;
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [azimuthSpeed, targetAzimuthSpeed, azimuthAcceleration, isScanning, controlMode, targetElevation, elevationSmoothing]);

  const handleAzimuthChange = (value: number) => {
    setAzimuth(value);
    console.log(`Azimuth changed to: ${value}°`);
  };

  const handleElevationChange = (value: number) => {
    setTargetElevation(value);
    console.log(`Elevation target changed to: ${value}°`);
  };

  const handleScanToggle = () => {
    setIsScanning(!isScanning);
    console.log(`Scanning ${!isScanning ? 'started' : 'stopped'}`);

    if (controlMode === 'azimuth') {
      if (!isScanning) {
        setTargetAzimuthSpeed(20);
      } else {
        setTargetAzimuthSpeed(0);
      }
    }
  };

  // Handler for MotorControlPanel
  const handleAzimuthAccelerationChange = (value: number[]) => {
    setAzimuthAcceleration(value[0]);
  };

  const handleMotorModeChange = (mode: 'manual' | 'auto') => {
    setMotorMode(mode);
    if (mode === 'auto') {
      setTargetAzimuthSpeed(20); // Example auto speed
    } else {
      setTargetAzimuthSpeed(0); // Stop in manual until user sets
    }
  };

  // Handler for ElevationControlPanel
  const handleElevationSmoothingChange = (value: number[]) => {
    setElevationSmoothing(value[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              IMD Radar Control System
            </h1>
            <p className="text-blue-200">Indian Meteorological Department - Scientific Grade Interface</p>
          </div>
          <div className="text-left lg:text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            <div className="mt-2 text-xs text-blue-300">
              Control: {controlMode.toUpperCase()} | Mode: {isScanning ? 'AUTO SCAN' : 'MANUAL'}
            </div>
          </div>
        </div>
      </div>

      {/* Control Mode Toggle */}
      <div className="mb-6 flex justify-center">
        <div className="bg-slate-800/50 p-1 rounded-lg border border-slate-600">
          <button
            onClick={() => setControlMode('azimuth')}
            className={`px-4 lg:px-6 py-2 rounded-md font-medium transition-colors ${controlMode === 'azimuth'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
              }`}
          >
            Azimuth Control
          </button>
          <button
            onClick={() => setControlMode('elevation')}
            className={`px-4 lg:px-6 py-2 rounded-md font-medium transition-colors ${controlMode === 'elevation'
                ? 'bg-purple-600 text-white'
                : 'text-slate-300 hover:text-white'
              }`}
          >
            Elevation Control
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Section - Motor Controls */}
        <div className="xl:col-span-3 space-y-6">
          {controlMode === 'azimuth' ? (
            <MotorControlPanel
              azimuth={azimuth}
              elevation={elevation}
              isScanning={isScanning}
              onAzimuthChange={handleAzimuthChange}
              onElevationChange={handleElevationChange}
              onScanToggle={handleScanToggle}
              azimuthAcceleration={azimuthAcceleration}
              onAzimuthAccelerationChange={handleAzimuthAccelerationChange}
              motorMode={motorMode}
              onMotorModeChange={handleMotorModeChange}
              azimuthHistory={azimuthHistory}
              azimuthSpeedHistory={azimuthSpeedHistory}
            />
          ) : (
            <ElevationControlPanel
              elevation={elevation}
              isScanning={isScanning}
              onElevationChange={handleElevationChange}
              onScanToggle={handleScanToggle}
              elevationSmoothing={elevationSmoothing}
              onElevationSmoothingChange={handleElevationSmoothingChange}
              elevationHistory={elevationHistory}
              elevationSpeedHistory={elevationSpeedHistory}
            />
          )}
        </div>

        {/* Right Section - 3D Visualization and Status */}
        <div className="xl:col-span-1 space-y-6">
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

          <ExportPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;

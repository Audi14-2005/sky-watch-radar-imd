
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioIcon, Wifi, Bluetooth } from 'lucide-react';

interface StatusPanelProps {
  azimuth: number;
  elevation: number;
  isScanning: boolean;
  connectionMode: 'wifi' | 'bluetooth';
}

export const StatusPanel = ({ azimuth, elevation, isScanning, connectionMode }: StatusPanelProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RadioIcon className="w-5 h-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Position */}
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="text-blue-200 font-medium mb-2">Current Position</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">{azimuth.toFixed(1)}°</div>
              <div className="text-sm text-blue-200">Azimuth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{elevation.toFixed(1)}°</div>
              <div className="text-sm text-blue-200">Elevation</div>
            </div>
          </div>
        </div>

        {/* Operation Status */}
        <div className="space-y-2">
          <h4 className="text-blue-200 font-medium">Operation Status</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-200">Scanning Mode</span>
            <Badge variant={isScanning ? "default" : "secondary"} className={isScanning ? "bg-green-600" : "bg-slate-600"}>
              {isScanning ? 'ACTIVE' : 'IDLE'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-200">Connection</span>
            <div className="flex items-center gap-2">
              {connectionMode === 'wifi' ? (
                <Wifi className="w-4 h-4 text-blue-400" />
              ) : (
                <Bluetooth className="w-4 h-4 text-blue-400" />
              )}
              <Badge variant="default" className="bg-blue-600">
                {connectionMode.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-2">
          <h4 className="text-blue-200 font-medium">System Health</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Motor Temperature</span>
              <span className="text-sm text-green-400">32°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Power Supply</span>
              <span className="text-sm text-green-400">12.4V</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Signal Quality</span>
              <span className="text-sm text-green-400">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Uptime</span>
              <span className="text-sm text-blue-400">02:34:12</span>
            </div>
          </div>
        </div>

        {/* Last Update */}
        <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-600">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

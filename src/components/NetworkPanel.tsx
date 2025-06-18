
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Wifi, Bluetooth, Power, Settings } from 'lucide-react';

interface NetworkPanelProps {
  connectionMode: 'wifi' | 'bluetooth';
  onConnectionModeChange: (mode: 'wifi' | 'bluetooth') => void;
  isConnected: boolean;
  onConnectionToggle: () => void;
}

export const NetworkPanel = ({ 
  connectionMode, 
  onConnectionModeChange, 
  isConnected, 
  onConnectionToggle 
}: NetworkPanelProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Network Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Mode Toggle */}
        <div className="space-y-3">
          <Label className="text-blue-200">Connection Mode</Label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onConnectionModeChange('wifi')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                connectionMode === 'wifi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-blue-200 hover:bg-slate-600'
              }`}
            >
              <Wifi className="w-4 h-4" />
              WiFi
            </button>
            <button
              onClick={() => onConnectionModeChange('bluetooth')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                connectionMode === 'bluetooth'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-blue-200 hover:bg-slate-600'
              }`}
            >
              <Bluetooth className="w-4 h-4" />
              Bluetooth
            </button>
          </div>
        </div>

        {/* Connection Settings */}
        {connectionMode === 'wifi' ? (
          <div className="space-y-3">
            <Label className="text-blue-200">WiFi Settings</Label>
            <Input
              placeholder="SSID: IMD_Radar_01"
              className="bg-slate-700 border-slate-600 text-white"
              readOnly
            />
            <Input
              placeholder="IP: 192.168.1.100"
              className="bg-slate-700 border-slate-600 text-white"
              readOnly
            />
          </div>
        ) : (
          <div className="space-y-3">
            <Label className="text-blue-200">Bluetooth Settings</Label>
            <Input
              placeholder="Device: ESP32_Radar"
              className="bg-slate-700 border-slate-600 text-white"
              readOnly
            />
            <Input
              placeholder="MAC: AA:BB:CC:DD:EE:FF"
              className="bg-slate-700 border-slate-600 text-white"
              readOnly
            />
          </div>
        )}

        {/* Connection Control */}
        <div className="flex items-center justify-between">
          <Label className="text-blue-200">Connection Status</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={isConnected}
              onCheckedChange={onConnectionToggle}
            />
            <Power className={`w-4 h-4 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>

        {/* Connection Info */}
        <div className="bg-slate-700/50 p-3 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-blue-200">Signal Strength</span>
            <span className="text-green-400">-45 dBm</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-blue-200">Latency</span>
            <span className="text-green-400">12 ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-200">Data Rate</span>
            <span className="text-green-400">1.2 MB/s</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Reconnect
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Scan Devices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

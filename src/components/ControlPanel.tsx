
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Square, RotateCw } from 'lucide-react';

interface ControlPanelProps {
  azimuth: number;
  elevation: number;
  isScanning: boolean;
  onAzimuthChange: (value: number) => void;
  onElevationChange: (value: number) => void;
  onScanToggle: () => void;
}

export const ControlPanel = ({
  azimuth,
  elevation,
  isScanning,
  onAzimuthChange,
  onElevationChange,
  onScanToggle
}: ControlPanelProps) => {
  const handleAzimuthSliderChange = (values: number[]) => {
    onAzimuthChange(values[0]);
  };

  const handleElevationSliderChange = (values: number[]) => {
    onElevationChange(values[0]);
  };

  const handleAzimuthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(360, parseFloat(e.target.value) || 0));
    onAzimuthChange(value);
  };

  const handleElevationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(90, parseFloat(e.target.value) || 0));
    onElevationChange(value);
  };

  const handleHomePosition = () => {
    onAzimuthChange(0);
    onElevationChange(45);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCw className="w-5 h-5" />
          Radar Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Azimuth Control */}
        <div className="space-y-3">
          <Label className="text-blue-200">Azimuth (0° - 360°)</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[azimuth]}
              onValueChange={handleAzimuthSliderChange}
              max={360}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <Input
              type="number"
              value={azimuth.toFixed(1)}
              onChange={handleAzimuthInputChange}
              className="w-20 bg-slate-700 border-slate-600 text-white"
              min={0}
              max={360}
              step={0.1}
            />
            <span className="text-blue-200 text-sm">°</span>
          </div>
        </div>

        {/* Elevation Control */}
        <div className="space-y-3">
          <Label className="text-blue-200">Elevation (0° - 90°)</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[elevation]}
              onValueChange={handleElevationSliderChange}
              max={90}
              min={0}
              step={0.1}
              className="flex-1"
            />
            <Input
              type="number"
              value={elevation.toFixed(1)}
              onChange={handleElevationInputChange}
              className="w-20 bg-slate-700 border-slate-600 text-white"
              min={0}
              max={90}
              step={0.1}
            />
            <span className="text-blue-200 text-sm">°</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onScanToggle}
            className={`flex-1 ${
              isScanning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isScanning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Scan
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Scan
              </>
            )}
          </Button>
          
          <Button
            onClick={handleHomePosition}
            variant="outline"
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            Home
          </Button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2">
          <Label className="text-blue-200">Quick Positions</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => { onAzimuthChange(0); onElevationChange(90); }}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Zenith
            </Button>
            <Button
              onClick={() => { onAzimuthChange(90); onElevationChange(45); }}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              East
            </Button>
            <Button
              onClick={() => { onAzimuthChange(180); onElevationChange(45); }}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              South
            </Button>
            <Button
              onClick={() => { onAzimuthChange(270); onElevationChange(45); }}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              West
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

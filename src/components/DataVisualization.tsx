
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export const DataVisualization = () => {
  return (
    <div className="space-y-6">
      {/* Essential System Info */}
      <Card className="bg-slate-800/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">Active</div>
              <div className="text-sm text-blue-200">System Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">12.4V</div>
              <div className="text-sm text-blue-200">Power Supply</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">32°C</div>
              <div className="text-sm text-blue-200">Temperature</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">95%</div>
              <div className="text-sm text-blue-200">Signal Quality</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

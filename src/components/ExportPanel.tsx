
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, FileText, Database, Image } from 'lucide-react';
import { toast } from 'sonner';

export const ExportPanel = () => {
  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    toast(`Data exported as ${format.toUpperCase()}`, {
      description: `Your radar data has been exported successfully.`
    });
  };

  const handleDownloadLogs = () => {
    console.log('Downloading system logs');
    toast('System logs downloaded', {
      description: 'Log files have been saved to your device.'
    });
  };

  const handleExportVisualization = () => {
    console.log('Exporting current visualization');
    toast('Visualization exported', {
      description: 'Charts and graphs have been saved as PNG.'
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Download className="w-5 h-5" />
          Data Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Format Selection */}
        <div className="space-y-2">
          <Label className="text-blue-200">Export Format</Label>
          <Select defaultValue="csv">
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
              <SelectItem value="json">JSON (JavaScript Object)</SelectItem>
              <SelectItem value="xml">XML (Extensible Markup)</SelectItem>
              <SelectItem value="txt">TXT (Plain Text)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => handleExport('csv')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export Scan Data
          </Button>
          
          <Button
            onClick={handleDownloadLogs}
            variant="outline"
            className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <Database className="w-4 h-4 mr-2" />
            Download System Logs
          </Button>
          
          <Button
            onClick={handleExportVisualization}
            variant="outline"
            className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <Image className="w-4 h-4 mr-2" />
            Export Visualizations
          </Button>
        </div>

        {/* Export Options */}
        <div className="bg-slate-700/50 p-3 rounded-lg">
          <h4 className="text-blue-200 text-sm font-medium mb-2">Export Options</h4>
          <div className="space-y-1 text-xs text-blue-200">
            <div>• Include timestamps</div>
            <div>• Compress large files</div>
            <div>• Add metadata headers</div>
            <div>• Scientific notation format</div>
          </div>
        </div>

        {/* File Info */}
        <div className="text-xs text-slate-400">
          <div className="flex justify-between">
            <span>Last export:</span>
            <span>2024-06-18 14:30</span>
          </div>
          <div className="flex justify-between">
            <span>File size:</span>
            <span>2.4 MB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

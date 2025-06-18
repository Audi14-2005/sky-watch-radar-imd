
import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RadarDish3DProps {
  azimuth: number;
  elevation: number;
  isScanning: boolean;
}

export const RadarDish3D = ({ azimuth, elevation, isScanning }: RadarDish3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Background grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.offsetWidth; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.offsetHeight);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.offsetHeight; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.offsetWidth, i);
        ctx.stroke();
      }

      // Radar base
      ctx.fillStyle = 'rgba(100, 116, 139, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY + 80, 60, 0, Math.PI * 2);
      ctx.fill();

      // Tower
      ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
      ctx.fillRect(centerX - 8, centerY - 20, 16, 100);

      // Dish calculations
      const dishRadius = 40;
      const elevationRad = (elevation * Math.PI) / 180;
      const azimuthRad = (azimuth * Math.PI) / 180;

      // Dish support arm
      const armLength = 30;
      const armX = centerX + Math.sin(azimuthRad) * armLength;
      const armY = centerY - Math.cos(azimuthRad) * armLength;

      ctx.strokeStyle = 'rgba(203, 213, 225, 0.9)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(armX, armY);
      ctx.stroke();

      // Dish (simplified ellipse for perspective)
      const dishCenterX = armX;
      const dishCenterY = armY - 10;
      
      ctx.save();
      ctx.translate(dishCenterX, dishCenterY);
      ctx.rotate(azimuthRad);
      
      // Scale for elevation perspective
      const scaleY = Math.cos(elevationRad) * 0.5 + 0.5;
      ctx.scale(1, scaleY);

      // Dish outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.9)';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, dishRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Dish center
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Scanning beam effect
      if (isScanning) {
        const time = Date.now() * 0.002;
        const beamAngle = azimuthRad + time;
        
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 + Math.sin(time * 3) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.sin(beamAngle) * 150,
          centerY - Math.cos(beamAngle) * 150
        );
        ctx.stroke();

        // Scanning arc
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 120, beamAngle - 0.5, beamAngle + 0.5);
        ctx.stroke();
      }

      // Coordinates display
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '12px monospace';
      ctx.fillText(`Az: ${azimuth.toFixed(1)}°`, 10, 20);
      ctx.fillText(`El: ${elevation.toFixed(1)}°`, 10, 35);
      ctx.fillText(`Status: ${isScanning ? 'SCANNING' : 'IDLE'}`, 10, 50);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [azimuth, elevation, isScanning]);

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white">Radar Dish 3D View</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full h-80 rounded-lg bg-slate-900/50"
          style={{ imageRendering: 'pixelated' }}
        />
      </CardContent>
    </Card>
  );
};

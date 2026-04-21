import React, { useRef, useState, useEffect } from 'react';
import { Pencil, RotateCcw, ShieldCheck } from 'lucide-react';

export const DraftPad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#475569');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.beginPath(); // 断开路径防止连线
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-slate-100 rounded-3xl p-5 shadow-xl flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Pencil className="w-4 h-4 text-orange-500" />
          <span className="font-semibold text-slate-800 text-sm">物理演草板 (草稿纸)</span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setColor('#475569')}
            className={`w-5 h-5 rounded-full bg-slate-600 ring-2 transition-all ${color === '#475569' ? 'ring-offset-2 ring-slate-400' : 'ring-transparent'}`}
          />
          <button
            onClick={() => setColor('#2563eb')}
            className={`w-5 h-5 rounded-full bg-blue-600 ring-2 transition-all ${color === '#2563eb' ? 'ring-offset-2 ring-blue-400' : 'ring-transparent'}`}
          />
          <button
            onClick={() => setColor('#dc2626')}
            className={`w-5 h-5 rounded-full bg-red-600 ring-2 transition-all ${color === '#dc2626' ? 'ring-offset-2 ring-red-400' : 'ring-transparent'}`}
          />
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 ml-3 px-3 py-1.5 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition"
          >
            <RotateCcw size={12} /> 清除
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 border border-dashed border-slate-200 rounded-2xl relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        />
      </div>
      <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
        <ShieldCheck size={11} className="text-emerald-500" /> 草稿仅用于辅助计算，不上传，不占用最终提交得分。
      </div>
    </div>
  );
};

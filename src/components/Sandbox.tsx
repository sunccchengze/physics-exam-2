import React, { useState, useEffect, useRef } from 'react';
import { Settings, Play, Pause, RefreshCw, Layers } from 'lucide-react';

export const Sandbox: React.FC = () => {
  const [omega1, setOmega1] = useState<number>(1);
  const [omega2, setOmega2] = useState<number>(2);
  const [simType, setSimType] = useState<'lissajous' | 'rolling'>('lissajous');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 绘制背景网格
      ctx.strokeStyle = 'rgba(224, 242, 254, 0.4)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (simType === 'lissajous') {
        // 绘制利萨如图形 (Lissajous Curve)
        ctx.strokeStyle = '#0284c7'; // 天蓝色
        ctx.lineWidth = 3;
        ctx.shadowColor = 'rgba(2, 132, 199, 0.4)';
        ctx.shadowBlur = 15;

        ctx.beginPath();
        const R = Math.min(width, height) * 0.35;
        const cx = width / 2;
        const cy = height / 2;

        for (let t = 0; t <= Math.PI * 4; t += 0.02) {
          const x = cx + R * Math.cos(omega1 * t);
          const y = cy + R * Math.sin(omega2 * t);
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 绘制质点
        if (isPlaying) timeRef.current += 0.02;
        const px = cx + R * Math.cos(omega1 * timeRef.current);
        const py = cy + R * Math.sin(omega2 * timeRef.current);

        ctx.fillStyle = '#f97316'; // 亮橙色
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // 速度加速度矢量
        ctx.strokeStyle = '#10b981'; // 绿色 (速度矢量)
        ctx.lineWidth = 2;
        const vx = -R * omega1 * Math.sin(omega1 * timeRef.current);
        const vy = R * omega2 * Math.cos(omega2 * timeRef.current);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + vx * 0.5, py + vy * 0.5);
        ctx.stroke();
      } else {
        // 纯滚动过渡演示 (Rolling ball)
        const R = 40;
        const cy = height - R - 60;
        const t = timeRef.current;

        // 地面
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(20, cy + R);
        ctx.lineTo(width - 20, cy + R);
        ctx.stroke();

        // 动力学推导过渡点
        const v0 = 5;
        const mu = 0.1;
        const g = 9.8;
        const t_transition = (2 * v0) / (5 * mu * g);

        let vc, omega;
        if (t < t_transition) {
          vc = v0 - mu * g * t;
          omega = (3 * mu * g * t) / (2 * R);
        } else {
          vc = (3 / 5) * v0;
          omega = vc / R;
        }

        const px = 60 + vc * t * 30; // 缩放移动

        if (isPlaying) timeRef.current += 0.05;

        // 绘制球体
        ctx.save();
        ctx.translate(px, cy);
        ctx.rotate(omega * timeRef.current);

        ctx.strokeStyle = '#0284c7';
        ctx.fillStyle = 'rgba(14, 165, 233, 0.1)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 球内辅助十字线看旋转
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-R, 0); ctx.lineTo(R, 0);
        ctx.moveTo(0, -R); ctx.lineTo(0, R);
        ctx.stroke();
        ctx.restore();

        // 实时速度、角速度折线图
        ctx.fillStyle = '#334155';
        ctx.font = '14px sans-serif';
        ctx.fillText(`时间: ${t.toFixed(2)}s / 临界值: ${t_transition.toFixed(2)}s`, 30, 40);
        ctx.fillText(`质心速度 v_c: ${vc.toFixed(2)}m/s`, 30, 65);
        ctx.fillText(`转速 wR: ${(omega * R).toFixed(2)}m/s`, 30, 90);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [omega1, omega2, simType, isPlaying]);

  const resetSim = () => {
    timeRef.current = 0;
  };

  return (
    <div className="bg-white/60 backdrop-blur-md border border-slate-100 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/20 via-orange-50/10 to-transparent -z-10 animate-pulse duration-10000" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="text-sky-500 w-5 h-5" /> 物理动力学互动沙盒
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            将枯燥的公式变为可视化的几何运动，助力深度物理洞察
          </p>
        </div>

        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setSimType('lissajous'); resetSim(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${simType === 'lissajous' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            利萨如图形(题1)
          </button>
          <button
            onClick={() => { setSimType('rolling'); resetSim(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${simType === 'rolling' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            滑动与纯滚动(题19)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 控制板 */}
        <div className="md:col-span-1 space-y-5 bg-slate-50/80 backdrop-blur border border-slate-200/50 p-4 rounded-2xl">
          <div className="flex items-center gap-2 font-semibold text-sm text-slate-700">
            <Settings className="w-4 h-4 text-orange-500" /> 参数控制
          </div>

          {simType === 'lissajous' ? (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  X轴角频率 ($\omega_1$): <span className="font-bold text-orange-500 font-serif ml-1">{omega1}</span>
                </label>
                <input
                  type="range" min="1" max="10" step="1" value={omega1}
                  onChange={(e) => setOmega1(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  Y轴角频率 ($\omega_2$): <span className="font-bold text-sky-500 font-serif ml-1">{omega2}</span>
                </label>
                <input
                  type="range" min="1" max="10" step="1" value={omega2}
                  onChange={(e) => setOmega2(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>
            </>
          ) : (
            <div className="text-xs text-slate-500 leading-relaxed bg-sky-50/50 p-3 rounded-xl border border-sky-100 text-sky-700">
              <span className="font-bold text-sky-600 block mb-1">动力学情景</span>
              初速度 $v_0$ 平推球壳，地面摩擦力使它做减速运动，并提供摩擦力矩产生角加速度。$v_c$ 与 $\omega R$ 最终实现交融。
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-white text-xs font-medium bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />} {isPlaying ? '暂停' : '启动'}
            </button>
            <button
              onClick={resetSim}
              className="p-2 text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:shadow-sm"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* 画布 */}
        <div className="md:col-span-3 relative flex items-center justify-center border border-slate-200/60 rounded-2xl bg-slate-900/5 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={550}
            height={320}
            className="w-full max-w-full h-auto aspect-[550/320]"
          />
        </div>
      </div>
    </div>
  );
};

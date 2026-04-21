import React from 'react';
import { Award, CheckCircle2, AlertTriangle, CornerRightUp, Sparkles } from 'lucide-react';
import { Question } from '../types';

interface EvaluationProps {
  questions: Question[];
  userAnswers: { [key: number]: string | string[] };
  onRestart: () => void;
}

export const Evaluation: React.FC<EvaluationProps> = ({ questions, userAnswers, onRestart }) => {
  const categories = ['运动学', '动力学', '功与能', '刚体动力学', '狭义相对论'] as const;

  // 评估各科目得分率
  const stats = categories.map((cat) => {
    const catQs = questions.filter((q) => q.category === cat);
    const totalScore = catQs.reduce((sum, q) => sum + q.score, 0);
    const earnedScore = catQs.reduce((sum, q) => {
      const uAns = userAnswers[q.id];
      const isCorrect = Array.isArray(q.answer)
        ? JSON.stringify(uAns) === JSON.stringify(q.answer)
        : String(uAns).trim().toUpperCase() === String(q.answer).toUpperCase();
      return isCorrect ? sum + q.score : sum;
    }, 0);

    return {
      category: cat,
      total: totalScore,
      earned: earnedScore,
      ratio: totalScore > 0 ? earnedScore / totalScore : 1,
    };
  });

  const totalPossible = questions.reduce((sum, q) => sum + (q.type === 'subjective' ? 0 : q.score), 0); // 客观题总分
  const totalEarned = stats.reduce((sum, s) => sum + s.earned, 0);

  // SVG 雷达多边形坐标
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 60;
  
  const getPoint = (index: number, r: number) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const bgPoints = Array.from({ length: 5 }).map((_, i) => getPoint(i, radius));
  const innerPoints = Array.from({ length: 5 }).map((_, i) => getPoint(i, radius * 0.5));

  const statsPoints = stats.map((s, i) => {
    // 保证最小有一点点显示
    const r = radius * Math.max(0.2, s.ratio);
    return getPoint(i, r);
  });

  const getPointsStr = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/40 max-w-4xl mx-auto flex flex-col items-center">
      <Award className="w-14 h-14 text-orange-500 animate-bounce mb-2" />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-rose-500 to-sky-600 bg-clip-text text-transparent">
        《大学物理》学情报告已生成
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
        {/* 左侧：得分与雷达图 */}
        <div className="flex flex-col items-center justify-center bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
          <div className="text-center mb-4">
            <span className="text-xs text-slate-400 font-medium tracking-widest block uppercase">客观题成绩</span>
            <div className="text-5xl font-extrabold text-slate-800 mt-1 flex items-baseline justify-center">
              {totalEarned} <span className="text-xl text-slate-400 font-normal">/ {totalPossible}</span>
            </div>
          </div>

          {/* SVG 雷达图 */}
          <svg width={size} height={size} className="overflow-visible mt-2">
            {/* 网格线背景 */}
            <polygon points={getPointsStr(bgPoints)} className="fill-slate-100 stroke-slate-200" strokeWidth="1" />
            <polygon points={getPointsStr(innerPoints)} className="fill-none stroke-slate-200/50" strokeWidth="1" strokeDasharray="3 2" />
            {categories.map((_, i) => {
              const p = getPoint(i, radius);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} className="stroke-slate-200" strokeWidth="1" />;
            })}

            {/* 得分多边形 */}
            <polygon
              points={getPointsStr(statsPoints)}
              className="fill-orange-500/20 stroke-orange-500 animate-pulse duration-3000"
              strokeWidth="2"
            />

            {/* 标签 */}
            {categories.map((cat, i) => {
              const p = getPoint(i, radius + 20);
              return (
                <text
                  key={cat}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[10px] font-bold fill-slate-500"
                >
                  {cat}
                </text>
              );
            })}
          </svg>
        </div>

        {/* 右侧：考点诊断 */}
        <div className="space-y-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Sparkles className="w-5 h-5 text-sky-500" /> 知识诊断图谱
          </div>
          {stats.map((s) => (
            <div key={s.category} className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  {s.ratio >= 0.8 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                  {s.category}
                </span>
                <span className="text-slate-500 font-serif">
                  得分率 {(s.ratio * 100).toFixed(0)}% ({s.earned}/{s.total}分)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    s.ratio >= 0.8 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-orange-400 to-rose-500'
                  }`}
                  style={{ width: `${s.ratio * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-orange-500/20 active:scale-95 transition-all"
      >
        <CornerRightUp size={16} /> 再次模拟 / 激活思维
      </button>
    </div>
  );
};

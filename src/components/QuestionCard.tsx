import React from 'react';
import { Lightbulb, Check, X, ShieldAlert, Award } from 'lucide-react';
import { Question } from '../types';
import { MathRenderer } from './MathRenderer';

interface QuestionCardProps {
  question: Question;
  userAnswer: string | string[];
  onChangeAnswer: (qId: number, ans: string | string[]) => void;
  showResult: boolean; // 是否展示正确答案与解析
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  onChangeAnswer,
  showResult,
}) => {
  const isCorrect = Array.isArray(question.answer)
    ? JSON.stringify(userAnswer) === JSON.stringify(question.answer)
    : String(userAnswer).trim().toUpperCase() === String(question.answer).toUpperCase();

  const handleOptionSelect = (optionChar: string) => {
    if (showResult) return; // 已锁答
    onChangeAnswer(question.id, optionChar);
  };

  const handleFillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAnswer(question.id, e.target.value);
  };

  // 判定流光样式
  let glowStyle = 'border-slate-200/60 bg-white/60';
  if (showResult) {
    glowStyle = isCorrect
      ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] bg-emerald-50/10'
      : 'border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)] bg-rose-50/10';
  }

  return (
    <div
      className={`relative p-6 border-2 rounded-3xl transition-all duration-300 backdrop-blur-md ${glowStyle} hover:shadow-lg`}
    >
      {/* 题号与分类徽章 */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg">
          {question.category} (分值: {question.score})
        </span>
        {showResult && (
          <span className={`flex items-center gap-1 text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
            {isCorrect ? <Check size={14} className="stroke-[3]" /> : <X size={14} className="stroke-[3]" />}
            {isCorrect ? '回答正确' : '回答错误'}
          </span>
        )}
      </div>

      {/* 题干 */}
      <div className="text-slate-800 font-medium text-sm mb-5">
        <span className="font-serif font-bold text-slate-400 mr-1">{question.id}.</span>
        <MathRenderer text={question.title} />
      </div>

      {/* 答题区 */}
      {question.type === 'choice' && question.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {question.options.map((opt, idx) => {
            const char = String.fromCharCode(65 + idx); // 'A', 'B', 'C', 'D'
            const isSelected = userAnswer === char;

            let optStyle = 'border-slate-100 hover:bg-slate-50 text-slate-600';
            if (isSelected) optStyle = 'border-orange-400 bg-orange-50 text-orange-700';

            if (showResult) {
              if (char === question.answer) {
                optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-700 font-bold';
              } else if (isSelected && !isCorrect) {
                optStyle = 'border-red-300 bg-rose-50 text-red-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleOptionSelect(char)}
                className={`flex items-start text-left p-3 border-2 rounded-2xl text-xs transition duration-200 ${optStyle}`}
              >
                <span className="font-serif font-bold mr-2">{char}.</span>
                <MathRenderer text={opt.replace(/^\([A-D]\)\s*/, '')} />
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'fill' && (
        <div className="mb-5 flex flex-col md:flex-row md:items-center gap-3">
          <label className="text-xs font-semibold text-slate-500">填写您的作答：</label>
          <input
            type="text"
            disabled={showResult}
            value={(userAnswer as string) || ''}
            onChange={handleFillChange}
            placeholder="使用半角英文表达如 v_0 * tan\phi"
            className="px-4 py-2 text-xs border border-slate-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full md:w-64 transition"
          />
        </div>
      )}

      {question.type === 'subjective' && (
        <div className="mb-5 flex flex-col md:flex-row md:items-center gap-3 bg-slate-50/70 p-3 rounded-2xl border border-dashed border-slate-200">
          <span className="text-xs text-slate-500">主观题/计算题不计入系统打分，请利用草稿板书写作。</span>
          {(!showResult) && (
            <button
              onClick={() => onChangeAnswer(question.id, 'submitted')}
              className="px-3 py-1 bg-white text-xs border border-slate-200 hover:border-orange-400 rounded-xl font-medium text-slate-700 shadow-sm"
            >
              标记已构思
            </button>
          )}
        </div>
      )}

      {/* 提示/解析展示 (交卷或训练时) */}
      {showResult && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
          <div className="text-xs leading-relaxed text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1 mb-2">
              <Lightbulb className="w-4 h-4 text-emerald-500" /> 详尽物理图像推演：
            </span>
            <MathRenderer text={question.analysis} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50" />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* 重点 */}
            {question.keyPoints.length > 0 && (
              <div className="flex-1 bg-orange-50/60 border border-orange-100/50 p-3 rounded-2xl">
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1 mb-1">
                  <Award size={14} /> 考察重点（亮橙色标注）
                </span>
                <ul className="list-disc list-inside text-slate-600 text-xs pl-1">
                  {question.keyPoints.map((kp, i) => (
                    <li key={i}>{kp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 易错点 */}
            {question.trapPoints.length > 0 && (
              <div className="flex-1 bg-sky-50/60 border border-sky-100/50 p-3 rounded-2xl">
                <span className="text-xs font-bold text-sky-600 flex items-center gap-1 mb-1">
                  <ShieldAlert size={14} /> 易错避坑（天蓝色强调）
                </span>
                <ul className="list-disc list-inside text-slate-600 text-xs pl-1">
                  {question.trapPoints.map((tp, i) => (
                    <li key={i}>{tp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

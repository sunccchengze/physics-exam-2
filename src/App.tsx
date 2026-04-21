import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Layers, Send, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { Sandbox } from './components/Sandbox';
import { DraftPad } from './components/DraftPad';
import { Evaluation } from './components/Evaluation';

export const App: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'exam' | 'sandbox' | 'stats'>('exam');
  const [mode, setMode] = useState<'train' | 'exam'>('exam'); // 'train': 练习模式(实时解析), 'exam': 模拟考
  const [showDraft, setShowDraft] = useState<boolean>(false);

  // 计时器逻辑
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleAnswerChange = (qId: number, ans: string | string[]) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: ans }));
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setActiveTab('stats');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleRestart = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeSpent(0);
    setActiveTab('exam');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 relative overflow-hidden flex flex-col antialiased">
      {/* 弥散光晕效果背景 */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-sky-300/30 to-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse duration-10000" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/20 to-amber-100/30 rounded-full blur-3xl -z-10 animate-bounce duration-10000" />

      {/* 顶部主导航区 */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl text-white shadow-md shadow-orange-500/10">
            <Compass size={22} className="animate-spin duration-10000" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 font-sans">
              《大学物理》拔高模拟卷 <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/80 text-slate-500 font-medium font-serif">A 卷</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">覆盖内容：运动学、动力学、功与能、刚体动力学、狭义相对论</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 计时器 */}
          <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border border-slate-200/60 text-slate-600 rounded-xl font-serif text-sm">
            <Clock size={16} className="text-orange-500" />
            {formatTime(timeSpent)}
          </div>

          {/* 状态切换与按钮 */}
          <div className="flex gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/40">
            <button
              onClick={() => { setMode('exam'); if (isSubmitted) handleRestart(); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === 'exam' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              模拟考模式
            </button>
            <button
              onClick={() => setMode('train')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === 'train' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              沉浸式练习
            </button>
          </div>
        </div>
      </header>

      {/* 页面内容分区 */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧侧边导航栏 */}
        <div className="lg:col-span-1 space-y-4">
          <nav className="flex flex-col gap-2 bg-white/60 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-sm">
            <button
              onClick={() => setActiveTab('exam')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${activeTab === 'exam' ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <BookOpen size={16} /> 答题板块
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${activeTab === 'sandbox' ? 'bg-gradient-to-r from-sky-400 to-indigo-400 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Layers size={16} /> 物理沙盒仿真
            </button>
            {isSubmitted && (
              <button
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${activeTab === 'stats' ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Sparkles size={16} /> 学情多维分析
              </button>
            )}
          </nav>

          {/* 草稿纸悬浮开启工具 */}
          <div className="bg-white/60 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-sm">
            <button
              onClick={() => setShowDraft(!showDraft)}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-xs font-bold transition ${showDraft ? 'border-orange-500/80 bg-orange-50 text-orange-600 shadow-inner' : 'border-dashed border-slate-300 text-slate-500 hover:border-slate-400'}`}
            >
              {showDraft ? '收起演算面板' : '呼出演算纸'}
            </button>

            {showDraft && (
              <div className="mt-4 animate-fadeIn">
                <DraftPad />
              </div>
            )}
          </div>
        </div>

        {/* 右侧核心面板 */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'exam' && (
            <div className="space-y-6">
              {questions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  userAnswer={userAnswers[q.id] || ''}
                  onChangeAnswer={handleAnswerChange}
                  showResult={isSubmitted || mode === 'train'}
                />
              ))}

              {!isSubmitted && mode === 'exam' && (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Send size={18} /> 提交评估卷
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sandbox' && <Sandbox />}

          {activeTab === 'stats' && isSubmitted && (
            <Evaluation
              questions={questions}
              userAnswers={userAnswers}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      <footer className="bg-white/40 border-t border-slate-200/30 text-center py-4 text-[10px] text-slate-400 mt-10">
        物理引擎仿真中心 & 高阶教育诊断系统
      </footer>
    </div>
  );
};

export default App;

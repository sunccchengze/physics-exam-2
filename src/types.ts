export interface Question {
  id: number;
  type: 'choice' | 'fill' | 'subjective';
  category: '运动学' | '动力学' | '功与能' | '刚体动力学' | '狭义相对论';
  score: number;
  title: string;
  options?: string[]; // 仅选择题
  answer: string | string[]; // 正确答案
  analysis: string; // 详细解析(LaTeX)
  keyPoints: string[]; // 重点内容 (亮橙色标注)
  trapPoints: string[]; // 易错点 (天蓝色强调)
}

export interface ExamState {
  answers: { [key: number]: string | string[] };
  isSubmitted: boolean;
  score: number;
  timeSpent: number; // 秒
  currentTab: 'exam' | 'sandbox' | 'stats';
}

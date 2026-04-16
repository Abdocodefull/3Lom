import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Cloud, 
  Combine, 
  Link as LinkIcon, 
  Layers, 
  FlaskConical, 
  Thermometer, 
  Box, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  BookOpen,
  BrainCircuit,
  GraduationCap,
  Menu,
  X,
  CloudRain,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TOPICS, QUIZ_QUESTIONS, Topic } from './constants';

const IconMap: Record<string, any> = {
  Zap,
  Cloud,
  Combine,
  Link: LinkIcon,
  Layers,
  FlaskConical,
  Thermometer,
  Box,
  CloudRain,
  Eye
};

const ColorMap: Record<string, string> = {
  amber: 'bg-surface text-accent border-border',
  blue: 'bg-surface text-accent border-border',
  emerald: 'bg-surface text-accent border-border',
  indigo: 'bg-surface text-accent border-border',
  purple: 'bg-surface text-accent border-border',
  rose: 'bg-surface text-accent border-border',
  cyan: 'bg-surface text-accent border-border',
  slate: 'bg-surface text-accent border-border',
  orange: 'bg-surface text-accent border-border',
};

const AccentMap: Record<string, string> = {
  amber: 'bg-accent',
  blue: 'bg-accent',
  emerald: 'bg-accent',
  indigo: 'bg-accent',
  purple: 'bg-accent',
  rose: 'bg-accent',
  cyan: 'bg-accent',
  slate: 'bg-accent',
  orange: 'bg-accent',
};

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState<string>(TOPICS[0].id);
  const [viewMode, setViewMode] = useState<'learn' | 'quiz' | 'lab'>('learn');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Lab State
  const [phValue, setPhValue] = useState(7);
  const [flameElement, setFlameElement] = useState<string | null>(null);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const activeTopic = useMemo(() => 
    TOPICS.find(t => t.id === activeTopicId) || TOPICS[0], 
  [activeTopicId]);

  const handleTopicChange = (id: string) => {
    setActiveTopicId(id);
    setViewMode('learn');
    setIsSidebarOpen(false);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_QUESTIONS[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const getPhColor = (val: number) => {
    if (val < 7) return 'from-red-500 to-orange-400';
    if (val === 7) return 'from-green-400 to-green-600';
    return 'from-blue-400 to-purple-600';
  };

  const getPhType = (val: number) => {
    if (val < 7) return 'حمضي';
    if (val === 7) return 'متعادل';
    return 'قاعدي';
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-white" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-bg font-black">
                +
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter text-accent leading-none">
                  كيمياء بلس.ai
                </h1>
                <span className="text-[10px] text-muted font-bold mt-1">
                  تم التطوير من عبدالرحمن لأخيه معتصم محمد في خلال عشر دقايق
                </span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-muted">
            <button 
              onClick={() => setViewMode('learn')}
              className={`transition-colors ${viewMode === 'learn' ? 'text-accent' : 'hover:text-white'}`}
            >
              الرئيسية
            </button>
            <button 
              onClick={() => setViewMode('quiz')}
              className={`transition-colors ${viewMode === 'quiz' ? 'text-accent' : 'hover:text-white'}`}
            >
              الاختبارات
            </button>
            <button 
              onClick={() => setViewMode('lab')}
              className={`transition-colors ${viewMode === 'lab' ? 'text-accent' : 'hover:text-white'}`}
            >
              المعمل
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
            <div className="w-2 h-2 rounded-full bg-[#00FF88]"></div> متصل الآن
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-6rem)]">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-0 z-50 lg:relative lg:z-0 lg:block
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out
          border-l border-border bg-bg w-72
        `}>
          {/* Backdrop */}
          {isSidebarOpen && (
            <div 
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <div className="relative h-full p-10 overflow-y-auto flex flex-col gap-10">
            <div className="flex items-center justify-between lg:hidden">
              <span className="font-black text-accent">المواضيع</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <p className="sidebar-header">الدروس</p>
              <div className="space-y-2">
                {TOPICS.map((topic) => {
                  const isActive = activeTopicId === topic.id && viewMode === 'learn';
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicChange(topic.id)}
                      className={`
                        w-full flex flex-col items-start p-4 rounded-xl text-right transition-all border
                        ${isActive 
                          ? 'bg-surface border-accent text-accent' 
                          : 'bg-surface border-border text-muted hover:border-muted hover:text-white'}
                      `}
                    >
                      <span className="text-sm font-bold">{topic.title}</span>
                      <span className="text-[10px] opacity-60">استكشاف الخصائص</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <p className="sidebar-header">أدوات إضافية</p>
              <div className="space-y-2">
                <button
                  onClick={() => { setViewMode('lab'); setIsSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 p-4 rounded-xl text-right transition-all border
                    ${viewMode === 'lab' 
                      ? 'bg-surface border-accent text-accent' 
                      : 'bg-surface border-border text-muted hover:border-muted hover:text-white'}
                  `}
                >
                  <FlaskConical className="w-5 h-5" />
                  <span className="text-sm font-bold">المعمل الافتراضي</span>
                </button>
                <button
                  onClick={() => { setViewMode('quiz'); setIsSidebarOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 p-4 rounded-xl text-right transition-all border
                    ${viewMode === 'quiz' 
                      ? 'bg-surface border-accent text-accent' 
                      : 'bg-surface border-border text-muted hover:border-muted hover:text-white'}
                  `}
                >
                  <BrainCircuit className="w-5 h-5" />
                  <span className="text-sm font-bold">بنك الأسئلة</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 lg:p-20 overflow-y-auto">
          <AnimatePresence mode="wait">
            {viewMode === 'learn' ? (
              <motion.div
                key={activeTopic.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {/* Topic Header */}
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                    محتوى تعليمي
                  </span>
                  <h2 className="hero-title mb-8">{activeTopic.title}</h2>
                  <p className="text-xl text-muted leading-relaxed">
                    استكشف خصائص {activeTopic.title} وأهم المعلومات المتعلقة بها من واقع المنهج الدراسي بأسلوب عصري.
                  </p>
                </div>

                {/* Content Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-surface p-10 rounded-[2rem] border border-border">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-accent rounded-full" />
                      الخصائص
                    </h3>
                    <ul className="space-y-6">
                      {activeTopic.content.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-muted leading-relaxed font-medium">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-10">
                    {activeTopic.examples && (
                      <div className="bg-surface p-10 rounded-[2rem] border border-border">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                          <div className="w-1.5 h-8 bg-accent rounded-full" />
                          أمثلة
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {activeTopic.examples.map((ex, idx) => (
                            <div key={idx} className="p-4 bg-bg border border-border rounded-2xl flex flex-col items-center justify-center text-center hover:border-accent transition-colors">
                              <span className="text-[10px] text-accent font-black mb-1">{ex.symbol}</span>
                              <span className="font-bold">{ex.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : viewMode === 'lab' ? (
              <motion.div
                key="lab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="max-w-3xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6">
                    المعمل الافتراضي
                  </span>
                  <h2 className="hero-title mb-8">استكشف الكيمياء عملياً</h2>
                  <p className="text-xl text-muted leading-relaxed">
                    تفاعل مع الأدوات الكيميائية واكتشف النتائج في بيئة آمنة وممتعة.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* pH Tester */}
                  <div className="bg-surface p-10 rounded-[2rem] border border-border">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-accent rounded-full" />
                      مختبر الرقم الهيدروجيني (pH)
                    </h3>
                    
                    <div className="space-y-10">
                      <div className="relative h-4 bg-border rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-l from-red-500 via-green-500 to-blue-500" />
                        <motion.div 
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]"
                          animate={{ left: `${(phValue / 14) * 100}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center bg-bg p-8 rounded-2xl border border-border">
                        <div className="text-center">
                          <span className="sidebar-header block mb-2">القيمة</span>
                          <span className="text-5xl font-black text-accent">{phValue}</span>
                        </div>
                        <div className="text-center">
                          <span className="sidebar-header block mb-2">النوع</span>
                          <span className={`text-2xl font-black bg-gradient-to-r ${getPhColor(phValue)} bg-clip-text text-transparent`}>
                            {getPhType(phValue)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'ليمون', val: 2 },
                          { name: 'ماء', val: 7 },
                          { name: 'صابون', val: 12 },
                          { name: 'خل', val: 3 },
                          { name: 'حليب', val: 6 },
                          { name: 'منظف', val: 13 }
                        ].map((item) => (
                          <button
                            key={item.name}
                            onClick={() => setPhValue(item.val)}
                            className="p-4 bg-bg border border-border rounded-xl font-bold hover:border-accent transition-colors"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Flame Test */}
                  <div className="bg-surface p-10 rounded-[2rem] border border-border">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-accent rounded-full" />
                      اختبار اللهب
                    </h3>
                    
                    <div className="flex flex-col items-center gap-10">
                      <div className="relative w-48 h-64 flex items-end justify-center">
                        {/* Burner */}
                        <div className="w-12 h-24 bg-zinc-800 rounded-t-lg border-x border-t border-zinc-700" />
                        {/* Flame */}
                        <AnimatePresence mode="wait">
                          {flameElement && (
                            <motion.div
                              key={flameElement}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              className={`absolute bottom-24 w-24 h-40 rounded-full blur-xl opacity-80
                                ${flameElement === 'النحاس' ? 'bg-emerald-400' : 
                                  flameElement === 'الليثيوم' ? 'bg-rose-500' : 
                                  flameElement === 'الصوديوم' ? 'bg-amber-400' : 
                                  flameElement === 'البوتاسيوم' ? 'bg-purple-400' : 'bg-blue-400'}
                              `}
                            />
                          )}
                        </AnimatePresence>
                        <div className="absolute bottom-24 w-12 h-24 bg-blue-500/30 rounded-full blur-md" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full">
                        {['النحاس', 'الليثيوم', 'الصوديوم', 'البوتاسيوم'].map((el) => (
                          <button
                            key={el}
                            onClick={() => setFlameElement(el)}
                            className={`p-4 rounded-xl font-bold border transition-all
                              ${flameElement === el ? 'bg-accent text-bg border-accent' : 'bg-bg border-border text-muted hover:border-muted'}
                            `}
                          >
                            {el}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted font-bold">اختر عنصراً لمشاهدة لون لهبه المميز</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto"
              >
                {!showResult ? (
                  <div className="bg-surface p-12 lg:p-20 rounded-[3rem] border border-border">
                    <div className="flex justify-between items-end mb-12">
                      <div>
                        <span className="sidebar-header block mb-2">السؤال</span>
                        <span className="text-5xl font-black text-accent">{currentQuestion + 1} <span className="text-muted text-2xl">/ {QUIZ_QUESTIONS.length}</span></span>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-bg font-black text-2xl">
                        ?
                      </div>
                    </div>

                    <h3 className="text-3xl font-black mb-12 leading-tight">
                      {QUIZ_QUESTIONS[currentQuestion].question}
                    </h3>

                    <div className="space-y-4 mb-12">
                      {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrect = QUIZ_QUESTIONS[currentQuestion].answer === idx;
                        
                        let buttonClass = "w-full p-6 rounded-2xl text-right font-bold transition-all border-2 flex items-center justify-between group ";
                        if (!isAnswered) {
                          buttonClass += "bg-bg border-border hover:border-accent text-muted hover:text-white";
                        } else {
                          if (isCorrect) {
                            buttonClass += "bg-accent/10 border-accent text-accent";
                          } else if (isSelected) {
                            buttonClass += "bg-rose-500/10 border-rose-500 text-rose-500";
                          } else {
                            buttonClass += "bg-bg border-border text-muted/30";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            disabled={isAnswered}
                            className={buttonClass}
                          >
                            <span>{option}</span>
                            {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={nextQuestion}
                        disabled={!isAnswered}
                        className={`
                          px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all
                          ${isAnswered 
                            ? 'bg-accent text-bg shadow-xl shadow-accent/20 hover:scale-105' 
                            : 'bg-border text-muted cursor-not-allowed'}
                        `}
                      >
                        {currentQuestion + 1 === QUIZ_QUESTIONS.length ? 'إنهاء' : 'التالي'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface p-20 rounded-[3rem] border border-border text-center">
                    <div className="mb-10 inline-flex p-8 bg-accent/10 rounded-full text-accent">
                      <CheckCircle2 className="w-20 h-20" />
                    </div>
                    <h2 className="text-6xl font-black mb-6">انتهى التحدي.</h2>
                    <p className="text-muted mb-12 text-xl">لقد قمت بتحويل الصور إلى معرفة حقيقية.</p>
                    
                    <div className="bg-bg p-12 rounded-[2rem] border border-border mb-12">
                      <span className="sidebar-header block mb-4">النتيجة النهائية</span>
                      <div className="text-8xl font-black text-accent">{score} <span className="text-muted text-4xl">/ {QUIZ_QUESTIONS.length}</span></div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <button
                        onClick={resetQuiz}
                        className="px-12 py-6 bg-accent text-bg rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform"
                      >
                        إعادة المحاولة
                      </button>
                      <button
                        onClick={() => setViewMode('learn')}
                        className="px-12 py-6 bg-bg border border-border text-white rounded-full font-black uppercase tracking-widest hover:border-accent transition-colors"
                      >
                        العودة للدروس
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-bg">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-bg font-black">
              +
            </div>
            <span className="text-xl font-black tracking-tighter text-accent">كيمياء بلس.ai</span>
          </div>
          <p className="text-muted text-sm font-bold uppercase tracking-widest">
            تم التطوير من عبدالرحمن لأخيه معتصم محمد في خلال عشر دقايق
          </p>
        </div>
      </footer>
    </div>
  );
}

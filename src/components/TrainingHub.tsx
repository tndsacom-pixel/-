import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Clock, Award, CheckCircle2, ChevronLeft, ArrowRight, Play, BookMarked, HelpCircle, Trophy } from 'lucide-react';
import { Course, BeneficiaryProfile, Lesson, QuizQuestion } from '../types';

interface TrainingHubProps {
  profile: BeneficiaryProfile;
  courses: Course[];
  onUpdateCourses: (updatedCourses: Course[]) => void;
}

export default function TrainingHub({ profile, courses, onUpdateCourses }: TrainingHubProps) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  
  // Quiz taking state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // States for Suggestions 21-25
  const [certName, setCertName] = useState<string>(profile.name || 'أم يوسف الهذلي');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceScore, setVoiceScore] = useState<number | null>(null);
  const [syncCalendar, setSyncCalendar] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [workshopComments, setWorkshopComments] = useState([
    { id: 1, author: 'منيرة الدوسري', text: 'شرح فنجان هيف وكيف واضح جداً، تبارك الله!' },
    { id: 2, author: 'خديجة الهذلي', text: 'هل اللقاء مسجل للمراجعة يا أستاذ؟' },
    { id: 3, author: 'أم فهد (مطبخ مكة)', text: 'طريقتكم في تحميص الهيل ممتازة، جربتها اليوم وعجبت الوفود.' }
  ]);

  const activeCourse = courses.find(c => c.id === activeCourseId) || null;
  const activeLesson = activeCourse?.lessons.find(l => l.id === activeLessonId) || null;

  const selectCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    const course = courses.find(c => c.id === courseId);
    if (course && course.lessons.length > 0) {
      setActiveLessonId(course.lessons[0].id);
    }
    setShowQuiz(false);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setShowQuiz(false);
  };

  const handleCompleteLesson = () => {
    if (!activeCourse || !activeLesson) return;

    // Add to completed lessons
    const isCompleted = activeCourse.completedLessons.includes(activeLesson.id);
    let updatedCompletedLessons = [...activeCourse.completedLessons];
    if (!isCompleted) {
      updatedCompletedLessons.push(activeLesson.id);
    }

    // Check if all lessons are read
    const allLessonsRead = activeCourse.lessons.every(l => updatedCompletedLessons.includes(l.id));

    const updatedCourses = courses.map(c => {
      if (c.id === activeCourse.id) {
        return {
          ...c,
          completedLessons: updatedCompletedLessons,
          completed: allLessonsRead && c.quizPassed
        };
      }
      return c;
    });

    onUpdateCourses(updatedCourses);

    // Auto-advance to next lesson or show quiz
    const currentIdx = activeCourse.lessons.findIndex(l => l.id === activeLesson.id);
    if (currentIdx < activeCourse.lessons.length - 1) {
      setActiveLessonId(activeCourse.lessons[currentIdx + 1].id);
    } else {
      setShowQuiz(true);
    }
  };

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qId]: optIndex
    });
  };

  const handleSubmitQuiz = () => {
    if (!activeCourse) return;
    
    let correctCount = 0;
    activeCourse.quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const isPassed = correctCount === activeCourse.quiz.questions.length;
    setQuizScore(correctCount);
    setQuizSubmitted(true);

    if (isPassed) {
      const updatedCourses = courses.map(c => {
        if (c.id === activeCourse.id) {
          const allLessonsRead = c.lessons.every(l => c.completedLessons.includes(l.id));
          return {
            ...c,
            quizPassed: true,
            completed: allLessonsRead
          };
        }
        return c;
      });
      onUpdateCourses(updatedCourses);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="training-hub-card">
      {/* Dynamic Navigation Header */}
      <div className="bg-primary text-stone-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4" id="academy-header">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">مسار التأهيل والتمكين الأكاديمي</h2>
            <p className="text-stone-300 text-xs mt-0.5">مسارات تأهيلية مكثفة تبدأ بتهيئة الجانب المهني، المالي والتسويقي وتنتهي بإصدار شهادات معتمدة.</p>
          </div>
        </div>
        
        {activeCourseId && (
          <button
            onClick={() => setActiveCourseId(null)}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/15 text-accent px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 self-start md:self-auto"
            id="back-to-courses-btn"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لكافة المسارات</span>
          </button>
        )}
      </div>

      <div className="p-6 md:p-8">
        {!activeCourseId ? (
          /* List of Courses Grid */
          <div className="space-y-6" id="courses-grid-view">
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-stone-800 text-sm md:text-base">تأهيل المستفيد ورفع جاهزيته</h3>
                <p className="text-stone-500 text-xs mt-1">المسارات المقترحة لتهيئة مشروعك للمبيعات، الحصول على التراخيص والجاهزية للتوسع والتمكين.</p>
              </div>
              <div className="flex items-center gap-2 text-stone-600 font-mono text-xs">
                <span>المكتمل:</span>
                <span className="font-black text-primary bg-primary/5 px-2.5 py-1 rounded-full">{courses.filter(c => c.completed).length} من {courses.length} مسارات</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course) => {
                const totalCompleted = course.completedLessons.length;
                const progressPct = course.lessons.length > 0 ? (totalCompleted / course.lessons.length) * 100 : 0;
                
                return (
                  <div
                    key={course.id}
                    className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="bg-primary/5 p-2.5 rounded-xl text-primary flex-shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex gap-1.5 items-center">
                          {course.quizPassed && (
                            <span className="bg-accent/10 text-accent border border-accent/20 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              <span>كويز ناجح</span>
                            </span>
                          )}
                          {course.completed ? (
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">مكتمل 🏆</span>
                          ) : (
                            <span className="bg-stone-100 text-stone-500 font-bold px-2 py-0.5 rounded text-[10px] font-mono">تأهيلي</span>
                          )}
                        </div>
                      </div>

                      <h4 className="font-bold text-stone-800 text-base leading-snug">{course.title}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed font-light line-clamp-2">{course.description}</p>
                    </div>

                    <div className="mt-5 space-y-4 pt-4 border-t border-stone-100">
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                          <span>التقدم: {totalCompleted}/{course.lessons.length} درس</span>
                          <span>{Math.round(progressPct)}%</span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${progressPct}%` }}></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </span>
                        
                        <button
                          onClick={() => selectCourse(course.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            course.completed
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-primary text-accent hover:bg-primary/95'
                          }`}
                        >
                          {course.completed ? 'مراجعة المنهج' : totalCompleted > 0 ? 'متابعة التعلم' : 'ابدأ المسار'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggestions 22 & 23: Interactive Culinary Skills Map Tree & Dynamic Calendar Schedule Sync */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Culinary Skills Map Tree */}
              <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4 text-right">
                <div className="space-y-1">
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full border border-primary/10 inline-block">شجرة مهارات الموروث السعودي</span>
                  <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">خارطة التميز المهني والتمويل الذاتي</h4>
                  <p className="text-stone-500 text-[10px] leading-relaxed font-light">
                    انقر على المهارات لمشاهدة الترابط المهني. كل مستوى تكتمله يرفع وسم جدارة مشروعك الائتمانية.
                  </p>
                </div>

                {/* SVG/Interactive node tree mockup */}
                <div className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col items-center gap-4 relative overflow-hidden min-h-[180px]">
                  <div className="flex flex-col items-center gap-1 bg-primary text-accent p-2.5 rounded-xl border border-accent/20 text-center w-40 z-10 shadow-xs">
                    <span className="text-[9px] font-mono block">المستوى الأساسي 1</span>
                    <span className="font-bold text-[10px] block">أساسيات الضيافة والدلة</span>
                    <span className="text-[8px] bg-emerald-600 px-1 py-0.2 rounded mt-1 text-white">✓ مكتمل 100%</span>
                  </div>

                  {/* Connective lines */}
                  <div className="w-0.5 h-6 bg-stone-300"></div>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col items-center gap-1 bg-[#1e4620] text-accent p-2.5 rounded-xl border border-white/10 text-center z-10 shadow-xs">
                      <span className="text-[9px] font-mono block">المستوى المتقدم 2</span>
                      <span className="font-bold text-[10px] block">إعداد الهيل وتحميص البُن</span>
                      <span className="text-[8px] bg-amber-600 px-1 py-0.2 rounded mt-1 text-stone-800 font-bold">قيد الدراسة 40%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 bg-[#2b592e]/10 border border-dashed border-stone-300 text-stone-600 p-2.5 rounded-xl text-center z-10 shadow-xs">
                      <span className="text-[9px] font-mono block">المستوى المتقدم 2</span>
                      <span className="font-bold text-[10px] block">طهي لحم الحاشي والحنيذ</span>
                      <span className="text-[8px] bg-stone-200 px-1 py-0.2 rounded mt-1 text-stone-500">مغلق مؤقتاً</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 pointer-events-none opacity-5 bg-gradient-to-tr from-accent to-transparent"></div>
                </div>
              </div>

              {/* Dynamic Training Schedule Sync and Reminder */}
              <div className="bg-gradient-to-br from-primary to-[#0c3c20] text-white p-5 rounded-3xl space-y-4 text-right shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-2xl"></div>
                <div className="space-y-1">
                  <span className="text-[10px] bg-accent/25 text-accent font-bold px-2.5 py-0.5 rounded-full border border-accent/20 inline-block">مواعيد المحاضرات التفاعلية</span>
                  <h4 className="font-extrabold text-white text-xs md:text-sm">اللقاءات الحية وجدول البث المباشر</h4>
                  <p className="text-stone-300 text-[10px] leading-relaxed font-light">
                    سجل تذكيرك باللقاء القادم مع الخبراء والمدربين المعتمدين لمناقشة تحديات الطهي والتمويل بدون كفيل.
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-accent">اللقاء القادم:</span>
                    <span className="font-mono text-[10px] text-stone-300">اليوم، الساعة 08:30 م</span>
                  </div>
                  <h5 className="font-bold text-white text-xs leading-snug">"تكتيكات الضيافة التراثية ومقاييس جودة البن السعودي"</h5>
                  <p className="text-stone-300 text-[9px] font-light">مع الخبير: أ.د. فواز الشمري - مستشار جودة المأكولات الوطنية</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSyncCalendar(true);
                    setTimeout(() => setSyncCalendar(false), 3000);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md text-center block ${
                    syncCalendar
                      ? 'bg-emerald-600 text-white'
                      : 'bg-accent hover:bg-accent/90 text-primary'
                  }`}
                >
                  {syncCalendar ? '✓ تم التنسيق والمزامنة مع تقويم Google بنجاح!' : '🔔 تفعيل التذكير التلقائي والمزامنة مع التقويم'}
                </button>
              </div>
            </div>

            {/* Suggestion 25: "Live Workshop Lobby" simulator */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4 text-right">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-600 rounded-full animate-ping"></span>
                  <h4 className="font-bold text-stone-800 text-xs md:text-sm">ورشة تفاعلية مباشرة: تحميص القهوة ومستويات الفنجان والتذوق الأصيل</h4>
                </div>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">بث مباشر الآن 🔴</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Simulated live video window */}
                <div className="md:col-span-7 bg-black rounded-2xl aspect-video relative overflow-hidden flex items-center justify-center border border-stone-800">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                    alt="Live Video"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 text-white">
                    <div className="flex justify-between items-center">
                      <span className="bg-black/50 backdrop-blur-xs text-[9px] px-2 py-0.5 rounded">المدرب: فواز الشمري</span>
                      <span className="bg-primary/90 text-accent text-[9px] px-2 py-0.5 rounded">جودة عالية HD</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-primary hover:bg-primary/95 text-accent text-xs font-bold p-2 rounded-full shadow-md">
                        <Play className="w-4 h-4 fill-accent" />
                      </button>
                      <span className="text-[10px] text-stone-300 font-mono">انقر لتشغيل صوت البث المباشر للأكاديمية</span>
                    </div>
                  </div>
                </div>

                {/* Live stream comments sidebar */}
                <div className="md:col-span-5 bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between h-56 md:h-auto">
                  <div className="space-y-2">
                    <h5 className="font-bold text-stone-700 text-[11px] border-b pb-1.5">تعليقات الحضور المتفاعلة:</h5>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto" id="comments-container">
                      {workshopComments.map((comment) => (
                        <div key={comment.id} className="text-[10px] leading-relaxed bg-stone-50 p-2 rounded-lg">
                          <strong className="text-primary block">{comment.author}:</strong>
                          <span className="text-stone-600">{comment.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newCommentText.trim()) return;
                      setWorkshopComments([
                        ...workshopComments,
                        { id: Date.now(), author: profile.name || 'مستفيد متفاعل', text: newCommentText }
                      ]);
                      setNewCommentText('');
                    }}
                    className="flex gap-1.5 mt-2 pt-2 border-t border-stone-100"
                  >
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="شارك برأيك أو اطرح سؤالك للوفد..."
                      className="w-full p-1.5 border border-stone-200 rounded-lg text-[10px] outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/95 text-accent font-bold px-3 py-1.5 rounded-lg text-[10px] whitespace-nowrap transition-all"
                    >
                      إرسال
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Suggestion 24: Interactive Certificate Custom Name Generator */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 text-right shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] bg-accent/20 text-primary font-bold px-2.5 py-0.5 rounded-full border border-accent/15 inline-block">حافز الجدارة المهنية</span>
                <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">مولّد الشهادات والاعتمادات السعودية المباشر</h4>
                <p className="text-stone-500 text-[10px] font-light">
                  عند اجتيازك لكويز أي مسار، اكتب اسمك الثلاثي أدناه لمعاينة وتصدير شهادتك المعتمدة مباشرة لملفك.
                </p>
              </div>

              <div className="flex gap-3 max-w-md">
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="اكتب اسمك الثلاثي كاملاً للشهادة..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-bold"
                />
                <button
                  type="button"
                  onClick={() => alert('تنبيه: تم حفظ اسمك وتصدير ملف الشهادة المعتمدة بنجاح لقسم المستندات في ملفك!')}
                  className="bg-primary hover:bg-primary/95 text-accent font-bold px-5 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap shadow-xs"
                >
                  تصدير وحفظ الشهادة
                </button>
              </div>

              {/* Styled mock certificate preview */}
              <div className="bg-gradient-to-br from-amber-50 to-stone-50 border-4 border-double border-amber-300 p-6 rounded-2xl text-center relative overflow-hidden space-y-4 mx-auto max-w-2xl shadow-xs" id="cert-preview">
                {/* Traditional border styles */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-200 pointer-events-none"></div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-serif tracking-widest uppercase block">مؤسسة إرث أجيال للتمكين والتدريب الأكاديمي</span>
                  <h3 className="font-serif font-extrabold text-primary text-sm md:text-base">شهادة جدارة وإتمام مسار تأهيلي معتمد</h3>
                </div>

                <div className="space-y-2">
                  <p className="text-stone-500 text-[10px] font-light">تشهد منصة إرث أجيال بالشراكة مع هيئة الموروث السعودي بأن مستفيدة المنصة:</p>
                  <h4 className="text-primary font-black text-sm md:text-base tracking-wide border-b border-dashed border-stone-300 pb-1.5 max-w-xs mx-auto">
                    {certName}
                  </h4>
                  <p className="text-stone-500 text-[10px] max-w-lg mx-auto leading-relaxed font-light">
                    قد أتمت بنجاح المسار التدريبي المكثف: <strong className="text-stone-800">"معايير جودة الضيافة والقهوة السعودية الفاخرة للوفود"</strong> بواقع 24 ساعة تدريبية معتمدة، واجتازت الاختبارات اللوجستية وعزل مسببات الحساسية للأغذية باقتدار مميز.
                  </p>
                </div>

                <div className="flex justify-between items-center text-[9px] text-stone-400 pt-4 border-t border-stone-100 max-w-md mx-auto">
                  <div className="text-right">
                    <span>الرقم المرجعي:</span>
                    <strong className="font-mono text-stone-600 block">WA-CERT-49201</strong>
                  </div>
                  <div className="text-center bg-primary text-accent px-3 py-1 rounded-full border border-accent/20 text-[8px] font-bold">
                    🛡️ اعتماد التمويل بدون كفيل جاهز
                  </div>
                  <div className="text-left">
                    <span>التاريخ المعتمد:</span>
                    <strong className="font-mono text-stone-600 block">1447/12/10 هـ</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Active Course - Learning Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="learning-workspace">
            {/* Left sidebar: Lessons Index Navigation */}
            <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-2xl p-4 md:p-5 space-y-4 order-last lg:order-first">
              <div>
                <h4 className="font-bold text-stone-800 text-sm">فهرس دروس المسار</h4>
                <p className="text-stone-400 text-[10px] leading-relaxed">يرجى قراءة كل درس بدقة، والتعليم على الانتهاء لتتمكن من خوض الكويز.</p>
              </div>

              <div className="space-y-2">
                {activeCourse?.lessons.map((lesson, idx) => {
                  const isRead = activeCourse.completedLessons.includes(lesson.id);
                  const isCurrent = lesson.id === activeLessonId && !showQuiz;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson.id)}
                      className={`w-full text-right p-3 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2.5 transition-all ${
                        isCurrent
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-100/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] flex-shrink-0 font-mono ${
                          isCurrent ? 'bg-primary text-accent' : 'bg-stone-200 text-stone-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      
                      {isRead && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    </button>
                  );
                })}

                {/* Interactive Quiz Button */}
                <button
                  onClick={() => setShowQuiz(true)}
                  className={`w-full text-right p-3 rounded-xl border text-xs font-bold flex items-center justify-between gap-2.5 transition-all ${
                    showQuiz
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-dashed border-stone-300 bg-white text-stone-600 hover:bg-stone-100/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>الكويز التشخيصي النهائي</span>
                  </div>
                  {activeCourse?.quizPassed && <Trophy className="w-4 h-4 text-accent flex-shrink-0" />}
                </button>
              </div>

              {/* Course complete reward notification */}
              {activeCourse?.completed && (
                <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl space-y-3 text-center">
                  <Trophy className="w-8 h-8 text-accent mx-auto animate-bounce" />
                  <div>
                    <h5 className="font-bold text-primary text-xs">مبارك! حصلت على الشهادة</h5>
                    <p className="text-stone-500 text-[10px] mt-0.5 leading-relaxed">لقد أنهيت حضور كافة الدروس واجتزت الاختبار بنجاح تام.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right block: Main content display (Lesson text OR Quiz form) */}
            <div className="lg:col-span-8 bg-white border border-stone-200 p-6 md:p-8 rounded-2xl shadow-sm" id="lesson-or-quiz-viewer">
              <AnimatePresence mode="wait">
                {!showQuiz && activeLesson ? (
                  /* DISPLAY LESSON CONTENT */
                  <motion.div
                    key={activeLesson.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-[10px] text-stone-400 font-mono">الدرس الحالي:</span>
                        <h3 className="font-extrabold text-stone-800 text-base md:text-lg">{activeLesson.title}</h3>
                      </div>
                      <span className="text-[10px] text-stone-400 bg-stone-100 px-2 py-1 rounded font-mono">الوقت المقدر: {activeLesson.duration}</span>
                    </div>

                    {/* Lesson Body text */}
                    <div className="text-stone-700 text-sm md:text-base leading-relaxed font-light whitespace-pre-line text-justify space-y-4">
                      {activeLesson.content}
                    </div>

                    {/* Suggestion 21: Voice Note Submission simulator for Pronunciation practice */}
                    <div className="bg-amber-50/50 border border-amber-200/80 p-4 rounded-2xl space-y-3 my-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🎤</span>
                        <div>
                          <h4 className="font-bold text-stone-800 text-xs md:text-sm">معمل ممارسة النطق ومصطلحات ترحيب الوفود</h4>
                          <p className="text-stone-500 text-[10px] font-light">تمرني على النطق السليم لعبارات الضيافة والترحيب بالحجاج لكسب وسام الفصاحة اللغوية.</p>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-stone-100 text-center space-y-3">
                        <p className="text-stone-700 text-xs font-bold leading-relaxed bg-amber-50/20 py-2 px-3 rounded-lg border border-dashed border-amber-200 inline-block">
                          "يا هلا ويا مسهلا بضيوف الرحمن، شرفتمونا في بلد الله الحرام، تفضلوا تقهوو فنجال هيف وكيف مصلح بأيدي أسر مكة المبدعة."
                        </p>

                        <div className="flex flex-col items-center gap-2 justify-center">
                          {isRecording ? (
                            <div className="flex flex-col items-center gap-1.5 py-2">
                              <div className="flex gap-1 items-center justify-center">
                                <span className="w-1.5 h-6 bg-primary rounded animate-pulse"></span>
                                <span className="w-1.5 h-8 bg-primary rounded animate-pulse delay-75"></span>
                                <span className="w-1.5 h-10 bg-accent rounded animate-pulse delay-150"></span>
                                <span className="w-1.5 h-7 bg-primary rounded animate-pulse delay-300"></span>
                                <span className="w-1.5 h-5 bg-primary rounded animate-pulse delay-500"></span>
                              </div>
                              <span className="text-[10px] text-primary font-bold animate-pulse">جاري الاستماع لصوتك وتحليل مخارج الحروف والمصطلحات التراثية...</span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setIsRecording(true);
                                setVoiceScore(null);
                                setTimeout(() => {
                                  setIsRecording(false);
                                  setVoiceScore(Math.floor(Math.random() * 15) + 85); // 85% to 99%
                                }, 2500);
                              }}
                              className="bg-primary hover:bg-primary/95 text-accent text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                            >
                              <span>🎙️ ابدأ التسجيل الصوتي لممارسة النطق</span>
                            </button>
                          )}

                          {voiceScore !== null && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 w-full text-center space-y-1"
                            >
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-base">🏆</span>
                                <span className="text-xs font-extrabold">معدل الفصاحة ومطابقة النطق: <span className="text-sm font-mono text-primary">{voiceScore}%</span></span>
                              </div>
                              <p className="text-[10px] text-emerald-700 font-light leading-relaxed">
                                نطقك متقن ومخارج الحروف والترحيبات الحجازية ممتازة! تم تخزين نبرتك الصوتية الترحيبية في الرمز التعريفي لمتجرك لخدمة الوفود.
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mark as read / Completed block */}
                    <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-stone-400">
                        {activeCourse?.completedLessons.includes(activeLesson.id) ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>لقد قرأت هذا الدرس بنجاح</span>
                          </span>
                        ) : (
                          <span>يرجى قراءة الدرس بتمعن ثم الضغط على زر الإكمال والتقدم.</span>
                        )}
                      </div>

                      <button
                        onClick={handleCompleteLesson}
                        className="bg-primary hover:bg-primary/95 text-accent px-6 py-3 rounded-xl text-xs font-bold shadow transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
                      >
                        <span>تمت القراءة والانتقال للدرس التالي</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* DISPLAY QUIZ SCREEN */
                  <motion.div
                    key="course-quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="text-[10px] text-stone-400 font-mono">الاختبار النهائي للمسار:</span>
                        <h3 className="font-extrabold text-primary text-base md:text-lg">{activeCourse?.title}</h3>
                      </div>
                      <span className="text-[10px] text-stone-400 bg-stone-100 px-2.5 py-1 rounded font-mono">عدد الأسئلة: {activeCourse?.quiz.questions.length} أسئلة</span>
                    </div>

                    {!quizSubmitted ? (
                      /* Quiz Taking State */
                      <div className="space-y-6 text-right">
                        <p className="text-xs text-stone-500 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                          يرجى الإجابة عن الأسئلة التشخيصية التالية لقياس مدى فهمك للمنهج. يتطلب اجتياز المسار الحصول على درجة كاملة.
                        </p>
                        
                        {activeCourse?.quiz.questions.map((q, qIdx) => (
                          <div key={q.id} className="bg-stone-50/50 border border-stone-200 p-4 md:p-5 rounded-2xl shadow-sm space-y-3">
                            <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-start gap-2">
                              <span className="bg-primary text-accent w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-mono mt-0.5">{qIdx + 1}</span>
                              <span>{q.questionText}</span>
                            </h4>
                            <div className="grid grid-cols-1 gap-2 pt-1">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selectedAnswers[q.id] === optIdx;
                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleSelectAnswer(q.id, optIdx)}
                                    className={`text-right p-3 rounded-xl border text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${
                                      isSelected
                                        ? 'border-accent bg-accent/10 text-primary'
                                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                                    }`}
                                  >
                                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                                      isSelected ? 'border-accent' : 'border-stone-300'
                                    }`}>
                                      {isSelected && <span className="w-2.5 h-2.5 bg-accent rounded-full" />}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-end pt-4 border-t border-stone-100">
                          <button
                            disabled={Object.keys(selectedAnswers).length < (activeCourse?.quiz.questions.length || 0)}
                            onClick={handleSubmitQuiz}
                            className={`font-bold px-8 py-3.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5 ${
                              Object.keys(selectedAnswers).length === (activeCourse?.quiz.questions.length || 0)
                                ? 'bg-primary text-accent hover:bg-primary/95'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                            id="submit-quiz-btn"
                          >
                            <span>تسليم وحساب نتيجة الاختبار</span>
                            <GraduationCap className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Quiz Result Display */
                      <div className="text-center py-8 space-y-6">
                        {activeCourse?.quizPassed ? (
                          <>
                            <div className="bg-[#C5A85A]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-[#C5A85A] border border-[#C5A85A]/20">
                              <Trophy className="w-10 h-10 animate-bounce" />
                            </div>
                            <div className="max-w-md mx-auto space-y-2">
                              <h4 className="text-xl font-bold text-[#1C3A27]">ألف مبروك! لقد اجتزت الكويز بنجاح تام</h4>
                              <p className="text-[#C5A85A] font-bold text-sm">النتيجة: {quizScore} من {activeCourse?.quiz.questions.length} صحيحة (100%)</p>
                              <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-light">
                                لقد تم إصدار <strong>شهادة التأهيل المهني</strong> باسمك لهذه المادة. يمكنك رؤية الشهادة بالأسفل أو تنزيلها ومشاركتها مع الجهات المهتمة.
                              </p>
                            </div>

                            {/* Beautiful Certificate Widget */}
                            <div className="border-[6px] border-[#1C3A27] p-6 md:p-8 rounded-2xl bg-stone-50 text-center max-w-xl mx-auto shadow-md relative" id="certificate-widget">
                              <div className="absolute top-4 right-4 text-[#C5A85A] opacity-20 pointer-events-none">
                                <Award className="w-16 h-16" />
                              </div>
                              <h5 className="font-mono text-[10px] text-[#C5A85A] font-bold uppercase tracking-wider mb-2">شهادة تأهيل مهني معتمدة</h5>
                              <h4 className="text-[#1C3A27] text-lg font-black tracking-tight mb-4">منصة إرث أجيال لتمكين الأسر المنتجة</h4>
                              
                              <p className="text-xs text-stone-400 font-light mb-1">تشهد المنصة بأن المستفيد / المستفيدة:</p>
                              <p className="text-base md:text-lg font-black text-stone-800 border-b border-stone-200 w-max mx-auto px-6 pb-1 mb-4">{profile.name || '[ لم تقم بملء اسمك في الملف الرقمي ]'}</p>
                              
                              <p className="text-xs text-stone-500 leading-relaxed font-light mb-6">
                                قد أكمل حضور كافة المحاضرات واجتياز الكويز التشخيصي بنجاح متميز للمسار التدريبي التأهيلي:<br />
                                <strong className="text-[#1C3A27] font-bold text-sm">"{activeCourse.title}"</strong>
                              </p>

                              <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono border-t border-stone-200 pt-3">
                                <div className="text-right">
                                  <p>الرقم الرقمي: WA-CERT-{activeCourse.id.toUpperCase()}</p>
                                  <p>تاريخ الإصدار: {new Date().toLocaleDateString('ar-SA')}</p>
                                </div>
                                <div className="text-left font-sans text-[#1C3A27] font-bold">
                                  <span>توقيع أمانة المنصة 🔐</span>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-100">
                              <HelpCircle className="w-10 h-10" />
                            </div>
                            <div className="max-w-md mx-auto space-y-2">
                              <h4 className="text-xl font-bold text-stone-800">لم تجتز الكويز هذه المرة</h4>
                              <p className="text-red-500 font-bold text-sm">النتيجة: {quizScore} من {activeCourse?.quiz.questions.length} صحيحة</p>
                              <p className="text-stone-500 text-xs md:text-sm leading-relaxed font-light">
                                يتطلب اجتياز المسار الحصول على درجة كاملة. لا بأس، يمكنك إعادة قراءة الدروس وإجراء الكويز مرة أخرى بكل سهولة!
                              </p>
                            </div>
                            
                            <button
                              onClick={() => {
                                setQuizSubmitted(false);
                                setSelectedAnswers({});
                              }}
                              className="bg-[#1C3A27] text-[#C5A85A] hover:bg-[#152c1e] font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md inline-flex items-center gap-1"
                            >
                              <span>أعد إجراء الاختبار</span>
                              <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, ChevronLeft, Award, TrendingUp, Compass, AlertCircle, FileText, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { BeneficiaryProfile, Assessment, AssessmentAnswer } from '../types';

interface SmartEvaluationProps {
  profile: BeneficiaryProfile;
  assessment: Assessment | null;
  onSaveAssessment: (updatedAssessment: Assessment) => void;
}

export default function SmartEvaluation({ profile, assessment, onSaveAssessment }: SmartEvaluationProps) {
  const [step, setStep] = useState<number>(0); // 0: Welcome/Instruction, 1: Quiz, 2: Evaluating, 3: Completed Report
  const [restoredNotification, setRestoredNotification] = useState<boolean>(false);
  
  // Domain specific questions
  const getQuestions = () => {
    switch(profile.projectType) {
      case 'hospitality':
        return [
          { id: 'q1', text: 'كيف تقوم بتحديد وتجهيز مستلزمات الضيافة والأواني قبل المناسبات؟', options: ['أعتمد على تقديري وقت المناسبة وشراء ما ينقص بشكل مستعجل', 'لدي قائمة مراجعة مكتملة ومعقمة لكل باقة مجهزة مسبقاً', 'أطلب من العميل توفير الأواني والمستلزمات بنفسه'] },
          { id: 'q2', text: 'كيف تقيس مستوى الالتزام بمعايير جودة تقديم القهوة السعودية والتمور؟', options: ['أشتري أي نوع قهوة متوفر بالسوق حسب التكلفة', 'ألتزم بخلطة معيارية خاصة بوزن دقيق وحرارة تقديم ثابتة مع تمور فاخرة منتقاة', 'أعتمد على تذوق العمالة العشوائي قبل الخروج للمناسبة'] },
          { id: 'q3', text: 'ما هي طريقتك الحالية للتسويق والوصول لمنظمي المؤتمرات والعرائس؟', options: ['ليس لدي طريقة سوى توصية الأصدقاء والمعارف', 'لدي ملف تعريفي (بروفايل رقمي) يعرض باقات الخدمة وصور الضيافة وأتواصل مع الشركات', 'أنتظر أن يتواصلوا معي عبر الهاتف'] },
          { id: 'q4', text: 'كيف يتم حساب تكلفة الباقة وهامش الربح لكل مجلس أو حفلة؟', options: ['أضع سعراً تقريبياً بناء على أسعار المنافسين دون حساب دقيق', 'أقوم بحساب تكلفة المواد الخام + أجور مقدمات الخدمة + الانتقال + نسبة الربح المستهدفة', 'لا أقوم بحساب التكلفة بالتفصيل'] }
        ];
      case 'culinary':
        return [
          { id: 'q1', text: 'كيف تضمن الحصول على نكهة طعام متسقة ومتطابقة في كل طلبية؟', options: ['بالاعتماد على حاسة التذوق والخبرة اللحظية أثناء الطهي', 'باستخدام دليل وصفات مقنن بوزن الغرام ودرجات حرارة ومواقيت طهي دقيقة ومسجلة', 'النكهات تختلف طبيعياً ولا أتدخل في توحيدها'] },
          { id: 'q2', text: 'ما هي المعايير المطبقة لحفظ وسلامة الأطعمة والتعبئة في مطبخك المنزلي؟', options: ['أقوم بالتعبئة في علب بلاستيكية عادية دون كتابة تفاصيل', 'لدي مساحة تعقيم، وأفصل اللحوم عن الخضار، وأغلف الأطعمة حرارياً مع ملصق تاريخ الصلاحية والصنع', 'أقوم بالطهي كالمعتاد للمنزل دون تخصيص مساحة خاصة'] },
          { id: 'q3', text: 'كيف تدير عملية توصيل الوجبات الساخنة والطلبات المفاجئة؟', options: ['أعتمد على سائق خاص بالمنزل أو شركة شحن عادية', 'أربط المتجر مع خدمات توصيل سريعة ومخصصة للأطعمة في حافظات حرارية مناسبة', 'أطلب من العميل الحضور لاستلام طعامه بنفسه من المنزل'] },
          { id: 'q4', text: 'هل تتوفر لديك حسابات منفصلة لمبيعات المطبخ وأرباحه؟', options: ['لا، أقوم بالصرف واستقبال المبيعات في حسابي الشخصي', 'نعم، لدي حساب بنكي منفصل للمشروع وأدفع لنفسي راتباً محدداً وتدار التدفقات النقدية بدقة', 'أحتفظ بالكاش في المنزل دون إيداع'] }
        ];
      case 'crafts':
        return [
          { id: 'q1', text: 'كيف تقيم مستوى جودة وتناسق المواد الخام المستخدمة في حرفتك (مثل خيوط السدو، الجلود)؟', options: ['أشتري أرخص المواد المتوفرة لتقليل تكلفة التصنيع', 'أتعامل مع موردين موثوقين لفحص واختيار المواد الطبيعية والمستدامة التي تضمن فخامة المنتج', 'أستخدم بقايا الأقمشة والمواد دون معيار محدد'] },
          { id: 'q2', text: 'ما هي طريقتك لعرض تفاصيل حرفتك واللمسة التراثية للمشترين؟', options: ['أكتفي بعرض صورة عادية للمنتج من بعيد على الواتساب', 'أقوم بتصوير احترافي مكبر يظهر عقد السدو أو الغرز وجودة التغليف مع شرح القصة التراثية للقطعة', 'لا أهتم بعرض التفاصيل كثيراً فالعميل يراها عند الاستلام'] },
          { id: 'q3', text: 'كيف تقوم بحساب سعر القطعة اليدوية التي تستغرق منك أياماً لصناعتها؟', options: ['أضع سعراً منخفضاً جداً لكي يقبل الناس الشراء بسرعة', 'أحسب بدقة تكلفة الخامات + عدد ساعات العمل المستغرقة × أجري في الساعة + هامش الربح لضمان الربحية', 'أسعر عشوائياً حسب رغبة الزبون ومكاسرته'] },
          { id: 'q4', text: 'هل تستهدف بيع الهدايا التذكارية للوفود السياحية أو الهيئات الثقافية؟', options: ['لا، أبيع للأفراد والزبائن القريبين مني فقط', 'نعم، أعمل على مواءمة تصاميمي لتناسب الهدايا والمؤتمرات الوطنية ومتاجر الفنادق الراقية', 'لم أفكر في هذا الاستهداف من قبل'] }
        ];
      case 'home_products':
      default:
        return [
          { id: 'q1', text: 'كيف تضمن جودة خامات العطور والبخور واستقرار الروائح لفترة طويلة؟', options: ['أشتري زيوت عطرية جاهزة ومجهولة المصدر لسهولة تركيبها', 'أقوم بفحص واختيار زيوت عطرية نقية وكسر عود طبيعي بمقادير كيميائية آمنة مدروسة لثبات يدوم', 'أخلط المواد بعشوائية وتجربتها على من حولي'] },
          { id: 'q2', text: 'ما هي مواصفات تغليف وعلب البخور والرشوش المتبعة لديك؟', options: ['تغليف عادي غير محكم قد تسرب منه الروائح أو الزيوت', 'علب زجاجية فاخرة معقمة ومحكمة الإغلاق ومقاومة للتسرب والكسر داخل صناديق شحن آمنة', 'أقوم بتعبئة المنتجات في أكياس بلاستيكية عادية'] },
          { id: 'q3', text: 'ما هي قنوات الرد على استفسارات عملائك واستقبال الطلبات؟', options: ['الاعتماد الكامل على الرسائل النصية الخاصة في أوقات فراغي فقط', 'استخدام متجر إلكتروني احترافي وقنوات تواصل سريعة ومؤتمتة عبر الواتساب للأعمال', 'الاتصال الهاتفي المباشر فقط'] },
          { id: 'q4', text: 'هل مشروعك مسجل أو مؤهل للحصول على تراخيص لبيع المنتجات المنزلية؟', options: ['لا، أعمل بشكل غير رسمي بالكامل دون التفات للتراخيص', 'مسجل في وثيقة العمل الحر وأعمل على تهيئة مشروعي ليتوافق مع المعايير الصحية والبلدية لطلب الترخيص', 'لا أعلم شيئاً عن تراخيص العمل المنزلي'] }
        ];
    }
  };

  const questions = getQuestions();
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));

  // Load autosaved progress on mount
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem('warth_smart_evaluation_step');
      const savedAnswers = localStorage.getItem('warth_smart_evaluation_answers');
      
      if (!assessment) {
        if (savedStep !== null) {
          const parsedStep = parseInt(savedStep, 10);
          if (parsedStep === 1 || parsedStep === 2) {
            setStep(parsedStep);
          }
        }
        if (savedAnswers !== null) {
          const parsedAnswers = JSON.parse(savedAnswers);
          if (Array.isArray(parsedAnswers) && parsedAnswers.length === questions.length) {
            setAnswers(parsedAnswers);
            setRestoredNotification(true);
            setTimeout(() => setRestoredNotification(false), 4000);
          }
        }
      }
    } catch (e) {
      console.error('Error loading autosave from localStorage', e);
    }
  }, [assessment, questions.length]);

  // Save progress whenever step or answers change
  useEffect(() => {
    try {
      // Don't auto-save completed screen as step 3 if there's no props assessment
      if (step === 3 && !assessment) {
        localStorage.removeItem('warth_smart_evaluation_step');
        localStorage.removeItem('warth_smart_evaluation_answers');
      } else {
        localStorage.setItem('warth_smart_evaluation_step', step.toString());
        localStorage.setItem('warth_smart_evaluation_answers', JSON.stringify(answers));
      }
    } catch (e) {
      console.error('Error saving autosave to localStorage', e);
    }
  }, [step, answers, assessment]);

  const handleSelectOption = (qIndex: number, option: string) => {
    const newAnsw = [...answers];
    newAnsw[qIndex] = option;
    setAnswers(newAnsw);
  };

  const startAssessment = () => {
    setStep(1);
  };

  const submitAssessment = () => {
    setStep(2);
    // Simulate smart AI report calculation based on profile and options selected
    setTimeout(() => {
      // Calculate a score based on options. Index 1 represents the best, optimal answer in our data structures!
      let optimalCount = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.options[1]) {
          optimalCount++;
        }
      });

      const rawScore = optimalCount === 4 ? 95 : optimalCount === 3 ? 82 : optimalCount === 2 ? 65 : 48;
      const productQuality = optimalCount >= 3 ? 5 : optimalCount === 2 ? 4 : 3;
      const founderSkills = optimalCount >= 3 ? 4 : optimalCount === 2 ? 3 : 2;

      // Custom recommendations based on project type and answers
      let strengths: string[] = [];
      let improvements: string[] = [];
      let recommendations: string[] = [];

      if (profile.projectType === 'culinary') {
        strengths = [
          'امتلاك شغف كبير بطهي الوصفات التراثية السعودية.',
          optimalCount >= 2 ? 'الوعي بأهمية التغليف ونظافة بيئة العمل المنزلية.' : 'الرغبة في تحسين الكفاءة والطهي المنزلي الاحترافي.'
        ];
        improvements = [
          'الحاجة إلى توحيد المقادير بدقة الغرام للحصول على طعم متسق بنسبة 100%.',
          'الافتقار لحساب التدفقات النقدية وفصل الحسابات المالية الشخصية عن المشروع.',
          'تحديث التغليف ليكون مناسباً لخدمات التوصيل السريع دون تلف الأطعمة.'
        ];
        recommendations = [
          'الالتحاق بمسار "التخطيط والوعي المالي لرواد الأعمال" لضبط حساب التكاليف وفصل الأرباح.',
          'اعتماد ميزان غرام إلكتروني وتوثيق دليل تشغيلي للوصفات (SOP).',
          'استخدام باقة النمو أو الاحتراف للمتجر لتفعيل كوبونات الخصم والربط التلقائي مع مناديب التوصيل.'
        ];
      } else if (profile.projectType === 'hospitality') {
        strengths = [
          'تقديم خدمة القهوة السعودية والضيافة بأصالة تراثية متميزة.',
          optimalCount >= 2 ? 'تنظيم جيد لمستلزمات الخدمة والتجهيز المسبق.' : 'القدرة على التعامل الودود مع العميلات.'
        ];
        improvements = [
          'الحاجة إلى بناء بروفايل رقمي (ملف مهني) احترافي يعرض باقاتك ومنسوبيها.',
          'الاعتماد على التسويق الشفهي فقط وغياب الهوية الرقمية المنظمة.',
          'عدم دقة حساب تكلفة التوصيل وتكاليف مقدمات الخدمة الخرجية.'
        ];
        recommendations = [
          'الالتحاق بمسار "التسويق الرقمي للأسر المنتجة" لبناء هوية رقمية وتسويق باقات الضيافة عبر إنستغرام.',
          'صياغة 3 باقات محددة القيمة والخدمات والأسعار (مثال: باقة المجلس، باقة المناسبة الكبرى) وعرضها بكتالوج رقمي.',
          'توطين التعاون مع منظمي الحفلات والمؤتمرات كشريك توريد معتمد.'
        ];
      } else if (profile.projectType === 'crafts') {
        strengths = [
          'إتقان حرفة يدوية تراثية أصيلة ونادرة (ذات قيمة فنية عالية).',
          optimalCount >= 2 ? 'حسن اختيار خامات طبيعية تبرز جودة العمل.' : 'الموهبة واللمسة الفنية الفريدة.'
        ];
        improvements = [
          'ضعف القدرة على تسعير المجهود والوقت الطويل المستغرق في الحياكة والتصميم.',
          'افتقار المنتج للتغليف الفاخر وبطاقة معلومات السرد التاريخي الذي يزيد قيمته.',
          'عدم وجود ملف مهني يعرض قطعك اليدوية للمؤسسات والجهات الحكومية.'
        ];
        recommendations = [
          'الالتحاق بمسار "تطوير وابتكار المنتجات المحلية" لتعلم فن التغليف وصياغة بطاقات الهوية للمنتجات التراثية.',
          'حساب التسعير بالمعادلة الاحترافية التي تأخذ بالاعتبار مجهودك الشخصي بالساعة.',
          'الاشتراك في باقة المتجر لعرض الأعمال الحرفية وربطها بصور مكبرة فائقة الدقة والوضوح.'
        ];
      } else {
        strengths = [
          'مهارة عالية في اختيار روائح العطور والبخور وتوليف الخلطات العطرية.',
          optimalCount >= 2 ? 'رغبة واضحة للتسجيل القانوني والنمو بشكل سليم.' : 'وجود مبيعات محلية مبدئية.'
        ];
        improvements = [
          'استخدام تعبئة وتغليف تقليدي لا يحبس الروائح العطرية ولا يمنع الكسر بالشحن.',
          'عشوائية في الرد على استفسارات الزبائن وتأخر الرد مما يفقدك المبيعات اليومية.',
          'العمل الفردي دون هيكل مالي أو قانوني واضح (كالحصول على وثيقة العمل الحر).'
        ];
        recommendations = [
          'الالتحاق بمسار "التصوير الاحترافي للمنتجات بالجوال" لإبراز لمعان العبوات وفخامة البخور.',
          'استخراج وثيقة العمل الحر فوراً والمشاركة في المعارض الوطنية المدعومة للأسر المنتجة.',
          'استخدام وتصميم عبوات زجاجية معقمة محكمة الإغلاق مع غلاف مقاوم للكسر.'
        ];
      }

      const generatedAnswers: AssessmentAnswer[] = questions.map((q, idx) => ({
        questionId: q.id,
        questionText: q.text,
        answer: answers[idx]
      }));

      const finalReport: Assessment = {
        answers: generatedAnswers,
        evaluated: true,
        score: rawScore,
        productQuality,
        founderSkills,
        strengths,
        improvements,
        recommendations,
        reportDate: new Date().toLocaleDateString('ar-SA')
      };

      onSaveAssessment(finalReport);
      setStep(3);
    }, 2500);
  };

  const isQuizComplete = answers.every(ans => ans !== '');

  return (
    <div className="max-w-4xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="smart-evaluation-card">
      {/* Banner with Smart Icon */}
      <div className="bg-primary text-stone-100 p-6 flex items-center justify-between" id="eval-banner">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">التقييم الذكي لقياس جاهزية المشروع</h2>
            <p className="text-stone-300 text-xs mt-0.5">تقييم مبني على تقنيات الذكاء الاصطناعي لتشخيص مستوى مشروعك ووضع خطة تأهيل مخصصة لنموه واستدامته.</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {step === 0 && !assessment && (
          /* Step 0: Welcome Instructions */
          <div className="text-center py-8 max-w-2xl mx-auto space-y-6" id="welcome-step">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-accent">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-stone-800">مرحباً بك في أداة التقييم الذكي لمشروعك</h3>
              <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                في منصة <strong>ورث أجيال</strong>، لا نقدم تمويلاً عشوائياً، بل نهيئ مشروعك للنمو الفعلي. سنقوم بطرح بعض الأسئلة التشخيصية السريعة المرتبطة بنشاطك 
                (<span className="text-primary font-semibold">
                  {profile.projectType === 'hospitality' ? 'الضيافة' :
                   profile.projectType === 'culinary' ? 'الطهي' :
                   profile.projectType === 'crafts' ? 'الحرف اليدوية' : 'المنتجات المنزلية'}
                </span>) للتعرف على نقاط القوة والتحديات الحالية لديك.
              </p>
            </div>
            
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-right text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p><strong>تحديد مسارك التدريبي</strong>: سنقترح عليك المسارات والدروس التي يحتاجها مشروعك فعلياً للتأهيل.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p><strong>تقرير الجاهزية الرقمي</strong>: ستحصل على شهادة بنسبة جاهزيتك للنمو وعرضها أمام الجهات الداعمة والمستثمرين.</p>
              </div>
            </div>

            <button
              onClick={startAssessment}
              className="bg-primary hover:bg-primary/95 text-accent font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              id="start-eval-btn"
            >
              <span>ابدأ التقييم الذكي الآن</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 1 && (
          /* Step 1: Interactive Survey Questions */
          <div className="space-y-6" id="survey-step">
            {restoredNotification && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center justify-between text-right animate-bounce">
                <span>⏳ تم استعادة إجاباتك السابقة تلقائياً بنجاح!</span>
                <button onClick={() => setRestoredNotification(false)} className="text-emerald-500 hover:text-emerald-800">×</button>
              </div>
            )}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-mono">أسئلة قياس الجاهزية والتشغيل</span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  حفظ تلقائي نشط
                </span>
              </div>
              <span className="text-xs text-primary font-semibold bg-primary/5 px-2.5 py-1 rounded-full">النشاط المقيّم: {profile.projectName || 'مشروعك'}</span>
            </div>

            <div className="space-y-6 text-right">
              {questions.map((q, qIdx) => (
                <div key={q.id} className="bg-stone-50 border border-stone-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-start gap-2.5">
                    <span className="bg-primary text-accent w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-mono">{qIdx + 1}</span>
                    <span>{q.text}</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[qIdx] === opt;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(qIdx, opt)}
                          className={`text-right p-3.5 rounded-xl border text-xs md:text-sm font-semibold transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-primary' : 'border-stone-300'
                          }`}>
                            {isSelected && <span className="w-2.5 h-2.5 bg-primary rounded-full" />}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-stone-100">
              <button
                disabled={!isQuizComplete}
                onClick={submitAssessment}
                className={`font-bold px-8 py-4 rounded-xl text-sm transition-all shadow flex items-center gap-2 ${
                  isQuizComplete
                    ? 'bg-primary text-accent hover:bg-primary/95'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
                id="submit-eval-btn"
              >
                <span>إرسال وتحليل النتائج بالذكاء الاصطناعي</span>
                <Brain className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          /* Step 2: Evaluating Animation */
          <div className="text-center py-16 space-y-6" id="evaluating-step">
            <div className="relative w-24 h-24 mx-auto">
              {/* Spinning rings */}
              <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-stone-50 rounded-full flex items-center justify-center text-primary">
                <Brain className="w-10 h-10 animate-pulse" />
              </div>
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-bold text-stone-800">يرجى الانتظار... يقوم الذكاء الاصطناعي بالتحليل</h3>
              <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                نقوم الآن بدراسة إجاباتك التشخيصية، ومطابقتها مع مواصفات نشاطك (<span className="text-primary font-semibold">{profile.projectName || 'مشروعك'}</span>)، 
                وتحليل كتالوج المنتجات لتقييم الجاهزية وإخراج نقاط القوة والتوصيات التعليمية اللازمة لنجاحك.
              </p>
            </div>
          </div>
        )}

        {/* Step 3 or if assessment already exists: Completed Report Display */}
        {(step === 3 || assessment) && (
          <div className="space-y-8" id="report-step">
            {/* Report Header Card */}
            <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-2xl shadow-sm text-center relative overflow-hidden" id="report-header">
              <div className="absolute top-0 right-0 text-stone-100 opacity-5 pointer-events-none">
                <Sparkles className="w-48 h-48" />
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>تم إنشاء تقرير الجاهزية الذكي بنجاح</span>
              </motion.div>

              <h3 className="text-2xl font-extrabold text-stone-800">تقرير قياس مستوى جاهزية المشروع</h3>
              <p className="text-xs text-stone-400 mt-1 font-mono">تاريخ التقرير: {assessment?.reportDate || new Date().toLocaleDateString('ar-SA')}</p>

              {/* Grid with Score & Sub-scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto items-center" id="metrics-grid">
                
                {/* Score Big Meter */}
                <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
                  <h5 className="font-bold text-stone-500 text-xs mb-3">نسبة الجاهزية للنمو والتمكين</h5>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
                      <circle cx="56" cy="56" r="48" stroke="var(--color-primary)" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - (assessment?.score || 65) / 100)}
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-primary font-mono">{assessment?.score || 65}%</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 mt-3 px-2 py-0.5 rounded bg-emerald-50">
                    {(assessment?.score || 65) >= 80 ? 'جاهزية عالية للنمو' : 'يحتاج إلى تأهيل ومسار تدريبي'}
                  </span>
                </div>

                {/* Sub-Score Product Quality */}
                <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-center space-y-3">
                  <h5 className="font-bold text-stone-500 text-xs">تقييم جودة المنتج والتعبئة</h5>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= (assessment?.productQuality || 4) ? 'text-accent fill-accent' : 'text-stone-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-semibold">
                    {(assessment?.productQuality || 4) === 5 ? 'مستوفٍ لكافة شروط الاتساق والتعبئة والتوصيل' : 'بحاجة لتدقيق وتحسين تغليف وحفظ المنتجات'}
                  </p>
                </div>

                {/* Sub-Score Founder Skills */}
                <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-center space-y-3">
                  <h5 className="font-bold text-stone-500 text-xs">تقييم مهارات رائد الأعمال</h5>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${star <= (assessment?.founderSkills || 3) ? 'text-amber-500 fill-amber-500' : 'text-stone-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed font-semibold">
                    {(assessment?.founderSkills || 3) >= 4 ? 'مستويات إدارية ومالية جيدة' : 'يحتاج لتدريب إداري ومالي لضمان استمراريته'}
                  </p>
                </div>

              </div>
            </div>

            {/* Analysis report sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="report-details-grid">
              
              {/* Strengths Card */}
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-bold text-emerald-800 text-sm md:text-base flex items-center gap-2 border-b border-stone-100 pb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>نقاط القوة بالمشروع (شخصها الذكاء الاصطناعي)</span>
                </h4>
                <div className="space-y-2.5">
                  {assessment?.strengths.map((str, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-emerald-50/40 p-3 rounded-xl border border-emerald-50 text-stone-700 text-xs md:text-sm">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <p>{str}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements Card */}
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-bold text-red-800 text-sm md:text-base flex items-center gap-2 border-b border-stone-100 pb-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span>نقاط الضعف ومواطن التحسين المطلوبة</span>
                </h4>
                <div className="space-y-2.5">
                  {assessment?.improvements.map((imp, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-red-50/40 p-3 rounded-xl border border-red-50 text-stone-700 text-xs md:text-sm">
                      <span className="text-red-500 font-bold">•</span>
                      <p>{imp}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recommendation Plan Card */}
            <div className="bg-primary text-stone-100 p-6 md:p-8 rounded-3xl border border-accent/30 shadow-md space-y-6" id="ai-recommendations-card">
              <div className="flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-accent" />
                <h4 className="font-bold text-base md:text-lg">خطة التمكين المقترحة من قبل الذكاء الاصطناعي:</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="recs-grid">
                {assessment?.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3 text-stone-200">
                    <span className="bg-accent text-primary font-bold rounded-lg w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-xs md:text-sm leading-relaxed font-light">{rec}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-300 font-light text-center sm:text-right">
                  نوصيك بالتوجه فوراً إلى <strong>مسار التأهيل والتدريب</strong> لبدء حضور الدروس واجتياز الكويزات لترتفع نسبة جاهزية مشروعك!
                </p>
                
                <button
                  onClick={() => setStep(1)}
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-stone-100 font-bold px-6 py-2.5 rounded-xl text-xs transition-all w-full sm:w-auto text-center"
                >
                  إعادة إجراء التقييم
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  ChevronRight, 
  RotateCcw, 
  Home, 
  UserCheck, 
  HelpCircle, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ShoppingBag, 
  Headphones, 
  Sparkle,
  CornerUpLeft,
  LifeBuoy
} from 'lucide-react';

interface SmartSupportModalProps {
  onClose: () => void;
  lang?: 'ar' | 'en';
  initialInfo?: {
    familyName?: string;
    familyCode?: string;
    productName?: string;
    orderNumber?: string;
  };
}

interface OptionNode {
  id: string;
  label: string;
  icon?: string;
  response?: string;
  subOptions?: OptionNode[];
  actionLink?: {
    label: string;
    url: string;
  };
}

// 🌳 Complete Multi-Level Guided Decision Tree Structure
const SUPPORT_DECISION_TREE: OptionNode[] = [
  {
    id: 'packages_membership',
    label: '🎖️ خيار الباقات والعضويات المتاحة',
    response: 'نوفر باقات عضوية استراتيجية مخصصة لتنمية وتمكين الأسر المنتجة والحرفيين والشركاء المؤسسيين:\n\n1️⃣ العضوية الفضية (مجانية 100%): لإنشاء بروفايل وبدء البيع المباشر بالمتجر المستقل.\n2️⃣ العضوية الذهبية (مُدعمة): أولوية البيع بالفنادق، أولوية التمويل التمكيني المرن حتى 50,000 ر.س، واستشارات أسبوعية مجانية.\n3️⃣ عضوية الحاضنات والشركاء: مخصصة للجمعيات والمؤسسات لإدارة ومتابعة مجموعات الأسر وتوثيق الأثر التنموي.',
    actionLink: { label: 'استعراض واختيار باقتك الآن 🎖️', url: '/membership' },
    subOptions: [
      {
        id: 'pkg_silver',
        label: '🥈 العضوية الفضية الحرفية (مجانية)',
        response: 'تتيح العضوية الفضية إنشاء ملف رقمي وعرض حتى 5 منتجات طهي أو حرفية بالمتجر المستقل مع استقبال المدفوعات إلكترونياً مجاناً.',
        actionLink: { label: 'الانضمام للعضوية الفضية 🥈', url: '/membership' }
      },
      {
        id: 'pkg_gold',
        label: '🥇 العضوية الذهبية للتمكين والتوسع',
        response: 'تمنحك العضوية الذهبية أولوية البيع بنزلاء الفنادق بمكة والمدينة، أولوية التمويل بدون فوائد وبدون كفيل غارم، واستشارات متخصصة من خبراء TND.SA.',
        actionLink: { label: 'الانضمام للعضوية الذهبية 🥇', url: '/membership' }
      },
      {
        id: 'pkg_diamond',
        label: '💎 عضوية الحاضنات والشراكات المؤسسية',
        response: 'مخصصة للقطاع الثالث والجمعيات الأهلية لربط وإدارة ورش الأسر المنتجة وتقارير قياس الأثر التنموي.',
        actionLink: { label: 'طلب شراكة مؤسسية 💎', url: '/membership' }
      }
    ]
  },
  {
    id: 'services',
    label: '💼 ما خدمات إرث أجيال ومؤسسة التفكير والنماء؟',
    response: 'نقدم منظومة متكاملة لتمكين الأسر المنتجة ورعاة الحرف والطهي التراثي. تشمل خدماتنا الرئيسية:\n\n1️⃣ الأكاديمية والتدريب الحرفي الرقمي.\n2️⃣ المتجر التراثي المستقل للبيع المباشر.\n3️⃣ التمويل التمكيني الخالي من الفوائد حتى 50,000 ر.س.\n4️⃣ الاستشارات والتوجيه المهني.\n5️⃣ العضويات الذهبية وبرامج الدعم المستمر.',
    subOptions: [
      {
        id: 'services_training',
        label: '🎓 الأكاديمية والبرامج التدريبية',
        response: 'تتيح الأكاديمية دورات متخصصة في الطهي التراثي، إدارة الجودة، تغليف المنتجات، والتسويق الرقمي. جميع الشهادات معتمدة مع فرصة الحصول على حاضنة أعمال مجانية.',
        actionLink: { label: 'الانتقال لصفحة الخدمات 👈', url: '/services' }
      },
      {
        id: 'services_store',
        label: '🛍️ المتجر التراثي المستقل',
        response: 'منصة بيع مباشرة تمكّن الأسر من تسويق المأكولات التراثية، الحرف اليدوية، والمنتجات العطرية للمعتمرين والسياح مع خدمة توصيل فورية للفنادق.',
        actionLink: { label: 'تصفح المتجر المستقل 🛍️', url: '/store' }
      },
      {
        id: 'services_consulting',
        label: '🩺 الاستشارات الإدارية والمالية',
        response: 'جلسات استشارية فردية مع خبراء ريادة الأعمال لمساعدتك في بناء الهوية، تسعير المنتجات، وإعداد دراسات الجدوى.',
        actionLink: { label: 'حجز استشارة فورية 🩺', url: '/consulting' }
      }
    ]
  },
  {
    id: 'how_to_order',
    label: '🛍️ كيف أطلب خدمة أو منتج من المتجر؟',
    response: 'يمكنك طلب المنتجات والخدمات عبر خطوتين بسيطة دون الحاجة لباقات أو اشتراكات مسبقة:\n\n1️⃣ توجه إلى صفحة المتجر المستقل (/store).\n2️⃣ اختر المنتج أو الخدمة واضغط "شراء سريع".\n3️⃣ أدخل اسمك ورقم جوالك وعنوان الفندق/السكن وسيدفع عبر مدى أو عند الاستلام.',
    actionLink: { label: 'انتقل إلى المتجر الآن 🛒', url: '/store' },
    subOptions: [
      {
        id: 'order_payment',
        label: '💳 ما هي طرق الدفع المتاحة؟',
        response: 'نوفر جميع وسائل الدفع الآمنة:\n• الدفع عند الاستلام بالفندق (نقداً أو بالبطاقة عبر المندوب)\n• بطاقات مدى وفيزا وماستركارد\n• Apple Pay'
      },
      {
        id: 'order_delivery',
        label: '🚚 ما هي مدة ومناطق التوصيل؟',
        response: 'يتم التوصيل الفوري خلال 60 إلى 120 دقيقة داخل فندك في مكة المكرمة والمدينة المنورة، مع تغليف حراري معتمد يحافظ على طازجية الطعام والتراث.'
      }
    ]
  },
  {
    id: 'consulting',
    label: '🩺 كيف أحجز استشارة مهنية؟',
    response: 'نوفر حجز استشارات مباشرة مع مستشاري التفكير والنماء عبر صفحة الاستشارات (/consulting):\n\n• استشارات تطوير الطهي والحرف\n• استشارات دراسة الجدوى والتمويل\n• استشارات التسويق الرقمي وبناء العلامة التجارية\n\nتتوفر الاستشارات حضوريًا أو عبر زووم / الهاتف.',
    actionLink: { label: 'انتقل لصفحة الاستشارات 🩺', url: '/consulting' },
    subOptions: [
      {
        id: 'consulting_cost',
        label: '💰 كم تكلفة الاستشارة؟',
        response: 'الاستشارة الأولى مجانية بالكامل لجميع المستفيدين المسجلين بالمنصة، وتخضع الاستشارات المتقدمة لدعم يصل إلى 80% عبر مبادرات المؤسسة.'
      }
    ]
  },
  {
    id: 'funding_and_support',
    label: '💰 كيف أحصل على التمويل والتمكين التنموي؟',
    response: 'توفر مؤسسة التفكير والنماء برامج تمويل خاسرة وبدون كفيل تصل لـ 50,000 ريال سعودي.\n\nشروط القبول:\n✅ التسجيل بالمنصة وإكمال بروفايل الأسرة.\n✅ اجتياز مقياس التقييم الذكي (الجدارات).\n✅ الحصول على شهادة الأكاديمية أو تقديم نموذج منتج.',
    subOptions: [
      {
        id: 'funding_apply',
        label: '📝 طريقة تقديم طلب التمويل',
        response: 'بعد تسجيل الدخول، اختر "تقييم الجدارات والتمويل"، ثم املأ البيانات المالية والإنتاجية وسيصلك رد اللجنة خلال 48 ساعة.'
      }
    ]
  },
  {
    id: 'initiatives_membership',
    label: '📜 كيف أسجل في المبادرات والعضويات؟',
    response: 'تتيح المنصة برامج عضوية متعددة (عضوية الحرفيين، عضوية الأسر المنتجة، عضوية الداعمين والشركاء).\n\nيمكنك الاطلاع على تفاصيل ومزايا كل عضوية عبر صفحة العضويات (/membership) وصفحة المبادرات (/initiatives).',
    subOptions: [
      {
        id: 'init_page',
        label: '🌟 استعراض المبادرات القائمة',
        response: 'تضم المبادرات: مبادرة "بركة الحرمين" لوجبات الإطعام، مبادرة "حرفتي أمان"، ومبادرة "سفراء التراث السعودي".',
        actionLink: { label: 'صفحة المبادرات 🌟', url: '/initiatives' }
      },
      {
        id: 'mem_page',
        label: '🎖️ استعراض باقات العضوية',
        response: 'تمنحك العضويات أولوية المشاركة في المعارض، خصومات على الاستشارات، وإمكانية بيع المنتجات في المتجر التراثي.',
        actionLink: { label: 'صفحة العضويات 🎖️', url: '/membership' }
      }
    ]
  },
  {
    id: 'issue_order',
    label: '📦 لدي مشكلة أو استفسار بخصوص طلب سابق',
    response: 'نأسف لأي إزعاج! يرجى اختيار نوع المشكلة لنقوم بتقديم الحل الفوري أو تصعيد طلبك لمشرف التوصيل:',
    subOptions: [
      {
        id: 'issue_delay',
        label: '⏳ تأخر وصول الطلب',
        response: 'مندوب التوصيل في طريقه إليك. يمكنك تتبع الشحنة من خلال رقم الفاتورة المرفق في رسالة التأكيد أو التواصل المباشر معنا.'
      },
      {
        id: 'issue_wrong_item',
        label: '🔄 نقص أو تغيير في الطلب',
        response: 'نلتزم باستبدال الطلب فوراً أو رد المبلغ بالكامل بدون أي تكلفة إضافية عليك.'
      }
    ]
  },
  {
    id: 'issue_website',
    label: '💻 لدي مشكلة في تصفح الموقع أو تسجيل الدخول',
    response: 'تأكد من اختيار اسم المستخدم الصحيح أو استخدام خيار الدخول الفوري عبر رقم الجوال OTP. إذا استمرت المشكلة، يمكنك الضغط على زر "التواصل مع موظف الدعم البشري".'
  },
  {
    id: 'escalate_human',
    label: '👤 التواصل المباشر مع موظف الدعم البشري',
    response: 'أهلاً بك! سيتم تحويلك فوراً إلى أحد ممثلي خدمة العملاء والدعم الفني بمؤسسة التفكير والنماء إرث أجيال. يسعدنا تقديم العون الفوري لك.'
  }
];

export default function SmartSupportModal({ onClose, lang = 'ar', initialInfo }: SmartSupportModalProps) {
  // Navigation stack in decision tree
  const [history, setHistory] = useState<OptionNode[]>([]);
  const [currentNode, setCurrentNode] = useState<OptionNode | null>(null);
  
  // Custom text input
  const [inputQuery, setInputQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; actionLink?: { label: string; url: string } }>>(() => {
    if (initialInfo && (initialInfo.familyName || initialInfo.familyCode || initialInfo.orderNumber)) {
      return [
        {
          sender: 'bot',
          text: `أهلاً بك في دعم منصة إرث أجيال! 🎧\n\nتم فتح طلب المساعدة الخاص بالمتجر:\n• الأسرة: ${initialInfo.familyName || 'غير محدد'}\n• رمز الأسرة الداخلي: ${initialInfo.familyCode || 'غير محدد'}\n• المنتج: ${initialInfo.productName || 'غير محدد'}\n• رقم الطلب: ${initialInfo.orderNumber || 'لا يوجد طلب حتى الآن'}\n\nفريق الدعم الفني جاهز لمساعدتك وحل أي استفسار فوراً.`
        }
      ];
    }
    return [
      {
        sender: 'bot',
        text: 'أهلاً بك في الدعم الفني الذكي لمنصة إرث أجيال ومؤسسة التفكير والنماء! 🌴\nكيف يمكنني مساعدتك اليوم؟ يمكنك اختيار إحدى الخيارات الجاهزة أدناه أو كتابة استفسارك مباشرة.'
      }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);
  const [humanEscalated, setHumanEscalated] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);

  // Navigate deeper into decision tree
  const handleSelectOption = (node: OptionNode) => {
    if (node.id === 'escalate_human') {
      handleHumanEscalation();
      return;
    }

    // Add user message
    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: node.label }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      // Update tree state
      if (currentNode) {
        setHistory(prev => [...prev, currentNode]);
      }
      setCurrentNode(node);

      if (node.response) {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: node.response!,
            actionLink: node.actionLink
          }
        ]);
      }
    }, 600);
  };

  // Back to previous category
  const handleGoBack = () => {
    if (history.length === 0) {
      setCurrentNode(null);
    } else {
      const prevNode = history[history.length - 1];
      setHistory(prev => prev.slice(0, prev.length - 1));
      setCurrentNode(prevNode);
    }
  };

  // Back to top level menu
  const handleGoHome = () => {
    setHistory([]);
    setCurrentNode(null);
  };

  // Escalate to human support specialist
  const handleHumanEscalation = () => {
    const tNum = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(tNum);
    setHumanEscalated(true);

    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: '👤 التواصل مع موظف الدعم البشري' },
      {
        sender: 'bot',
        text: `تم فتح تذكرة دعم فني مباشرة برقم [${tNum}]! 🎧\n\nتم ربطك بموظف الخدمة المناوب: (أ. سارة العتيبي - قسم العناية بضيوف المنصة).\nمتوسط وقت الانتظار الحالي: أسرع من دقيقة واحدة.`
      }
    ]);
  };

  // Handle free form text question
  const handleSendQuery = () => {
    if (!inputQuery.trim()) return;
    const query = inputQuery.trim();
    setInputQuery('');

    setChatMessages(prev => [...prev, { sender: 'user', text: query }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let replyText = 'شكراً لتواصلك معنا! لقد تم تسجيل استفسارك وسيتم تزويدك بالرد فوراً. يمكنك تصفح الخدمات والاستشارات المتاحة عبر الأقسام الرسمية.';
      let actLink: { label: string; url: string } | undefined = undefined;

      const qLower = query.toLowerCase();
      if (qLower.includes('متجر') || qLower.includes('شراء') || qLower.includes('طلب') || qLower.includes('منتج')) {
        replyText = 'يمكنك الشراء المباشر الفوري للمنسوجات المأكولات التراثية والمنتجات الحرفية عبر صفحة المتجر المستقل دون أي اشتراكات!';
        actLink = { label: 'انتقل للمتجر المستقل 🛍️', url: '/store' };
      } else if (qLower.includes('استشار') || qLower.includes('حجز') || qLower.includes('خبير')) {
        replyText = 'نوفر استشارات إدارية ومالية وتسويقية مجانية للمستفيدين مع مستشاري التفكير والنماء.';
        actLink = { label: 'حجز استشارة 🩺', url: '/consulting' };
      } else if (qLower.includes('خدمات') || qLower.includes('دورة') || qLower.includes('تدريب')) {
        replyText = 'تضم خدماتنا الأكاديمية والتدريبية برامج تمكين الأسر المنتجة والحرفيين وتأهيلهم لسوق العمل.';
        actLink = { label: 'استعراض كافة الخدمات 🎓', url: '/services' };
      } else if (qLower.includes('عضوية') || qLower.includes('اشتراك')) {
        replyText = 'تتيح العضويات خصومات حصرية، حواضن أعمال، وأولوية المشاركة في المعارض والملتقيات التراثية.';
        actLink = { label: 'صفحة العضويات 🎖️', url: '/membership' };
      } else if (qLower.includes('تمويل') || qLower.includes('دعم') || qLower.includes('مبلغ')) {
        replyText = 'برنامج التمويل التمكيني يمنح دراسات جدوى ودعماً بدون فوائد وبدون كفيل غارم بناءً على تقييم الجدارات بالمنصة.';
      } else if (qLower.includes('من نحن') || qLower.includes('المؤسسة') || qLower.includes('رؤية')) {
        replyText = 'إرث أجيال ومؤسسة التفكير والنماء هي منظومة وطنية تهدف لتمكين الأسر المنتجة ورعاة الأعمال الحرفية.';
        actLink = { label: 'عن المؤسسة ورؤيتنا 🌟', url: '/about' };
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'bot', text: replyText, actionLink: actLink }
      ]);
    }, 1000);
  };

  // Determine current choices to display below chat
  const currentOptions = currentNode 
    ? (currentNode.subOptions || [])
    : SUPPORT_DECISION_TREE;

  return (
    <div className="fixed inset-0 bg-stone-900/65 backdrop-blur-sm z-[999] flex items-center justify-center p-3 sm:p-4 text-right font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-[2rem] max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[92vh]"
        id="smart-support-modal-container"
      >
        {/* Header Bar */}
        <div className="bg-[#174F3E] p-4 text-white flex items-center justify-between shadow-md flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all cursor-pointer"
            title="إغلاق"
            id="smart-support-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
                <h3 className="font-black text-sm md:text-base text-white">الدعم الفني الذكي 💬</h3>
              </div>
              <p className="text-[10px] text-accent/90 font-light mt-0.5">
                مساعد إرث أجيال والتفكير والنماء التفاعلي المباشر
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-accent shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Toolbar (Back to previous / Main menu) */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center justify-between text-xs flex-shrink-0">
          <div className="flex items-center gap-2">
            {(currentNode || history.length > 0) && (
              <button
                type="button"
                onClick={handleGoBack}
                className="bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                id="support-back-prev-btn"
              >
                <CornerUpLeft className="w-3.5 h-3.5 text-[#174F3E]" />
                <span>↩ العودة للقائمة السابقة</span>
              </button>
            )}

            {currentNode && (
              <button
                type="button"
                onClick={handleGoHome}
                className="bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                id="support-back-home-btn"
              >
                <Home className="w-3.5 h-3.5 text-[#174F3E]" />
                <span>🏠 القائمة الرئيسية</span>
              </button>
            )}
          </div>

          <span className="text-[10px] text-stone-400 font-bold hidden sm:inline-block">
            {currentNode ? currentNode.label.substring(0, 25) + '...' : 'القائمة الرئيسية للدعم'}
          </span>
        </div>

        {/* Scrollable Conversation Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fbfbfa]">
          {chatMessages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed text-right shadow-xs ${
                    isUser
                      ? 'bg-[#174F3E] text-white rounded-tl-none font-medium'
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tr-none'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium text-[11px] md:text-xs">
                    {msg.text}
                  </p>

                  {/* Optional Action Button Link attached to message */}
                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 text-left">
                      <a
                        href={msg.actionLink.url}
                        onClick={(e) => {
                          e.preventDefault();
                          onClose();
                          window.location.hash = msg.actionLink!.url;
                          window.dispatchEvent(new CustomEvent('hashchange'));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#174F3E] hover:bg-[#174F3E]/90 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer"
                      >
                        <span>{msg.actionLink.label}</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Typing Animation Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <div className="bg-white border border-stone-200 px-3.5 py-2 rounded-2xl rounded-tr-none text-stone-500 text-[11px] flex items-center gap-2">
                <span className="font-bold text-[10px]">المساعد الذكي يجهز الإجابة</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#174F3E] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#174F3E] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-[#174F3E] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
              </div>
            </motion.div>
          )}

          {/* Human Escalated Status Badge */}
          {humanEscalated && ticketNumber && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-800 text-[11px] font-bold space-y-1 text-center animate-pulse">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم ربطك بموظف الدعم المباشر (التذكرة: {ticketNumber})</span>
              </div>
              <p className="text-[10px] font-light text-emerald-700">
                يمكنك كتابة تفاصيل استفسارك أدناه وسيقوم الموظف بالرد عليك فوراً خلال هذه المحادثة.
              </p>
            </div>
          )}
        </div>

        {/* Guided Interactive Options Area (Clickable Choice Pills) */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex-shrink-0 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 px-1">
            <span>💡 اختر سؤالاً أو خياراً للوصول السريع:</span>
            <span>{currentOptions.length} خيارات متاحة</span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
            {currentOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className="w-full text-right bg-white hover:bg-[#174F3E] text-stone-800 hover:text-white border border-stone-200 hover:border-[#174F3E] p-2.5 rounded-xl text-[11px] font-bold transition-all shadow-xs flex items-center justify-between group cursor-pointer"
              >
                <span className="leading-snug">{opt.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform flex-shrink-0 mr-1" />
              </button>
            ))}

            {/* Escalate button option if not at top or not escalated */}
            {!humanEscalated && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={handleHumanEscalation}
                  className="w-full text-right bg-primary hover:bg-primary/95 text-accent border border-primary p-3 rounded-xl text-xs font-black transition-all shadow-xs flex items-center justify-between group cursor-pointer"
                >
                  <span>👤 تحويل الطلب لموظف الدعم المباشر منصة إرث أجيال</span>
                  <Headphones className="w-4 h-4 text-accent flex-shrink-0" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Free Form Question Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleSendQuery}
            className="bg-[#174F3E] hover:bg-[#174F3E]/90 text-white p-2.5 rounded-xl shadow-sm transition-all cursor-pointer hover:scale-105 flex-shrink-0"
            title="إرسال"
            id="smart-support-send-btn"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendQuery();
              }
            }}
            placeholder="اكتب استفسارك بحرية هنا..."
            className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#174F3E] text-right font-medium"
            id="smart-support-text-input"
          />
        </div>
      </motion.div>
    </div>
  );
}

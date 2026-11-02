import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface TrackSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTrack: 'general' | 'family' | 'pilgrim' | 'visitor' | 'partner';
  onSelectTrack: (track: 'family' | 'pilgrim' | 'visitor' | 'partner') => void;
}

export default function TrackSwitcherModal({
  isOpen,
  onClose,
  activeTrack,
  onSelectTrack
}: TrackSwitcherModalProps) {
  if (!isOpen) return null;

  const tracks = [
    {
      id: 'family' as const,
      icon: '👩‍🍳',
      title: 'مسار رائدات العمل الحر والحرفيين',
      badge: 'المرتكز الأساسي',
      desc: 'التأهيل، التقييم الذكي، التدريب، الاعتماد، المتجر الخاص، والتمكين الاقتصادي.',
      color: 'bg-amber-50 border-amber-300 text-stone-900 hover:border-amber-500',
      btnColor: 'bg-primary text-accent hover:bg-primary/90'
    },
    {
      id: 'pilgrim' as const,
      icon: '🕋',
      title: 'مسار المعتمر وضيوف الرحمن',
      badge: 'ضيافة الحرمين',
      desc: 'الوجبات التراثية، باقات الضيافة الفندقية بمكة والمدينة، الهدايا، والتوصيل المباشر.',
      color: 'bg-emerald-50 border-emerald-300 text-stone-900 hover:border-emerald-500',
      btnColor: 'bg-emerald-700 text-white hover:bg-emerald-800'
    },
    {
      id: 'visitor' as const,
      icon: '🕌',
      title: 'مسار الزائر والسائح',
      badge: 'إثراء التجربة',
      desc: 'اكتشاف التراث، الحرف اليدوية المحلية، التجارب التفاعلية، والجولات التاريخية.',
      color: 'bg-blue-50 border-blue-300 text-stone-900 hover:border-blue-500',
      btnColor: 'bg-blue-700 text-white hover:bg-blue-800'
    },
    {
      id: 'partner' as const,
      icon: '🤝',
      title: 'مسار الجهات والشركاء والداعمين',
      badge: 'الاستدامة والأثر',
      desc: 'فرص الشراكة الاستراتيجية، كفالة رائدات العمل الحر، عقود التوريد المؤسسي، وتقارير الأثر التنموي.',
      color: 'bg-stone-50 border-stone-300 text-stone-900 hover:border-stone-500',
      btnColor: 'bg-stone-900 text-white hover:bg-stone-800'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs dir-rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">اختر مسارك المخصص</h3>
                <p className="text-stone-500 text-xs font-light">انتقل فورًا إلى الواجهة المستقلة المصممة خصيصًا لاحتياجك</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Track Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tracks.map((tr) => {
              const isCurrent = activeTrack === tr.id;

              return (
                <div
                  key={tr.id}
                  onClick={() => {
                    onSelectTrack(tr.id);
                    onClose();
                  }}
                  className={`p-5 rounded-2xl border ${tr.color} space-y-3 cursor-pointer transition-all hover:shadow-md relative flex flex-col justify-between ${
                    isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute top-3 left-3 bg-primary text-accent text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <Check className="w-3 h-3" /> مسارك الحالي
                    </span>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{tr.icon}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-stone-200 text-stone-700">
                        {tr.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm md:text-base">{tr.title}</h4>
                    <p className="text-stone-600 text-xs font-light leading-relaxed">{tr.desc}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrack(tr.id);
                      onClose();
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${tr.btnColor}`}
                  >
                    <span>الدخول لمسار {tr.title.split(' ')[1]}</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="pt-2 text-center text-[11px] text-stone-400 font-light">
            يمكنك تغيير مسارك في أي وقت عبر زر "تغيير المسار" المتوفر في شريط التنقل العلوي.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

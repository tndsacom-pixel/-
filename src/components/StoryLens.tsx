import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowLeft, AlertCircle, CheckCircle, Sparkles, Flame, ShieldCheck, HeartHandshake, QrCode } from 'lucide-react';
import { ChallengeItem } from '../types';

import SadaqahMealModal from './SadaqahMealModal';
import MealQrCodeModal from './MealQrCodeModal';

interface StoryLensProps {
  challenges: ChallengeItem[];
  onStartJourney: () => void;
}

export default function StoryLens({ challenges, onStartJourney }: StoryLensProps) {
  const [activeLens, setActiveLens] = useState<boolean>(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('hospitality');

  // Modals state
  const [isSadaqahOpen, setIsSadaqahOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  const currentChallenge = challenges.find(c => c.domain === selectedDomain) || challenges[0];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden max-w-5xl mx-auto my-6" id="story-lens-container">
      {/* Header Banner with Premium Identity */}
      <div className="bg-primary text-white p-8 relative overflow-hidden text-center" id="story-header">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 px-4 py-1.5 rounded-full text-accent text-sm mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>قصة تفاعلية تجسد الواقع والأثر</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-stone-100">
          ورث أجيال: من التأهيل إلى التمكين
        </h1>
        <p className="text-stone-300 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
          انضم إلينا في رحلة بصرية تهدف إلى كشف وإزالة تحديات الأسر المنتجة، وتحويل أعمالهم المنزلية البسيطة إلى مشاريع ريادية مستدامة تلبي تطلعات المستقبل.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {/* Toggle Controls for the Digital Smart Lens */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 mb-8" id="lens-controls">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${activeLens ? 'bg-primary text-accent' : 'bg-stone-100 text-stone-500'} transition-all duration-300`}>
              <Eye className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 text-base md:text-lg">العدسة الرقمية التفاعلية الذكية</h3>
              <p className="text-xs text-stone-500">قم بتفعيل العدسة لمشاهدة المشاكل والتحديات، أو إطفائها لرؤية أثر التمكين والحلول.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
            <button
              onClick={() => setActiveLens(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                !activeLens ? 'bg-accent text-primary shadow' : 'text-stone-600 hover:text-stone-800'
              }`}
              id="lens-off-btn"
            >
              عدسة التمكين والنجاح ✨
            </button>
            <button
              onClick={() => setActiveLens(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeLens ? 'bg-red-600 text-white shadow' : 'text-stone-600 hover:text-stone-800'
              }`}
              id="lens-on-btn"
            >
              عدسة كشف التحديات 🔍
            </button>
          </div>
        </div>

        {/* Categories Tab selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8" id="domain-tabs">
          {challenges.map((item) => {
            const isActive = selectedDomain === item.domain;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDomain(item.domain)}
                className={`py-3.5 px-3 rounded-xl border font-bold text-sm transition-all text-center flex flex-col items-center gap-1.5 ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                }`}
                id={`tab-${item.domain}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${
                  item.domain === 'hospitality' ? 'bg-amber-500' :
                  item.domain === 'culinary' ? 'bg-orange-500' :
                  item.domain === 'crafts' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                {item.domainLabel}
              </button>
            );
          })}
        </div>

        {/* Interactive Story Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            id="story-details-grid"
          >
            {/* Story Image Card */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[250px] lg:min-h-full shadow border border-stone-200">
              <img
                src={currentChallenge.imageUrl}
                alt={currentChallenge.beneficiaryName}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-bold text-accent bg-primary px-2.5 py-1 rounded-full w-max mb-2">
                  {currentChallenge.domainLabel}
                </span>
                <h4 className="text-xl font-bold text-white mb-1">{currentChallenge.beneficiaryName}</h4>
                <p className="text-xs text-stone-200 leading-relaxed font-light">{currentChallenge.beneficiaryStory}</p>
              </div>
            </div>

            {/* Story Content Card with 3D Flip Lens Effect */}
            <div className="lg:col-span-7" style={{ perspective: 1500 }}>
              <motion.div
                animate={{ rotateY: activeLens ? 0 : 180 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className={`relative w-full min-h-[480px] lg:h-full transition-shadow duration-500 rounded-3xl ${
                  activeLens 
                    ? "shadow-[0_0_30px_rgba(239,68,68,0.08)]" 
                    : "shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                }`}
              >
                {/* FRONT FACE (Challenges / Red Lens) */}
                <div
                  style={{ 
                    backfaceVisibility: "hidden", 
                    WebkitBackfaceVisibility: "hidden",
                    position: "absolute",
                    inset: 0
                  }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-red-150 shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                      <span className="text-xs font-mono text-red-500 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        تحديات قائمة قبل التأهيل
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full bg-red-50 text-red-700">
                        <span>النشاط:</span>
                        <span className="font-extrabold">{currentChallenge.domainLabel}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <h4 className="font-bold text-base md:text-lg">العوائق التي تواجه {currentChallenge.beneficiaryName}:</h4>
                      </div>
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {currentChallenge.challenges.map((challenge, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-red-50/40 border border-red-100/50 p-3.5 rounded-xl text-stone-700 text-sm leading-relaxed"
                          >
                            <span className="bg-red-100 text-red-700 font-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <p className="font-medium text-stone-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-red-600 font-semibold animate-pulse text-center sm:text-right">
                      💡 اضغط على "عدسة التمكين والنجاح" لرؤية كيف نغير هذا الواقع!
                    </div>
                    <button
                      onClick={onStartJourney}
                      className="flex items-center gap-2 bg-[#0B3A60] hover:bg-[#0B3A60]/95 text-accent px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center cursor-pointer"
                    >
                      <span>ابدأ رحلة التمكين</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* BACK FACE (Success / Green Lens) */}
                <div
                  style={{ 
                    backfaceVisibility: "hidden", 
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    position: "absolute",
                    inset: 0
                  }}
                  className="bg-white p-6 md:p-8 rounded-3xl border border-emerald-150 shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                      <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        تمكين وأثر ريادي مستدام
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-800">
                        <span>النشاط:</span>
                        <span className="font-extrabold">{currentChallenge.domainLabel}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-700 mb-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                        <h4 className="font-bold text-base md:text-lg text-primary">النتائج التمكينية لـ {currentChallenge.beneficiaryName}:</h4>
                      </div>
                      <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                        {currentChallenge.successIndicators.map((success, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-emerald-50/20 border border-emerald-100/50 p-3.5 rounded-xl text-stone-700 text-sm leading-relaxed"
                          >
                            <span className="bg-emerald-500 text-white font-black rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <p className="font-medium text-stone-700">{success}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSadaqahOpen(true)}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <HeartHandshake className="w-4 h-4 text-amber-300" />
                        <span>وجبة بر وصدقة بالحرم 🕊️</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsQrOpen(true)}
                        className="bg-[#003B6F] hover:bg-[#002D54] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <QrCode className="w-4 h-4 text-amber-300" />
                        <span>رمز الـ QR والقصة 📱</span>
                      </button>
                    </div>

                    <button
                      onClick={onStartJourney}
                      className="flex items-center gap-2 bg-[#0B3A60] hover:bg-[#0B3A60]/95 text-accent px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center cursor-pointer"
                    >
                      <span>ابدأ رحلة التمكين</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MODALS */}
        {isSadaqahOpen && (
          <SadaqahMealModal 
            familyName={currentChallenge.beneficiaryName}
            onClose={() => setIsSadaqahOpen(false)}
          />
        )}

        {isQrOpen && (
          <MealQrCodeModal 
            familyName={currentChallenge.beneficiaryName}
            heritageStory={currentChallenge.beneficiaryStory}
            onClose={() => setIsQrOpen(false)}
          />
        )}

        {/* Feature quick icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-stone-200 pt-8" id="quick-features">
          <div className="flex items-center gap-3 p-4 bg-stone-100/50 rounded-xl border border-stone-200">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-stone-800 text-sm">ليس مجرد تمويل</h5>
              <p className="text-xs text-stone-500">نركز على رفع كفاءة التشغيل والتسويق لبناء مشروع مستقل وقابل للنمو.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-stone-100/50 rounded-xl border border-stone-200">
            <div className="bg-accent/10 p-2.5 rounded-lg text-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-stone-800 text-sm">تأهيل رقمي ذكي</h5>
              <p className="text-xs text-stone-500">ملف مهني رقمي متكامل، تقييم جاهزية مستمر، ومطابقة فرص ذكية.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-stone-100/50 rounded-xl border border-stone-200">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-stone-800 text-sm">شراكة نحو الاستدامة</h5>
              <p className="text-xs text-stone-500">تمكين مستدام ينقل الأسر المنتجة من العوز إلى الاكتفاء والنمو.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

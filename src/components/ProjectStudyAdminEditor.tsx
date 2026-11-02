import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Layers, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  Sparkles, 
  ShieldCheck,
  Edit3,
  Percent,
  Receipt,
  PiggyBank,
  Landmark,
  UtensilsCrossed,
  Info
} from 'lucide-react';
import { 
  ProjectStudyData, 
  getProjectStudyData, 
  saveProjectStudyData, 
  resetProjectStudyData,
  DEFAULT_PROJECT_STUDY_DATA,
  SpaceItem,
  EquipmentCategory
} from '../services/projectStudyService';

export const ProjectStudyAdminEditor: React.FC = () => {
  const [data, setData] = useState<ProjectStudyData>(() => getProjectStudyData());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [activeAdminSection, setActiveAdminSection] = useState<'spaces' | 'equipment' | 'financial'>('spaces');

  useEffect(() => {
    const handleUpdate = () => {
      setData(getProjectStudyData());
    };
    window.addEventListener('warath_project_study_updated', handleUpdate);
    return () => window.removeEventListener('warath_project_study_updated', handleUpdate);
  }, []);

  const handleSave = () => {
    saveProjectStudyData(data);
    setSaveSuccessMsg('تم حفظ بيانات دراسة المشروع بنجاح وتحديثها في كامل المنصة!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('هل تريد استعادة البيانات الافتراضية المعتمدة لدراسة المشروع (المساحة الإجمالية 630 م² والبنود الأصلية)؟')) {
      const def = resetProjectStudyData();
      setData(def);
      setSaveSuccessMsg('تمت استعادة البيانات الافتراضية المعتمدة بنجاح!');
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  // Helper for space changes
  const handleSpaceChange = (index: number, field: keyof SpaceItem, value: any) => {
    const updatedSpaces = [...data.spaces];
    updatedSpaces[index] = {
      ...updatedSpaces[index],
      [field]: field === 'area' ? Number(value) || 0 : value
    };
    const newTotal = updatedSpaces.reduce((sum, sp) => sum + (Number(sp.area) || 0), 0);
    setData({
      ...data,
      spaces: updatedSpaces,
      totalOperationalArea: newTotal
    });
  };

  // Helper for equipment changes
  const handleEquipmentItemChange = (catIdx: number, itemIdx: number, value: string, lang: 'ar' | 'en') => {
    const updatedCats = [...data.equipmentCategories];
    const targetCat = { ...updatedCats[catIdx] };
    if (lang === 'ar') {
      const items = [...targetCat.itemsAr];
      items[itemIdx] = value;
      targetCat.itemsAr = items;
    } else {
      const items = [...targetCat.itemsEn];
      items[itemIdx] = value;
      targetCat.itemsEn = items;
    }
    updatedCats[catIdx] = targetCat;
    setData({ ...data, equipmentCategories: updatedCats });
  };

  const handleAddEquipmentItem = (catIdx: number) => {
    const updatedCats = [...data.equipmentCategories];
    const targetCat = { ...updatedCats[catIdx] };
    targetCat.itemsAr = [...targetCat.itemsAr, 'بند جديد'];
    targetCat.itemsEn = [...targetCat.itemsEn, 'New Asset Item'];
    updatedCats[catIdx] = targetCat;
    setData({ ...data, equipmentCategories: updatedCats });
  };

  const handleRemoveEquipmentItem = (catIdx: number, itemIdx: number) => {
    const updatedCats = [...data.equipmentCategories];
    const targetCat = { ...updatedCats[catIdx] };
    targetCat.itemsAr = targetCat.itemsAr.filter((_, i) => i !== itemIdx);
    targetCat.itemsEn = targetCat.itemsEn.filter((_, i) => i !== itemIdx);
    updatedCats[catIdx] = targetCat;
    setData({ ...data, equipmentCategories: updatedCats });
  };

  // Helper for CapEx items
  const handleCapExItemChange = (itemIdx: number, value: string, lang: 'ar' | 'en') => {
    const updatedCapEx = { ...data.capEx };
    if (lang === 'ar') {
      const items = [...updatedCapEx.itemsAr];
      items[itemIdx] = value;
      updatedCapEx.itemsAr = items;
    } else {
      const items = [...updatedCapEx.itemsEn];
      items[itemIdx] = value;
      updatedCapEx.itemsEn = items;
    }
    setData({ ...data, capEx: updatedCapEx });
  };

  const handleAddCapExItem = () => {
    setData({
      ...data,
      capEx: {
        ...data.capEx,
        itemsAr: [...data.capEx.itemsAr, 'بند تأسيسي جديد'],
        itemsEn: [...data.capEx.itemsEn, 'New CapEx Item']
      }
    });
  };

  const handleRemoveCapExItem = (itemIdx: number) => {
    setData({
      ...data,
      capEx: {
        ...data.capEx,
        itemsAr: data.capEx.itemsAr.filter((_, i) => i !== itemIdx),
        itemsEn: data.capEx.itemsEn.filter((_, i) => i !== itemIdx)
      }
    });
  };

  const calculatedTotal = data.spaces.reduce((acc, s) => acc + (Number(s.area) || 0), 0);

  return (
    <div className="space-y-6 text-right" dir="rtl" id="project-study-admin-editor">
      
      {/* Header and Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF9F6] border border-stone-200 p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#174F3E]" />
            <h3 className="text-lg font-black text-stone-900">
              إدارة بيانات دراسة المشروع والجدوى التشغيلية والمالية
            </h3>
          </div>
          <p className="text-stone-500 text-xs font-normal">
            تحكم كامل في توزيع المساحات الـ 630 م²، قوائم الأصول والمعدات، نسب الإهلاك والصيانة، وعناصر الهيكل المالي.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-stone-600 bg-white hover:bg-stone-100 border border-stone-200 flex items-center gap-1.5 transition-all cursor-pointer"
            title="استعادة القيم الافتراضية المعتمدة"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-xs font-black text-white bg-[#174F3E] hover:bg-[#123E31] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-amber-300" />
            <span>حفظ التعديلات</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Subtabs for Editor */}
      <div className="flex border-b border-stone-200 gap-2 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveAdminSection('spaces')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeAdminSection === 'spaces'
              ? 'bg-[#174F3E] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>1. المساحات والمقرات ({calculatedTotal} م²)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminSection('equipment')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeAdminSection === 'equipment'
              ? 'bg-[#174F3E] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. الأصول والمعدات للتأسيس (4 فئات)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminSection('financial')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeAdminSection === 'financial'
              ? 'bg-[#174F3E] text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>3. الدراسة المالية (CapEx, OpEx, رأس المال)</span>
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PART 1: SPACES MANAGEMENT (المساحات والمقرات)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminSection === 'spaces' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>مجموع المساحات المحسوبة حالياً:</span>
              <span className="font-mono text-sm font-black bg-white px-2 py-0.5 rounded border border-emerald-300">
                {calculatedTotal} م²
              </span>
            </div>
            {calculatedTotal !== 630 && (
              <span className="text-[11px] text-amber-700 font-medium">
                (المساحة المعتمدة بالدراسة الأصلية: 630 م²)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.spaces.map((space, index) => (
              <div key={space.id} className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-mono text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="font-black text-stone-900 text-xs">
                      {space.nameAr}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-[11px] font-bold text-stone-500">المساحة:</label>
                    <input
                      type="number"
                      min="1"
                      value={space.area}
                      onChange={(e) => handleSpaceChange(index, 'area', e.target.value)}
                      className="w-20 px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono font-bold text-center focus:bg-white"
                    />
                    <span className="text-xs text-stone-500 font-bold">م²</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-0.5">اسم القسم (بالعربية):</label>
                    <input
                      type="text"
                      value={space.nameAr}
                      onChange={(e) => handleSpaceChange(index, 'nameAr', e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-0.5">اسم القسم (بالإنجليزية):</label>
                    <input
                      type="text"
                      value={space.nameEn}
                      onChange={(e) => handleSpaceChange(index, 'nameEn', e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:bg-white text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-0.5">الاستخدام المخصص (بالعربية):</label>
                    <textarea
                      rows={2}
                      value={space.usageAr}
                      onChange={(e) => handleSpaceChange(index, 'usageAr', e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:bg-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-0.5">الاستخدام المخصص (بالإنجليزية):</label>
                    <textarea
                      rows={2}
                      value={space.usageEn}
                      onChange={(e) => handleSpaceChange(index, 'usageEn', e.target.value)}
                      className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:bg-white resize-none text-left"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PART 2: EQUIPMENT MANAGEMENT (المعدات والأصول)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminSection === 'equipment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.equipmentCategories.map((cat, catIdx) => (
              <div key={cat.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h4 className="font-black text-stone-900 text-sm">
                    {cat.titleAr}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddEquipmentItem(catIdx)}
                    className="text-[11px] font-bold text-[#174F3E] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>إضافة بند</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cat.itemsAr.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-[#FAF9F6] border border-stone-200/80 p-3 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-stone-400 font-bold">بند #{itemIdx + 1}</span>
                        {cat.itemsAr.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEquipmentItem(catIdx, itemIdx)}
                            className="text-rose-600 hover:text-rose-800 p-1 text-xs cursor-pointer"
                            title="حذف البند"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleEquipmentItemChange(catIdx, itemIdx, e.target.value, 'ar')}
                        placeholder="اسم البند بالعربية"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium"
                      />
                      <input
                        type="text"
                        value={cat.itemsEn[itemIdx] || ''}
                        onChange={(e) => handleEquipmentItemChange(catIdx, itemIdx, e.target.value, 'en')}
                        placeholder="Item name in English"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium text-left"
                        dir="ltr"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PART 3: FINANCIAL STRUCTURE MANAGEMENT (الهيكل المالي)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeAdminSection === 'financial' && (
        <div className="space-y-6">
          
          {/* Methodology Note */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              <span>الملاحظة المنهجية المالية (نموذج منشآت القياسي):</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">الملاحظة بالعربية:</label>
                <textarea
                  rows={3}
                  value={data.financialMethodologyNoteAr}
                  onChange={(e) => setData({ ...data, financialMethodologyNoteAr: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">Methodology Note (English):</label>
                <textarea
                  rows={3}
                  value={data.financialMethodologyNoteEn}
                  onChange={(e) => setData({ ...data, financialMethodologyNoteEn: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white resize-none text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Maintenance & Depreciation Rates */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-700" />
              <span>نسب الصيانة والإهلاك الدائم (معروضة كنسب مئوية كما هي):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">نسبة صيانة المعدات السنوية (%):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={data.opEx.maintenancePercent}
                    onChange={(e) => setData({
                      ...data,
                      opEx: { ...data.opEx, maintenancePercent: Number(e.target.value) || 5 }
                    })}
                    className="w-24 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-mono font-black text-center"
                  />
                  <span className="text-xs text-stone-600 font-bold">% سنويًا</span>
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">نسبة الإهلاك الدائم للمعدات والأثاث (%):</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={data.opEx.depreciationPercent}
                    onChange={(e) => setData({
                      ...data,
                      opEx: { ...data.opEx, depreciationPercent: Number(e.target.value) || 10 }
                    })}
                    className="w-24 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-mono font-black text-center"
                  />
                  <span className="text-xs text-stone-600 font-bold">% سنويًا</span>
                </div>
              </div>
            </div>
          </div>

          {/* CapEx Items */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#174F3E]" />
                <span>عناصر تكاليف التأسيس والرأسمالية (CapEx):</span>
              </h4>
              <button
                type="button"
                onClick={handleAddCapExItem}
                className="text-[11px] font-bold text-[#174F3E] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>إضافة بند CapEx</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.capEx.itemsAr.map((item, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-400 font-bold">بند #{idx + 1}</span>
                    {data.capEx.itemsAr.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCapExItem(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 text-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleCapExItemChange(idx, e.target.value, 'ar')}
                    className="w-full px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium"
                    placeholder="البند بالعربية"
                  />
                  <input
                    type="text"
                    value={data.capEx.itemsEn[idx] || ''}
                    onChange={(e) => handleCapExItemChange(idx, e.target.value, 'en')}
                    className="w-full px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-medium text-left"
                    dir="ltr"
                    placeholder="Item in English"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Working Capital & Funding Structure */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <h4 className="font-black text-stone-900 text-sm flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-emerald-800" />
              <span>رأس المال العامل وهيكل التمويل:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">فترة تغطية رأس المال العامل (بالأشهر):</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">من:</span>
                  <input
                    type="number"
                    min="1"
                    value={data.workingCapitalAndFunding.workingCapitalMonthsMin}
                    onChange={(e) => setData({
                      ...data,
                      workingCapitalAndFunding: {
                        ...data.workingCapitalAndFunding,
                        workingCapitalMonthsMin: Number(e.target.value) || 3
                      }
                    })}
                    className="w-16 px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono font-bold text-center"
                  />
                  <span className="text-xs text-stone-500">إلى:</span>
                  <input
                    type="number"
                    min="1"
                    value={data.workingCapitalAndFunding.workingCapitalMonthsMax}
                    onChange={(e) => setData({
                      ...data,
                      workingCapitalAndFunding: {
                        ...data.workingCapitalAndFunding,
                        workingCapitalMonthsMax: Number(e.target.value) || 6
                      }
                    })}
                    className="w-16 px-2 py-1 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono font-bold text-center"
                  />
                  <span className="text-xs text-stone-500 font-bold">أشهر</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">وصف هيكل التمويل (بالعربية):</label>
                <textarea
                  rows={4}
                  value={data.workingCapitalAndFunding.fundingStructureDescAr}
                  onChange={(e) => setData({
                    ...data,
                    workingCapitalAndFunding: {
                      ...data.workingCapitalAndFunding,
                      fundingStructureDescAr: e.target.value
                    }
                  })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-500 mb-1">Funding Structure Description (English):</label>
                <textarea
                  rows={4}
                  value={data.workingCapitalAndFunding.fundingStructureDescEn}
                  onChange={(e) => setData({
                    ...data,
                    workingCapitalAndFunding: {
                      ...data.workingCapitalAndFunding,
                      fundingStructureDescEn: e.target.value
                    }
                  })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:bg-white resize-none text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Bottom Save Reminder */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-[#174F3E] hover:bg-[#123E31] flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>حفظ جميع تعديلات دراسة المشروع</span>
        </button>
      </div>

    </div>
  );
};

export default ProjectStudyAdminEditor;

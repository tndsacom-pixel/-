import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Heart, 
  ArrowRight, 
  LogIn, 
  Star, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Gift 
} from 'lucide-react';
import { ProducerFamily, Product } from '../types';

interface BuyerPortalPageProps {
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onAddToCart?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
}

export default function BuyerPortalPage({
  producers,
  onSelectProducer,
  onAddToCart,
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo
}: BuyerPortalPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allProducts = producers.flatMap(p => 
    p.products.map(prod => ({
      ...prod,
      producer: p
    }))
  );

  const filteredProducts = allProducts.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dir-rtl" id="portal-buyers">
      {/* Header */}
      <header className="bg-primary text-white border-b border-accent/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {renderWarathLogo('w-10 h-10 text-lg')}
            {renderThinkingLogo('w-10 h-10 text-[10px]')}
            <div className="text-right hidden sm:block border-r border-accent/20 pr-3 mr-1">
              <h1 className="font-extrabold text-sm leading-tight text-accent">بوابة المشتري والتسوق 🛒</h1>
              <p className="text-[10px] text-stone-300">منتجات الأسر المنتجة والحرفية مباشرة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>

            <button
              onClick={onNavigateLogin}
              className="bg-accent text-primary hover:bg-amber-400 font-black px-4 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>دخول المشتري</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-stone-900 via-primary to-stone-900 text-white py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="bg-accent/20 text-accent text-xs font-black px-3.5 py-1 rounded-full border border-accent/30 inline-block">
            دعم مباشر لاقتصاد الأسر المحليّة 🇸🇦
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">تسوق منتجات الأسر المنتجة والحرف اليدوية</h2>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative pt-2">
            <input
              type="text"
              placeholder="ابحث عن أكلة شعبية، بخور، سدو، أو اسم أسرة منتجة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-stone-900 rounded-2xl py-3.5 pr-12 pl-4 text-xs font-bold shadow-lg focus:outline-hidden"
            />
            <Search className="w-5 h-5 text-stone-400 absolute top-5 right-4" />
          </div>
        </div>
      </section>

      {/* Catalog & Filter */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-primary text-accent font-black shadow-sm' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            جميع المنتجات ({allProducts.length})
          </button>
          <button
            onClick={() => setSelectedCategory('culinary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'culinary' ? 'bg-primary text-accent font-black shadow-sm' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            فنون الطهي والمأكولات 🍲
          </button>
          <button
            onClick={() => setSelectedCategory('crafts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'crafts' ? 'bg-primary text-accent font-black shadow-sm' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            الحرف اليدوية والسدو 🧵
          </button>
          <button
            onClick={() => setSelectedCategory('hospitality')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'hospitality' ? 'bg-primary text-accent font-black shadow-sm' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            الضيافة والقهوة السعودية ☕
          </button>
          <button
            onClick={() => setSelectedCategory('perfumes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'perfumes' ? 'bg-primary text-accent font-black shadow-sm' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            البخور والروائح 🌿
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-stone-900/80 text-accent text-[10px] font-black px-2.5 py-1 rounded-full">
                    {item.producerCity || 'الإنتاج المحلي'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="font-black text-stone-900 text-base leading-tight">{item.name}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">{item.description}</p>

                  {/* DYNAMIC PRODUCER FAMILY BINDING 🔗 */}
                  <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={item.producer.logoUrl} alt={item.producer.brandName} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] text-amber-800 font-bold block">من إعداد:</span>
                        <span className="text-xs font-extrabold text-stone-900 block truncate max-w-[140px]">{item.producer.brandName}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectProducer(item.producer)}
                      className="bg-accent text-primary font-black px-2.5 py-1 rounded-lg text-[10px] hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      صفحة الأسرة 👩‍🍳
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold block">السعر</span>
                  <span className="text-base font-black text-primary font-mono">{item.price} ر.س</span>
                </div>

                <button
                  onClick={() => {
                    if (onAddToCart) onAddToCart(item);
                    alert(`تمت إضافة "${item.name}" للسلة! 🛍️`);
                  }}
                  className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>أضف للسلة</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

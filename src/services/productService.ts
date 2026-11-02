import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'سليق حجازي بالسمن البلدي واللحم',
    price: 65,
    description: 'طبق السليق المكّي العريق المطبوخ على حطب السمر بالأرز المصري، الحليب النقي، والسمن البلدي مع لحم الحاشي الطازج.',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
    category: 'culinary',
    producerId: 'fam-1',
    producerName: 'أم فواز - عطور الهيل والمأكولات الحجازية',
    producerCity: 'مكة المكرمة',
    status: 'approved',
    quantity: 20,
    city: 'مكة المكرمة',
    prepTime: '2 ساعة',
    preservationMethod: 'يحفظ ساخناً أو يُعاد تسخينه بالمايكرويف',
    ingredients: 'أرز مصري، حليب طازج، لحم حاشي، سمن بلدي، مستكة، هيل، ملح بحري',
    allergyInfo: 'يحتوي على مشتقات الحليب (لاكتوز)',
    createdAt: '2026-06-01'
  },
  {
    id: 'prod-2',
    name: 'حقيبة سدو تراثية منسوجة يدوياً',
    price: 250,
    description: 'حقيبة يد فاخرة منسوجة بنسيج السدو الأصيل، مبطنة بالقماش الحريري ومزودة بسحاب نحاسي متين.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    category: 'crafts',
    producerId: 'fam-2',
    producerName: 'فاطمة الحربي - سدو القصيم',
    producerCity: 'القصيم',
    status: 'approved',
    quantity: 8,
    city: 'القصيم',
    prepTime: 'جاهز للتسليم',
    preservationMethod: 'تنظيف جاف فقط',
    ingredients: 'خيوط صوف طبيعي، قماش حريري، سحاب نحاسي',
    createdAt: '2026-06-05'
  },
  {
    id: 'prod-3',
    name: 'بخور دوسري ملكي فاخر',
    price: 120,
    description: 'خلطة بخور عتيقة معجونة بدهن العود الملكي، الورد الطائفي، والظفر المعطر لتبخير المساجد والمنازل.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop',
    category: 'perfumes',
    producerId: 'fam-1',
    producerName: 'أم فواز - عطور الهيل والمأكولات الحجازية',
    producerCity: 'مكة المكرمة',
    status: 'approved',
    quantity: 15,
    city: 'مكة المكرمة',
    prepTime: 'جاهز للتسليم',
    preservationMethod: 'يحفظ في مكان بارد وجاف بعيداً عن الشمس',
    ingredients: 'خشب عود، دهن عود ملكي، ورد طائفي، ظفر معطر، مسك',
    createdAt: '2026-06-10'
  },
  {
    id: 'prod-4',
    name: 'معمول حجازي بالتمر والفستق الحلبي',
    price: 85,
    description: 'معمول هشش ولذيذ مجهز بالطحين السمن البلدي الفاخر، محشو بتمر المدينة العجوة ومزين بالفستق.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
    category: 'culinary',
    producerId: 'fam-3',
    producerName: 'أم أحمد - حلويات مكة التراثية',
    producerCity: 'مكة المكرمة',
    status: 'approved',
    quantity: 30,
    city: 'مكة المكرمة',
    prepTime: '1 ساعة',
    preservationMethod: 'يحفظ في علبة محكمة الإغلاق بدرجة حرارة الغرفة',
    ingredients: 'طحين بر، تمر عجوة المدينة، سمن بلدي، فستق حلبي، بهارات معمول',
    allergyInfo: 'يحتوي على المكسرات والغلوتين',
    createdAt: '2026-06-15'
  },
  {
    id: 'prod-5',
    name: 'مجموعة ضيافة قهوة عربية بالهيل والزعفران',
    price: 180,
    description: 'طقم ضيافة متكامل يشمل 500 جرام قهوة خولانية متبلة بالهيل والزعفران النقي مع تمر سكري فاخر.',
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ec82a897?q=80&w=600&auto=format&fit=crop',
    category: 'hospitality',
    producerId: 'fam-3',
    producerName: 'أم أحمد - حلويات مكة التراثية',
    producerCity: 'مكة المكرمة',
    status: 'approved',
    quantity: 12,
    city: 'مكة المكرمة',
    prepTime: 'جاهز للتسليم',
    ingredients: 'بن خولاني، هيل سوبر، زعفران سوبر نقيل، تمر سكري',
    createdAt: '2026-06-20'
  }
];

const LOCAL_STORAGE_KEY = 'warath_managed_products';

export async function fetchApprovedProductsFromApi(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          price: parseFloat(item.price),
          description: item.description || '',
          imageUrl: (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
          category: item.category,
          producerId: item.producerId?.toString() || '1',
          producerName: item.producerName || 'رائدة عمل حر',
          producerCity: item.producerCity || 'مكة المكرمة',
          status: item.status,
          quantity: item.stock || 10,
          city: item.city || 'مكة المكرمة',
          ingredients: item.ingredients || '',
          allergyInfo: item.allergens || '',
          preservationMethod: item.storageMethod || '',
          adminNotes: item.adminNotes || '',
          createdAt: item.createdAt || new Date().toISOString(),
        }));
      }
    }
  } catch (e) {
    console.error('Failed to fetch products from API:', e);
  }
  return getApprovedProducts();
}

export function getAllProducts(): Product[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read products from localStorage:', e);
  }
  return INITIAL_PRODUCTS;
}

export function saveAllProducts(products: Product[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('warath_products_updated'));
  } catch (e) {
    console.error('Failed to save products to localStorage:', e);
  }
}

export function getApprovedProducts(): Product[] {
  const all = getAllProducts();
  return all.filter(p => !p.status || p.status === 'approved');
}

export function getProducerProducts(producerId: string): Product[] {
  const all = getAllProducts();
  return all.filter(p => p.producerId === producerId);
}

export function addNewProduct(productData: Omit<Product, 'id' | 'status' | 'createdAt'>): Product {
  const all = getAllProducts();
  const newProd: Product = {
    ...productData,
    id: `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  const updated = [newProd, ...all];
  saveAllProducts(updated);
  return newProd;
}

export function updateProductStatus(productId: string, status: 'approved' | 'rejected' | 'needs_modification', adminNotes?: string): Product | null {
  const all = getAllProducts();
  let updatedProd: Product | null = null;
  const updated = all.map(p => {
    if (p.id === productId) {
      updatedProd = {
        ...p,
        status,
        adminNotes: adminNotes || p.adminNotes
      };
      return updatedProd;
    }
    return p;
  });

  if (updatedProd) {
    saveAllProducts(updated);
  }
  return updatedProd;
}

import { INITIAL_PRODUCERS } from '../producersData';
import { DEFAULT_PRODUCTS, HeritageProduct as InitialHeritageProduct } from '../initialData';

export interface HeritageProduct extends InitialHeritageProduct {
  title?: string;
  image?: string;
  desc?: string;
  rating?: number;
}

export const PRODUCTIVE_FAMILIES = INITIAL_PRODUCERS.map(p => ({
  id: p.id,
  name: p.brandName,
  banner: p.coverUrl || p.logoUrl,
  region: p.city,
  category: p.projectType === 'culinary' ? 'طعام وتراث' : p.projectType === 'crafts' ? 'حرف يدوية' : p.projectType === 'hospitality' ? 'ضيافة عربية' : 'منتجات منزلية',
  rating: p.rating,
  productsCount: p.products ? p.products.length : 0,
  desc: p.description
}));

export const HERITAGE_PRODUCTS: HeritageProduct[] = DEFAULT_PRODUCTS.map(p => ({
  ...p,
  title: p.name,
  image: p.imageUrl,
  desc: p.description,
  rating: 4.9
}));

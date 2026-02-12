import fs from 'fs';
import path from 'path';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image1: string;
  image2: string;
  url: string;
  featured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Slide {
  id: string;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string;
}

// ─── Paths ───────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const SLIDES_FILE = path.join(DATA_DIR, 'slides.json');

// ─── Generic helpers ─────────────────────────────────────────────────────────

function readJSON<T>(filePath: string): T[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeJSON<T>(filePath: string, data: T[]): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── Products ────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return readJSON<Product>(PRODUCTS_FILE);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function saveProducts(products: Product[]): void {
  writeJSON(PRODUCTS_FILE, products);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: `prod_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates, id };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export function getCategories(): Category[] {
  return readJSON<Category>(CATEGORIES_FILE);
}

export function saveCategories(categories: Category[]): void {
  writeJSON(CATEGORIES_FILE, categories);
}

export function addCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: `cat_${Date.now()}`,
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...updates, id };
  saveCategories(categories);
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  saveCategories(filtered);
  return true;
}

// ─── Slides ──────────────────────────────────────────────────────────────────

export function getSlides(): Slide[] {
  return readJSON<Slide>(SLIDES_FILE);
}

export function saveSlides(slides: Slide[]): void {
  writeJSON(SLIDES_FILE, slides);
}

export function addSlide(slide: Omit<Slide, 'id'>): Slide {
  const slides = getSlides();
  const newSlide: Slide = {
    ...slide,
    id: `slide_${Date.now()}`,
  };
  slides.push(newSlide);
  saveSlides(slides);
  return newSlide;
}

export function updateSlide(id: string, updates: Partial<Slide>): Slide | null {
  const slides = getSlides();
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return null;
  slides[index] = { ...slides[index], ...updates, id };
  saveSlides(slides);
  return slides[index];
}

export function deleteSlide(id: string): boolean {
  const slides = getSlides();
  const filtered = slides.filter((s) => s.id !== id);
  if (filtered.length === slides.length) return false;
  saveSlides(filtered);
  return true;
}

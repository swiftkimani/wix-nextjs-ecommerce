import 'dotenv/config';
import { db } from './index';
import { products, categories } from './schema';

async function checkData() {
  console.log('🔍 Checking database content...');
  try {
    const allProducts = await db.select().from(products);
    const allCategories = await db.select().from(categories);
    
    console.log(`\n✅ Found ${allProducts.length} Products:`);
    allProducts.forEach(p => console.log(` - ${p.name} (${p.price} ${p.currency})`));

    console.log(`\n✅ Found ${allCategories.length} Categories:`);
    allCategories.forEach(c => console.log(` - ${c.name}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to fetch data:', error);
    process.exit(1);
  }
}

checkData();

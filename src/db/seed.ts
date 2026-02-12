import 'dotenv/config';
import { db } from './index';
import { products, categories, slides } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Categories
    const insertedCategories = await db.insert(categories).values([
      { name: 'Electronics', slug: 'electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Fashion', slug: 'fashion', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { name: 'Home', slug: 'home', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ]).returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Products
    const insertedProducts = await db.insert(products).values([
      { 
        name: 'Wireless Headphones', 
        description: 'Premium noise-cancelling headphones.', 
        price: '15000', 
        currency: 'KSh', 
        image1: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600' 
      },
      { 
        name: 'Smart Watch', 
        description: 'Track your fitness and stay connected.', 
        price: '8500', 
        currency: 'KSh', 
        image1: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600' 
      },
      { 
        name: 'Cotton T-Shirt', 
        description: 'Comfortable 100% cotton t-shirt.', 
        price: '1200', 
        currency: 'KSh', 
        image1: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600' 
      },
    ]).returning();
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Slides
    const insertedSlides = await db.insert(slides).values([
      { 
        title: 'Summer Sale', 
        description: 'Up to 50% off on all Fashion items.', 
        image: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        link: '/categories/fashion' 
      },
    ]).returning();
    console.log(`✅ Inserted ${insertedSlides.length} slides`);

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();

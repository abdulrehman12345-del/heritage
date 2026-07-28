import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Wishlist from '../models/Wishlist';
import Review from '../models/Review';
import HomepageCMS from '../models/HomepageCMS';
import WebsiteSettings from '../models/WebsiteSettings';

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin & Customer Users if none exist
    const adminExists = await User.findOne({ role: 'Admin' });
    let adminUser;
    if (!adminExists) {
      adminUser = await User.create({
        fullName: 'abdul rehman',
        email: 'admin@heritageantiques.com',
        phoneNumber: '+44 20 7946 0912',
        password: 'abdul',
        role: 'Admin',
        address: 'Mayfair Curator Vault, 42 Grosvenor Street',
        city: 'London',
        country: 'United Kingdom',
        postalCode: 'W1K 3JH',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      });
      console.log('[Seed] Default Admin Created: abdul rehman (Password: abdul)');
    } else {
      adminUser = adminExists;
    }

    const customerExists = await User.findOne({ email: 'harrington@heritage.co.uk' });
    let customerUser;
    if (!customerExists) {
      customerUser = await User.create({
        fullName: 'Lord Harrington',
        email: 'harrington@heritage.co.uk',
        phoneNumber: '+44 7700 900077',
        password: 'password123',
        role: 'Customer',
        address: '7 Eaton Square, Belgravia',
        city: 'London',
        country: 'United Kingdom',
        postalCode: 'SW1W 9DA',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      });
      console.log('[Seed] Default Customer Created: Lord Harrington');
    } else {
      customerUser = customerExists;
    }

    // 2. Seed Categories
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      const initialCategories = [
        {
          categoryName: 'Sculptures',
          slug: 'sculptures',
          description: 'Bronze, marble, and terracotta museum-grade sculptures.',
          image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
          status: 'Active',
        },
        {
          categoryName: 'Metal Artifacts',
          slug: 'metal-artifacts',
          description: 'Gilded brass, silver armor, and ceremonial metalwork.',
          image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
          status: 'Active',
        },
        {
          categoryName: 'Antique Vases',
          slug: 'antique-vases',
          description: 'Dynastic porcelain, amphoras, and hand-carved urns.',
          image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
          status: 'Active',
        },
        {
          categoryName: 'Rare Manuscripts',
          slug: 'rare-manuscripts',
          description: 'Illuminated codices and ancient parchment scrolls.',
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
          status: 'Active',
        },
      ];
      await Category.insertMany(initialCategories);
      console.log('[Seed] Categories seeded.');
    }

    // 3. Seed Products
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const initialProducts = [
        {
          productName: 'The Florentine Renaissance Bronze Statue',
          slug: 'florentine-renaissance-bronze-statue',
          categoryName: 'Sculptures',
          description: 'Hand-cast bronze depicting Mercury in flight, attributed to 16th-century Tuscan foundry master. Features exceptional dark honey patina.',
          price: 48500,
          salePrice: 45000,
          stock: 1,
          sku: 'HA-ART-001',
          thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200',
          images: [
            'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200',
          ],
          material: 'Solid Bronze & Honey Patina',
          origin: 'Florence, Grand Duchy of Tuscany',
          historicalEra: 'Circa 1580 (Late Renaissance)',
          dimensions: '68cm x 32cm x 28cm',
          condition: 'Museum Conservation Status',
          featured: true,
          status: 'Available',
          certificateId: 'HA-VAULT-1892',
          provenance: 'Formerly in the private collection of Count Gian-Maria Visconti, Milan.',
        },
        {
          productName: 'Ottoman Royal Ceremonial Gilded Flask',
          slug: 'ottoman-royal-ceremonial-flask',
          categoryName: 'Metal Artifacts',
          description: 'Intricately chased tombak copper flask with gold gilding and ruby glass cabochons crafted for high court ceremonies.',
          price: 32000,
          salePrice: 0,
          stock: 1,
          sku: 'HA-ART-002',
          thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200',
          images: ['https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1200'],
          material: 'Tombak Gilded Copper & Ruby Cabochons',
          origin: 'Constantinople, Ottoman Empire',
          historicalEra: '17th Century (Ottoman Classical)',
          dimensions: '38cm x 22cm x 15cm',
          condition: 'Excellent Conservation Patina',
          featured: true,
          status: 'Available',
          certificateId: 'HA-VAULT-1893',
          provenance: 'Acquired at Paris Fine Art Exposition 1924.',
        },
        {
          productName: 'Qing Dynasty Imperial Cloisonné Urn',
          slug: 'qing-dynasty-imperial-cloisonne-urn',
          categoryName: 'Antique Vases',
          description: 'Exquisite Qianlong period cloisonné enamel vessel featuring imperial five-claw dragon motifs in turquoise field.',
          price: 64000,
          salePrice: 59000,
          stock: 1,
          sku: 'HA-ART-003',
          thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200',
          images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200'],
          material: 'Cloisonné Enamel & Gilded Bronze',
          origin: 'Beijing, Qing Dynasty China',
          historicalEra: 'Qianlong Period (1736–1795)',
          dimensions: '52cm x 34cm x 34cm',
          condition: 'Pristine Imperial Quality',
          featured: true,
          status: 'Available',
          certificateId: 'HA-VAULT-1894',
          provenance: 'Lord Abercorn Manor Collection, Scotland.',
        },
      ];

      await Product.insertMany(initialProducts);
      console.log('[Seed] Products seeded.');
    }

    // 4. Seed Carts and Wishlists
    if (customerUser) {
      const cartExists = await Cart.findOne({ user: customerUser._id });
      if (!cartExists) {
        await Cart.create({ user: customerUser._id, items: [] });
      }
      const wishlistExists = await Wishlist.findOne({ user: customerUser._id });
      if (!wishlistExists) {
        await Wishlist.create({ user: customerUser._id, products: [] });
      }
    }

    // 5. Seed Homepage CMS and Website Settings
    const cmsCount = await HomepageCMS.countDocuments();
    if (cmsCount === 0) {
      await HomepageCMS.create({
        heroTitle: 'Timeless Antiquities & Royal Masterpieces',
        heroSubtitle: 'Curated Heritage Vault',
        heroDescription: 'Discover rare, museum-verified artifacts, ancient sculptures, and royal heirlooms preserved across centuries.',
        testimonials: [
          {
            collectorName: 'Lord Harrington',
            title: 'Senior Curator',
            location: 'Mayfair, London',
            quote: 'Heritage Antiques provided certified provenance and seamless white-glove transport for our Renaissance bronzes.',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
            rating: 5,
          },
        ],
      });
    }

    const settingsCount = await WebsiteSettings.countDocuments();
    if (settingsCount === 0) {
      await WebsiteSettings.create({});
    }

    console.log('[Seed] Database initialization completed successfully.');
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
};

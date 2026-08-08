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
        fullName: 'Abdulrehman',
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
      console.log('[Seed] Default Admin Created: Abdulrehman (Password: abdul)');
    } else {
      adminUser = adminExists;
      if (adminUser.fullName !== 'Abdulrehman') {
        adminUser.fullName = 'Abdulrehman';
        await adminUser.save();
      }
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

    // 2. Seed Categories (Full Set)
    const initialCategories = [
      {
        categoryName: 'Animal Statues',
        slug: 'animal-statues',
        description: 'Ancient zoomorphic representations carved in stone, bronze, and precious ores.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Bronze Statues',
        slug: 'bronze-statues',
        description: 'Lost-wax bronze sculptures capturing mythical figures, deities, and emperors.',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Metal Sculptures',
        slug: 'metal-sculptures',
        description: 'Historical metalwork forged by master metalsmiths across millennia.',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Antique Vases',
        slug: 'antique-vases',
        description: 'Rare porcelain, terracotta, and celadon ceramic vessels from historic dynasties.',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Copper Artifacts',
        slug: 'copper-artifacts',
        description: 'Rare copper ceremonial shields, discs, and ornamental antiquities.',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Decorative Collectibles',
        slug: 'decorative-collectibles',
        description: 'Palatial ornaments, royal reliquaries, and museum-grade accents.',
        image: 'https://images.unsplash.com/photo-1582582621959-48d273528920?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
      {
        categoryName: 'Historical Pieces',
        slug: 'historical-pieces',
        description: 'Curated relics with documented provenance connecting directly to pivotal historic events.',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
        status: 'Active' as const,
      },
    ];

    for (const catData of initialCategories) {
      const exists = await Category.findOne({ categoryName: catData.categoryName });
      if (!exists) {
        await Category.create(catData);
      }
    }
    console.log('[Seed] Categories synchronized with database.');

    // 3. Seed Products (Full Set)
    const initialProducts = [
      {
        productName: 'Imperial Qing Dynasty Celadon Vase',
        slug: 'imperial-qing-dynasty-celadon-vase',
        categoryName: 'Antique Vases',
        description: 'Rare carved celadon glazed vessel from the Qianlong period (1736–1795). Exhibiting exquisite translucent sea-green glaze and imperial dragontail handles.',
        price: 18500,
        stock: 1,
        sku: 'HA-VAULT-1892',
        thumbnail: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200',
        images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=1200'],
        material: 'Porcelain & Celadon Glaze',
        origin: 'Jingdezhen Imperial Kilns, China',
        historicalEra: 'Qianlong Period, Qing Dynasty (c. 1760)',
        dimensions: '34 cm (H) x 18 cm (D)',
        condition: 'Museum Grade Preservation',
        featured: true,
        status: 'Available' as const,
        certificateId: 'HA-VAULT-1892',
        provenance: 'Acquired from Duke of Buccleuch Estate (1924).'
      },
      {
        productName: 'Hellenistic Bronze Athena Bust',
        slug: 'hellenistic-bronze-athena-bust',
        categoryName: 'Bronze Statues',
        description: 'Lost-wax cast bronze bust of Goddess Athena wearing Corinthian crested helmet. Rich verdigris oxidation patina with original olive-wood pedestal base.',
        price: 24000,
        stock: 1,
        sku: 'HA-VAULT-1893',
        thumbnail: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=1200',
        images: ['https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=1200'],
        material: 'Patinated Bronze',
        origin: 'Attica, Ancient Greece',
        historicalEra: 'Late Hellenistic Era (c. 2nd Century BC)',
        dimensions: '42 cm (H) x 24 cm (W)',
        condition: 'Intact Classical Oxide Patina',
        featured: true,
        status: 'Available' as const,
        certificateId: 'HA-VAULT-1893',
        provenance: 'Ex-Collection Count von Metternich, Vienna.'
      },
      {
        productName: 'Etruscan Bronze Guardian Lion',
        slug: 'etruscan-bronze-guardian-lion',
        categoryName: 'Animal Statues',
        description: 'Rare cast bronze votive feline figure with engraved mane details and inlaid silver eyes. Symbol of archaic regal protection.',
        price: 32000,
        stock: 1,
        sku: 'HA-VAULT-1894',
        thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
        images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'],
        material: 'Solid Bronze & Silver Inlay',
        origin: 'Etruria (Modern Tuscany)',
        historicalEra: 'Archaic Etruscan (c. 5th Century BC)',
        dimensions: '28 cm (L) x 16 cm (H)',
        condition: 'Stable Archaic Verdigris',
        featured: true,
        status: 'Available' as const,
        certificateId: 'HA-VAULT-1894',
        provenance: 'Discovered near Veii excavation site, 1898.'
      },
      {
        productName: 'Gilded Bronze Garuda Idol',
        slug: 'gilded-bronze-garuda-idol',
        categoryName: 'Metal Sculptures',
        description: 'Sublime Khmer-style gilded bronze deity in warrior pose with outstretched wings, featuring remnants of real gold leaf ornamentation.',
        price: 14200,
        stock: 1,
        sku: 'HA-VAULT-1895',
        thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
        images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200'],
        material: 'Gilded Bronze',
        origin: 'Angkor Empire, Cambodia',
        historicalEra: 'Bayon Style (c. 12th Century AD)',
        dimensions: '31 cm (H) x 22 cm (W)',
        condition: 'Authentic Temple Wear',
        featured: false,
        status: 'Available' as const,
        certificateId: 'HA-VAULT-1895',
        provenance: 'Private Collection, Geneva.'
      },
      {
        productName: 'Celtic Engraved Copper Disc',
        slug: 'celtic-engraved-copper-disc',
        categoryName: 'Copper Artifacts',
        description: 'Intricately hammered copper ceremonial mirror back with triskele spiral motif and repoussé border accents.',
        price: 9500,
        stock: 1,
        sku: 'HA-VAULT-1896',
        thumbnail: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1200',
        images: ['https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=1200'],
        material: 'Forged Native Copper',
        origin: 'Britannia / Insular Celtic',
        historicalEra: 'La Tène Period (c. 1st Century BC)',
        dimensions: '22 cm Diameter',
        condition: 'Preserved Soil Oxide',
        featured: false,
        status: 'Available' as const,
        certificateId: 'HA-VAULT-1896',
        provenance: 'Thames Valley Archaeological Finds Archive.'
      }
    ];

    for (const prodData of initialProducts) {
      const exists = await Product.findOne({ productName: prodData.productName });
      if (!exists) {
        await Product.create(prodData);
      }
    }
    console.log('[Seed] Products synchronized with database.');

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

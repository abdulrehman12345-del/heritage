import { 
  Order, 
  Customer, 
  Review, 
  MediaFile, 
  DiscountCode, 
  CustomerInquiryMessage, 
  CategoryCMS, 
  HomepageCMSConfig, 
  WebsiteSettingsConfig, 
  AdminUser 
} from './types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'HA-2026-8821',
    customerName: 'Lord Alistair Sterling',
    customerEmail: 'a.sterling@kensington-group.co.uk',
    customerPhone: '+44 20 7946 0912',
    shippingAddress: '14 Kensington Palace Gardens, London, W8 4QP, United Kingdom',
    items: [
      {
        artifactId: 'art-1',
        title: 'Imperial Qing Dynasty Celadon Vase',
        price: 18500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800'
      }
    ],
    totalAmount: 18500,
    status: 'Shipped',
    paymentStatus: 'Paid',
    trackingNumber: 'DHL-EXPRESS-992014812',
    date: '2026-07-24',
    notes: 'Requires white-glove climate-controlled courier with art transport insurance.'
  },
  {
    id: 'ord-102',
    orderNumber: 'HA-2026-8822',
    customerName: 'Dr. Eleanor Vance',
    customerEmail: 'evance@oxford-antiquities.org',
    customerPhone: '+44 1865 270000',
    shippingAddress: 'St John’s College, St Giles, Oxford OX1 3JP, United Kingdom',
    items: [
      {
        artifactId: 'art-2',
        title: 'Hellenistic Bronze Athena Bust',
        price: 24000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800'
      }
    ],
    totalAmount: 24000,
    status: 'Pending',
    paymentStatus: 'Paid',
    date: '2026-07-26',
    notes: 'Verify museum export certification before dispatching.'
  },
  {
    id: 'ord-103',
    orderNumber: 'HA-2026-8823',
    customerName: 'Marcus Aurelius Vance II',
    customerEmail: 'marcus@vancecapital.com',
    customerPhone: '+1 212 555 0198',
    shippingAddress: '740 Park Avenue, Apt 12A, New York, NY 10021, USA',
    items: [
      {
        artifactId: 'art-3',
        title: 'Etruscan Bronze Guardian Lion',
        price: 32000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
      },
      {
        artifactId: 'art-5',
        title: 'Celtic Engraved Copper Disc',
        price: 9500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800'
      }
    ],
    totalAmount: 41500,
    status: 'Processing',
    paymentStatus: 'Paid',
    date: '2026-07-25',
    notes: 'VIP Collector discount applied. Personal delivery via Private Jet Logistics.'
  },
  {
    id: 'ord-104',
    orderNumber: 'HA-2026-8824',
    customerName: 'Baroness Sophia von Berg',
    customerEmail: 's.berg@vienna-gallery.at',
    customerPhone: '+43 1 515 80',
    shippingAddress: 'Herrengasse 19, 1010 Wien, Austria',
    items: [
      {
        artifactId: 'art-4',
        title: 'Gilded Bronze Garuda Idol',
        price: 14200,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
      }
    ],
    totalAmount: 14200,
    status: 'Delivered',
    paymentStatus: 'Paid',
    trackingNumber: 'FEDEX-PRIORITY-88120412',
    date: '2026-07-20'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Lord Alistair Sterling',
    email: 'a.sterling@kensington-group.co.uk',
    phone: '+44 20 7946 0912',
    address: 'London, UK',
    totalOrders: 4,
    totalSpent: 84500,
    isVip: true,
    joinedDate: '2024-03-12',
    status: 'Active'
  },
  {
    id: 'cust-2',
    name: 'Dr. Eleanor Vance',
    email: 'evance@oxford-antiquities.org',
    phone: '+44 1865 270000',
    address: 'Oxford, UK',
    totalOrders: 2,
    totalSpent: 42000,
    isVip: true,
    joinedDate: '2024-11-05',
    status: 'Active'
  },
  {
    id: 'cust-3',
    name: 'Marcus Aurelius Vance II',
    email: 'marcus@vancecapital.com',
    phone: '+1 212 555 0198',
    address: 'New York, USA',
    totalOrders: 6,
    totalSpent: 148000,
    isVip: true,
    joinedDate: '2023-08-19',
    status: 'Active'
  },
  {
    id: 'cust-4',
    name: 'Baroness Sophia von Berg',
    email: 's.berg@vienna-gallery.at',
    phone: '+43 1 515 80',
    address: 'Vienna, Austria',
    totalOrders: 1,
    totalSpent: 14200,
    isVip: false,
    joinedDate: '2025-01-14',
    status: 'Active'
  }
];

export const INITIAL_CATEGORIES: CategoryCMS[] = [
  {
    id: 'cat-1',
    name: 'Animal Statues',
    slug: 'animal-statues',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    description: 'Ancient zoomorphic representations carved in stone, bronze, and precious ores.',
    itemCount: 14,
    status: 'Active'
  },
  {
    id: 'cat-2',
    name: 'Bronze Statues',
    slug: 'bronze-statues',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
    description: 'Lost-wax bronze sculptures capturing mythical figures, deities, and emperors.',
    itemCount: 18,
    status: 'Active'
  },
  {
    id: 'cat-3',
    name: 'Metal Sculptures',
    slug: 'metal-sculptures',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    description: 'Historical metalwork forged by master metalsmiths across millennia.',
    itemCount: 9,
    status: 'Active'
  },
  {
    id: 'cat-4',
    name: 'Antique Vases',
    slug: 'antique-vases',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    description: 'Rare porcelain, terracotta, and celadon ceramic vessels from historic dynasties.',
    itemCount: 22,
    status: 'Active'
  },
  {
    id: 'cat-5',
    name: 'Copper Artifacts',
    slug: 'copper-artifacts',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
    description: 'Rare copper ceremonial shields, discs, and ornamental antiquities.',
    itemCount: 11,
    status: 'Active'
  },
  {
    id: 'cat-6',
    name: 'Decorative Collectibles',
    slug: 'decorative-collectibles',
    image: 'https://images.unsplash.com/photo-1582582621959-48d273528920?auto=format&fit=crop&q=80&w=800',
    description: 'Palatial ornaments, royal reliquaries, and museum-grade accents.',
    itemCount: 16,
    status: 'Active'
  },
  {
    id: 'cat-7',
    name: 'Historical Pieces',
    slug: 'historical-pieces',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
    description: 'Curated relics with documented provenance connecting directly to pivotal historic events.',
    itemCount: 12,
    status: 'Active'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Baroness Charlotte von Habsburg',
    authorTitle: 'Private Art Collector',
    artifactTitle: 'Imperial Qing Dynasty Celadon Vase',
    rating: 5,
    comment: 'The authenticity documentation and white-glove courier delivery exceeded all expectations. A crown jewel in my private collection.',
    date: '2026-07-15',
    status: 'Published',
    verifiedBuyer: true
  },
  {
    id: 'rev-2',
    authorName: 'Sir Arthur Pendelton',
    authorTitle: 'Trustee, Antiquities Trust',
    artifactTitle: 'Hellenistic Bronze Athena Bust',
    rating: 5,
    comment: 'Exceptional provenance verification. The museum-grade restoration report provided by Heritage Antiques was flawlessly comprehensive.',
    date: '2026-07-08',
    status: 'Published',
    verifiedBuyer: true
  }
];

export const INITIAL_MEDIA: MediaFile[] = [
  {
    id: 'med-1',
    name: 'celadon_vase_front.webp',
    url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    size: '1.2 MB',
    dimensions: '2400 x 3200',
    folder: 'Artifacts',
    uploadedAt: '2026-07-20',
    optimized: true
  },
  {
    id: 'med-2',
    name: 'athena_bust_studio.webp',
    url: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
    size: '2.1 MB',
    dimensions: '3000 x 4000',
    folder: 'Artifacts',
    uploadedAt: '2026-07-18',
    optimized: true
  },
  {
    id: 'med-3',
    name: 'lion_statue_macro.webp',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    size: '1.8 MB',
    dimensions: '2800 x 3500',
    folder: 'Artifacts',
    uploadedAt: '2026-07-12',
    optimized: true
  },
  {
    id: 'med-4',
    name: 'hero_gallery_vault.webp',
    url: 'https://images.unsplash.com/photo-1582582621959-48d273528920?auto=format&fit=crop&q=80&w=800',
    size: '3.4 MB',
    dimensions: '3840 x 2160',
    folder: 'Hero',
    uploadedAt: '2026-07-01',
    optimized: true
  }
];

export const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    id: 'disc-1',
    code: 'VIPHERITAGE10',
    discountType: 'Percentage',
    value: 10,
    minPurchase: 10000,
    usageLimit: 50,
    timesUsed: 14,
    validUntil: '2026-12-31',
    status: 'Active'
  },
  {
    id: 'disc-2',
    code: 'PRIVATECOLLECTOR25',
    discountType: 'Percentage',
    value: 15,
    minPurchase: 30000,
    usageLimit: 10,
    timesUsed: 3,
    validUntil: '2026-09-30',
    status: 'Active'
  }
];

export const INITIAL_INQUIRIES: CustomerInquiryMessage[] = [
  {
    id: 'inq-1',
    collectorName: 'Duchess Genevieve de Saint-Germain',
    email: 'g.saintgermain@paris-art.fr',
    phone: '+33 1 42 68 55 00',
    artifactTitle: 'Imperial Qing Dynasty Celadon Vase',
    message: 'We are organizing a private gallery exhibition in Place Vendôme this autumn and would like to arrange a private viewing or direct acquisition of Lot HA-2026-8821.',
    date: '2026-07-26 14:32',
    status: 'Unread',
    preferredContact: 'Private Viewing'
  },
  {
    id: 'inq-2',
    collectorName: 'Henrik Lindqvist',
    email: 'henrik@stockholm-heritage.se',
    phone: '+46 8 123 4567',
    artifactTitle: 'Hellenistic Bronze Athena Bust',
    message: 'Could you confirm whether carbon dating certificates and export clearances from the Hellenic Ministry of Culture accompany this piece?',
    date: '2026-07-25 09:15',
    status: 'Replied',
    preferredContact: 'Email'
  }
];

export const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'adm-1',
    name: 'Abdulrehman, Master Curator',
    email: 'abdulrehman@heritageantiques.com',
    role: 'Master Curator',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    lastActive: 'Active Now',
    status: 'Active'
  },
  {
    id: 'adm-2',
    name: 'Claire Beauchamp',
    email: 'claire@heritageantiques.com',
    role: 'Senior Cataloguer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    lastActive: '2 hours ago',
    status: 'Active'
  }
];

export const INITIAL_HOMEPAGE_CMS: HomepageCMSConfig = {
  heroHeading: 'Own A Piece Of History',
  heroSubheading: 'Est. 1892 • London',
  heroDescription: 'Curating the world’s most exceptional artifacts. Each piece in our collection is a testament to the master craftsmanship of forgotten eras.',
  heroImage: 'https://images.unsplash.com/photo-1582582621959-48d273528920?auto=format&fit=crop&q=80&w=800',
  featuredCategoryIds: ['cat-1', 'cat-2', 'cat-4'],
  aboutHeading: 'A Legacy of Provenance & Museum Authenticity',
  aboutText: 'Founded in Mayfair, London in 1892, Heritage Antiques has spent over a century sourcing, verifying, and preserving extraordinary antiquities for private collectors, museums, and royal estates worldwide.',
  aboutImage: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
  newsletterTitle: 'The Curator’s Private Dispatch',
  newsletterSubtitle: 'Receive confidential invitations to newly cataloged antiquities before public release.'
};

export const INITIAL_WEBSITE_SETTINGS: WebsiteSettingsConfig = {
  siteName: 'Heritage Antiques',
  siteTagline: 'Curators of Rare Antiquities & Historic Artifacts',
  logoText: 'H',
  contactEmail: 'curator@heritageantiques.com',
  contactPhone: '+44 (0) 20 7946 0912',
  address: '42 Bond Street, Mayfair, London W1S 2XU, United Kingdom',
  currency: 'USD ($)',
  socialInstagram: 'https://instagram.com/heritageantiques',
  socialPinterest: 'https://pinterest.com/heritageantiques',
  socialLinkedIn: 'https://linkedin.com/company/heritage-antiques',
  seoTitle: 'Heritage Antiques | Rare Historic Relics & Museum Artifacts',
  seoDescription: 'Discover museum-grade antiquities, ancient bronzes, dynasty vases, and certified relics with complete provenance and white-glove global delivery.',
  enableGuestCheckout: true,
  notifyOnNewOrder: true
};

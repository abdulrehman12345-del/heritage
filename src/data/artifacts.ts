import { Artifact, Testimonial } from '../types';

export const ARTIFACTS_DATA: Artifact[] = [
  {
    id: 'ha-01',
    title: 'Imperial Gilded Bronze Horse Sculpture',
    category: 'Animal Statues',
    era: 'Imperial Dynastic Era',
    origin: 'Vienna, Austria',
    periodYear: 'c. 1780 AD',
    price: 100000,
    priceFormatted: '$100,000',
    image: '/golden_horse.jpg',
    secondaryImages: [
      '/golden_horse.jpg',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '38cm H x 46cm L x 18cm W',
    weight: '11.8 kg',
    material: 'Gilded Cast Bronze on Polished Italian Marble Plinth',
    condition: 'Pristine museum preservation with original lustrous gold leaf patina.',
    certificateNumber: 'HA-100K-HORSE',
    description: 'An extraordinary museum-grade antique sculpture depicting a noble golden mare with flowing mane and a foal beneath her arch, set upon a solid polished Italian marble plinth. Cast in bronze with opulent gold leaf gilding.',
    curatorNotes: 'Originating from an aristocratic Viennese estate. Represents equine nobility and timeless maternal protection. Certified composition shows high-purity bronze with authentic historic fire-gilding.',
    provenance: [
      { year: '1780', event: 'Crafted for Imperial Equestrian Salon', location: 'Vienna, Austria' },
      { year: '1924', event: 'Preserved in Private European Antiquities Trust', location: 'Salzburg, Austria' },
      { year: '1988', event: 'Exhibited at Fine Art Heritage Exposition', location: 'Zurich, Switzerland' },
      { year: '2024', event: 'Acquired into Heritage Antiques Private Vault', location: 'Geneva, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-02',
    title: 'Hellenistic Bronze Stalking Lion Statue',
    category: 'Animal Statues',
    era: 'Hellenistic Period',
    origin: 'Eastern Mediterranean',
    periodYear: 'c. 220 BC',
    price: 78000,
    priceFormatted: '$78,000',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '31cm H x 56cm L x 22cm W',
    weight: '14.2 kg',
    material: 'Bronze Cast via Lost-Wax Method with Malachite Encrustation',
    condition: 'intact with undisturbed marine-terrestrial oxidation crust.',
    certificateNumber: 'HA-0220-LION',
    description: 'An extraordinary ancient Greek Hellenistic bronze statue depicting a lion in a low tension stance. The muscle definition and ferocious gaze reflect the heightened realism characteristic of 3rd Century BC Mediterranean craftsmanship.',
    curatorNotes: 'X-ray fluorescence (XRF) spectroscopy confirms 88% copper alloy matching Macedonian foundry signatures. Accompanied by full C-14 organic soil trace report and UNESCO compliance clearance.',
    provenance: [
      { year: 'c. 220 BC', event: 'Dedicated in sanctuary shrine', location: 'Northern Greece' },
      { year: '1934', event: 'Discovered in estate excavation', location: 'Thessaly, Greece' },
      { year: '1965', event: 'Acquired by Marquis de Beauchamp', location: 'Paris, France' },
      { year: '2022', event: 'Consigned to Heritage Antiques Vault', location: 'Zurich, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-03',
    title: 'Ming Dynasty Celestial Dragon Bronze Vessel',
    category: 'Antique Vases',
    era: 'Ming Dynasty (Wanli Era)',
    origin: 'Beijing, China',
    periodYear: 'c. 1620 AD',
    price: 92000,
    priceFormatted: '$92,000',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '58cm H x 34cm Diameter',
    weight: '18.6 kg',
    material: 'Gilded Bronze with Repoussé Dragon Handles & Cloud Reliefs',
    condition: 'Pristine original casting marks with warm golden undertones.',
    certificateNumber: 'HA-1620-DRAGON',
    description: 'An imperial court quality bronze ritual vase encircled by twin five-claw dragons pursuing the flaming pearl amongst ethereal cloud swirls. Bears six-character Wanli reign mark chiseled into the base rim.',
    curatorNotes: 'Imperial five-claw dragon motifs were strictly restricted for royal palace usage during the Wanli period. The patina reveals rich copper-gold highlights with centuries of hand rubbing.',
    provenance: [
      { year: '1620', event: 'Cast for Imperial Ancestral Temple', location: 'Forbidden City, Beijing' },
      { year: '1898', event: 'Entered Von Bernstorff Diplomatic Collection', location: 'Berlin, Germany' },
      { year: '1954', event: 'Preserved in Private Swiss Family Vault', location: 'Lucerne, Switzerland' },
      { year: '2025', event: 'Offered via Heritage Antiques', location: 'London, UK' }
    ],
    featured: true
  },
  {
    id: 'ha-04',
    title: 'Roman Imperial Bronze Bust of Mercury',
    category: 'Metal Sculptures',
    era: 'Roman Imperial Era',
    origin: 'Campania, Roman Empire',
    periodYear: 'c. 150 AD',
    price: 65000,
    priceFormatted: '$65,000',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '38cm H x 24cm W',
    weight: '9.8 kg',
    material: 'Bronze with Silver-Inlaid Eyes & Winged Petasos Helmet',
    condition: 'Intact features with authentic dark olive green cuprous oxide coating.',
    certificateNumber: 'HA-0150-MERCURY',
    description: 'A refined Roman bronze bust of Hermes/Mercury, messenger of gods and patron of merchants. The figure wears a winged cap with delicately carved silver wire inlays remaining in the eyes.',
    curatorNotes: 'Discovered during 19th Century villa excavations near Herculaneum. The expressive craftsmanship demonstrates classical Roman assimilation of Praxitelean Greek sculpture proportions.',
    provenance: [
      { year: 'c. 150 AD', event: 'Adorned Roman Villa Lararium', location: 'Campania, Italy' },
      { year: '1888', event: 'Documented in Cavaliere Rossi Private Collection', location: 'Naples, Italy' },
      { year: '1972', event: 'Exhibited at European Antiquities Fair', location: 'Maastricht, Netherlands' },
      { year: '2023', event: 'Curated by Heritage Antiques', location: 'Vienna, Austria' }
    ],
    featured: false
  },
  {
    id: 'ha-05',
    title: 'Persian Engraved Copper Ceremonial Urn',
    category: 'Copper Artifacts',
    era: 'Safavid Dynasty',
    origin: 'Isfahan, Persia',
    periodYear: 'c. 1680 AD',
    price: 26500,
    priceFormatted: '$26,500',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '48cm H x 30cm Diameter',
    weight: '11.5 kg',
    material: 'Heavy Copper with Hand-Engraved Persian Poetry & Flower Patterns',
    condition: 'Great antique condition with warm copper shine.',
    certificateNumber: 'HA-1680-COPPER',
    description: 'A genuine 17th-century copper urn from Persia. Made by hand with detailed engravings of poetry and traditional flower patterns.',
    curatorNotes: 'Original 17th-century Persian copper piece. Fully authentic and tested.',
    provenance: [
      { year: '1680', event: 'Crafted in Isfahan, Persia', location: 'Isfahan, Persia' },
      { year: '1921', event: 'Purchased by collector in London', location: 'London, UK' },
      { year: 'Present', event: 'Stored in Heritage Vault with Authenticity Certificate', location: 'London, UK' }
    ],
    featured: false
  },
  {
    id: 'ha-06',
    title: 'Chola Dynasty Bronze Dancing Ganesha',
    category: 'Bronze Statues',
    era: 'Chola Dynasty',
    origin: 'Tamil Nadu, South India',
    periodYear: 'c. 1150 AD',
    price: 86000,
    priceFormatted: '$86,000',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '46cm H x 26cm W x 18cm D',
    weight: '13.1 kg',
    material: 'Traditional Five-Metal Sacred Bronze (Gold, Silver, Copper, Zinc, Lead)',
    condition: 'Excellent smooth finish with original altar shine.',
    certificateNumber: 'HA-1150-GANESHA',
    description: 'An ancient 12th-century bronze statue of Dancing Ganesha standing on a lotus base. Hand-cast using the lost-wax method, showing graceful movement and sacred symbols.',
    curatorNotes: 'Authentic 12th-century Indian bronze. Tested and verified for museum-level quality.',
    provenance: [
      { year: 'c. 1150 AD', event: 'Made for temple shrine in South India', location: 'Tamil Nadu, India' },
      { year: '1962', event: 'Preserved in private collection in Paris', location: 'Paris, France' },
      { year: 'Present', event: 'Certified in Heritage Vault', location: 'Geneva, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-07',
    title: 'Gilded Bronze Ancient Stag Figurine',
    category: 'Animal Statues',
    era: 'Etruscan Civilization',
    origin: 'Tuscany, Italy',
    periodYear: 'c. 450 BC',
    price: 52000,
    priceFormatted: '$52,000',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '29cm H x 22cm L',
    weight: '4.8 kg',
    material: 'Solid Bronze with Real Gold Foil Traces',
    condition: 'Ancient original condition with intact antlers and fine details.',
    certificateNumber: 'HA-0450-STAG',
    description: 'A very rare ancient bronze deer (stag) statue with long graceful antlers and geometric engravings. Made over 2,400 years ago in ancient Italy.',
    curatorNotes: 'Verified ancient bronze with original gold foil highlights. Fully tested and certified authentic.',
    provenance: [
      { year: 'c. 450 BC', event: 'Created in Ancient Etruria (Italy)', location: 'Tuscany, Italy' },
      { year: '1948', event: 'Preserved in Florentine private collection', location: 'Florence, Italy' },
      { year: 'Present', event: 'Secured in Heritage Vault with Certificate', location: 'Milan, Italy' }
    ],
    featured: false
  },
  {
    id: 'ha-08',
    title: 'Byzantine Metal Box with Sacred Carvings',
    category: 'Metal Sculptures',
    era: 'Byzantine Empire',
    origin: 'Constantinople',
    periodYear: 'c. 950 AD',
    price: 64000,
    priceFormatted: '$64,000',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '22cm H x 32cm W x 20cm D',
    weight: '6.5 kg',
    material: 'Hand-Hammered Copper Alloy with Gold-Plated Figures',
    condition: 'Very well preserved with intact vintage latch and box structure.',
    certificateNumber: 'HA-0950-RELIQUARY',
    description: 'A 10th-century medieval metal treasure box. It features hand-hammered relief figures of angels and saints with an antique lock.',
    curatorNotes: 'Authentic 10th-century medieval metalwork. Inspected and verified by experts.',
    provenance: [
      { year: 'c. 950 AD', event: 'Made in ancient Constantinople', location: 'Constantinople' },
      { year: '1928', event: 'Preserved in private Italian collection', location: 'Venice, Italy' },
      { year: 'Present', event: 'Secured with Certificate of Authenticity', location: 'Geneva, Switzerland' }
    ],
    featured: false
  },
  {
    id: 'ha-09',
    title: 'Renaissance Copper & Bronze Two-Handled Vase',
    category: 'Antique Vases',
    era: 'Italian Renaissance',
    origin: 'Florence, Italy',
    periodYear: 'c. 1520 AD',
    price: 48500,
    priceFormatted: '$48,500',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '52cm H x 29cm W',
    weight: '10.2 kg',
    material: 'Hammered Copper Body with Solid Cast Bronze Handles',
    condition: 'Warm natural copper and bronze finish, strong and undamaged.',
    certificateNumber: 'HA-1520-AMPHORA',
    description: 'A beautiful 16th-century Italian Renaissance vase. Features two solid bronze sculpted handles and a hand-shaped copper body with classical flower carvings.',
    curatorNotes: 'Genuine 16th-century Renaissance piece made in Florence. Authenticated by specialists.',
    provenance: [
      { year: '1520', event: 'Created in Florence, Italy', location: 'Florence, Italy' },
      { year: '1870', event: 'Preserved in London private estate', location: 'London, UK' },
      { year: 'Present', event: 'Certified in Heritage Vault', location: 'London, UK' }
    ],
    featured: false
  },
  {
    id: 'ha-10',
    title: 'Ancient Greek Bronze Warrior Helmet',
    category: 'Historical Pieces',
    era: 'Archaic Greek',
    origin: 'Corinth, Greece',
    periodYear: 'c. 520 BC',
    price: 115000,
    priceFormatted: '$115,000',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '32cm H x 24cm Depth',
    weight: '2.9 kg',
    material: 'Solid Hammered Sheet Bronze with Eye Slits and Nose Guard',
    condition: 'Great structural condition with original antique green-blue bronze finish.',
    certificateNumber: 'HA-0520-CORINTH',
    description: 'An authentic ancient Greek bronze helmet over 2,500 years old. Hammered by hand from a single piece of bronze with classic almond-shaped eye openings.',
    curatorNotes: 'Genuine ancient Greek helmet. Fully legal, registered, and verified authentic with full documentation.',
    provenance: [
      { year: 'c. 520 BC', event: 'Made in Ancient Greece (Corinth)', location: 'Greece' },
      { year: '1968', event: 'Preserved in Swiss private collection', location: 'Basel, Switzerland' },
      { year: 'Present', event: 'Secured in Heritage Vault with Certificate', location: 'Geneva, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-11',
    title: 'Victorian Copper & Bronze Dragon Candle Stand',
    category: 'Decorative Collectibles',
    era: 'Victorian Era',
    origin: 'Birmingham, England',
    periodYear: 'c. 1875 AD',
    price: 19800,
    priceFormatted: '$19,800',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '62cm H x 38cm W',
    weight: '9.1 kg',
    material: 'Polished Solid Copper with Sculpted Bronze Dragon Base',
    condition: 'Works perfectly with a warm, clean hand-polished shine.',
    certificateNumber: 'HA-1875-CANDELABRA',
    description: 'A grand 5-candle antique candelabra with detailed dragon sculptures holding candle holders. Hand-crafted in 19th-century England.',
    curatorNotes: 'Stamped with original English maker marks. Fully tested and genuine Victorian piece.',
    provenance: [
      { year: '1875', event: 'Made in Birmingham, England', location: 'London, UK' },
      { year: '1935', event: 'Kept in British manor house', location: 'Cotswolds, UK' },
      { year: 'Present', event: 'Certified in Heritage Vault', location: 'London, UK' }
    ],
    featured: false
  },
  {
    id: 'ha-12',
    title: 'Ancient Celtic Bronze Boar Sculpture',
    category: 'Copper Artifacts',
    era: 'Ancient Celtic',
    origin: 'France (Ancient Gaul)',
    periodYear: 'c. 100 BC',
    price: 42000,
    priceFormatted: '$42,000',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '18cm H x 28cm L',
    weight: '3.7 kg',
    material: 'Cast Solid Bronze with Ridge Bristles and Eye Rings',
    condition: 'Great antique condition with natural smooth green patina.',
    certificateNumber: 'HA-0100-BOAR',
    description: 'An authentic Celtic bronze wild boar statue over 2,100 years old. In Celtic history, the wild boar was a symbol of courage and strength.',
    curatorNotes: 'Verified original Celtic bronze sculpture. Tested and confirmed genuine ancient artifact.',
    provenance: [
      { year: 'c. 100 BC', event: 'Made in Ancient Gaul', location: 'France' },
      { year: '1960', event: 'Preserved in private collection in Paris', location: 'Paris, France' },
      { year: 'Present', event: 'Secured with Official Certificate', location: 'Geneva, Switzerland' }
    ],
    featured: false
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The antique vase arrived safely in perfect packaging with all authenticity certificates and verification reports. Outstanding service and 100% genuine products.',
    author: 'Alistair Sterling',
    role: 'Art Collector',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=70&w=150&auto=format&fit=crop'
  },
  {
    id: 't-2',
    quote: 'Finding real, certified bronze antiques with complete history is difficult, but Heritage Antiques makes the entire buying process easy, safe, and transparent.',
    author: 'Dr. Elena Rostova',
    role: 'Historian & Antique Enthusiast',
    location: 'Vienna, Austria',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=70&w=150&auto=format&fit=crop'
  },
  {
    id: 't-3',
    quote: 'The quality of the Japanese bronze falcon is breathtaking. Fast insured delivery and excellent customer support from start to finish.',
    author: 'Henrik Von Bergmann',
    role: 'Private Collector',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=70&w=150&auto=format&fit=crop'
  }
];

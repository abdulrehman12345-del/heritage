import { Artifact, Testimonial } from '../types';

export const ARTIFACTS_DATA: Artifact[] = [
  {
    id: 'ha-01',
    title: 'Edo Period Imperial Bronze Falcon',
    category: 'Animal Statues',
    era: 'Edo Period, Japan',
    origin: 'Kyoto, Japan',
    periodYear: 'c. 1840 AD',
    price: 34500,
    priceFormatted: '$34,500',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?q=70&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '42cm H x 28cm W x 19cm D',
    weight: '8.4 kg',
    material: 'Cast Bronze with Dark Gold Patina & Hand Chiselled Plumage',
    condition: 'Exceptional museum grade preservation with natural verdigris highlights.',
    certificateNumber: 'HA-1840-FALCON',
    description: 'A sublime Edo period bronze falcon sculpture featuring meticulously hand-chiselled feather details, sharp expressive eyes, and a rich dark honey patina earned over nearly two centuries of private reverence.',
    curatorNotes: 'Comes from a prominent Kyoto samurai estate. The falcon was revered in Edo Japan as a symbol of nobility, keen vision, and decisive leadership. Metal composition testing confirms high copper content with gold leaf traces.',
    provenance: [
      { year: '1840', event: 'Commissioned by Daimyo Clan of Yamashiro Province', location: 'Kyoto, Japan' },
      { year: '1912', event: 'Acquired by Matsukata Private Art Collection', location: 'Tokyo, Japan' },
      { year: '1978', event: 'Cataloged at Sotheby’s Asian Art Auction', location: 'London, UK' },
      { year: '2024', event: 'Acquired into Heritage Antiques Collection', location: 'Geneva, Switzerland' }
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
    material: 'Heavy Tinned Copper with Calligraphic Engravings & Floral Arabesque',
    condition: 'Excellent historical patina showing warm copper glints under tinned coat.',
    certificateNumber: 'HA-1680-COPPER',
    description: 'A masterpiece of Safavid metalworking, hand-hammered from pure copper and elaborately engraved with Persian poetry calligraphy, gazelle hunts, and lush palmette bands.',
    curatorNotes: 'Inscribed with verses from Hafez celebrating light and everlasting wisdom. The intricate repoussé technique exemplifies Isfahan artisan guild mastery during Shah Abbas II rule.',
    provenance: [
      { year: '1680', event: 'Crafted in Isfahan Royal Bazaar', location: 'Isfahan, Persia' },
      { year: '1921', event: 'Acquired by British Orientalist Scholar', location: 'Tehran, Iran' },
      { year: '1985', event: 'Inherited by Oxford Private Estate', location: 'Oxford, UK' },
      { year: '2024', event: 'Offered at Heritage Antiques Vault', location: 'London, UK' }
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
    material: 'Panchaloha Five-Metal Bronze Alloy (Gold, Silver, Copper, Zinc, Lead)',
    condition: 'Superb classical smooth patina with ancient altar ritual oil sheen.',
    certificateNumber: 'HA-1150-GANESHA',
    description: 'A celebrated Chola bronze sculpture depicting Nrutta Ganesha dancing atop a lotus pedestal. Cast using the ancient Cire Perdue (lost wax) process, capturing rhythmic grace, fluid trunk curve, and sacred axe & sweets accessories.',
    curatorNotes: 'Chola bronzes are world-renowned for their unmatched divine grace and metallurgical purity. Certified by Indian Art Conservation Laboratory as authentic 12th Century Chola period casting.',
    provenance: [
      { year: 'c. 1150 AD', event: 'Consecrated in Tanjore Temple Shrine', location: 'Tamil Nadu, India' },
      { year: '1910', event: 'Entered Colonial Estate Collection', location: 'Madras, India' },
      { year: '1962', event: 'Acquired by French Indology Society Founder', location: 'Pondicherry / Paris' },
      { year: '2023', event: 'Consigned to Heritage Antiques', location: 'Geneva, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-07',
    title: 'Gilded Bronze Etruscan Stag Figurine',
    category: 'Animal Statues',
    era: 'Etruscan Civilization',
    origin: 'Tuscany, Etruria',
    periodYear: 'c. 450 BC',
    price: 52000,
    priceFormatted: '$52,000',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '29cm H x 22cm L',
    weight: '4.8 kg',
    material: 'Solid Cast Bronze with Trace Gold Foil Gilding',
    condition: 'Museum grade with delicate ancient antler structure preserved intact.',
    certificateNumber: 'HA-0450-STAG',
    description: 'An exceedingly rare Etruscan bronze votive stag featuring elegant elongated antlers and fine incised geometric torso patterns. Etruscan stag bronzes represented forest spirits and lunar speed.',
    curatorNotes: 'Metallurgical testing reveals 92% pure copper-bronze with mercury gold fire-gilding remnants around the neck crest. A pristine survival from pre-Roman Italy.',
    provenance: [
      { year: 'c. 450 BC', event: 'Buried in Etruscan Votive Deposit', location: 'Volterra, Italy' },
      { year: '1895', event: 'Discovered during agrarian soil turning', location: 'Tuscany, Italy' },
      { year: '1948', event: 'Documented in Conte Ricasoli Collection', location: 'Florence, Italy' },
      { year: '2024', event: 'Verified by Heritage Antiques Vault', location: 'Milan, Italy' }
    ],
    featured: false
  },
  {
    id: 'ha-08',
    title: 'Byzantine Hammered Metal Reliquary Casket',
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
    material: 'Repoussé Copper Alloy with Fire-Gilded Saints Relief',
    condition: 'Extremely well-preserved lock plate and original interior velvet lining remnant.',
    certificateNumber: 'HA-0950-RELIQUARY',
    description: 'A 10th-Century Byzantine metal reliquary casket adorned with hand-hammered relief figures of archangels and saints framing a central Greek cross latch.',
    curatorNotes: 'Exhibits quintessential Middle Byzantine imperial court metalwork style. Thermoluminescence and patina chemical analysis confirm authentic medieval Mediterranean origin.',
    provenance: [
      { year: 'c. 950 AD', event: 'Housed in Imperial Monastery Sanctuary', location: 'Constantinople' },
      { year: '1204', event: 'Transferred during Fourth Crusade', location: 'Venice, Italy' },
      { year: '1928', event: 'Acquired by Venetian Noble Family', location: 'Venice, Italy' },
      { year: '2023', event: 'Curated by Heritage Antiques', location: 'Geneva, Switzerland' }
    ],
    featured: false
  },
  {
    id: 'ha-09',
    title: 'Renaissance Copper & Bronze Ritual Amphora',
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
    material: 'Hammered Copper Body with Cast Bronze Satyr Handles',
    condition: 'Rich warm copper patina with deep bronze highlights.',
    certificateNumber: 'HA-1520-AMPHORA',
    description: 'A high Renaissance ceremonial amphora created in Florence. Features twin cast bronze satyr handles grasping the rim, while the copper body is hand-chased with acanthus scrolls and mythological sea beasts.',
    curatorNotes: 'Style attributed to the circle of Andrea del Verrocchio metalworking workshops. Perfect synthesis of classical Roman revival and Renaissance foundry brilliance.',
    provenance: [
      { year: '1520', event: 'Commissioned for Medici Suburban Villa', location: 'Florence, Italy' },
      { year: '1870', event: 'Purchased by Victorian Antiquarian Sir Thomas Hope', location: 'London, UK' },
      { year: '1982', event: 'Auctioned at Christie’s Fine Decorative Arts', location: 'New York, USA' },
      { year: '2024', event: 'Added to Heritage Antiques Collection', location: 'London, UK' }
    ],
    featured: false
  },
  {
    id: 'ha-10',
    title: 'Historical Ancient Greek Bronze Helmet & Plaque',
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
    material: 'Sheet Bronze with Incised Eyebrow Borders & Cheek Guard Pin Holes',
    condition: 'Remarkable structural integrity with vibrant azurite blue-green patina.',
    certificateNumber: 'HA-0520-CORINTH',
    description: 'An authentic Archaic Greek Corinthian type bronze helmet of magnificent proportions. Hammered from a single ingot of bronze with almond-shaped eye slits and a stylized nasal guard.',
    curatorNotes: 'A centerpiece artifact of historical warfare. Complete export certification from Ministry of Culture and verified legally compliant provenance documentation dating back to pre-1970 collections.',
    provenance: [
      { year: 'c. 520 BC', event: 'Votive dedication in Panhellenic sanctuary', location: 'Olympia / Corinth' },
      { year: '1922', event: 'Discovered in private estate land', location: 'Peloponnese, Greece' },
      { year: '1968', event: 'Acquired by Dr. Hans Rosenberg Antiquities', location: 'Basel, Switzerland' },
      { year: '2025', event: 'Available exclusively at Heritage Antiques Vault', location: 'Geneva, Switzerland' }
    ],
    featured: true
  },
  {
    id: 'ha-11',
    title: 'Victorian Cast Copper Dragon Candelabra',
    category: 'Decorative Collectibles',
    era: 'Victorian Gothic Revival',
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
    material: 'Polished Solid Copper with Darkened Bronze Dragon Base',
    condition: 'Functions flawlessly with warm hand-buffed copper glow.',
    certificateNumber: 'HA-1875-CANDELABRA',
    description: 'An imposing five-arm Gothic Revival candelabra featuring winged dragon caryatids upholding candle nozzles, hand-crafted during the height of the English Arts & Crafts movement.',
    curatorNotes: 'Stamped with foundry mark of Elkington & Co. Birmingham. Celebrates the 19th-Century British obsession with medieval dragon lore and metallic alchemy.',
    provenance: [
      { year: '1875', event: 'Exhibited at London Industrial Arts Fair', location: 'London, UK' },
      { year: '1935', event: 'Housed in Manor House Estate', location: 'Cotswolds, UK' },
      { year: '1998', event: 'Private Collector Acquisition', location: 'Edinburgh, Scotland' },
      { year: '2024', event: 'Offered at Heritage Antiques Vault', location: 'London, UK' }
    ],
    featured: false
  },
  {
    id: 'ha-12',
    title: 'Ancient Celtic Bronze Boar Totem',
    category: 'Copper Artifacts',
    era: 'Iron Age Celtic',
    origin: 'Gaul (Modern France)',
    periodYear: 'c. 100 BC',
    price: 42000,
    priceFormatted: '$42,000',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=70&w=600&auto=format&fit=crop',
    secondaryImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=70&w=400&auto=format&fit=crop'
    ],
    dimensions: '18cm H x 28cm L',
    weight: '3.7 kg',
    material: 'Cast Bronze with Crested Bristle Ridge & Ring Eyes',
    condition: 'Superb smooth forest-green cuprite crust patina.',
    certificateNumber: 'HA-0100-BOAR',
    description: 'A Celtic military or tribal boar standard finial. The wild boar was the quintessential symbol of Celtic warrior courage, ferocity, and divine forest protection.',
    curatorNotes: 'Features typical La Tène artistic style with stylized scrollwork along the flank. Authenticated with metallographic microscopic analysis and radiocarbon soil surrounding tests.',
    provenance: [
      { year: 'c. 100 BC', event: 'Tribal chieftain standard component', location: 'Central Gaul' },
      { year: '1908', event: 'Excavated near Rhone River valley', location: 'Lyon, France' },
      { year: '1960', event: 'Acquired by Marquis de La Tour', location: 'Paris, France' },
      { year: '2024', event: 'Curated by Heritage Antiques Vault', location: 'Geneva, Switzerland' }
    ],
    featured: false
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Heritage Antiques represents the pinnacle of antiquarian stewardship. The Ming Dynasty bronze dragon vase arrived with flawless white-glove transport, complete with pristine archival documentation and metallurgical verification.',
    author: 'Lord Alistair Sterling',
    role: 'Senior Trustee, International Antiquities Trust',
    location: 'London, United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=70&w=150&auto=format&fit=crop'
  },
  {
    id: 't-2',
    quote: 'Finding certified Hellenistic bronzes with unblemished provenance is remarkably rare today. The team at Heritage Antiques conducts themselves with the rigor of top-tier museum curators and the discretion of private bankers.',
    author: 'Dr. Elena Rostova',
    role: 'Former Curator of Classical Sculpture',
    location: 'Vienna, Austria',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=70&w=150&auto=format&fit=crop'
  },
  {
    id: 't-3',
    quote: 'The level of craftsmanship, authenticity, and historical transparency offered here is unparalleled. The Edo period bronze falcon is now the centerpiece of our family’s private gallery.',
    author: 'Henrik Von Bergmann',
    role: 'Private Art Collector & Patron',
    location: 'Zurich, Switzerland',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=70&w=150&auto=format&fit=crop'
  }
];

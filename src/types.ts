export type CategoryType =
  | 'All'
  | 'Animal Statues'
  | 'Bronze Statues'
  | 'Metal Sculptures'
  | 'Antique Vases'
  | 'Copper Artifacts'
  | 'Decorative Collectibles'
  | 'Historical Pieces';

export interface ProvenanceStep {
  year: string;
  event: string;
  location: string;
}

export interface Artifact {
  id: string;
  title: string;
  category: CategoryType;
  era: string;
  origin: string;
  periodYear: string;
  price: number;
  priceFormatted: string;
  image: string;
  secondaryImages?: string[];
  dimensions: string;
  weight: string;
  material: string;
  condition: string;
  certificateNumber: string;
  description: string;
  curatorNotes: string;
  provenance: ProvenanceStep[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  location: {
    city: string;
    state: string;
    area: string;
  };
  /** Full street address, optional */
  address?: string;
  images: string[];
  monthlyPrice: number;
  features: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareFeet?: number;
  };
  amenities: string[];
  rules: string[];
  featured?: boolean;
  /** Optional hero image shown first on the detail page (overrides images[0] for detail only) */
  detailHeroImage?: string;
  /** Optional video path shown on the detail page */
  video?: string;
}

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
  /** Use object-contain instead of object-cover for the primary image */
  imageContain?: boolean;
}

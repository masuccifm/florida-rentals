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
}

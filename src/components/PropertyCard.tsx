import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {property.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
          {property.name}
        </h3>
        <p className="mb-3 text-sm text-gray-500">
          {property.location.city}, {property.location.state}
        </p>
        {property.address && (
          <p className="mb-3 text-sm text-gray-500">
            {property.address}
          </p>
        )}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {property.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(property.monthlyPrice)}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <div className="text-sm text-gray-500">
            {property.features.bedrooms} bed • {property.features.bathrooms} bath
          </div>
        </div>
      </div>
    </Link>
  );
}

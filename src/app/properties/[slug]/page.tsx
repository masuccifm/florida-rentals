import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { properties, getAllPropertySlugs } from '@/config/properties';
import { formatCurrency } from '@/lib/utils';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import BookingRequestForm from '@/components/BookingRequestForm';

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({
    slug: slug,
  }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>

      {/* Property Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">{property.name}</h1>
          <p className="text-lg text-gray-600">
            {property.location.city}, {property.location.state} • {property.location.area}
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-white pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-lg md:col-span-2"
              style={{ aspectRatio: property.imageContain ? '1/2' : '4/3' }}
            >
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                className={property.imageContain ? 'object-contain' : 'object-cover'}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
            {/* Additional Images */}
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${property.name} - Image ${index + 2}`}
                  fill
                  className={property.imageContain ? 'object-contain' : 'object-cover'}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Features */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Property Features</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{property.features.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{property.features.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{property.features.maxGuests}</div>
                  <div className="text-sm text-gray-600">Max Guests</div>
                </div>
                {property.features.squareFeet && (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {property.features.squareFeet.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">About This Property</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Amenities</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">House Rules</h2>
              <ul className="space-y-2">
                {property.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1 text-gray-400">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability Calendar */}
            <AvailabilityCalendar propertyId={property.id} />
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4 border-b pb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(property.monthlyPrice)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Quick Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Monthly rentals only</p>
                  <p>• {property.features.bedrooms} bed • {property.features.bathrooms} bath</p>
                  <p>• Sleeps up to {property.features.maxGuests} guests</p>
                </div>
              </div>

              <BookingRequestForm property={property} />

              <p className="mt-4 text-center text-xs text-gray-500">
                You won&apos;t be charged yet. We&apos;ll review your request and get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

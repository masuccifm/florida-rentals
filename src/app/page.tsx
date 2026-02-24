import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/config/properties';
import Image from 'next/image';

export default function HomePage() {
  // For demo purposes, showing all properties in both sections
  // You can categorize them differently based on your needs
  const seasonalRentals = properties.slice(0, 2);
  // Show all long-term rentals (everything from index 2 onward)
  const longTermRentals = properties.slice(2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Golf Course Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pb-8 pt-32 text-white">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-35">
          <Image
            src="/images/Golf-Course.jpg"
            alt="Heritage Landing Golf Course"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/70"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="mb-6 text-5xl font-bold sm:text-6xl lg:text-7xl drop-shadow-lg">
              Florida Vacation Rentals
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-blue-100 sm:text-2xl drop-shadow-md">
              Discover your perfect monthly rental in the Sunshine State. From championship golf courses
              to pristine beaches, find your home away from home.
            </p>
          </div>

          {/* Amenity Preview Images - Bottom of Banner with Fun Shapes */}
          <div className="flex justify-center gap-4 items-end">
            {/* Circle Shape - Golf Course */}
            <div className="group relative h-32 w-32 sm:h-40 sm:w-40 rounded-full shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300">
              <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white/20">
                <Image
                  src="/images/Golf-Course.jpg"
                  alt="Golf Course"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="160px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-full">
                <p className="text-xs sm:text-sm font-semibold text-white text-center">Golf Course</p>
              </div>
            </div>

            {/* Tilted Rectangle - Pool */}
            <div className="group relative h-32 w-44 sm:h-40 sm:w-56 shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300 rotate-3 hover:rotate-0">
              <div className="relative h-full w-full overflow-hidden rounded-2xl ring-4 ring-white/20">
                <Image
                  src="/images/Pool-Spa.jpg"
                  alt="Pool & Amenities"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="224px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-2xl">
                <p className="text-sm font-semibold text-white text-center">Pool & Spa</p>
              </div>
            </div>

            {/* Rounded Square - Fitness */}
            <div className="group relative h-32 w-32 sm:h-40 sm:w-40 shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300 hidden md:block -rotate-2 hover:rotate-0">
              <div className="relative h-full w-full overflow-hidden rounded-3xl ring-4 ring-white/20">
                <Image
                  src="/images/Fitness-Center.jpg"
                  alt="Fitness Center"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="160px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-3xl">
                <p className="text-xs sm:text-sm font-semibold text-white text-center">Fitness</p>
              </div>
            </div>

            {/* Circle - Clubhouse */}
            <div className="group relative h-32 w-32 sm:h-40 sm:w-40 rounded-full shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300 hidden md:block">
              <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white/20">
                <Image
                  src="/images/Club-House.jpg"
                  alt="Clubhouse"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="160px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-full">
                <p className="text-xs sm:text-sm font-semibold text-white text-center">Clubhouse</p>
              </div>
            </div>

            {/* Tilted Rectangle - Tennis */}
            <div className="group relative h-32 w-44 sm:h-40 sm:w-56 shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300 hidden lg:block -rotate-3 hover:rotate-0">
              <div className="relative h-full w-full overflow-hidden rounded-2xl ring-4 ring-white/20">
                <Image
                  src="/images/Tennis-Courts.jpg"
                  alt="Tennis Courts"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="224px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-2xl">
                <p className="text-sm font-semibold text-white text-center">Tennis Courts</p>
              </div>
            </div>

            {/* Rounded Square - Amenities */}
            <div className="group relative h-32 w-32 sm:h-40 sm:w-40 shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:z-50 hover:-translate-y-2 duration-300 hidden xl:block rotate-2 hover:rotate-0">
              <div className="relative h-full w-full overflow-hidden rounded-3xl ring-4 ring-white/20">
                <Image
                  src="/images/Aminites.avif"
                  alt="Amenities"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="160px"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-10 rounded-b-3xl">
                <p className="text-xs sm:text-sm font-semibold text-white text-center">Amenities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portfolio Section */}
      <section className="relative py-20">
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <Image
            src="https://assets.floridarentals.com/assets/properties/24404/tn5_74933729817386314800.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Large Portfolio Heading */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl">
              Our Current Rental Portfolio
            </h2>
            <div className="mx-auto h-1 w-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
          </div>

          {/* Seasonal Rentals Section */}
          <div className="mb-20">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200"></div>
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Seasonal Rentals
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200"></div>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-gray-600">
              Perfect for snowbirds and seasonal guests. Enjoy Florida living during the most beautiful months
              of the year with our flexible monthly rentals.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {seasonalRentals.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>

          {/* Long Term Rentals Section */}
          <div className="mb-20">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-green-200"></div>
              <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Long Term Rentals
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-green-200"></div>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-gray-600">
              Looking for a more permanent solution? Our long-term rentals offer the stability and comfort
              of home with the luxury of resort-style amenities.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {longTermRentals.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://assets.floridarentals.com/assets/properties/24404/tn5_109034233917386315100.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">
            Ready to Book Your Florida Getaway?
          </h2>
          <p className="mb-10 text-xl text-blue-100 drop-shadow-md">
            Browse our properties and submit a booking request. We&apos;ll get back to you within 24 hours
            to discuss your perfect Florida rental experience.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="#"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
            >
              View All Properties
            </a>
            <a
              href="#"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

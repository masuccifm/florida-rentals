'use client';

import { useState } from 'react';
import { Property } from '@/types';
import { formatCurrency, calculateTotalPrice } from '@/lib/utils';

interface BookingRequestFormProps {
  property: Property;
}

export default function BookingRequestForm({ property }: BookingRequestFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in_date: '',
    check_out_date: '',
    num_guests: 1,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          property_id: property.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request');
      }

      setSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setFormData({
          guest_name: '',
          guest_email: '',
          guest_phone: '',
          check_in_date: '',
          check_out_date: '',
          num_guests: 1,
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const calculateEstimate = () => {
    if (formData.check_in_date && formData.check_out_date) {
      const checkIn = new Date(formData.check_in_date);
      const checkOut = new Date(formData.check_out_date);
      return calculateTotalPrice(property.monthlyPrice, checkIn, checkOut);
    }
    return null;
  };

  const estimate = calculateEstimate();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-white font-semibold transition-colors hover:bg-blue-700"
      >
        Request Booking
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Request Booking</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <h3 className="font-semibold text-gray-900">{property.name}</h3>
              <p className="text-sm text-gray-600">
                {property.location.city}, {property.location.state}
              </p>
              <p className="mt-2 text-lg font-bold text-blue-600">
                {formatCurrency(property.monthlyPrice)}/month
              </p>
            </div>

            {success ? (
              <div className="rounded-lg bg-green-50 p-6 text-center">
                <div className="mb-2 text-4xl">✓</div>
                <h3 className="mb-2 text-xl font-bold text-green-900">Request Submitted!</h3>
                <p className="text-green-700">
                  We&apos;ve received your booking request and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guest_name}
                      onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.guest_email}
                      onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.guest_phone}
                    onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.check_in_date}
                      onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.check_out_date}
                      onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Number of Guests *
                  </label>
                  <select
                    required
                    value={formData.num_guests}
                    onChange={(e) => setFormData({ ...formData, num_guests: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    {Array.from({ length: property.features.maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any special requests or questions?"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {estimate !== null && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Estimated Total:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(estimate)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      * This is an estimate based on monthly rate. Final price will be confirmed.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  You won&apos;t be charged yet. We&apos;ll review your request and contact you within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

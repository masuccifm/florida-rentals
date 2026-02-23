'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfToday } from 'date-fns';

interface AvailabilityCalendarProps {
  propertyId: string;
}

export default function AvailabilityCalendar({ propertyId }: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates] = useState<Date[]>([]);
  const [loading] = useState(false);

  useEffect(() => {
    // TODO: Fetch booked dates from Supabase
    console.log('Property ID:', propertyId, 'Month:', currentMonth);
  }, [propertyId, currentMonth]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday)
  const firstDayOfWeek = monthStart.getDay();

  // Create empty cells for days before month starts
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(
      (bookedDate) => format(bookedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const isPastDate = (date: Date) => {
    return isBefore(date, startOfToday());
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Availability</h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
          >
            ← Prev
          </button>
          <button
            onClick={nextMonth}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="text-center font-semibold text-gray-900 mb-4">
        {format(currentMonth, 'MMMM yyyy')}
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading availability...</div>
      ) : (
        <>
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {emptyCells.map((i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {daysInMonth.map((day) => {
              const booked = isDateBooked(day);
              const past = isPastDate(day);
              const today = isToday(day);

              return (
                <div
                  key={day.toISOString()}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm
                    ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : ''}
                    ${today ? 'ring-2 ring-blue-500' : ''}
                    ${booked ? 'bg-red-100 text-red-800' : past ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-800 hover:bg-green-100'}
                  `}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-green-50 border border-green-200"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-red-100 border border-red-200"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-100 border border-gray-200"></div>
              <span className="text-gray-600">Past</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

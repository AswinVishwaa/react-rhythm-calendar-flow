
import React from 'react';
import { format, startOfWeek, addDays, isSameMonth, isToday } from 'date-fns';
import CalendarDay from './CalendarDay';
import { Event } from '../pages/Index';

interface CalendarGridProps {
  currentDate: Date;
  monthDays: Date[];
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  getEventsForDate: (date: Date) => Event[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  monthDays,
  events,
  onDateClick,
  onEventClick,
  getEventsForDate,
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get the start of the week for the first day of the month
  const calendarStart = startOfWeek(monthDays[0]);
  
  // Generate all days for the calendar grid (42 days to fill 6 weeks)
  const calendarDays = Array.from({ length: 42 }, (_, i) => addDays(calendarStart, i));

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center text-sm font-medium text-gray-500 bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);

          return (
            <CalendarDay
              key={index}
              date={day}
              events={dayEvents}
              isCurrentMonth={isCurrentMonth}
              isToday={isDayToday}
              onDateClick={onDateClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;

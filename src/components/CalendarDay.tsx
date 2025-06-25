
import React from 'react';
import { format } from 'date-fns';
import { Event } from '../pages/Index';

interface CalendarDayProps {
  date: Date;
  events: Event[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  events,
  isCurrentMonth,
  isToday,
  onDateClick,
  onEventClick,
}) => {
  const handleDayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateClick(date);
  };

  const handleEventClick = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    onEventClick(event);
  };

  return (
    <div
      className={`min-h-[120px] border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
        !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
      }`}
      onClick={handleDayClick}
    >
      <div className="flex justify-between items-start mb-1">
        <span
          className={`text-sm font-medium ${
            isToday
              ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
              : isCurrentMonth
              ? 'text-gray-900'
              : 'text-gray-400'
          }`}
        >
          {format(date, 'd')}
        </span>
      </div>

      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 transition-opacity`}
            style={{ backgroundColor: event.color }}
            onClick={(e) => handleEventClick(e, event)}
            title={event.title}
          >
            <div className="truncate font-medium">{event.title}</div>
            {event.time && (
              <div className="truncate opacity-90">{event.time}</div>
            )}
          </div>
        ))}
        
        {events.length > 3 && (
          <div className="text-xs text-gray-500 pl-1">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;

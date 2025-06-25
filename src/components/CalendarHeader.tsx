
import React from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onCreateEvent: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onDateChange,
  onCreateEvent,
}) => {
  const goToPreviousMonth = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <Button
          variant="outline"
          onClick={goToToday}
          className="text-sm"
        >
          Today
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousMonth}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-medium text-gray-900 min-w-[200px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            className="hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={onCreateEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;


import React, { useState } from 'react';
import CalendarHeader from '../components/CalendarHeader';
import CalendarGrid from '../components/CalendarGrid';
import EventModal from '../components/EventModal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
  description?: string;
}

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e));
    } else {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents([...events, newEvent]);
    }
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <CalendarHeader 
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCreateEvent={() => {
            setSelectedDate(new Date());
            setEditingEvent(null);
            setIsEventModalOpen(true);
          }}
        />
        
        <CalendarGrid
          currentDate={currentDate}
          monthDays={monthDays}
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          getEventsForDate={getEventsForDate}
        />

        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      </div>
    </div>
  );
};

export default Index;

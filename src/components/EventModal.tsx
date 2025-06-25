
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '../pages/Index';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => void;
  onDelete: (eventId: string) => void;
  selectedDate: Date | null;
  editingEvent: Event | null;
}

const EVENT_COLORS = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Green
  '#f59e0b', // Yellow
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
];

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  editingEvent,
}) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(EVENT_COLORS[0]);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setTime(editingEvent.time);
      setDescription(editingEvent.description || '');
      setColor(editingEvent.color);
    } else {
      setTitle('');
      setTime('');
      setDescription('');
      setColor(EVENT_COLORS[0]);
    }
  }, [editingEvent, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !selectedDate) return;

    onSave({
      title: title.trim(),
      date: selectedDate,
      time,
      description,
      color,
    });

    setTitle('');
    setTime('');
    setDescription('');
    setColor(EVENT_COLORS[0]);
  };

  const handleDelete = () => {
    if (editingEvent) {
      onDelete(editingEvent.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
            {editingEvent && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="event-title">Title *</Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="event-date">Date</Label>
            <Input
              id="event-date"
              value={selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
              disabled
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="event-time">Time</Label>
            <Input
              id="event-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description (optional)"
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label>Color</Label>
            <div className="flex space-x-2 mt-2">
              {EVENT_COLORS.map((eventColor) => (
                <button
                  key={eventColor}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === eventColor ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: eventColor }}
                  onClick={() => setColor(eventColor)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

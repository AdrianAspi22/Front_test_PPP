// models/calendar-event.interface.ts
export interface CalendarEvent {
    id?: string;
    summary: string;
    description?: string;
    location?: string;
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
    allDay: boolean;
    attendees?: string[];
    meetLink?: string;
    eventType?: string;
    color?: string;
  }
  
  // models/event-type.interface.ts
  export interface EventType {
    id: string;
    name: string;
    color: string;
  }
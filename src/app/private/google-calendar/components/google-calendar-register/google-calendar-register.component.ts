import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-google-calendar-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './google-calendar-register.component.html',
  styleUrls: ['./google-calendar-register.component.scss']
})
export class GoogleCalendarRegisterComponent implements OnInit {
  userId: string = '';
  currentView: string = 'dayGridMonth';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    events: (fetchInfo, successCallback, failureCallback) => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        failureCallback(new Error('No se encontró userId'));
        return;
      }

      // Formatear fechas según la vista actual
      let startDate = fetchInfo.start;
      let endDate = fetchInfo.end;

      // Ajustar fechas según la vista
      switch (this.currentView) {
        case 'dayGridMonth':
          // Primer día del mes hasta último día del mes
          startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
          endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
          break;
        case 'timeGridWeek':
          // Inicio de la semana hasta fin de la semana
          const firstDay = startDate.getDate() - startDate.getDay();
          startDate = new Date(startDate.setDate(firstDay));
          endDate = new Date(startDate.setDate(firstDay + 6));
          break;
        case 'timeGridDay':
          // Inicio del día hasta fin del día
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          break;
      }

      this.googleCalendarService.getEvents(
        userId,
        startDate.toISOString(),
        endDate.toISOString()
      ).subscribe({
        next: (events) => {
          const formattedEvents = events.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.startTime,
            end: event.endTime,
            allDay: !event.startTime || !event.endTime
          }));
          successCallback(formattedEvents);
        },
        error: (error) => {
          console.error('Error loading events:', error);
          failureCallback(error);
        }
      });
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    datesSet: (dateInfo) => {
      // Actualizar la vista actual cuando cambia
      this.currentView = dateInfo.view.type;
    }
  };

  constructor(
    private googleCalendarService: GoogleCalendarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userId = userId;
    } else {
      console.error('No se encontró userId en localStorage');
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Por favor ingrese un título para el evento:');
    if (title) {
      const eventData = {
        summary: title, // Cambiado de title a summary para coincidir con el formato de Google Calendar
        startTime: selectInfo.startStr,
        endTime: selectInfo.endStr,
        allDay: selectInfo.allDay,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Agregar zona horaria
      };

      this.googleCalendarService.createEvent(this.userId, eventData).subscribe({
        next: (response) => {
          const calendarApi = selectInfo.view.calendar;
          calendarApi.unselect();
          calendarApi.addEvent({
            id: response.id,
            title: response.summary,
            start: response.startTime,
            end: response.endTime,
            allDay: response.allDay
          });
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }

  handleEventDrop(dropInfo: EventDropArg) {
    const eventData = {
      id: dropInfo.event.id,
      start: dropInfo.event.startStr,
      end: dropInfo.event.endStr,
      title: dropInfo.event.title,
      allDay: dropInfo.event.allDay
    };

    this.googleCalendarService.updateEvent(this.userId, eventData).subscribe({
      error: (error) => {
        console.error('Error updating event:', error);
        dropInfo.revert();
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Estás seguro de que deseas eliminar el evento '${clickInfo.event.title}'?`)) {
      this.googleCalendarService.deleteEvent(this.userId, clickInfo.event.id).subscribe({
        next: () => {
          clickInfo.event.remove();
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  onCreate(type: string) {
    switch(type) {
      case 'event':
        this.openEventModal();
        break;
      case 'task':
        // Implementar lógica para tareas
        break;
      case 'appointment':
        // Implementar lógica para citas
        break;
    }
  }

  private openEventModal() {
    const dialogRef = this.dialog.open(EventModalComponent, {
      width: '500px',
      data: {
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600000),
        timeZone: 'America/Bogota'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Emitir evento al componente padre
        console.log('Nuevo evento:', result);
      }
    });
  }
} 
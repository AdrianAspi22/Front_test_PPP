import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DateSelectArg, EventClickArg, CalendarOptions, Calendar } from '@fullcalendar/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-google-calendar-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    EventModalComponent,
    EventDetailComponent
  ],
  templateUrl: './google-calendar-list.component.html',
  styleUrls: ['./google-calendar-list.component.scss']
})
export class GoogleCalendarListComponent implements OnInit {
  private calendarApi?: Calendar;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: true,
    select: (arg: DateSelectArg) => {
      this.handleDateSelect(arg);
    },
    eventClick: (info) => {
      this.handleEventClick(info);
    },
    events: (fetchInfo, successCallback, failureCallback) => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error('No se encontró userId en localStorage');
        this.snackBar.open('Error: No se encontró el ID de usuario', 'Cerrar', {
          duration: 3000
        });
        failureCallback(new Error('No se encontró userId'));
        return;
      }

      const startDate = fetchInfo.start.toISOString();
      const endDate = fetchInfo.end.toISOString();

      this.googleCalendarService.getEvents(userId, startDate, endDate).subscribe({
        next: (events) => {
          const calendarEvents = events.map(event => ({
            id: event.id,
            title: event.summary,
            start: event.startTime,
            end: event.endTime,
            description: event.description,
            location: event.location || '',
            timeZone: event.timeZone || 'America/Bogota'
          }));
          successCallback(calendarEvents);
        },
        error: (error) => {
          console.error('Error al cargar eventos:', error);
          this.snackBar.open('Error al cargar eventos', 'Cerrar', {
            duration: 3000
          });
          failureCallback(error);
        }
      });
    },
    // Configuraciones adicionales
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    timeZone: 'America/Bogota',
    locale: 'es', // Para mostrar el calendario en español
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventContent: (arg) => {
      const timeText = arg.event.allDay ? 
        'Todo el día' : 
        `${arg.event.start?.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
      
      return {
        html: `
          <div class="fc-event-main-content">
            <div class="fc-event-time">${timeText}</div>
            <div class="fc-event-title">${arg.event.title}</div>
          </div>
        `
      };
    }
  };

  constructor(
    private googleCalendarService: GoogleCalendarService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  handleCalendarReady(calendar: any) {
    this.calendarApi = calendar.getApi();
  }

  openCreateEventDialog() {
    const now = new Date();
    const end = new Date(now.getTime() + 60 * 60 * 1000);
    
    const dialogRef = this.dialog.open(EventModalComponent, {
      width: '500px',
      data: {
        startTime: now,
        endTime: end
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const actorId = localStorage.getItem('actorId');
        console.log('actorId obtenido:', actorId);
        
        if (!actorId) {
          this.snackBar.open('Error: No se encontró el ID de usuario', 'Cerrar', {
            duration: 3000
          });
          return;
        }

        const newEvent = {
          id: '', 
          summary: result.summary,
          description: result.description || '',
          startTime: result.startTime.toISOString(),
          endTime: result.endTime.toISOString(),
          location: result.location || '',
          timeZone: 'America/Bogota'
        };

        console.log('Datos a enviar:', newEvent);

        this.googleCalendarService.createEvent(actorId, newEvent).subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            if (this.calendarApi) {
              this.calendarApi.refetchEvents();
            }
            this.snackBar.open('Evento creado exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            console.error('Error completo:', error);
            this.snackBar.open('Error al crear el evento', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(EventModalComponent, {
      width: '500px',
      data: {
        startTime: selectInfo.start,
        endTime: selectInfo.end
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          this.snackBar.open('Error: No se encontró el ID de usuario', 'Cerrar', {
            duration: 3000
          });
          return;
        }

        const newEvent = {
          summary: result.summary,
          description: result.description,
          location: result.location || '',
          start: {
            dateTime: result.startTime.toISOString(),
            timeZone: 'America/Bogota'
          },
          end: {
            dateTime: result.endTime.toISOString(),
            timeZone: 'America/Bogota'
          },
          allDay: result.allDay
        };

        this.googleCalendarService.createEvent(userId, newEvent).subscribe({
          next: (response) => {
            if (this.calendarApi) {
              this.calendarApi.refetchEvents();
            }
            this.snackBar.open('Evento creado exitosamente', 'Cerrar', {
              duration: 3000
            });
          },
          error: (error) => {
            console.error('Error al crear el evento:', error);
            this.snackBar.open('Error al crear el evento', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  handleEventClick(info: any) {
    const event = info.event;
    
    const dialogRef = this.dialog.open(EventDetailComponent, {
      width: '500px',
      data: {
        title: event.title,
        start: event.start,
        end: event.end,
        location: event.extendedProps.location,
        description: event.extendedProps.description,
        timeZone: event.extendedProps.timeZone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Manejar el resultado si es necesario
        console.log('Dialog result:', result);
      }
      });
  }
} 
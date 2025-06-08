import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoogleCalendarListComponent } from './components/google-calendar-list/google-calendar-list.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GoogleCalendarListComponent
      }
    ]),
    GoogleCalendarListComponent,
    EventModalComponent
  ]
})
export class GoogleCalendarModule { } 
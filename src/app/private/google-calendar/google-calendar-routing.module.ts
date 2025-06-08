import { Routes } from '@angular/router';
import { GoogleCalendarListComponent } from './components/google-calendar-list/google-calendar-list.component';

export const GoogleCalendarRouting: Routes = [
  {
    path: '',
    component: GoogleCalendarListComponent
  }
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MonthGridComponent } from './calendar/month-grid/month-grid.component';

const routes: Routes = [
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "month-grid",
    component: MonthGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }

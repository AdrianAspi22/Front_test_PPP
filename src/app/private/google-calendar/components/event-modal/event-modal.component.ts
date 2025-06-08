import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent {
  isAllDay: boolean = false;
  startDate: Date;
  endDate: Date;

  eventData = {
    summary: '',
    description: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    timeZone: 'America/Bogota',
    allDay: false
  };

  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.startDate = new Date(data.startTime);
      this.endDate = new Date(data.endTime);
      this.eventData.startTime = this.startDate;
      this.eventData.endTime = this.endDate;
    }
  }

  onDateTimeChange(event: any, isStart: boolean) {
    if (isStart) {
      this.eventData.startTime = new Date(event);
    } else {
      this.eventData.endTime = new Date(event);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.eventData.summary) {
      this.snackBar.open('Por favor, ingrese un título para el evento', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    if (this.isAllDay) {
      this.eventData.startTime = new Date(this.startDate);
      this.eventData.startTime.setHours(0, 0, 0, 0);
      
      this.eventData.endTime = new Date(this.startDate);
      this.eventData.endTime.setHours(23, 59, 59, 999);
      this.eventData.allDay = true;
    }

    if (this.eventData.endTime < this.eventData.startTime) {
      this.snackBar.open('La fecha de fin debe ser posterior a la fecha de inicio', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.dialogRef.close(this.eventData);
  }
} 
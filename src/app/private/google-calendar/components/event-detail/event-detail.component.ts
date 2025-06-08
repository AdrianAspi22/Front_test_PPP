import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  userId = localStorage.getItem('actorId');

  constructor(
    public dialogRef: MatDialogRef<EventDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private googleCalendarService: GoogleCalendarService,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Registrar íconos personalizados si es necesario
    this.registerIcons();
  }

  private registerIcons() {
    // Aquí puedes registrar íconos personalizados si los necesitas
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onEdit(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(EventModalComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        event: this.data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.googleCalendarService.updateEvent(this.userId!, result).subscribe({
          next: (response) => {
            this.snackBar.open('Evento actualizado correctamente', 'Cerrar', {
              duration: 3000
            });
            window.location.reload(); // Recargar para ver los cambios
          },
          error: (error) => {
            this.snackBar.open('Error al actualizar el evento', 'Cerrar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  onDelete(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.googleCalendarService.deleteEvent(this.userId!, this.data.id).subscribe({
        next: () => {
          this.snackBar.open('Evento eliminado correctamente', 'Cerrar', {
            duration: 3000
          });
          this.dialogRef.close(true);
          window.location.reload(); // Recargar para ver los cambios
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar el evento', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }
} 
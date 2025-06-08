import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private apiUrl = `${env.api}v1/GoogleCalendar`;

  constructor(private http: HttpClient) {}

  authorizeCalendar(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/authorize?userId=${userId}`);
  }

  getEvents(userId: string, startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.apiUrl}/events`;
    const params = {
      startDate,
      endDate,
      userId
    };
    
    return this.http.get<any[]>(url, { params }).pipe(
      map(events => events.map(event => ({
        ...event,
        // Asegurarnos de que las propiedades coincidan
        startTime: event.startTime,
        endTime: event.endTime,
        summary: event.summary,
        description: event.description,
        location: event.location,
        timeZone: event.timeZone || 'America/Bogota'
      }))),
      catchError(error => {
        console.error('Error en getEvents:', error);
        return throwError(() => error);
      })
    );
  }

  createEvent(userId: string, event: any): Observable<any> {
    // La URL debe incluir el userId como parámetro en la ruta
    const url = `${this.apiUrl}/create?userId=${userId}`;
    
    console.log('URL:', url);
    console.log('Payload enviado:', event);

    return this.http.post<any>(url, event).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error del servidor:', error);
        return throwError(() => error);
      })
    );
  }

  updateEvent(userId: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, {
      userId: userId,
      ...event
    });
  }

  deleteEvent(userId: string, eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}/${eventId}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error completo del servidor:', error);
    
    if (error.error?.Messages?.length > 0) {
      return throwError(() => new Error(error.error.Messages[0]));
    }
    
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(error.error.message));
    }
    
    return throwError(() => new Error(`Error del servidor: ${error.status} - ${error.statusText}`));
  }
} 
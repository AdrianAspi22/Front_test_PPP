import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler   {

  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const alertService = this.injector.get(AlertService);
    
    if (error instanceof HttpErrorResponse) {
      
      if (error.status === 500) {
        alertService.error("ERROR SERVIDOR", "Ocurrió un problema inesperado en el servidor. Por favor, intenta nuevamente más tarde.");
      } else if (error.status === 401) {
        alertService.error("NO AUTORIZADO", "No estás autorizado para acceder a este recurso.");
      } else if (error.status === 403) {
        alertService.error("ACCESO DENEGADO", "No tienes permiso para acceder a este recurso.");
      } else {
        alertService.error("ERROR", "Ocurrió un error inesperado.");
      }
    } else {
      alertService.error("ERROR", "Ocurrió un error inesperado.");
    }

    // Log the error to the console (can be removed in production)
    if (!error.status || error.status !== 403) {
      console.error(error);
    }
  }
}

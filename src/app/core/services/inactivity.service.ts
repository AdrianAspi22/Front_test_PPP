import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private inactivityTimeout: any;
  private readonly inactivityDuration = 1800000; // 30 minutos en milisegundos
constructor(private _authService:AuthService){

}
  resetTimer(): void {
    clearTimeout(this.inactivityTimeout);
    this.startTimer();
  }

  private startTimer(): void {
    this.inactivityTimeout = setTimeout(() => {
      this._authService.logout();
    }, this.inactivityDuration);
  }
}

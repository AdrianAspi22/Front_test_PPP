import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InactivityService } from './core/services/inactivity.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _inactivityService:InactivityService){

  }

  @HostListener('window:mousemove')
  @HostListener('window:scroll')
  @HostListener('window:keydown')
  handleActivity(): void {
    this._inactivityService.resetTimer();
  }
}

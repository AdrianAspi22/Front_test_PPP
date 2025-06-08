import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { environment } from './environments/environment';

defineElement(lottie.loadAnimation);
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
.catch((err) => console.error(err)); 

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { InactivityService } from './core/services/inactivity.service';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from "@angular/common";

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './core/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
   
    InactivityService, 
    DatePipe,
  
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }, 
    provideAnimationsAsync(),


    importProvidersFrom(
      BrowserAnimationsModule,
      StoreModule.forRoot(rootReducer),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en', 
      }),
      NgPipesModule
    ),
  ]
};

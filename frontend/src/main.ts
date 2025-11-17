
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
     provideHttpClient() ,
    importProvidersFrom(RouterModule)  
  ]
})
  .catch(err => console.error(err));

// bootstrapApplication(AppComponent, appConfig)
//   .catch(err => console.error(err));
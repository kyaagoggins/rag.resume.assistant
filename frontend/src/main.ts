
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule)  
  ]
})
  .catch(err => console.error(err));

// bootstrapApplication(AppComponent, appConfig)
//   .catch(err => console.error(err));
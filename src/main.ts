import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

// ✅ ARRANQUE CORREGIDO: Ahora usa AppComponent que tiene el <router-outlet>
bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));
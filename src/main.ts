// src/main.ts (CÓDIGO CORREGIDO)

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PortadaComponent } from './app/portada/portada'; // 🔑 IMPORTACIÓN CORREGIDA

// 🔑 ARRANQUE CORREGIDO
bootstrapApplication(PortadaComponent, appConfig) 
  .catch((err) => console.error(err));
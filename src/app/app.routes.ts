// src/app/app.routes.ts

import { Routes } from '@angular/router';

// ✅ Portada - Esta línea es correcta para tu estructura (portada/portada.ts)
import { PortadaComponent } from './portada/portada'; 
 
// ❌ ¡Quitamos la importación del LoginComponent temporalmente!
// import { LoginComponent } from './auth/login/login'; 

export const routes: Routes = [
  { path: '', component: PortadaComponent, pathMatch: 'full' }, 
  
  // ❌ ¡Comentamos la ruta de Login hasta que el componente exista!
  // { path: 'login', component: LoginComponent }, 

  // ... resto de rutas
];
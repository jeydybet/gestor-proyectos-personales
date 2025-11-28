// src/app/app.routes.ts

import { Routes } from '@angular/router';

// ✅ Componentes Públicos
import { PortadaComponent } from './portada/portada'; 
import { LoginComponent } from './auth/login/login'; 
//import { RegisterComponent } from './auth/register/register'; 

// ❌ Se eliminan las líneas de importación de ProyectosComponent y authGuard

export const routes: Routes = [
  // 🥇 RUTA PRINCIPAL
  { path: '', component: PortadaComponent, pathMatch: 'full' }, 
  
  // 🔒 RUTAS DE AUTENTICACIÓN
  { path: 'login', component: LoginComponent }, 
  //{ path: 'register', component: RegisterComponent }, 

  // ❌ Se elimina la ruta de Proyectos: { path: 'projects', component: ProyectosComponent }

  // Ruta para manejar URLs no encontradas
  { path: '**', redirectTo: '' }
];
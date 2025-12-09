// src/app/app.routes.ts

import { Routes } from '@angular/router';

// ✅ Componentes Públicos
import { PortadaComponent } from './portada/portada'; // ✅
import { LoginComponent } from './auth/login/login'; // ✅
import { RegisterComponent } from './auth/register/register'; // ✅

// ✅ Componentes de Destino y Guard
import { DashboardComponent } from './dashboard/dashboard'; 
import { authGuard } from './guards/auth'; 

export const routes: Routes = [
  // 🥇 RUTA PRINCIPAL (DEBE CARGAR SIN PROBLEMAS)
  { path: '', component: PortadaComponent, pathMatch: 'full' }, 
  
  // 🔒 RUTAS DE AUTENTICACIÓN
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 

  // 🔑 RUTA DE DESTINO PROTEGIDA
  { 
      path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [authGuard] 
  }, 

  // Ruta comodín para manejar URLs no encontradas (redirect al inicio)
  { path: '**', redirectTo: '' }
];
// src/app/app.routes.ts (CÓDIGO FINAL CORREGIDO Y ROBUSTO)

import { Routes } from '@angular/router';

// ✅ Componentes Públicos
import { PortadaComponent } from './portada/portada'; 
import { LoginComponent } from './auth/login/login'; 
import { RegisterComponent } from './auth/register/register'; 

// ✅ Componentes de Destino y Guard
import { DashboardComponent } from './dashboard/dashboard'; 
import { authGuard } from './guards/auth'; 
// 🔑 IMPORTACIONES NECESARIAS
import { ProjectsComponent } from './projects/projects'; 
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview'; 

export const routes: Routes = [
    // 🥇 RUTAS PÚBLICAS
    { path: '', component: PortadaComponent, pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 

    // 🔑 LAYOUT PROTEGIDO (DASHBOARD CONTAINER)
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            // 🔑 1. RUTA POR DEFECTO: /dashboard (Carga el Resumen/Widgets)
            // ELIMINAR EL pathMatch: 'full' aquí a veces mejora la anidación
            { path: '', component: DashboardOverviewComponent }, 

            // 🔑 2. RUTA DE MIS PROYECTOS: /dashboard/projects
            { path: 'projects', component: ProjectsComponent },
        ]
    }, 

    // Ruta comodín 
    { path: '**', redirectTo: '' }
];
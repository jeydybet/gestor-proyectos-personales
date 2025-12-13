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

// 🟢 NUEVAS IMPORTACIONES
// NOTA: Si el archivo se llama 'tareas-resumen.component.ts', la importación debe ser './tareas-resumen/tareas-resumen.component'
// Mantendré la importación corta que usaste, asumiendo que ya funciona:
import { TareasResumenComponent } from './dashboard/tareas-resumen/tareas-resumen'; 

// ⚙️ IMPORTACIÓN DEL COMPONENTE DE CONFIGURACIÓN
import { SettingsComponent } from './dashboard/settings/settings'; // Usando el sufijo .component para evitar el error TS2305

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
            // 1. RUTA POR DEFECTO: /dashboard (Carga el Resumen/Widgets)
            { path: '', component: DashboardOverviewComponent }, 

            // 2. RUTA DE MIS PROYECTOS: /dashboard/projects
            { path: 'projects', component: ProjectsComponent },

            // 🟢 RUTA DE TAREAS UNIFICADA
            { path: 'resumen-tareas', component: TareasResumenComponent },
            
            // ⚙️ RUTA DE CONFIGURACIÓN (¡CORREGIDO!)
            { path: 'settings', component: SettingsComponent },
        ]
    }, 

    // Ruta comodín 
    { path: '**', redirectTo: '' }
];
import { Routes } from '@angular/router';

// ✅ Portada: Importación correcta para tu estructura (sin .component)
import { PortadaComponent } from './portada/portada'; 
 
// 💡 Comentado hasta que crees las carpetas 'auth/login'
// import { LoginComponent } from './auth/login/login'; 

export const routes: Routes = [
  // 🥇 RUTA PRINCIPAL 🥇: Carga PortadaComponent al inicio
  { path: '', component: PortadaComponent, pathMatch: 'full' }, 
  
  // 💡 Ruta de Login (comentada)
  // { path: 'login', component: LoginComponent }, 

  // Ruta para manejar URLs no encontradas
  { path: '**', redirectTo: '' } 
];
// src/app/sidebar/sidebar.ts (CÓDIGO CORREGIDO: Rutas a Dashboard absolutas)

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // 🔑 CORRECCIÓN: Las rutas internas del dashboard deben ser absolutas
  navItems = [
    { name: 'Dashboard', icon: 'rocket', route: '/dashboard' },
    // 🔑 CORREGIDO: La ruta debe ser /dashboard/projects
    { name: 'Mis Proyectos', icon: 'folder', route: '/dashboard/projects' }, 
    // Suponiendo que estas también son rutas hijas de /dashboard:
    { name: 'Tareas Hoy', icon: 'check', route: '/dashboard/today-tasks' }, 
    { name: 'Próximas Tareas', icon: 'calendar', route: '/dashboard/upcoming-tasks' },
    { name: 'Configuración', icon: 'settings', route: '/dashboard/settings' }
  ];

  // Permite cerrar sesión desde el sidebar (opcional)
  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión desde el sidebar:', error);
    }
  }
}
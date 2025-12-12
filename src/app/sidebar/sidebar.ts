// src/app/sidebar/sidebar.ts

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  // CRÍTICO: Importar módulos de ruteo
  imports: [RouterLink, CommonModule, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Define los ítems de navegación
  navItems = [
    { name: 'Dashboard', icon: 'rocket', route: '/dashboard' },
    { name: 'Mis Proyectos', icon: 'folder', route: '/projects' },
    { name: 'Tareas Hoy', icon: 'check', route: '/today-tasks' },
    { name: 'Próximas Tareas', icon: 'calendar', route: '/upcoming-tasks' },
    { name: 'Configuración', icon: 'settings', route: '/settings' }
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
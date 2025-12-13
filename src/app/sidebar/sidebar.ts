// src/app/sidebar/sidebar.component.ts

import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
// Eliminamos las importaciones de AuthService y Router ya que onLogout se eliminó


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive], 
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  
  navItems = [
    { name: 'Dashboard', icon: 'rocket', route: '/dashboard' },
    { name: 'Mis Proyectos', icon: 'folder', route: '/dashboard/projects' }, 
    
    // 🟢 AÑADIDO: Ruta unificada para ver el resumen de Tareas Hoy y Próximas Tareas
    { name: 'Mis Tareas', icon: 'check', route: '/dashboard/resumen-tareas' }, 
    
    { name: 'Configuración', icon: 'settings', route: '/dashboard/settings' }
  ];

  // ❌ ELIMINADO: El método onLogout ha sido quitado
}
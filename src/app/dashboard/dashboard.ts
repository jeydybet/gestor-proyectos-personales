// src/app/dashboard/dashboard.ts (Versión MINIMAL y COMPILABLE)

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs'; // Mantenemos Observable por si se usa en user$

// ❌ COMENTADO: import { ProyectosService } from '../services/proyectos'; 
// ❌ COMENTADO: import { Proyecto } from '../models/proyecto'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  // ❌ COMENTADO: private proyectosService = inject(ProyectosService); 
  
  // 🔑 REEMPLAZADO: Usamos un array simple en lugar del Observable de Proyectos para compilar
  public proyectos: any[] = []; 
  
  public user$ = this.authService.currentUser$; 

  onLogout() {
    this.authService.logout(); 
  }
  
  // ❌ COMENTADA: La función onDelete se elimina temporalmente para evitar el error TS2571
  /*
  async onDelete(id: string): Promise<void> {
      if (confirm('¿Estás seguro de eliminar este proyecto?')) {
          // Aquí irá el código del servicio de proyectos
      }
  }
  */
}
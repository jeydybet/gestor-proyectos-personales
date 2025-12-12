// src/app/dashboard/dashboard.ts (CÓDIGO COMPLETO Y CORREGIDO)

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth'; 
import { SidebarComponent } from '../sidebar/sidebar'; 
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // CRÍTICO: Importar SidebarComponent para que sea un elemento conocido
  imports: [SidebarComponent, CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
// La clase debe estar EXPORTADA y declarada SOLO UNA VEZ
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // 🔑 VARIABLES DINÁMICAS INICIALIZADAS A CERO
  tareasVencidas: number = 0;
  tareasHoy: number = 0;
  completadasSemana: number = 0;

  // Función para Cerrar Sesión
  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Futuro método para cargar datos:
  // ngOnInit() {
  //   this.cargarDatosDashboard();
  // }
}
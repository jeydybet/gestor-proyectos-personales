// src/app/dashboard-overview/dashboard-overview.ts (CÓDIGO COMPLETO)

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas en el HTML
import { DataService } from '../services/data'; // Importa el servicio de datos
import { of } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; // Necesario para el manejo de errores

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  // Asegúrate de que CommonModule esté aquí para que funcione el HTML de los widgets
  imports: [CommonModule], 
  templateUrl: './dashboard-overview.html', 
  styleUrl: './dashboard-overview.css' 
})
// 🔑 ¡VERIFICA QUE LA CLASE ESTÉ EXPORTADA CORRECTAMENTE! (Soluciona errores TS2305)
export class DashboardOverviewComponent implements OnInit { 
  private dataService = inject(DataService); 

  // 🔑 DECLARACIÓN DE PROPIEDADES (Soluciona los errores TS2339 en el HTML)
  tareasVencidas: number = 0;
  tareasHoy: number = 0;
  completadasSemana: number = 0;

  ngOnInit(): void {
    // Carga los datos de los widgets al iniciar el componente
    this.loadDashboardSummary();
  }

  // Lógica para cargar los valores iniciales de los widgets, movida desde dashboard.ts
  private loadDashboardSummary(): void {
    this.dataService.getDashboardSummary().pipe(
      // Manejo de errores básico para evitar que la aplicación se caiga si falla la llamada
      catchError(err => {
        console.error('Error al cargar el resumen del dashboard:', err);
        // Retorna un observable con valores por defecto
        return of({ vencidas: 0, hoy: 0, completadasSemana: 0 }); 
      })
    ).subscribe(summary => {
      if (summary) {
        // Asigna los valores del resumen a las propiedades de la clase
        this.tareasVencidas = summary.vencidas || 0;
        this.tareasHoy = summary.hoy || 0;
        this.completadasSemana = summary.completadasSemana || 0;
      }
    });
  }
}
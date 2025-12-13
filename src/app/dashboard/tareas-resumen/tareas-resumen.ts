// src/app/dashboard/tareas-resumen/tareas-resumen.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
// 🔑 NOTA: La ruta '../services/data' asume que 'services' está en src/app/. 
// Si da error, prueba con '../../services/data'.
import { DataService, Project } from '../../services/data'; 

@Component({
  selector: 'app-tareas-resumen',
  standalone: true, 
  imports: [CommonModule], 
  // 🔑 CORRECCIÓN: El archivo HTML se llama '.component.html', no solo '.html'
  templateUrl: './tareas-resumen.html', 
  styleUrl: './tareas-resumen.css'
})
export class TareasResumenComponent implements OnInit {
  private dataService = inject(DataService);

  // Definición de las interfaces para los observables
  tasksToday$!: Observable<Project[]>;
  upcomingTasks$!: Observable<Project[]>;

  ngOnInit(): void {
    // Llamada a los métodos del DataService
    this.tasksToday$ = this.dataService.getTasksToday();
    this.upcomingTasks$ = this.dataService.getUpcomingTasks();
  }
} // ⬅️ ¡CRÍTICO! Esta llave de cierre finaliza la clase y quita el error TS1005.

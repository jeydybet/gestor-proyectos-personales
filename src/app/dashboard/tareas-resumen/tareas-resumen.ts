// src/app/dashboard/tareas-resumen/tareas-resumen.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DataService, Project } from '../../services/data';

@Component({
  selector: 'app-tareas-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas-resumen.html',
  styleUrls: ['./tareas-resumen.css']
})
export class TareasResumenComponent implements OnInit {
  // Observables para las listas de tareas
  tasksToday$!: Observable<Project[]>;
  upcomingTasks$!: Observable<Project[]>;
  
  // Control de pestañas
  activeTab: 'today' | 'upcoming' = 'today';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Obtener las tareas desde el DataService
    this.tasksToday$ = this.dataService.getTasksToday();
    this.upcomingTasks$ = this.dataService.getUpcomingTasks();
  }

  /**
   * Cambia la pestaña activa
   */
  setActiveTab(tab: 'today' | 'upcoming'): void {
    this.activeTab = tab;
  }

  /**
   * Convierte una cadena de fecha a objeto Date
   */
  toDate(dateString: string | undefined): Date {
    if (!dateString) return new Date();
    return new Date(dateString);
  }

  /**
   * TrackBy para optimizar el rendimiento de ngFor
   */
  trackByProjectId(index: number, project: Project): string {
    return project.id || index.toString();
  }

  /**
   * Obtiene la clase CSS según el estado
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'status-pending';
      case 'En Progreso':
        return 'status-progress';
      case 'Completado':
        return 'status-completed';
      default:
        return '';
    }
  }
}
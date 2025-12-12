// src/app/projects/projects.ts (CÓDIGO COMPLETO Y CORREGIDO PARA USAR NuevoProyectoComponent)

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { take } from 'rxjs'; // Necesario para completar el observable de DataService

// 🔑 IMPORTACIÓN CRÍTICA: EL COMPONENTE HIJO
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto'; 

// 🔑 Importación del servicio de datos
import { DataService } from '../services/data'; 

@Component({
  selector: 'app-projects',
  standalone: true, 
  // 🔑 CRÍTICO: Añadir NuevoProyectoComponent a los imports
  imports: [CommonModule, NuevoProyectoComponent], 
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit { 
  private dataService = inject(DataService);
  private router = inject(Router);

  projects: any[] = [];
  totalProjects: number = 0;
  isLoading: boolean = true;
  
  // 🔑 VARIABLE CRÍTICA: Controla la visibilidad del formulario de creación
  isCreating: boolean = false; 

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    // Usamos take(1) para que el observable se complete después de la primera emisión
    this.dataService.getProjects().pipe(take(1)).subscribe({
      next: (data) => {
        this.projects = data;
        this.totalProjects = data.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.isLoading = false;
      }
    });
  }

  // 🔑 FUNCIÓN 1: Controla el botón "Nuevo Proyecto"
  toggleCreationMode() {
    this.isCreating = !this.isCreating;
  }

  // 🔑 FUNCIÓN 2: Maneja la respuesta del componente hijo (NuevoProyectoComponent)
  handleCreationResult(success: boolean): void {
    // 1. Cerramos el formulario de creación
    this.isCreating = false;
    
    // 2. Si el hijo indica éxito, recargamos la lista
    if (success) {
      this.loadProjects();
    }
  }

  goToProjectDetails(projectId: string) {
    this.router.navigate(['/dashboard/projects', projectId]);
  }
}
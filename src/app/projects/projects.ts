// src/app/projects/projects.ts 

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto'; 
import { DataService, Project } from '../services/data'; // 🔑 Importamos la interfaz Project

@Component({
    selector: 'app-projects',
    standalone: true, 
    imports: [CommonModule, NuevoProyectoComponent], 
    templateUrl: './projects.html',
    styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit { 
    private dataService = inject(DataService);
    private router = inject(Router);

    projects: Project[] = []; // Usamos la interfaz tipada
    totalProjects: number = 0;
    isLoading: boolean = true;
    isCreating: boolean = false; 

    ngOnInit(): void {
        this.loadProjects();
    }

    /**
     * Carga los proyectos desde el servicio (que ahora filtra por UID).
     */
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

    /**
     * Alterna la visibilidad del formulario de creación.
     */
    toggleCreationMode() {
        this.isCreating = !this.isCreating;
    }

    /**
     * Maneja la respuesta del componente hijo (NuevoProyectoComponent).
     */
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
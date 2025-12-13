import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Project } from '../services/data';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto'; // ← Ajusta esta ruta

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NuevoProyectoComponent],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(DataService);

  projects: Project[] = [];
  isCreating = false;
  isLoading = false;
  errorMessage = '';

  get totalProjects(): number {
    return this.projects.length;
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.dataService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
        console.log('Proyectos cargados:', projects.length);
      },
      error: (error) => {
        console.error('Error cargando proyectos:', error);
        this.errorMessage = 'Error al cargar proyectos';
        this.isLoading = false;
      }
    });
  }

  toggleCreationMode() {
    this.isCreating = !this.isCreating;
  }

  handleCreationResult(event: { success: boolean }) {
    if (event.success) {
      this.isCreating = false;
      this.loadProjects();
    }
  }
}
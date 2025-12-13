import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Project } from '../services/data';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto';

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
  isEditing = false;
  editingProject: Project | null = null;
  isLoading = false;
  errorMessage = '';
  projectToDelete: Project | null = null;
  showDeleteConfirm = false;

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
    if (this.isCreating) {
      this.isEditing = false;
      this.editingProject = null;
    }
  }

  handleCreationResult(event: { success: boolean }) {
    if (event.success) {
      this.isCreating = false;
      this.isEditing = false;
      this.editingProject = null;
      this.loadProjects();
    }
  }

  // ← NUEVO: Editar proyecto
  editProject(project: Project) {
    this.editingProject = project;
    this.isEditing = true;
    this.isCreating = false;
  }

  // ← NUEVO: Confirmar eliminación
  confirmDelete(project: Project) {
    this.projectToDelete = project;
    this.showDeleteConfirm = true;
  }

  // ← NUEVO: Cancelar eliminación
  cancelDelete() {
    this.projectToDelete = null;
    this.showDeleteConfirm = false;
  }

  // ← NUEVO: Eliminar proyecto
  async deleteProject() {
    if (!this.projectToDelete?.id) return;

    try {
      await this.dataService.deleteProject(this.projectToDelete.id);
      this.showDeleteConfirm = false;
      this.projectToDelete = null;
      this.loadProjects();
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      this.errorMessage = 'Error al eliminar el proyecto';
    }
  }
}
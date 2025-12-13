import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Project } from '../services/data';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto';
import { ActivatedRoute } from '@angular/router'; // Importar para la funcionalidad de búsqueda
import { switchMap } from 'rxjs'; // Importar para manejar la carga de datos

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NuevoProyectoComponent],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute); // Inyectar ActivatedRoute

  projects: Project[] = [];
  isCreating = false;
  isEditing = false;
  editingProject: Project | null = null;
  isLoading = false;
  errorMessage = '';
  projectToDelete: Project | null = null;
  showDeleteConfirm = false;
  searchTerm: string | null = null; // Propiedad para guardar el término de búsqueda

  get totalProjects(): number {
    return this.projects.length;
  }

  ngOnInit() {
    this.loadProjectsBasedOnRoute(); // Usar el método que maneja búsqueda o lista completa
  }

  loadProjectsBasedOnRoute() {
    this.isLoading = true;
    
    // Observamos los cambios en los queryParams (parámetros de la URL)
    this.route.queryParams.pipe(
        switchMap(params => {
            this.searchTerm = params['q'] || null; // Leer el parámetro 'q'
            
            if (this.searchTerm) {
                // Si hay término de búsqueda, usamos searchData
                return this.dataService.searchData(this.searchTerm);
            } else {
                // Si no hay término, cargamos todos los proyectos
                return this.dataService.getProjects();
            }
        })
    ).subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        this.errorMessage = 'Error al cargar los datos';
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
      this.loadProjectsBasedOnRoute(); // Recargar datos
    }
  }
  
  // 🟢 MÉTODO QUE FALTABA #1: Editar proyecto
  editProject(project: Project) {
    this.editingProject = project;
    this.isEditing = true;
    this.isCreating = false;
  }

  // 🟢 MÉTODO QUE FALTABA #2: Confirmar eliminación
  confirmDelete(project: Project) {
    this.projectToDelete = project;
    this.showDeleteConfirm = true;
  }

  // 🟢 MÉTODO QUE FALTABA #3: Cancelar eliminación
  cancelDelete() {
    this.projectToDelete = null;
    this.showDeleteConfirm = false;
  }

  // 🟢 MÉTODO QUE FALTABA #4: Eliminar proyecto
  async deleteProject() {
    if (!this.projectToDelete?.id) return;

    try {
      await this.dataService.deleteProject(this.projectToDelete.id);
      this.showDeleteConfirm = false;
      this.projectToDelete = null;
      this.loadProjectsBasedOnRoute(); // Recargar datos
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      this.errorMessage = 'Error al eliminar el proyecto';
    }
  }
}
import { Component, EventEmitter, Output, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, Project } from '../services/data';

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-proyecto.html',
  styleUrls: ['./nuevo-proyecto.css']
})
export class NuevoProyectoComponent implements OnInit {
  @Input() projectToEdit: Project | null = null; // ← NUEVO
  @Output() creationCompleted = new EventEmitter<{ success: boolean }>();

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  projectForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  get isEditMode(): boolean {
    return this.projectToEdit !== null;
  }

  constructor() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pendiente', Validators.required],
      dueDate: ['']
    });
  }

  ngOnInit() {
    // ← NUEVO: Si estamos editando, cargar los datos
    if (this.projectToEdit) {
      this.projectForm.patchValue({
        title: this.projectToEdit.name,
        description: this.projectToEdit.description,
        status: this.projectToEdit.status,
        dueDate: this.projectToEdit.dueDate || ''
      });
    }
  }

  async onSubmit() {
    if (this.projectForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      try {
        const projectData = {
          name: this.projectForm.value.title,
          description: this.projectForm.value.description,
          status: this.projectForm.value.status,
          dueDate: this.projectForm.value.dueDate
        };

        // ← NUEVO: Diferenciar entre crear y actualizar
        if (this.isEditMode && this.projectToEdit?.id) {
          await this.dataService.updateProject(this.projectToEdit.id, projectData);
        } else {
          await this.dataService.createProject(projectData);
        }

        this.projectForm.reset({ status: 'Pendiente' });
        this.creationCompleted.emit({ success: true });
      } catch (error: any) {
        console.error('Error:', error);
        this.errorMessage = error.message || `Error al ${this.isEditMode ? 'actualizar' : 'guardar'} el proyecto`;
        this.creationCompleted.emit({ success: false });
      } finally {
        this.isLoading = false;
      }
    }
  }

  onCancel() {
    this.projectForm.reset({ status: 'Pendiente' });
    this.creationCompleted.emit({ success: false });
  }
}
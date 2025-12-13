import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../services/data';

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-proyecto.html',
  styleUrls: ['./nuevo-proyecto.css']
})
export class NuevoProyectoComponent {
  @Output() creationCompleted = new EventEmitter<{ success: boolean }>();

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  projectForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pendiente', Validators.required],
      dueDate: ['']
    });
  }

  async onSubmit() {
    if (this.projectForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      try {
        await this.dataService.createProject(this.projectForm.value);
        this.projectForm.reset({ status: 'Pendiente' });
        this.creationCompleted.emit({ success: true });
      } catch (error: any) {
        console.error('Error:', error);
        this.errorMessage = error.message || 'Error al guardar el proyecto';
        this.creationCompleted.emit({ success: false });
      } finally {
        this.isLoading = false;
      }
    }
  }

  // ← AGREGAR ESTE MÉTODO
  onCancel() {
    this.projectForm.reset({ status: 'Pendiente' });
    this.creationCompleted.emit({ success: false });
  }
}
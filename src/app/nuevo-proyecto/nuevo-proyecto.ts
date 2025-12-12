// src/app/nuevo-proyecto/nuevo-proyecto.ts (VERSIÓN FINAL CON @OUTPUT)

import { inject, Component, EventEmitter, Output } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// ❌ IMPORTACIÓN CLAVE: NO DEBE ESTAR EL ROUTER
// import { Router, RouterModule } from '@angular/router'; 

import { DataService } from '../services/data'; 

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ❌ Sin RouterModule
  templateUrl: './nuevo-proyecto.html',
  styleUrl: './nuevo-proyecto.css',
})
export class NuevoProyectoComponent { 
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);
  // ❌ NO DEBE HABER ESTA LÍNEA: private router = inject(Router);

  isLoading: boolean = false;
  error: string | null = null;
  
  // ✅ CLAVE: Definición del Evento como BOOLEAN
  @Output() creationCompleted = new EventEmitter<boolean>(); 
  
  projectForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    status: ['Pendiente', [Validators.required]],
    dueDate: [null],
  });

  async onSubmit() {
    this.error = null;
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      this.error = 'Por favor, rellena todos los campos requeridos.';
      return;
    }

    this.isLoading = true;
    
    const formData = this.projectForm.value;

    const newProjectData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : null,
    } as any; 

    try {
      await this.dataService.createProject(newProjectData); 
      
      this.projectForm.reset({ status: 'Pendiente' });
      // ✅ EMITIR ÉXITO
      this.creationCompleted.emit(true); 

    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      this.error = 'Ocurrió un error al intentar crear el proyecto.';
      // ✅ EMITIR FALLO
      this.creationCompleted.emit(false);
      
    } finally {
      this.isLoading = false;
    }
  }

  onCancel() {
    // ✅ EMITIR CANCELACIÓN
    this.creationCompleted.emit(false); 
  }
}
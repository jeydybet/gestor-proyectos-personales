// src/app/nuevo-proyecto/nuevo-proyecto.ts (CÓDIGO CORREGIDO)

import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data'; 

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './nuevo-proyecto.html',
  styleUrl: './nuevo-proyecto.css',
})
export class NuevoProyectoComponent { 
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);

  isLoading: boolean = false;
  @Output() creationCompleted = new EventEmitter<boolean>(); 
  
  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
  });

  async onSubmit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const newProjectData = {
      ...this.projectForm.value,
      progress: 0, 
      taskCount: 0, 
      createdAt: new Date(),
    };

    try {
      this.isLoading = true;
      
      // ✅ LÍNEA CORRECTA: Llama al servicio de datos una sola vez
      await this.dataService.createProject(newProjectData); 
      
      // ✅ Notifica al padre que fue exitoso (true)
      this.creationCompleted.emit(true); 

    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onCancel() {
    this.creationCompleted.emit(false); 
  }
}
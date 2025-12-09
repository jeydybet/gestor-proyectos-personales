// src/app/auth/register/register.ts (CON VISIBILIDAD DE CONTRASEÑA)

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth'; 

// 🔑 Validador: Asegura que la Contraseña y Confirmar Contraseña coincidan
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }
  
  return password.value === confirmPassword.value ? null : { 'mismatch': true };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule], 
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router); 
  
  error: string | null = null; 
  successMessage: string | null = null; 

  // 🔑 NUEVO: Variables para controlar la visibilidad de las contraseñas
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false; 

  // 🔑 NUEVO: Función para alternar la visibilidad de la primera contraseña
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
  // 🔑 NUEVO: Función para alternar la visibilidad de la confirmación de contraseña
  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator }); 

  async onSubmit() {
    this.error = null;
    this.successMessage = null; 

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.registerForm.value;

    try {
      await this.authService.register(email, password);
      
      this.successMessage = '✅ ¡Registro completado! Redirigiendo al Dashboard...'; 
      
      // Espera 1.5 segundos antes de redirigir
      setTimeout(() => {
        this.router.navigate(['/dashboard']); 
      }, 1500); 
      
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        this.error = 'Este correo ya está registrado. Intenta iniciar sesión.';
      } else {
        this.error = 'Error de registro. La contraseña es muy débil o hay un problema con Firebase.'; 
      }
      console.error(err);
    }
  }
}
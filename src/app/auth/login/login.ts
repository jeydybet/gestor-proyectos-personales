// src/app/auth/login/login.ts (CÓDIGO COMPLETO Y CORREGIDO FINAL)

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// 🔑 CORRECCIÓN DE RUTA: Asumo 3 niveles de profundidad (auth/login a app/services)
import { AuthService } from '../../services/auth'; 

/**
 * 🔑 VALIDADOR PERSONALIZADO: Asegura que el campo 'passwordConfirm'
 * coincida con el campo 'password'. Se aplica a nivel de FormGroup.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    // Debe existir ambos campos
    if (!password || !passwordConfirm) {
        return null;
    }
    
    // Si la confirmación tiene un valor y no coincide con la contraseña
    if (password.value !== passwordConfirm.value && passwordConfirm.value !== '') {
        return { passwordsDoNotMatch: true };
    }
    
    return null;
};


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, CommonModule], 
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent { 
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string | null = null; 
    passwordVisible: boolean = false; 
    // 🔑 NECESARIA: Variable para la visibilidad del campo de Confirmación
    passwordConfirmVisible: boolean = false; 

    // 🔑 CRÍTICO: Incluir passwordConfirm y aplicar el validador personalizado a nivel de FormGroup
    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: [''] // Valor inicial vacío
    }, {
        validators: [passwordMatchValidator] // Aplicar el validador de coincidencia
    });

    toggleMode(): void {
        this.isLoginMode = !this.isLoginMode;
        this.error = null;
        
        if (this.isLoginMode) {
            // Modo Login: El campo de confirmación no es necesario
            this.loginForm.get('passwordConfirm')?.clearValidators();
        } else {
            // Modo Registro: El campo de confirmación es requerido
            this.loginForm.get('passwordConfirm')?.setValidators([Validators.required]);
        }
        
        // 🔑 CORRECCIÓN CRÍTICA: Forzar la revalidación
        this.loginForm.get('passwordConfirm')?.updateValueAndValidity();
        
        // 🔑 CORRECCIÓN CRÍTICA: Forzar la revalidación del FormGroup completo.
        // Esto es lo que desbloquea el botón en modo LOGIN si los campos son válidos.
        this.loginForm.updateValueAndValidity(); 
        
        this.loginForm.reset();
    }

    togglePasswordVisibility(): void {
        this.passwordVisible = !this.passwordVisible;
    }
    
    togglePasswordConfirmVisibility(): void {
        this.passwordConfirmVisible = !this.passwordConfirmVisible;
    }

    async onSubmit() {
        this.error = null;
        
        // 🔑 CORRECCIÓN DE VALIDACIÓN FINAL: Sólo necesitamos verificar si el formulario es inválido.
        // Si el formulario es inválido, automáticamente incluye contraseñas no coincidentes
        // ya que el validador de grupo lo marcó como tal.
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        
        const { email, password } = this.loginForm.value;
        this.isLoading = true;

        try {
            if (this.isLoginMode) {
                // ✅ Login
                await this.authService.login(email, password);
            } else {
                // ✅ Registro
                await this.authService.register(email, password);
            }
            
            this.router.navigate(['/dashboard/projects']);
            
        } catch (err: any) { 
            this.error = this.getErrorMessage(err.code);
            console.error(err);
        } finally {
            this.isLoading = false;
        }
    }

    private getErrorMessage(errorCode: string): string {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'El formato del correo electrónico no es válido.';
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return 'Correo o contraseña incorrectos. Verifica tus credenciales.';
            case 'auth/email-already-in-use':
                return 'Esta dirección de correo ya está registrada.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            default:
                return 'Ocurrió un error inesperado al autenticar.';
        }
    }
}
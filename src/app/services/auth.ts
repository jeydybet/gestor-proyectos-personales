// src/app/services/auth.ts (CÓDIGO COMPLETO FINAL Y ROBUSTO)

import { Injectable } from '@angular/core'; // Ya no necesitamos 'inject'
import { 
    Auth, 
    user, 
    User, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from '@angular/fire/auth';
import { Observable, lastValueFrom } from 'rxjs'; 
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router'; // Importado para ser inyectado

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    // 1. Propiedades inyectadas
    public user$: Observable<User | null>;

    // 🔑 CLAVE: Inyección Clásica en el constructor
    constructor(
        private auth: Auth, 
        private router: Router // Si usas el router para redirigir después del logout
    ) {
        // Inicialización del observable DENTRO del constructor
        this.user$ = user(this.auth).pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );
    }

    // =========================================================
    // MÉTODOS DE AUTENTICACIÓN
    // =========================================================

    async login(email: string, password: string): Promise<User> {
        try {
            const result = await signInWithEmailAndPassword(this.auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    }

    async register(email: string, password: string): Promise<User> {
        try {
            const result = await createUserWithEmailAndPassword(this.auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.router.navigate(['/auth/login']); // Redirigir al login
    }

    // =========================================================
    // MÉTODOS DE OBTENCIÓN DE ESTADO (CRÍTICO)
    // =========================================================

    /**
     * Devuelve el objeto de usuario completo (User) de forma asíncrona.
     */
    async getCurrentUser(): Promise<User | null> {
        // lastValueFrom es la mejor opción aquí
        return lastValueFrom(this.user$); 
    }

    /**
     * Devuelve solo el UID de forma síncrona (si está disponible).
     */
    getCurrentUserId(): string | null {
        // Esta propiedad es segura porque Angular/Firebase la mantiene actualizada
        return this.auth.currentUser ? this.auth.currentUser.uid : null;
    }
}
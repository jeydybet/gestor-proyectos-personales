// src/app/guards/auth.ts (SOLUCIÓN ASÍNCRONA FINAL)

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth'; 
import { map, take } from 'rxjs'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // El Guard debe ser asíncrono y esperar el valor del Observable
  return authService.currentUser$.pipe(
    // Tomamos solo el primer valor que emite el Observable y luego nos desuscribimos
    take(1), 
    // Mapeamos ese valor (el objeto User o null) a una decisión booleana o de redirección
    map(user => {
      // Si 'user' es un objeto (el usuario está logueado), permite el acceso (true)
      if (user) {
        return true;
      }
      
      // Si 'user' es null (no logueado), redirige a la página de login
      return router.createUrlTree(['/login']);
    })
  );
};
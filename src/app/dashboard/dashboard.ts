// src/app/dashboard/dashboard.ts (CÓDIGO FINAL LIMPIO PARA EL LAYOUT CONTENEDOR)

import { Component, inject, OnInit } from '@angular/core'; 
import { Router, RouterOutlet } from '@angular/router'; // Asegurarse que Router esté aquí
import { AuthService } from '../services/auth'; // Ruta corregida si es necesario
import { SidebarComponent } from '../sidebar/sidebar'; 
import { CommonModule } from '@angular/common'; 
import { DataService } from '../services/data'; // Ruta corregida si es necesario

// 🔑 IMPORTACIONES DE REACTIVIDAD Y ROUTER
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 🔑 ¡ASEGÚRATE DE INCLUIR ROUTEROUTLET!
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule, RouterOutlet], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit { 
  private authService = inject(AuthService);
  public router = inject(Router);
  private dataService = inject(DataService); 

  // 🔑 LÓGICA DEL BUSCADOR (ESTO SE MANTIENE)
  searchControl = new FormControl(''); 
  searchResults: any[] = []; 


  ngOnInit(): void {
    // 1. Configuración de la Búsqueda en Tiempo Real
    this.setupSearch(); 
  }

  // Lógica para configurar el buscador con RxJS (Esto se mantiene)
  private setupSearch(): void {
     this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap(query => {
        if (!query || query.length < 2) { 
          this.searchResults = [];
          return of([]); 
        }
        return this.dataService.searchData(query as string);
      })
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  // 🟢 FUNCIÓN DE NAVEGACIÓN AÑADIDA (Se conecta al botón/Enter en el HTML)
  onSearchSubmit(): void {
    const query = this.searchControl.value;
    
    if (query && query.trim()) {
        // 🔑 NAVEGA: Redirige al componente Projects con el query parameter 'q'
        this.router.navigate(['/dashboard/projects'], {
            queryParams: { q: query.trim() }
        });
    } else {
        // Si está vacío, solo navega a la lista de proyectos (sin filtro)
        this.router.navigate(['/dashboard/projects']);
    }
  }


  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
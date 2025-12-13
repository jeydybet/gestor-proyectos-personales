// src/app/dashboard/dashboard.ts (CÓDIGO FINAL LIMPIO PARA EL LAYOUT CONTENEDOR)

import { Component, inject, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/auth'; 
import { SidebarComponent } from '../sidebar/sidebar'; 
import { CommonModule } from '@angular/common'; 
import { DataService } from '../services/data'; 

// 🔑 IMPORTACIONES DE REACTIVIDAD Y ROUTER
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs'; 
import { RouterOutlet } from '@angular/router'; // 🔑 ¡Añadir esta importación es CRÍTICO!


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
  private router = inject(Router);
  private dataService = inject(DataService); 

  // 🔑 LÓGICA DEL BUSCADOR (ESTO SE MANTIENE)
  searchControl = new FormControl(''); 
  searchResults: any[] = []; 


  ngOnInit(): void {
    // 1. Configuración de la Búsqueda en Tiempo Real
    this.setupSearch(); 
    // 🛑 ELIMINADA: La llamada loadDashboardSummary() ha sido MOVIMIENTO
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

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
// src/app/services/data.ts (Versión FINAL y Segura con Filtro de Usuario)

import { inject, Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  query, 
  where, // 🔑 Necesario para filtrar
  getDocs,
  addDoc, // Necesario para crear
  orderBy,
  limit, 
} from '@angular/fire/firestore';
// 🔑 Importaciones de RxJS: from, of, map
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
// 🔑 IMPORTAR el servicio de autenticación
import { AuthService } from './auth'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);
  // 🔑 INYECTAR EL SERVICIO DE AUTENTICACIÓN
  private authService = inject(AuthService); 

  // 1. FUNCIÓN DE BÚSQUEDA (Mantener, pero debería filtrar por userId si es crítico)
  // Por simplicidad, mantendremos la búsqueda sin filtro de usuario por ahora.
  searchData(queryText: string): Observable<any[]> {
    const startText = queryText;
    const endText = queryText + '\uf8ff'; 

    const tasksCollection = collection(this.firestore, 'tasks');

    const taskQuery = query(
      tasksCollection,
      where('title', '>=', startText),
      where('title', '<=', endText),
      orderBy('title'),
      limit(5)
    );
    
    return from(getDocs(taskQuery)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Tarea' })))
    );
  }


  // 2. FUNCIÓN PARA EL RESUMEN DEL DASHBOARD (Mantener simulación o implementar lógica real)
  getDashboardSummary(): Observable<{ vencidas: number, hoy: number, completadasSemana: number }> {
    // Aquí es donde harías queries reales y complejas de Firestore
    return of({
      vencidas: 3, 
      hoy: 7,
      completadasSemana: 15
    });
  }

  // 3. 🔑 FUNCIÓN getProjects() MODIFICADA: Filtra por el ID del usuario logueado
  getProjects(): Observable<any[]> {
    // Obtener el ID del usuario actual
    const userId = this.authService.getCurrentUserId();
    
    // Si no hay usuario logueado, devuelve un Observable vacío inmediatamente
    if (!userId) {
        return of([]); 
    }

    const projectsCollection = collection(this.firestore, 'projects');
    
    // 🔑 CONSTRUIR LA QUERY: Filtrar solo por el 'userId'
    const projectQuery = query(
        projectsCollection,
        where('userId', '==', userId) // CRÍTICO: FILTRO DE SEGURIDAD
    );

    // Ejecutar la query y mapear los resultados (de Promise a Observable)
    return from(getDocs(projectQuery)).pipe(
        map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }
  
  // 4. 🔑 FUNCIÓN createProject() MODIFICADA: Añade el ID de Usuario
  async createProject(projectData: any): Promise<any> {
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
        throw new Error("No se puede crear un proyecto sin un usuario autenticado.");
    }
    
    // 🔑 Añadir el ID del usuario al objeto de datos
    const finalProjectData = {
        ...projectData,
        userId: userId // CRÍTICO: Guarda el ID del creador
    };

    const projectsCollection = collection(this.firestore, 'projects');
    const docRef = await addDoc(projectsCollection, finalProjectData);
    
    return { id: docRef.id, ...finalProjectData };
  }
}
// src/app/services/data.ts (CÓDIGO COMPLETO Y CORREGIDO)

import { inject, Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit, 
  // 🔑 IMPORTACIONES NECESARIAS PARA CREAR PROYECTO
  addDoc,
} from '@angular/fire/firestore';

// 🔑 Importaciones de RxJS
import { Observable, from, map, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Inyección del servicio de Firestore
  private firestore = inject(Firestore);

  // 1. FUNCIÓN DE BÚSQUEDA
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
    
    const tasks$ = from(getDocs(taskQuery)).pipe(
        map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'Tarea' })))
    );

    return tasks$; 
  }


  // 2. FUNCIÓN PARA EL RESUMEN DEL DASHBOARD
  getDashboardSummary(): Observable<{ vencidas: number, hoy: number, completadasSemana: number }> {
    return of({
      vencidas: 3, 
      hoy: 7,
      completadasSemana: 15
    });
  }

  // 3. FUNCIÓN PARA LA LISTA DE PROYECTOS (Simulación)
  getProjects(): Observable<any[]> {
    return of([
      { id: '1', name: 'Proyecto Landing Page', taskCount: 5, progress: 60, lastActivity: new Date() },
      { id: '2', name: 'Migración Backend', taskCount: 12, progress: 25, lastActivity: new Date() },
      { id: '3', name: 'Investigación Mercado Q4', taskCount: 0, progress: 100, lastActivity: new Date() },
    ]);
  }
  
  // 🔑 4. FUNCIÓN AÑADIDA: CREAR PROYECTO (Soluciona el error)
  // DEBE ser 'async' para que el 'await' en el componente funcione.
  async createProject(projectData: any): Promise<any> {
    const projectsCollection = collection(this.firestore, 'projects');
    
    // addDoc crea un nuevo documento con un ID generado automáticamente
    const docRef = await addDoc(projectsCollection, projectData);
    
    console.log("Nuevo proyecto creado con ID:", docRef.id);
    return { id: docRef.id, ...projectData };
  }
}
import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  CollectionReference,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, of, switchMap, filter, take, map } from 'rxjs';
import { AuthService } from './auth';

export interface Project {
  id?: string;
  name: string;
  title?: string; // ← Agregar esta línea para el error de template
  description: string;
  status: string;
  dueDate?: string;
  userId: string;
  createdAt: Date;
}

// ← ESTA INTERFAZ DEBE ESTAR EXPORTADA
export interface DashboardSummary {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  tareasVencidas: number;
  tareasHoy: number;
  completadasSemana: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private projectsCollection: CollectionReference;

  constructor() {
    this.projectsCollection = collection(this.firestore, 'projects');
  }

  getProjects(): Observable<Project[]> {
    return this.authService.user$.pipe(
      filter(user => user !== null),
      take(1),
      switchMap(user => {
        if (!user) {
          return of([]);
        }

        const q = query(
          this.projectsCollection,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
      })
    );
  }

  // ← AGREGAR ESTE MÉTODO
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.getProjects().pipe(
      map(projects => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const totalProjects = projects.length;
        const activeProjects = projects.filter(p => p.status === 'En Progreso').length;
        const completedProjects = projects.filter(p => p.status === 'Completado').length;
        const pendingProjects = projects.filter(p => p.status === 'Pendiente').length;
        
        // Calcular tareas vencidas
        const tareasVencidas = projects.filter(p => {
          if (!p.dueDate || p.status === 'Completado') return false;
          const dueDate = new Date(p.dueDate);
          return dueDate < today;
        }).length;

        // Calcular tareas para hoy
        const tareasHoy = projects.filter(p => {
          if (!p.dueDate || p.status === 'Completado') return false;
          const dueDate = new Date(p.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        }).length;

        // Calcular completadas en la semana
        const completadasSemana = projects.filter(p => {
          if (p.status !== 'Completado') return false;
          const createdDate = new Date(p.createdAt);
          return createdDate >= oneWeekAgo;
        }).length;

        return {
          totalProjects,
          activeProjects,
          completedProjects,
          pendingProjects,
          tareasVencidas,
          tareasHoy,
          completadasSemana
        };
      })
    );
  }

  // ← AGREGAR ESTE MÉTODO
  searchData(query: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => {
        const searchTerm = query.toLowerCase();
        return projects.filter(project => 
          project.name.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          (project.title && project.title.toLowerCase().includes(searchTerm))
        );
      })
    );
  }

  async createProject(projectData: Omit<Project, 'id' | 'userId' | 'createdAt'>): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const newProject = {
        ...projectData,
        userId: user.uid,
        createdAt: new Date()
      };

      console.log('Intentando crear proyecto:', newProject);
      
      await addDoc(this.projectsCollection, newProject);
      
      console.log('Proyecto creado exitosamente');
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  }
}
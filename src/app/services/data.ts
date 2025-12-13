import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  updateDoc,
  deleteDoc,
  doc,
  CollectionReference,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, of, switchMap, filter, map } from 'rxjs'; // ← AGREGAR map
import { AuthService } from './auth';

export interface Project {
  id?: string;
  name: string;
  title?: string;
  description: string;
  status: string;
  dueDate?: string;
  userId: string;
  createdAt: Date;
}

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
      switchMap(user => {
        if (!user) {
          console.log('❌ No hay usuario autenticado');
          return of([]);
        }

        console.log('✅ Cargando proyectos para usuario:', user.uid);

        const q = query(
          this.projectsCollection,
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
      })
    );
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.getProjects().pipe(
      map((projects: Project[]) => {
        console.log('📊 Calculando resumen con', projects.length, 'proyectos');
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const totalProjects = projects.length;
        const activeProjects = projects.filter((p: Project) => p.status === 'En Progreso').length;
        const completedProjects = projects.filter((p: Project) => p.status === 'Completado').length;
        const pendingProjects = projects.filter((p: Project) => p.status === 'Pendiente').length;
        
        const tareasVencidas = projects.filter((p: Project) => {
          if (!p.dueDate || p.status === 'Completado') return false;
          const dueDate = new Date(p.dueDate);
          return dueDate < today;
        }).length;

        const tareasHoy = projects.filter((p: Project) => {
          if (!p.dueDate || p.status === 'Completado') return false;
          const dueDate = new Date(p.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        }).length;

        const completadasSemana = projects.filter((p: Project) => {
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

  searchData(query: string): Observable<Project[]> {
    return this.getProjects().pipe(
      map((projects: Project[]) => {
        const searchTerm = query.toLowerCase();
        return projects.filter((project: Project) => 
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

      console.log('✅ Creando proyecto:', newProject);
      
      const docRef = await addDoc(this.projectsCollection, newProject);
      
      console.log('✅ Proyecto creado con ID:', docRef.id);
    } catch (error) {
      console.error('❌ Error al crear proyecto:', error);
      throw error;
    }
  }

  async updateProject(projectId: string, projectData: Partial<Project>): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const projectRef = doc(this.firestore, 'projects', projectId);
      
      const { id, userId, createdAt, ...updateData } = projectData as any;
      
      console.log('✅ Actualizando proyecto:', projectId, updateData);
      
      await updateDoc(projectRef, updateData);
      
      console.log('✅ Proyecto actualizado exitosamente');
    } catch (error) {
      console.error('❌ Error al actualizar proyecto:', error);
      throw error;
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      const user = await this.authService.getCurrentUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const projectRef = doc(this.firestore, 'projects', projectId);
      
      console.log('✅ Eliminando proyecto:', projectId);
      
      await deleteDoc(projectRef);
      
      console.log('✅ Proyecto eliminado exitosamente');
    } catch (error) {
      console.error('❌ Error al eliminar proyecto:', error);
      throw error;
    }
  }
  
  // 🟢 INSERCIÓN DE NUEVOS MÉTODOS DE FILTRADO (SOLUCIÓN DEL ERROR TS2339) 🟢

  /**
   * Filtra las tareas cuya fecha de vencimiento es HOY.
   */
  getTasksToday(): Observable<Project[]> {
    return this.getProjects().pipe( 
      map(projects => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        return projects.filter(project => {
          if (!project.dueDate || project.status === 'Completado') {
            return false;
          }
          const dueDate = new Date(project.dueDate);
          dueDate.setHours(0, 0, 0, 0); 

          // Compara si la fecha de vencimiento es igual a la fecha de hoy
          return dueDate.getTime() === today.getTime();
        });
      })
    );
  }

  /**
   * Filtra las tareas que vencen a partir de MAÑANA.
   */
  getUpcomingTasks(): Observable<Project[]> {
    return this.getProjects().pipe( 
      map(projects => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        tomorrow.setHours(0, 0, 1, 0); 

        return projects.filter(project => {
          if (!project.dueDate || project.status === 'Completado') {
            return false;
          }
          const dueDate = new Date(project.dueDate);

          // Filtra tareas cuya fecha de vencimiento es estrictamente mayor que mañana a medianoche
          return dueDate.getTime() >= tomorrow.getTime();
        });
      })
    );
  }


} // ⬅️ Llave de cierre final de la clase DataService
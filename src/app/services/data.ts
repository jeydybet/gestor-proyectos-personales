// src/app/services/data.ts (CÓDIGO COMPLETO Y CORREGIDO FINAL SEGURO)

import { inject, Injectable } from '@angular/core';
import { 
    Firestore, 
    collection, 
    query, 
    where, 
    addDoc,
    doc, 
    setDoc,
    deleteDoc,
    CollectionReference,
    collectionData 
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 
import { AuthService } from './auth'; 

// =========================================================
// DEFINICIÓN DE LA INTERFAZ
// =========================================================
export interface Project {
    id?: string; 
    userId: string; 
    title: string;
    description: string;
    status: 'Pendiente' | 'En Progreso' | 'Completado';
    dueDate?: Date | string; 
    createdAt: Date | string; 
}


@Injectable({
    providedIn: 'root'
})
export class DataService {
    // 1. Declaración de propiedades
    private firestore: Firestore;
    private authService: AuthService; 
    private projectsCollection: CollectionReference<Project>;

    // 2. Inicialización segura en el constructor
    constructor() {
        this.firestore = inject(Firestore);
        this.authService = inject(AuthService); 
        this.projectsCollection = collection(this.firestore, 'projects') as CollectionReference<Project>;
    }
    
    // =========================================================
    // 1. PROYECTOS: OPERACIONES CRUD
    // =========================================================

    /**
     * Obtiene solo los proyectos que pertenecen al usuario autenticado (Filtro por UID).
     */
    getProjects(): Observable<Project[]> {
        return this.authService.user$.pipe(
            switchMap(user => {
                const userId = user?.uid;
                
                if (userId) {
                    const q = query(
                        this.projectsCollection,
                        where('userId', '==', userId) 
                    );
                    
                    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
                } else {
                    return of([]); 
                }
            })
        );
    }
    
    /**
     * Crea un nuevo proyecto, adjuntando el UID y la fecha de creación.
     */
    async createProject(projectData: Omit<Project, 'id' | 'userId' | 'createdAt'>): Promise<any> {
        const user = await this.authService.getCurrentUser();
        
        if (!user) {
            throw new Error("No se puede crear un proyecto sin un usuario autenticado.");
        }
        
        const finalProjectData = {
            ...projectData,
            userId: user.uid, 
            createdAt: new Date()
        };

        const docRef = await addDoc(this.projectsCollection, finalProjectData);
        
        return { id: docRef.id, ...finalProjectData };
    }
    
    async updateProject(project: Project): Promise<void> {
        const user = await this.authService.getCurrentUser();
        if (!user || user.uid !== project.userId) {
            throw new Error("Acceso denegado: No puedes modificar proyectos de otros usuarios.");
        }

        // 🔑 NOTA: Aquí se usa 'this.firestore' para crear la referencia del documento, que ahora está inyectado
        const docRef = doc(this.firestore, 'projects', project.id!);
        return setDoc(docRef, project as Project);
    }
    
    async deleteProject(projectId: string, projectUserId: string): Promise<void> {
        const user = await this.authService.getCurrentUser();
        if (!user || user.uid !== projectUserId) {
            throw new Error("Acceso denegado: No puedes eliminar proyectos de otros usuarios.");
        }
        
        // 🔑 NOTA: Aquí se usa 'this.firestore' para crear la referencia del documento
        const docRef = doc(this.firestore, 'projects', projectId);
        return deleteDoc(docRef);
    }

    // =========================================================
    // 2. OTROS MÉTODOS SIMULADOS
    // =========================================================
    getDashboardSummary(): Observable<{ vencidas: number, hoy: number, completadasSemana: number }> {
        return of({ vencidas: 3, hoy: 7, completadasSemana: 15 });
    }
    
    searchData(queryText: string): Observable<any[]> {
        return of([]); 
    }
}
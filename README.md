# 🧑‍💻 Gestor de Proyectos Personales

## 📝 Descripción del Proyecto

Este proyecto es una **Aplicación de una Sola Página (SPA)** desarrollada con Angular, diseñada para gestionar, organizar y dar seguimiento a una lista de proyectos personales. Permite a los usuarios crear, leer, actualizar y eliminar (CRUD) proyectos, ofreciendo funcionalidades de autenticación y persistencia de datos en la nube.

## ✨ Características y Funcionalidades Principales

* [cite_start]**Autenticación Completa:** Registro, inicio de sesión (login) y cierre de sesión (logout) seguros implementados con Firebase Authentication
* [cite_start]**Gestión CRUD:** Operaciones CRUD completas sobre la entidad principal: **Proyectos**.
* [cite_start]**Control de Acceso:** Rutas protegidas mediante Angular Guards [cite: 32][cite_start], asegurando que solo los usuarios autenticados puedan acceder a la gestión de proyectos[cite: 12].
* [cite_start]**Búsqueda en Tiempo Real:** Filtro reactivo en la lista de proyectos para una búsqueda rápida
* [cite_start]**Formularios Reactivos:** Uso de formularios reactivos con validaciones para garantizar la integridad de los datos
* [cite_start]**Pipes Personalizados:** Uso de pipes nativos y uno personalizado para transformar datos en la vista
* [cite_start]**Gestión de Estados:** Implementación de un Observable/Subject en los servicios para manejar estados reactivos de la aplicación

## ⚙️ Tecnologías y Herramientas Utilizadas

| Categoría | Herramienta | Uso |
| :--- | :--- | :--- |
| **Framework Frontend** | Angular (Standalone Components) | [cite_start]Desarrollo de la interfaz de usuario
| **Base de Datos** | Firebase Firestore | [cite_start]Persistencia de datos en la nube para la entidad Proyectos
| **Autenticación** | Firebase Authentication | [cite_start]Manejo del registro e inicio de sesión de usuarios
| **Conexión DB** | AngularFire | [cite_start]Módulo oficial para integrar Angular con Firebase
| **Estilos** | CSS Puro / Bootstrap / (Indica el que usaste) | [cite_start]Diseño limpio y responsivo
| **Control de Versiones** | Git / GitHub | [cite_start]Gestión de código fuente y colaboración
| **Despliegue** | Firebase Hosting | [cite_start]Alojamiento de la aplicación web

## 🚀 Requisitos para Instalar y Ejecutar Localmente

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://www.youtube.com/watch?v=YwyJyXtq6U4](https://www.youtube.com/watch?v=YwyJyXtq6U4)
    cd gestor-proyectos-personales
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configuración de Firebase:**
    Asegúrate de que el archivo de entorno (`src/environments/environment.ts`) contenga la configuración de tu proyecto de Firebase (clave API, Project ID, etc.).

4.  **Ejecutar la Aplicación:**
    ```bash
    ng serve
    ```
    La aplicación estará disponible en `http://localhost:4200/`.

## 🏛️ Arquitectura del Proyecto (Componentes Principales y Servicios)

### Componentes de Página (Vistas)

* `LoginComponent`: Maneja la autenticación de usuarios.
* `RegisterComponent`: Permite la creación de nuevas cuentas.
* `DashboardComponent`: Vista principal accesible tras el login.
* `ProjectsListComponent`: Muestra la lista de proyectos y la barra de búsqueda/filtros.
* [cite_start]`ProjectDetailComponent` (o similar): Muestra la información individual de un proyecto[cite: 7].

### Servicios

* [cite_start]`AuthService`: Encargado de las operaciones con Firebase Authentication (registro, login, logout)[cite: 19].
* [cite_start]`ProjectsService`: Maneja las operaciones CRUD con Firestore para la entidad "Proyectos"[cite: 18].
* [cite_start]`GuardService` (o similar): Implementa la lógica para proteger las rutas de acceso restringido[cite: 32].

## 🔗 Enlaces Importantes

| Recurso | URL | Requisito de la Entrega |
| :--- | :--- | :--- |
| **Aplicación Publicada (Deploy)** | **`https://gestor-proyectos-personales.web.app`**
| **Manual de usuario en drive:**https://drive.google.com/drive/folders/1eIm96Bv--oSTNkybIZn-sZgI6uXc7R3I?usp=drive_link

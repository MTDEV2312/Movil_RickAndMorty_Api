# Movil_RickAndMorty_Api

Aplicación móvil desarrollada con Ionic y Angular para explorar personajes del universo de Rick and Morty. Permite visualizar, buscar y guardar personajes con comentarios utilizando Firebase como backend.

## Características Principales

*   **Listado de Personajes**: Visualiza una lista de personajes de la API de Rick and Morty con scroll infinito.
*   **Búsqueda de Personajes**: Busca personajes por nombre.
*   **Detalles del Personaje**: Muestra información detallada de cada personaje, incluyendo su estado, especie, origen, localización y episodios en los que aparece.
*   **Guardar Personajes y Comentarios**: Permite a los usuarios añadir comentarios a los personajes y guardarlos en una base de datos Firebase Firestore.
*   **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla.

## Tecnologías Utilizadas

*   [Ionic](https://ionicframework.com/)
*   [Angular](https://angular.io/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Capacitor](https://capacitorjs.com/)
*   [Firebase (Firestore)](https://firebase.google.com/docs/firestore) - para almacenamiento de datos (ver [`src/app/services/bdd.service.ts`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\services\bdd.service.ts)).
*   [Sass](https://sass-lang.com/) - para estilos globales y de componentes.
*   [API de Rick and Morty](https://rickandmortyapi.com/) - como fuente de datos de los personajes.

## Configuración del Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd Movil_RickAndMorty_Api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Firebase:**
    *   Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
    *   Obtén la configuración de tu proyecto Firebase (apiKey, authDomain, projectId, etc.).
    *   Actualiza el archivo [`src/environments/environment.ts`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\environments\environment.ts) y [`src/environments/environment.prod.ts`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\environments\environment.prod.ts) con tu configuración:
        ```typescript
        // filepath: src\environments\environment.ts
        export const environment = {
          production: false,
          firebaseConfig: {
            apiKey: "TU_API_KEY",
            authDomain: "TU_AUTH_DOMAIN",
            projectId: "TU_PROJECT_ID",
            storageBucket: "TU_STORAGE_BUCKET",
            messagingSenderId: "TU_MESSAGING_SENDER_ID",
            appId: "TU_APP_ID",
            measurementId: "TU_MEASUREMENT_ID" // Opcional
          }
        };
        ```

4.  **Ejecutar la aplicación en el navegador:**
    ```bash
    ionic serve
    ```

5.  **Construir la aplicación para producción:**
    ```bash
    ionic build --prod
    ```

6.  **Ejecutar en dispositivos (requiere configuración de Capacitor):**
    ```bash
    # Añadir plataforma (ios o android)
    npx cap add android
    npx cap add ios

    # Sincronizar proyecto
    npx cap sync

    # Abrir en el IDE nativo
    npx cap open android
    npx cap open ios
    ```

## Uso de la Aplicación

1.  **Pantalla de Inicio ([`src/app/home/home.page.html`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\home\home.page.html)):**
    *   Muestra una lista de personajes.
    *   Utiliza el scroll infinito para cargar más personajes.
    *   Contiene una barra de búsqueda para filtrar personajes por nombre.

2.  **Pantalla de Detalles del Personaje ([`src/app/characters-details/characters-details.page.html`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\characters-details\characters-details.page.html)):**
    *   Se accede al hacer clic en un personaje de la lista.
    *   Muestra información detallada del personaje.
    *   Permite añadir un comentario y guardarlo junto con los datos del personaje en Firebase mediante el servicio [`BDDService`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\services\bdd.service.ts).

## Capturas de Pantalla

### Página de Inicio
![Captura de pantalla 2025-05-24 144648](https://github.com/user-attachments/assets/0be9af3e-6da2-4ed7-ac7a-4ba134b8dc0c)

### Búsqueda de Personajes

![Captura de pantalla 2025-05-24 144725](https://github.com/user-attachments/assets/21a1744a-bab4-417f-af14-27d5c19fdf4b)


### Detalles del Personaje
<!-- Aquí puedes añadir una imagen de la página de detalles -->
![Captura de pantalla 2025-05-24 144748](https://github.com/user-attachments/assets/0761f07f-f990-417c-8907-1bdb96889a3e)


### Añadir Comentario
<!-- Aquí puedes añadir una imagen del proceso de añadir un comentario -->

![Captura de pantalla 2025-05-24 144758](https://github.com/user-attachments/assets/999c28e8-4f79-496d-bc63-4b1a7a8350ab)

## Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación Angular con Ionic:

*   `src/app/`: Contiene los componentes, páginas, servicios y rutas de la aplicación.
    *   `src/app/home/`: Lógica y vista de la página principal.
    *   `src/app/characters-details/`: Lógica y vista de la página de detalles del personaje.
    *   `src/app/services/`: Contiene servicios como [`api.service.ts`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\services\api.service.ts) (para consumir la API de Rick and Morty) y [`bdd.service.ts`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\app\services\bdd.service.ts) (para interactuar con Firebase).
*   `src/assets/`: Recursos estáticos como imágenes e iconos.
*   `src/environments/`: Archivos de configuración para diferentes entornos (desarrollo, producción).
*   `src/theme/`: Archivos de tematización, incluyendo [`variables.scss`](c:\Users\APP MOVILES\Documents\MT\rickAndMortyAPI\src\theme\variables.scss).
*   `capacitor.config.ts`: Configuración de Capacitor.
*   `angular.json`: Configuración del CLI de Angular.
*   `package.json`: Dependencias y scripts del proyecto.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios o nuevas características.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles (si existe).

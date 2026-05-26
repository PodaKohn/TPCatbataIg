# CatBata 🐱 — Clon de Instagram con React

Aplicación web inspirada en Instagram que muestra publicaciones de gatos obtenidas desde una API externa. Desarrollada con React, TypeScript y Vite.

**Diseño de Figma utilizado como referencia:**
https://www.figma.com/community/file/1235135369163092252/instagram-web-ui-recreated


# Instalar dependencias
npm install

# Como ejecutar el proyecto
npm run dev


La app queda disponible en `http://localhost:5173`.



# Organización del proyecto


src/
├── components/       # Componentes de UI
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Stories.tsx
│   ├── Feed.tsx
│   ├── PostCard.tsx
│   ├── PostModal.tsx
│   └── Profile.tsx
├── data/
│   └── user.ts       # Datos fijos del usuario emulado y datos auxiliares
├── types/
│   └── index.ts      # Interfaces TypeScript (Post, Comment, User, Story)
├── App.tsx           # Componente raíz: estado global y lógica de navegación
└── index.css         # Estilos globales con variables CSS


La separación en carpetas sigue el criterio de responsabilidad única: `components/` contiene piezas de UI, `data/` contiene datos estáticos y `types/` centraliza los tipos compartidos.



# Componentes y su responsabilidad

| Componente | Responsabilidad |
| `App` | Estado global (posts, post seleccionado, vista activa). Llama a la API. Orquesta la navegación. |
| `Sidebar` | Barra lateral fija con logo, mini-perfil del usuario y navegación principal. |
| `Header` | Barra superior con buscador y acciones rápidas. |
| `Stories` | Fila horizontal de historias con indicador de vistas. |
| `Feed` | Grilla de publicaciones. Muestra skeleton loader mientras carga. |
| `PostCard` | Tarjeta individual de una publicación con overlay de acciones al hacer hover. |
| `PostModal` | Panel lateral deslizante con detalle completo de la publicación seleccionada. |
| `Profile` | Vista de perfil del usuario con estadísticas y grilla de sus publicaciones. |

# Por qué esta componentización

Cada componente encapsula una sección visual claramente diferenciada. `PostCard` se reutiliza tanto en `Feed` como podría reutilizarse en otros contextos. `PostModal` está separado de `PostCard` porque tiene estado propio (comentarios, like independiente) y una lógica de presentación distinta. `Profile` es una vista completa que justifica su propio componente por la diferencia estructural respecto al feed.



# Comunicación mediante props

- `App` -> `Sidebar`: pasa `user`, `activeView` y `onNavigate` para controlar la navegación.
- `App` -> `Feed`: pasa `posts`, `loading` y `onSelect` para manejar la selección de posts.
- `App` -> `Profile`: pasa `user`, `posts` y `onSelect`.
- `App` -> `PostModal`: pasa `post` y `onClose`.
- `Feed` -> `PostCard`: pasa `post` y `onSelect` por cada elemento del array.
- `Stories` -> recibe el array `stories` y renderiza cada una.

El flujo de datos es unidireccional: el estado vive en `App` y baja por props. Las acciones del usuario suben mediante callbacks (`onSelect`, `onNavigate`, `onClose`).

 

# Hooks utilizados

# `useState`
- `posts`: almacena el array de publicaciones obtenidas de la API.
- `selectedPost`: guarda la publicación actualmente seleccionada (o `null`). Controla si el panel lateral está abierto.
- `loading`: indica si la petición a la API está en curso (muestra skeleton loader).
- `activeView`: controla qué vista se muestra (`'feed'` o `'profile'`).
- En `PostCard`: `liked` y `likeCount` para el toggle de like local.
- En `PostModal`: `liked`, `likeCount`, `newComment` y `comments` para las interacciones dentro del panel.

# `useEffect`
- Usado en `App` con array de dependencias vacío `[]` para ejecutar la petición a la API una sola vez al montar el componente.



# Consumo de API

Se utiliza **The Cat API** (`https://api.thecatapi.com/v1/images/search`) con Axios. Se solicitan 12 imágenes por llamada. A cada imagen se le asigna un nombre de usuario, caption, avatar generado con DiceBear, timestamp y comentarios simulados para construir el objeto `Post`.

axios.get('https://api.thecatapi.com/v1/images/search', {
  params: { limit: 12, has_breeds: 0 },
  headers: { 'x-api-key': API_KEY },
})




# Visualización individual de publicaciones

Al hacer clic en cualquier `PostCard` (tanto en el feed como en el perfil), se llama a `onSelect(post)` que actualiza `selectedPost` en `App`. Cuando `selectedPost` no es `null`, se renderiza el componente `PostModal`.

`PostModal` es un panel lateral que se desliza desde la derecha con animación CSS. Muestra:
- Imagen ampliada (con rotación de -3°)
- Avatar y nombre de usuario
- Timestamp
- Caption
- Botones de like (con toggle), comentarios y compartir
- Lista de comentarios
- Formulario para agregar un nuevo comentario

El estado de like y los comentarios dentro del modal son locales al componente (`useState`), lo que permite interactuar sin afectar el estado global.



# Perfil de usuario emulado

El perfil está definido de forma estática en `src/data/user.ts` como un objeto `currentUser` de tipo `User`. No hay sistema de login ni registro.

Datos mostrados en el perfil:
- Nombre de usuario (`username`)
- Nombre para mostrar (`displayName`)
- Foto de perfil generada con DiceBear (`avatar`)
- Biografía (`bio`)
- Cantidad de publicaciones, seguidores y seguidos
- Grilla de publicaciones (las mismas cargadas desde la API)
- Botón de "Editar perfil" (visual, sin funcionalidad)

El mismo objeto `currentUser` se pasa tanto a `Sidebar` (mini-perfil) como a `Profile` (vista completa), garantizando consistencia sin duplicar datos.


# Navegación entre feed y perfil

El estado `activeView` en `App` puede ser `'feed'` o `'profile'`. Se cambia mediante la función `setActiveView` que se pasa como prop `onNavigate` al `Sidebar`. Tanto el clic en el mini-perfil del sidebar como los ítems de navegación "Home" y "Mi perfil" actualizan este estado, re-renderizando el contenido principal sin recargar la página.

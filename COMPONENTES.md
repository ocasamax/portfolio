# Documentación de Componentes del Portfolio

## Arquitectura General

El proyecto sigue una arquitectura basada en **componentes React** con las siguientes características:

- **Framework**: React 18 con TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (basada en Radix UI + Tailwind CSS)
- **Routing**: React Router DOM v6
- **Data Management**: React Query (TanStack Query)
- **Icons**: Lucide React

---

## Estructura de Archivos

```
src/
├── components/
│   ├── ui/              # Componentes reutilizables de shadcn/ui
│   ├── Layout.tsx       # Contenedor principal con navegación
│   ├── Gallery.tsx      # Galería de imágenes con grid
│   ├── Lightbox.tsx    # Visor modal de imágenes
│   ├── AppSidebar.tsx  # Barra lateral de navegación
│   └── NavLink.tsx     # Componente de enlace personalizado
├── pages/
│   ├── Overview.tsx     # Página de inicio/portada
│   ├── CategoryPage.tsx # Página de categoría genérica
│   └── Contact.tsx     # Página de contacto
├── data/
│   └── portfolio.ts    # Datos estáticos del portfolio
└── App.tsx             # Componente raíz con providers
```

---

## Componentes Principales

### 1. App.tsx (Raíz de la Aplicación)

**Propósito**: Configura el providers global y las rutas de la aplicación.

**Providers utilizados**:
- `QueryClientProvider`: Proporciona el cliente de React Query para gestión de estado del servidor.
- `TooltipProvider`: Habilita tooltips en toda la aplicación.
- `Toaster` y `Sonner`: Sistemas de notificaciones toast.
- `BrowserRouter`: Habilita el enrutamiento de React Router.

**Rutas definidas**:
- `/` → `Overview` (portada)
- `/:slug` → `CategoryPage` (categorías dinámicas)
- `/contact` → `Contact` (página de contacto)
- `*` → `NotFound` (ruta no encontrada)

---

### 2. Layout.tsx (Contenedor Principal)

**Propósito**: Define la estructura de dos columnas de la aplicación.

**Composición**:
```tsx
<SidebarProvider>
  <AppSidebar />              # Barra lateral fija (260px)
  <div className="flex-1">
    <SidebarTrigger />         # Menú hamburguesa (solo móvil)
    <Outlet />                 # Contenido de la página actual
  </div>
</SidebarProvider>
```

**Características**:
- El `Outlet` de React Router renderiza la página activa.
- En móviles, el Sidebar se convierte en un drawer deslizadle.
- El `SidebarProvider` comparte el estado del Sidebar entre componentes.

---

### 3. AppSidebar.tsx (Barra Lateral)

**Propósito**: Navigation principal del portfolio.

**Items de navegación**:
| Ruta | Título | Icono |
|------|--------|-------|
| `/` | Overview | LayoutGrid |
| `/ui-design` | UI Design | Palette |
| `/social-media` | Social Media | Share2 |
| `/branding` | Branding | Stamp |
| `/web` | Web | Globe |
| `/contact` | Contact | Mail |

**Funcionamiento**:
- Usa el componente `Sidebar` de shadcn/ui como base.
- Cada item usa `NavLink` para navegación con estado active.
- Los iconos vienen de `lucide-react`.

---

### 4. NavLink.tsx (Enlace de Navegación)

**Propósito**: Wrapper sobre el `NavLink` de React Router con estilos condicionales.

**Props**:
| Prop | Tipo | Descripción |
|------|------|-------------|
| `className` | string | Clases CSS base |
| `activeClassName` | string | Clases cuando la ruta está activa |
| `pendingClassName` | string | Clases cuando la ruta está pendiente |
| `to` | string | URL de destino |

**Funcionamiento**:
- Usa `cn()` de `@/lib/utils` para combinar clases condicionalmente.
- Detecta automáticamente si la ruta está activa con `isActive`.
- Útil para destacar la página actual en la navegación.

---

### 5. Overview.tsx (Portada)

**Propósito**: Muestra una vista previa de los proyectos destacados.

**Datos**: Lee de `featuredProjects` en `portfolio.ts`.

**Estructura**:
- Título: "Design Portfolio"
- Subtítulo descriptivo
- Grid de miniaturas de proyectos destacados (6 proyectos)
- Efecto hover: escala suave + sombra

**Uso**: Es la página de inicio (`/`) del portfolio.

---

### 6. CategoryPage.tsx (Página de Categoría)

**Propósito**: Renderiza galerías específicas según la categoría.

**URL Params**: Lee `:slug` de la URL (`/ui-design`, `/branding`, etc.).

**Funcionamiento**:
1. Extrae el `slug` de la URL con `useParams()`.
2. Busca la categoría en `categories` de `portfolio.ts`.
3. Si no existe, redirige a `/` con `<Navigate />`.
4. Renderiza `<Gallery images={category.images} />`.

**Categorías disponibles**:
- `ui-design` → UI Design
- `social-media` → Social Media
- `branding` → Branding
- `web` → Web

---

### 7. Gallery.tsx (Galería de Imágenes)

**Propósito**: Muestra un grid responsivo de imágenes con lightbox.

**Props**:
| Prop | Tipo | Descripción |
|------|------|-------------|
| `images` | `ProjectImage[]` | Array de imágenes a mostrar |

**Estructura del grid**:
- 1 columna: móvil
- 2 columnas: `sm` (tablets)
- 3 columnas: `lg` (desktop)

**Interacción**:
- Click en imagen → abre `Lightbox`
- Usa estado local: `lightboxOpen`, `currentIndex`
- Transiciones suaves en hover

**Tipo `ProjectImage`**:
```typescript
interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}
```

---

### 8. Lightbox.tsx (Visor Modal)

**Propósito**: Visualización ampliada de imágenes con navegación.

**Props**:
| Prop | Tipo | Descripción |
|------|------|-------------|
| `images` | `ProjectImage[]` | Array completo de imágenes |
| `currentIndex` | number | Índice de imagen actual |
| `open` | boolean | Controla visibilidad del modal |
| `onOpenChange` | function | Callback al cerrar/abrir |
| `onNavigate` | function | Callback al cambiar imagen |

**Controles**:
- **X**: Cerrar modal
- **←**: Imagen anterior (si existe)
- **→**: Imagen siguiente (si existe)
- **ESC**: Cerrar modal
- **Click overlay**: Cerrar modal

**Navegación por teclado**:
```typescript
handleKeyDown(e) {
  if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
  if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
}
```

**Componente base**: Usa `Dialog` de shcn/ui con overlay con blur.

---

### 9. Contact.tsx (Página de Contacto)

**Propósito**: Formulario de contacto e información.

**Elementos**:
- Título y descripción
- Información de contacto (email, LinkedIn, Behance)
- Formulario con campos:
  - Name (`Input`)
  - Email (`Input`)
  - Message (`Textarea`)
  - Submit (`Button`)

**Nota**: El formulario es presentacional (no envía datos).

---

## Componentes UI (shadcn/ui)

El proyecto incluye ~70 componentes base de shadcn/ui en `src/components/ui/`:

| Componente | Uso en el proyecto |
|------------|---------------------|
| `sidebar` | Layout principal, navegación |
| `dialog` | Lightbox |
| `button` | Formularios, acciones |
| `input` | Campos de texto |
| `textarea` | Mensaje del formulario |
| `label` | Etiquetas de formularios |
| `card` | Contenedores de contenido |
| `tooltip` | Información sobre iconos |
| `sonner` / `toaster` | Notificaciones |

### Patrón de uso típico

```tsx
import { Componente } from "@/components/ui/componente";

// Uso con props de shadcn
<Componente prop1="valor" prop2>
  Contenido
</Componente>
```

---

## Datos Estáticos (portfolio.ts)

**Propósito**: Centraliza todos los datos del portfolio.

**Estructura**:

```typescript
interface Category {
  slug: string;        // URL-friendly ID
  title: string;        // Título visible
  subtitle?: string;    // Descripción opcional
  images: ProjectImage[];
}

const categories: Category[] = [
  { slug: "ui-design", title: "UI Design", ... },
  { slug: "social-media", title: "Social Media", ... },
  { slug: "branding", title: "Branding", ... },
  { slug: "web", title: "Web", ... },
];

const featuredProjects: ProjectImage[] = [];
```

**Cómo agregar proyectos**:

1. Añadir imagen a `public/` (ej: `project1.jpg`)
2. Editar `src/data/portfolio.ts`:

```typescript
{
  slug: "ui-design",
  title: "UI Design",
  images: [
    { id: "ui-1", src: "/project1.jpg", alt: "Proyecto 1", caption: "App Mobile" },
    // más imágenes...
  ]
}
```

3. Para la portada, añadir a `featuredProjects`:

```typescript
{ id: "feat-1", src: "/project1.jpg", alt: "Proyecto 1", caption: "UI Design" }
```

---

## Flujo de Datos

```
App.tsx
    │
    ├── QueryClientProvider (React Query)
    │
    ├── BrowserRouter
    │       │
    │       └── Routes
    │              │
    │              ├── Layout (SidebarProvider)
    │              │       │
    │              │       ├── AppSidebar
    │              │       │       │
    │              │       │       └── NavLink × 6
    │              │       │
    │              │       └── Outlet → Page
    │              │              │
    │              │              ├── Overview → Gallery de featured
    │              │              ├── /:slug → Gallery de categoría
    │              │              └── /contact → Formulario
    │
    └── Providers (Tooltip, Toaster, Sonner)
```

---

## Personalización

### Colores y Tema

El proyecto usa CSS variables de Tailwind. Editar `src/index.css` para cambiar:

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --muted: #f5f5f5;
  --muted-foreground: #737373;
  --border: #e5e5e5;
}
```

### Agregar nueva categoría

1. Editar `src/data/portfolio.ts`:
```typescript
{
  slug: "photography",
  title: "Photography",
  images: [...]
}
```

2. Editar `src/components/AppSidebar.tsx`:
```typescript
{ title: "Photography", url: "/photography", icon: Camera },
```

### Cambiar dimensiones del Sidebar

En `src/components/ui/sidebar.tsx` o vía CSS:

```css
--sidebar-width: 260px;
--sidebar-width-mobile: 280px;
```

---

## Dependencias Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| react | ^18.3.1 | Framework principal |
| react-router-dom | ^6.30.1 | Enrutamiento |
| @tanstack/react-query | ^5.83.0 | Gestión de estado servidor |
| @radix-ui/react-* | ^1.x | Componentes base accesibles |
| tailwindcss | ^3.4.17 | Estilos utility-first |
| lucide-react | ^0.462.0 | Iconos |
| class-variance-authority | ^0.7.1 | Variantes de clases CSS |

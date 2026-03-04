# 🪑 Mueblería Piero

E-commerce de muebles para el hogar con catálogo por categorías, carrito de compras y checkout integrado con WhatsApp.

🔗 **Sitio en producción:** [muebleriapiero-mu.vercel.app](https://muebleriapiero-mu.vercel.app/)

## Características

- **Catálogo por categorías** — Dormitorio, Cocina y Comedor, Oficina
- **Carrito de compras** — Agregar, modificar cantidades y eliminar productos
- **Checkout por WhatsApp** — Proceso de compra rápido sin necesidad de registro
- **Panel de administración** — Gestión de productos y contenido
- **Diseño responsive** — Adaptado para móviles, tablets y desktop

## Tech Stack

- **Framework:** [Astro](https://astro.build/) con SSR (Server-Side Rendering)
- **UI:** [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **Base de datos:** [Supabase](https://supabase.com/)
- **Deploy:** [Vercel](https://vercel.com/)
- **Componentes:** Headless UI, Heroicons, Lucide React, Flowbite

## Estructura del proyecto

```text
src/
├── components/    # Componentes React y Astro
├── context/       # Context providers (carrito, auth, etc.)
├── layouts/       # Layouts base
├── lib/           # Utilidades y cliente Supabase
├── pages/         # Rutas de la aplicación
│   ├── admin/     # Panel de administración
│   ├── api/       # Endpoints API
│   ├── categorias/# Páginas por categoría
│   ├── products/  # Detalle de productos
│   └── ...
├── styles/        # Estilos globales
└── assets/        # Imágenes y recursos estáticos
```

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/PieroCahuanaC/Muebleria-Piero-WebPage.git
cd Muebleria-Piero-WebPage

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:4321`.

## Scripts disponibles

- `npm run dev` — Servidor de desarrollo
- `npm run build` — Build de producción
- `npm run preview` — Preview del build local

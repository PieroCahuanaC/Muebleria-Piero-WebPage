# Muebleria Piero - E-commerce de Muebles

E-commerce de muebles para el hogar desarrollado para **Muebleria Piero**, una empresa familiar fundada en 2007 en Moquegua, Peru. El sitio permite a los clientes explorar el catalogo de muebles por categorias, agregar productos a un carrito de compras y finalizar su pedido directamente por WhatsApp, sin necesidad de registro.

**Sitio en produccion:** [muebleriapiero-mu.vercel.app](https://muebleriapiero-mu.vercel.app/)

---

## Que problema resuelve

Muebleria Piero es una tienda fisica de muebles que necesitaba presencia digital para mostrar su catalogo y facilitar el proceso de compra. Antes de este sitio, los clientes solo podian conocer los productos visitando la tienda o preguntando por WhatsApp sin referencia visual.

Este e-commerce resuelve ese problema al:

- Mostrar todo el catalogo con imagenes, precios y descripciones
- Permitir al cliente armar su pedido desde cualquier dispositivo
- Enviar el pedido completo por WhatsApp con un solo clic
- Dar al negocio un panel de administracion para gestionar productos sin tocar codigo

---

## Funcionalidades principales

### Para el cliente

- **Catalogo por categorias** — El cliente puede explorar muebles organizados en tres categorias: Dormitorio, Cocina y Comedor, y Oficina
- **Detalle de producto** — Cada producto tiene su propia pagina con imagen, precio y descripcion
- **Carrito de compras** — Se pueden agregar productos, modificar cantidades y eliminar items. El carrito se persiste en localStorage para no perder la seleccion al navegar
- **Checkout por WhatsApp** — Al finalizar, el cliente ingresa su nombre, telefono, direccion y comentarios. El sistema genera un mensaje preformateado con todo el pedido y lo envia por WhatsApp al numero de la tienda
- **Paginas informativas** — Incluye paginas de Politica de envios, Politica de privacidad, Terminos y condiciones, Preguntas frecuentes (FAQ) y Sobre nosotros

### Para el administrador

- **Panel de administracion** — Accesible via `/admin`, protegido con autenticacion de Supabase
- **Gestion de productos** — Permite crear, editar y eliminar productos desde el panel, sin necesidad de modificar codigo
- **Login seguro** — Autenticacion por email/contrasena gestionada por Supabase Auth

---

## Tech Stack

| Tecnologia                                                          | Uso                                                 |
| ------------------------------------------------------------------- | --------------------------------------------------- |
| [Astro](https://astro.build/)                                       | Framework principal con SSR (Server-Side Rendering) |
| [React](https://react.dev/)                                         | Componentes interactivos (carrito, checkout, admin) |
| [Tailwind CSS](https://tailwindcss.com/)                            | Estilos y diseno responsive                         |
| [Supabase](https://supabase.com/)                                   | Base de datos PostgreSQL + autenticacion            |
| [Vercel](https://vercel.com/)                                       | Hosting y deploy con serverless functions           |
| [Headless UI](https://headlessui.com/)                              | Componentes UI accesibles                           |
| [Heroicons](https://heroicons.com/) / [Lucide](https://lucide.dev/) | Iconografia                                         |
| [Flowbite](https://flowbite.com/)                                   | Componentes UI adicionales                          |

---

## Arquitectura del proyecto

El proyecto usa una **arquitectura hibrida Astro + React**:

- **Astro** renderiza las paginas en el servidor, generando HTML estatico para mejor SEO y rendimiento
- **React** se usa como "islas interactivas" (`client:load`, `client:only`) para las funcionalidades que requieren estado del lado del cliente (carrito, checkout, panel admin)
- **Supabase** funciona como backend, proporcionando la base de datos de productos y el sistema de autenticacion
- Los productos se cargan desde Supabase en tiempo de ejecucion via SSR

### Flujo del carrito y checkout

```
Cliente navega el catalogo
        |
        v
Agrega productos al carrito (React Context + localStorage)
        |
        v
Va a /checkout → Completa sus datos
        |
        v
Genera mensaje WhatsApp con el pedido completo
        |
        v
Se abre WhatsApp Web/App con el mensaje prellenado
        |
        v
El negocio recibe el pedido y coordina la entrega
```

---

## Estructura del proyecto

```
src/
├── assets/          # Imagenes y recursos estaticos
├── components/      # Componentes React (.jsx) y Astro (.astro)
│   ├── Navbar.astro         # Barra de navegacion responsive
│   ├── Carousel.astro       # Carrusel de imagenes en el home
│   ├── Productos.jsx        # Grilla de productos con filtro por categoria
│   ├── ProductOverview.jsx  # Vista detallada de un producto
│   ├── Cartbutton.jsx       # Boton para agregar al carrito
│   ├── Cartmodal.jsx        # Modal del carrito de compras
│   ├── Checkout.jsx         # Formulario de checkout + envio por WhatsApp
│   ├── AdminPanel.jsx       # Panel de administracion de productos
│   ├── LoginForm.jsx        # Formulario de login del admin
│   ├── Benefits.astro       # Seccion de beneficios
│   ├── FavoriteProduct.astro # Productos destacados
│   ├── Footer.astro         # Pie de pagina
│   └── ...
├── context/         # React Context Providers
│   ├── Cartcontext.jsx      # Estado global del carrito
│   └── AuthContext.jsx      # Estado global de autenticacion
├── layouts/         # Layouts base de Astro
│   └── Layout.astro
├── lib/             # Utilidades
│   ├── supabase.js          # Cliente Supabase
│   └── utils.js             # Funciones auxiliares
├── pages/           # Rutas de la aplicacion
│   ├── index.astro          # Pagina principal
│   ├── checkout.astro       # Pagina de finalizar pedido
│   ├── faqPage.astro        # Preguntas frecuentes
│   ├── categorias/
│   │   └── [categoria].astro # Rutas dinamicas por categoria
│   ├── products/            # Detalle de producto individual
│   ├── admin/               # Panel de administracion
│   │   ├── index.astro      # Dashboard admin
│   │   └── login.astro      # Login admin
│   ├── api/
│   │   └── products.ts      # API endpoint para productos
│   └── ...                  # Paginas legales (privacidad, envios, etc.)
└── styles/
    └── global.css           # Estilos globales
```

---

## Instalacion y desarrollo local

### Requisitos previos

- Node.js 18 o superior
- npm
- Una cuenta en [Supabase](https://supabase.com/) con una tabla `Products`

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/PieroCahuanaC/Muebleria-Piero-WebPage.git
cd Muebleria-Piero-WebPage

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
```

Editar `.env.local` con las credenciales de Supabase:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_KEY=tu-anon-key
```

```bash
# 4. Iniciar servidor de desarrollo
npm run dev
```

El servidor estara disponible en `http://localhost:4321`.

### Scripts disponibles

| Comando           | Descripcion                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con hot reload |
| `npm run build`   | Build de produccion                   |
| `npm run preview` | Preview del build local               |

---

## Decisiones tecnicas

- **Astro SSR en lugar de SSG:** Se eligio Server-Side Rendering para que los productos se carguen siempre actualizados desde Supabase, sin necesidad de rebuilds al agregar/modificar productos
- **Checkout por WhatsApp:** Se opto por este flujo en lugar de un sistema de pagos online porque el negocio opera con entregas locales en Moquegua y coordina directamente con el cliente
- **localStorage para el carrito:** Permite que el carrito persista entre navegaciones sin requerir autenticacion del cliente
- **React como islas:** Solo los componentes interactivos usan React, el resto es HTML estatico generado por Astro, mejorando el rendimiento y SEO

# Trophy Base 🏆

Aplicación fullstack desarrollada con **NestJS** para el backend, **Vue 3** para el frontend y **Prisma con SQLite** para la base de datos.

El sistema permite consultar y gestionar trofeos de videojuegos e incluye autenticación mediante JWT.

## 🚀 Requisitos previos

Es necesario tener instalado:

- Node.js
- npm
- Git

---

## 📥 Clonar el proyecto

```bash
git clone https://github.com/Levdev200/trophy-base.git
cd trophy-base
```

---

## 🔐 Configurar variables de entorno

Dentro de:

```text
trophy-base-backend
```

crear un archivo llamado:

```text
.env
```

tomando como referencia `.env.example`.

Ejemplo:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
JWT_SECRET="TU_CLAVE_SECRETA"
```

El archivo `.env` contiene información privada y no debe subirse a GitHub.

---

## ⚡ Ejecutar todo automáticamente

Desde la carpeta raíz del proyecto:

```bash
npm run setup
```

Este comando instala las dependencias del backend y frontend y levanta ambos servidores.

Backend:

```text
http://localhost:3000
```

Frontend:

```text
http://localhost:5173
```

---

## 🛠️ Ejecución manual

También se pueden ejecutar backend y frontend por separado.

### Backend - NestJS

Abrir una terminal:

```bash
cd trophy-base-backend
npm install
npx prisma generate
npm run start:dev
```

El backend estará disponible en:

```text
http://localhost:3000
```

### Frontend - Vue

Abrir otra terminal:

```bash
cd trophy-base-frontend
npm install
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

## 🗄️ Base de datos

El proyecto utiliza SQLite mediante Prisma.

El repositorio incluye una base de datos preparada para facilitar la revisión del taller.

Si fuera necesario aplicar las migraciones:

```bash
cd trophy-base-backend
npx prisma migrate deploy
```

Y para generar Prisma Client:

```bash
npx prisma generate
```

---

## 🏆 Funcionalidades

- Listado de trofeos
- Búsqueda por nombre
- Paginación
- Creación de trofeos
- Edición de trofeos
- Eliminación de trofeos
- Registro de usuarios
- Contraseñas almacenadas mediante hash
- Inicio de sesión
- Autenticación mediante JWT
- Rutas privadas mediante Navigation Guard
- Protección de operaciones con JWT
- Cierre de sesión
- Variables de entorno mediante `.env`

---

## 🌐 Rutas del frontend

```text
/           Listado público de trofeos
/login      Inicio de sesión
/registro   Registro de usuario
/gestion    Gestión privada de trofeos
```

---

## 🔌 Endpoints principales

### Trofeos

```text
GET    /trofeos
GET    /trofeos/:id
POST   /trofeos
PATCH  /trofeos/:id
DELETE /trofeos/:id
```

`POST`, `PATCH` y `DELETE` requieren autenticación mediante JWT.

### Autenticación

```text
POST /auth/register
POST /auth/login
```

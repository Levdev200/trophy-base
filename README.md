# Trophy Base 🏆

Aplicación fullstack desarrollada con **NestJS** (Backend), **Vue** (Frontend) y **Prisma** con SQLite (Base de datos).

## 🚀 Requisitos previos

Asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- Git

---

## 📥 Clonar y Ejecutar el Proyecto (En 1 solo paso)

Si estás en la carpeta raíz del monorepo (la que contiene ambos proyectos), puedes configurar e iniciar todo automáticamente.

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Levdev200/trophy-base.git
   cd trophy-base
   ```
2. Instala y arranca todo con un solo comando:
   ```bash
   npm run setup
   ```
   (Este comando instalará las dependencias tanto del backend como del frontend y encenderá ambos servidores simultáneamente).

---

## 🛠️ Ejecución manual (Paso a paso alternativo)

Si prefieres levantar cada parte en una terminal independiente:

### 1. Backend (NestJS)
- Entra a la carpeta del backend: cd nombre-carpeta-backend
- Instala dependencias: npm install
- Inicia el servidor de desarrollo: 
   ```bash 
   npm run start:dev
   ```
(El backend correrá por defecto en http://localhost:3000)

### 2. Frontend (Vue)
- Abre otra terminal y entra a la carpeta del frontend: cd nombre-carpeta-frontend
- Instala dependencias: npm install
- Inicia el servidor de desarrollo: 
   ```bash
   npm run dev
   ```
(El frontend estará disponible en el puerto indicado por Vite/Vue, usualmente http://localhost:5173)

---

## 🗄️ Nota sobre la Base de Datos
Este repositorio incluye el archivo de SQLite precargado para facilitar la revisión del taller, por lo que no es necesario ejecutar migraciones adicionales al clonar.
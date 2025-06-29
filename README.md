# Pantalla Justa

Este proyecto es una herramienta académica desarrollada con **Vite + Vue 3 + TypeScript** que permite visualizar **grafos interactivos** basados en una muestra filtrada del dataset público de **IMDb**. El objetivo principal es evidenciar **disparidades de género** dentro de la industria cinematográfica.

## 🚀 Tecnologías utilizadas

- [Vite](https://vitejs.dev/) – Entorno de desarrollo ultrarrápido
- [Vue 3](https://vuejs.org/) – Framework progresivo de JavaScript
- [TypeScript](https://www.typescriptlang.org/) – Superset tipado de JavaScript
- [vis-network](https://visjs.github.io/vis-network/) – Para la visualización de grafos
- [vis-data](https://visjs.github.io/vis-data/) – Para la gestión de datos de los nodos y aristas

```ts
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import 'vis-network/styles/vis-network.css'
```

## 🎯 Objetivo

Este visualizador permite cargar y explorar relaciones entre películas, actores, actrices y personal clave de producción, destacando métricas de género con base en:

- Proporciones de participación por género
- Conexiones entre profesionales dentro de cada género
- Aislamiento o centralidad de ciertos grupos

## 📊 Dataset

Se utiliza una muestra del **dataset público de IMDb**, previamente procesado para incluir campos relevantes como:

- Género
- Rol en producción (director, guionista, etc.)

> ⚠️ El dataset es usado únicamente con fines académicos y no comerciales.

## 🧠 Funcionalidades principales

- Carga y filtrado de una muestra del dataset de IMDb
- Visualización de grafos interactivos usando vis-network
- Filtros por año, rol, y género
- Interfaz amigable e intuitiva

## 🛠️ Instalación y ejecución

El frontend del proyecto tiene una dependencia con el backend para el funcionamiento de los features relacionados con los grafos.

```bash
# Clona el repositorio
git clone https://github.com/complejidad-algoritmica-2025-10/frontend.git
cd visualizador-imdb-genero

# Instala dependencias
npm install

# Ejecuta el servidor de desarrollo
npm run dev
```

## 📦 Compilación para producción

```bash
npm run build
```

## 📄 Licencia

Este proyecto se encuentra bajo una licencia de uso **académico**. No está permitido su uso comercial sin autorización previa.

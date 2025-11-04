# 🎨 eduVisualFront

**eduVisualFront** es la aplicación **frontend** del proyecto **eduVisual**, desarrollada con **React** y **TypeScript**.
Su propósito es ofrecer una interfaz moderna, intuitiva y responsiva para interactuar con el backend de **eduVisualBack**, el cual genera contenido educativo mediante inteligencia artificial.

---

## 🚀 Descripción

El frontend permite a los estudiantes y profesores **generar textos e imágenes educativas** a través de la conexión con la API del backend.
Además, incluye una **guía de uso interactiva** que explica cómo aprovechar al máximo las herramientas del sistema, y cómo crear **prompts más productivos** para distintas materias escolares.

---

## 🧠 Características principales

* Desarrollado con **React + TypeScript**
* Diseño **moderno, fresco y completamente responsive**
* Integración directa con la **API de eduVisualBack**
* Guía interactiva de uso y ejemplos de prompts educativos
* Manejo eficiente de estado y peticiones HTTP
* Código modular y escalable con buenas prácticas de desarrollo

---

## 🧩 Tecnologías utilizadas

* **React 18+**
* **TypeScript**
* **Vite** (para desarrollo rápido)
* **Axios** (para consumo de API)
* **React Router DOM**
* **TailwindCSS** (diseño limpio y responsive)
* **Framer Motion** (animaciones suaves)
* **Context API / Zustand** (gestión de estado)
* **ESLint + Prettier** (estilo y consistencia de código)

---

## ⚙️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/gabrielsanchez16/eduVisualFront.git
   ```

2. Entra en el directorio del proyecto:

   ```bash
   cd eduVisualFront
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` (basado en `.env.example`) con la URL del backend:

   ```bash
   VITE_API_URL=http://localhost:5000
   ```

5. Ejecuta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre tu navegador en:

   ```
   http://localhost:8080
   ```

---

## 🧰 Estructura del proyecto

```
eduVisualFront/
│
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Vistas principales (Home, Prompts, Guía, etc.)
│   ├── services/          # Conexión con la API del backend
│   ├── hooks/             # Hooks personalizados
│   ├── context/           # Estado global
│   ├── assets/            # Imágenes e íconos
│   └── main.tsx           # Punto de entrada
│
├── public/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🧭 Funcionalidades destacadas

* **Generador educativo:** solicita texto o imágenes a la IA desde el backend.
* **Guía de prompts:** enseña a los usuarios cómo formular solicitudes efectivas.
* **Modo responsive:** adaptable a celulares, tabletas y escritorio.
* **Diseño amigable:** pensado para estudiantes y docentes.

---

## 💡 Guía de prompts productivos

La sección de guía dentro del frontend enseña cómo redactar prompts para obtener mejores resultados en distintas áreas como:

* 🧬 Ciencias naturales
* 🧮 Matemáticas
* 📚 Lenguaje
* 🌎 Sociales
* 🧪 Física y química

Incluye ejemplos, sugerencias y tips para aprovechar al máximo las capacidades de la IA.

---

## 👨‍🏫 Propósito educativo

**eduVisual** promueve la integración de la inteligencia artificial en la educación, facilitando herramientas accesibles para **enseñar, aprender y crear contenido educativo** de forma dinámica y visual.

---

## 🧑‍💻 Autor

**Sebastian Ordoñez**
Desarrollador entusiasta de la educación impulsada por IA.
📧

---

## 🪪 Licencia

Este proyecto está bajo la licencia **MIT**.
Puedes usarlo, adaptarlo y mejorarlo con fines educativos o de investigación.

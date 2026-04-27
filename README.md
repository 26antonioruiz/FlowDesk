# 🚀 FlowDesk

FlowDesk es una aplicación web todo-en-uno para organizar tu vida diaria: tareas, gastos y planificación en un solo lugar.

Diseñada con una experiencia moderna, animaciones fluidas y arquitectura escalable.

---

## ✨ Features

- ✅ Gestión de tareas por día
- 💸 Control de gastos con gráficas
- 📅 Calendario interactivo
- 🔥 Sistema de racha (streak)
- 💡 Recomendaciones inteligentes
- 🔐 Autenticación con Supabase (tokens reales)
- 🎨 UI moderna estilo SaaS (Tailwind + Framer Motion)

---

## 🧠 Tech Stack

**Frontend**
- React + TypeScript
- Vite
- TailwindCSS
- Framer Motion

**Backend / Auth**
- Supabase (Auth + DB)

**Deploy**
- Vercel

---

## 📦 Estructura del proyecto


flowdesk/
│
├── client/ # Frontend (React)
│ ├── src/
│ ├── components/
│ ├── store/
│ └── lib/
│
├── server/ # (opcional / futuro backend)
│
└── vercel.json


---

## ⚙️ Instalación local

```bash
# Clonar repo
git clone https://github.com/26antonioruiz/FlowDesk.git

# Entrar al frontend
cd FlowDesk/client

# Instalar dependencias
npm install

# Ejecutar
npm run dev
🔐 Variables de entorno

Crea un archivo .env en /client:

VITE_SUPABASE_URL=TU_URL
VITE_SUPABASE_ANON_KEY=TU_KEY

Puedes obtenerlas en:
👉 Supabase → Project Settings → API

🚀 Deploy

El proyecto está preparado para desplegar en Vercel:

Configuración importante:
Root Directory → client
Framework → Vite
Rewrites configurado (SPA)
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
🧩 Roadmap
 Persistencia de tareas en Supabase
 Dashboard financiero avanzado
 Notificaciones
 Modo mobile app
 Multiusuario colaborativo

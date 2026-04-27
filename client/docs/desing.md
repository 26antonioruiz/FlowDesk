# 🧠 Diseño y Arquitectura - FlowDesk

## 🏗️ Arquitectura general

FlowDesk sigue una arquitectura separada en dos partes:

* **Frontend**: React + TypeScript + Tailwind
* **Backend/API**: (simulada o real) encargada de gestionar los datos

El frontend consume datos a través de una capa de red (`api.ts`), manteniendo separación de responsabilidades.

---

## 🔁 Flujo de datos

Usuario → Interfaz (React) → Estado global (store) → API → Datos
API → Estado global → UI actualizada

---

## 🧩 Estructura del frontend

```
src/
│
├── components/     # Componentes reutilizables
├── pages/          # Vistas principales (Dashboard, Tasks, etc.)
├── hooks/          # Custom hooks
├── types/          # Tipos de TypeScript
├── utils/          # Funciones auxiliares
├── context/        # Context API (si se usa)
├── api/            # Cliente de API
```

---

## 🧱 Componentes principales

* **Dashboard**

  * Resumen del día
  * Estadísticas (tareas, gastos, productividad)
* **Tasks**

  * Lista de tareas
  * Crear / completar / eliminar
* **Expenses**

  * Registro de gastos
* **CalendarView**

  * Visualización de fechas

---

## 🔄 Gestión del estado

Se utiliza un store global (`useAppStore`) para:

* tareas
* gastos
* estadísticas

Esto permite compartir datos entre componentes sin prop drilling.

---

## 🌐 Capa de red (API)

El archivo `api.ts` actúa como cliente de API.

Funciones típicas:

* obtener tareas
* crear tarea
* eliminar tarea
* obtener gastos

Actualmente puede trabajar con:

* LocalStorage (modo local)
* o backend real

---

## 📦 Modelo de datos

### Tarea (Task)

```
{
  id: string
  title: string
  completed: boolean
  date?: string
}
```

### Gasto (Expense)

```
{
  id: string
  amount: number
  date: string
}
```

---

## 💾 Persistencia de datos

Actualmente:

* LocalStorage actúa como base de datos

En versión futura:

* API REST con backend

---

## 🔌 Endpoints (diseño teórico)

```
GET    /api/tasks
POST   /api/tasks
DELETE /api/tasks/:id

GET    /api/expenses
POST   /api/expenses
```

---

## 🎯 Decisiones clave

* Uso de React con TypeScript para tipado fuerte
* Tailwind para desarrollo rápido de UI
* Store global para simplicidad
* API separada para escalabilidad futura

---

## 🔮 Escalabilidad

El proyecto está preparado para:

* añadir autenticación
* conectar backend real
* añadir nuevas funcionalidades sin romper la arquitectura

---

## 📊 Diagrama de flujo (simple)

Frontend (React)
↓
Store global
↓
API (fetch / localStorage)
↓
Datos

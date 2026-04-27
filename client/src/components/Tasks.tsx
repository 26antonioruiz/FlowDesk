import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import { motion } from "framer-motion";

export default function Tasks() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    selectedDate,
    fetchTasks,
  } = useAppStore();

  const [input, setInput] = useState("");

  // 🔥 CARGAR DESDE SUPABASE
  useEffect(() => {
    fetchTasks();
  }, []);

  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  const handleAdd = async () => {
    if (!input.trim()) return;

    await addTask(input, selectedDate);

    setInput("");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Tareas del día</h3>

      {/* INPUT */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Nueva tarea..."
        className="
          w-full 
          px-4 py-3 
          rounded-xl 
          bg-slate-700 
          text-white 
          placeholder:text-slate-400
          outline-none 
          caret-indigo-400
          focus:ring-2 focus:ring-indigo-500/30
          transition
        "
      />

      {/* LISTA */}
      <div className="space-y-3">
        {todayTasks.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="
              flex justify-between items-center 
              bg-slate-800/70 backdrop-blur 
              p-4 rounded-xl border border-slate-700 
              hover:border-indigo-500/40 transition
            "
          >
            <div className="flex items-center gap-3">

              {/* ✅ SOLO ESTE CLICK FUNCIONA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(t.id, t.completed);
                }}
                className={`
                  w-5 h-5 rounded-md border flex items-center justify-center
                  transition
                  ${
                    t.completed
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-slate-500 hover:border-indigo-400"
                  }
                `}
              >
                {t.completed && (
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                )}
              </button>

              <span
                className={`select-none transition ${
                  t.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {t.title}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(t.id);
              }}
              className="text-red-400 hover:text-red-300 transition"
            >
              ✕
            </button>
          </motion.div>
        ))}

        {todayTasks.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-4">
            No hay tareas para este día
          </p>
        )}
      </div>
    </div>
  );
}
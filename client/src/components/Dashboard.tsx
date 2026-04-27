import { useState } from "react";
import { useAppStore } from "../store/useAppStore";
import CalendarView from "./CalendarView";
import Tasks from "./Tasks";
import ExpensesChart from "./ExpensesChart";
import { motion } from "framer-motion";

export default function Dashboard() {
  const {
    expenses,
    addExpense,
    selectedDate,
    tasks,
    calculateStreak,
  } = useAppStore();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const todayExpenses = expenses.filter((e) => e.date === selectedDate);
  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  const total = todayExpenses.reduce((acc, e) => acc + e.amount, 0);

  // 🔥 RACHA REAL (desde store)
  const streak = calculateStreak();

  // 🎯 OBJETIVO DIARIO
  const taskGoal = 5;
  const progress = Math.min((todayTasks.length / taskGoal) * 100, 100);

  // 💡 INSIGHTS
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((e) => {
    if (!categoryTotals[e.category]) categoryTotals[e.category] = 0;
    categoryTotals[e.category] += e.amount;
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : null;

  const handleAddExpense = () => {
    if (!amount || isNaN(Number(amount))) return;

    addExpense({
      id: crypto.randomUUID(),
      amount: Number(amount),
      category: category || "otros",
      date: selectedDate,
    });

    setAmount("");
    setCategory("");
  };

  // 🔥 ANIMACIONES
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-6 space-y-8"
    >
      {/* HEADER */}
      <motion.div variants={item}>
        <h1 className="text-4xl font-bold">DÍA</h1>
        <p className="text-slate-400">{selectedDate}</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">

        {/* IZQUIERDA */}
        <div className="space-y-6">

          {/* RACHA */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-800/70 backdrop-blur p-5 rounded-2xl border border-slate-700 hover:border-indigo-500/40 transition"
          >
            <h3 className="font-semibold mb-2">🔥 Racha</h3>
            <p className="text-3xl font-bold">{streak} días</p>
            <p className="text-sm text-slate-400">Mantén el ritmo</p>
          </motion.div>

          {/* RESUMEN */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-800/70 backdrop-blur p-5 rounded-2xl border border-slate-700 hover:border-indigo-500/40 transition"
          >
            <h3 className="font-semibold mb-2">📊 Resumen</h3>
            <p className="text-sm text-slate-300">
              Tareas: {todayTasks.length}
            </p>
            <p className="text-sm text-slate-300">
              Gastos: {total} €
            </p>
          </motion.div>

          {/* 🎯 OBJETIVO */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-5 rounded-2xl border border-slate-700"
          >
            <h3 className="font-semibold mb-2">🎯 Objetivo diario</h3>

            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-slate-400 mt-2">
              {todayTasks.length}/{taskGoal} tareas
            </p>
          </motion.div>

        </div>

        {/* CENTRO */}
        <div className="lg:col-span-2 space-y-6">

          {/* TAREAS */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/70 backdrop-blur p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/40 transition"
          >
            <Tasks />
          </motion.div>

          {/* CALENDARIO */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/70 backdrop-blur p-6 rounded-2xl border border-slate-700 flex justify-center hover:border-indigo-500/40 transition"
          >
            <CalendarView />
          </motion.div>

        </div>

        {/* DERECHA */}
        <div className="space-y-6">

          {/* GASTOS */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/70 backdrop-blur p-6 rounded-2xl border border-slate-700 space-y-4 hover:border-indigo-500/40 transition"
          >
            <h3 className="text-lg font-semibold">Gastos</h3>

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Cantidad (€)"
              className="w-full p-3 rounded-lg bg-slate-700 outline-none caret-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
            />

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Motivo"
              className="w-full p-3 rounded-lg bg-slate-700 outline-none caret-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
            />

            <button
              onClick={handleAddExpense}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              Añadir gasto
            </button>

            <p className="text-sm text-slate-400">
              Total: {total} €
            </p>

            <ExpensesChart expenses={todayExpenses} />
          </motion.div>

          {/* RECOMENDACIONES */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500/40 transition"
          >
            <h3 className="font-semibold mb-2">💡 Recomendaciones</h3>

            {topCategory ? (
              <p className="text-slate-300 text-sm">
                Estás gastando más en <b>{topCategory}</b>
              </p>
            ) : (
              <p className="text-slate-400 text-sm">
                Añade gastos para ver recomendaciones
              </p>
            )}
          </motion.div>

          {/* ADVERTENCIAS */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-indigo-500/40 transition"
          >
            <h3 className="font-semibold mb-2">⚠ Advertencias</h3>

            {total > 100 ? (
              <p className="text-red-400 text-sm">
                Has gastado bastante hoy
              </p>
            ) : (
              <p className="text-slate-400 text-sm">
                Todo bajo control
              </p>
            )}
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
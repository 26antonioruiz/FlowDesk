import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import ExpensesChart from "./ExpensesChart";

export default function Expenses() {
  const { expenses, fetchExpenses } = useAppStore();

  const [month, setMonth] = useState("");

  // 🔥 CARGAR DESDE SUPABASE
  useEffect(() => {
    fetchExpenses();
  }, []);

  // 📅 FILTRAR POR MES
  const filtered = month
    ? expenses.filter(
        (e) =>
          new Date(e.date).getMonth() === Number(month)
      )
    : expenses;

  // 💰 TOTAL
  const total = filtered.reduce((acc, e) => acc + Number(e.amount), 0);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gastos</h2>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-slate-800 px-3 py-2 rounded-lg border border-slate-700"
        >
          <option value="">Todos</option>
          <option value="0">Enero</option>
          <option value="1">Febrero</option>
          <option value="2">Marzo</option>
          <option value="3">Abril</option>
          <option value="4">Mayo</option>
          <option value="5">Junio</option>
          <option value="6">Julio</option>
          <option value="7">Agosto</option>
          <option value="8">Septiembre</option>
          <option value="9">Octubre</option>
          <option value="10">Noviembre</option>
          <option value="11">Diciembre</option>
        </select>
      </div>

      {/* 💰 TOTAL */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-5 rounded-2xl border border-slate-700">
        <p className="text-sm text-slate-400">Total</p>
        <p className="text-2xl font-bold">{total} €</p>
      </div>

      {/* 📊 GRÁFICA */}
      <div className="bg-slate-800/70 backdrop-blur p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/40 transition">
        <ExpensesChart expenses={filtered} />
      </div>

      {/* 📋 LISTA */}
      <div className="bg-slate-800/70 backdrop-blur p-6 rounded-2xl border border-slate-700 space-y-3">
        {filtered.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center border-b border-slate-700 pb-2 last:border-none"
          >
            <span className="text-slate-300">{e.category}</span>
            <span className="font-semibold">{e.amount} €</span>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-4">
            No hay gastos en este periodo
          </p>
        )}
      </div>

    </div>
  );
}
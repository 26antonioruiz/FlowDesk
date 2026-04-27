import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
};

interface Props {
  expenses: Expense[];
}

export default function ExpensesChart({ expenses }: Props) {

  // 🔥 ORDENAR POR MES REAL
  const monthly: Record<number, number> = {};

  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    if (!monthly[month]) monthly[month] = 0;
    monthly[month] += Number(e.amount);
  });

  const monthNames = [
    "Ene","Feb","Mar","Abr","May","Jun",
    "Jul","Ago","Sep","Oct","Nov","Dic"
  ];

  const sortedMonths = Object.keys(monthly)
    .map(Number)
    .sort((a, b) => a - b);

  const lineData = {
    labels: sortedMonths.map((m) => monthNames[m]),
    datasets: [
      {
        label: "Gastos (€)",
        data: sortedMonths.map((m) => monthly[m]),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  // 🔥 POR CATEGORÍA
  const categories: Record<string, number> = {};

  expenses.forEach((e) => {
    if (!categories[e.category]) categories[e.category] = 0;
    categories[e.category] += Number(e.amount);
  });

  const colors = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#a855f7",
  ];

  const doughnutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  // 🎨 OPCIONES PRO
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#94a3b8",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(148,163,184,0.1)" },
      },
    },
  };

  return (
    <div className="space-y-10">

      {/* 📈 LINEA */}
      <div>
        <p className="text-sm text-slate-400 mb-2">
          Evolución mensual
        </p>
        <Line data={lineData} options={options} />
      </div>

      {/* 🍩 DONUT */}
      <div>
        <p className="text-sm text-slate-400 mb-2">
          Distribución por categoría
        </p>
        <Doughnut data={doughnutData} />
      </div>

    </div>
  );
}
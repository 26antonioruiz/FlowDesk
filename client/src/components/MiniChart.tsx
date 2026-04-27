import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function MiniChart({ expenses }: any) {
  const data = [
    { name: "Comida", value: expenses.filter((e:any)=>e.category==="comida").reduce((a:any,b:any)=>a+b.amount,0) },
    { name: "Transporte", value: expenses.filter((e:any)=>e.category==="transporte").reduce((a:any,b:any)=>a+b.amount,0) },
    { name: "Ocio", value: expenses.filter((e:any)=>e.category==="ocio").reduce((a:any,b:any)=>a+b.amount,0) },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-3">Gastos</h2>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value">
            {data.map((_:any, i:number) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default function DashboardCard({ dashboard }: any) {
  return (
    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-gray-500">Total gastos</p>
        <h2 className="text-2xl font-bold">
          {dashboard.totalExpenses} €
        </h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-gray-500">Tareas</p>
        <h2 className="text-2xl font-bold">
          {dashboard.completedTasks}/{dashboard.totalTasks}
        </h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow text-center">
        <p className="text-gray-500">Eventos</p>
        <h2 className="text-2xl font-bold">
          {dashboard.upcomingEvents}
        </h2>
      </div>

    </div>
  );
}
import CalendarView from "./CalendarView";

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Calendario</h2>

      <div className="bg-slate-800 p-6 rounded-2xl">
        <CalendarView full />
      </div>
    </div>
  );
}
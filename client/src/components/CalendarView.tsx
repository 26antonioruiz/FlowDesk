import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppStore } from "../store/useAppStore";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-CA");

export default function CalendarView({ full = false }: any) {
  const { selectedDate, setSelectedDate, tasks, expenses } = useAppStore();

  const getDayInfo = (date: Date) => {
    const day = formatDate(date);

    return {
      hasTasks: tasks.some((t) => t.date === day),
      hasExpenses: expenses.some((e) => e.date === day),
    };
  };

  return (
    <div className={full ? "w-full flex justify-center" : "scale-95"}>

      <Calendar
        value={new Date(selectedDate)}

        onChange={(value) => {
          const date = Array.isArray(value) ? value[0] : value;
          if (!date) return;
          setSelectedDate(formatDate(date));
        }}

        // 🔥 ESTILO DE DÍA ACTIVO
        tileClassName={({ date }) => {
          const day = formatDate(date);

          if (day === selectedDate) {
            return "bg-indigo-600 text-white rounded-lg";
          }

          return "";
        }}

        // 🔥 PUNTOS INTELIGENTES
        tileContent={({ date }) => {
          const { hasTasks, hasExpenses } = getDayInfo(date);

          return (
            <div className="flex justify-center gap-1 mt-1">

              {hasTasks && (
                <div className="w-2 h-2 bg-indigo-400 rounded-full" />
              )}

              {hasExpenses && (
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
              )}

            </div>
          );
        }}

      />
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* NAV */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">FlowDesk</h1>

        {/* 🔥 CAMBIO */}
        <Link
          to="/login"
          className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500 transition"
        >
          Entrar
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">

        <h2 className="text-6xl font-bold leading-tight mb-6">
          Organiza tu vida <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            en un solo lugar
          </span>
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
          FlowDesk combina tareas, gastos y planificación para que tengas control total de tu día.
        </p>

        {/* 🔥 CAMBIO */}
        <Link
          to="/login"
          className="bg-indigo-600 px-8 py-4 rounded-xl text-lg hover:bg-indigo-500 transition shadow-lg"
        >
          Empezar ahora
        </Link>

      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">

        <Feature title="Gestión de tareas" text="Organiza tu día de forma clara y sencilla." />
        <Feature title="Control de gastos" text="Visualiza y gestiona tu dinero fácilmente." />
        <Feature title="Calendario integrado" text="Planifica tu tiempo de forma inteligente." />

      </section>

    </div>
  );
}

function Feature({ title, text }: any) {
  return (
    <div className="glass p-6 rounded-2xl border border-slate-700 hover:scale-105 transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400">{text}</p>
    </div>
  );
}
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Expenses from "./components/Expenses";
import CalendarPage from "./components/CalendarPage";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import PageWrapper from "./components/PageWrapper";

import { supabase } from "./lib/supabase";

function AppContent() {
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-[#0f172a]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl top-[-200px] left-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl bottom-[-200px] right-[-200px]" />
      </div>

      {/* 🔥 NAVBAR SIEMPRE VISIBLE */}
      <div className="flex justify-center py-6">
        <div className="flex items-center gap-8 bg-slate-800/80 backdrop-blur px-10 py-4 rounded-2xl border border-slate-700 shadow-lg">

          {/* LOGO → LANDING */}
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500" />
            FlowDesk
          </NavLink>

          {/* LINKS SOLO SI LOGUEADO */}
          {user && (
            <>
              <NavLink to="/inicio">Inicio</NavLink>
              <NavLink to="/tasks">Tareas</NavLink>
              <NavLink to="/expenses">Gastos</NavLink>
              <NavLink to="/calendar">Calendario</NavLink>
            </>
          )}

          {/* DERECHA */}
          <div className="ml-6 flex items-center gap-4">

            {!user ? (
              <>
                <NavLink to="/login" className="hover:text-indigo-300">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-indigo-600 px-4 py-1 rounded-lg hover:bg-indigo-500"
                >
                  Registro
                </NavLink>
              </>
            ) : (
              <>
                <span className="text-sm text-slate-400">
                  {user.email}
                </span>

                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </div>

      {/* RUTAS */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* LANDING */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Landing />
              </PageWrapper>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              !user ? (
                <PageWrapper>
                  <Login />
                </PageWrapper>
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={
              !user ? (
                <PageWrapper>
                  <Register />
                </PageWrapper>
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />

          {/* PROTEGIDAS */}
          <Route
            path="/inicio"
            element={
              user ? (
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/tasks"
            element={
              user ? (
                <PageWrapper>
                  <Tasks />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/expenses"
            element={
              user ? (
                <PageWrapper>
                  <Expenses />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/calendar"
            element={
              user ? (
                <PageWrapper>
                  <CalendarPage />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
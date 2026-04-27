import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    if (!email || !password) {
      alert("Completa todos los campos");
      return;
    }

    if (mode === "login") {
      // 🔐 LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      }
    } else {
      // 📝 REGISTER
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Cuenta creada. Revisa tu email 📩");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="bg-[#0f172a] p-8 rounded-2xl w-80 border border-indigo-500/20 shadow-xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-2">
            <span className="font-bold text-lg">F</span>
          </div>
          <h2 className="text-xl font-semibold">
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>
        </div>

        {/* INPUT EMAIL */}
        <input
          className="w-full mb-3 p-3 rounded-lg bg-[#020617] border border-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* INPUT PASSWORD */}
        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-[#020617] border border-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BOTÓN */}
        <button
          onClick={handle}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg"
        >
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>

        {/* SWITCH */}
        <p
          className="text-sm text-center mt-4 text-indigo-400 cursor-pointer"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "¿No tienes cuenta? Crear cuenta"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </p>

      </div>
    </div>
  );
}
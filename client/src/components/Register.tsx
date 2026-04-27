import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Cuenta creada correctamente 📩");
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
            Crear cuenta
          </h2>
        </div>

        {/* EMAIL */}
        <input
          className="w-full mb-3 p-3 rounded-lg bg-[#020617] border border-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full mb-3 p-3 rounded-lg bg-[#020617] border border-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM */}
        <input
          type="password"
          className="w-full mb-4 p-3 rounded-lg bg-[#020617] border border-slate-700 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          placeholder="Confirmar password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* BOTÓN */}
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg"
        >
          Crear cuenta
        </button>

      </div>
    </div>
  );
}
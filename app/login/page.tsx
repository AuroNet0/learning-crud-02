"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/infra/database";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Erro ao logar" + error);
      }

      if (data.session) {
        const accessToken = data.session.access_token;

        Cookies.set("auth_token", accessToken, { expires: 7, secure: true });

        router.push("/");
      }

      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
            LEARNING <span className="text-green-600">CRUD</span>
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Faça login na sua conta.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Senha
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2"
          >
            Login
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm mt-2">
            Não possui uma conta?{" "}
            <a href="/register" className="text-blue-600 text-sm mt-2">
              Inscreva-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

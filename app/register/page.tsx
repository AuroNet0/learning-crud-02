"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/infra/database";
import Cookies from "js-cookie";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      const { data, error } = await auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (password !== passwordConfirm) {
        alert("As senhas devem ser iguais!");
        return
      }

      if (error) {
        alert("Erro ao cadastrar nova conta" + error.message);
      }

      if (data.user && !data.session) {
        alert(
          "Cadastro realizado! Verifiqueseu e-mail para confirmar a conta.",
        );
        router.push("/login");
        return;
      }

      if (data.session) {
        Cookies.set("auth_token", data.session.access_token, {
          expires: 7,
          secure: true,
        });

        router.push("/");
      }

      router.push("/login");
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
            Cadastrar uma nova conta.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="username"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Email <label className="text-red-800">*</label>
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Senha <label className="text-red-800">*</label>
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">
              Confirmar senha <label className="text-red-800">*</label>
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-600"
              type="password"
              placeholder="••••••••"
              value={passwordConfirm}
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            onClick={register}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-2"
          >
            Registrar
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm mt-2">
            Já possui uma conta?{" "}
            <a href="/login" className="text-blue-600 text-sm mt-2">
              Logar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Toast } from "@/components/ui/toast";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginFormData>();
  const [error, setError] = useState("");

  const onSubmit = (data: LoginFormData) => {
    // Simple auth mock
    if (data.email === "admin@demo.com" && data.password === "admin") {
      localStorage.setItem("isAuth", "true");
      router.push("/");
    } else {
      setError("Identifiants invalides");
      setFormError("email", { type: "manual", message: "" });
      setFormError("password", { type: "manual", message: "" });
    }
  };

  return (
    <div className="flex flex-1 grow w-full h-full items-center justify-center bg-[#F3F4FB] rounded-3xl min-h-screen">
      <Toast message={error} show={!!error} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-12 items-center"
        noValidate
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <Image
            src="/img/logo.png"
            alt="Logo Ministère"
            width={140}
            height={140}
          />
        </div>
        <h2 className="text-2xl font-semibold text-center">Bienvenue</h2>
        <p className="text-gray-500 text-center text-sm -mt-4 mb-2">
          Veuillez remplir les champs ci-dessous pour vous connecter
        </p>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-[#F3F4FB] border-none focus:ring-2 focus:ring-blue-700 px-4 py-3 text-sm outline-none"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format d'email invalide",
              },
            })}
          />
          <div className="h-4">
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="password" className="text-xs text-gray-700 ">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            className="w-full rounded-md bg-[#F3F4FB] border-none focus:ring-2 focus:ring-blue-700 px-3 py-4 text-sm outline-none"
            {...register("password", {
              required: "Le mot de passe est requis",
            })}
          />
          <div className="h-4">
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Link href="#" className="text-xs text-blue-700 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-[#0055A6] text-white rounded-lg font-medium shadow hover:bg-[#0055A6]/95 transition text-base"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

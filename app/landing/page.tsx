import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Bienvenue sur CodMine Dashboard</h1>
      <p className="text-lg text-gray-600">
        Votre plateforme de gestion centralisée
      </p>
      <Link href="/login">
        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Login
        </button>
      </Link>
    </div>
  );
}

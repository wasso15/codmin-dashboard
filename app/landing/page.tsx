import Image from "next/image";
import FeatureCard from "@/components/FeatureCard";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-1 grow w-full h-full items-center justify-center bg-[#F3F4FB] rounded-3xl overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-6 md:p-12">
        {/* Colonne gauche */}
        <div
          className="flex-1 flex flex-col items-start gap-6 max-w-md animate-fade-in-left"
          style={{ animationDuration: "900ms" }}
        >
          <div className="flex items-center gap-4">
            <Image
              src="/img/logo.png"
              alt="Logo Ministère"
              width={264}
              height={80}
              className="animate-fade-in"
              style={{ animationDuration: "1200ms" }}
            />
          </div>
          <h1
            className="text-xl md:text-2xl font-semibold text-[#0055A6] leading-tight animate-fade-in"
            style={{
              animationDuration: "1200ms",
              animationDelay: "200ms",
              animationFillMode: "both",
            }}
          >
            Bienvenue
            <br />
            <span className="text-[#0055A6]">
              sur le Tableau de Bord de Suivi
              <br />
              du Code Minier Numérique
            </span>
          </h1>
          <p
            className="text-gray-600 text-[12px] md:text-[14px] animate-fade-in"
            style={{
              animationDuration: "1200ms",
              animationDelay: "400ms",
              animationFillMode: "both",
            }}
          >
            La plateforme permet de suivre en temps réel les téléchargements et
            la répartition géographique des utilisateurs. Elle offre un aperçu
            des fonctionnalités les plus utilisées et envoie des rapports
            périodiques.
          </p>
          <Link
            href="/login"
            className="animate-fade-in"
            style={{
              animationDuration: "1200ms",
              animationDelay: "600ms",
              animationFillMode: "both",
            }}
          >
            <button className="mt-2 px-8 py-3 text-sm bg-[#0055A6] text-white rounded-lg shadow hover:bg-[#0055A6]/95 cursor-pointer transition">
              Commencer
            </button>
          </Link>
        </div>
        {/* Colonne droite */}
        <div
          className="flex-1 flex flex-col gap-8 w-full max-w-md animate-fade-in-right"
          style={{ animationDuration: "900ms" }}
        >
          <FeatureCard
            icon="/img/stats.png"
            alt="Statistiques"
            title="Statistiques de téléchargement (pays, périodes)"
            description="Suivez le nombre de téléchargements selon les pays et les périodes."
            className="animate-fade-in-up"
            style={{
              animationDuration: "1000ms",
              animationDelay: "200ms",
              animationFillMode: "both",
            }}
          />
          <FeatureCard
            icon="/img/map.png"
            alt="Carte"
            title="Carte interactive mondiale"
            description="Visualisez la répartition géographique de vos utilisateurs en un coup d'œil."
            className="animate-fade-in-up"
            style={{
              animationDuration: "1000ms",
              animationDelay: "400ms",
              animationFillMode: "both",
            }}
          />
          <FeatureCard
            icon="/img/export.png"
            alt="Export"
            title="Export des rapports (.csv/.pdf)"
            description="Téléchargez vos données d'analyse sous format CSV ou PDF."
            className="animate-fade-in-up"
            style={{
              animationDuration: "1000ms",
              animationDelay: "600ms",
              animationFillMode: "both",
            }}
          />
        </div>
      </div>
    </div>
  );
}

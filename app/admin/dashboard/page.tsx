import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardBarChart from "@/components/DashboardBarChart";
import ProvinceBarChart from "@/components/ProvinceBarChart";
import { Button } from "@/components/ui/button";
import ExportButton from "@/components/ExportButton";
import Image from "next/image";

const stats = [
  {
    icon: "/img/stats.png",
    alt: "Téléchargements",
    title: "Nombre total de téléchargements",
    value: "216 546",
  },
  {
    icon: "/img/stats.png",
    alt: "Téléchargements pays",
    title: "Téléchargements par pays",
    value: "36 000",
    badge: "Congo",
  },
  {
    icon: "/img/stats.png",
    alt: "Temps moyen",
    title: "Temps moyen de lecture",
    value: "3 min",
  },
  {
    icon: "/img/stats.png",
    alt: "Téléchargements plateforme",
    title: "Téléchargements par plateforme",
    value: "45 000",
    badge: "Android",
  },
];

const provinceData = [
  { name: "Kinshasa", value: 2600 },
  { name: "Equateur", value: 4000 },
  { name: "Mongala", value: 1000 },
  { name: "Kasaï", value: 1800 },
  { name: "Kasaï-Central", value: 1450 },
  { name: "Kasaï-Oriental", value: 1200 },
  { name: "Haut-Katanga", value: 2300 },
  { name: "Lomami", value: 900 },
  { name: "Ituri", value: 1600 },
  // { name: "Sud-Kivu", value: 2100 },
  // { name: "Nord-Kivu", value: 2200 },
  // { name: "Maniema", value: 800 },
  // { name: "Tshopo", value: 1100 },
  // { name: "Bas-Uele", value: 700 },
  // { name: "Haut-Uele", value: 950 },
  // { name: "Tanganyika", value: 1050 },
  // { name: "Kwilu", value: 1250 },
  // { name: "Kwango", value: 650 },
  // { name: "Mai-Ndombe", value: 780 },
  // { name: "Tshuapa", value: 500 },
];

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white rounded-2xl ">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl  p-8 flex flex-col   ">
            <div className="flex items-center  gap-2">
              <div className="bg-[#0055A6] p-2 rounded-full">
                <Image
                  src={stat.icon}
                  alt={stat.alt}
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </div>

              <span className="text-xs text-gray-500 font-medium">
                {stat.title}
              </span>
            </div>
            <div className="flex  gap-2 items-center ml-[45px]">
              <span className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </span>
              {stat.badge && (
                <span className="bg-blue-100 text-blue-700 text-xs rounded px-2 py-0.5">
                  {stat.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques et widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique principal */}
        <div className="bg-white rounded-2xl p-6 col-span-2 flex flex-col">
          <div>
            <DashboardBarChart />
          </div>
        </div>
        {/* Widgets latéraux */}
        <div className="flex flex-col gap-6">
          <ExportButton
            className="bg-[#005CB9] text-white w-full py-7 rounded-xl shadow"
            size="lg"
          />
          <div className="bg-[#005CB9] grow rounded-2xl p-8 text-white flex flex-col gap-2 shadow">
            <Button
              variant="outline"
              className="mb-2 w-fit bg-white text-[#005CB9] text-xs rounded-xl px-3 py-1"
            >
              L&apos;article le plus consulté
            </Button>
            <div className="text-xs font-bold mb-1 mt-2">Article 1</div>
            <div className="text-[13px] text-justify ">
              Le présent Code a pour objet de régir les activités minières sur
              toute l&apos;étendue du territoire national, à savoir : la
              prospection, la recherche, l&apos;exploitation, le traitement, le
              transport, la transformations, et la commercialisation des
              substances minérales. Il a également pour but de promouvoir les
              investissements dans le secteur minier; de garantir la
              transparence, la bonne gouvernance et la gestion durable des
              ressources minières, de protéger l&apos;environnement et les
              droits des communautés locales…
            </div>
          </div>
        </div>
      </div>
      {/* Tableau et graphique utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 col-span-2 flex flex-col">
          <div className="text-sm text-gray-500 mb-2">
            Téléchargement par province en RDC
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Nom de la province</th>
                  <th className="text-left py-2">Nbre de téléchargements</th>
                </tr>
              </thead>
              <tbody>
                {provinceData.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 font-medium">{row.name}</td>
                    <td className="py-2">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-2xl  flex flex-col">
          <div className="">
            <ProvinceBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

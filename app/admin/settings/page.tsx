import { Button } from "@/components/ui/button";
import React from "react";

const users = [
  {
    lastname: "Wasso",
    middlename: "Mbiya",
    firstname: "Guylain",
    gender: "Masculin",
    position: "IT",
    department: "Informatique",
    email: "g.wasso@minesrdc.com",
  },
  {
    lastname: "Wasso",
    middlename: "Mbiya",
    firstname: "Guylain",
    gender: "Masculin",
    position: "IT",
    department: "Informatique",
    email: "g.wasso@minesrdc.com",
  },
  {
    lastname: "Wasso",
    middlename: "Mbiya",
    firstname: "Guylain",
    gender: "Masculin",
    position: "IT",
    department: "Informatique",
    email: "g.wasso@minesrdc.com",
  },
  {
    lastname: "Wasso",
    middlename: "Mbiya",
    firstname: "Guylain",
    gender: "Masculin",
    position: "IT",
    department: "Informatique",
    email: "g.wasso@minesrdc.com",
  },
  {
    lastname: "Wasso",
    middlename: "Mbiya",
    firstname: "Guylain",
    gender: "Masculin",
    position: "IT",
    department: "Informatique",
    email: "g.wasso@minesrdc.com",
  },
  //   {
  //     lastname: "Wasso",
  //     middlename: "Mbiya",
  //     firstname: "Guylain",
  //     gender: "Masculin",
  //     position: "IT",
  //     department: "Informatique",
  //     email: "g.wasso@minesrdc.com",
  //   },
  //   {
  //     lastname: "Wasso",
  //     middlename: "Mbiya",
  //     firstname: "Guylain",
  //     gender: "Masculin",
  //     position: "IT",
  //     department: "Informatique",
  //     email: "g.wasso@minesrdc.com",
  //   },
];

export default function SettingsPage() {
  return (
    <div className="bg-[#F4F6FB] p-0 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Paramètres
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-4">
          {/* Bloc infos compte */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#F0F0F0]">
            <div className="font-semibold text-lg mb-2">
              Informations du compte
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Email address
                </div>
                <div className="text-xs text-gray-500">
                  Si vous voulez changer votre addresse email, veuillez{" "}
                  <a href="#" className="text-[#005CB9] underline">
                    nous contacter
                  </a>{" "}
                  s&apos;il vous plaît
                </div>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <span className="text-base font-semibold text-gray-700">
                  ad****@mines.com
                </span>
              </div>
            </div>
          </div>
          {/* Bloc sécurité */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-[#F0F0F0]">
            <div className="font-semibold text-lg mb-2">
              Paramètre de Sécurité
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </div>
                <div className="text-xs text-gray-500">
                  Votre mot de passe doit etre efficace pour une meilleure
                  protection
                </div>
              </div>
              <div className="text-right mt-4 md:mt-0 flex items-center gap-4">
                <span className="text-lg font-bold tracking-widest">
                  **************
                </span>
                <Button
                  variant="outline"
                  className="border-[#005CB9] text-[#005CB9] rounded-xl px-4 py-2 text-xs font-medium hover:bg-[#e6f0fa]"
                >
                  Changer le mot de passe
                </Button>
              </div>
            </div>
          </div>
          {/* Tableau utilisateurs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0F0F0]">
            <div className="font-semibold text-lg mb-4">
              Utilisateurs Ajoutés
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-500 text-xs">
                    <th className="text-left py-2 font-medium">Nom</th>
                    <th className="text-left py-2 font-medium">Post-nom</th>
                    <th className="text-left py-2 font-medium">Prénom</th>
                    <th className="text-left py-2 font-medium">Sexe</th>
                    <th className="text-left py-2 font-medium">Position</th>
                    <th className="text-left py-2 font-medium">Département</th>
                    <th className="text-left py-2 font-medium">E-mail</th>
                    <th className="text-left py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className="border-b last:border-0 text-xs">
                      <td className="py-2">{u.lastname}</td>
                      <td className="py-2">{u.middlename}</td>
                      <td className="py-2">{u.firstname}</td>
                      <td className="py-2">{u.gender}</td>
                      <td className="py-2">{u.position}</td>
                      <td className="py-2">{u.department}</td>
                      <td className="py-2">{u.email}</td>
                      <td className="py-2">
                        <span className="text-2xl text-[#005CB9] cursor-pointer select-none">
                          &#8230;
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <Button className="bg-[#005CB9] text-white rounded-md px-8 py-6 shadow-md text-xs  hover:bg-[#004a99] transition-all w-full md:w-full">
            + Ajouter un utilisateur
          </Button>
        </div>
      </div>
    </div>
  );
}

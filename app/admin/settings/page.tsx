"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

type User = {
  lastname: string;
  middlename: string;
  firstname: string;
  gender: string;
  position: string;
  department: string;
  email: string;
};


export default function SettingsPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    // Charger les utilisateurs réels depuis l'API
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/users");
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (e) {
        // Optionnel: afficher une erreur ou fallback
      }
    };
    fetchUsers();
  }, []);


  console.log("Utilisateurs chargés:", users);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    lastname: "",
    middlename: "",
    firstname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Utilisateur",
    gender: "Masculin",
    position: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          middlename: formData.middlename,
          lastname: formData.lastname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
          genre: formData.gender,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erreur lors de l'ajout");
      } else {
        setSuccess("Utilisateur ajouté avec succès");
        // Ajout immédiat dans le tableau local
        setUsers([
          ...users,
          {
            lastname: formData.lastname,
            middlename: formData.middlename,
            firstname: formData.firstname,
            gender: formData.gender,
            position: formData.position,
            department: formData.department,
            email: formData.email,
          },
        ]);


        setShowForm(false);
        setFormData({
          lastname: "",
          middlename: "",
          firstname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Utilisateur",
          gender: "Masculin",
          position: "",
          department: "",
        });
      }
    } catch (err) {
      setError("Erreur réseau ou serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F6FB] p-0 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Paramètres
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
                  Votre mot de passe doit être efficace pour une meilleure
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
            <div className="font-semibold text-lg mb-4">Utilisateurs Ajoutés</div>
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

        <div className="md:col-span-2 flex flex-col items-center">
            <Button
            className="bg-[#005CB9] text-white rounded-md px-8 py-6 shadow-md text-xs hover:bg-[#004a99] transition-all w-full md:w-full"
            onClick={() => setShowForm(true)}
          >
            + Ajouter un utilisateur
          </Button>
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-md border border-[#F0F0F0] mt-9 px-6 py-4 mb-4 w-full"
            >
              <div className="mt-8 px-3 flex flex-col">
                <input
                  type="text"
                  name="lastname"
                  placeholder="Nom"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="middlename"
                  placeholder="Post-nom"
                  value={formData.middlename}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Prénom"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                >
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="text"
                  name="department"
                  placeholder="Département"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                  required
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mb-4"
                >
                  <option value="Utilisateur">Utilisateur</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
              {success && <div className="text-green-600 text-xs mb-2">{success}</div>}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="px-4 py-2 text-xs"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-[#005CB9] text-white px-4 py-2 text-xs"
                  disabled={loading}
                >
                  {loading ? "Ajout..." : "Ajouter"}
                </Button>
              </div>
            </form>
          )}
        
        </div>
      </div>
    </div>
  );
}

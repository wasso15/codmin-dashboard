"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share, FileText, FileSpreadsheet } from "lucide-react";
import Toast from "./Toast";

interface ExportButtonProps {
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

interface ExportOptions {
  format: "csv" | "json" | "excel" | "pdf";
  dataType: "all" | "stats" | "provinces" | "monthly";
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

interface FileData {
  content: string;
  filename: string;
  contentType: string;
}

export default function ExportButton({
  className = "",
  variant = "default",
  size = "default",
}: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const handleExport = async (options: ExportOptions) => {
    setIsLoading(true);
    setShowOptions(false);

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur lors de l'export");
      }

      // Créer un blob et télécharger le fichier
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Extraire le nom de fichier depuis les headers
      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "")
        : `export_${new Date().toISOString().split("T")[0]}.${options.format}`;

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Afficher le message de succès
      setToast({
        show: true,
        message: `Export réussi ! Fichier ${filename} téléchargé.`,
        type: "success",
      });
    } catch (error) {
      console.error("Erreur d'export:", error);
      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'export. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAll = async () => {
    setIsLoading(true);
    setShowOptions(false);

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exportAll: true }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur lors de l'export");
      }

      const data = await response.json();

      if (data.success && data.formats) {
        // Télécharger tous les fichiers
        const downloadPromises = Object.entries(data.formats).map(
          async ([, fileData]) => {
            const typedFileData = fileData as FileData;
            const blob = new Blob([typedFileData.content], {
              type: typedFileData.contentType,
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = typedFileData.filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }
        );

        await Promise.all(downloadPromises);

        setToast({
          show: true,
          message:
            "Export réussi ! Tous les fichiers ont été téléchargés (CSV, Excel, HTML, JSON).",
          type: "success",
        });
      } else {
        throw new Error("Format de réponse invalide");
      }
    } catch (error) {
      console.error("Erreur d'export multiple:", error);
      setToast({
        show: true,
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'export multiple. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportOptions = [
    // {
    //   label: "Export complet (tous formats)",
    //   action: "exportAll" as const,
    //   icon: FileSpreadsheet,
    //   description: "Télécharge CSV, Excel, HTML et JSON en un clic",
    //   isSpecial: true,
    // },
    {
      label: "Rapport complet (CSV)",
      format: "csv" as const,
      dataType: "all" as const,
      icon: FileSpreadsheet,
      description: "Toutes les données du tableau de bord",
      isSpecial: false,
    },
    {
      label: "Rapport complet (Excel)",
      format: "excel" as const,
      dataType: "all" as const,
      icon: FileSpreadsheet,
      description: "Format Excel avec plusieurs onglets",
      isSpecial: false,
    },
    // {
    //   label: "Rapport complet (HTML)",
    //   format: "pdf" as const,
    //   dataType: "all" as const,
    //   icon: FileText,
    //   description: "Rapport formaté pour impression",
    //   isSpecial: false,
    // },
    // {
    //   label: "Statistiques principales (CSV)",
    //   format: "csv" as const,
    //   dataType: "stats" as const,
    //   icon: FileText,
    //   description: "Téléchargements totaux, par pays, temps de lecture",
    //   isSpecial: false,
    // },
    {
      label: "Téléchargements par province (CSV)",
      format: "csv" as const,
      dataType: "provinces" as const,
      icon: FileSpreadsheet,
      description: "Données de téléchargement par province en RDC",
      isSpecial: false,
    },
    {
      label: "Données mensuelles (CSV)",
      format: "csv" as const,   
      dataType: "monthly" as const,
      icon: FileText,
      description: "Évolution des téléchargements par mois",
      isSpecial: false,
    },
    // {
    //   label: "Données JSON complètes",
    //   format: "json" as const,
    //   dataType: "all" as const,
    //   icon: FileText,
    //   description: "Format JSON pour traitement automatisé",
    //   isSpecial: false,
    // },
  ];

  return (
    <>
      <div className="relative">
        <Button
          onClick={() => setShowOptions(!showOptions)}
          className={`${className} relative`}
          variant={variant}
          size={size}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Export en cours...
            </>
          ) : (
            <>
              <Share size={20} className="mr-2" />
              Exporter le rapport
            </>
          )}
        </Button>

        {showOptions && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">
                Choisir le format d&apos;export
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Sélectionnez le type de données à exporter
              </p>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {exportOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if ("action" in option && option.action === "exportAll") {
                        handleExportAll();
                      } else if ("format" in option && "dataType" in option) {
                        handleExport(option as ExportOptions);
                      }
                    }}
                    className={`w-full flex items-start gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left ${
                      option.isSpecial
                        ? "bg-blue-50 border border-blue-200"
                        : ""
                    }`}
                    disabled={isLoading}
                  >
                    <IconComponent
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${
                        option.isSpecial ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          option.isSpecial ? "text-blue-900" : ""
                        }`}
                      >
                        {option.label}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          option.isSpecial ? "text-blue-700" : "text-gray-500"
                        }`}
                      >
                        {option.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Overlay pour fermer les options en cliquant à l'extérieur */}
        {showOptions && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Données simulées (à remplacer par des données réelles de votre base de données)
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
];

const monthlyData = [
  { month: "January", downloads: 186 },
  { month: "February", downloads: 305 },
  { month: "March", downloads: 237 },
  { month: "April", downloads: 73 },
  { month: "May", downloads: 209 },
  { month: "June", downloads: 214 },
  { month: "July", downloads: 198 },
  { month: "August", downloads: 221 },
  { month: "September", downloads: 189 },
  { month: "October", downloads: 265 },
  { month: "November", downloads: 240 },
  { month: "December", downloads: 278 },
];

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const {
      format = "csv",
      dataType = "all",
      exportAll = false,
    } = await request.json();

    // Si exportAll est true, on exporte tout en CSV par défaut
    if (exportAll) {
      return handleExportAll();
    }

    let content = "";
    let filename = "";
    let contentType = "";

    switch (dataType) {
      case "stats":
        content = generateStatsContent(format);
        filename = "statistiques_dashboard";
        break;
      case "provinces":
        content = generateProvincesContent(format);
        filename = "telechargements_par_province";
        break;
      case "monthly":
        content = generateMonthlyContent(format);
        filename = "telechargements_mensuels";
        break;
      case "all":
      default:
        content = generateAllDataContent(format);
        filename = "rapport_complet_dashboard";
        break;
    }

    // Définir le type de contenu et l'extension selon le format
    switch (format) {
      case "csv":
        contentType = "text/csv; charset=utf-8";
        filename += ".csv";
        break;
      case "excel":
        contentType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        filename += ".xlsx";
        break;
      case "pdf":
        contentType = "text/html; charset=utf-8";
        filename += ".html";
        break;
      case "json":
        contentType = "application/json; charset=utf-8";
        filename += ".json";
        break;
      default:
        return NextResponse.json(
          { error: "Format non supporté" },
          { status: 400 }
        );
    }

    const dateStr = new Date().toISOString().split("T")[0];
    const finalFilename = `${filename}_${dateStr}`;

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${finalFilename}"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'export:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'export des données" },
      { status: 500 }
    );
  }
}

// Fonction pour exporter tous les formats en une fois
async function handleExportAll() {
  const dateStr = new Date().toISOString().split("T")[0];

  // Générer tous les formats
  const csvContent = generateAllDataContent("csv");
  const excelContent = generateAllDataContent("excel");
  const pdfContent = generateAllDataContent("pdf");
  const jsonContent = generateAllDataContent("json");

  // Créer un objet avec tous les formats
  const allFormats = {
    csv: {
      content: csvContent,
      filename: `rapport_complet_dashboard_${dateStr}.csv`,
      contentType: "text/csv; charset=utf-8",
    },
    excel: {
      content: excelContent,
      filename: `rapport_complet_dashboard_${dateStr}.xlsx`,
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    pdf: {
      content: pdfContent,
      filename: `rapport_complet_dashboard_${dateStr}.html`,
      contentType: "text/html; charset=utf-8",
    },
    json: {
      content: jsonContent,
      filename: `rapport_complet_dashboard_${dateStr}.json`,
      contentType: "application/json; charset=utf-8",
    },
  };

  return NextResponse.json({
    success: true,
    message: "Tous les formats ont été générés",
    formats: allFormats,
    exportDate: new Date().toISOString(),
  });
}

function generateStatsContent(format: string): string {
  switch (format) {
    case "csv":
      return generateStatsCSV();
    case "excel":
      return generateStatsExcel();
    case "pdf":
      return generateStatsPDF();
    case "json":
      return JSON.stringify(stats, null, 2);
    default:
      return generateStatsCSV();
  }
}

function generateProvincesContent(format: string): string {
  switch (format) {
    case "csv":
      return generateProvincesCSV();
    case "excel":
      return generateProvincesExcel();
    case "pdf":
      return generateProvincesPDF();
    case "json":
      return JSON.stringify(provinceData, null, 2);
    default:
      return generateProvincesCSV();
  }
}

function generateMonthlyContent(format: string): string {
  switch (format) {
    case "csv":
      return generateMonthlyCSV();
    case "excel":
      return generateMonthlyExcel();
    case "pdf":
      return generateMonthlyPDF();
    case "json":
      return JSON.stringify(monthlyData, null, 2);
    default:
      return generateMonthlyCSV();
  }
}

function generateAllDataContent(format: string): string {
  switch (format) {
    case "csv":
      return generateAllDataCSV();
    case "excel":
      return generateAllDataExcel();
    case "pdf":
      return generateAllDataPDF();
    case "json":
      return JSON.stringify(
        {
          stats,
          provinceData,
          monthlyData,
          exportDate: new Date().toISOString(),
        },
        null,
        2
      );
    default:
      return generateAllDataCSV();
  }
}

// Fonctions CSV existantes
function generateStatsCSV(): string {
  const headers = ["Titre", "Valeur", "Badge"];
  const rows = stats.map((stat) => [stat.title, stat.value, stat.badge || ""]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
}

function generateProvincesCSV(): string {
  const headers = ["Province", "Nombre de téléchargements"];
  const rows = provinceData.map((province) => [
    province.name,
    province.value.toString(),
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
}

function generateMonthlyCSV(): string {
  const headers = ["Mois", "Téléchargements"];
  const rows = monthlyData.map((data) => [
    data.month,
    data.downloads.toString(),
  ]);

  return [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
}

function generateAllDataCSV(): string {
  const sections = [
    { title: "STATISTIQUES PRINCIPALES", data: generateStatsCSV() },
    { title: "TÉLÉCHARGEMENTS PAR PROVINCE", data: generateProvincesCSV() },
    { title: "TÉLÉCHARGEMENTS MENSUELS", data: generateMonthlyCSV() },
  ];

  return sections
    .map((section) => `\n${section.title}\n${section.data}`)
    .join("\n");
}

// Fonctions Excel (format XML simple pour Excel)
function generateStatsExcel(): string {
  const xml = `<?xml version="1.0"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <worksheet name="Statistiques">
    <row>
      <cell>Titre</cell>
      <cell>Valeur</cell>
      <cell>Badge</cell>
    </row>
    ${stats
      .map(
        (stat) => `
    <row>
      <cell>${stat.title}</cell>
      <cell>${stat.value}</cell>
      <cell>${stat.badge || ""}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
</workbook>`;
  return xml;
}

function generateProvincesExcel(): string {
  const xml = `<?xml version="1.0"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <worksheet name="Provinces">
    <row>
      <cell>Province</cell>
      <cell>Nombre de téléchargements</cell>
    </row>
    ${provinceData
      .map(
        (province) => `
    <row>
      <cell>${province.name}</cell>
      <cell>${province.value}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
</workbook>`;
  return xml;
}

function generateMonthlyExcel(): string {
  const xml = `<?xml version="1.0"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <worksheet name="Mensuel">
    <row>
      <cell>Mois</cell>
      <cell>Téléchargements</cell>
    </row>
    ${monthlyData
      .map(
        (data) => `
    <row>
      <cell>${data.month}</cell>
      <cell>${data.downloads}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
</workbook>`;
  return xml;
}

function generateAllDataExcel(): string {
  const xml = `<?xml version="1.0"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <worksheet name="Statistiques">
    <row>
      <cell>Titre</cell>
      <cell>Valeur</cell>
      <cell>Badge</cell>
    </row>
    ${stats
      .map(
        (stat) => `
    <row>
      <cell>${stat.title}</cell>
      <cell>${stat.value}</cell>
      <cell>${stat.badge || ""}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
  <worksheet name="Provinces">
    <row>
      <cell>Province</cell>
      <cell>Nombre de téléchargements</cell>
    </row>
    ${provinceData
      .map(
        (province) => `
    <row>
      <cell>${province.name}</cell>
      <cell>${province.value}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
  <worksheet name="Mensuel">
    <row>
      <cell>Mois</cell>
      <cell>Téléchargements</cell>
    </row>
    ${monthlyData
      .map(
        (data) => `
    <row>
      <cell>${data.month}</cell>
      <cell>${data.downloads}</cell>
    </row>`
      )
      .join("")}
  </worksheet>
</workbook>`;
  return xml;
}

// Fonctions PDF (format HTML simple qui peut être converti en PDF)
function generateStatsPDF(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Statistiques Dashboard</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin-bottom: 20px;
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #005CB9; 
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) { background-color: #f9f9f9; }
    h1 { 
      color: #005CB9; 
      border-bottom: 2px solid #005CB9;
      padding-bottom: 10px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Statistiques Dashboard</h1>
    <div class="date">Généré le ${new Date().toLocaleDateString("fr-FR")}</div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Titre</th>
        <th>Valeur</th>
        <th>Badge</th>
      </tr>
    </thead>
    <tbody>
      ${stats
        .map(
          (stat) => `
      <tr>
        <td>${stat.title}</td>
        <td><strong>${stat.value}</strong></td>
        <td>${stat.badge || "-"}</td>
      </tr>`
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>`;
}

function generateProvincesPDF(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Téléchargements par Province</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin-bottom: 20px;
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #005CB9; 
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) { background-color: #f9f9f9; }
    h1 { 
      color: #005CB9; 
      border-bottom: 2px solid #005CB9;
      padding-bottom: 10px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Téléchargements par Province</h1>
    <div class="date">Généré le ${new Date().toLocaleDateString("fr-FR")}</div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Province</th>
        <th>Nombre de téléchargements</th>
      </tr>
    </thead>
    <tbody>
      ${provinceData
        .map(
          (province) => `
      <tr>
        <td>${province.name}</td>
        <td><strong>${province.value.toLocaleString()}</strong></td>
      </tr>`
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>`;
}

function generateMonthlyPDF(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Téléchargements Mensuels</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin-bottom: 20px;
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #005CB9; 
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) { background-color: #f9f9f9; }
    h1 { 
      color: #005CB9; 
      border-bottom: 2px solid #005CB9;
      padding-bottom: 10px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Téléchargements Mensuels</h1>
    <div class="date">Généré le ${new Date().toLocaleDateString("fr-FR")}</div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Mois</th>
        <th>Téléchargements</th>
      </tr>
    </thead>
    <tbody>
      ${monthlyData
        .map(
          (data) => `
      <tr>
        <td>${data.month}</td>
        <td><strong>${data.downloads.toLocaleString()}</strong></td>
      </tr>`
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>`;
}

function generateAllDataPDF(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rapport Complet Dashboard</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 20px; 
      line-height: 1.6;
      color: #333;
    }
    table { 
      border-collapse: collapse; 
      width: 100%; 
      margin-bottom: 30px;
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #005CB9; 
      color: white;
      font-weight: bold;
    }
    tr:nth-child(even) { background-color: #f9f9f9; }
    h1, h2 { 
      color: #005CB9; 
    }
    h1 {
      border-bottom: 2px solid #005CB9;
      padding-bottom: 10px;
      text-align: center;
    }
    h2 {
      border-bottom: 1px solid #005CB9;
      padding-bottom: 5px;
      margin-top: 40px;
    }
    .section { 
      margin-bottom: 40px; 
      page-break-inside: avoid;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .date {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }
    .summary {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Rapport Complet Dashboard</h1>
    <div class="date">Généré le ${new Date().toLocaleDateString("fr-FR")}</div>
  </div>
  
  <div class="summary">
    <h3>Résumé</h3>
    <p>Ce rapport contient toutes les données du tableau de bord CodMine, incluant les statistiques principales, les téléchargements par province et les données mensuelles.</p>
  </div>
  
  <div class="section">
    <h2>Statistiques Principales</h2>
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Valeur</th>
          <th>Badge</th>
        </tr>
      </thead>
      <tbody>
        ${stats
          .map(
            (stat) => `
        <tr>
          <td>${stat.title}</td>
          <td><strong>${stat.value}</strong></td>
          <td>${stat.badge || "-"}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Téléchargements par Province</h2>
    <table>
      <thead>
        <tr>
          <th>Province</th>
          <th>Nombre de téléchargements</th>
        </tr>
      </thead>
      <tbody>
        ${provinceData
          .map(
            (province) => `
        <tr>
          <td>${province.name}</td>
          <td><strong>${province.value.toLocaleString()}</strong></td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Téléchargements Mensuels</h2>
    <table>
      <thead>
        <tr>
          <th>Mois</th>
          <th>Téléchargements</th>
        </tr>
      </thead>
      <tbody>
        ${monthlyData
          .map(
            (data) => `
        <tr>
          <td>${data.month}</td>
          <td><strong>${data.downloads.toLocaleString()}</strong></td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
</body>
</html>`;
}

import "./globals.css";

export const metadata = {
  title: "CodMine Dashboard",
  description:
    "La plateforme permet de suivre en temps réel les téléchargements et la répartition géographique des utilisateurs. Elle offre un aperçu des fonctionnalités les plus utilisées et envoie des rapports périodiques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="antialiased"
        style={{ fontFamily: "CooperHewitt, Arial, sans-serif" }}
      >
        <div className="min-h-screen flex flex-col ">
          <main className="flex-1 flex flex-col h-full">{children}</main>
          <footer className="w-full grid grid-cols-3 h-[8px] text-xs border-t backdrop-blur fixed bottom-0 left-0 z-50">
            <div className="flex items-center justify-center bg-[#2EAAE2] text-white"></div>
            <div className="flex items-center justify-center bg-[#FEF200] text-white"></div>
            <div className="flex items-center justify-center bg-[#D02335] text-white"></div>
          </footer>
        </div>
      </body>
    </html>
  );
}

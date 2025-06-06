import { Sidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface EntrepriseLayoutProps {
  children: ReactNode;
}

export default function EntrepriseLayout({ children }: EntrepriseLayoutProps) {
  return (
    <div className="flex grow gap-6 p-6 bg-[#F3F4FB]">
      <Sidebar />
      <main className="flex-1 pl-[120px]">{children}</main>
    </div>
  );
}

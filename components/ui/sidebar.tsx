"use client";

import { signOut } from "next-auth/react";
import { Settings, HelpCircle, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex flex-col justify-between w-[95px] py-8 bg-[#005CB9] rounded-2xl rounded-bl-2xl select-none px-3 fixed"
      style={{ minWidth: 0, height: "95vh", top: "2.5vh", zIndex: 1000 }}
    >
      {/* Bloc Tableau de bord */}
      <div className="w-full flex flex-col items-center">
        <Link href="/admin/dashboard" className="w-full">
          <div
            className={`rounded-2xl flex flex-col items-center p-3 w-full cursor-pointer transition-colors 
              ${
                pathname === "/admin/dashboard"
                  ? "bg-white text-[#005CB9] "
                  : "bg-transparent text-white hover:bg-[#e6f0fa] hover:text-[#005CB9]"
              }
            `}
          >
            <LayoutDashboard className="h-6 w-6 mb-1" />
            <span className="text-[11px] font-medium text-center leading-tight">
              Dashboard
            </span>
          </div>
        </Link>
      </div>
      {/* Actions en bas */}
      <div className="flex flex-col items-center gap-3.5 w-full">
        <Link href="/admin/settings" className="w-full">
          <div
            className={`rounded-2xl flex flex-col items-center p-3 w-full cursor-pointer transition-colors 
              ${
                pathname === "/admin/settings"
                  ? "bg-white text-[#005CB9] "
                  : "bg-transparent text-white hover:bg-[#e6f0fa] hover:text-[#005CB9]"
              }
            `}
          >
            <Settings className="h-6 w-6 mb-1" />
            <span className="text-[11px] font-medium text-center leading-tight">
              Paramètres
            </span>
          </div>
        </Link>
        <Link href="/admin/help" className="w-full">
          <div
            className={`rounded-2xl flex flex-col items-center p-3 w-full cursor-pointer transition-colors 
              ${
                pathname === "/admin/help"
                  ? "bg-white text-[#005CB9] shadow-md"
                  : "bg-transparent text-white hover:bg-[#e6f0fa] hover:text-[#005CB9]"
              }
            `}
          >
            <HelpCircle className="h-6 w-6 mb-1" />
            <span className="text-[11px] font-medium text-center leading-tight">
              Aide
            </span>
          </div>
        </Link>
        <button
          className="flex flex-col items-center gap-1 text-white hover:text-[#B3D3F6] transition-colors"
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-6 w-6" />
          <span className="text-[11px]">Logout</span>
        </button>
      </div>
    </aside>
  );
}

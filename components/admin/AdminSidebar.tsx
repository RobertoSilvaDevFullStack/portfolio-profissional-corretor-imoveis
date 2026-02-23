"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  HardHat,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projetos", href: "/admin/projetos", icon: Building2 },
  { name: "Regiões", href: "/admin/regioes", icon: MapPin },
  { name: "Construtoras", href: "/admin/construtoras", icon: HardHat },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh(); // Valida se o middleware/layout redireciona
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <span className="text-lg font-bold text-slate-900">Admin Panel</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-blue-700"
                    : "text-slate-400 group-hover:text-slate-500",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ExternalLink className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" />
          Ver Site
        </Link>
        <button
          onClick={handleLogout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
          Sair
        </button>
      </div>
    </div>
  );
}

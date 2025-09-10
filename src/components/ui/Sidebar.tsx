"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  MessageSquare,
  Linkedin,
  Settings,
  FileText,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Leads", icon: Users, href: "/dashboard/leads" },
  { label: "Campaigns", icon: Megaphone, href: "/dashboard/campaigns" },
  { label: "Messages", icon: MessageSquare, badge: "10+", href: "/messages" },
  { label: "Linkedin Accounts", icon: Linkedin, href: "/linkedin" },
];

const settingsItems = [
  { label: "Setting & Billing", icon: Settings, href: "/dashboard/settings" },
];

const adminItems = [
  { label: "Activity logs", icon: Activity, href: "/dashboard/admin/activity" },
  { label: "User logs", icon: FileText, href: "/dashboard/admin/users" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded">Link</div>
        <span className="text-xl font-semibold">Bird</span>
      </div>

      {/* Profile */}
      <div className="px-6 py-4 border-b">
        <div className="font-medium">Kandid</div>
        <div className="text-sm text-gray-500">Personal</div>
      </div>

      {/* Nav Sections */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
          Overview
        </div>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              className={cn(
                "flex items-center justify-between px-6 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100",
                item.active ? "bg-gray-100 font-medium" : "text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                {item.label}
              </div>
              {item.badge && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}

        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
          Settings
        </div>
        {settingsItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex items-center gap-3 px-6 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100 text-gray-700">
              <item.icon size={18} />
              {item.label}
            </div>
          </Link>
        ))}

        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-4">
          Admin Panel
        </div>
        {adminItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div className="flex items-center gap-3 px-6 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100 text-gray-700">
              <item.icon size={18} />
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

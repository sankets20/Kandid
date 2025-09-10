"use client";

import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/ui/LoginDialog";
import { useUiStore } from "@/store/useUiStore";
import Sidebar from "@/components/ui/Sidebar";
import DashboardContent from "@/app/dashboard/page";

export default function Page() {
  const { openLogin, isAuthenticated } = useUiStore();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button onClick={openLogin}>Login</Button>
        <LoginDialog />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <DashboardContent />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  async function logoutUser() {
    const isConfirmed = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (!isConfirmed) return;
    await logout();
  }

  return (
    <Button variant="ghost" className="mr-4" onClick={logoutUser}>
      <LogOut />
    </Button>
  );
}

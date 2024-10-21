"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SubmittButton from "./submit-button";
import { signup } from "./actions";

export default function Signup() {
  async function action(formData: FormData) {
    const res = await signup(formData);

    if (res.error) {
      alert(res.error);
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="John Doe" required name="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                name="password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-4 w-full">
              <SubmittButton />
              <p className="text-right">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-blue-500 underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

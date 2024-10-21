import { getAuthUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();

  if (user) return redirect("/");

  return children;
}

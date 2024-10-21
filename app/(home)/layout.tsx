import { getAuthUser } from "@/lib/session";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();

  if (!user) return redirect("/login");

  return (
    <div>
      <nav className="border text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>Tasks App</div>
          <LogoutButton />
        </div>
      </nav>
      {children}
    </div>
  );
}

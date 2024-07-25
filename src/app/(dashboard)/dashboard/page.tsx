import { cookies } from "next/headers";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect("/sign-in")
  }
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

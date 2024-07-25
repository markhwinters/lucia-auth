import { cookies } from "next/headers";
import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Helper component for rendering menus
const MenuList = ({ items }: { items: { name: string; href: string }[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item.href}>
        <Link href={item.href}>{item.name}</Link>
      </li>
    ))}
  </ul>
);

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

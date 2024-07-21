import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Define menu items
const CommonMenu = [
  { name: "Profile", href: "/dashboard/profile" },
  { name: "Settings", href: "/dashboard/settings" },
];

const UserMenu = [
  { name: "My Tasks", href: "/dashboard/my-tasks" },
  { name: "Messages", href: "/dashboard/messages" },
];

const AdminMenu = [
  { name: "User Management", href: "/dashboard/user-management" },
  { name: "Site Statistics", href: "/dashboard/site-stats" },
  { name: "Content Moderation", href: "/dashboard/content-moderation" },
];

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
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) {
    redirect("/sign-in");
  }

  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      
      {/* Common navigation for all users */}
      <nav>
        <h2>Main Menu</h2>
        <MenuList items={CommonMenu} />
      </nav>

      {/* User-specific content */}
      {user.role === "USER" && (
        <div>
          <h2>User Dashboard</h2>
          <nav>
            <MenuList items={UserMenu} />
          </nav>
          {/* Add more user-specific content here */}
        </div>
      )}

      {/* Admin-specific content */}
      {user.role === "ADMIN" && (
        <div>
          <h2>Admin Dashboard</h2>
          <nav>
            <MenuList items={AdminMenu} />
          </nav>
          {/* Add more admin-specific content here */}
        </div>
      )}
    </div>
  );
}
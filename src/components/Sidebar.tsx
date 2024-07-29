"use client";

import { Bell, CreditCard, Home, Package2, Settings } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Link from "next/link";

import { Button } from "./ui/button";

import { usePathname } from "next/navigation";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-4 w-4" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="grid gap-2 text-md font-medium items-start px-2 lg:px-4">
      {navItems.map((navItem) => (
        <Link
          key={navItem.label}
          href={navItem.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === navItem.href ? "bg-muted text-primary" : ""
          }`}
        >
          {navItem.icon}
          {navItem.label}
        </Link>
      ))}
    </nav>
  );
}

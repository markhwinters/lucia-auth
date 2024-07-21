"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const user = false;
  return (
    <nav className="flex w-screen items-center justify-between p-6 sticky top-0">
      <div>
        <Link className="text-2xl font-bold no-underline" href="/">
          Acme <span className="text-primary">Inc</span>
        </Link>
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        <ThemeToggle />
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    </nav>
  );
}
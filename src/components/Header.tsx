import { Button } from "@/components/ui/button";

import MobileNav from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div>
        <MobileNav />
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
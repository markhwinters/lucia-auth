import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

import { useSession } from "@/components/SessionProvider";
import { validateRequest } from "@/lib/lucia";
import UserNav from "./UserNav";

export default async function Navbar() {
  const { user } = await validateRequest();

  return (
    <nav className="flex w-screen items-center justify-between p-6">
      <div>
        <Link className="text-2xl font-bold no-underline" href="/">
          Lucia <span className="text-primary">Auth</span>
        </Link>
      </div>
      <div className="flex flex-row gap-x-5 items-center">
        <ThemeToggle />
        {user ? (
          <UserNav
            email={user.email as string}
            username={user.username as string}
            image={""}
          />
        ) : (
          <>
            <Button asChild variant="ghost">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

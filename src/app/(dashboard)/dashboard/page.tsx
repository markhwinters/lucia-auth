import { validateRequest } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function SettingsPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Site information will be displayed here
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Gneral information will be displayed here
          </CardDescription>
        </CardHeader>
        <CardContent>content</CardContent>
      </Card>
    </div>
  );
}

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
  title: "Billing",
};

export default async function BillingPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Billing</h1>
          <p className="text-lg text-muted-foreground">
            Settings reagding your subscription
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below, this will give you the opportunity to
            change your payment details and view your statement at the same
            time.
          </CardDescription>
        </CardHeader>
        <CardContent>content</CardContent>
      </Card>
    </div>
  );
}

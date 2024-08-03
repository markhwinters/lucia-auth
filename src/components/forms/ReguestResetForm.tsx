"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { requestPasswordReset } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RequestResetSchema = z.object({
  email: z.string().email(),
});

export default function RequestResetForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof RequestResetSchema>>({
    resolver: zodResolver(RequestResetSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RequestResetSchema>) {
    const res = await requestPasswordReset(values);
    if (res?.success) {
      toast.success("Check your email for instructions");
      router.push("/login");
    } else {
      toast.error(res?.error);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>It happens ...</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="test@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-start">
              Request Reset
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

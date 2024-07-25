import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import { cookies } from "next/headers";
import { lucia } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPassword({ params }: { params: { token: string } }) {
   return (
    <div className="flex min-h-[80dvh] items-center justify-center py-24">
      <h1>Reset Password</h1>
      <ResetPasswordForm params={params} />
    </div>
  )
}

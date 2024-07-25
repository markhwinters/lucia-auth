import RequestResetForm from "@/components/forms/ReguestResetForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function ForgotPassword() {
  return (
   <div className="flex min-h-[80dvh] items-center justify-center py-24"><RequestResetForm /></div>
  )
}

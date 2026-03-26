"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // if you have a button component
import { sendVerificationEmail } from "@/lib/actions/auth.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/spinner/loading-spinner";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // <--- get email from query
  const [loading, setLoading] = useState(false);

  async function handleForgetPassword() {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      const result = await sendVerificationEmail(email);

      if (result.success) {
        toast.success("Verification link sent to your email.");
        await new Promise((resolve) => setTimeout(resolve, 200)); // small delay
        router.push("/signin");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(`Verification email send failed:`, error);
      toast.error(
        error instanceof Error ? error.message : "failed to send verify email",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className='mx-auto mt-10 w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          Please verify your account to continue using our platform. We will
          send you a link to confirm your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleForgetPassword}
          disabled={loading}
          variant={"outline"}
        >
          {loading ? (
            <LoadingSpinner text='sending...' />
          ) : (
            <span>Resend Verification Email</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

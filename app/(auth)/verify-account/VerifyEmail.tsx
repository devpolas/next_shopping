"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/lib/actions/auth.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react"; // Added useTransition
import { toast } from "sonner";
import LoadingSpinner from "@/components/spinner/loading-spinner";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // useTransition is often better for Server Actions than manual loading states
  const [isPending, startTransition] = useTransition();

  async function handleResendVerification() {
    if (!email) {
      toast.error("No email address found.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await sendVerificationEmail(email);

        if (result.success) {
          toast.success("Verification link sent!");
          router.push("/signin");
        } else {
          toast.error(result.error || "Failed to send email");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    });
  }

  if (!email) {
    return (
      <Card className='mx-auto mt-10 w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Invalid Request</CardTitle>
          <CardDescription>No email provided for verification.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className='mx-auto mt-10 w-full max-w-sm'>
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>
          We&apos;ve sent a verification email to <strong>{email}</strong>.
          Didn&apos;t get it? Click below to resend the verification link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleResendVerification}
          disabled={isPending}
          variant='default' // Changed to default to look like a primary action
          className='w-full'
        >
          {isPending ? (
            <LoadingSpinner text='Sending...' />
          ) : (
            "Resend Verification Email"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// Ensure the Suspense boundary is wrapping the component using useSearchParams
export default function VerifyEmail() {
  return (
    <Suspense fallback={<LoadingSpinner text='loading...' />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

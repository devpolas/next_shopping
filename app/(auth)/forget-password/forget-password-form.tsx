"use client";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/actions/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const forgetPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .min(1, "Email is required."),
});

type FormValues = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleForgetPassword(data: FormValues) {
    try {
      const result = await forgotPassword(data);

      if (result.success) {
        toast.success("Password reset link sent to your email.");
        await new Promise((resolve) => setTimeout(resolve, 200)); // small delay
        router.push("/signin");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(`Forgot password failed:`, error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send forget link. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(handleForgetPassword)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput
          name='email'
          label='Email'
          type='email'
          control={control}
        />
        <Button
          variant={"outline"}
          type='submit'
          className='mt-4 w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingSpinner text='Sending...' />
          ) : (
            <span>Send Reset Link</span>
          )}
        </Button>

        <p className='px-8 text-muted-foreground text-sm text-center'>
          Remember your password?{" "}
          <Link
            href='/signin'
            className='text-primary text-sm hover:underline underline-offset-4'
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}

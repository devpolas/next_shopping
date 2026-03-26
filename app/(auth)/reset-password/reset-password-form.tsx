"use client";

import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/actions/auth.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const forgetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be 30 characters or less"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof forgetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  async function handleResetPassword(data: FormValues) {
    if (!token) {
      toast.error("Invalid or expired reset link");
      router.push("/forgot-password");
      return null;
    }
    try {
      const result = await resetPassword({
        password: data.password,
        token: token,
      });

      if (result.success) {
        toast.success("Your password has been changed successfully");
        router.push("/signin");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(`Reset password failed:`, error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Reset password failed. Please try again.",
      );
    }
  }

  if (!token) {
    return (
      <div className='p-6 text-center'>
        <p className='text-red-500'>Invalid or expired reset link.</p>
        <a href='/forgot-password' className='text-blue-500 underline'>
          Request a new password reset
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput<FormValues>
          name='password'
          type='password'
          label='Password'
          control={control}
          placeholder='Enter your password'
        />

        <FormRhfInput<FormValues>
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          control={control}
          placeholder='Confirm your password'
        />
        {/* Optional UX improvement */}
        {confirmPassword && password !== confirmPassword && (
          <p className='text-red-500 text-sm'>Passwords do not match</p>
        )}

        <div className='space-y-2'>
          <Button
            variant={"outline"}
            type='submit'
            className='mt-4 w-full'
            disabled={isSubmitting || password !== confirmPassword}
          >
            {isSubmitting ? (
              <LoadingSpinner text='Resetting...' />
            ) : (
              <span>Reset</span>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

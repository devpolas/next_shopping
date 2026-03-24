"use client";

import Link from "next/link";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSigninSchema } from "@/lib/validators/user-schema";
import { toast } from "sonner";
import { FormRhfInput } from "./form-rhf-input";
import LoadingSpinner from "../spinner/loading-spinner";

type FormValues = z.infer<typeof userSigninSchema>;

export default function SigninForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(userSigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignin(formData: FormValues) {
    try {
      console.log(formData);
      toast.success("Logged in successfully 🎉");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput<FormValues>
          name='email'
          type='email'
          label='Email'
          control={control}
          placeholder='username@example.com'
        />

        {/* Password with extra header */}
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-sm'>Password</span>
            <Link
              href='#'
              className='text-sm hover:underline underline-offset-4'
            >
              Forgot your password?
            </Link>
          </div>

          <FormRhfInput<FormValues>
            name='password'
            type='password'
            label='' // label already shown above
            control={control}
            placeholder='Enter your password'
          />
        </div>
      </div>

      <Button type='submit' className='mt-4 w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <LoadingSpinner text='logging in.....' />
        ) : (
          <span>Login</span>
        )}
      </Button>
    </form>
  );
}

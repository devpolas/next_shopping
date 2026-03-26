"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSigninSchema } from "@/lib/validators/user-schema";
import { toast } from "sonner";

import { signin } from "@/lib/actions/auth.actions";
import { useState } from "react";
import { Paragraph } from "@/components/typography/typography";
import { FormRhfInput } from "@/components/rhf-input/form-rhf-input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import Link from "next/link";

type FormValues = z.infer<typeof userSigninSchema>;

export default function SigninForm() {
  const [isError, setIsError] = useState<string>("");
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
    setIsError("");
    try {
      const response = await signin(formData);
      console.log(response);
      if (response.success) {
        toast.success("Logged in successfully 🎉");
      } else {
        setIsError("Invalid Credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsError("Invalid Credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignin)}>
      <div className='flex flex-col gap-6'>
        {isError && (
          <Paragraph className={"text-center text-red-600"} text={isError} />
        )}
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
              href='/forget-password'
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

      <Button
        variant={"outline"}
        type='submit'
        className='mt-4 w-full'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <LoadingSpinner text='logging in...' />
        ) : (
          <span>Login</span>
        )}
      </Button>
    </form>
  );
}

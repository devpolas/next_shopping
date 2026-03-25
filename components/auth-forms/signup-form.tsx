"use client";

import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userSignupSchema } from "@/lib/validators/user-schema";
import { toast } from "sonner";
import { FormRhfInput } from "./form-rhf-input";
import LoadingSpinner from "../spinner/loading-spinner";
import { signup } from "@/lib/actions/auth.actions";

type FormValues = z.infer<typeof userSignupSchema>;

export default function SignupForm() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function handleSignup(formData: FormValues) {
    try {
      // simulate API
      const response = await signup(formData);

      console.log(response);

      if (response.success) {
        toast.success("Account created successfully 🎉");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className='flex flex-col gap-6'>
        <FormRhfInput<FormValues>
          name='name'
          type='text'
          label='Full Name'
          control={control}
          placeholder='Enter your full name'
        />

        <FormRhfInput<FormValues>
          name='email'
          type='email'
          label='Email'
          control={control}
          placeholder='username@example.com'
        />

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
      </div>

      <Button type='submit' className='mt-4 w-full' disabled={isSubmitting}>
        {isSubmitting ? (
          <LoadingSpinner text='Creating...' />
        ) : (
          <span>Create Account</span>
        )}
      </Button>
    </form>
  );
}

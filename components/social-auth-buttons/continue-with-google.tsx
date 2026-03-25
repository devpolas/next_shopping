"use client";
import { continueWithGoogle } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useState } from "react";
import LoadingSpinner from "../spinner/loading-spinner";

export default function ContinueWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleContinueWithGoogle() {
    setIsLoading(true);
    try {
      const response = await continueWithGoogle();
      console.log(response);
      if (response.success) {
        toast.success("Logged in successfully 🎉");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button
      disabled={isLoading}
      onClick={handleContinueWithGoogle}
      variant='outline'
      className='w-full'
    >
      <span className='flex flex-row gap-2'>
        <span>{isLoading ? <LoadingSpinner /> : <FcGoogle />}</span>
        <span>Continue with Google</span>
      </span>
    </Button>
  );
}

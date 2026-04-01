"use client";
import LoadingSpinner from "../spinner/loading-spinner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FieldGroup } from "../ui/field";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription?: string;
  onSubmit?: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  isSubmittingText?: string;
  submitText: string;
  cancelText: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  onSubmit,
  isSubmitting = false,
  isSubmittingText,
  submitText,
  cancelText,
  children,
  size = "sm",
}: DialogProps) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={sizeClasses[size]}>
        <form onSubmit={onSubmit} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <FieldGroup>{children}</FieldGroup>

          <DialogFooter className='flex flex-row gap-2'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                {cancelText}
              </Button>
            </DialogClose>

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner text={isSubmittingText} />
              ) : (
                submitText
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

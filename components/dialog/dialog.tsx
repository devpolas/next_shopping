import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import LoadingSpinner from "../spinner/loading-spinner";

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
  size?: "sm" | "md" | "lg"; // optional size
}

export function ReusableDialog({
  isOpen,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  onSubmit,
  isSubmitting,
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
      <form onSubmit={onSubmit}>
        <DialogContent className={sizeClasses[size]}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>

          <FieldGroup>{children}</FieldGroup>

          <DialogFooter className='flex gap-2'>
            <DialogClose asChild>
              <Button variant='outline'>{cancelText}</Button>
            </DialogClose>
            <Button type='submit'>
              {isSubmitting ? (
                <LoadingSpinner text={isSubmittingText} />
              ) : (
                submitText
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "../ui/textarea";

type FormRhfInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  height: number;
};

export default function FormRhfTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  height,
}: FormRhfInputProps<T>) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`form-rhf-input-${String(name)}`}>
              {label}
            </FieldLabel>

            <div className='relative'>
              <Textarea
                {...field}
                id={`form-rhf-input-${String(name)}`}
                aria-invalid={fieldState.invalid}
                placeholder={placeholder}
                style={{ height: `${height}px` }}
              />
            </div>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

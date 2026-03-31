"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "../ui/checkbox";

type FormRhfInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
};

export default function FormRhfCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: FormRhfInputProps<T>) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation='horizontal'>
            <div className='relative'>
              <Checkbox
                {...field}
                id={`form-rhf-input-${String(name)}`}
                aria-invalid={fieldState.invalid}
                disabled={disabled}
              />
            </div>

            <FieldLabel htmlFor={`form-rhf-input-${String(name)}`}>
              {label}
            </FieldLabel>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

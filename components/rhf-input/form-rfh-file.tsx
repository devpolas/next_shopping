"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";

type FormRhfInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
};

export default function FormRhfFile<T extends FieldValues>({
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
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`form-rhf-input-${String(name)}`}>
              {label}
            </FieldLabel>

            <div className='relative'>
              <Input
                id={`form-rhf-input-${String(name)}`}
                type='file'
                disabled={disabled}
                multiple
                // Don't spread `field` because it includes `value`!
                onChange={(e) => field.onChange(e.target.files)}
              />
            </div>

            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}

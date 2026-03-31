// "use client";

// import { Control, Controller, FieldValues, Path } from "react-hook-form";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// type FormRhfInputProps<T extends FieldValues> = {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder?: string;
//   type: React.HTMLInputTypeAttribute;
//   disabled?: boolean;
// };

// export function FormRhfInput<T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   type,
//   disabled,
// }: FormRhfInputProps<T>) {
//   const [showPassword, setShowPassword] = useState(false);

//   const isPassword = type === "password";
//   const inputType = isPassword && showPassword ? "text" : type;

//   return (
//     <FieldGroup>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => (
//           <Field data-invalid={fieldState.invalid}>
//             <FieldLabel htmlFor={`form-rhf-input-${String(name)}`}>
//               {label}
//             </FieldLabel>

//             <div className='relative'>
//               <Input
//                 {...field}
//                 id={`form-rhf-input-${String(name)}`}
//                 type={inputType}
//                 aria-invalid={fieldState.invalid}
//                 placeholder={placeholder}
//                 autoComplete={String(name)}
//                 disabled={disabled}
//               />

//               {isPassword && (
//                 <button
//                   type='button'
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className='top-1/2 right-2.5 absolute -translate-y-1/2'
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <EyeOff className='w-5 h-5' />
//                   ) : (
//                     <Eye className='w-5 h-5' />
//                   )}
//                 </button>
//               )}
//             </div>

//             {fieldState.error && <FieldError errors={[fieldState.error]} />}
//           </Field>
//         )}
//       />
//     </FieldGroup>
//   );
// }

"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type FormRhfInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
};

export function FormRhfInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
  disabled,
}: FormRhfInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // If type is number, coerce value to number
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (type === "number") {
              field.onChange(val === "" ? undefined : Number(val));
            } else {
              field.onChange(val);
            }
          };

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`form-rhf-input-${String(name)}`}>
                {label}
              </FieldLabel>

              <div className='relative'>
                <Input
                  {...field}
                  id={`form-rhf-input-${String(name)}`}
                  type={inputType}
                  value={field.value ?? ""} // ensures controlled input
                  onChange={handleChange}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  autoComplete={String(name)}
                  disabled={disabled}
                />

                {isPassword && (
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='top-1/2 right-2.5 absolute -translate-y-1/2'
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                )}
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}

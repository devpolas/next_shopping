// "use client";

// import { Control, Controller, FieldValues, Path } from "react-hook-form";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "../ui/badge";
// import { PlusCircleIcon } from "lucide-react";

// type Option = {
//   label: string;
//   value: string;
// };

// type FormRhfSelectProps<T extends FieldValues> = {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   options: Option[];
//   placeholder?: string;
//   createNew?: boolean;
//   onCreateNew?: () => void;
//   disabled?: boolean;
//   isBoolean?: boolean;
// };

// export function FormRhfSelect<T extends FieldValues>({
//   control,
//   name,
//   label,
//   options,
//   placeholder = "Select an option",
//   createNew,
//   onCreateNew,
//   disabled,
//   isBoolean,
// }: FormRhfSelectProps<T>) {
//   const id = `form-rhf-select-${String(name)}`;

//   return (
//     <FieldGroup>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState }) => (
//           <Field data-invalid={fieldState.invalid}>
//             <div className='flex justify-between flow-row'>
//               <FieldLabel htmlFor={id}>{label}</FieldLabel>
//               {createNew && (
//                 <Badge
//                   className='hover:cursor-pointer'
//                   variant={"default"}
//                   onClick={onCreateNew}
//                 >
//                   <PlusCircleIcon /> Create New
//                 </Badge>
//               )}
//             </div>

//             <Select
//               value={field.value}
//               onValueChange={field.onChange}
//               disabled={disabled}
//             >
//               <SelectTrigger id={id} aria-invalid={fieldState.invalid}>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>

//               <SelectContent>
//                 <SelectGroup>
//                   {options.map((option, i) => (
//                     <SelectItem key={i} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "../ui/badge";
import { PlusCircleIcon } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type FormRhfSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
  disabled?: boolean;
  isBoolean?: boolean;
};

export function FormRhfSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  createNew,
  onCreateNew,
  disabled,
  isBoolean,
}: FormRhfSelectProps<T>) {
  const id = `form-rhf-select-${String(name)}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // Convert boolean value to string for the Select component
          const selectValue =
            isBoolean && typeof field.value === "boolean"
              ? String(field.value)
              : (field.value ?? "");

          // Convert string back to boolean when selecting
          const handleValueChange = (value: string) => {
            if (isBoolean) {
              field.onChange(value === "true");
            } else {
              field.onChange(value);
            }
          };

          return (
            <Field data-invalid={fieldState.invalid}>
              <div className='flex justify-between flow-row'>
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                {createNew && (
                  <Badge
                    className='hover:cursor-pointer'
                    variant={"default"}
                    onClick={onCreateNew}
                  >
                    <PlusCircleIcon /> Create New
                  </Badge>
                )}
              </div>

              <Select
                value={selectValue}
                onValueChange={handleValueChange}
                disabled={disabled}
              >
                <SelectTrigger id={id} aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {options.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </FieldGroup>
  );
}

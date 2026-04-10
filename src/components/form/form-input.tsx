import type { FieldValues, FieldPath, Control } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface IFormInputProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
  className,
}: IFormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`relative ${className || ''}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              onChange={(e) =>
                field.onChange(
                  type === 'number' ? e.target.valueAsNumber : e.target.value,
                )
              }
            />
          </FormControl>
          <FormMessage className="absolute -bottom-[19px] left-0" />
        </FormItem>
      )}
    />
  )
}

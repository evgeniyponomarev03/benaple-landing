import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
}) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label
          htmlFor={name}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Enter your email address"
          {...register(name, {
            pattern: /^\S[^\s@]*@\S+$/,
            required,
          })}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}

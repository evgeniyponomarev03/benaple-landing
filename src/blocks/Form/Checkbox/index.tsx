import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
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
  const props = register(name, { required: required })
  const { setValue } = useFormContext()

  return (
    <Width width={width}>
      <div className="space-y-2">
        <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-colors duration-200 hover:bg-gray-50">
          <CheckboxUi
            defaultChecked={defaultValue}
            id={name}
            className="mt-0.5 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
            {...props}
            onCheckedChange={(checked) => {
              setValue(props.name, checked)
            }}
          />
          <div className="flex-1">
            <Label
              htmlFor={name}
              className="cursor-pointer text-sm leading-6 text-gray-700"
            >
              {required && (
                <span className="mr-1 text-red-500">*</span>
              )}
              {label}
            </Label>
          </div>
        </div>
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}

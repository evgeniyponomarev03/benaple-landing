'use client'
import type {
  FormFieldBlock,
  Form as FormType,
} from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] =
    useState<boolean>()
  const [error, setError] = useState<
    { message: string; status?: string } | undefined
  >()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(
          ([name, value]) => ({
            field: name,
            value,
          }),
        )

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(
            `${getClientSideURL()}/api/form-submissions`,
            {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            },
          )

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message:
                res.errors?.[0]?.message ||
                'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5 sm:p-8 lg:p-10">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30" />

        <div className="relative">
          <FormProvider {...formMethods}>
            {!isLoading &&
              hasSubmitted &&
              confirmationType === 'message' && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <RichText data={confirmationMessage} />
                </div>
              )}
            {isLoading && !hasSubmitted && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  <p className="text-gray-600">
                    Submitting your message...
                  </p>
                </div>
              </div>
            )}
            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">
                  Error {error.status || '500'}:{' '}
                  {error.message ||
                    'Something went wrong. Please try again.'}
                </p>
              </div>
            )}
            {!hasSubmitted && (
              <form
                id={formID}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {formFromProps &&
                    formFromProps.fields &&
                    formFromProps.fields?.map(
                      (field, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const Field: React.FC<any> =
                          fields?.[
                            field.blockType as keyof typeof fields
                          ]
                        if (Field) {
                          return (
                            <Field
                              key={index}
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          )
                        }
                        return null
                      },
                    )}
                </div>

                <div className="pt-4">
                  <Button
                    form={formID}
                    type="submit"
                    variant="default"
                    className="w-full transform rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? 'Submitting...'
                      : submitButtonLabel || 'Submit'}
                  </Button>
                </div>
              </form>
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

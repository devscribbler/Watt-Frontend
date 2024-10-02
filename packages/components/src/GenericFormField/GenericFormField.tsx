import { Children, cloneElement, Fragment, isValidElement } from 'react'
import { FormControl, FormHelperText, InputLabel } from '@mui/material'
import clsx from 'clsx'
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext,
  UseFormStateReturn,
  ValidationRule,
} from 'react-hook-form'
import { FieldErrors, FieldError } from 'react-hook-form'
import { useSpacing } from '@watt/theme'
import { addTestAttribute } from '@watt/utils'

export type ErrorSelector<T> = (errors: FieldErrors<T>) => FieldError | undefined

type RenderProps<T> = {
  field: ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<T>
}

type GenericFormFieldProps<T> = {
  id: string
  name: Path<T>
  label?: string

  className?: string

  validation?: {
    required?: boolean
    disabled?: boolean

    maxLength?: ValidationRule<number>
    minLength?: ValidationRule<number>
    pattern?: ValidationRule<RegExp>
  }

  errorSelector: ErrorSelector<T>

  render: ({ field, fieldState, formState }: RenderProps<T>) => React.ReactElement
}

export function GenericFormField<T extends FieldValues>(props: GenericFormFieldProps<T>) {
  const { id, name, label, validation = {}, errorSelector, render, className } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<T>()
  const [mb5] = useSpacing('mb5')

  const error = errorSelector(errors)

  const addTestAttributeToChildren = (element: React.ReactNode, index?: number, isChild = false): React.ReactNode => {
    if (!isValidElement(element)) {
      return element
    }

    if (element.type === Fragment) {
      const childrenWithAttributes = Children.map(element.props.children, (child, childIndex) =>
        childIndex === 0 ? addTestAttributeToChildren(child, undefined, true) : child
      )
      return <>{childrenWithAttributes}</>
    }

    return cloneElement(element, {
      ...element.props,
      ...addTestAttribute(`form-field-${id}${isChild && index != undefined ? `-${index}` : ''}`),
    })
  }

  const renderWithTestAttributes = (renderArgs: RenderProps<T>) => addTestAttributeToChildren(render(renderArgs), 0)

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: validation.required
          ? {
              value: validation.required,
              message: 'Required information.',
            }
          : undefined,
        maxLength: validation.maxLength,
        minLength: validation.minLength,
        pattern: validation.pattern,
      }}
      render={(renderArgs) => (
        <FormControl fullWidth error={Boolean(error)} disabled={validation.disabled} className={clsx(mb5, className)}>
          {label && (
            <InputLabel htmlFor={id} required={validation.required ?? false}>
              {label}
            </InputLabel>
          )}

          {renderWithTestAttributes(renderArgs)}

          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

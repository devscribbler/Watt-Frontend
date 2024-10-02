import { Children, cloneElement, Fragment, isValidElement } from 'react'
import { FormControl, FormHelperText, InputLabel } from '@mui/material'
import clsx from 'clsx'
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  Path,
  useFormContext,
  UseFormStateReturn,
  ValidationRule,
} from 'react-hook-form'
import { useSpacing } from '@watt/theme'
import { addTestAttribute } from '@watt/utils'
import { required } from '~/utils/reactHookFormRules'
import { CompanyDetailsForm } from '../formConfig'
import { ErrorSelector } from './errorSelector'

type FormFieldProps = {
  id: string
  name: Path<CompanyDetailsForm>
  label?: string

  className?: string

  validation?: {
    required?: boolean
    disabled?: boolean

    maxLength?: ValidationRule<number>
    minLength?: ValidationRule<number>
    pattern?: ValidationRule<RegExp>
  }

  errorSelector: ErrorSelector

  // extracted from react-hook-form types
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<CompanyDetailsForm, Path<CompanyDetailsForm>>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<CompanyDetailsForm>
  }) => React.ReactElement
}

/*
 * This component is a duplicate, make sure you make any changes to both, to prevent drift
 * TODO: merge them together!
 */
export function FormField(props: FormFieldProps) {
  const { id, name, label, validation = {}, errorSelector, render, className } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyDetailsForm>()
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

  const renderWithTestAttributes = (renderArgs: any) => addTestAttributeToChildren(render(renderArgs), 0)

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: validation.required ? required : undefined,
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

          {error && (
            <FormHelperText error {...addTestAttribute(`form-field-error-${id}`)}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

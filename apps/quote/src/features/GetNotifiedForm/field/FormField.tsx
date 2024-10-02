import { FormControl, FormHelperText, InputLabel } from '@mui/material'
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
import { required } from '~/utils/reactHookFormRules'
import { GetNotifiedFormValues } from '../formConfig'
import { ErrorSelector } from './errorSelector'

type FormFieldProps = {
  id: string
  name: Path<GetNotifiedFormValues>
  label?: string

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
    field: ControllerRenderProps<GetNotifiedFormValues, Path<GetNotifiedFormValues>>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<GetNotifiedFormValues>
  }) => React.ReactElement
}

/*
 * This component is a duplicate, make sure you make any changes to both, to prevent drift
 * TODO: merge them together!
 */

export function FormField(props: FormFieldProps) {
  const { id, name, label, validation = {}, errorSelector, render } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<GetNotifiedFormValues>()
  const [mb6] = useSpacing('mb6')

  const error = errorSelector(errors)

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
        <FormControl fullWidth error={Boolean(error)} disabled={validation.disabled} className={mb6}>
          {label && (
            <InputLabel htmlFor={id} required={validation.required ?? false}>
              {label}
            </InputLabel>
          )}

          {render(renderArgs)}

          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

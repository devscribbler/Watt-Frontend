import { FieldErrors, FieldError } from 'react-hook-form'
import { GetNotifiedFormValues } from '../formConfig'

export type ErrorSelector = (errors: FieldErrors<GetNotifiedFormValues>) => FieldError | undefined

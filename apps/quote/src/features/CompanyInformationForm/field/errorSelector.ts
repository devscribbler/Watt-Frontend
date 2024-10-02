import { FieldErrors, FieldError } from 'react-hook-form'
import { CompanyDetailsForm } from '../formConfig'

export type ErrorSelector = (errors: FieldErrors<CompanyDetailsForm>) => FieldError | undefined

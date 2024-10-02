import { SignUpFormType } from '~/features/register/SignUpForm/formConfig'

interface APIAcceptedFormat {
  phone: string
  email: string
  new_password_1: string
  new_password_2: string
}

export const serializeRegisterForm = (form: SignUpFormType): APIAcceptedFormat => {
  return {
    phone: form.phoneNumber,
    email: form.emailAddress,
    new_password_1: form.password,
    new_password_2: form.confirmPassword,
  }
}

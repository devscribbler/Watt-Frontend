import en from '~/i18n'

export const defaultSignUpForm = {
  postcode: '',
  address: '',
  businessName: '',
  phoneNumber: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
}
export type SignUpFormType = typeof defaultSignUpForm

export const registerFormCfg = {
  postcode: {
    id: 'postcode',
    label: en.register.form.postcode.label,
    inputProps: {
      disabled: true,
      placeholder: en.register.form.postcode.placeholder,
      type: 'text',
    },
  },
  address: {
    id: 'address',
    label: en.register.form.address.label,
    inputProps: {
      disabled: true,
      placeholder: en.register.form.address.placeholder,
    },
  },
  businessName: {
    id: 'businessName',
    label: en.register.form.businessName.label,
    inputProps: {
      disabled: true,
      placeholder: en.register.form.businessName.placeholder,
    },
  },
  phoneNumber: {
    id: 'phoneNumber',
    label: en.register.form.phoneNumber.label,
    inputProps: {
      placeholder: en.register.form.phoneNumber.placeholder,
      type: 'text',
    },
  },
  emailAddress: {
    id: 'emailAddress',
    label: en.register.form.emailAddress.label,
    inputProps: {
      disabled: true,
      placeholder: en.register.form.emailAddress.placeholder,
      type: 'email',
    },
  },
  password: {
    id: 'password',
    label: en.register.form.password.label,
    inputProps: {
      placeholder: en.register.form.password.placeholder,
    },
  },
  confirmPassword: {
    id: 'confirmPassword',
    label: en.register.form.confirmPassword.label,
    inputProps: {
      placeholder: en.register.form.confirmPassword.placeholder,
    },
  },
}

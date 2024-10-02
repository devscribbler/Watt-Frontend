import en from '~/i18n'

export const API_ERROR_MESSAGES = {
  ACCOUNT_EXISTS: 'account_exists',
} as const

export const ERROR_PRETTY_MESSAGES = {
  [API_ERROR_MESSAGES.ACCOUNT_EXISTS]: en.errors.existentAccount,
}

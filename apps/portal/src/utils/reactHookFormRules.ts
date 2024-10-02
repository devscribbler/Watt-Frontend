import { POST_CODE_REGEX_WITH_SPECIAL_CASES, VALID_UK_PHONE_NUMBER_REGEX } from '@watt/constants'
import { PASSWORDS_MIN_LENGTH } from '~/constants/account'
import en from '~/i18n'

export const validChangeEmailSecurityCode = {
  value: /^[0-9]{6}$/g,
  message: en.errors.validChangeEmailSecurityCode,
}

export const validChangeEmailIntend = {
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: en.errors.validChangeEmailIntend,
}

export const requiredPasswordMinimum8Lentgth = {
  value: true,
  message: en.errors.requiredPasswordMin8Length,
}

export const required = {
  value: true,
  message: en.errors.requiredInformation,
}

export const validUkPhoneNumber = {
  value: VALID_UK_PHONE_NUMBER_REGEX,
  message: en.errors.invalidPhoneNumber,
}

export const validEmailAddress = {
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: en.errors.invalidEmailAddress,
}

export const validPasswordLength = {
  value: PASSWORDS_MIN_LENGTH,
  message: en.errors.passwordLength,
}

export const validPostcode = {
  value: POST_CODE_REGEX_WITH_SPECIAL_CASES,
  message: en.errors.invalidPostcode,
}

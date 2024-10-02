import { ValidationValueMessage } from 'react-hook-form'

const VALID_CHARITY_NUMBER_REGEX = /\d{6,7}/
const VALID_CHARITY_NUMBER_SC_REGEX = /SC\d{6}/
const VALID_CHARITY_NUMBER_WITHDASHZERO_REGEX = /\d{6}-0/

export const validUKCharityNumber: ValidationValueMessage<RegExp> = {
  value: new RegExp(
    `^(?:${VALID_CHARITY_NUMBER_REGEX.source}|${VALID_CHARITY_NUMBER_SC_REGEX.source}|${VALID_CHARITY_NUMBER_WITHDASHZERO_REGEX.source})$`
  ),
  message: "Charity number must be either (6-7 digits, 'SC' followed by 6 digits or 6 digits followed by '-0')",
}

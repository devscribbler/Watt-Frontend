export const isNumber = (value: string): boolean => /[0-9]/.test(value)

// See https://evozonjs.codebasehq.com/projects/watt-utilities/tickets/446 for more details
const LINE_LOSS_FORBIDDEN_CHARS_REGEX = /[^A-HJ-NP-Z0-9]/

export const validateLineLossFactorClass = (oldValue: string, newValue: string): string => {
  let formattedValue = newValue.toUpperCase()

  if (LINE_LOSS_FORBIDDEN_CHARS_REGEX.test(newValue)) {
    formattedValue = oldValue
  }

  return formattedValue
}

export const formatSortCode = (oldValue: string, newValue: string): string => {
  let formattedValue = newValue

  if (newValue.length === 2) {
    formattedValue = newValue + '-'
  }

  if (newValue.length === 5) {
    formattedValue = newValue + '-'
  }

  if (newValue.length > 6 + 2) {
    formattedValue = oldValue
  }

  if (newValue.length < oldValue.length) {
    formattedValue = newValue
  }

  return formattedValue
}

export const formatAccountNumber = (oldValue: string, newValue: string): string => {
  let formattedValue = newValue

  if (newValue.length > 8) {
    formattedValue = oldValue
  }

  if (/[A-z]/.test(newValue)) {
    formattedValue = oldValue
  }

  return formattedValue
}

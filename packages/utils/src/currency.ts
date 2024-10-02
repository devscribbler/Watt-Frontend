export const formatCurrency = (number: number, options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 2,
    ...options,
  }).format(number)
}

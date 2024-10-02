export type UtilityUsageForm = {
  hasNoContract: boolean
  contractStartDate: string
  mpan?: string
  mprn?: string
  annualUsage: string
  supplier: string
  noWattSupplier: string
}

export const CONTRACT_USAGE_FORM_ID = 'utility-usage-form'

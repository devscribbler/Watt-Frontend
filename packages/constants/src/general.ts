export const UTILITY_TYPES = {
  1: 'Electricity',
  2: 'Gas',
  3: 'Water',
  4: 'Telephone',
  5: 'Internet',
} as const
export type UtilityKindType = keyof typeof UTILITY_TYPES

export type FlowStep = 'usage' | 'quote' | 'contract'

export type UTILITIES_MAP_BY_NAME = {
  ELECTRICITY: 1
  GAS: 2
  WATER: 3
  TELEPHONE: 4
  INTERNET: 5
}

export const UTILITIES_LOOKUP: UTILITIES_MAP_BY_NAME = {
  ELECTRICITY: 1,
  GAS: 2,
  WATER: 3,
  TELEPHONE: 4,
  INTERNET: 5,
}

export const BUSINESS_TYPES: { [key: string]: string } = {
  1: 'LTD',
  2: 'CHARITY',
  3: 'SOLE_TRADER',
} as const

export type BusinessRegistrationNumberType = keyof typeof BUSINESS_TYPES
export const BUSINESS_TYPE_LABELS: Record<BusinessRegistrationNumberType, string> = {
  1: 'Limited Company',
  2: 'Charity',
  3: 'Sole Trader',
}

export const MONTHS = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
} as const

export const CONTRACT_LENGTHS = {
  1: '1 year',
  2: '2 years',
  3: '3 years',
  4: '4 years',
  5: '5 years',
} as const
export type ContractLengthsType = keyof typeof CONTRACT_LENGTHS

// Age requirement for contact person (sole trader only)
export const CONTACT_DETAILS_MINIMAL_AGE = 16
export const CONTACT_DETAILS_DOB_MINIMUM = new Date(1900, 0, 1)

export const PAYMENT_METHODS = {
  DIRECT_DEBIT: 'Direct debit',
  OTHER_PAYMENT: 'Other payment',
} as const

export type PaymentMethodsKeysType = keyof typeof PAYMENT_METHODS

export type CurrencyType = '£' | 'p'

export const QUOTE_STATUS = {
  1: 'PROCESSING',
  2: 'OBJECTED',
  3: 'ACCEPTED',
  4: 'LIVE',
  5: 'RENEWAL',
} as const

export type QuoteStatusKindType = keyof typeof QUOTE_STATUS

export const ONE_SECOND = 1000
export const TEN_SECONDS = ONE_SECOND * 10

export const MPAN_LENGTH = 21

export const UTILITIES_NOT_AVAILABLE: UtilityKindType[] = [3, 4, 5]

export const VALID_UK_PHONE_NUMBER_REGEX =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?(\d{4}|\d{3}))?$/

export const POST_CODE_REGEX_SIMPLIFIED = /^[A-Za-z]{1,2}[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}$/

export const POST_CODE_REGEX_WITH_SPECIAL_CASES =
  /^(([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Za-z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|GE ?CX|GIR ?0[Aa]{2}|SAN ?TA1)$/

// (SC|NI|[0-9]{2}) - SC, NI or 2 digits. Then [0-9]{6} - 6 digits
export const COMPANY_NUMBER_REGEX =
  /^((AC|ZC|FC|GE|LP|OC|SE|SA|SZ|SF|GS|SL|SO|SC|ES|NA|NZ|NF|GN|NL|NC|R0|NI|EN|\d{2}|SG|FE)\d{5}(\d|C|R))|((RS|SO)\d{3}(\d{3}|\d{2}[WSRCZF]|\d(FI|RS|SA|IP|US|EN|AS)|CUS))|((NI|SL)\d{5}[\dA])|(OC(([\dP]{5}[CWERTB])|([\dP]{4}(OC|CU))))$/

export enum BusinessType {
  LTD = '1',
  CHARITY = '2',
  SOLE_TRADER = '3',
}

export const isBusinessType = (value: string): value is BusinessType =>
  Object.values(BusinessType).includes(value as BusinessType)

/**
 * An error code that is returned when we cannot proceed with the quote for the given utility.
 */
export const NOT_QUOTABLE_ERROR_CODE = 'not_quotable'

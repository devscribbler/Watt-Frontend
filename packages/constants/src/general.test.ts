import { test, expect } from '@jest/globals'
import { POST_CODE_REGEX_WITH_SPECIAL_CASES } from './general'

function isValidPostcode(postcode: string) {
  return POST_CODE_REGEX_WITH_SPECIAL_CASES.test(postcode)
}

test('Postcode validation with special cases', () => {
  const validPostcodes = [
    'ASCN 1ZZ',
    'STHL 1ZZ',
    'TDCU 1ZZ',
    'BBND 1ZZ',
    'BIQQ 1ZZ',
    'FIQQ 1ZZ',
    'SIQQ 1ZZ',
    'PCRN 1ZZ',
    'TKCA 1ZZ',
    'BFPO 1234',
    'KY1-1102',
    'MSR 1284',
    'VG 1150',
    'AI-2640',
    'GE CX',
    'GIR 0AA',
    'SAN TA1',
    'SN7 7WD',
  ]

  const invalidPostcodes = [
    'ASXN 1ZZ',
    'STXY 1ZZ',
    'TDYU 1ZZ',
    'BBXD 1ZZ',
    'BIXX 1ZZ',
    'FIZZ 1ZZ',
    'SIZZ 1ZZ',
    'PCZZ 1ZZ',
    'TKXZ 1ZZ',
    'BFPO 12345',
    'GE X',
    'GIR 0BA',
    'SAN TX1',
    'SN7 7',
  ]

  validPostcodes.forEach((postcode) => {
    expect(isValidPostcode(postcode)).toBe(true)
  })

  invalidPostcodes.forEach((postcode) => {
    expect(isValidPostcode(postcode)).toBe(false)
  })
})

import { describe, it, expect } from '@jest/globals'
import { validUKCharityNumber } from './validCharityNumber'

describe('Charity Number Validation', () => {
  const validNumbers = ['123456', '1234567', 'SC123456', '123456-0']
  const invalidNumbers = ['12345', '12345678', 'SC12345', 'SC1234567', '123456-1', '12345-0', '12A456']

  it.each(validNumbers)('should accept valid charity number: %s', (number) => {
    expect(validUKCharityNumber.value.test(number)).toBe(true)
  })

  it.each(invalidNumbers)('should reject invalid charity number: %s', (number) => {
    expect(validUKCharityNumber.value.test(number)).toBe(false)
  })
})

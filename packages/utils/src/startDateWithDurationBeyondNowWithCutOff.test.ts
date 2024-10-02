import { describe, it, expect } from '@jest/globals'
import { add } from 'date-fns'
import { startDateWithDurationBeyondNowWithCutOff } from './startDateWithDurationBeyondNowWithCutOff'

describe('startDateWithDurationBeyondNowWithCutOff', () => {
  describe('happy path', () => {
    it('should return false if startDate + duration is not beyond now + cutOff', () => {
      // Arrange
      const randomDateToTestFrom = '2020-01-01T10:58:57.519Z'
      const startDate = randomDateToTestFrom
      const duration: Duration = { years: 2 }

      // Mock now so that the internal todayPlusCutOff is equal to endDate
      const mockNow = add(new Date(startDate), { years: 2, days: -180 })
      const cutOff: Duration = { days: 180 }

      // Act
      jest.spyOn(Date, 'now').mockImplementationOnce(() => mockNow.getTime())
      const result = startDateWithDurationBeyondNowWithCutOff(startDate, duration, cutOff)

      // Assert
      expect(result).toBeFalsy()
    })
    it('should return true if startDate + duration is beyond now + cutOff', () => {
      // Arrange
      const randomDateToTestFrom = '2020-01-01T10:58:57.519Z'
      const startDate = randomDateToTestFrom
      const duration: Duration = { years: 2 }

      // Mock now so that the internal todayPlusCutOff is less than endDate
      const mockNow = add(new Date(startDate), { years: 2, days: -180, seconds: -1 })
      const cutOff: Duration = { days: 180 }

      // Act
      jest.spyOn(Date, 'now').mockImplementationOnce(() => mockNow.getTime())
      const result = startDateWithDurationBeyondNowWithCutOff(startDate, duration, cutOff)

      // Assert
      expect(result).toBeTruthy()
    })
  })
  describe('unhappy path', () => {
    it('should throw Error if cutOff is not an object', () => {
      // Arrange
      const randomDateToTestFrom = '2020-01-01T10:58:57.519Z'
      const startDate = randomDateToTestFrom
      const duration: Duration = { years: 1 }

      const mockNow = new Date(randomDateToTestFrom)
      const cutOff: Duration = false as unknown as Duration

      // Act
      jest.spyOn(Date, 'now').mockImplementationOnce(() => mockNow.getTime())

      // Assert
      expect(() => startDateWithDurationBeyondNowWithCutOff(startDate, duration, cutOff)).toThrowError(
        'todayPlusCutOff is not a valid date.'
      )
    })
    it('should throw Error if startDate is Nan', () => {
      // Arrange
      const randomDateToTestFrom = '2020-01-01T10:58:57.519Z'
      const startDate = 'NaN'
      const duration: Duration = { years: 1 }

      const mockNow = new Date(randomDateToTestFrom)
      const cutOff: Duration = { days: 180 }

      // Act
      jest.spyOn(Date, 'now').mockImplementationOnce(() => mockNow.getTime())

      // Assert
      expect(() => startDateWithDurationBeyondNowWithCutOff(startDate, duration, cutOff)).toThrowError(
        'startDate is not a valid date.'
      )
    })
  })
})

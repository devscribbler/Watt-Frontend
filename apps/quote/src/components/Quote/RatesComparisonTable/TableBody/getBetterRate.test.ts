import { describe, it, expect, beforeEach } from '@jest/globals'
import { getBetterRate } from './getBetterRate'

describe('getBetterRate', () => {
  let current: number | null
  let next: number | null

  describe('when current rate is null', () => {
    beforeEach(() => {
      current = null
    })

    describe('and next rate is null', () => {
      beforeEach(() => {
        next = null
      })

      it('returns none', () => {
        expect(getBetterRate(current, next)).toBe('none')
      })
    })

    describe('and next rate is not null', () => {
      beforeEach(() => {
        next = 10
      })

      // TODO is this correct behaviour? or should `next` be better?
      it('returns none', () => {
        expect(getBetterRate(current, next)).toBe('none')
      })
    })
  })

  describe('when current rate is not null', () => {
    beforeEach(() => {
      current = 10
    })

    describe('and next rate is null', () => {
      beforeEach(() => {
        next = null
      })

      // TODO is this correct behaviour? or should `current` be better?
      it('returns none', () => {
        expect(getBetterRate(current, next)).toBe('none')
      })
    })

    describe('and next rate is not null', () => {
      describe('when current rate is less than next rate', () => {
        beforeEach(() => {
          next = 20
        })

        it('returns current', () => {
          expect(getBetterRate(current, next)).toBe('current')
        })
      })

      describe('when current rate is greater than next rate', () => {
        beforeEach(() => {
          next = 5
        })

        it('returns next', () => {
          expect(getBetterRate(current, next)).toBe('next')
        })
      })
    })
  })
})

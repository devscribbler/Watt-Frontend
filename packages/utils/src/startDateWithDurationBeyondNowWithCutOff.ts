import { add, Duration, isValid } from 'date-fns'

/**
 * Can be used to check if start + period is greater than now + cutOff
 * @param start<string> - start date in string format
 * @param duration<Duration> - duration between the startDate and endDate
 * @param cutOff<Duration> - maximum cut off before endDate is considered invalid
 * @returns<boolean> Returns true if startDate + period is greater than now + cutOff
 */
export function startDateWithDurationBeyondNowWithCutOff(start: string, duration: Duration, cutOff: Duration): boolean {
  const now = Date.now()
  const todayPlusCutOff = add(now, cutOff)

  if (!isValid(todayPlusCutOff)) {
    throw Error('todayPlusCutOff is not a valid date.')
  }

  const startDate = new Date(start)

  if (!isValid(startDate)) {
    throw Error('startDate is not a valid date.')
  }

  if (!duration) {
    // TODO: (OLLY) This is a temporary fix, to ensure that a duration is passed in until we can safely remove this..
    duration = { years: 1 }
  }

  const endDate = add(startDate, duration)

  if (!isValid(endDate)) {
    throw Error('endDate is not a valid date.')
  }

  return endDate.getTime() > todayPlusCutOff.getTime()
}

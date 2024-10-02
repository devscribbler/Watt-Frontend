export const getDifferenceBetweenTwoDates = (startDate: string, endDate: string): number => {
  return new Date(endDate).getTime() - new Date(startDate).getTime()
}

export const getDifferenceBetweenPresentDateAndDate = (date: string): number => {
  const presentDate = new Date()
  return presentDate.getTime() - new Date(date).getTime()
}

export const transformFromMilisecondsToDate = (ms: number): Date => {
  return new Date(ms)
}

export const getDuration = (ms: number): { value: number; unit: string } => {
  const minutes = Math.floor(ms / 60000)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)
  const months = Math.round(days / 30)

  return (
    (months && { value: months, unit: 'months' }) ||
    (days && { value: days, unit: 'days' }) ||
    (hours && { value: hours, unit: 'hours' }) || { value: minutes, unit: 'minutes' }
  )
}

export const formatDate = (date: string): string => {
  const today = new Date(date)
  const dd = String(today.getDate()).padStart(2, '0')
  const month = today.toLocaleString('default', { month: 'short' })
  const yyyy = today.getFullYear()

  return `${dd} ${month} ${yyyy}`
}

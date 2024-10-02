/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * The structure of a successful response from the backend API.
 * @template T - The type of the data payload included in the response.
 * @property {T | null} data - The optional data payload included in the response.
 * @property {string | null} error - A string describing the type of error that occurred.
 * @property {string | null} message - A string describing the message that was sent with the error.
 * @property {null} code - A null value indicating that there was no error code.
 */
type SuccessResponse<T> = {
  data?: T
  error: string | null
  message: string | null
  code: null
}

/**
 * The structure of a failed response from the backend API.
 * @property {string | null} error - A string describing the type of error that occurred.
 * @property {string | null} message - A string describing the message that was sent with the error.
 * @property {number | null} code - An optional error code associated with the error.
 * @property {null} data - A null value indicating that there is no data payload.
 */
type FailureResponse = {
  error: string | null
  message: string | null
  code: number | null
  data: null
}

/**
 * A union type representing either a successful or failed response from the backend API.
 * @template T - The type of the data payload included in the response.
 */
export type ApiResponse<T = null> = SuccessResponse<T> | FailureResponse
/**
 * Converts a camel case string to snake case.
 * @param str The camel case string to convert.
 * @returns The corresponding snake case string.
 */
const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

/**
 * Recursively converts all camel case keys in an object to snake case.
 * @param key The key to transform (not used).
 * @param value The value associated with the key to transform.
 * @returns A new object with all camel case keys transformed to snake case.
 */
export const toSnakeCase = (_: string, value: any): any => {
  if (value !== null && typeof value === 'object') {
    return Object.keys(value).reduce((acc: Record<string, any>, k) => {
      acc[camelToSnake(k)] = toSnakeCase(k, value[k])
      return acc
    }, {})
  }
  return value
}

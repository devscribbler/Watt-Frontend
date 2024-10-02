import { convertToKebabCase } from './convertToKebabCase'

/**
 * Add a data-test attribute to a component
 * @param name Name of the component
 * @returns Object with data-test attribute in kebab case
 */
export function addTestAttribute(name: string) {
  return {
    'data-test': `test-${convertToKebabCase(name)}`,
  }
}

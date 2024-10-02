/**
 * Converts a string to kebab-case by replacing non-alphanumeric characters with hyphens and
 * converting all characters to lowercase.
 *
 * @param {string} str - The string to convert to kebab-case.
 * @returns {string} The kebab-cased string.
 * @throws {Error} If the input is null, undefined, or not a string.
 *
 * @example
 *
 * convertToKebabCase('Hello World!?'); // 'hello-world'
 * convertToKebabCase('Cats and dogs #1!'); // 'cats-and-dogs-1'
 * convertToKebabCase('JavaSCRIPTIS fun!'); // 'javascript-is-fun'
 * convertToKebabCase('HELLOWORLD'); // 'hello-world'
 */
export function convertToKebabCase(str: string): string {
  // Check for invalid input
  if (!str || typeof str !== 'string') {
    throw new Error('Invalid input: must be a non-empty string')
  }

  // Replace all non-alphanumeric characters with hyphens
  const replaced = str.replace(/[^a-zA-Z0-9]+/g, '-')

  // Convert to lowercase and remove leading/trailing hyphens
  const kebabCased = replaced.toLowerCase().replace(/^-+|-+$/g, '')

  return kebabCased
}

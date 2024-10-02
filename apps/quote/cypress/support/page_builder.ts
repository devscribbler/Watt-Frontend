import { Page, PageElements, pagesElements, pageDropdownOptionsLookup } from './step_definitions/common'

export function pageBuilder(pageName: Page) {
  const elements: PageElements = {
    Toaster: 'toaster-message',
  }
  const dropdownOptionLookup: Record<string, Record<string, string>> = {}

  const builder = {
    withElements,
    withDropdownOptions,
    build,
  }

  function withElements<E extends PageElements>(newElements: E) {
    Object.assign(elements, newElements)
    pagesElements[pageName] = elements
    return builder
  }

  function withDropdownOptions(newDropdownOptions: Record<string, Record<string, string>>) {
    Object.assign(dropdownOptionLookup, newDropdownOptions)
    pageDropdownOptionsLookup[pageName] = dropdownOptionLookup
    return builder
  }

  function build() {
    const page = {
      elements,
    }

    return page
  }

  return builder
}

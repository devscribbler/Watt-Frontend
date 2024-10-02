import { RouteMatcher } from 'cypress/types/net-stubbing'
import get_authorization from '../../fixtures/get_authorization.json'
import get_banking from '../../fixtures/get_banking.json'
import get_company_lookup from '../../fixtures/get_company_lookup.json'
import get_contracts from '../../fixtures/get_contracts.json'
import get_postcodes from '../../fixtures/get_postcodes.json'
import get_provider from '../../fixtures/get_provider.json'
import get_providers from '../../fixtures/get_providers.json'
import get_quotes from '../../fixtures/get_quotes.json'
import get_usage from '../../fixtures/get_usage.json'
import patch_contracts from '../../fixtures/patch_contracts.json'
import post_banking from '../../fixtures/post_banking.json'
import post_company from '../../fixtures/post_company.json'
import post_company_no_direct_debit from '../../fixtures/post_company_no_direct_debit.json'
import post_contracts from '../../fixtures/post_contracts.json'
import post_quotes from '../../fixtures/post_quotes.json'
import post_usage from '../../fixtures/post_usage.json'
import post_verify_email from '../../fixtures/post_verify_email.json'
import post_verify_email_code from '../../fixtures/post_verify_email_code.json'
import { given, then, when, before } from '../steps'

const GUID_PATTERN = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
const POSTCODE_PATTERN = '[A-Z]{1,2}[0-9][0-9A-Z]?(?:%20|\\s)[0-9][A-Z]{2}'
const REGISTRATION_NUMBER_PATTERN = '[0-9]{8}'

type ApiRoutes = {
  get_authorization: RouteMatcher
  get_postcodes: RouteMatcher
  get_company_lookup: RouteMatcher
  post_verify_email: RouteMatcher
  post_verify_email_code: RouteMatcher
  post_company: RouteMatcher
  get_usage: RouteMatcher
  post_usage: RouteMatcher
  get_provider: RouteMatcher
  get_providers: RouteMatcher
  post_quotes: RouteMatcher
  get_quotes: RouteMatcher
  post_contracts: RouteMatcher
  get_contracts: RouteMatcher
  get_contract_pdf: RouteMatcher
  get_banking: RouteMatcher
  post_banking: RouteMatcher
  patch_contracts: RouteMatcher
}

const API_ROUTES: ApiRoutes = {
  get_authorization: {
    method: 'GET',
    url: 'v1/api/authorization',
  },
  get_postcodes: {
    method: 'GET',
    url: new RegExp(`v1/api/bridge/postcodes\\?postcode=${POSTCODE_PATTERN}`),
  },
  get_company_lookup: {
    method: 'GET',
    url: new RegExp(`v1/api/bridge/company-lookup\\?registration_number=${REGISTRATION_NUMBER_PATTERN}`),
  },
  post_verify_email: {
    method: 'POST',
    url: 'v1/api/companies/send-verify-email',
  },
  post_verify_email_code: {
    method: 'POST',
    url: 'v1/api/companies/verify-email-code',
  },
  post_company: {
    method: 'POST',
    url: 'v1/api/companies',
  },
  get_usage: {
    method: 'GET',
    url: new RegExp('v1/api/usage\\?utility_type=\\d+'),
  },
  post_usage: {
    method: 'POST',
    url: 'v1/api/usage',
  },
  get_provider: {
    method: 'GET',
    url: new RegExp(`v1/api/providers/${GUID_PATTERN}`),
  },
  get_providers: {
    method: 'GET',
    url: new RegExp('v1/api/providers(?:\\?utility_type=\\d+)?($|\\s)'),
  },
  post_quotes: {
    method: 'POST',
    url: new RegExp('v1/api/quotes(?:\\?utilities=\\d+)'),
  },
  get_quotes: {
    method: 'GET',
    url: new RegExp('v1/api/quotes(?:\\?utilities=\\d+)'),
  },
  post_contracts: {
    method: 'POST',
    url: new RegExp(`v1/api/contracts/${GUID_PATTERN}/\\d+`),
  },
  get_contracts: {
    method: 'GET',
    url: new RegExp('v1/api/contracts(?:\\?utilities=\\d+)'),
  },
  get_contract_pdf: {
    method: 'GET',
    url: new RegExp(`v1/api/contracts/${GUID_PATTERN}/pdf`),
  },
  get_banking: {
    method: 'GET',
    url: 'v1/api/public/banking',
  },
  post_banking: {
    method: 'POST',
    url: 'v1/api/public/banking',
  },
  patch_contracts: {
    method: 'PATCH',
    url: 'v1/api/contracts',
  },
}

// Define all the pages available
export enum Page {
  Home = '/',
  Company = '/company',
  ElectricityUsage = '/electricity',
  ElectricityQuote = '/electricity/quote',
  ElectricityContract = '/electricity/contract',
  ViewUnsignedPdf = 'blob:*/*-',
  Success = '/success',
  ViewSignedPdf = 'blob:*/*-',
  Error = '/error',
}

// TODO (Amelia): move these to each page file
const pageWaitAliases = {
  [Page.Home]: ['get-authorization'],
  [Page.Company]: [
    'get-authorization',
    'get-postcodes',
    'get-company-lookup',
    'post-company',
    'post-verify-email',
    'post-verify-email-code',
  ],
  [Page.ElectricityUsage]: ['get-authorization', 'get-usage', 'get-provider', 'get-providers', 'post-usage'],
  [Page.ElectricityQuote]: ['get-authorization', 'get-usage', 'get-provider', 'get-providers', 'post-quotes'],
  [Page.ElectricityContract]: ['post-contracts', 'post-banking', 'patch-contracts'],
}

// Set the current page context, defaults to Page.Home
let currentPage: Page = Page.Home

// Allow us to see debug logs from Cypress.Cookies
Cypress.Cookies.debug(true)

const tagToPageMapping = {
  '@page_home': Page.Home,
  '@page_company': Page.Company,
  '@page_electricity_usage': Page.ElectricityUsage,
  '@page_electricity_quote': Page.ElectricityQuote,
  '@page_electricity_contract': Page.ElectricityContract,
  '@page_success': Page.Success,
}

Object.entries(tagToPageMapping).forEach(([tag, page]) => {
  before({ tags: tag }, () => {
    currentPage = page
  })
})

type InterceptConfig = {
  route: RouteMatcher
  response: any
  statusCode?: number
  alias: string
  tag?: string
  stepsDescriptions?: string[]
  elements?: (keyof PageElements)[]
}

const interceptConfigs: InterceptConfig[] = [
  { route: API_ROUTES.get_authorization, response: get_authorization, alias: 'get-authorization' },
  { route: API_ROUTES.get_postcodes, response: get_postcodes, alias: 'get-postcodes' },
  { route: API_ROUTES.get_company_lookup, response: get_company_lookup, alias: 'get-company-lookup' },
  { route: API_ROUTES.post_verify_email, response: post_verify_email, alias: 'post-verify-email' },
  { route: API_ROUTES.post_verify_email_code, response: post_verify_email_code, alias: 'post-verify-email-code' },
  { route: API_ROUTES.post_company, response: post_company, alias: 'post-company' },
  {
    route: API_ROUTES.post_company,
    response: post_company_no_direct_debit,
    statusCode: 500,
    alias: 'post-company',
    tag: '@fixture_post_company_no_direct_debit',
  },
  { route: API_ROUTES.get_usage, response: get_usage, alias: 'get-usage' },
  { route: API_ROUTES.get_provider, response: get_provider, alias: 'get-provider' },
  { route: API_ROUTES.get_providers, response: get_providers, alias: 'get-providers' },
  { route: API_ROUTES.post_usage, response: post_usage, alias: 'post-usage' },
  { route: API_ROUTES.post_quotes, response: post_quotes, alias: 'post-quotes' },
  { route: API_ROUTES.get_quotes, response: get_quotes, alias: 'get-quotes' },
  { route: API_ROUTES.post_contracts, response: post_contracts, alias: 'post-contracts' },
  { route: API_ROUTES.get_contracts, response: get_contracts, alias: 'get-contracts' },
  { route: API_ROUTES.get_banking, response: get_banking, alias: 'get-banking' },
  // Amelia get_contract_pdf responds with a pdf but we are just testing that the request is made
  { route: API_ROUTES.get_contract_pdf, response: get_contracts, alias: 'get-contract-pdf' },
  { route: API_ROUTES.post_banking, response: post_banking, alias: 'post-banking' },
  { route: API_ROUTES.patch_contracts, response: patch_contracts, alias: 'patch-contracts' },
]

before(() => {
  // Register all the default intercepts that don't have a tag
  interceptConfigs
    .filter(({ tag }) => tag === undefined)
    .forEach(({ route, response, statusCode, alias }) => {
      cy.intercept(route, {
        statusCode: statusCode || 200,
        body: response,
      }).as(alias)
    })
})

// Must be called after the default intercepts are registered
interceptConfigs
  .filter(({ tag }) => tag)
  .forEach(({ route, response, statusCode, alias, tag }) => {
    before({ tags: tag }, () => {
      cy.log('Intercepting', route, 'as', alias, 'for tag', tag)
      cy.intercept(route, {
        statusCode: statusCode || 200,
        body: response,
      }).as(alias)
    })
  })

// Gets the pages from the Page enum and converts them to a Record
const _pages = Object.keys(Page).reduce((acc, key) => {
  acc[key] = Page[key]
  return acc
}, {} as Record<keyof typeof Page, string>)

// Define the elements that are available on each page
export type PageElements = Record<string, string | { (position?: number): string }>

// Store the elements registered with the page builder in a lookup
export const pagesElements: Record<string, PageElements> = {
  // Default page elements available on all pages
  shared: {
    Toaster: 'toaster-message',
  },
  // page builder will insert objects into here for each page.
}

export const pageDropdownOptionsLookup: Record<string, Record<string, Record<string, string>>> = {}

const _getElement = (element: keyof PageElements, option?: string): string => {
  const elementSelector = pagesElements[currentPage][element]

  if (typeof elementSelector === 'string') {
    return `[data-test=test-${elementSelector}]`
  }

  if (option === undefined) {
    return `[data-test=test-${elementSelector(undefined)}]`
  }

  return `[data-test=test-${elementSelector(parseInt(option))}]`
}

given('the user is on the {string} page', (pageName: Page) => {
  cy.visit(_pages[pageName])
})

when('the user clicks {string} at {string} index', (element: keyof PageElements, position: string) => {
  cy.log(`clicking '${position}' '${element}' button`)

  cy.get(_getElement(element)).then(($element) => {
    if ($element.attr('target') === '_blank') {
      cy.wrap($element).invoke('removeAttr', 'href').invoke('removeAttr', 'target')
    }
  })

  cy.get(_getElement(element)).eq(parseInt(position)).click({ force: true })
})

when('the user does not click {string} at {string} index', (element: keyof PageElements, position: string) => {
  cy.log(`clicking '${position}' '${element}' button`)
})

when('the user clicks {string}', (element: keyof PageElements) => {
  cy.log(`clicking '${element}' button`)

  cy.get(_getElement(element)).then(($element) => {
    if ($element.attr('target') === '_blank') {
      cy.wrap($element).invoke('removeAttr', 'href').invoke('removeAttr', 'target')
    }
  })

  cy.get(_getElement(element)).click({ force: true })
})

when('the user types {string} into the {string} field', (value: string, element: keyof PageElements) => {
  cy.get(_getElement(element)).type(value)
  if (element === 'Postcode') {
    cy.wait('@get-postcodes')
  }
})

when('the user selects {string} from the {string} dropdown menu', (option: string, element: keyof PageElements) => {
  cy.get(_getElement(element)).click()
  cy.get(
    _getElement(element, pageDropdownOptionsLookup[currentPage][element]?.[option.toLocaleLowerCase()] ?? option)
  ).click()

  if (element === 'Email address') {
    cy.wait('@post-verify-email')
  }
})

then('the user should be taken to the {string} page', (pageName: Page) => {
  if (pageWaitAliases[pageName] && pageWaitAliases[pageName].length > 0) {
    pageWaitAliases[pageName].forEach((alias) => {
      cy.wait(`@${alias}`)
    })
  }

  cy.url().should('contain', _pages[pageName])
})

then('the user should see {string} in the {string} field', (value: string, element: keyof PageElements) => {
  if (element === 'Business name') {
    cy.wait('@get-company-lookup')
  }

  cy.get(_getElement(element))
    .then((el) => (el.is('input') ? el : el.find('input')))
    .should('have.value', value)
})

then('the user sees a toaster {string} message {string}', (type: string, value: string) => {
  cy.get(_getElement('Toaster')).should('be.visible')
  cy.get(_getElement('Toaster')).should('exist')
  cy.get(_getElement('Toaster')).should('contain', value)
})

then(
  'the user sees form validation message {string} associated with the {string} field',
  (value: string, element: keyof PageElements) => {
    const getErrorElement = (element: string): string => {
      const errorElement = element.replace('form-field-', 'form-field-error-')
      return errorElement
    }

    const errorElement = getErrorElement(_getElement(element))

    cy.get(errorElement).should('be.visible')
    cy.get(errorElement).should('exist')
    cy.get(errorElement).should('contain', value)
  }
)

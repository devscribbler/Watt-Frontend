import { pageBuilder } from '../page_builder'
import { Page } from './common'

pageBuilder(Page.Company)
  .withElements({
    Postcode: 'form-field-company-sitepostcode',
    'Site address': (position?: number) =>
      `form-field-company-siteaddress${position !== undefined ? '-' + position : ''}`,
    'Business type': (position?: number) => `form-field-company-type${position !== undefined ? '-' + position : ''}`,
    'Limited company': 'company-type-1',
    Charity: 'company-type-2',
    'Sole trader': 'company-type-3',
    'Business name': 'form-field-company-name',
    'Registration number': 'form-field-company-registrationnumber',
    'Charity number': 'form-field-company-charitynumber',
    'Soletrader postcode': 'form-field-company-soletraderpersonaldetails-addresses-0-postcode',
    'Soletrader address': 'form-field-company-soletraderpersonaldetails-addresses-0-address',
    'Soletrader move in': 'form-field-company-soletraderpersonaldetails-addresses-0-moved-in-at',
    'Soletrader move out': 'form-field-company-soletraderpersonaldetails-addresses-0-moved-out-at',

    'Contact email': 'form-field-contact-contactemail',
    'Send verification email': 'form-button-send-verification-email',
    'Verification code': 'form-field-contact-code',
    Verify: 'form-button-verify',
    'Business phone number': 'form-field-contact-businessphonenumber',
    Forename: 'form-field-contact-contactforename',
    Surname: 'form-field-contact-contactsurname',
    'Soletrader date of birth': 'form-field-company-soletraderpersonaldetails-dateofbirth',
    'Company position': 'form-field-contact-position',
    'Same address': 'form-field-contact-addresssameassite',
    'Business postcode': 'form-field-contact-postcode',
    'Business address': 'form-field-contact-address',

    'I am authorised': 'form-field-agreementset-authorized',
    'I agree to credit check': 'form-field-agreementset-creditcheck',
    'I sign LOA': 'form-field-agreementset-letterofauthority',
    'I agree T&C': 'form-field-agreementset-termsandconditions',
    'I agree to smart meter': 'form-field-agreementset-smartmeteragreement',
    'I agree to direct debit': 'form-field-agreementset-directdebitagreement',

    Submit: 'form-button-submit',
  })
  .withDropdownOptions({
    'Business type': {
      'limited company': '1',
      charity: '2',
      'sole trader': '3',
    },
  })
  .build()

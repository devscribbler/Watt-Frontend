import { pageBuilder } from '../page_builder'
import { Page } from './common'

pageBuilder(Page.ElectricityContract)
  .withElements({
    'View PDF': 'form-button-view-pdf',
    'Bank name': 'form-field-bankname',
    'Account name': 'form-field-accountholdername',
    'Account number': 'form-field-accountnumber',
    'Sort code': 'form-field-sortcode',
    Signature: 'form-field-signature',
    Comments: 'form-field-comments',
    'I confirm that I am authorized': 'form-field-isauthorized',
    'I understand commission': 'form-field-termsandconditions',
    'Sign Contract': 'form-button-sign-contract',
    Back: 'form-button-back',
  })
  .build()

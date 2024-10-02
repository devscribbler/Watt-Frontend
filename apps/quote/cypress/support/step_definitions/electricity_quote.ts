import { pageBuilder } from '../page_builder'
import { Page } from './common'

pageBuilder(Page.ElectricityQuote)
  .withElements({
    'Sign Me Up': 'form-button-sign-me-up',
  })
  .build()

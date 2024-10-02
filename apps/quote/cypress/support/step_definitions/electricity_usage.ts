import { pageBuilder } from '../page_builder'
import { Page } from './common'

pageBuilder(Page.ElectricityUsage)
  .withElements({
    'See Quote': 'form-button-see-quote',
  })
  .build()

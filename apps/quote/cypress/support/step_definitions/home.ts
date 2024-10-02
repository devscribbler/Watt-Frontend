import { pageBuilder } from '../page_builder'
import { Page } from './common'

pageBuilder(Page.Home)
  .withElements({
    'Get a quote': 'form-button-get-a-quote',
    Electricity: 'utility-selector-electricity',
    Gas: 'utility-selector-gas',
    Water: 'utility-selector-water',
    Telecom: 'utility-selector-telecom',
    Internet: 'utility-selector-internet',
  })
  .build()

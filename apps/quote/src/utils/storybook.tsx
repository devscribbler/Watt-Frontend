import { configureStore } from '@reduxjs/toolkit'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { quoteBuilder } from '@watt/api-interface'
import { quoteRatesBuilder } from '@watt/constants'
import { bankingSlice } from '../store/reducers/banking/bankingSlice'
import { cartSlice } from '../store/reducers/cart/cartSlice'
import { companySlice } from '../store/reducers/company/companySlice'
import { formSlice } from '../store/reducers/form/formSlice'
import { providersSlice } from '../store/reducers/providers/providersSlice'
import { quotesSlice } from '../store/reducers/quotes/quotesSlice'
import { usageSlice } from '../store/reducers/usage/usageSlice'

/**
 * A decorator to wrap stories in a Provider and a SnackbarProvider
 *
 * This is used to provide fake application data in the Redux store so
 * that stories can be rendered.
 *
 * @param storyFn The story function
 * @returns The story wrapped in a Provider and a SnackbarProvider
 */
export const storyDecorator = (storyFn: () => JSX.Element): JSX.Element => (
  <Provider store={templateStore}>
    <SnackbarProvider>{storyFn()}</SnackbarProvider>
  </Provider>
)

const templateStore = configureStore({
  reducer: {
    usage: usageSlice.reducer,
    cart: cartSlice.reducer,
    form: formSlice.reducer,
    company: companySlice.reducer,
    providers: providersSlice.reducer,
    quotes: quotesSlice.reducer,
    banking: bankingSlice.reducer,
  },
  preloadedState: {
    usage: {
      status: 'success',
      electricity: {
        usage: [
          { year_month: '2021-01', monthly_usage: 1 },
          { year_month: '2021-02', monthly_usage: 2 },
          { year_month: '2021-03', monthly_usage: 4 },
          { year_month: '2021-04', monthly_usage: 3 },
          { year_month: '2021-05', monthly_usage: 2 },
          { year_month: '2021-06', monthly_usage: 2 },
          { year_month: '2021-07', monthly_usage: 2 },
          { year_month: '2021-08', monthly_usage: 2 },
          { year_month: '2021-09', monthly_usage: 2 },
          { year_month: '2021-10', monthly_usage: 2 },
          { year_month: '2021-11', monthly_usage: 2 },
          { year_month: '2021-12', monthly_usage: 2 },
        ],
        contract: {
          post_code: 'EX1 1AA',
          total_annual_usage: 150,
          mpan: '123456789012345678901',
          mprn: '1234567890',
          start_date: '2020-01-01',
          supplier_name: 'Example Co',
          provider_id: '1',
        },
      },
      gas: null,
    },
    cart: {
      status: 'success',
      electricity: {
        selectedQuote: {
          id: '1',
          IMMUTABLE_INDEX: 1,
          currentSupplier: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: 'https://watt.co.uk/wp-content/themes/Watt-Theme-2.0/images/watt-logo.svg',
            is_displayed_on_current_supplier_list: true,
          },
          nextSupplier: {
            id: '2',
            name: 'Test Supplier 2',
            logo_file_name: 'https://watt.co.uk/wp-content/themes/Watt-Theme-2.0/images/watt-logo.svg',
            is_displayed_on_current_supplier_list: true,
          },
          currentSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(100)
            .withAnnualPrice(100)
            .withStandingCharge(100)
            .withPriceGuaranteed(1)
            .withDuration(1)
            .withContractType('Example Current Contract Type')
            .build(),
          nextSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(300)
            .withAnnualPrice(300)
            .withStandingCharge(300)
            .withPriceGuaranteed(3)
            .withDuration(1)
            .withContractType('Example Next Contract Type')
            .build(),
          contractPeriodMonths: 1,
          acceptedPaymentMethod: 'DIRECT_DEBIT',
        },
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-02',
          id: '1',
          quote: quoteBuilder().build(),
          is_signed: true,
          utility_type: 1,
          status: 3,
          pdfUrl: '',
        },
      },
      gas: {
        selectedQuote: {
          id: '1',
          IMMUTABLE_INDEX: 1,
          currentSupplier: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          nextSupplier: {
            id: '2',
            name: 'Test Supplier 2',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          currentSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(100)
            .withAnnualPrice(100)
            .withStandingCharge(100)
            .withPriceGuaranteed(1)
            .withDuration(1)
            .withContractType('Example Current Contract Type')
            .build(),
          nextSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(300)
            .withAnnualPrice(300)
            .withStandingCharge(300)
            .withPriceGuaranteed(3)
            .withDuration(1)
            .withContractType('Example Next Contract Type')
            .build(),
          contractPeriodMonths: 1,
          acceptedPaymentMethod: 'DIRECT_DEBIT',
        },
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-02',
          id: '1',
          quote: quoteBuilder().build(),
          is_signed: true,
          utility_type: 1,
          status: 1,
          pdfUrl: '',
        },
      },
      water: {
        selectedQuote: {
          id: '1',
          IMMUTABLE_INDEX: 1,
          currentSupplier: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          nextSupplier: {
            id: '2',
            name: 'Test Supplier 2',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          currentSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(100)
            .withAnnualPrice(100)
            .withStandingCharge(100)
            .withPriceGuaranteed(1)
            .withDuration(1)
            .withContractType('Example Current Contract Type')
            .build(),
          nextSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(300)
            .withAnnualPrice(300)
            .withStandingCharge(300)
            .withPriceGuaranteed(3)
            .withDuration(1)
            .withContractType('Example Next Contract Type')
            .build(),
          contractPeriodMonths: 1,
          acceptedPaymentMethod: 'DIRECT_DEBIT',
        },
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-02',
          id: '1',
          quote: quoteBuilder().build(),
          is_signed: true,
          utility_type: 1,
          status: 1,
          pdfUrl: '',
        },
      },
      internet: {
        selectedQuote: {
          id: '1',
          IMMUTABLE_INDEX: 1,
          currentSupplier: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          nextSupplier: {
            id: '2',
            name: 'Test Supplier 2',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          currentSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(100)
            .withAnnualPrice(100)
            .withStandingCharge(100)
            .withPriceGuaranteed(1)
            .withDuration(1)
            .withContractType('Example Current Contract Type')
            .build(),
          nextSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(300)
            .withAnnualPrice(300)
            .withStandingCharge(300)
            .withPriceGuaranteed(3)
            .withDuration(1)
            .withContractType('Example Next Contract Type')
            .build(),
          contractPeriodMonths: 1,
          acceptedPaymentMethod: 'DIRECT_DEBIT',
        },
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-02',
          id: '1',
          quote: quoteBuilder().build(),
          is_signed: true,
          utility_type: 1,
          status: 1,
          pdfUrl: '',
        },
      },
      telephone: {
        selectedQuote: {
          id: '1',
          IMMUTABLE_INDEX: 1,
          currentSupplier: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          nextSupplier: {
            id: '2',
            name: 'Test Supplier 2',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          currentSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(100)
            .withAnnualPrice(100)
            .withStandingCharge(100)
            .withPriceGuaranteed(1)
            .withDuration(1)
            .withContractType('Example Current Contract Type')
            .build(),
          nextSupplierRates: quoteRatesBuilder()
            .withDayUnitRate(300)
            .withAnnualPrice(300)
            .withStandingCharge(300)
            .withPriceGuaranteed(3)
            .withDuration(1)
            .withContractType('Example Next Contract Type')
            .build(),
          contractPeriodMonths: 1,
          acceptedPaymentMethod: 'DIRECT_DEBIT',
        },
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-02',
          id: '1',
          quote: quoteBuilder().build(),
          is_signed: true,
          utility_type: 1,
          status: 1,
          pdfUrl: '',
        },
      },
    },
    company: {
      status: 'success',
      setCompanyDetailsStatus: 'initial',
      emailAddress: 'example@watt.co.uk',
      mpan_key: ['12345678910_key'],
      mprn_key: ['12345678910_key'],
      mpan: '12345678910',
      mprn: '12345678910',
      isPremium: false,
      company: {
        type: 'Example',
        name: 'Example Co',
        registrationNumber: '123456',
        sitePostcode: 'EX1 1EX',
        siteAddress: '12',
      },
    },
    providers: {
      status: 'success',
      providers: [
        {
          id: '1',
          name: 'ENGIE',
          logo_file_name: 'https://i.imgur.com/HfYFGug.png',
          is_displayed_on_current_supplier_list: true,
        },
        {
          id: '2',
          name: 'BRITISH GAS',
          logo_file_name: 'https://i.imgur.com/5Dzcx7U.png',
          is_displayed_on_current_supplier_list: true,
        },
        {
          id: '4',
          name: 'EDF ENERGY',
          logo_file_name: 'https://i.imgur.com/3MLkJqf.png',
          is_displayed_on_current_supplier_list: true,
        },
        {
          id: '6',
          name: 'NPOWER',
          logo_file_name: 'https://i.imgur.com/GnSgv4q.png',
          is_displayed_on_current_supplier_list: true,
        },
      ],
    },
    quotes: {
      status: 'success',
      electricity: {
        id: '1',
        expirationDate: '2020-01-01',
        rawQuotes: [
          {
            id: '1',
            IMMUTABLE_INDEX: 1,
            currentSupplier: {
              id: '1',
              name: 'ENGIE',
              logo_file_name: 'https://i.imgur.com/HfYFGug.png',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '2',
              name: 'ENGIE',
              logo_file_name: 'https://i.imgur.com/HfYFGug.png',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(300)
              .withAnnualPrice(300)
              .withStandingCharge(300)
              .withPriceGuaranteed(3)
              .withDuration(1)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 1,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
          {
            id: '2',
            IMMUTABLE_INDEX: 2,
            currentSupplier: {
              id: '1',
              name: 'ENGIE',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '3',
              name: 'British Gas',
              logo_file_name: 'https://i.imgur.com/5Dzcx7U.png',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(400)
              .withAnnualPrice(400)
              .withStandingCharge(400)
              .withPriceGuaranteed(4)
              .withDuration(2)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 2,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
          {
            id: '3',
            IMMUTABLE_INDEX: 3,
            currentSupplier: {
              id: '1',
              name: 'Engie',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '4',
              name: 'eon energy',
              logo_file_name: 'https://i.imgur.com/nvLNCvH.png',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(400)
              .withAnnualPrice(400)
              .withStandingCharge(400)
              .withPriceGuaranteed(4)
              .withDuration(2)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 3,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
          {
            id: '4',
            IMMUTABLE_INDEX: 4,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '5',
              name: 'edf energy',
              logo_file_name: 'https://i.imgur.com/3MLkJqf.png',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(400)
              .withAnnualPrice(400)
              .withStandingCharge(400)
              .withPriceGuaranteed(4)
              .withDuration(2)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 4,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
          {
            id: '5',
            IMMUTABLE_INDEX: 5,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '5',
              name: 'npower',
              logo_file_name: 'https://i.imgur.com/GnSgv4q.png',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(700)
              .withAnnualPrice(700)
              .withStandingCharge(700)
              .withPriceGuaranteed(7)
              .withDuration(3)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 5,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
        ],
        displayAll: true,
        appliedFilters: [],
        ratePercentage: {
          day: 70,
          night: 20,
          weekend: 10,
        },
      },
      gas: {
        id: '1',
        expirationDate: '2020-01-01',
        rawQuotes: [
          {
            id: '1',
            IMMUTABLE_INDEX: 1,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '2',
              name: 'Test Supplier 2',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(300)
              .withAnnualPrice(300)
              .withStandingCharge(300)
              .withPriceGuaranteed(3)
              .withDuration(1)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 1,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
        ],
        displayAll: false,
        appliedFilters: [],
      },
      water: {
        id: '1',
        expirationDate: '2020-01-01',
        rawQuotes: [
          {
            id: '1',
            IMMUTABLE_INDEX: 1,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '2',
              name: 'Test Supplier 2',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(300)
              .withAnnualPrice(300)
              .withStandingCharge(300)
              .withPriceGuaranteed(3)
              .withDuration(1)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 1,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
        ],
        displayAll: false,
        appliedFilters: [],
      },
      telephone: {
        id: '1',
        expirationDate: '2020-01-01',
        rawQuotes: [
          {
            id: '1',
            IMMUTABLE_INDEX: 1,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '2',
              name: 'Test Supplier 2',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(300)
              .withAnnualPrice(300)
              .withStandingCharge(300)
              .withPriceGuaranteed(3)
              .withDuration(1)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 1,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
        ],
        displayAll: false,
        appliedFilters: [],
      },
      internet: {
        id: '1',
        expirationDate: '2020-01-01',
        rawQuotes: [
          {
            id: '1',
            IMMUTABLE_INDEX: 1,
            currentSupplier: {
              id: '1',
              name: 'Test Supplier',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            nextSupplier: {
              id: '2',
              name: 'Test Supplier 2',
              logo_file_name: '',
              is_displayed_on_current_supplier_list: true,
            },
            currentSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(100)
              .withAnnualPrice(100)
              .withStandingCharge(100)
              .withPriceGuaranteed(1)
              .withDuration(1)
              .withContractType('Example Current Contract Type')
              .build(),
            nextSupplierRates: quoteRatesBuilder()
              .withDayUnitRate(300)
              .withAnnualPrice(300)
              .withStandingCharge(300)
              .withPriceGuaranteed(3)
              .withDuration(1)
              .withContractType('Example Next Contract Type')
              .build(),
            contractPeriodMonths: 1,
            acceptedPaymentMethod: 'DIRECT_DEBIT',
          },
        ],
        displayAll: false,
        appliedFilters: [],
      },
    },
  },
})

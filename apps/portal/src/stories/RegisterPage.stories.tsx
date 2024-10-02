import * as React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Story, Meta } from '@storybook/react'
import { Provider } from 'react-redux'
import RegisterPage from '../pages/RegisterPage'
import { accountSlice } from '../store/reducers/account/accountSlice'
import { authSlice } from '../store/reducers/auth/authSlice'
import { contractsSlice } from '../store/reducers/contracts/contractsSlice'
import { usageSlice } from '../store/reducers/usage/usageSlice'

const templateStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    usage: usageSlice.reducer,
    contracts: contractsSlice.reducer,
  },
  preloadedState: {
    auth: {
      status: 'unauthenticated',
      user: {
        email: '',
      },
      tokens: {
        accessToken: '',
      },
    },
    account: {
      status: 'success',
      setCompanyDetailsStatus: 'success',
      emailAddress: 'text@example.com',
      mpan: '123456789123456',
      mprn: '123456789123456',
      company: {
        type: 'private',
        name: 'Test Company',
        registrationNumber: '12456789',
        sitePostcode: 'SW1A 1AA',
        siteAddress: 'Test Address',
      },
      contact: {
        businessPhoneNumber: '0123456789',
        contactName: 'Test Contact',
        position: 'CEO',
        postcode: 'SW1A 1AA',
        address: 'Test Address',
      },
    },
    usage: {
      status: 'success',
      electricity: {
        usage: [
          {
            year_month: '2020-01',
            monthly_usage: 1,
          },
          {
            year_month: '2020-02',
            monthly_usage: 2,
          },
          {
            year_month: '2020-03',
            monthly_usage: 3,
          },
        ],
        contract: {
          post_code: 'SW1A 1AA',
          total_annual_usage: 2,
          mpan: '123456789123456',
          mprn: '123456789123456',
          start_date: '2020-01-01',
          supplier_name: 'Test Supplier',
          provider_id: '1',
        },
      },
      gas: {
        usage: [
          {
            year_month: '2020-01',
            monthly_usage: 2,
          },
        ],
        contract: {
          start_date: '2020-01-01',
          end_date: '2020-01-01',
          period: 1,
          non_watt_provider_name: null,
          total_annual_usage: 2,
          mpan: '123456789123456',
          mprn: '123456789123456',
          provider_id: '1',
        },
      },
    },
    contracts: {
      status: 'success',
      contracts: [
        {
          contract: {
            status: 3,
            id: '1',
            start_date: '2020-01-01',
            end_date: '2020-03-02',
            is_signed: true,
            utility_type: 1,
            quote: {
              annual_price: 200,
              contract_type: 'electricity',
              day_unit_rate: 0.15,
              night_unit_rate: 0.3,
              evening_unit_rate: 0.3,
              weekend_unit_rate: 0.3,
              off_peak_unit_rate: 0.3,
              duration: 2,
              end_date: '2020-03-02',
              is_comparison_provider: false,
              price_guaranteed: 190,
              provider_id: '1',
              capacity_charge_kva: '10',
              standing_charge: 0,
            },
          },
          provider: {
            id: '1',
            name: 'Test Supplier',
            logo_file_name: '',
            is_displayed_on_current_supplier_list: true,
          },
          quote: {
            id: '1',
            utility_type: 1,
            expiration_date: '2020-03-02',
            quotes: [
              {
                annual_price: 200,
                contract_type: 'electricity',
                day_unit_rate: 0.15,
                night_unit_rate: 0.3,
                evening_unit_rate: 0.3,
                weekend_unit_rate: 0.3,
                off_peak_unit_rate: 0.3,
                duration: 2,
                end_date: '2020-03-02',
                is_comparison_provider: false,
                price_guaranteed: 190,
                provider_id: '1',
                capacity_charge_kva: '10',
                standing_charge: 0,
              },
            ],
          },
        },
      ],
      contractPDF: '' as never,
    },
  },
})

export default {
  component: RegisterPage,
  title: 'Portal/Pages/Account/RegisterPage',
} as Meta

const Template: Story<React.ComponentProps<typeof RegisterPage>> = (args) => {
  return (
    <>
      <Provider store={templateStore}>
        <RegisterPage {...args} />
      </Provider>
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}

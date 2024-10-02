import * as React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Story, Meta } from '@storybook/react'
import { Provider } from 'react-redux'
import IndexPage from '../pages/IndexPage'
import { accountSlice } from '../store/reducers/account/accountSlice'
import { authSlice } from '../store/reducers/auth/authSlice'
import { usageSlice } from '../store/reducers/usage/usageSlice'

const templateStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    usage: usageSlice.reducer,
  },
  preloadedState: {
    auth: {
      status: 'authenticated',
      user: {
        email: 'test@example.com',
      },
      tokens: {
        accessToken: 'accessToken',
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
  },
})

export default {
  component: IndexPage,
  title: 'Portal/Pages/Index',
} as Meta

const Template: Story<React.ComponentProps<typeof IndexPage>> = (args) => {
  return (
    <>
      <Provider store={templateStore}>
        <IndexPage {...args} />
      </Provider>
    </>
  )
}

export const Default = Template.bind({})

Default.args = {}

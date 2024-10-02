import { API_ROUTES, API_URL } from '@watt/constants'

export const cfg = {
  features: {
    water: false,
    telecom: false,
    internet: false,
  },
  pages: {
    home: '/',
    register: '/register',
    login: '/login',
    forgotPassword: '/forgot-password',
    account: '/account',
  },
  api: {
    routes: {
      register: `${API_URL}${API_ROUTES.register}`,
      login: `${API_URL}${API_ROUTES.login}`,
      logout: `${API_URL}${API_ROUTES.logout}`,
      refreshToken: `${API_URL}${API_ROUTES.refreshToken}`,
      changePassword: `${API_URL}${API_ROUTES.changePassword}`,
      forgotPassword: `${API_URL}${API_ROUTES.forgotPassword}`,
      sendSecurityCode: `${API_URL}${API_ROUTES.sendSecurityCode}`,
      changeEmail: `${API_URL}${API_ROUTES.changeEmail}`,
      getContracts: `${API_URL}${API_ROUTES.contracts}?utilities=1&utilities=2&utilities=3&utilities=4&utilities=5`,
      getContractProvider: `${API_URL}${API_ROUTES.getContractProvider}`,
      getContractPDF: `${API_URL}${API_ROUTES.getContractPDF}`,
      changePasswordAccount: `${API_URL}${API_ROUTES.changePasswordAccount}`,
      companyDetails: `${API_URL}${API_ROUTES.companyDetails}`,
      companyContactDetails: `${API_URL}${API_ROUTES.companyContactDetails}`,
      postcode: `${API_URL}${API_ROUTES.postcode}`,
      getSession: `${API_URL}${API_ROUTES.getSession}`,
      usage: `${API_URL}${API_ROUTES.usage}`,

      temporary: {
        bookOfRa: `${API_URL}${API_ROUTES.temporary.bookOfRa}`,
        getUser: `${API_URL}${API_ROUTES.temporary.getUser}`,
      },
    },
  },
} as const

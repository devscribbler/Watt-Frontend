export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_ROUTES = {
  banking: `/v1/api/public/banking`,
  register: `/v1/api/public/authentication/register`,
  login: `/v1/api/public/authentication/login`,
  logout: `/v1/api/users/logout`,
  refreshToken: `/v1/api/users/refresh-token`,
  changePassword: `/v1/api/public/authentication/registration-email-code`,
  forgotPassword: '/api/forgot-password',
  sendSecurityCode: `/v1/api/users/change-email-code`,
  changeEmail: `/v1/api/users/change-email`,
  contracts: `/v1/api/contracts`,
  getContractProvider: `/v1/api/providers`,
  getContractPDF: `/v1/api/contracts`,
  changePasswordAccount: `/v1/api/users/change-password`,
  companyDetails: `/v1/api/companies`,
  companyContactDetails: `/v1/api/companies/contact`,
  companyLookup: `/v1/api/bridge/company-lookup`,
  postcode: `/v1/api/bridge/postcodes`,
  getSession: `/v1/api/authorization`,
  rejoin: '/v1/api/authorization/rejoin',
  usage: `/v1/api/usage`,
  providers: `/v1/api/providers`,
  quotes: `/v1/api/quotes`,
  sendEmailCode: '/v1/api/companies/send-verify-email',
  verifyCode: 'v1/api/companies/verify-email-code',
  temporary: {
    bookOfRa: `/v1/api/public/authentication/book-of-ra`,
    getUser: `/v1/api/public/authentication/details`,
  },
  public: {
    companies: {
      createAcquisition: '/v1/api/companies/create-acquisition',
      create: '/v1/api/companies',
    },
  },
} as const

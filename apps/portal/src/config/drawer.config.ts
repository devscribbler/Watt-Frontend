import en from '~/i18n'

export const drawerConfig = [
  {
    label: en.drawerList.dashboard,
    to: '/',
    keys: 'home',
  },
  {
    label: en.drawerList.myContracts,
    to: '/contracts',
    keys: 'contracts',
  },
  {
    label: en.drawerList.companyDetails,
    to: '/company',
    keys: 'company',
  },
  // {
  //   label: en.drawerList.paymentsDetails,
  //   to: '/payment_details',
  //   keys: 'payment',
  // },
  {
    label: en.drawerList.changeEmail,
    to: '/change-email',
    keys: 'changeEmail',
  },
  {
    label: en.drawerList.changePassword,
    to: '/change-password',
    keys: 'changePassword',
  },
]

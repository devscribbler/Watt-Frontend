import { Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { BottomSection } from '@watt/portal/features/companyInfo/BottomSection/BottomSection'
import en from '@watt/portal/i18n'
import { useSpacing } from '@watt/theme'
import { ChangeAccountInfo } from '../features/accountInfo/index'

const AccountInfoPage: NextPage = () => {
  const [mt16, mb10] = useSpacing('mt16', 'mb10')

  return (
    <>
      <Typography variant="h3" component="h1" className={clsx(mt16, mb10)}>
        {en.accountInfo.title}
      </Typography>
      <ChangeAccountInfo />
      <BottomSection />
    </>
  )
}

export default AccountInfoPage

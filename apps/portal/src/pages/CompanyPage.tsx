import { Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSpacing } from '@watt/theme'
import { BottomSection } from '~/features/companyInfo/BottomSection/BottomSection'
import { CompanyPage } from '~/features/companyInfo/CompanyPage/CompanyPage'
import en from '~/i18n'

const CompanyInformationPage: NextPage = () => {
  const [mt16, mb10] = useSpacing('mt16', 'mb10')

  return (
    <>
      <Typography variant="h3" component="h1" className={clsx(mt16, mb10)}>
        {en.companyInformation.title}
      </Typography>
      <CompanyPage />
      <BottomSection />
    </>
  )
}

export default CompanyInformationPage
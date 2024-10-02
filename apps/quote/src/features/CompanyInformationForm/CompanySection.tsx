import { Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { CompanyForm } from './CompanyForm'

export const CompanySection = (): JSX.Element => {
  const [mb8] = useSpacing('mb8')

  return (
    <>
      <Typography variant="h5" component="h2" className={mb8}>
        {en.companyInformation.companyForm.title}
      </Typography>
      <CompanyForm />
    </>
  )
}

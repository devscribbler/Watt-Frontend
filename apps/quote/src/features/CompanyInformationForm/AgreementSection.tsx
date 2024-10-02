import { Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { AgreementForm } from './AgreementForm'

export const AgreementSection = (): JSX.Element => {
  const [mb8] = useSpacing('mb8')

  return (
    <>
      <Typography variant="h5" component="h2" className={mb8}>
        {en.companyInformation.agreementSet.title}
      </Typography>
      <AgreementForm />
    </>
  )
}

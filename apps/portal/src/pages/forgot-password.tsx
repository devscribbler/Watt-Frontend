import { Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ForgotPasswordForm } from '~/components/ForgotPasswordForm/ForgotPasswordForm'
import { LayoutDefault } from '~/components/common/LayoutDefault/LayoutDefault'
import en from '~/i18n'

const ForgotPasswordPage: NextPage = () => {
  return (
    <LayoutDefault title={en.forgotPassword.title}>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1" align="center">
          {en.forgotPassword.title}
        </Typography>
        <ForgotPasswordForm />
      </Container>
    </LayoutDefault>
  )
}

export default ForgotPasswordPage

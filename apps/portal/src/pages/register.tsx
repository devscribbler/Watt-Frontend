import * as React from 'react'
import { Container, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import { LayoutDefault } from '~/components/common/LayoutDefault/LayoutDefault'
import { SignUpForm } from '~/features/register/SignUpForm/SignUpForm'
import en from '~/i18n'

const RegisterPage: React.FunctionComponent = () => {
  const [mt16, mb10] = useSpacing('mt16', 'mb10')

  return (
    <LayoutDefault title={en.register.title}>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1" align="center" className={clsx(mt16, mb10)}>
          {en.register.title}
        </Typography>
        <SignUpForm />
      </Container>
    </LayoutDefault>
  )
}

export default RegisterPage

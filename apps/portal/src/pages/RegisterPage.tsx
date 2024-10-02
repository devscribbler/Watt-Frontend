import * as React from 'react'
import { Container, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import { SignUpForm } from '~/features/register/SignUpForm/SignUpForm'
import en from '~/i18n'

const RegisterPage: React.FunctionComponent = () => {
  const [mt16, mb10] = useSpacing('mt16', 'mb10')

  return (
    <>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1" align="center" className={clsx(mt16, mb10)}>
          {en.register.title}
        </Typography>
        <SignUpForm />
      </Container>
    </>
  )
}

export default RegisterPage

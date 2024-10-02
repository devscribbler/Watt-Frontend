import { Container, Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSpacing } from '@watt/theme'
import { LoginForm } from '~/components/LoginForm/LoginForm'
import { LayoutDefault } from '~/components/common/LayoutDefault/LayoutDefault'
import en from '~/i18n'

const LoginPage: NextPage = () => {
  const [mt16, mb10] = useSpacing('mt16', 'mb10')

  return (
    <LayoutDefault title={en.login.title}>
      <Container maxWidth="xs">
        <Typography variant="h3" component="h1" align="center" className={clsx(mt16, mb10)}>
          {en.login.title}
        </Typography>
        <LoginForm />
      </Container>
    </LayoutDefault>
  )
}

export default LoginPage

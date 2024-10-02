import * as React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { axios } from '@watt/api-interface'
import { ButtonLoading } from '@watt/components'
import { cfg } from '~/config/config'
import en from '~/i18n'

export const ForgotPasswordForm: React.FunctionComponent = () => {
  const [emailAddress, setEmailAddress] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<null | string>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    axios
      .post(cfg.api.routes.forgotPassword, { email_address: emailAddress })
      .then((response) => {
        const { status } = response
        console.log('forgotPassword status res', status)
        setEmailAddress('')
        setErrorMessage('')
      })
      .catch((err) => {
        console.log('forgotPassword err', err)
        setErrorMessage(en.forgotPassword.resetPasswordFailed)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth error={Boolean(errorMessage)}>
          <InputLabel htmlFor="email">{en.forgotPassword.label}</InputLabel>
          <Input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormControl>
        <ButtonLoading
          buttonProps={{ type: 'submit', fullWidth: true, variant: 'contained', color: 'primary' }}
          loading={loading}
        >
          {en.forgotPassword.buttonText}
        </ButtonLoading>
      </form>
    </div>
  )
}

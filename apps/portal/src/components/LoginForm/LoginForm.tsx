import * as React from 'react'
import { Snackbar, ButtonProps, FormControl, Input, InputLabel, FormHelperText } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { PasswordField } from '~/components/common/PasswordField/PasswordField'
import { cfg } from '~/config/config'
import { NOTIFICATION_DURATION, SNACKBAR_POSITION } from '~/constants/global'
import en from '~/i18n'
import { getContactDetailsThunk } from '~/store/reducers/account/extraReducers'
import { logInThunk } from '~/store/reducers/auth/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { required, validEmailAddress, validPasswordLength } from '~/utils/reactHookFormRules'
import { CustomToast } from '../common'
import Link from '../common/Link/Link'

const defaultLoginForm = {
  email: '',
  password: '',
}
export type LoginForm = typeof defaultLoginForm

export const LoginForm: React.FunctionComponent = () => {
  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const loginStatus = useAppSelector((state) => state.auth.status)
  const [toastSeverity, setToastSeverity] = React.useState<'error' | 'success'>('success')
  const [mb2, mb5] = useSpacing('mb2', 'mb5')
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.auth.status === 'authenticating')
  const router = useRouter()
  const buttonProps: ButtonProps = {
    className: clsx(mb2),
    type: 'submit',
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    disabled: loading,
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: defaultLoginForm })

  const handleFormSubmit: SubmitHandler<typeof defaultLoginForm> = (data) => {
    dispatch(logInThunk(data))
  }

  React.useEffect(() => {
    if (loginStatus === 'authenticated') {
      dispatch(getContactDetailsThunk())
    }
  }, [dispatch, loginStatus])

  React.useEffect(() => {
    if (loginStatus === 'authenticated') {
      router.push('/')
    }

    if (loginStatus === 'error') {
      setToastSeverity('error')
      setToastMessage(en.login.notifications.error)
      setOpenToast(true)
    }
  }, [router, setToastSeverity, setToastMessage, setOpenToast, loginStatus])

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{
            required,
            pattern: validEmailAddress,
          }}
          render={({ field }) => (
            <FormControl className={mb5} fullWidth error={Boolean(errors.email)}>
              <InputLabel htmlFor="email" required>
                {en.login.form.emailAddress}
              </InputLabel>
              <Input id="email" type="email" {...field} />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required,
            minLength: validPasswordLength,
          }}
          render={({ field }) => (
            <FormControl className={mb5} fullWidth error={Boolean(errors.password)}>
              <PasswordField labelText={en.login.form.password} id="password" {...field} />
              <FormHelperText error>{errors.password?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <ButtonLoading loading={loading} buttonProps={buttonProps}>
          {en.login.form.button}
        </ButtonLoading>
      </form>
      <Link href={cfg.pages.forgotPassword} variant="body2">
        {en.login.form.forgotPassword}
      </Link>
      <Snackbar
        anchorOrigin={SNACKBAR_POSITION}
        open={openToast}
        onClose={() => setOpenToast(false)}
        autoHideDuration={NOTIFICATION_DURATION}
      >
        <CustomToast severity={toastSeverity} onClick={() => setOpenToast(false)}>
          {toastMessage}
        </CustomToast>
      </Snackbar>
    </div>
  )
}

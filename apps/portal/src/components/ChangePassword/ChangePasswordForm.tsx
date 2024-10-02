import * as React from 'react'
import { ButtonProps, FormControl, FormHelperText } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { changePasswordThunk } from '~/store/reducers/changePassword/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { required, validPasswordLength, requiredPasswordMinimum8Lentgth } from '~/utils/reactHookFormRules'
import { PasswordField } from '../common/PasswordField/PasswordField'
import { useStyles } from './changePasswordSection.styles'

const labels = {
  currentPassword: en.accountInfo.changePassword.form.currentPassword,
  newPassword: en.accountInfo.changePassword.form.newPassword,
  confirmNewPassword: en.accountInfo.changePassword.form.confirmNewPassword,
}

export const defaultChangePasswordValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

export const ChangePasswordForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const [mb3, pl10] = useSpacing('mb3', 'pl10')
  const dispatch = useAppDispatch()
  const { status } = useAppSelector((state) => state.changePassword)
  const classes = useStyles()

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultChangePasswordValues,
  })

  React.useEffect(() => {
    if (status === 'success' || status === 'error') {
      setLoading(false)
    }
  }, [setLoading, status])

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    dispatch(changePasswordThunk(data))
  })

  const buttonProps: ButtonProps = {
    type: 'submit',
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
  }

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="currentPassword"
        rules={{ required, minLength: validPasswordLength }}
        render={({ field }) => (
          <FormControl fullWidth className={mb3}>
            <PasswordField
              id="currentPassword"
              labelText={labels.currentPassword}
              placeholder={labels.currentPassword}
              {...field}
            />
            <FormHelperText error>
              {(errors.currentPassword && errors.currentPassword.message) ||
                (status === 'error' && en.errors.incorrectPassword)}
            </FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        rules={{
          required: requiredPasswordMinimum8Lentgth,
          minLength: validPasswordLength,
          validate: (value) => value !== getValues('currentPassword') || en.errors.differentPassword,
        }}
        render={({ field }) => (
          <FormControl fullWidth className={mb3}>
            <PasswordField
              id="newPassword"
              labelText={labels.newPassword}
              placeholder={labels.newPassword}
              {...field}
            />
            <FormHelperText error>{errors.newPassword && errors.newPassword.message}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="confirmNewPassword"
        rules={{
          required,
          minLength: validPasswordLength,
          validate: (value) => value === getValues('newPassword') || en.errors.passwordsDoNotMatch,
        }}
        render={({ field }) => (
          <FormControl fullWidth className={mb3}>
            <PasswordField
              id="confirmNewPassword"
              labelText={labels.confirmNewPassword}
              placeholder={labels.confirmNewPassword}
              {...field}
            />
            <FormHelperText error>{errors.confirmNewPassword && errors.confirmNewPassword.message}</FormHelperText>
          </FormControl>
        )}
      />
      <div className={classes.root}>
        <div className={pl10}>
          <ButtonLoading loading={loading} buttonProps={buttonProps}>
            {en.common.buttons.save}
          </ButtonLoading>
        </div>
      </div>
    </form>
  )
}

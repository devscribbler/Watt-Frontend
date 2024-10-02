import * as React from 'react'
import { ButtonProps, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { changeEmailThunk } from '~/store/reducers/changeEmail/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { required, validChangeEmailSecurityCode } from '~/utils/reactHookFormRules'
import { useStyles } from '../ChangePassword/changePasswordSection.styles'

const labels = {
  passcode: en.accountInfo.changeEmail.form.securityCode,
}

const defaultValues = {
  email: '',
  code: '',
}

type EmailChangeFormValues = typeof defaultValues

interface Props {
  newEmailIntend: unknown
}

export const ValidateEmailChangeForm: React.FC<Props> = ({ newEmailIntend }) => {
  const [my6, pl10] = useSpacing('my6', 'pl10')
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const classes = useStyles()

  const buttonProps: ButtonProps = {
    type: 'submit',
    variant: 'contained',
    color: 'primary',
  }

  const { status } = useAppSelector((state) => state.changeEmail)
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EmailChangeFormValues>({ defaultValues })

  React.useEffect(() => {
    if (status === 'success' || status === 'error') {
      setIsLoading(false)
    }
  }, [status])

  React.useEffect(() => {
    return setValue('email', newEmailIntend as string)
  }, [setValue, newEmailIntend])

  const onSubmit: SubmitHandler<EmailChangeFormValues> = (data) => {
    setIsLoading(true)
    dispatch(changeEmailThunk(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="code"
        rules={{ required, pattern: validChangeEmailSecurityCode }}
        render={({ field }) => (
          <FormControl fullWidth className={my6}>
            <InputLabel htmlFor="securityCode" required>
              {labels.passcode}
            </InputLabel>
            <Input
              id="securityCode"
              type="text"
              placeholder={en.accountInfo.changeEmail.form.placeholderSecurityCode}
              {...field}
            />
            <FormHelperText error>{errors.code && errors.code.message}</FormHelperText>
          </FormControl>
        )}
      />
      <div className={classes.root}>
        <div className={pl10}>
          <ButtonLoading loading={isLoading} buttonProps={buttonProps}>
            {en.common.buttons.save}
          </ButtonLoading>
        </div>
      </div>
    </form>
  )
}

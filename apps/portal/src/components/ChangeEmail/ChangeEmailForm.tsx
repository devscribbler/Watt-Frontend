import * as React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { getContactDetailsThunk } from '~/store/reducers/account/extraReducers'
import { changeEmailIntendThunk } from '~/store/reducers/changeEmail/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { required, validChangeEmailIntend } from '~/utils/reactHookFormRules'
import { ValidateEmailChangeForm } from './ValidateEmailChangeForm'

const labels = {
  emailAddress: en.accountInfo.changeEmail.form.emailAddress,
}

interface IFormInput {
  email: string
}

interface Props {
  newEmailIntend: unknown
  setNewEmailIntend: (x: string) => void
}

export const ChangeEmailForm: React.FC<Props> = ({ newEmailIntend, setNewEmailIntend }) => {
  const [my2, mb6] = useSpacing('my2', 'mb6')
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const { statusIntend } = useAppSelector((state) => state.changeEmail)
  const { emailAddress } = useAppSelector((state) => state.account)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: emailAddress,
    },
  })

  React.useEffect(() => {
    dispatch(getContactDetailsThunk())
  }, [dispatch])

  React.useEffect(() => {
    reset({ email: emailAddress })
  }, [reset, emailAddress])

  React.useEffect(() => {
    if (statusIntend === 'success' || statusIntend === 'error') {
      setIsLoading(false)
    }
  }, [statusIntend])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsLoading(true)
    setNewEmailIntend(data.email)
    dispatch(changeEmailIntendThunk(data))
  }

  return (
    <div className={mb6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{
            required,
            pattern: validChangeEmailIntend,
            validate: (value) => value !== emailAddress || en.errors.sameEmail,
          }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel htmlFor="newEmailAddress" required>
                {labels.emailAddress}
              </InputLabel>
              <Input id="newEmailAddress" type="text" {...field} />
              <FormHelperText error>{errors.email && errors.email.message}</FormHelperText>
            </FormControl>
          )}
        />

        <div className={my2}>
          <ButtonLoading
            loading={isLoading}
            buttonProps={{ type: 'submit', color: 'secondary', variant: 'outlined', fullWidth: true }}
          >
            {en.accountInfo.changeEmail.buttonLabel.sendSecurityCode}
          </ButtonLoading>
        </div>
      </form>

      <ValidateEmailChangeForm newEmailIntend={newEmailIntend} />
    </div>
  )
}

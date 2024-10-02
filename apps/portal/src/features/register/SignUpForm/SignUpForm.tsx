import * as React from 'react'
import { FormControl, FormHelperText, Input, InputLabel, Snackbar } from '@mui/material'
import { AxiosError } from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { axios } from '@watt/api-interface'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { PasswordField, CustomToast } from '~/components/common'
import { cfg } from '~/config/config'
import { API_ERROR_MESSAGES, ERROR_PRETTY_MESSAGES } from '~/constants/errors'
import { NOTIFICATION_DURATION, SNACKBAR_POSITION } from '~/constants/global'
import en from '~/i18n'
import { serializeRegisterForm } from '~/serializers'
import { setTokensToLocalStorageAndAxios } from '~/utils/localStorage'
import { required, validUkPhoneNumber, validEmailAddress, validPasswordLength } from '~/utils/reactHookFormRules'
import { registerFormCfg, defaultSignUpForm, SignUpFormType } from './formConfig'

interface BookOfRaResponse {
  id: string
  name: string
  registration_number: string
  main_address: string
  main_postcode: string
  mpan: string
  mprn: string
  access_token: string
}

export interface GetUserDetailsResponse {
  name: string
  registration_number: string
  main_address: string
  main_postcode: string
  mpan: string
  mprn: string
  email: string
}

type RegisterResponse = {
  access: string
}

export const SignUpForm: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [openToast, setOpenToast] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = React.useState('')
  const [mt4, mb2, mb6, mb16] = useSpacing('mt4', 'mb2', 'mb6', 'mb16')
  const [accessToken, setAccessToken] = React.useState('')
  const router = useRouter()
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<SignUpFormType>({ defaultValues: defaultSignUpForm })

  React.useEffect(() => {
    axios
      .get<BookOfRaResponse>(cfg.api.routes.temporary.bookOfRa)
      .then(({ data }) => {
        const { access_token: accessToken } = data

        setAccessToken(accessToken)

        return axios.get<GetUserDetailsResponse>(cfg.api.routes.temporary.getUser, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      })
      .then(({ data }) => {
        reset({
          address: data.main_address,
          businessName: data.name,
          postcode: data.main_postcode,
          emailAddress: data.email,
        })
      })
  }, [setAccessToken, reset])

  const submitHandler: SubmitHandler<SignUpFormType> = async (payload) => {
    setIsLoading(true)
    setOpenToast(false)
    setToastMessage('')
    try {
      const { data } = await axios.post<RegisterResponse>(cfg.api.routes.register, serializeRegisterForm(payload), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setTokensToLocalStorageAndAxios({ accessToken: data.access })
      await router.push(cfg.pages.home)
    } catch (error) {
      handleSubmitApiErrors(error as AxiosError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitApiErrors = (error: AxiosError) => {
    if (error.response) {
      setToastSeverity('error')
      setOpenToast(true)
      const { data } = error.response

      if (data.message === API_ERROR_MESSAGES.ACCOUNT_EXISTS) {
        setToastMessage(ERROR_PRETTY_MESSAGES[API_ERROR_MESSAGES.ACCOUNT_EXISTS])
      } else {
        setToastMessage(en.register.notifications.generic_error)
      }
    }
  }

  return (
    <div className={mb16}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          name="postcode"
          rules={{ required }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.postcode)} disabled>
              <InputLabel htmlFor={registerFormCfg.postcode.id} required>
                {registerFormCfg.postcode.label}
              </InputLabel>
              <Input id={registerFormCfg.postcode.id} {...registerFormCfg.postcode.inputProps} {...field} />
              <FormHelperText error={Boolean(errors.postcode)}>
                {errors.postcode ? errors.postcode.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{ required }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.address)} disabled>
              <InputLabel htmlFor={registerFormCfg.address.id} required>
                {registerFormCfg.address.label}
              </InputLabel>

              <Input id={registerFormCfg.address.id} fullWidth {...registerFormCfg.address.inputProps} {...field} />

              {errors.address && <FormHelperText error>{errors.address.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="businessName"
          rules={{ required }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.businessName)} disabled>
              <InputLabel htmlFor={registerFormCfg.businessName.id} required>
                {registerFormCfg.businessName.label}
              </InputLabel>

              <Input
                id={registerFormCfg.businessName.id}
                fullWidth
                {...registerFormCfg.businessName.inputProps}
                {...field}
              />

              <FormHelperText error={Boolean(errors.businessName)}>
                {errors.businessName ? errors.businessName.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required,
            pattern: validUkPhoneNumber,
            maxLength: { value: 13, message: en.errors.phoneNumberMaxLength },
          }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.phoneNumber)}>
              <InputLabel htmlFor={registerFormCfg.phoneNumber.id} required>
                {registerFormCfg.phoneNumber.label}
              </InputLabel>
              <Input
                id={registerFormCfg.phoneNumber.id}
                fullWidth
                {...registerFormCfg.phoneNumber.inputProps}
                {...field}
              />
              <FormHelperText error={Boolean(errors.phoneNumber)}>
                {errors.phoneNumber ? errors.phoneNumber.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="emailAddress"
          rules={{ required, pattern: validEmailAddress, minLength: validPasswordLength }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.emailAddress)} disabled>
              <InputLabel htmlFor={registerFormCfg.emailAddress.id} required>
                {registerFormCfg.emailAddress.label}
              </InputLabel>
              <Input id={registerFormCfg.emailAddress.id} {...registerFormCfg.emailAddress.inputProps} {...field} />
              <FormHelperText error={Boolean(errors.emailAddress)}>
                {errors.emailAddress ? errors.emailAddress.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.password)}>
              <PasswordField
                id={registerFormCfg.password.id}
                labelText={registerFormCfg.password.label}
                {...registerFormCfg.password.inputProps}
                {...field}
              />
              <FormHelperText error={Boolean(errors.password)}>
                {errors.password ? errors.password.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required,
            validate: (value) => value === getValues('password') || en.errors.passwordsDoNotMatch,
          }}
          render={({ field }) => (
            <FormControl className={mb6} fullWidth error={Boolean(errors.confirmPassword)}>
              <PasswordField
                {...field}
                id={registerFormCfg.confirmPassword.id}
                {...registerFormCfg.confirmPassword.inputProps}
                labelText={registerFormCfg.confirmPassword.label}
              />
              <FormHelperText error={Boolean(errors.confirmPassword)}>
                {errors.confirmPassword ? errors.confirmPassword.message : ''}
              </FormHelperText>
            </FormControl>
          )}
        />
        <ButtonLoading
          loading={isLoading}
          buttonProps={{
            className: clsx(mt4, mb2),
            type: 'submit',
            variant: 'contained',
            color: 'primary',
            fullWidth: true,
          }}
        >
          {en.register.form.button}
        </ButtonLoading>
      </form>
      {openToast && (
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
      )}
    </div>
  )
}

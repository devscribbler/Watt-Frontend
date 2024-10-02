import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useFormContext } from 'react-hook-form'
import en from '~/i18n'
import { submitEmailForVerificationThunk, submitVerifyCodeThunk } from '~/store/reducers/company/extraReducers'
import { useAppDispatch } from '~/store/selectors'
import { validEmailAddress } from '~/utils/reactHookFormRules'
import { CompanyDetailsForm } from '../../formConfig'

const i18n = en.companyInformation.contactForm

/**
 * Custom hook containing email verification logic
 */
export function useEmailVerification() {
  const snackbar = useSnackbar()
  const dispatch = useAppDispatch()
  const { watch, setValue, setError, clearErrors } = useFormContext<CompanyDetailsForm>()
  const [isLoading, setIsLoading] = useState(false)

  const emailWatcher = watch('contact.contactEmail')
  const verifyWatcher = watch('contact.code')
  const emailVerifiedWatcher = watch('contact.verifiedEmail')

  const [emailVerificationCodeSent, setEmailVerificationCodeSent] = useState(false)
  const [emailVerificationCodeSentTo, setEmailVerificationCodeSentTo] = useState('')

  /**
   * Clears the email verification code field and sets the verifiedEmail hidden field to false
   */
  const clearVerificationFields = useCallback(() => {
    setValue('contact.code', '')
    setValue('contact.verifiedEmail', false)
    clearErrors('contact.code')
    clearErrors('contact.contactEmail')
  }, [setValue, clearErrors])

  /**
   * Clear the email verification fields on email change
   */
  useEffect(() => {
    if (emailWatcher !== emailVerificationCodeSentTo) {
      setEmailVerificationCodeSent(false)

      clearVerificationFields()
    }
  }, [clearVerificationFields, emailWatcher, emailVerificationCodeSentTo])

  /**
   * Verify the email address currently in the form
   */
  const verifyEmail = useCallback(() => {
    if (!emailWatcher) {
      setError('contact.contactEmail', { type: 'required', message: 'Email is required' })
      return
    }

    if (!validEmailAddress.value.test(emailWatcher)) {
      setError('contact.contactEmail', { type: 'pattern', message: validEmailAddress.message })
      return
    }

    setIsLoading(true)

    clearVerificationFields()
    setEmailVerificationCodeSentTo(emailWatcher)

    dispatch(submitEmailForVerificationThunk({ email: emailWatcher })).then((res: any) => {
      setIsLoading(false)

      if (res.error) {
        snackbar.enqueueSnackbar(res.error.message, { variant: 'error' })
        return
      }

      setEmailVerificationCodeSent(true)
      snackbar.enqueueSnackbar(i18n.notifications.successfulEmailSent, { variant: 'success' })
    })
    setIsLoading(false)
  }, [setError, clearVerificationFields, emailWatcher, dispatch, snackbar])

  /**
   * Submit the verification code for cross-checking
   */
  const submitCode = useCallback(() => {
    if (verifyWatcher === '') {
      setError('contact.code', { type: 'required', message: 'Verification code is required' })
      return
    }

    clearErrors('contact.code')
    dispatch(submitVerifyCodeThunk({ email: emailWatcher, code: verifyWatcher })).then((res: any) => {
      if (res.error) {
        setError('contact.code', { type: 'invalid', message: 'Verification code is invalid' })
        return
      }

      setEmailVerificationCodeSent(false)
      setValue('contact.verifiedEmail', true)
      snackbar.enqueueSnackbar(i18n.notifications.successfulVerification, { variant: 'success' })
    })
  }, [setValue, setError, verifyWatcher, dispatch, clearErrors, snackbar, emailWatcher])

  return {
    isLoading,
    verificationCodeSent: emailVerificationCodeSent,
    emailVerified: emailVerifiedWatcher,

    verifyEmail,
    submitCode,
  }
}

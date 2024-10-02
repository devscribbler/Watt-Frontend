import * as React from 'react'
import { Snackbar, Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import { SNACKBAR_POSITION, NOTIFICATION_DURATION } from '~/constants/global'
import en from '~/i18n'
import { useAppSelector } from '~/store/selectors'
import { CustomToast } from '../common'
import { ChangePasswordForm } from './ChangePasswordForm'

export const ChangePasswordSection: React.FC = () => {
  const [mb8] = useSpacing('mb8')
  const [openToast, setOpenToast] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = React.useState('')
  const changePasswordState = useAppSelector((state) => state.changePassword)

  React.useEffect(() => {
    if (changePasswordState.status === 'success') {
      setToastMessage(en.accountInfo.notifications.success)
      setToastSeverity('success')
      setOpenToast(true)
    }
    if (changePasswordState.status === 'error') {
      setToastMessage(en.accountInfo.notifications.error)
      setToastSeverity('error')
      setOpenToast(true)
    }
  }, [changePasswordState])

  return (
    <>
      <Typography color="secondary" variant="h5" className={mb8}>
        {en.accountInfo.changePassword.subtitle}
      </Typography>
      <ChangePasswordForm />
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
    </>
  )
}

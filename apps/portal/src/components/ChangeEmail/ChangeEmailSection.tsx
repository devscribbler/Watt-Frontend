import * as React from 'react'
import { Snackbar, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSessionStorage } from 'react-use'
import { useSpacing } from '@watt/theme'
import { SNACKBAR_POSITION, NOTIFICATION_DURATION } from '~/constants/global'
import en from '~/i18n'
import { useAppSelector } from '~/store/selectors'
import { CustomToast } from '../common'
import { ChangeEmailForm } from './ChangeEmailForm'
import { useStyles } from './changeEmailSection.styles'

function useChangeEmailToast() {
  const changeEmailState = useAppSelector((state) => state.changeEmail)
  const [toastIsOpen, setOpenToast] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = React.useState('')

  React.useEffect(() => {
    if (changeEmailState.statusIntend === 'success') {
      setToastSeverity('success')
      setToastMessage(en.accountInfo.notifications.emailSucessSend)
      setOpenToast(true)
    }
    if (changeEmailState.status === 'success') {
      setToastSeverity('success')
      setToastMessage(en.accountInfo.notifications.success)
      setOpenToast(true)
    }
    if (changeEmailState.status === 'error' || changeEmailState.statusIntend === 'error') {
      setToastSeverity('error')
      setToastMessage(en.accountInfo.notifications.error)
      setOpenToast(true)
    }
  }, [changeEmailState])

  const closeToast = React.useCallback(() => setOpenToast(false), [setOpenToast])

  return {
    toastIsOpen,
    closeToast,
    toastSeverity,
    toastMessage,
  }
}

export const ChangeEmailSection: React.FC = () => {
  const classes = useStyles()
  const [mb4, mb8] = useSpacing('mb4', 'mb8')
  const [newEmailIntend, setNewEmailIntend] = useSessionStorage('newEmailIntend')

  const { toastIsOpen, closeToast, toastSeverity, toastMessage } = useChangeEmailToast()

  return (
    <>
      <Typography color="secondary" variant="h5" className={mb4}>
        {en.accountInfo.changeEmail.title}
      </Typography>
      <Typography className={clsx(mb8, classes.description)}>{en.accountInfo.changeEmail.subtitle}</Typography>
      <ChangeEmailForm newEmailIntend={newEmailIntend} setNewEmailIntend={setNewEmailIntend} />
      <Snackbar
        anchorOrigin={SNACKBAR_POSITION}
        open={toastIsOpen}
        onClose={closeToast}
        autoHideDuration={NOTIFICATION_DURATION}
      >
        <CustomToast severity={toastSeverity} onClick={closeToast}>
          {toastMessage}
        </CustomToast>
      </Snackbar>
    </>
  )
}

import * as React from 'react'
import { ButtonProps, CircularProgress } from '@mui/material'
import { Button } from '@watt/components'

export interface ButtonLoadingProps {
  loading: boolean
  size?: number | string
  children: React.ReactNode
  buttonProps?: ButtonProps
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  loading = true,
  size = '1em',
  children,
  buttonProps = {},
}) => {
  const { disabled = false, ...rest } = buttonProps

  return (
    <Button
      disabled={loading || disabled}
      {...rest}
      endIcon={loading ? <CircularProgress color="inherit" size={size} /> : rest.endIcon}
    >
      {children}
    </Button>
  )
}

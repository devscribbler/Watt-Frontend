import { Children } from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps, ButtonTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { addTestAttribute } from '@watt/utils'

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean
}

export const Button: OverridableComponent<ButtonTypeMap<ButtonProps, 'button'>> = (props: ButtonProps) => {
  const { children, ...rest } = props
  const buttonText = typeof children === 'string' ? children : Children.toArray(children).join('')

  return (
    <MuiButton {...rest} {...addTestAttribute(`form-button-${buttonText}`)}>
      {children}
    </MuiButton>
  )
}

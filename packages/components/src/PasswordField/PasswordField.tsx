import * as React from 'react'
import { ForwardRefRenderFunction } from 'react'
import { IconButton, Input, InputAdornment, InputLabel, InputProps } from '@mui/material'
import { VisibilityIcon } from '~/components/common/Icons/VisibilityIcon'
import { VisibilityIconOff } from '~/components/common/Icons/VisibilityIconOff'

interface Props extends InputProps {
  id: string
  labelText: string
}

const BasePasswordField: ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const { id, labelText, ...rest } = props
  const [showPassword, setShowPassword] = React.useState(false)

  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <InputLabel htmlFor={id} required>
        {labelText}
      </InputLabel>
      <Input
        ref={ref}
        id={id}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityIcon height={24} width={24} /> : <VisibilityIconOff height={24} width={24} />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
    </>
  )
}

export const PasswordField = React.forwardRef(BasePasswordField)

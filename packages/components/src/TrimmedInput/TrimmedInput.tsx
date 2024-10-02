import { useCallback, forwardRef } from 'react'
import { Input, InputProps } from '@mui/material'

type Props = {
  numeric?: boolean
}

export const TrimmedInput = forwardRef<HTMLInputElement, InputProps & Props>(({ numeric, ...props }, ref) => {
  const handleInput = useCallback(
    (event) => {
      if (props.onChange) {
        if (event.target.value.includes(' ')) {
          event.target.value = event.target.value.replace(/\s/g, '')
        }
        if (numeric) {
          event.target.value = event.target.value.replace(/\D/g, '')
        }
        props.onChange(event)
      }
    },
    [props, numeric]
  )

  return <Input {...props} onChange={handleInput} ref={ref} />
})

TrimmedInput.displayName = 'TrimmedInput'

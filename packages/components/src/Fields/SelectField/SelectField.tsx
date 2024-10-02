import { Children, cloneElement, isValidElement } from 'react'
import { Select } from '@mui/material'
import { ControllerRenderProps, Path } from 'react-hook-form'
import { addTestAttribute } from '@watt/utils'
import { Tooltip } from '../../Tooltip'
import { useSelectFieldStyles } from './SelectField.styles'

type SelectFieldProps<T> = {
  id: string
  field: ControllerRenderProps<T, Path<T>>
  children: React.ReactNode
  tooltipString?: string
  disabled?: boolean
}

export function SelectField<T>({ id, field, children, tooltipString, disabled }: SelectFieldProps<T>) {
  const classes = useSelectFieldStyles()

  const content = (
    <Select
      id={id}
      {...field}
      displayEmpty
      disabled={disabled}
      MenuProps={{
        classes: { paper: classes.menu },
      }}
      {...addTestAttribute(`form-field-${id}`)}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            ...addTestAttribute(`form-field-${id}-${index}`),
          })
        }
        return child
      })}
    </Select>
  )

  if (tooltipString) {
    return (
      <Tooltip title={tooltipString} placement="top">
        {content}
      </Tooltip>
    )
  }

  return content
}

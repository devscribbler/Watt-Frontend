import { Tooltip as BaseTooltip } from '@mui/material'

type Props = React.ComponentProps<typeof BaseTooltip> & {
  children: React.ReactNode
}

export function Tooltip(props: Props) {
  const { children, ...rest } = props
  return (
    <BaseTooltip enterTouchDelay={0} {...rest}>
      {children}
    </BaseTooltip>
  )
}

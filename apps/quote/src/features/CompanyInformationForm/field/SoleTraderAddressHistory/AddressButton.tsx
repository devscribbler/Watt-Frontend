import { Button } from '@watt/components'
import { useStyles } from './AddressButtonStyles.styles'

export function AddressButton({
  visible,
  onClick,
  children,
}: {
  visible: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const classes = useStyles({ visible })
  return (
    <Button type="button" onClick={onClick} className={classes.button}>
      {children}
    </Button>
  )
}

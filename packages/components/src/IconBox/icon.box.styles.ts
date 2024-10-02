import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS } from '@watt/theme'

type Props = {
  height: string | number
  width: string | number
}

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: (props: Props) => props.height,
    width: (props: Props) => props.width,
  },
  inner: {
    position: 'absolute',
    opacity: '0.1',
    borderRadius: DEFAULT_BORDER_RADIUS,
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
})

import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '0.5rem',
  },
  inputMid: {
    borderRadius: 0,
    borderLeft: 'none',
  },
  inputLeft: {
    borderRadius: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  inputRight: {
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeft: 'none',
  },
  input: {
    padding: '0.5rem 0rem',
    textAlign: 'center',
  },
}))

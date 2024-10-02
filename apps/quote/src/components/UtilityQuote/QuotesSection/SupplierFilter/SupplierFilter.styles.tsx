import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: ({ desktop }: { desktop: boolean }) => ({
    width: desktop ? '22em' : '20em',
    position: 'absolute',
    background: 'white',
    zIndex: 2,
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
  }),
  card: {
    display: 'flex',
    width: '100%',
    padding: '0.5rem',
    borderBottom: '1px solid ' + theme.palette.grey[300],
  },
  supplierName: ({ desktop }: { desktop: boolean }) => ({
    paddingTop: '0.5rem',
    fontSize: desktop ? '1rem' : '0.9rem',
    fontWeight: 'bold',
    marginLeft: '0.5rem',
  }),
  supplierLogo: {
    paddingTop: '0.4rem',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}))

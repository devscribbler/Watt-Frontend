import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  prefilledSupplierCard: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  logo: {
    width: '240px',
  },
  subtitle: {
    fontSize: '1em',
    fontStyle: 'italic',
  },
}))

import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    background: 'none',
  },
  topCard: ({ verified }: { verified: boolean }) => ({
    paddingBottom: verified ? '0' : '1em',
    width: '100%',
  }),
  inputBox: ({ verified }: { verified: boolean }) => ({
    // TODO: Figure out why colour isn't being applied here.
    borderWidth: verified ? '2px' : '',
    borderStyle: verified ? 'solid' : '',
  }),
  verifyBttn: {
    marginTop: '1.85em',
  },
  verifyBttnEl: {
    padding: '1.1em',
  },
  emailVerifyErrorText: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: '0.25em',
  },
  adornment: {
    color: theme.palette.primary.main,
  },
  formControl: {
    marginBottom: '1em',
    width: '100%',
  },
}))

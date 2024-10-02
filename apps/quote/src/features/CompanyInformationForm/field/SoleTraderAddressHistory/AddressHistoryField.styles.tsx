import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  fieldChipUnselected: {
    width: '0.75em',
    height: '0.75em',
    background: 'white',
    border: '1px solid black',
    borderRadius: '50%',
    marginLeft: ' 0.125em',
    marginRight: '0.125em',
  },
  fieldChipSelected: {
    width: '0.75em',
    height: '0.75em',
    background: 'black',
    border: '1px solid black',
    borderRadius: '50%',
    marginLeft: ' 0.125em',
    marginRight: '0.125em',
  },
  fieldSelected: {
    display: 'block',
  },
  fieldUnselected: {
    display: 'none',
  },
  gridRow: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  gridRowNoCenter: { display: 'flex', flexDirection: 'row' },
  fullWidth: { width: '100%' },
  spaceLeft: { marginLeft: '0.4rem' },
  inputDatePicker: {
    paddingRight: '0',
    paddingLeft: '0.75em',
  },
  adornmentPadding: {
    paddingRight: '0',
  },
  inputBoxPadding: {
    paddingTop: '0.5em',
  },
  navBar: ({ fieldCount }: { fieldCount: number }) => ({
    display: fieldCount > 1 ? 'flex' : 'none',
  }),
  addressHistoryTitleContainer: {
    paddingTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1em',
  },
  addressHistoryTitleText: {
    paddingBottom: '0.5em',
  },
}))

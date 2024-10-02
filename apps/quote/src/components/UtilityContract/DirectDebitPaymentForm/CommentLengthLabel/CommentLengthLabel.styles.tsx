import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  numberOfCharactersInComments: ({ commentsLength, maxChars }: { commentsLength: number; maxChars: number }) => ({
    margin: 0,
    fontSize: '0.75em',
    color: commentsLength >= maxChars ? 'red' : '',
  }),
}))

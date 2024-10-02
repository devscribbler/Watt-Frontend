import { useStyles } from './CommentLengthLabel.styles'

type CommentLengthLabelProps = {
  maxChars: number
  commentsLength: number
}

export const CommentLengthLabel = ({ maxChars, commentsLength }: CommentLengthLabelProps) => {
  const classes = useStyles({ commentsLength, maxChars })

  return <p className={classes.numberOfCharactersInComments}>{`${commentsLength}/${maxChars} characters`}</p>
}

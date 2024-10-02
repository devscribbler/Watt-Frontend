import { Typography } from '@mui/material'
import { NextPage } from 'next'
import Link from 'next/link'
import { useStyles } from './404.styles'

const NotFoundPage: NextPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <img src="/assets/img/404.png" alt="Bill logo" width={200} height={284} />
      </div>
      <div className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          Page Not Found
        </Typography>
        <Typography variant="body1" className={classes.text}>
          The page you requested could not be found.
        </Typography>
        <Typography variant="body1" className={classes.text}>
          Return to the{' '}
          <Link href="/" passHref>
            <Typography variant="body2" component="a" className={classes.linkText}>
              home page
            </Typography>
          </Link>
          .
        </Typography>
      </div>
    </div>
  )
}

export default NotFoundPage

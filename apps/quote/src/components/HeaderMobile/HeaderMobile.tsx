import { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import { Container } from '@mui/material'
import { Drawer } from '@mui/material'
import clsx from 'clsx'
import { Link, MenuIcon } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { MobileDrawerContent } from '../MobileDrawerContent/MobileDrawerContent'
import { useStyles } from './header.mobile.styles'

export const HeaderMobile = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()
  const [py4] = useSpacing('py4')

  return (
    <header className={clsx(py4)}>
      <Typography variant="caption" style={{ position: 'absolute', right: 3 }}>
        {process.env.NEXT_PUBLIC_GITHUB_SHA && <span>SHA: {process.env.NEXT_PUBLIC_GITHUB_SHA}</span>}
      </Typography>
      <Container>
        <div className={classes.root}>
          <div className={classes.iconButton}>
            <IconButton edge="start" size="small" onClick={() => setDrawerOpen(true)}>
              <MenuIcon height={24} width={24} />
            </IconButton>
          </div>
          <div className={classes.container}>
            <Link href="/" className={classes.link}>
              <img src="/assets/img/watt-logo-dark.png" alt="Watt.co.uk logo - go to home" height="32px" />
            </Link>
          </div>
        </div>
      </Container>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ className: classes.paper }}>
        <div className={classes.drawer}>
          <MobileDrawerContent />
        </div>
      </Drawer>
    </header>
  )
}

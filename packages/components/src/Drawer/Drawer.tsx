import * as React from 'react'
import { useTheme, Hidden, Drawer, AppBar } from '@mui/material'
import clsx from 'clsx'
import { Header } from '../../Header'
import { DrawerList } from './DrawerList'
import { useStyles } from './drawer.styles'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  drawerIsOpen: boolean
  children?: React.ReactNode
  handleDrawer: () => void
  window?: () => Window
}

export const SideDrawer: React.FunctionComponent<Props> = ({ window, drawerIsOpen, children, handleDrawer }) => {
  const classes = useStyles()
  const theme = useTheme()

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={clsx(classes.root)}>
      <AppBar color="secondary" position="fixed" className={classes.appBar}>
        <Header handleDrawer={handleDrawer} />
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={drawerIsOpen}
            onClose={handleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <DrawerList />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerList />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

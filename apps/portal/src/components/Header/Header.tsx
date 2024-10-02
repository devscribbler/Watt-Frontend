import * as React from 'react'
import { AccountCircleOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Grid, Box, IconButton, Typography, useMediaQuery, PopoverOrigin, Menu, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import Link from 'next/link'
import { useSpacing } from '@watt/theme'
import { clearAccessToken } from '@watt/utils'
import { cfg } from '~/config/config'
import { useAppSelector } from '~/store/selectors'
import { useStyles } from './header.styles'

interface HeaderPropTypes {
  handleDrawer?: () => void
}

const anchorOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
}

const transformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
}

export const Header: React.FunctionComponent<HeaderPropTypes> = ({ handleDrawer }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const classes = useStyles()
  const [py2, py1] = useSpacing('py2', 'py1')
  const isAuthenticated = useAppSelector((state) => state.auth.status === 'authenticated')
  const name = useAppSelector((state) => state.account.contact.contactName)
  const open = Boolean(anchorEl)
  const showBurgerMenu = useMediaQuery(theme.breakpoints.only('xs'))

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOut = () => {
    setAnchorEl(null)
    clearAccessToken()
    // redirect to login and clear state
    // TODO do the same functionality but with redux-toolkit
    window.location.href = cfg.pages.login
  }

  return (
    <header className={clsx(classes.root, showBurgerMenu ? py1 : py2)}>
      <Grid container justifyContent="space-between" alignItems="center">
        {showBurgerMenu && isAuthenticated && (
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
        )}
        <Grid item className={classes.menuContainer}>
          <Link href="/">
            <a>
              <img src="/assets/img/watt-logo.svg" alt="Watt.co.uk logo - go to home" height="32px" />
            </a>
          </Link>
        </Grid>
        <Grid item>
          {isAuthenticated ? (
            <Box display="flex" alignItems="center">
              <div>
                <IconButton aria-haspopup="true" onClick={handleMenu} color="inherit">
                  <AccountCircleOutlined />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={transformOrigin}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logOut}>Log out</MenuItem>
                </Menu>
              </div>
              <Typography style={{ color: '#fff' }}>{name}</Typography>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </header>
  )
}

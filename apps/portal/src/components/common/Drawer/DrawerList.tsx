import * as React from 'react'
import { Typography, List, ListItem, ListItemText } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { drawerConfig } from '~/config/drawer.config'
import en from '~/i18n'
import { useStyles } from './drawer.styles'

export const DrawerList: React.FunctionComponent = () => {
  const classes = useStyles()
  const { pathname, push } = useRouter()

  const listData = drawerConfig.map((item) => {
    const { label, to, keys } = item

    return (
      <ListItem
        className={clsx(pathname === to ? classes.selectedItem : classes.item)}
        button
        key={keys}
        onClick={() => push(to)}
        selected={pathname === to}
      >
        <ListItemText primaryTypographyProps={{ component: 'h6', variant: 'h6' }}>{label}</ListItemText>
      </ListItem>
    )
  })

  return (
    <div className={clsx(classes.drawerContainer)}>
      <Typography variant="h6" className={classes.myAccount}>
        {en.common.labels.myAccount}
      </Typography>
      <List component="nav" className={classes.listContainer}>
        {listData}
      </List>
    </div>
  )
}

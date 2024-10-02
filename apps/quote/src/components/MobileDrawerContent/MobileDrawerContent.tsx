import { Divider, List, ListItem } from '@mui/material'
import clsx from 'clsx'
import { Button } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { useStyles } from './mobile.drawer.content.styles'

const DRAWER_LIST = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Tailored offers',
    link: 'https://watt.co.uk/large-businesses/',
  },
  {
    label: 'Bill’s utility hub',
    link: 'https://watt.co.uk/bills-utility-hub/',
  },
  {
    label: 'About us',
    link: 'https://watt.co.uk/about-watt/',
  },
  {
    label: 'Contact',
    link: 'https://watt.co.uk/contact/',
  },
]

export const MobileDrawerContent = (): JSX.Element => {
  const classes = useStyles()
  const [pl10, mx10, mt8, mb4, py4] = useSpacing('pl10', 'mx10', 'mt8', 'mb4', 'py4')

  return (
    <>
      <List>
        {DRAWER_LIST.map((item) => {
          return (
            <ListItem key={item.label} className={classes.listItem} disableGutters>
              <Button
                classes={{ root: classes.buttonRoot }}
                fullWidth
                size="small"
                className={clsx(pl10, py4, classes.link)}
                href={item.link}
              >
                {item.label}
              </Button>
            </ListItem>
          )
        })}
      </List>
      <Divider className={clsx(mx10, mt8, mb4)} />
    </>
  )
}

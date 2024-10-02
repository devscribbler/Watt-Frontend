import * as React from 'react'
import { NextSeo } from 'next-seo'
import { SideDrawer } from '../index'
import { useStyles } from './layout.sidebar.styles'

interface Props {
  children: React.ReactNode
  title?: string
  loading?: boolean
}

export const LayoutWithSidebar = ({ children, title, loading }: Props): JSX.Element | null => {
  const classes = useStyles()
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false)

  const handleDrawer = () => {
    setDrawerIsOpen((oldState) => !oldState)
  }

  if (loading) {
    return null
  }

  return (
    <>
      <NextSeo title={title} />
      <div className={classes.root}>
        <main className={classes.main}>
          <SideDrawer drawerIsOpen={drawerIsOpen} handleDrawer={handleDrawer}>
            {children}
          </SideDrawer>
        </main>
      </div>
    </>
  )
}

import * as React from 'react'
import { useRouter } from 'next/router'
import { cfg } from '~/config/config'
import { FooterDesktop } from '../Footer/FooterDesktop'
import { Header } from '../Header/Header'
import { useStyles } from './layout.default.styles'

type Props = { children: React.ReactNode }

export const LayoutDefault = ({ children }: Props): JSX.Element => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>{children}</main>
      {router.pathname === cfg.pages.home && <FooterDesktop />}
    </div>
  )
}

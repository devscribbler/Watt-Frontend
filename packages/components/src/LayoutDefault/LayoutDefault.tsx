import * as React from 'react'
import { NextSeo } from 'next-seo'
import { Header } from '~/components/Header'
import { useStyles } from './layout.default.styles'

interface Props {
  children: React.ReactNode
  title?: string
  loading?: boolean
}

export const LayoutDefault = ({ children, title, loading }: Props): JSX.Element | null => {
  const classes = useStyles()

  if (loading) {
    return null
  }

  return (
    <>
      <NextSeo title={title} />
      <div className={classes.root}>
        <Header />
        <main className={classes.main}>{children}</main>
      </div>
    </>
  )
}

import * as React from 'react'
import '@fontsource/open-sans'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { axios } from '@watt/api-interface'
// TODO import only the required variants (400, 600 etc) once we know which variants we use
import { theme } from '@watt/theme'
import { cfg } from '~/config/config'
import SEO from '~/next-seo.config'
import store from '~/store'

const App: React.FunctionComponent<AppProps> = (props) => {
  const router = useRouter()
  const { Component, pageProps } = props

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement !== null) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    // TODO move this in the future if you find a better solution
    // if (router.pathname === cfg.pages.login) {
    //   return
    // }
    axios.get(cfg.api.routes.getSession, { withCredentials: true }).catch(() => {
      if (router.asPath === cfg.pages.login) {
        return
      }
      router.push(cfg.pages.login)
    })
  })

  return (
    <>
      <DefaultSeo {...SEO} />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App

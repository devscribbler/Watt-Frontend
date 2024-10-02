import * as React from 'react'
import '@fontsource/open-sans'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enGB } from 'date-fns/locale'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import { axios } from '@watt/api-interface'
import { LoadingSpinnerBackdrop, useIsDesktop } from '@watt/components'
import { TEN_SECONDS } from '@watt/constants'
// TODO import only the required variants (400, 600 etc) once we know which variants we use
import { theme } from '@watt/theme'
import { addTestAttribute } from '@watt/utils'
import { cfg } from '~/config/config'
import SEO from '~/next-seo.config'
import store from '~/store'
import { initGA, useLogPageView } from '~/utils/analytics'

const useStyles = makeStyles({
  mobileSnackBarRoot: {
    bottom: '5em',
  },
})

const App: React.FunctionComponent<AppProps> = (props) => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()
  const { Component, pageProps } = props
  const [loading, setLoading] = React.useState(true)

  // initialise the google analytics
  React.useEffect(() => {
    initGA()
  }, [])

  useLogPageView()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement !== null) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await axios.get(cfg.api.routes.getSession, { withCredentials: true })
      const csrfToken = response.data.csrf_token
      axios.defaults.headers.common['x-xsrf-token'] = csrfToken
      setLoading(false)
    }
    fetchCsrfToken()
  }, [])

  return (
    <>
      <DefaultSeo {...SEO} />
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* TODO Change to the redux implementation https://iamhosseindhv.com/notistack/demos#redux-/-mobx-example */}
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={TEN_SECONDS}
              classes={{ containerRoot: isDesktop ? undefined : classes.mobileSnackBarRoot }}
              {...addTestAttribute(`toaster-message`)}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {loading && <LoadingSpinnerBackdrop />}
                {!loading && <Component {...pageProps} />}
              </LocalizationProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </Provider>
      </StyledEngineProvider>
    </>
  )
}

export default App

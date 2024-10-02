import React from 'react'
import { useRouter } from 'next/router'
import ReactGa from 'react-ga'

const googleAnalyticsTagId = process.env.G_ANALYTICS_TAG_ID

/**
 * Initialize Google Analytics with the given tracking ID
 */
export const initGA = () => {
  if (!googleAnalyticsTagId) {
    return
  }

  ReactGa.initialize(googleAnalyticsTagId)
}

/**
 * Log a page view event to Google Analytics
 */
export const useLogPageView = () => {
  if (!googleAnalyticsTagId) {
    return
  }

  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = () => {
      ReactGa.set({ page: window.location.pathname })
      ReactGa.pageview(window.location.pathname)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

/**
 * Log an event to Google Analytics
 * @param category string
 * @param action string
 */
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGa.event({ category, action })
  }
}

/**
 * Log an exception to Google Analytics
 * @param description string
 * @param fatal boolean
 */
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGa.exception({ description, fatal })
  }
}

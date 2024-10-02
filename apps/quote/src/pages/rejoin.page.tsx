import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { LoadingSpinnerBackdrop } from '@watt/components'
import { LayoutDefault } from '~/components/LayoutDefault/LayoutDefault'
import { cfg } from '~/config/config'

type RejoinResponse =
  | { error: string; page: null; csrf_token: null }
  | { error: null; page: string; csrf_token: string }

const RejoinPage: NextPage = () => {
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    const rejoin = async () => {
      if (!token) {
        console.error('No token provided')
        console.error(router.query)
        // router.push(cfg.pages.error)
        return
      }

      if (!axios.defaults.headers.common['x-xsrf-token']) {
        console.warn('No csrf token found')
      }

      // get the csrf token from the cookie
      const csrfToken = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_token'))
        ?.split('=')[1]
      if (csrfToken) {
        axios.defaults.headers.common['x-xsrf-token'] = csrfToken
      }

      try {
        const { data } = await axios.post<RejoinResponse>(
          cfg.api.routes.rejoin,
          { token },
          { withCredentials: true, headers: { 'x-xsrf-token': csrfToken } }
        )

        if (data.error) {
          router.push(cfg.pages.error)
          return
        }

        if (data.csrf_token) {
          // TODO (James) make util function for this
          // take the csrf_token from the response and set it as a default header for all requests
          // this is needed for the csrf protection (double submit cookie)
          axios.defaults.headers.common['x-xsrf-token'] = data.csrf_token
        }
        if (data.page) {
          router.replace(data.page)
        }
      } catch (error) {
        console.error(`Rejoin request error: ${error}`)
        router.push(cfg.pages.error)
      }
    }
    rejoin()
  }, [router, token])

  return (
    <LayoutDefault>
      <LoadingSpinnerBackdrop />
    </LayoutDefault>
  )
}

export default RejoinPage

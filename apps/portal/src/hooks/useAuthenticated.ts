import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { cfg } from '~/config/config'
import { getContactDetailsThunk } from '~/store/reducers/account/extraReducers'
import { checkSessionThunk } from '~/store/reducers/auth/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'

export function useAuthenticated(): { loading: boolean } {
  const tokens = useAppSelector((state) => state.auth.tokens)
  const [loading, setLoading] = useState(!tokens)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!loading && tokens) {
      return
    }
    setLoading(true)
    let isMounted = true

    dispatch(checkSessionThunk()).then(() => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (!accessToken && !refreshToken) {
          router.push(cfg.pages.login)
          return
        }

        dispatch(getContactDetailsThunk()).then(() => {
          setLoading(false)
        })
      }
    })

    return () => {
      isMounted = false
    }
  }, [dispatch, loading, tokens, router])

  return { loading }
}

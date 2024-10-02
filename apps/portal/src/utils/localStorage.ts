import jwtDecode, { JwtPayload } from 'jwt-decode'
import { setAccessToken } from '@watt/utils'

interface Props {
  accessToken: string
}

export function setTokensToLocalStorageAndAxios({ accessToken }: Props): void {
  const { exp: accessTokenExpirationDate } = jwtDecode<JwtPayload>(accessToken)

  if (accessTokenExpirationDate) {
    setAccessToken(accessToken, accessTokenExpirationDate)
  }
}

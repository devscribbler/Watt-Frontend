const TOKENS = {
  ACCESS_TOKEN: 'accessToken',
  ACCESS_TOKEN_EXP_DATE: 'accessTokenExpirationDate',
  REFRESH_TOKEN: 'refreshToken',
  REFRESH_TOKEN_EXP_DATE: 'refreshTokenExpirationDate',
}

export const getAccessToken = (): string => {
  return window.localStorage.getItem(TOKENS.ACCESS_TOKEN) as string
}

export const setAccessToken = (token: string, expirationDate: number): void => {
  if (!window.localStorage) {
    return
  }

  window.localStorage.setItem(TOKENS.ACCESS_TOKEN, token)
  window.localStorage.setItem(TOKENS.ACCESS_TOKEN_EXP_DATE, String(expirationDate))
}

export const clearAccessToken = (): void => {
  if (!window.localStorage) {
    return
  }

  window.localStorage.removeItem(TOKENS.ACCESS_TOKEN)
  window.localStorage.removeItem(TOKENS.ACCESS_TOKEN_EXP_DATE)
}

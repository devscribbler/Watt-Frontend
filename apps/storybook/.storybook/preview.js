import { ThemeProvider } from '@mui/styles'
import { addDecorator } from '@storybook/react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { theme } from '@watt/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
}

const StylesDectorator = (storyFn) => (
  <EmotionThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </EmotionThemeProvider>
)

addDecorator(StylesDectorator)

// adds a router context around nextjs pages
// https://github.com/vercel/next.js/issues/15543#issuecomment-664955766
addDecorator((storyFn) => (
  <RouterContext.Provider
    value={{
      pathname: '/',
      basePath: '',
      push: (url, as) => {
        if (as) linkTo('Routes', as !== '/' ? startCase(as) : 'Index')()
        return Promise.resolve(true)
      },
      replace: (url, as) => {
        if (as) linkTo('Routes', as !== '/' ? startCase(as) : 'Index')()
        return Promise.resolve(true)
      },
      reload: () => {},
      prefetch: () => {},
    }}
  >
    {storyFn()}
  </RouterContext.Provider>
))

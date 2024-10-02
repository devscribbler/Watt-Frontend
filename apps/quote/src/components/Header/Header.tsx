import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material'
import { HeaderDesktop } from '../HeaderDesktop/HeaderDesktop'
import { HeaderMobile } from '../HeaderMobile/HeaderMobile'

export const Header = (): JSX.Element => {
  const { breakpoints } = useTheme()
  const isDesktop = useMediaQuery(breakpoints.up('md'))

  if (isDesktop) {
    return <HeaderDesktop />
  }

  return <HeaderMobile />
}

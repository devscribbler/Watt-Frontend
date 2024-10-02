import * as React from 'react'
import { ThemeProvider } from '@mui/material'
import { Story, Meta } from '@storybook/react'
import { theme } from '@watt/theme'
import { GetNotifiedCTA } from './GetNotifiedCTA'

export default {
  component: GetNotifiedCTA,
  title: 'Quote/Components/CTA/GetNotifiedCTA',
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const Template: Story<React.ComponentProps<typeof GetNotifiedCTA>> = (args) => {
  return (
    <ThemeProvider theme={theme}>
      <GetNotifiedCTA {...args} />
    </ThemeProvider>
  )
}

export const Default = Template.bind({})

Default.args = {}

import { Story, Meta } from '@storybook/react'
import { FooterSticky } from '../index'

export default {
  component: FooterSticky,
  title: 'Quote/Components/FooterSticky',
} as Meta

const Template: Story<React.ComponentProps<typeof FooterSticky>> = (args) => <FooterSticky {...args} />

export const FooterStickyTemplate = Template.bind({})

FooterStickyTemplate.args = {
  children: 'This is the footer sticky component',
}

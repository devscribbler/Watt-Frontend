// src/components/Button/Button.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['text', 'outlined', 'contained'] },
    },
    color: {
      control: { type: 'select', options: ['default', 'inherit', 'primary', 'secondary'] },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
  variant: 'text',
  color: 'default',
  size: 'medium',
  isLoading: false,
}

export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  color: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Default.args,
  color: 'secondary',
}

export const Contained = Template.bind({})
Contained.args = {
  ...Default.args,
  variant: 'contained',
}

export const Outlined = Template.bind({})
Outlined.args = {
  ...Default.args,
  variant: 'outlined',
}

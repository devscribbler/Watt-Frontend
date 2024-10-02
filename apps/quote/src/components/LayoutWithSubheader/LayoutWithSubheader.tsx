import * as React from 'react'
import { LayoutDefault } from '../LayoutDefault/LayoutDefault'
import { Step } from '../Stepper/Stepper'
import { Subheader } from '../Subheader/Subheader'

type Props = {
  steps: Step[]
  children: React.ReactNode
}

export const LayoutWithSubheader = ({ steps, children }: Props): JSX.Element => {
  return (
    <LayoutDefault>
      <Subheader steps={steps} />
      {children}
    </LayoutDefault>
  )
}

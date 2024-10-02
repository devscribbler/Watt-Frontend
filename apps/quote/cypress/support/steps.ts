import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor'
import { IStepDefinitionBody } from '@badeball/cypress-cucumber-preprocessor/lib/types'
import { isStepRegistered, registerStep } from './step_definition_tracker'

const defineStepWrapper =
  <T extends unknown[], C extends Mocha.Context>(
    defineFn: (description: string | RegExp, implementation: IStepDefinitionBody<T, C>) => void
  ) =>
  (description: string | RegExp, implementation: IStepDefinitionBody<T, C>) => {
    if (typeof description === 'string' && isStepRegistered(description)) {
      return
    }

    if (typeof description === 'string') {
      registerStep(description)
    }

    defineFn(description, implementation)
  }

export const given = defineStepWrapper(Given)
export const when = defineStepWrapper(When)
export const then = defineStepWrapper(Then)
export const before = Before

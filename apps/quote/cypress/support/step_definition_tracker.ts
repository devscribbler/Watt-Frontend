const registeredSteps: Set<string> = new Set()

export function isStepRegistered(description: string): boolean {
  return registeredSteps.has(description)
}

export function registerStep(description: string): void {
  registeredSteps.add(description)
}

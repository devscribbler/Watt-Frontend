import { useState, useEffect, Dispatch, SetStateAction } from 'react'

export default function useExitPrompt(bool: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [showExitPrompt, setShowExitPrompt] = useState(bool)

  useEffect(() => {
    if (showExitPrompt) {
      window.addEventListener('beforeunload', alertUser)
    }
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [showExitPrompt])

  return [showExitPrompt, setShowExitPrompt]
}

function alertUser(e: BeforeUnloadEvent) {
  e.preventDefault()
  e.returnValue = ''
}

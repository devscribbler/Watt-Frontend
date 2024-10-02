import { useReducer } from 'react'

type ArrayHookAction<TItem> = { type: 'add'; value: TItem } | { type: 'remove'; value: TItem }

export function useArray<TItem>() {
  return useReducer((state: TItem[], action: ArrayHookAction<TItem>) => {
    switch (action.type) {
      case 'add':
        return [...state, action.value]
      case 'remove':
        return state.filter((item) => item !== action.value)
      default:
        return state
    }
  }, [])
}

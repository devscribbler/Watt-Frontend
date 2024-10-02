## Creating a thunk

```ts
export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetchCount(amount)
  // The value we return becomes the `fulfilled` action payload
  return response.data
})
```

We can also write thunks by hand, which may contain both sync and async logic.
Here's an example of conditionally dispatching actions based on current state.

```ts
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount))
    }
  }
```

## Creating a selector

The function below is called a selector and allows us to select a value from the state. Selectors can also be defined inline where they're used instead of in the slice file. For example:
`useSelector((state: RootState) => state.counter.value)`

```ts
export const selectCount = (state: AppState) => state.counter.value
```

More info
https://github.com/vercel/next.js/blob/c348784aeb7a60f5f2f6aa8d40ec512c3b0cc487/examples/with-redux-toolkit-typescript/src/features/counter/counterSlice.ts#L69

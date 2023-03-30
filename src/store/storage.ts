import { RootState } from '.'

export const loadState: () => Undefinable<RootState> = () => {
  const serializedState = localStorage.getItem('state')

  const preloadedState =
    serializedState === null
      ? undefined
      : (JSON.parse(serializedState) as RootState)

  return preloadedState &&
    preloadedState.settings.storeVersion ===
      parseInt(process.env.REACT_APP_STORE_VERSION)
    ? preloadedState
    : undefined
}

export const saveState = (state: RootState) => {
  const serializedState = JSON.stringify(state)

  localStorage.setItem('state', serializedState)
}

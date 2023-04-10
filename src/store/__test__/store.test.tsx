import { renderHook } from '@testing-library/react'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { settingsActions } from 'store/slices/settingsSlice'
import { store } from '..'

describe('store', () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

  it('should match initial state', () => {
    expect(store.getState()).toMatchSnapshot()
  })

  it('should toggle palette mode', () => {
    const appDispatch = renderHook(useAppDispatch, { wrapper })

    appDispatch.result.current(settingsActions.togglePaletteMode())

    expect(store.getState()).toMatchSnapshot()
  })
})

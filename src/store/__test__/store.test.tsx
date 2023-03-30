import { store } from '..'

describe('store', () => {
  it('should match initial state', () => {
    expect(store.getState()).toMatchSnapshot()
  })
})

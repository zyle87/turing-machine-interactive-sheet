import { FC } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { store } from './store'
import Root from './views/Root'

const App: FC = () => {
  return (
    <StoreProvider store={store}>
      <Root />
    </StoreProvider>
  )
}

export default App

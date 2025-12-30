import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  return (<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>)
}


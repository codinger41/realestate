import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './views/home'
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
require('react-hot-loader/patch')

const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )

render(AppRouter)
if (module.hot) {
  module.hot.accept('./routes', () => {
    require('./routes')
    render(AppRouter)
  })
}

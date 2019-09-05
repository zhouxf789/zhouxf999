import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './pages'

const app = document.getElementById('app')


const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    app
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./pages', () => {
    render(App)
  })
}

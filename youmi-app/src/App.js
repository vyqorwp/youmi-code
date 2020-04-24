import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Switch, withRouter } from 'react-router-dom'
import {HomePageContainer} from './container/HomePage'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route
            path="/"
            render={props => <HomePageContainer {...props} />}
          />
        </Switch>
      </header>
    </div>
  )
}

export default App

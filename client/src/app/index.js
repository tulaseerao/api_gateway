import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavBar } from '../components'
import { UploadCSV, ValidateAddress } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/upload" exact component={UploadCSV} />
        <Route path="/address/validate" exact component={ValidateAddress} />
      </Switch>
   </Router>
  )
}

export default App

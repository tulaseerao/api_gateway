import React, { Component } from 'react'

import logo from '../logo.svg'

class Logo extends Component {
  render() {
    return (
      <img src={logo} width="50" height="50" alt="Logo" />
    )
  }
}

export default Logo
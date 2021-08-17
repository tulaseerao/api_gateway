import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

const Title = styled.h1.attrs({
  className: 'h3',
})``

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin:0 30px;
`

const Label = styled.label`
  width: 200px;
  margin-top: 10px;
  margin-left: 10px;
  text-align: right;
  margin-right:15px;
  font-weight: 700;
  float:left;
`

const TextLabel = styled.label`
  width: 200px;
  margin-top: 10px;
  text-align: left;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`
class FinalizeAddress extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
    this.setState({ message: '' })
  }
  
  onFinalizeBtnClick = async () => {
    const payload = `
    <table>
      <tr><td></td><td></td></tr>
      <tr><td>Broker:</td><td>${this.state.broker}</td></tr>
      <tr><td>Broker Name:</td><td>${this.state.brokerName}</td></tr>
      <tr><td>Broker Address:</td><td>${this.state.brokerAddress}</td></tr>
      <tr><td>Broker Email:</td><td>${this.state.brokerEmail}</td></tr>
      <tr><td>Insured Name:</td><td>${this.state.insuredName}</td></tr>
      <tr><td>Insured Address:</td><td>${this.state.cleansing}</td></tr>
      <tr><td>TIV:</td><td>${this.state.tiv}</td></tr>
      <tr><td>Limit:</td><td>${this.state.limit}</td></tr>
      <tr><td>Deductible:</td><td>${this.state.deductible}</td></tr>
      <tr><td>No. of Locations:</td><td>${this.state.noOfLocations}</td></tr>
      <tr><td>Industry:</td><td>${this.state.industry}</td></tr>
      <tr><td>Region:</td><td>${this.state.region}</td></tr>
      <tr><td>Security:</td><td>${this.state.security}</td></tr>
      <tr><td>5 Year Loss Record:</td><td>${this.state.fiveYearLossRecord}</td></tr>
      </table>
      `
    const request = {
      to: "sudharshan.talari@gmail.com",
      from: "sudharshan.talari@gmail.com",
      message: payload
    }

    await api.sendEmail(request).then(res => {
      let data = res.data
      let message = data && data.message ? data.message : 'Error while sending email'
      this.setState({ message })
    })
  }

  
  render() {
    return (
      <Wrapper>
        <Title>Finalize Address</Title>
        <hr/>
        <Label>Input Address:</Label>
        <TextLabel>{this.state.insuredAddress}</TextLabel>
        <br/>
        <Label>Cleansed Address:</Label>
        <TextLabel>{this.state.cleansing}</TextLabel>
        <br/>
        <Button onClick={this.onFinalizeBtnClick}>Finalize</Button>
        <div>
          {this.state.message && <TextLabel>{this.state.message}</TextLabel>}
        </div>
        
        <hr/>
      </Wrapper>
    )
  }
}

export default FinalizeAddress

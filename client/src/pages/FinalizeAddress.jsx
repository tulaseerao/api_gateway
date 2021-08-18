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
    this.setState({ email_message: '' })
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
      <tr><td>Insured Address (Input):</td><td>${this.state.insuredAddress}</td></tr>
      <tr><td>Insured Address (Cleansed):</td><td>${this.state.cleansedInsuredAddress}</td></tr>
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
      to: "abc.123@gmail.com",
      from: "abc.123@gmail.com",
      message: payload
    }

    await api.sendEmail(request).then(res => {
      let data = res.data
      let email_message = data && data.email_message ? data.email_message : 'Error while sending email'
      this.setState({ email_message })
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
        <TextLabel>{this.state.cleansedInsuredAddress}</TextLabel>
        <br/>
        <div>
          {this.state.email_message && <TextLabel>{this.state.email_message}</TextLabel>}
        </div>
      </Wrapper>
    )
    
  }
}

export default FinalizeAddress

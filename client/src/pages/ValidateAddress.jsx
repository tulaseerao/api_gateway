import React, { Component } from 'react'
import api from '../api'
import FinalizeAddress from './FinalizeAddress'
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
  float:left;
`
const InputText = styled.input.attrs({
  className: 'form-control',
})`
  // height: 20px;
  width: 400px;
  // border: 1px solid #000;
  margin-top: 10px;
`
const InputNumText = styled.input.attrs({
  className: 'form-control',
})`
  // margin: 5px;
  width: 400px;
  // border: 1px solid #000;
  margin-top: 10px;
  text-align: right;
`

const Select = styled.select.attrs({
  className: 'form-control',
})`
  // margin: 5px;
  width: 400px;
  // border: 1px solid #000;
  margin-top: 10px;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`

class ValidateAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      broker: 'Marsh',
      brokerName: 'John Doe',
      brokerAddress: '1 Love Lane',
      brokerEmail: 'john.doe@marsh.com',
      insuredName: 'ABC Enterprise',
      insuredAddress: '',
      tiv: '$100,000,000',
      limit: '$100,000,000',
      deductible: '$25,000',
      noOfLocations: '3',
      industry: 'IT',
      region: 'US',
      security: 'Security1',
      fiveYearLossRecord: 'Loss2',
      cleansing: '',
      showFinalizeComp: false
    }
  }

  handleChangeInputBroker = async event => {
    const broker = event.target.value
    this.setState({ broker })
  }

  handleChangeInputBrokerName = async event => {
    const brokerName = event.target.value
    this.setState({ brokerName })
  }

  handleChangeInputBrokerAddress = async event => {
    const brokerAddress = event.target.value
    this.setState({ brokerAddress })
  } 
  
  handleChangeInputBrokerEmail = async event => {
    const brokerEmail = event.target.value
    this.setState({ brokerEmail })
  } 
  
  handleChangeInputInsuredName = async event => {
    const insuredName = event.target.value
    this.setState({ insuredName })
  }
  
  handleChangeInputInsuredAddress = async event => {
    const insuredAddress = event.target.value
    this.setState({ insuredAddress })
  } 
  
  handleChangeInputTIV = async event => {
    // const rating = event.target.validity.valid
    //       ? event.target.value
    //       : this.state.rating
    const tiv = event.target.value
    this.setState({ tiv })
  }
  
  handleChangeInputLimit = async event => {
    // const rating = event.target.validity.valid
    //       ? event.target.value
    //       : this.state.rating
    const limit = event.target.value
    this.setState({ limit })
  }
  
  handleChangeInputDeductible = async event => {
    // const rating = event.target.validity.valid
    //       ? event.target.value
    //       : this.state.rating
    const deductible = event.target.value
    this.setState({ deductible })
  }

  handleChangeInputNoOfLocations = async event => {
    const noOfLocations = event.target.value
    this.setState({ noOfLocations })
  }

  handleChangeInputIndustry = async event => {
      const industry = event.target.value
      this.setState({ industry })
  }

  handleChangeInputRegion = async event => {
      const region = event.target.value
      this.setState({ region })
  }

  handleChangeInputSecurity = async event => {
      const security = event.target.value
      this.setState({ security })
  }

  handleChangeInput5YrLoss = async event => {
      const fiveYearLossRecord = event.target.value
      this.setState({ fiveYearLossRecord })
  }

  onValidateBtnClick = async () => {
    const payload = { "address": this.state.insuredAddress }

    await api.validateAddress(payload).then(res => {
      let response_data = res.data
      let cleansing = "Please enter valid address"
      let showFinalizeComp = false
      if (response_data.data && response_data.data.length > 0) {
        let data = response_data.data[0]
        if (data && data["Matches"] && data["Matches"].length > 0) {
          let clean_address_obj = data["Matches"][0]
          cleansing = clean_address_obj["Address"] + ', ' + clean_address_obj["Country"]
          showFinalizeComp = true
          // cleansing = JSON.stringify(clean_address_obj)
        }
      }
      this.setState({ cleansing })
      this.setState({ showFinalizeComp })
    })
  }

  render() {
    return (
     <Wrapper>
       <hr></hr>
        <Title>Validate Address</Title>
        <hr></hr>
        <Label>Broker: </Label>
        <InputText type="text" value={this.state.broker} onChange={this.handleChangeInputBroker} />
        <Label>Broker Name: </Label>
        <InputText type="text" value={this.state.brokerName} onChange={this.handleChangeInputBrokerName} />
        <Label>Broker Address: </Label>
        <InputText type="text" value={this.state.brokerAddress} onChange={this.handleChangeInputBrokerAddress} />
        <Label>Broker Email: </Label>
        <InputText type="text" value={this.state.brokerEmail} onChange={this.handleChangeInputBrokerEmail} />
        <Label>Insured Name: </Label>
        <InputText type="text" value={this.state.insuredName} onChange={this.handleChangeInputInsuredName} />
        <Label>Insured Address: </Label>
        <InputText type="text" value={this.state.insuredAddress} onChange={this.handleChangeInputInsuredAddress} />
        <Label>TIV: </Label>
        <InputNumText type="text" value={this.state.tiv} onChange={this.handleChangeInputTIV} />
        <Label>Limit: </Label>
        <InputNumText type="text" value={this.state.limit} onChange={this.handleChangeInputLimit} />
        <Label>Deductible: </Label>
        <InputNumText type="text" value={this.state.deductible} onChange={this.handleChangeInputDeductible} />
        <Label>No. Of Locations: </Label>
        <Select value={this.state.noOfLocations} onChange={this.handleChangeInputNoOfLocations}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        <Label>Industry: </Label>
        <Select value={this.state.industry} onChange={this.handleChangeInputIndustry}>
          <option value="">Select</option>
          <option value="IT">IT Industry</option>
          <option value="Automobile">Automobile</option>
          <option value="Food Services">Food Services</option>
        </Select>
        <Label>Region: </Label>
        <Select value={this.state.region} onChange={this.handleChangeInputRegion}>
          <option value="">Select</option>
          <option value="AU">Australia</option>
          <option value="BR">Brazil</option>
          <option value="IN">India</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States of America</option>
        </Select>
        <Label>Security: </Label>
        <Select value={this.state.security} onChange={this.handleChangeInputSecurity}>
          <option value="">Select</option>
          <option value="Security1">Security 1</option>
          <option value="Security2">Security 2</option>
        </Select>
        <Label>5 Year Loss Record: </Label>
        <Select value={this.state.fiveYearLossRecord} onChange={this.handleChangeInput5YrLoss}>
          <option value="">Select</option>
          <option value="Loss1">Loss 1</option>
          <option value="Loss2">Loss 2</option>
          <option value="Loss3">Loss 3</option>
          <option value="Loss4">Loss 4</option>
          <option value="Loss5">Loss 5</option>
        </Select>

        <Button onClick={this.onValidateBtnClick}>Validate</Button>
        <hr/>
        <div>
          {this.state.showFinalizeComp && <FinalizeAddress data = {this.state}></FinalizeAddress>}
        </div>
        <hr/>
     </Wrapper>
    )
  }
}

export default ValidateAddress
import React, { Component } from 'react'
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
  }
  
  onFinalizeBtnClick = async () => {

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
        <hr/>
      </Wrapper>
    )
  }
}

export default FinalizeAddress

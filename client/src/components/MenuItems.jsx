import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
	className: 'collapse navbar-collapse'
})``

const List = styled.div.attrs({
	className: 'navbar-nav mr-auto'
})``

const Item = styled.div.attrs({
	className: 'navbar-nav mr-auto'
})``

class MenuItems extends Component {
	render() {
		return (
			<React.Fragment>
				<Link to="/" className="navbar-brand">API Gateway</Link>
				<Collapse>
					<List>
						<Item>
							<Link to="/upload" className="nav-link">Upload CSV</Link>
						</Item>
						<Item>
							<Link to="/address/validate" className="nav-link">Validate</Link>
						</Item>
					</List>
				</Collapse>
			</React.Fragment>
		)
	}
}

export default MenuItems
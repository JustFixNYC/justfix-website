import React, { Component } from 'react'
import { Link } from 'gatsby'

import '../styles/header.scss' 

type Props = {
  isLandingPage?: boolean,
}

type State = {
  burgerMenuIsOpen?: boolean
}

class Header extends Component<Props,State> {
  constructor(Props) {
    super(Props);

    this.state = {
      burgerMenuIsOpen: false
    }

  }

toggleBurgerMenu = () => this.setState({burgerMenuIsOpen: !this.state.burgerMenuIsOpen});

render() {
  return (
  <nav className={"header navbar is-primary " + (this.props.isLandingPage && "is-transparent")} role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <img src={require("../img/brand/logo.png")} width="112" height="28" />
      </Link>

      <a role="button" className={"navbar-burger burger " + (this.state.burgerMenuIsOpen && "is-active") } aria-label="menu" aria-expanded="false" 
        onClick = {this.toggleBurgerMenu} data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

    </div>

    <div id="main-navbar-menu" className={"navbar-menu " + (this.state.burgerMenuIsOpen && "is-active")}>
      <div className="navbar-end">

        <div className="navbar-item has-dropdown is-hoverable">
          <a className={"navbar-link has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
            ABOUT US
          </a>

          <div className="navbar-dropdown">
            <Link to="/about/partners" className="navbar-item">
              Our Partners 
            </Link>
            <Link to="/about/team" className="navbar-item">
              Our Team 
            </Link>
            <Link to="/about/press" className="navbar-item">
              Press 
            </Link>
            <a href="https://justfix.breezy.hr/" target="_blank" rel="noopener noreferrer" className="navbar-item">
              Jobs 
            </a>
          </div>
        </div>

        <Link to="/our-mission" className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          MISSION
        </Link>

        <Link to="/contact-us" className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          CONTACT
        </Link>

      </div>
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary is-inverted is-outlined" href="https://app.justfix.nyc/login" target="_blank" rel="noopener noreferrer">
              SIGN IN
            </a>
        </div>
      </div>
    </div>
  </nav>) 
  } 
}

export default Header

import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Trans } from '@lingui/macro';

import '../styles/header.scss' 
import { Locale } from '../pages';

type Props = {
  isLandingPage?: boolean,
} & Locale 

type State = {
  burgerMenuIsOpen?: boolean
}

class Header extends Component<Props,State> {
  constructor(Props: Props) {
    super(Props);

    this.state = {
      burgerMenuIsOpen: false
    }

  }

toggleBurgerMenu = () => this.setState({burgerMenuIsOpen: !this.state.burgerMenuIsOpen});

render() {
  const localePrefix = this.props.locale ? ("/" + this.props.locale) : "";

  return (
  <nav className={"header navbar is-primary " + (this.props.isLandingPage && "is-transparent")} role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to={localePrefix + "/"} className="navbar-item">
        <img src={require("../img/brand/logo.png")} width="112" height="28" alt="JustFix.nyc" />
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
          <a className={"navbar-link is-uppercase has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
            <Trans>About us</Trans>
          </a>

          <div className="navbar-dropdown">
            <Link to={localePrefix + "/our-mission"} className="navbar-item">
              <Trans>Mission</Trans>
            </Link>
            <Link to={localePrefix + "/about/team"} className="navbar-item">
              <Trans>Team</Trans>
            </Link>
            <Link to={localePrefix + "/about/partners"} className="navbar-item">
              <Trans>Partners</Trans>
            </Link>
            <Link to={localePrefix + "/about/press"} className="navbar-item">
              <Trans>Press</Trans>
            </Link>
            <a href="https://justfix.breezy.hr/" target="_blank" rel="noopener noreferrer" className="navbar-item">
              <Trans>Jobs</Trans>
            </a>
          </div>
        </div>

        <Link to={localePrefix + "/#products"} className={"navbar-item is-uppercase has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <Trans>Products</Trans>
        </Link>

        <Link to={localePrefix + "/contact-us"} className={"navbar-item is-uppercase has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <Trans>Contact</Trans>
        </Link>

        {/* <Link to={this.props.locale === 'es' ? "/" : "/es"} className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          {this.props.locale === 'es' ? "ENGLISH" : "ESPAÑOL" }
        </Link> */}

        {this.state.burgerMenuIsOpen && 
        <a className="navbar-item has-text-black is-uppercase" href="https://app.justfix.nyc/login">
          <Trans>Sign in</Trans>
        </a>}

      </div>
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary is-uppercase is-inverted is-outlined" href="https://app.justfix.nyc/login">
              <Trans>Sign in</Trans>
            </a>
        </div>
      </div>
    </div>
  </nav>) 
  } 
}

export default Header

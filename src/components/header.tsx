import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Trans } from '@lingui/macro';

import '../styles/header.scss' 
import { Locale } from '../pages';

const isDemoSite = process.env.GATSBY_DEMO_SITE === '1';

const TENANT_PLATFORM_URL = 'https://' + (isDemoSite ? 'demo' : 'app') + '.justfix.nyc/login';

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

  return (<div className={"header " + (this.props.isLandingPage && "is-absolute") }>
  {this.props.isLandingPage && <section className="hero is-warning is-small is-paddingless">
    <div className="hero-body">
      <div className="container is-size-7">
        <p>
          <b>COVID-19 Update: </b>
          JustFix.nyc is still in operation, and we are adapting our products to match new rules put in place during the Covid-19 public health crisis. 
          Thanks to organizing from tenant leaders, renters now have stronger protections during this time, including a full halt on eviction cases. 
          {' '}<a href="https://www.righttocounselnyc.org/moratorium_faq" rel="noopener noreferrer"><b>Learn more</b></a>
        </p>
      </div>
    </div>
  </section>}
  <nav className={"navbar is-primary " + (this.props.isLandingPage && "is-transparent")} role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to={localePrefix + "/"} className="navbar-item">
        <img src={require("../img/brand/logo.png")} width="112" height="28" alt="JustFix.nyc" />
      </Link>
      {isDemoSite && 
        <div className="navbar-item">
          <span className="tag is-warning"><Trans>DEMO SITE</Trans></span>
        </div>
      }
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

        <Link to={localePrefix + "/learn"} className={"navbar-item is-uppercase has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <Trans>Learn</Trans>
        </Link>

        <Link to={localePrefix + "/contact-us"} className={"navbar-item is-uppercase has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <Trans>Contact</Trans>
        </Link>

        {/* <Link to={this.props.locale === 'es' ? "/" : "/es"} className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          {this.props.locale === 'es' ? "ENGLISH" : "ESPAÑOL" }
        </Link> */}

        {this.state.burgerMenuIsOpen && 
        <a className="navbar-item has-text-black is-uppercase" href={TENANT_PLATFORM_URL}>
          <Trans>Sign in</Trans>
        </a>}

      </div>
        <div className="navbar-item is-hidden-touch">
          <div className="buttons">
            <a className="button is-primary is-uppercase is-inverted is-outlined" href={TENANT_PLATFORM_URL}>
              <Trans>Sign in</Trans>
            </a>
        </div>
      </div>
    </div>
  </nav></div>) 
  } 
}

export default Header

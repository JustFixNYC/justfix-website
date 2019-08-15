import React from 'react'
import { Link } from 'gatsby'

type Props = {
  siteTitle: string,
  isLandingPage: boolean
}

const Header = ({ siteTitle, isLandingPage }: Props) => (
  <nav className={"header navbar is-primary " + (isLandingPage && "is-transparent")} role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <img src={require("../img/brand/logo.png")} width="112" height="28" />
      </Link>

      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

    </div>

    <div id="main-navbar-menu" className="navbar-menu">
      <div className="navbar-end">

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link has-text-white">
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
            <a href="https://justfix.breezy.hr/" className="navbar-item">
              Jobs 
            </a>
          </div>
        </div>

        <Link to="/contact-us" className="navbar-item has-text-white">
          CONTACT
        </Link>

      </div>
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary is-inverted is-outlined" href="https://app.justfix.nyc/login">
              SIGN IN
            </a>
        </div>
      </div>
    </div>
  </nav>)

export default Header

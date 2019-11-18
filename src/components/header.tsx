import React, { Component } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import '../styles/header.scss' 

type Props = {
  isLandingPage?: boolean,
  locale?: string,
}

type ScaffoldingProps = Props & { content: any }

type State = {
  burgerMenuIsOpen?: boolean
}

class HeaderScaffolding extends Component<ScaffoldingProps,State> {
  constructor(Props: ScaffoldingProps) {
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
            <span className="is-uppercase">{this.props.content.aboutMenuTitle}</span>
          </a>

          <div className="navbar-dropdown">
            <Link to="/about/partners" className="navbar-item">
              {this.props.content.partners}
            </Link>
            <Link to="/about/team" className="navbar-item">
              {this.props.content.team}
            </Link>
            <Link to="/about/press" className="navbar-item">
              {this.props.content.press} 
            </Link>
            <a href="https://justfix.breezy.hr/" target="_blank" rel="noopener noreferrer" className="navbar-item">
              {this.props.content.jobs} 
            </a>
          </div>
        </div>

        <Link to="/our-mission" className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <span className="is-uppercase">{this.props.content.mission}</span>
        </Link>

        <Link to="/contact-us" className={"navbar-item has-text-" + (this.state.burgerMenuIsOpen ? "black" : "white")}>
          <span className="is-uppercase">{this.props.content.contact}</span>
        </Link>

        {this.state.burgerMenuIsOpen && 
        <a className="navbar-item has-text-black" href={this.props.content.signInButton.link}>
          <span className="is-uppercase">{this.props.content.signInButton.title}</span>
        </a>}

      </div>
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary is-inverted is-outlined" href={this.props.content.signInButton.link}>
              <span className="is-uppercase">{this.props.content.signInButton.title}</span>
            </a>
        </div>
      </div>
    </div>
  </nav>) 
  } 
}

const Header = ( props: Props ) => (
  props.locale && props.locale === 'es' ?
    <StaticQuery
      query={graphql`
        query {
          contentfulHeaderLinks( node_locale: { eq: "es" } ) {
            aboutMenuTitle
            partners
            team
            press
            jobs
            mission
            contact
            signInButton {
              title
              link
            }
          }
        }
      `}
    render = {data => (<HeaderScaffolding content={data.contentfulHeaderLinks} isLandingPage={props.isLandingPage} />)}
    /> :
    <StaticQuery
      query={graphql`
        query {
          contentfulHeaderLinks {
            aboutMenuTitle
            partners
            team
            press
            jobs
            mission
            contact
            signInButton {
              title
              link
            }
          }
        }
      `}
    render = {data => (<HeaderScaffolding content={data.contentfulHeaderLinks} isLandingPage={props.isLandingPage} />)}
    />)

export default Header;

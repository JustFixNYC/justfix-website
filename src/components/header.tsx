import React from 'react'
import { Link } from 'gatsby'

type Props = {
  siteTitle: string
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  margin: '0 1rem 0 1rem',
};

const Header = ({ siteTitle }: Props) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={linkStyle}>
          <img src={require("../img/brand/logo.png")} style={{width: '100px'}}/>
        </Link>
        <Link
          to="/about/partners"
          style={linkStyle}>
          Our Partners 
        </Link>
        <Link
          to="/about/team"
          style={linkStyle}>
          Our Team 
        </Link>
        <Link
          to="/about/press"
          style={linkStyle}>
          Press 
        </Link>
        <Link
          to="/contact-us"
          style={linkStyle}>
          Contact 
        </Link>
      </h1>
    </div>
  </div>
)

export default Header

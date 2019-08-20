import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

// import './layout.css'

type Props = {
  children: React.ReactNode,
  isLandingPage?: boolean
}

const Layout = ({ children, isLandingPage }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} isLandingPage={isLandingPage} />
        <div>
          {children}
        </div>
        <Footer />
      </>
    )}
  />
)

export default Layout

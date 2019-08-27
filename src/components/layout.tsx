import React from 'react'
import Helmet from 'react-helmet'

import Header from './header'
import Footer from './footer'

// import './layout.css'

type Props = {
  title?: string,
  children: React.ReactNode,
  isLandingPage?: boolean
}

const Layout = ({ title, children, isLandingPage }: Props) => (
  <>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}>
      <html lang="en" />
    </Helmet>
    <Header isLandingPage={isLandingPage} />
    <div>
      {children}
    </div>
    <Footer />
  </>
);

export default Layout

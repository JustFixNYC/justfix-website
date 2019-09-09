import React from 'react'
import Helmet from 'react-helmet'

import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

const SITE_TITLE_SUFFIX = ' | JustFix.nyc';
const TWITTER_HANDLE = '@JustFixNYC';
const SITE_MAIN_URL = 'https://www.justfix.nyc';

// import './layout.css'

type Props = {
  metadata?: any
  children: React.ReactNode,
  isLandingPage?: boolean
}

type InternalProps = {
  metadata?: any,
  children: React.ReactNode,
  defaultContent: {
    metadata: InternalProps["metadata"]
  },
  isLandingPage?: boolean
}

const LayoutScaffolding = ({ metadata, children, isLandingPage, defaultContent }: InternalProps) => {

  const title = (metadata && (metadata.title + SITE_TITLE_SUFFIX)) || defaultContent.metadata.title;
  const description = (metadata && metadata.description) || defaultContent.metadata.description;
  const keywords = (metadata && metadata.keywords && metadata.keywords.keywords) || defaultContent.metadata.keywords.keywords;
  const shareImageURL = (metadata && metadata.shareImage && metadata.shareImage.file &&
    metadata.shareImage.file.url) || defaultContent.metadata.shareImage.file.url;
  

  return (
    <>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: `${description}` },
          { name: 'keywords', content: `${keywords}` },

          { name: 'og:site_name', content: `${title}` },
          { name: 'og:title', content: `${title}` },
          { name: 'og:description', content: `${description}`},
          { name: 'og:image', content: `${shareImageURL}`},
          { name: 'og:type', content: 'website'},

          { name: 'twitter:card', content: 'summary_large_image'},
          { name: 'twitter:site', content: TWITTER_HANDLE },
          { name: 'twitter:creator', content: TWITTER_HANDLE },
          { name: 'twitter:title', content: `${title}`},
          { name: 'twitter:description', content: `${description}`},
          { name: 'twitter:url', content: SITE_MAIN_URL},
          { name: 'twitter:image', content: `${shareImageURL}` }
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
};

const Layout = ({metadata, children, isLandingPage}: Props) => (
  <StaticQuery
      query={graphql`
        query {
          contentfulHomePage {
            metadata {
              title
              description
              keywords { 
                keywords 
              }
              shareImage {
                file {
                  url
                }
              }
            }
          }
        }
      `}
    render = {data => (<LayoutScaffolding 
      metadata={metadata}
      defaultContent={data.contentfulHomePage}
      children={children} 
      isLandingPage = {isLandingPage}/>)}
    />
  );

export default Layout

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import TextLoop from "react-text-loop";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image/withIEPolyfill"
// import { Link } from 'gatsby'

import '../styles/index.scss' 
import '../styles/data-driven-onboarding.scss';

import Layout from '../components/layout'
import { DDOSearchBar } from '../components/ddo-searchbar';
import { t, Trans } from '@lingui/macro';
import { I18n } from "@lingui/react"
const TEXTLOOP_ANIMATION_INTERVAL = 2750;
const PRODUCT_CTA_UTM_CODE = '?utm_source=orgsite&utm_medium=productcta';

// All our supported locales, excluding English (en).
export type StringLocales = "es";

export type Locale = {
  locale?: StringLocales | null
}

export type ContentfulContent = Locale & { 
  content: any 
}

const MoratoriumBanner = (props: any) => (
  <section className="hero is-warning is-small is-paddingless">
    <div className="hero-body">
      <div className="container">
        {documentToReactComponents(props.bannerContent)}
      </div>
    </div>
  </section>
)

const DDO = () => (
  <>
    <h2 className="subtitle is-size-5 has-text-white">
      <Trans>Enter your address to learn more.</Trans>
    </h2>
    <br/>
    <I18n>
      {( {i18n} ) => <DDOSearchBar
        hiddenFieldLabel={i18n._(t`Enter your address to learn more.`)}
        submitLabel={i18n._(t`Search address`)}
      />}
    </I18n>
</> )

export const LandingPageScaffolding = (props: ContentfulContent) => 
  (<Layout isLandingPage={true} locale={props.locale}>
    <div id="home" className="home-page">
      <MoratoriumBanner bannerContent={props.content.moratoriumBanner.json} />
      <BackgroundImage className="landing-image hero is-fullheight"
        fluid={props.content.landingImage.fluid} alt="background-image">
          <div className="hero-body">
            <div className="container content-wrapper tight">
              <h1 className="title is-size-1 is-size-3-mobile has-text-white is-spaced">
                <span className="is-hidden-mobile">
                  {props.content.landingLeadInText}
                  <div className="title-carousel">
                    <TextLoop interval={TEXTLOOP_ANIMATION_INTERVAL}
                    springConfig={{ stiffness: 70, damping: 31 }}>
                      {(props.content.landingTextLoopText).map( (textBlock: string, i: number) => 
                      <span key={i}>{textBlock}</span>)}
                    </TextLoop>
                  </div>
                </span>
                <span className="is-hidden-tablet"> 
                  {props.content.landingFallbackText}
                </span>
              </h1>

                <DDO />

            </div>
          </div>
          <div className="landing-footer">
            <div className="columns is-vcentered">
              <div className="column is-size-6 has-text-white has-text-weight-semibold">
                {props.content.landingFooterText}
              </div>  
              <div className="column more-arrow">
                <AnchorLink href="#products" className="has-text-white has-text-weight-light">
                  <figure className="image is-32x32 is-horizontal-center">
                    <img className="img-centered" src={require("../img/down-arrow.png")} alt="" />
                  </figure>
                </AnchorLink>
              </div>
              <div className="column" />
            </div>
          </div>
        
      </BackgroundImage>

      <section id="products" className="is-horizontal-center">
        <div className="content-wrapper">

          <div className="hero is-small">
            <div className="hero-body has-text-centered">
              <div className="container content-wrapper tight">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
                  {props.content.productSectionTitle}
                </h1>
              </div>
            </div>
          </div>

          { (props.content.homePageProductBlocks).map( (product: any, i: number) =>
            (<div className="product" key={i}>

              <div className="columns is-tablet is-vcentered is-hidden-mobile">
                {i % 2 === 1 && (<div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <Img fluid={product.screenshot.fluid} alt="" />
                    </figure>
                  </div>
                </div>)}
                <div className="column">
                  <div className="container">
                    <h3 className="title has-text-grey-dark has-text-weight-medium">{product.title}</h3>
                      <br/>
                    <p className="subtitle">{product.description}</p>
                      <br/>
                    <a className="button is-large is-primary is-uppercase" href={ (product.button.link + PRODUCT_CTA_UTM_CODE) } target="_blank" rel="noopener noreferrer">{product.button.title}</a>
                  </div>
                </div>
                {i % 2 === 0 && (<div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <Img fluid={product.screenshot.fluid} alt="" />
                    </figure>
                  </div>
                </div>)}
              </div>

              <div className="columns is-vcentered is-hidden-tablet">
                <div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <Img fluid={product.screenshot.fluid} alt="" />
                    </figure>
                  </div>
                </div>
                <div className="column">
                  <div className="container has-text-centered">
                    <h3 className="title has-text-grey-dark has-text-weight-medium">{product.title}</h3>
                      <br/>
                    <p className="subtitle">{product.description}</p>
                      <br/>
                    <a className="button is-medium is-primary" href={ (product.button.link + PRODUCT_CTA_UTM_CODE) } target="_blank" rel="noopener noreferrer">
                      <span className="is-size-6 is-uppercase">
                      {product.button.title}
                      </span>
                    </a>
                  </div>
                </div>
              </div>

            </div>) )
          }
        </div>
      </section>

      <section className="hero is-small is-primary" id="rental-history">
        <div className="content-wrapper tight">
          <div className="hero-body has-text-centered is-horizontal-center">
            <h3 className="title is-spaced">{props.content.rentHistory.title}</h3>
            <span className="subtitle has-text-weight-medium">{documentToReactComponents(props.content.rentHistory.description.json)}</span>
          </div>
        </div>
      </section>

      <section id="as-seen-in">
        <div className="content-wrapper">
          <div className="hero is-small">
            <div className="hero-body has-text-centered">
              <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">{props.content.pressTitle}</h1>
              <div className="columns">
              { (props.content.pressLogos).map( (logo: any, i: number) =>
                (<div className="column" key={i}>
                  <figure className="image">
                    <img className="is-horizontal-center" src={logo.logo.file.url} alt={logo.title} />
                  </figure>
              </div>) )
              }
              </div>
            </div>
          </div>
        </div>
      </section>
        
    </div>
</Layout>); 

export const LandingPageFragment = graphql`
  fragment LandingPage on Query {
    contentfulHomePage( node_locale: { eq: $locale } ) {
      moratoriumBanner {
        json
      }
      landingLeadInText
      landingTextLoopText
      landingFallbackText
      landingFooterText
      landingImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      productSectionTitle
      homePageProductBlocks {
        title
        description
        button {
          title
          link
        }
        screenshot {
          fluid {
          ...GatsbyContentfulFluid
          } 
        }
      }
      rentHistory {
        title
        description {
          json
        }
      }
      pressTitle 
      pressLogos {
        title
        logo {
          file {
            url
          }
        }
      }
    }
  }`;

const LandingPage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "en-US") { ...LandingPage }
  `}
  render = {data => (<LandingPageScaffolding content={data.contentfulHomePage} />)}
  />
);

export default LandingPage;

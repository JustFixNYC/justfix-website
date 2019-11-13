import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import TextLoop from "react-text-loop";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import { Link } from 'gatsby'

import '../styles/index.scss' 
import '../styles/data-driven-onboarding.scss';

import Layout from '../components/layout'
import { DDOSearchBar } from '../components/ddo-searchbar';

const DDO = () => <>
  <h2 className="subtitle is-size-5 has-text-white">
    Enter your address to learn more.
  </h2>
  <br/>
  <DDOSearchBar
    hiddenFieldLabel="Enter your address to learn more."
    submitLabel="Search address"
  />
</>;

const LandingPageScaffolding = (props) => 
  (<Layout isLandingPage={true}>
    <div id="home" className="home-page">

      <section className="landing-image hero is-fullheight"
        style={{
            backgroundImage: "url("+(props.content.landingImage.file.url)+")",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat:"no-repeat" 
          }}>
          <div className="hero-body">
            <div className="container content-wrapper tight">
              <h1 className="title is-size-1 is-size-3-mobile has-text-white is-spaced">
                Free tools for you to
              
              <div className="title-carousel is-hidden-mobile">
                <TextLoop interval={2500}
                springConfig={{ stiffness: 70, damping: 31 }}>
                  <span>get repairs in your apartment</span>
                  <span>take your landlord to court</span>
                  <span>request your rent history</span>
                  <span>research your property owner</span>
                  <span>respond to an eviction notice</span>
                </TextLoop>
              </div>
              <span className="is-hidden-tablet"> fight for a safe and healthy home</span>

              </h1>
              
              {props.enableDDO ? <DDO /> : <>
                <h2 className="subtitle is-size-5 is-hidden-mobile has-text-white">
                  {props.content.subCopy.subCopy}
                </h2>
                <br/>
                <AnchorLink href="#products" className="button is-large is-dark is-inverted is-outlined">
                  <span className="is-uppercase">
                    {props.content.heroCta}
                  </span>
                </AnchorLink>
              </>}
            </div>
          </div>
          <div className="landing-footer">
            <div className="columns is-vcentered">
              <div className="column is-size-6 has-text-white has-text-weight-semibold">
                JustFix.nyc is a non-profit that builds free tools in support of NYC's housing movement.
              </div>  
              <div className="column more-arrow">
                <AnchorLink href="#products" className="has-text-white has-text-weight-light">
                  <figure className="image is-32x32 is-horizontal-center">
                    <img className="img-centered" src={require("../img/down-arrow.png")} />
                  </figure>
                </AnchorLink>
              </div>
              <div className="column" />
            </div>
          </div>
        
      </section>

      <section id="products" className="is-horizontal-center">
        <div className="content-wrapper">

          <div className="hero is-small is-white">
            <div className="hero-body has-text-centered">
              <div className="container content-wrapper tight">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
                  {props.content.productSectionTitle}
                </h1>
              </div>
            </div>
          </div>

          { (props.content.homePageProductBlocks).map( (product, i) =>
            (<div className="product" key={i}>

              <div className="columns is-tablet is-vcentered is-hidden-mobile">
                {i % 2 === 1 && (<div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <img src={product.screenshot.file.url} />
                    </figure>
                  </div>
                </div>)}
                <div className="column">
                  <div className="container">
                    <h3 className="title has-text-grey-dark has-text-weight-medium">{product.title}</h3>
                      <br/>
                    <p className="subtitle">{product.description}</p>
                      <br/>
                    <a className="button is-large is-primary" href={ (product.cta.url + "?utm_source=orgsite") } target="_blank" rel="noopener noreferrer">{product.cta.title}</a>
                  </div>
                </div>
                {i % 2 === 0 && (<div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <img src={product.screenshot.file.url} />
                    </figure>
                  </div>
                </div>)}
              </div>

              <div className="columns is-vcentered is-hidden-tablet">
                <div className="column">
                  <div className="container">
                    <figure className="image is-horizontal-center">
                      <img src={product.screenshot.file.url} />
                    </figure>
                  </div>
                </div>
                <div className="column">
                  <div className="container has-text-centered">
                    <h3 className="title has-text-grey-dark has-text-weight-medium">{product.title}</h3>
                      <br/>
                    <p className="subtitle">{product.description}</p>
                      <br/>
                    <a className="button is-medium is-primary" href={ (product.cta.url + "?utm_source=orgsite") } target="_blank" rel="noopener noreferrer">
                      <span className="is-size-6">
                      {product.cta.title}
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
              { (props.content.pressLogos).map( (logo,i) =>
                (<div className="column" key={i}>
                  <figure className="image">
                    <img className="is-horizontal-center" src={logo.logo.file.url} />
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


const LandingPage  = () => (
<StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            enableDDO
          }
        }
        contentfulHomePage {
          heroCopy {
            heroCopy
          }
          subCopy {
            subCopy
          }
          landingImage {
              file {
                url
              }
            }
          heroCta
          productSectionTitle
          homePageProductBlocks {
            title
            description
            cta {
              title
              url
            }
            screenshot {
              file {
                url
              }
            }
          }
          rentHistory {
            title
            description {
              json
            }
          }
          videoUnit {
            title
            caption {
              caption
            }
          }
          pressTitle 
          pressLogos {
            logo {
              file {
                url
              }
            }
          }
        }
      }
    `}
  render = {data => (<LandingPageScaffolding content={data.contentfulHomePage} enableDDO={data.site.siteMetadata.enableDDO} />)}
  />
);

export default LandingPage;

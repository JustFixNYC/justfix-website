import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AnchorLink from 'react-anchor-link-smooth-scroll'
// import { Link } from 'gatsby'

import '../styles/index.scss' 

import Layout from '../components/layout'

const LandingPageScaffolding = (props) => 
  (<Layout isLandingPage={true}>
    <div id="home" className="home-page">

      <section className="landing-image hero is-fullheight">
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title is-size-1 is-size-3-mobile has-text-white is-spaced">
                {props.content.heroCopy.heroCopy}
              </h1>
              <h2 className="subtitle is-size-5 is-hidden-mobile has-text-white">
                {props.content.subCopy.subCopy}
              </h2>
              <br/>
              <AnchorLink href="#products" className="button is-large is-dark is-inverted is-outlined">
                LEARN MORE
              </AnchorLink>
            </div>
          </div>
      </section>

      <section id="products" className="is-horizontal-center">
        <div className="content-wrapper">

          <div className="hero is-small is-white">
            <div className="hero-body has-text-centered">
              <div className="container">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
                Our Products & Services
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
                    <a className="button is-large is-primary" href={ (product.cta.url + "?utm_source=orgsite") } target="_blank">{product.cta.title}</a>
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
                    <a className="button is-large is-primary" href={ (product.cta.url + "?utm_source=orgsite") } target="_blank">{product.cta.title}</a>
                  </div>
                </div>
              </div>

            </div>) )
          }
        </div>
      </section>

      <section className="hero is-small is-primary" id="rental-history">
        <div className="content-wrapper">
          <div className="hero-body has-text-centered is-horizontal-center">
            <h3 className="title is-spaced">Want your apartment’s Rental History?</h3>
            <p className="subtitle has-text-weight-medium">This can help you find out if you are being overcharged on rent. Text <span className="has-text-weight-bold">“RENT HISTORY”</span> to (646) 783-0627 and get your Rental History from the DHCR in the mail — <i>¡Tambien disponible in Español!</i></p>
          </div>
        </div>
      </section>

      {/* <section className="video_unit padding-section-reduced gray_bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="video_unit-title">{props.content.videoUnit.title}</h1>
            </div>
          </div>
          <div className="row align_items_end-sm">
            <div className="col-sm-8">
              <div className="video_wrapper_16_9">
                <iframe className="video_wrapper_16_9-video" src="https://www.youtube.com/embed/QsRq3OWNkgY?rel=0&amp&autoplay=0&playsinline=1&modestbranding=1;showinfo=0" allow="autoplay; encrypted-media"></iframe>
              </div>
            </div>
            <div className="col-sm-4">
              <p className="video_unit-caption">{props.content.videoUnit.caption.caption}</p>
              <a ui-sref="mission" className="btn btn-outline black video_unit-button">READ OUR MISSION</a>
            </div>
          </div>
        </div>
      </section> */}

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
        contentfulHomePage {
          heroCopy {
            heroCopy
          }
          subCopy {
            subCopy
          }
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
  render = {data => (<LandingPageScaffolding content={data.contentfulHomePage} />)}
  />
);

export default LandingPage;

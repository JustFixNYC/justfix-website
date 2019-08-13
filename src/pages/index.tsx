import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'


import Layout from '../components/layout'

class LandingPageScaffolding extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  console.log(this.props);
  return (
  <Layout>
    <div id="home" className="home-page" contentful-entry="'content_type=homePage'">

      <section className="img-bg hero">
        <article className="container">
          <div className="hero-container">
            <h1>{this.props.data.heroCopy.heroCopy}</h1>
            <p className="subcopy hidden-mobile">{this.props.data.subCopy.subCopy}</p>

            <a href="#" scroll-to="products" className="btn btn-outline">
              LEARN MORE
            </a>
          </div>
          <div className="clearfix"></div>
        </article>

      </section>

      <section className="container white padding-section-reduced home-content-blocks" id="products">

        <h1 className="text-center">Our Products & Services</h1>

        { (this.props.data.homePageProductBlocks).map( (product, i) =>
          (<div className="row" key={i}>
            <div className="col-sm-6 col-xs-12">
              <img src={product.screenshot.file.url} />
            </div>
            <div className="col-sm-6 col-xs-12">
              <div className="product-content-block">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <a className="btn btn-primary btn-block" href={ (product.cta.url + "?utm_source=orgsite") } target="_blank">{product.cta.title}</a>
              </div>
            </div>
          </div>) )
        }

      </section>

      <section className="justfix-blue no-margin center white padding-section-reduced " id="rental-history">
        <div className="container">
          <h3>Want your apartment’s Rental History?</h3>
          <p>This can help you find out if you are being overcharged on rent. Text <span className="semi-bold">“RENT HISTORY”</span> to (646) 783-0627 and get your Rental History from the DHCR in the mail — <i>¡Tambien disponible in Español!</i></p>
        </div>
      </section>

      <section className="video_unit padding-section-reduced gray_bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="video_unit-title">{this.props.data.videoUnit.title}</h1>
            </div>
          </div>
          <div className="row align_items_end-sm">
            <div className="col-sm-8">
              <div className="video_wrapper_16_9">
                <iframe className="video_wrapper_16_9-video" src="https://www.youtube.com/embed/QsRq3OWNkgY?rel=0&amp&autoplay=0&playsinline=1&modestbranding=1;showinfo=0" allow="autoplay; encrypted-media"></iframe>
              </div>
            </div>
            <div className="col-sm-4">
              <p className="video_unit-caption">{this.props.data.videoUnit.caption.caption}</p>
              <a ui-sref="mission" className="btn btn-outline black video_unit-button">READ OUR MISSION</a>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-section-reduced">
        <h1 className="center no-margin-bottom">{this.props.data.pressTitle}</h1>
        <div className="container logos logos--faded">
        { (this.props.data.pressLogos).map( (logo,i) =>
          (<span className="logo" key={i}>
          <div className="background-image" style = { { backgroundImage: "url(" + logo.logo.file.url + ")"  } } >
          </div>
        </span>) )
        }

        </div>
      </section>

      </div>
  </Layout>) 
  }
}

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
  render = {data => (<LandingPageScaffolding data={data.contentfulHomePage} />)}
  />
);

export default LandingPage;

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'
const PartnersPageScaffolding = (props) => 
  (<Layout>
  <div id="partners" className="partners-page">

      <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
            {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
            {props.content.subtitle.subtitle}
            </h6>
          </div>
        </div>
      </section>
      
      <section className="partners logos container has-text-centered">
      
      { (props.content.partnerOrganizations).map( (partner, i) =>
          (<div className="logo is-inline-flex" key={i}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <figure className="image">
                  <img className="img-centered" src={partner.logo.file.url} />
                </figure>
              </a>    
          </div>) )
        }
      
      </section>

      <section className="hero is-small is-white">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
            {props.content.fundersTitle}
            </h1>
          </div>
        </div>
        
      </section>

      <section className="funders logos container has-text-centered">

        { (props.content.funders).map( (funder, i) =>
          (<div className="logo is-inline-flex" key={i}>
              <a href={funder.link} target="_blank" rel="noopener noreferrer">
                <figure className="image">
                  <img className="img-centered" src={funder.logo.file.url} />
                </figure>
              </a>    
          </div>) )
        }
      
      </section>

      <section className="is-horizontal-center hero is-small is-light">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-grey-dark has-text-weight-bold is-spaced"> {/* REPLACE WITH CONTENTFUL */}
            Interested in collaborating with JustFix.nyc?
            </h1>
            <h6 className="subtitle has-text-grey-dark"> {/* REPLACE WITH CONTENTFUL */}
            We are currently seeking partnerships and further collaboration with any groups or individuals dedicated to tenant’s rights in New York City. Please contact us you are interested in discussing further or would like a demonstration.
            </h6>
            <Link to="/contact-us" className="button is-large is-primary">{props.content.contactButton.title}</Link>
          </div>
        </div>

      </section>

  </div>
</Layout>); 


const PartnersPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPartnersPage{
          title
          subtitle {
            subtitle
          }
          partnerOrganizations {
            link
            logo {
              file {
                url
              }
            }
          }
          fundersTitle 
          funders {
            link
            logo {
              file {
                url
              }
            }
          }
          contactButton {
            title
          }
          donateButton {
            title
          }
        }
      }
    `}
  render = {data => (<PartnersPageScaffolding content={data.contentfulPartnersPage} />)}
  />
);

export default PartnersPage;

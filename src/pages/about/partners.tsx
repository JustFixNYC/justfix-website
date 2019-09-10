import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'

import '../../styles/partners.scss' 

import Layout from '../../components/layout'
import ReadMore from '../../components/read-more'

const PartnersPageScaffolding = (props) => 
  (<Layout metadata={props.content.metadata}>
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
            <h1 className="title is-size-4 has-text-grey-dark has-text-weight-bold is-spaced">
              {props.content.collaborationBanner.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark">
              {props.content.collaborationBanner.subtitle}
            </h6>
            <div className="buttons is-centered">
              <Link to="/contact-us" className="button is-medium is-primary">CONTACT US</Link>
              <a href="https://donorbox.org/donate-to-justfix-nyc" className="button is-medium is-primary"  target="_blank" rel="noopener noreferrer">
                DONATE
              </a>
            </div>
          </div>
        </div>

      </section>

      <ReadMore title="Read our mission." link="/our-mission" />

  </div>
</Layout>); 


const PartnersPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPartnersPage{
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
          collaborationBanner {
            title
            subtitle
          }
        }
      }
    `}
  render = {data => (<PartnersPageScaffolding content={data.contentfulPartnersPage} />)}
  />
);

export default PartnersPage;

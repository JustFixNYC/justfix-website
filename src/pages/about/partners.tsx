import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import '../../styles/partners.scss' 

import Layout from '../../components/layout'
import ReadMore from '../../components/read-more'
import { ContentfulContent } from '..'
import { CollaborationBanner } from '../our-mission'

export const PartnersPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata} locale={props.locale}>
  <div id="partners" className="partners-page">

      <section className="hero is-small">
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
      
      { (props.content.partnerOrganizations).map( (partner: any, i: number) =>
          (<div className="logo is-inline-flex" key={i}>
              <a href={partner.link} target="_blank" rel="noopener noreferrer">
                <figure className="image">
                  <img className="img-centered" src={partner.logo.fluid.src} alt={partner.name} />
                </figure>
              </a>    
          </div>) )
        }
      
      </section>

      <section className="hero is-small">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
            {props.content.fundersTitle}
            </h1>
          </div>
        </div>
        
      </section>

      <section className="funders logos container has-text-centered">

        { (props.content.funders).map( (funder: any, i: number) =>
          (<div className="logo is-inline-flex" key={i}>
              <a href={funder.link} target="_blank" rel="noopener noreferrer">
                <figure className="image">
                  <img className="img-centered" src={funder.logo.fluid.src} alt={funder.name} />
                </figure>
              </a>    
          </div>) )
        }
      
      </section>

      <CollaborationBanner title={props.content.collaborationBanner.title}
        subtitle={props.content.collaborationBanner.subtitle} />

      <ReadMore title={props.content.readMore.title} link={props.content.readMore.link} locale={props.locale} />

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
            name
            link
            logo {
              fluid {
                src
              }
            }
          }
          fundersTitle 
          funders {
            name
            link
            logo {
              fluid {
                src
              }
            }
          }
          collaborationBanner {
            title
            subtitle
          }
          readMore {
            title
            link
          }
        }
      }
    `}
  render = {data => (<PartnersPageScaffolding content={data.contentfulPartnersPage} />)}
  />
);

export default PartnersPage;

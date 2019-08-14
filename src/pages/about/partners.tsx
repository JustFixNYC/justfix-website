import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'
const PartnersPageScaffolding = (props) => 
  (<Layout>
    <article contentful-entry="'content_type=partners'">
      <header className="container">
        <h1 className="center">{props.content.title}</h1>
        <p className="center lead">{props.content.subtitle.subtitle}</p>
      </header>

      <div className="clearfix"></div>
      <section className="center no-margin">
        <div className="logos container">

        { (props.content.partnerOrganizations).map( (partner, i) =>
          (<span
            className="logo partners"
            key={i}
            // ng-repeat="partner in $contentfulEntry.fields.partnerOrganizations track by $index"
            // ng-className="{'three': $index % 7 == 0}"
            >
            <a href={partner.link} target="_blank">
              <div className="background-image"
                style = { { backgroundImage: `url(${partner.logo.file.url})`  } }>
              </div>
            </a>
          </span>) )
        }
          
        </div>
      </section>

      <div className="clearfix"></div>

      {/* <section>
        <div className="responsive_image ">
          <div className="responsive_image-image" style={ { backgroundImage: `url("../../img/usermap.png")`}}></div>
        </div>

      </section> */}

      <header className="container">
        <h1 className="center">{props.content.fundersTitle}</h1>
      </header>

      <div className="clearfix"></div>
      <section className="center no-margin">
        <div className="logos container">
        { (props.content.funders).map( (funder, i) =>
          (<span
            className="logo partners"
            key={i}
            // ng-repeat="funder in $contentfulEntry.fields.funders track by $index"
            >
            <a href={funder.link} target="_blank">
              <div className="background-image"
                style = { { backgroundImage: `url(${funder.logo.file.url})`  } }>
              </div>
            </a>
          </span>) )
        }
        </div>
      </section>

      <section className="alt center no-margin-top">
        <div className="container" ng-bind-html="$contentfulEntry.fields.collaborationTextBlock | markdown">
        </div>
        <br/>
        <br/>
        <a ui-sref="contact" className="btn btn-primary">{props.content.contactButton.title}</a>
        <a ui-sref="donate" className="btn btn-outline black">{props.content.donateButton.title}</a>
      </section>

    </article>
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

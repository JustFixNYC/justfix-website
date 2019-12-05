import React from 'react'
import { StaticQuery, graphql } from 'gatsby' 
import { PartnersPageScaffolding } from './partners';


const PartnersPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPartnersPage( node_locale: { eq: "es" } ) {
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
  render = {data => (<PartnersPageScaffolding content={data.contentfulPartnersPage} locale="es" />)}
  />
);

export default PartnersPage;

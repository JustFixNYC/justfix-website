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
            link
            logo {
              fluid {
                src
              }
            }
          }
          fundersTitle 
          funders {
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
        }
      }
    `}
  render = {data => (<PartnersPageScaffolding content={data.contentfulPartnersPage} />)}
  />
);

export default PartnersPage;

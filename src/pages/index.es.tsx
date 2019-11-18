import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { LandingPageScaffolding } from '.';

const LandingPage  = () => (
<StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            enableDDO
          }
        }
        contentfulHomePage( node_locale: { eq: "es" } ) {
          heroCopy {
            heroCopy
          }
          subCopy {
            subCopy
          }
          landingImage {
            fluid {
              ...GatsbyContentfulFluid
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
            logo {
              file {
                url
              }
            }
          }
        }
      }
    `}
  render = {data => (<LandingPageScaffolding content={data.contentfulHomePage} enableDDO={data.site.siteMetadata.enableDDO} locale="es" />)}
  />
);

export default LandingPage;

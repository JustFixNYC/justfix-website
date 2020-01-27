import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { LandingPageScaffolding } from '.';

const LandingPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulHomePage( node_locale: { eq: "es" } ) {
          landingLeadInText
          landingTextLoopText
          landingFallbackText
          landingFooterText
          landingImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          productSectionTitle
          homePageProductBlocks {
            title
            description
            button {
              title
              link
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
  render = {data => (<LandingPageScaffolding content={data.contentfulHomePage} locale="es" />)}
  />
);

export default LandingPage;

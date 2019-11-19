import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { PressPageScaffolding } from './press';

const PressPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulPressPage( node_locale: { eq: "es" } ) {
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
          pressItems {
            title
            hyperlink
            linkText
            logo {
              file {
                url
              }
            }
          }
        }
      }
    `}
  render = {data => (<PressPageScaffolding content={data.contentfulPressPage} locale="es" />)}
  />
);

export default PressPage;

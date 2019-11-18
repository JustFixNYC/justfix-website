import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ContactPageScaffolding } from './contact-us';

const ContactPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulContactPage( node_locale: { eq: "es" } ) {
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
          pageTitle
          contactCta {
            json
          }
          socialButtons {
            title
            url
          }
          mailingListTitle 
          mailingListSubtitle
        }
      }
    `}
  render = {data => (<ContactPageScaffolding content={data.contentfulContactPage} />)}
  />
);

export default ContactPage;

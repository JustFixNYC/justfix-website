import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SubscribedPageScaffolding } from './subscribed';

const SubscribedPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulSubscriptionConfirmationPage( node_locale: { eq: "es" } ) {
            title
            description {
                json
            }
            teamPhoto {
                file {
                    url
                }
            }
            descriptionBelowPhoto {
                json
            }
        }
      }
    `}
  render = {data => (<SubscribedPageScaffolding content={data.contentfulSubscriptionConfirmationPage} locale="es" />)}
  />
);

export default SubscribedPage;
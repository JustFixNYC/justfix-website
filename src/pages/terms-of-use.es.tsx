import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { TermsOfUsePageScaffolding } from './terms-of-use';


const TermsOfUsePage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulGenericPage(title: {eq: "Terms of Use"}) {
            title
            pageContents {
              json
            }
        }
      }
    `}
  render = {data => (<TermsOfUsePageScaffolding content={data.contentfulGenericPage} locale="es" />)}
  />
);

export default TermsOfUsePage;
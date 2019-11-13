import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentfulContent } from '../components/types';


const PrivacyPolicyPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={{title:"Privacy Policy"}}>
    <div id="privacy-policy" className="privacy-policy-page content-wrapper tight section">
      <div className="content">{documentToReactComponents(props.content.pageContents.json)}</div>
    </div>
  </Layout>); 

const PrivacyPolicyPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulGenericPage(url: {eq: "privacy-policy"}) {
            title
            pageContents {
              json
            }
        }
      }
    `}
  render = {data => (<PrivacyPolicyPageScaffolding content={data.contentfulGenericPage} />)}
  />
);

export default PrivacyPolicyPage;
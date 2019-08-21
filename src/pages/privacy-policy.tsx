import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'


const PrivacyPolicyPageScaffolding = (props) => 
  (<Layout>
    <div id="privacy-policy" className="privacy-policy-page content-wrapper tight section">
        <div className="content" dangerouslySetInnerHTML={{ __html: props.content.pageContent.childMarkdownRemark.html}} />
    </div>
  </Layout>); 

const PrivacyPolicyPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulGenericPage(url: {eq: "privacy-policy"}) {
            title
            pageContent {
                childMarkdownRemark {
                html
                }
            }
        }
      }
    `}
  render = {data => (<PrivacyPolicyPageScaffolding content={data.contentfulGenericPage} />)}
  />
);

export default PrivacyPolicyPage;
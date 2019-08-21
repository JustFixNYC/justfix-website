import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'


const TermsOfUsePageScaffolding = (props) => 
  (<Layout>
    <div id="terms-of-use" className="terms-of-use-page content-wrapper tight section">
        <div className="content" dangerouslySetInnerHTML={{ __html: props.content.pageContent.childMarkdownRemark.html}} />
    </div>
  </Layout>); 

const TermsOfUsePage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulGenericPage(url: {eq: "terms-of-use"}) {
            title
            pageContent {
                childMarkdownRemark {
                html
                }
            }
        }
      }
    `}
  render = {data => (<TermsOfUsePageScaffolding content={data.contentfulGenericPage} />)}
  />
);

export default TermsOfUsePage;
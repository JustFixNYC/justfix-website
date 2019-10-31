import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const TermsOfUsePageScaffolding = (props) => 
  (<Layout metadata={{title:"Terms of Use"}}>
    <div id="terms-of-use" className="terms-of-use-page content-wrapper tight section">
      <div className="content">{documentToReactComponents(props.content.pageContents.json)}</div>
    </div>
  </Layout>); 

const TermsOfUsePage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulGenericPage(url: {eq: "terms-of-use"}) {
            title
            pageContents {
              json
            }
        }
      }
    `}
  render = {data => (<TermsOfUsePageScaffolding content={data.contentfulGenericPage} />)}
  />
);

export default TermsOfUsePage;
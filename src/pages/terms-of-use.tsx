import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ContentfulContent } from '.'

export const TermsOfUsePageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={{title:"Terms of Use"}} locale={props.locale}>
    <div id="terms-of-use" className="terms-of-use-page content-wrapper tight section">
      <div className="content">{documentToReactComponents(props.content.pageContents.json)}</div>
    </div>
  </Layout>); 

export const TermsOfUseQuery = graphql`
  fragment TermsOfUseQuery on Query {
    contentfulGenericPage(title: {eq: "Terms of Use"}, node_locale: {eq: $locale}) {
        title
        pageContents {
          json
        }
    }
  }`;

const TermsOfUsePage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "en-US") { ...TermsOfUseQuery }
  `}
  render = {data => (<TermsOfUsePageScaffolding content={data.contentfulGenericPage} />)}
  />
);

export default TermsOfUsePage;
import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const TermsOfUsePageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={{ title: props.content.pageTitle }}>
    <div
      id="terms-of-use"
      className="terms-of-use-page content-wrapper tight section"
    >
      <div className="content">
        {documentToReactComponents(props.content.pageContents.json)}
      </div>
    </div>
  </Layout>
);

export const TermsOfUsePageFragment = graphql`
  fragment TermsOfUsePage on Query {
    contentfulGenericPage(
      title: { eq: "Terms of Use" }
      node_locale: { eq: $locale }
    ) {
      title
      pageTitle
      pageContents {
        json
      }
    }
  }
`;

const TermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...TermsOfUsePage
      }
    `}
    render={(data) => (
      <TermsOfUsePageScaffolding content={data.contentfulGenericPage} />
    )}
  />
);

export default TermsOfUsePage;

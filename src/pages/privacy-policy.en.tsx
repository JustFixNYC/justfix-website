import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const PrivacyPolicyPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={{ title: props.content.pageTitle }}>
    <div
      id="privacy-policy"
      className="privacy-policy-page content-wrapper tight section"
    >
      <div className="content">
        {documentToReactComponents(props.content.pageContents.json)}
      </div>
    </div>
  </Layout>
);

export const PrivacyPolicyPageFragment = graphql`
  fragment PrivacyPolicyPage on Query {
    contentfulGenericPage(
      title: { eq: "Privacy Policy" }
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

const PrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...PrivacyPolicyPage
      }
    `}
    render={(data) => (
      <PrivacyPolicyPageScaffolding content={data.contentfulGenericPage} />
    )}
  />
);

export default PrivacyPolicyPage;

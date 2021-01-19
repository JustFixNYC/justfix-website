import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const EvictionFreePrivacyPolicyPageScaffolding = (
  props: ContentfulContent
) => (
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

export const EvictionFreePrivacyPolicyPageFragment = graphql`
  fragment EvictionFreePrivacyPolicyPage on Query {
    contentfulGenericPage(
      title: { eq: "Eviction Free NY Privacy Policy" }
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

const EvictionFreePrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...EvictionFreePrivacyPolicyPage
      }
    `}
    render={(data) => (
      <EvictionFreePrivacyPolicyPageScaffolding
        content={data.contentfulGenericPage}
      />
    )}
  />
);

export default EvictionFreePrivacyPolicyPage;

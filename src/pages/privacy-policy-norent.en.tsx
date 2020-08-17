import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const NorentPrivacyPolicyPageScaffolding = (
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

export const NorentPrivacyPolicyPageFragment = graphql`
  fragment NorentPrivacyPolicyPage on Query {
    contentfulGenericPage(
      title: { eq: "NoRent Privacy Policy" }
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

const NorentPrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...NorentPrivacyPolicyPage
      }
    `}
    render={(data) => (
      <NorentPrivacyPolicyPageScaffolding
        content={data.contentfulGenericPage}
      />
    )}
  />
);

export default NorentPrivacyPolicyPage;

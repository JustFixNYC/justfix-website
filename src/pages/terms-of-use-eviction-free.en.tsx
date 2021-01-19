import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const EvictionFreeTermsOfUsePageScaffolding = (
  props: ContentfulContent
) => (
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

export const EvictionFreeTermsOfUsePageFragment = graphql`
  fragment EvictionFreeTermsOfUsePage on Query {
    contentfulGenericPage(
      title: { eq: "Eviction Free NY Terms of Use" }
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

const EvictionFreeTermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...EvictionFreeTermsOfUsePage
      }
    `}
    render={(data) => (
      <EvictionFreeTermsOfUsePageScaffolding
        content={data.contentfulGenericPage}
      />
    )}
  />
);

export default EvictionFreeTermsOfUsePage;

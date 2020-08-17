import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";

export const NorentTermsOfUsePageScaffolding = (props: ContentfulContent) => (
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

export const NorentTermsOfUsePageFragment = graphql`
  fragment NorentTermsOfUsePage on Query {
    contentfulGenericPage(
      title: { eq: "NoRent Terms of Use" }
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

const NorentTermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...NorentTermsOfUsePage
      }
    `}
    render={(data) => (
      <NorentTermsOfUsePageScaffolding content={data.contentfulGenericPage} />
    )}
  />
);

export default NorentTermsOfUsePage;

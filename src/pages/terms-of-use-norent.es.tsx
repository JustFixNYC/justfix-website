import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { NorentTermsOfUsePageScaffolding } from "./terms-of-use-norent.en";

const NorentTermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...NorentTermsOfUsePage
      }
    `}
    render={(data) => (
      <NorentTermsOfUsePageScaffolding
        content={data.contentfulGenericPage}
      />
    )}
  />
);

export default NorentTermsOfUsePage;

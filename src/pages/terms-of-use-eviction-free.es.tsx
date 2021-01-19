import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { EvictionFreeTermsOfUsePageScaffolding } from "./terms-of-use-eviction-free.en";

const EvictionFreeTermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
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

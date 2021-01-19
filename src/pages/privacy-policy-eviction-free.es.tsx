import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { EvictionFreePrivacyPolicyPageScaffolding } from "./privacy-policy-eviction-free.en";

const EvictionFreePrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
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

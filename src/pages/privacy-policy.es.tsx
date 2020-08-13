import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PrivacyPolicyPageScaffolding } from "./privacy-policy.en";

const PrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...PrivacyPolicyPage
      }
    `}
    render={(data) => (
      <PrivacyPolicyPageScaffolding
        content={data.contentfulGenericPage}
      />
    )}
  />
);

export default PrivacyPolicyPage;

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { NorentPrivacyPolicyPageScaffolding } from "./privacy-policy-norent.en";

const NorentPrivacyPolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...NorentPrivacyPolicyPage
      }
    `}
    render={(data) => (
      <NorentPrivacyPolicyPageScaffolding
        content={data.contentfulGenericPage}
        locale="es"
      />
    )}
  />
);

export default NorentPrivacyPolicyPage;

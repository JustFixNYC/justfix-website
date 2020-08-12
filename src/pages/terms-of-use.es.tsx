import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { TermsOfUsePageScaffolding } from "./terms-of-use.en";

const TermsOfUsePage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...TermsOfUsePage
      }
    `}
    render={(data) => (
      <TermsOfUsePageScaffolding
        content={data.contentfulGenericPage}
        locale="es"
      />
    )}
  />
);

export default TermsOfUsePage;

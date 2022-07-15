import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PolicyPageScaffolding } from "./reports.en";

const PolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...PolicyPage
      }
    `}
    render={(data) => (
      <PolicyPageScaffolding content={data.contentfulPolicyPage} />
    )}
  />
);

export default PolicyPage;

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PartnersPageScaffolding } from "./partners.en";

const PartnersPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...PartnersPage
      }
    `}
    render={(data) => (
      <PartnersPageScaffolding
        content={data.contentfulPartnersPage}
      />
    )}
  />
);

export default PartnersPage;

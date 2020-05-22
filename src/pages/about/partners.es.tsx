import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PartnersPageScaffolding } from "./partners";

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
        locale="es"
      />
    )}
  />
);

export default PartnersPage;

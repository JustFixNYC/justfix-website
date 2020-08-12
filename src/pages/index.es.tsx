import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { LandingPageScaffolding } from "./index.en";

const LandingPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...LandingPage
      }
    `}
    render={(data) => (
      <LandingPageScaffolding content={data.contentfulHomePage} locale="es" />
    )}
  />
);

export default LandingPage;

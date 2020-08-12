import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { PressPageScaffolding } from "./press.en";

const PressPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...PressPage
      }
    `}
    render={(data) => (
      <PressPageScaffolding content={data.contentfulPressPage} locale="es" />
    )}
  />
);

export default PressPage;

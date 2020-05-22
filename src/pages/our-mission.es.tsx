import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MissionPageScaffolding } from "./our-mission";

const MissionPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...MissionPage
      }
    `}
    render={(data) => (
      <MissionPageScaffolding
        content={data.contentfulMissionPage}
        locale="es"
      />
    )}
  />
);

export default MissionPage;

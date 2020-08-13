import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MissionPageScaffolding } from "./our-mission.en";

const MissionPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...MissionPage
      }
    `}
    render={(data) => (
      <MissionPageScaffolding content={data.contentfulMissionPage} />
    )}
  />
);

export default MissionPage;

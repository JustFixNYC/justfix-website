import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { TeamPageScaffolding } from "./team";

const TeamPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...TeamPage
      }
    `}
    render={(data) => (
      <TeamPageScaffolding content={data.contentfulTeamPage} locale="es" />
    )}
  />
);

export default TeamPage;

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { TeamPageScaffolding } from "./team.en";

const TeamPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...TeamPage
      }
    `}
    render={(data) => <TeamPageScaffolding content={data.contentfulTeamPage} />}
  />
);

export default TeamPage;

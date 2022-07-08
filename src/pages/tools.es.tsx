import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ToolsPageScaffolding } from "./tools.en";

const ToolsPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...ToolsPage
      }
    `}
    render={(data) => (
      <ToolsPageScaffolding content={data.contentfulToolsPage} />
    )}
  />
);

export default ToolsPage;

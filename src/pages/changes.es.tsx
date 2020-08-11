import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ChangelogPageScaffolding } from "./changes.en";

const SpanishChangelogPage: React.FC<{}> = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...LocalizedChangelogEntries
      }
    `}
    render={(data) => <ChangelogPageScaffolding content={data} />}
  />
);

export default SpanishChangelogPage;

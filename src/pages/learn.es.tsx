import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { LearningPageScaffolding } from "./learn.en";

const LearningPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...LearningPage
      }
    `}
    render={(data) => (
      <LearningPageScaffolding
        content={data.contentfulLearningCenterSearchPage}
      />
    )}
  />
);

export default LearningPage;

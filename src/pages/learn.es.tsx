import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { LearningPageScaffolding } from './learn';

const LearningPage  = () => (
  <StaticQuery
  query={graphql`
    query ($locale: String! = "es") { ...LearningPageQuery }
  `}
  render = {data => (<LearningPageScaffolding content={data.contentfulLearningCenterSearchPage} locale="es" />)}
  />
);

export default LearningPage;

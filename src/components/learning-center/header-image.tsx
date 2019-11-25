import React from 'react'
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill"

export const LearningCenterImage = () => (
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage {
            headerImage {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      `}
    render = {data => (<Img fluid={data.contentfulLearningCenterSearchPage.headerImage.fluid} />)}
    />
  );
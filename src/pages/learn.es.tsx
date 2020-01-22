import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { LearningPageScaffolding } from './learn';

const LearningPage  = () => (
  <StaticQuery
    query={graphql`
      query {
        contentfulLearningCenterSearchPage {
          metadata {
            title
            description
            keywords {
              keywords
            }
            shareImage {
              file {
                url
              }
            }
          }
          title
          headerImage {
            file {
              url
            }
          }
          subtitle
          articles {
            slug
            title
            previewText {
              previewText
            }
            categories {
              title
              description
              slug
            }
          }
          learningCenterCta {
            title
            subtitle
            ctaText
            ctaLink
          }
          justFixCta {
            title
            subtitle
            ctaText
            ctaLink
          }
        }
      }
    `}
  render = {data => (<LearningPageScaffolding content={data.contentfulLearningCenterSearchPage} locale="es" />)}
  />
);

export default LearningPage;

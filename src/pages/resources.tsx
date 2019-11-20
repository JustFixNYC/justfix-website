import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import { ContentfulContent } from '../components/types';

const LearningPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata}>

  </Layout>); 

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
          subtitle
          headerImage {
            fluid {
              src
            }
          }
          categoryButtons {
            title
            description
          }
          articles {
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
            slug
            title
            subtitle {
              json
            }
            previewText {
              previewText
            }
            author
            dateUpdated
            category {
              title
              description
            }
            articleSections {
              __typename
              ... on ContentfulLearningArticleCtaBlock {
                title
                subtitle
                ctaText
                ctaLink
              }
              ... on ContentfulLearningArticleSection {
                title
                content {
                  json
                }
              }
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
  render = {data => (<LearningPageScaffolding content={data.contentfulLearningCenterSearchPage} />)}
  />
);

export default LearningPage;

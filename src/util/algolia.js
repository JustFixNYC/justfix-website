
const pt = require('@contentful/rich-text-plain-text-renderer');

const pageQuery = `{
    articles: allContentfulLearningArticlePage(filter:{node_locale:{eq:"en-US"}}) {
        edges {
          node {
            slug
            title
            author
            subtitle {
              json
            }
            articleSections {
              __typename
              ... on ContentfulLearningArticleSection {
                title
                content {
                  json
                }
              }
            }
          }
        }
      }
  }`

  /** Take the object from the GraphQL query and 
   * unpack and reformat data from the subtitle and article sections to create a neat array */
  const flatten = arr =>
    arr.map(
      ({ node: {subtitle, articleSections, ...rest } }) => {
      const subtitleContent = subtitle && subtitle.json ? pt.documentToPlainTextString(subtitle.json) : "";
      const sectionsTitles = articleSections.map( section => section.title );
      const sectionsContent = articleSections.map( 
        section => section.content && section.content.json ? pt.documentToPlainTextString(section.content.json) : "");
      return ({
        ...rest,
        sectionsTitles,
        sectionsContent,
        subtitleContent,
        });
      })
  const queries = [
    {
      query: pageQuery,
      transformer: ({ data }) => flatten(data.articles.edges),
      indexName: `learning_center`,
    },
  ]

  module.exports = queries
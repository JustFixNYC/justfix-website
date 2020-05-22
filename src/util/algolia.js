const pt = require("@contentful/rich-text-plain-text-renderer");

const generatePageQuery = (locale) =>
  `{
    articles: allContentfulLearningArticlePage(filter:{node_locale:{eq:"` +
  (locale || "en-US") +
  `"}}) {
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
  }`;

/** Take the object from the GraphQL query and
 * unpack and reformat data from the subtitle and article sections to create a neat array */
const flatten = (arr) =>
  arr.map(({ node: { author, subtitle, articleSections, ...rest } }) => {
    const byline = author ? "By " + author + " | " : "";
    const subtitleContent =
      subtitle && subtitle.json
        ? pt.documentToPlainTextString(subtitle.json)
        : "";
    const sectionsContent = articleSections.map((section) =>
      section.title && section.content && section.content.json
        ? section.title +
          " | " +
          pt.documentToPlainTextString(section.content.json)
        : ""
    );
    const articleContent =
      byline +
      subtitleContent +
      " " +
      sectionsContent.reduce(
        (section1, section2) => section1 + "     " + section2
      );
    return {
      ...rest,
      articleContent,
    };
  });

const queries = [
  {
    query: generatePageQuery(),
    transformer: ({ data }) => flatten(data.articles.edges),
    indexName: `learning_center`,
  },
  {
    query: generatePageQuery("es"),
    transformer: ({ data }) => flatten(data.articles.edges),
    indexName: `learning_center_es`,
  },
];

module.exports = queries;

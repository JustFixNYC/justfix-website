/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async function({ actions, graphql }) {
  
  /* Generate Learning Center pages */
  const { data } = await graphql(`
    query {
      contentfulLearningCenterSearchPage {
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
          categories {
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
  `)

  /* Learning Center category pages */
  const articles = data.contentfulLearningCenterSearchPage.articles;
  data.contentfulLearningCenterSearchPage.categoryButtons.forEach(category => {
    actions.createPage({
      path: '/resources/' + category.title.replace(' ','-').toLowerCase(),
      component: require.resolve(`./src/components/article.tsx`),
      context: { 
        content: category,
        articles: articles
       },
    })
  })

  /* Learning Center article pages */
  data.contentfulLearningCenterSearchPage.articles.forEach(article => {
    actions.createPage({
      path: '/resources/' + article.slug,
      component: require.resolve(`./src/components/article.tsx`),
      context: { content: article },
    })
  })

  /* Redirects for old site pages */
  const {createRedirect} = actions //actions is collection of many actions - https://www.gatsbyjs.org/docs/actions
  createRedirect({ fromPath: '/donate', toPath: 'https://donorbox.org/donate-to-justfix-nyc', isPermanent: true });
  createRedirect({ fromPath: '/get-repairs', toPath: '/', isPermanent: true });
  createRedirect({ fromPath: '/about/products-and-services', toPath: '/#products', isPermanent: true });

}


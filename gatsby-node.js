/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/* Generate Learning Center pages */
const generateLearningPages = async function({ actions, graphql }, locale) {
  const query = `query {
    contentfulLearningCenterSearchPage` + (locale === "es" ? `(node_locale: { eq: "es" })` : ``) + `{
      categoryButtons {
        title
        description
        slug
      }
      allToolsCta {
        title
        subtitle
        ctaText
        ctaLink
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
      thankYouText {
        json
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
          slug
        }
        articleSections {
          __typename
          ... on ContentfulLearningArticleCtaBlock {
            title
            subtitle
            ctaText
            ctaLink
            secondaryCta {
              subtitle
              ctaText
              ctaLink
            }
          }
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
` 
  
  const { data } = await graphql(query)

  /* Learning Center category pages */
  const allPublishedArticles = data.contentfulLearningCenterSearchPage.articles;
  const thankYouBanner = data.contentfulLearningCenterSearchPage.thankYouText;
  data.contentfulLearningCenterSearchPage.categoryButtons.forEach(category => {
    actions.createPage({
      path: (locale || "") + '/learn/category/' + category.slug,
      component: require.resolve(`./src/components/learning-center/category-page-template.tsx`),
      context: { 
        locale: locale,
        content: category,
        thankYouBanner: thankYouBanner,
        articlePreviews: allPublishedArticles.filter( 
          article => (article.categories).some( articleCategory => articleCategory.title === category.title)
        )
      },
    })
  })

  /* Learning Center article pages */

  const articleFooter = {
    categoryButtons: data.contentfulLearningCenterSearchPage.categoryButtons,
    learningCenterCta: data.contentfulLearningCenterSearchPage.learningCenterCta,
    justFixCta: data.contentfulLearningCenterSearchPage.justFixCta,
    articles: allPublishedArticles.map( article => {
      const {title, slug, categories, ...partialObject} = article;
      const subset = { title, slug, categories };
      return subset; 
     } )
  };
  const allToolsCta = data.contentfulLearningCenterSearchPage.allToolsCta;
  data.contentfulLearningCenterSearchPage.articles.forEach(article => {
    actions.createPage({
      path: (locale || "") + '/learn/' + article.slug,
      component: require.resolve(`./src/components/learning-center/article-template.tsx`),
      context: { 
        locale: locale,
        allToolsCta: allToolsCta,
        articleFooter: articleFooter,
        content: article
      },
    })
  })
};

exports.createPages = async function({ actions, graphql }) {

  generateLearningPages({ actions, graphql });
  generateLearningPages({ actions, graphql }, "es");

  /* Redirects for old site pages */
  const {createRedirect} = actions //actions is collection of many actions - https://www.gatsbyjs.org/docs/actions
  createRedirect({ fromPath: '/donate', toPath: 'https://donorbox.org/donate-to-justfix-nyc', isPermanent: true });
  createRedirect({ fromPath: '/get-repairs', toPath: '/', isPermanent: true });
  createRedirect({ fromPath: '/about/products-and-services', toPath: '/#products', isPermanent: true });

}


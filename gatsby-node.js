/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const localeConfig = require("./src/util/locale-config.json");

/**
 * Our Contentful space uses the full "en-US" locale name for English, so this
 * helper function let's us easily grab the long name when we need it.
 */
const getFullLocaleName = (locale) => (locale === "en" ? "en-US" : locale);

/**
 * For urls with no locale specified, this helper generates params for the `createPage`
 * method to generate a page that programmatically adds on the browser's default locale.
 * See `locale-redirect.tsx` for details on how the redirect works.
 */
const createLocaleRedirectOptions = (path) => {
  let options = {
    path: path,
    component: require.resolve(`./src/components/locale-redirect.tsx`),
    context: {
      slug: path,
    },
  };
  return options;
};

/* Generate Learning Center pages */
const generateLearningPages = async function ({ actions, graphql }, locale) {
  const query =
    `query {
    contentfulLearningCenterSearchPage(node_locale: { eq:"` +
    getFullLocaleName(locale) +
    `" } ){
      title
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
        englishOnly
        title
        coverPhoto {
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        subtitle {
          json
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
`;

  const { data } = await graphql(query);

  const articlePreviews = data.contentfulLearningCenterSearchPage.articles.map(
    (article) => {
      const {
        title,
        slug,
        englishOnly,
        metadata,
        categories,
        dateUpdated,
        ...rest
      } = article;
      const subset = {
        title,
        slug,
        englishOnly,
        metadata,
        categories,
        dateUpdated,
      };
      return subset;
    }
  );

  /* Create each Learning Center category page with appropriate data */
  const thankYouBanner = data.contentfulLearningCenterSearchPage.thankYouText;
  const allCategoryButtons =
    data.contentfulLearningCenterSearchPage.categoryButtons;

  data.contentfulLearningCenterSearchPage.categoryButtons.forEach(
    (category) => {
      actions.createPage({
        path: locale + "/learn/category/" + category.slug,
        component: require.resolve(
          `./src/components/learning-center/category-page-template.tsx`
        ),
        context: {
          content: category,
          categoryButtons: allCategoryButtons,
          thankYouBanner: thankYouBanner,
          articlePreviews: articlePreviews.filter((article) =>
            article.categories.some(
              (articleCategory) => articleCategory.title === category.title
            )
          ),
        },
      });
      /* Create a redirect for urls with no locale specified */
      actions.createPage(
        createLocaleRedirectOptions("/learn/category/" + category.slug)
      );
    }
  );

  /* Create each Learning Center article page with appropriate data */

  const learningCenterTitle = data.contentfulLearningCenterSearchPage.title;
  const allToolsCta = data.contentfulLearningCenterSearchPage.allToolsCta;
  const articleFooter = {
    categoryButtons: data.contentfulLearningCenterSearchPage.categoryButtons,
    learningCenterCta:
      data.contentfulLearningCenterSearchPage.learningCenterCta,
    justFixCta: data.contentfulLearningCenterSearchPage.justFixCta,
    articles: articlePreviews,
  };

  data.contentfulLearningCenterSearchPage.articles.forEach((article) => {
    actions.createPage({
      path: locale + "/learn/" + article.slug,
      component: require.resolve(
        `./src/components/learning-center/article-template.tsx`
      ),
      context: {
        learningCenterTitle: learningCenterTitle,
        allToolsCta: allToolsCta,
        articleFooter: articleFooter,
        content: article,
      },
    });
    /* Create a redirect for urls with no locale specified */
    actions.createPage(createLocaleRedirectOptions("/learn/" + article.slug));
  });
};

const deprecatedLearningCenterArticles = [
  {
    slug: "how-to-break-a-lease",
    redirectCategory: "laws",
  },
  {
    slug: "public-eviction-records",
    redirectCategory: "eviction",
  },
  {
    slug: "housing-discrimination-examples",
    redirectCategory: "discrimination",
  },
  {
    slug: "fair-housing-act",
    redirectCategory: "laws",
  },
  {
    slug: "eviction-notice-what-to-do",
    redirectCategory: "eviction",
  },
  {
    slug: "ny-eviction-moratorium-faq",
    redirectCategory: "eviction",
  },
  {
    slug: "nyc-housing-during-coronavirus",
    redirectCategory: "laws",
  },
  {
    slug: "homeless-during-coronavirus-nyc",
    redirectCategory: "discrimination",
  },
  {
    slug: "rent-freeze-faq",
    redirectCategory: "eviction",
  },
];

exports.createPages = async function ({ actions, graphql }) {
  generateLearningPages({ actions, graphql }, "en"); // English pages
  generateLearningPages({ actions, graphql }, "es"); // Spanish pages

  /* Redirects for old site pages */
  const { createRedirect } = actions; //actions is collection of many actions - https://www.gatsbyjs.org/docs/actions
  createRedirect({
    fromPath: "/donate",
    toPath: "https://donorbox.org/donate-to-justfix-nyc",
    isPermanent: true,
  });
  createRedirect({
    fromPath: "/ehp",
    toPath: "https://app.justfix.nyc/ehp",
    isPermanent: true,
  });
  createRedirect({ fromPath: "/get-repairs", toPath: "/", isPermanent: true });
  createRedirect({
    fromPath: "/about/products-and-services",
    toPath: "/#products",
    isPermanent: true,
  });
  // Create redirects for all pages that used to be in the old `/about` directory:
  ["partners", "press", "team"].map((path) =>
    localeConfig.ACCEPTED_LOCALES.map((locale) =>
      createRedirect({
        fromPath: `/${locale}/about/${path}`,
        toPath: `/${locale}/${path}`,
        isPermanent: true,
      })
    )
  );
  // Create redirects for old Learning Center articles that have been removed:
  deprecatedLearningCenterArticles.map(({ slug, redirectCategory }) =>
    localeConfig.ACCEPTED_LOCALES.map((locale) =>
      createRedirect({
        fromPath: `/${locale}/learn/${slug}`,
        toPath: `/${locale}/learn/category/${redirectCategory}`,
        isPermanent: true,
      })
    )
  );
};

/* Add a redirect page for any remaining route that doesn't specify the locale in the url */
exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage, deletePage } = boundActionCreators;

  if (
    !(page.context.slug && page.context.langKey === localeConfig.DEFAULT_LOCALE)
  )
    return;
  /* Do we need to return a Promise here? All of the examples I saw of returns from `onCreatePage` 
  returned a promise, but not entirely sure why... */
  return new Promise((resolve, reject) => {
    const rootSlug = page.context.slug
      .replace(page.context.langKey, "")
      .replace("//", "/");

    const newPage = createLocaleRedirectOptions(rootSlug);
    createPage(newPage);
    resolve();
  });
};

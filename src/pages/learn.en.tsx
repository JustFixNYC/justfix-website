import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/learn.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import LearningSearchBar from "../components/learning-center/learning-searchbar";
import CategoryMenu from "../components/learning-center/category-menu";
import { Trans } from "@lingui/macro";
import classnames from "classnames";
import { LocaleLink } from "../components/locale-link";
import { useCurrentLocale } from "../util/use-locale";
import { FluidObject } from "gatsby-image";
import localeConfig from "../util/locale-config.json";
import { ReadMoreLink } from "../components/read-more";
import { Button } from "react-scroll";

const Dot = () => <span className="mx-3">·</span>;

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

const widont = require("widont");

const sortArticlesByDate = (article1: any, article2: any) => {
  const date1 = new Date(article1.dateUpdated).getTime();
  const date2 = new Date(article2.dateUpdated).getTime();
  return date2 - date1;
};

/**
 * Orders an array of Learning Center article content objects based on two criteria:
 * 1. Article are ordered by date last updated, from most recent to oldest
 * 2. For non-English locales, articles marked as "English Only" will be ordered last
 */
export const orderArticles = (articles: any[]) => {
  const locale = useCurrentLocale();
  return locale !== "en"
    ? articles
        /* Make sure "English Only" articles appear last */
        .filter((article: any) => !article.englishOnly)
        .sort(sortArticlesByDate)
        .concat(
          articles
            .filter((article: any) => article.englishOnly)
            .sort(sortArticlesByDate)
        )
    : articles.sort(sortArticlesByDate);
};

export type Category = {
  title: string;
  description: string;
  slug: string;
};

type ArticlePreviewInfo = {
  slug: string;
  title: string;
  englishOnly: boolean;
  metadata: {
    description: string;
  };
  dateUpdated: string;
  coverPhoto?: {
    fluid: FluidObject;
  };
  categories?: Category[];
};

const ArticlePreviewCard = (props: ArticlePreviewInfo) => {
  const locale = useCurrentLocale();
  const isFeatured = !props.categories;
  const articleUrl = "/learn/" + props.slug;
  const categoryLabels =
    !isFeatured &&
    props
      .categories!.map<React.ReactNode>((category: Category, i: number) => (
        <LocaleLink
          key={i}
          to={"/learn/category/" + category.slug}
          className="jf-category-label eyebrow is-small no-underline"
        >
          {category.title}
        </LocaleLink>
      ))
      .reduce((cat1, cat2, i) => [cat1, <Dot key={Math.random()} />, cat2]);

  return (
    <div className="column is-8">
      <div
        className={classnames(
          "jf-article-card px-6 py-7 mb-2 ",
          isFeatured ? "has-background-warning" : ""
        )}
      >
        <div className="mt-2 mb-6">
          {isFeatured ? (
            <span className="eyebrow">Featured Article</span>
          ) : (
            categoryLabels
          )}
        </div>
        <div className="mb-6">
          <h3 className="mb-6">{props.title}</h3>
          <span className="is-hidden-mobile eyebrow is-small mb-6">
            <Trans>Updated</Trans> {formatDate(props.dateUpdated, locale)}
          </span>
        </div>
        {isFeatured ? (
          <LocaleLink className={"button is-primary"} to={articleUrl}>
            <Trans>Read More</Trans>
          </LocaleLink>
        ) : (
          <ReadMoreLink url={articleUrl} />
        )}
      </div>
    </div>
  );
};

export const LearningPageScaffolding = (props: ContentfulContent) => {
  const articles = orderArticles(props.content.articles);
  return (
    <Layout metadata={props.content.metadata}>
      <div id="learning-center" className="learning-center-page">
        <div className="columns is-centered is-multiline pt-12 pt-7-mobile">
          <div className="column is-8">
            <span className="eyebrow is-large">
              <Trans>Learning Center</Trans>
            </span>
            <h1 className="mb-6">{props.content.title}</h1>
            <LearningSearchBar props={props.content} />
          </div>
          <ArticlePreviewCard {...props.content.featuredArticle} />
          <ArticlePreviewCard {...articles[0]} />
        </div>

        {/* <section className="hero is-small">
          <div className="hero-body has-text-centered is-horizontal-center">
            <div className="container content-wrapper tight">
              <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                {props.content.title}
              </h1>
              <h6 className="subtitle has-text-grey-dark is-italic">
                {widont(props.content.subtitle)}
              </h6>
              <br />
              <CategoryMenu content={props.content.categoryButtons} />
            </div>
          </div>
        </section>
        <section className="content-wrapper tight">
          {articles.map((article: any, i: number) => (
            <ArticlePreviewCard articleData={article} key={i} />
          ))}
        </section> */}
      </div>
    </Layout>
  );
};

export const LearningPageFragment = graphql`
  fragment LearningPage on Query {
    contentfulLearningCenterSearchPage(node_locale: { eq: $locale }) {
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
      categoryButtons {
        title
        slug
      }
      popularArticles {
        slug
        title
      }
      featuredArticle {
        slug
        title
        englishOnly
        metadata {
          description
        }
        dateUpdated
        coverPhoto {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      articles {
        slug
        title
        englishOnly
        metadata {
          description
        }
        dateUpdated
        categories {
          title
          description
          slug
        }
      }
    }
  }
`;

const LearningPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
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

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

export const isCovidRelated = (word: string) =>
  /COVID/.test(word.toUpperCase());

export type Category = {
  title: string;
  description: string;
  slug: string;
};

export const ArticlePreviewCard = (props: any) => {
  const url = "/learn/" + props.articleData.slug;
  const locale = useCurrentLocale();
  const categoryLabels = props.articleData.categories.map(
    (category: Category, i: number) => (
      <LocaleLink
        key={i}
        to={"/learn/category/" + category.slug}
        className={classnames(
          "tag",
          "is-uppercase",
          "is-light",
          isCovidRelated(category.title) ? "is-warning" : "is-primary"
        )}
      >
        {category.title}
      </LocaleLink>
    )
  );
  return (
    <div className="box article-preview">
      {locale === "es" && props.articleData.englishOnly && (
        <>
          <p className="has-text-danger is-italic">Solo en inglés</p>
          <br />
        </>
      )}
      <h1 className="title is-size-3 has-text-primary is-spaced has-text-weight-semibold">
        <LocaleLink to={url}>{widont(props.articleData.title)}</LocaleLink>
      </h1>
      <h6 className="has-text-grey-dark">
        {widont(props.articleData.metadata.description)}
      </h6>
      <br />
      <div>
        <LocaleLink
          to={url}
          className="is-inline-block is-size-7 is-uppercase has-text-weight-semibold has-letters-spaced"
        >
          <Trans>Read More</Trans> →
        </LocaleLink>
        <div className="tags is-hidden-mobile is-inline-block is-uppercase is-pulled-right has-letters-spaced">
          {categoryLabels}
        </div>
        <div className="tags is-hidden-tablet is-uppercase has-letters-spaced">
          {categoryLabels}
        </div>
      </div>
    </div>
  );
};

export const LearningPageScaffolding = (props: ContentfulContent) => {
  const articles = orderArticles(props.content.articles);
  return (
    <Layout metadata={props.content.metadata}>
      <div id="learning-center" className="learning-center-page">
        <div className="columns is-centered pt-12 pt-7-mobile">
          <div className="column is-8">
            <span className="eyebrow is-large">
              <Trans>Learning Center</Trans>
            </span>
            <h1 className="mb-6">{props.content.title}</h1>
            <LearningSearchBar props={props.content} />

            {/* <ArticlePreviewCard articleData={props.content.featuredArticle} /> */}
          </div>
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

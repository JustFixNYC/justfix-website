import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/learn.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import LearningSearchBar from "../components/learning-center/learning-searchbar";
import { Trans } from "@lingui/macro";
import classnames from "classnames";
import { LocaleLink } from "../components/locale-link";
import { useCurrentLocale } from "../util/use-locale";
import { FluidObject } from "gatsby-image";
import localeConfig from "../util/locale-config.json";
import { ReadMoreLink } from "../components/read-more";
import Img from "gatsby-image/withIEPolyfill";

const Dot = () => <span className="mx-3">•</span>;

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

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

export type ArticlePreviewInfo = {
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
  isLast?: boolean;
};

export const ArticlePreviewCard = (props: ArticlePreviewInfo) => {
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
          className="eyebrow is-small no-underline"
        >
          {category.title}
        </LocaleLink>
      ))
      .reduce((cat1, cat2, i) => [cat1, <Dot key={Math.random()} />, cat2]);

  return (
    <div className="column is-8 is-12-touch py-0">
      <div
        className={classnames(
          "jf-article-card ",
          isFeatured ? "has-background-warning" : ""
        )}
      >
        {!!props.coverPhoto && (
          <Img fluid={props.coverPhoto.fluid} className="jf-article-photo" />
        )}
        <div
          className={classnames(
            "pt-7 mb-2",
            isFeatured ? "pb-7 px-6" : "px-0",
            !isFeatured && !props.isLast ? "pb-0-touch" : ""
          )}
        >
          <div className="mt-2 mb-6 mb-3-touch">
            {isFeatured ? (
              <span className="eyebrow">
                <Trans>Featured Article</Trans>
              </span>
            ) : (
              <div className="jf-category-labels">{categoryLabels}</div>
            )}
          </div>
          <div className="mb-6 mb-3-touch">
            <LocaleLink className={"jf-link-article"} to={articleUrl}>
              <h3 className="has-text-weight-semibold mb-6 mb-3-touch">
                {props.title}
              </h3>
            </LocaleLink>
            <span className="is-hidden-touch eyebrow is-small">
              <Trans>Updated</Trans> {formatDate(props.dateUpdated, locale)}
            </span>
            <h4 className="my-6 my-3-touch">{props.metadata.description}</h4>
          </div>
          <div className="is-flex">
            {isFeatured ? (
              <div className="jf-article-link-container is-flex is-flex-direction-row">
                <LocaleLink
                  className={"button is-primary mt-0 mt-4-touch"}
                  to={articleUrl}
                >
                  <Trans>Read More</Trans>
                </LocaleLink>
              </div>
            ) : (
              <ReadMoreLink url={articleUrl} />
            )}
            {locale === "es" && props.englishOnly && (
              <span
                className={classnames(
                  "has-text-danger is-italic px-3",
                  isFeatured && "is-align-self-center pl-4"
                )}
              >
                Solo en inglés
              </span>
            )}
          </div>
          {!isFeatured && !props.isLast && (
            <div className="is-divider mt-8 mb-0"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export const LearningPageScaffolding = (props: ContentfulContent) => {
  const articles = orderArticles(props.content.articles);
  const { featuredArticle } = props.content;
  return (
    <Layout metadata={props.content.metadata}>
      <div id="learning-center" className="learning-center-page">
        <div className="columns is-centered is-multiline pt-12 pt-7-touch pb-10">
          <div className="column is-8 is-12-touch pb-0 mb-12 mb-9-mobile">
            <span className="eyebrow is-uppercase">
              <Trans>Learning Center</Trans>
            </span>
            <h1 className="mt-2 mt-4-touch mb-6">{props.content.title}</h1>
            <LearningSearchBar props={props.content} />
          </div>
          <ArticlePreviewCard {...featuredArticle} />
          {articles
            .filter((article) => article.slug !== featuredArticle.slug)
            .map((article: ArticlePreviewInfo, i: number) => (
              <ArticlePreviewCard
                {...article}
                isLast={i === articles.length - 1}
                key={i}
              />
            ))}
        </div>
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

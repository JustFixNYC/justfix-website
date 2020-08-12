import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";

import "../styles/learn.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import { ThankYouBanner } from "../components/learning-center/thank-you-banner";
import LearningSearchBar from "../components/learning-center/learning-searchbar";
import CategoryMenu from "../components/learning-center/category-menu";
import { Trans } from "@lingui/macro";
import classnames from "classnames";

const widont = require("widont");

export const sortArticlesByDate = (article1: any, article2: any) => {
  const date1 = new Date(article1.dateUpdated).getTime();
  const date2 = new Date(article2.dateUpdated).getTime();
  return date2 - date1;
};

export const isCovidRelated = (word: string) =>
  /COVID/.test(word.toUpperCase());

export type Category = {
  title: string;
  description: string;
  slug: string;
};

export const ArticlePreviewCard = (props: any) => {
  const localePrefix = "/" + props.locale;
  const url = localePrefix + "/learn/" + props.articleData.slug;
  const categoryLabels = props.articleData.categories.map(
    (category: Category, i: number) => (
      <Link
        key={i}
        to={localePrefix + "/learn/category/" + category.slug}
        className={classnames(
          "tag",
          "is-uppercase",
          "is-light",
          isCovidRelated(category.title) ? "is-warning" : "is-primary"
        )}
      >
        {category.title}
      </Link>
    )
  );
  return (
    <div className="box article-preview">
      <h1 className="title is-size-3 has-text-primary is-spaced has-text-weight-semibold">
        <Link to={url}>{widont(props.articleData.title)}</Link>
      </h1>
      <h6 className="has-text-grey-dark">
        {widont(props.articleData.previewText.previewText)}
      </h6>
      <br />
      <div>
        <Link
          to={url}
          className="is-inline-block is-size-7 is-uppercase has-text-weight-semibold has-letters-spaced"
        >
          <Trans>Read More</Trans> →
        </Link>
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

export const LearningPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata} locale={props.locale}>
    <div id="learning-center" className="learning-center-page">
      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <figure className="image landing-illustration is-3by1 is-horizontal-center">
            <img src={props.content.headerImage.file.url} />
          </figure>
          <div className="container content-wrapper tight">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
              {widont(props.content.subtitle)}
            </h6>
            <LearningSearchBar locale={props.locale} />
            <br />
            <CategoryMenu
              content={props.content.categoryButtons}
              locale={props.locale}
            />
          </div>
        </div>
      </section>
      <section className="content-wrapper tight">
        {props.content.articles
          .sort(sortArticlesByDate)
          .map((article: any, i: number) => (
            <ArticlePreviewCard
              articleData={article}
              key={i}
              locale={props.locale}
            />
          ))}
      </section>
      <ThankYouBanner
        content={props.content.thankYouText}
        locale={props.locale}
      />
    </div>
  </Layout>
);

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
      headerImage {
        file {
          url
        }
      }
      subtitle
      categoryButtons {
        title
        slug
      }
      articles {
        slug
        title
        dateUpdated
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
      thankYouText {
        json
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
        locale="en"
      />
    )}
  />
);

export default LearningPage;
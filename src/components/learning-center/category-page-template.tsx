import React from "react";
import Layout from "../layout";
import { ArticlePreviewCard, sortArticlesByDate } from "../../pages/learn.en";
import { Link } from "gatsby";
import { ThankYouBanner } from "./thank-you-banner";
import CategoryMenu from "./category-menu";
import { Locale } from "../../pages/index.en";
import { Trans } from "@lingui/macro";

const widont = require("widont");

type Props = {
  pageContext: {
    content: any;
    thankYouBanner: any;
    categoryButtons: any;
    articlePreviews: any;
  } & Locale;
};

const NoArticlesYet = () => (
  <section className="hero">
    <div className="hero-body has-text-centered is-horizontal-center">
      <div className="container content-wrapper tight">
        <h6 className="is-size-5 has-text-grey-dark">
          <span className="has-text-danger has-text-weight-semibold">
            No articles yet...
          </span>
          <br /> Check back soon for an update.
        </h6>
      </div>
    </div>
  </section>
);

const LearningCategoryPage = (props: Props) => {
  const localePrefix = "/" + props.pageContext.locale;
  const content = props.pageContext.content;
  const articlePreviews = props.pageContext.articlePreviews;
  return (
    <Layout
      metadata={{ title: content.title, description: content.description }}
      locale={props.pageContext.locale}
    >
      <div className="category-page">
        <section className="hero is-small">
          <div className="content-wrapper tight back-to-overview">
            <Link
              to={localePrefix + "/learn"}
              className="has-text-weight-semibold"
            >
              ← <Trans>Back to Overview</Trans>
            </Link>
          </div>

          <div className="hero-body has-text-centered is-horizontal-center">
            <div className="container content-wrapper tight">
              <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                {content.title}
              </h1>
              <h6 className="subtitle has-text-grey-dark is-italic">
                {widont(content.description)}
              </h6>
              <CategoryMenu
                content={props.pageContext.categoryButtons}
                selectedCategory={content.slug}
                locale={props.pageContext.locale}
              />
            </div>
          </div>
        </section>
        <section className="content-wrapper tight">
          {articlePreviews && articlePreviews.length > 0 ? (
            articlePreviews
              .sort(sortArticlesByDate)
              .map((article: any, i: number) => (
                <ArticlePreviewCard
                  articleData={article}
                  key={i}
                  locale={props.pageContext.locale}
                />
              ))
          ) : (
            <NoArticlesYet />
          )}
        </section>
        <ThankYouBanner content={props.pageContext.thankYouBanner} locale={props.pageContext.locale} />
      </div>
    </Layout>
  );
};

export default LearningCategoryPage;

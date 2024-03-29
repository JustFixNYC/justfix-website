import React from "react";
import Layout from "../layout";
import {
  ArticlePreviewCard,
  ArticlePreviewInfo,
  orderArticles,
} from "../../pages/learn.en";
import { Trans } from "@lingui/macro";
import ResponsiveElement from "../responsive-element";

type Props = {
  pageContext: {
    content: {
      title: string;
      description: string;
      slug: string;
    };
    articlePreviews: ArticlePreviewInfo[];
  };
};

const LearningCategoryPage = (props: Props) => {
  const content = props.pageContext.content;
  const articlePreviews = orderArticles(props.pageContext.articlePreviews);
  return (
    <Layout
      metadata={{ title: content.title, description: content.description }}
    >
      <div className="category-page">
        <div className="columns is-centered is-multiline pt-12 pt-7-mobile pb-10">
          <div className="column is-8 pb-0 mb-6">
            <span className="eyebrow is-large">
              <Trans>Learning Center</Trans>
            </span>
            <ResponsiveElement
              tagNames={{ desktop: "h1", touch: "h2" }}
              className="mb-6"
            >
              {content.title}
            </ResponsiveElement>
            <h3>{content.description}</h3>
          </div>

          {articlePreviews &&
            articlePreviews.length > 0 &&
            articlePreviews.map((article: any, i: number) => (
              <ArticlePreviewCard
                {...article}
                isLast={i === articlePreviews.length - 1}
                key={i}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearningCategoryPage;

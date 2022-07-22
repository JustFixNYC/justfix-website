import React from "react";
import Layout from "../layout";
import {
  ArticlePreviewCard,
  ArticlePreviewInfo,
  orderArticles,
} from "../../pages/learn.en";
import { Trans } from "@lingui/macro";

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
            <h2 className="mb-6">{content.title}</h2>
            <h3>{content.description}</h3>
          </div>

          {articlePreviews &&
            articlePreviews.length > 0 &&
            articlePreviews.map((article: any, i: number) => (
              <ArticlePreviewCard {...article} key={i} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default LearningCategoryPage;

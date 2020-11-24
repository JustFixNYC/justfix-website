import React from "react";
import { ContentfulContent } from "../../pages/index.en";
import { Category } from "../../pages/learn.en";
import { useCurrentLocale } from "../../util/use-locale";
import { LocaleLink } from "../locale-link";

const widont = require("widont");

const NUM_COLUMNS = 3;

type ArticleListing = {
  title: string;
  slug: string;
  englishOnly: boolean;
};

type TableOfContentsSection = {
  categoryTitle: string;
  articles: ArticleListing[];
  noDivider?: boolean;
};

const TableOfContentsSection = (props: TableOfContentsSection) => {
  const locale = useCurrentLocale();
  return props.articles.length > 0 ? (
    <div className="table-of-contents-section">
      <p className="menu-label">{props.categoryTitle}</p>
      <ul>
        {props.articles.map((article: ArticleListing, i: number) => (
          <li key={i}>
            <LocaleLink to={"/learn/" + article.slug}>
            {locale === "es" && article.englishOnly && "(en inglés)"}
              {" "}
              {article.title}{" "}
            </LocaleLink>
          </li>
        ))}
        <div
          className={
            "is-divider light" + (props.noDivider ? " is-hidden-tablet" : "")
          }
        />
      </ul>
    </div>
  ) : (
    <div />
  );
};

type FooterCtaProps = {
  content: {
    title: string;
    subtitle: string;
    ctaLink: string;
    ctaText: string;
  };
};

const FooterCta = (props: FooterCtaProps) => {
  return (
    <div className="hero footer-cta is-white-ter">
      <div className="hero-body">
        <h1 className="title is-size-4 has-text-weight-bold has-text-grey-dark is-spaced">
          {widont(props.content.title)}
        </h1>
        {props.content.subtitle && (
          <p className="title is-size-6 has-text-weight-medium has-text-grey-dark is-spaced">
            {widont(props.content.subtitle)}
          </p>
        )}
        <LocaleLink to={props.content.ctaLink}>
          {props.content.ctaText} →
        </LocaleLink>
      </div>
    </div>
  );
};

export const LearningArticleFooter = (props: ContentfulContent) => {
  const AllArticles = props.content.articles;
  const ArticlesSortedByCategory = props.content.categoryButtons.map(
    (category: Category) => ({
      categoryTitle: category.title,
      /* For given category, filter out articles that include it as one if its tags: */

      articles: AllArticles.filter((article: any) =>
        article.categories.some(
          (articleCategory: Category) =>
            articleCategory.title === category.title
        )
      ),
    })
  );

  return (
    <div className="columns is-desktop has-background-white-ter">
      <div className="column footer-ctas">
        <FooterCta content={props.content.learningCenterCta} />
        <FooterCta content={props.content.justFixCta} />
      </div>
      <div className="column table-of-contents is-half-desktop">
        <div className="columns hero-body">
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map(
              (section: TableOfContentsSection, i: number) =>
                i % NUM_COLUMNS === 0 ? (
                  <TableOfContentsSection
                    key={i}
                    noDivider={ArticlesSortedByCategory.length <= i + 3}
                    categoryTitle={section.categoryTitle}
                    articles={section.articles}
                  />
                ) : (
                  <React.Fragment key={i} />
                )
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map(
              (section: TableOfContentsSection, i: number) =>
                i % NUM_COLUMNS === 1 ? (
                  <TableOfContentsSection
                    key={i}
                    noDivider={ArticlesSortedByCategory.length <= i + 3}
                    categoryTitle={section.categoryTitle}
                    articles={section.articles}
                  />
                ) : (
                  <React.Fragment key={i} />
                )
            )}
          </div>
          <div className="column is-one-third">
            {ArticlesSortedByCategory.map(
              (section: TableOfContentsSection, i: number) =>
                i % NUM_COLUMNS === 2 ? (
                  <TableOfContentsSection
                    key={i}
                    noDivider={ArticlesSortedByCategory.length <= i + 3}
                    categoryTitle={section.categoryTitle}
                    articles={section.articles}
                  />
                ) : (
                  <React.Fragment key={i} />
                )
            )}
          </div>
        </div>
      </div>

      <div className="column" />
    </div>
  );
};

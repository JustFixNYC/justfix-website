import React from "react";
import { LearningArticleFooter } from "./article-footer";
import Layout from "../layout";
import { Link as ScrollLink } from "react-scroll";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import "../../styles/learn.scss";
import { AllToolsCta } from "./all-tools-cta";
import { Trans } from "@lingui/macro";
import { LocaleLink } from "../locale-link";
import { useCurrentLocale } from "../../util/use-locale";
import Img from "gatsby-image/withIEPolyfill";

const widont = require("widont");

type Props = {
  pageContext: {
    learningCenterTitle: string;
    content: any;
    articleFooter: any;
    allToolsCta: any;
  };
};

type navMenuProps = {
  styleClass?: string;
};

function makeSectionID(index: number): string {
  return "section-" + (index + 1).toString();
}

function renderSection(articleSection: any, i: number): JSX.Element {
  return (
    <div key={i} id={makeSectionID(i)} className="article-section">
      {articleSection.__typename === "ContentfulLearningArticleCtaBlock" ? (
        <div className="content cta-wrapper">
          <div className="cta is-horizontal-center has-text-centered has-background-white">
            <div className="label is-block">
              <small className="has-text-primary has-text-weight-bold has-background-white is-uppercase">
                <Trans> Want to take action? </Trans>
              </small>
            </div>
            <h1 className="title is-size-4 has-text-weight-bold has-text-primary is-spaced">
              {widont(articleSection.title)}
            </h1>
            {articleSection.subtitle && (
              <p className="is-hidden-mobile has-text-weight-medium has-text-primary is-spaced">
                {articleSection.subtitle}
              </p>
            )}
            <a
              href={articleSection.ctaLink}
              className="button is-medium is-primary is-uppercase "
              target="_blank"
              rel="noopener noreferrer"
            >
              {articleSection.ctaText}
            </a>
          </div>
          {articleSection.secondaryCta && (
            <div className="secondary-cta is-horizontal-center has-text-centered has-background-white">
              {articleSection.secondaryCta.subtitle && (
                <p className="is-size-7 is-marginless has-text-weight-medium has-text-primary is-spaced">
                  {widont(articleSection.secondaryCta.subtitle)}
                </p>
              )}
              <a
                href={articleSection.secondaryCta.ctaLink}
                className="is-size-7 is-uppercase"
                target="_blank"
                rel="noopener noreferrer"
              >
                <u>{articleSection.secondaryCta.ctaText}</u>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="content">
          <h1 className="title is-size-3 is-size-4-mobile has-text-grey-dark has-text-weight-semibold is-spaced">
            {widont(articleSection.title)}
          </h1>
          <span className="has-text-grey-dark">
            {documentToReactComponents(articleSection.content.json)}
          </span>
        </div>
      )}
      <ScrollLink
        to="navmenu"
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        className="back-to-top is-uppercase is-hidden-desktop is-size-7 has-text-weight-semibold has-letters-spaced"
      >
        <Trans>Back to top</Trans> ↑
      </ScrollLink>
    </div>
  );
}

const LearningArticle = (props: Props) => {
  const content = props.pageContext.content;
  const locale = useCurrentLocale();

  const NavMenu = (props?: navMenuProps) => (
    <aside
      id="navmenu"
      className={"menu " + ((props && props.styleClass) || "")}
    >
      <p className="menu-label">
        <Trans>Sections</Trans>
      </p>
      <ul className="menu-list">
        {content.articleSections.map((articleSection: any, i: number) =>
          articleSection.__typename === "ContentfulLearningArticleSection" ? (
            <li key={i}>
              <ScrollLink
                activeClass="bold-shadow"
                to={makeSectionID(i)}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="has-text-primary"
              >
                {articleSection.title}
              </ScrollLink>
            </li>
          ) : (
            <React.Fragment key={i} />
          )
        )}
      </ul>
    </aside>
  );

  return (
    <Layout metadata={content.metadata}>
      <div className="article-page">
        <div className="columns is-desktop">
          <div className="column" />
          <div className="column is-half-desktop">
            <div className="hero">
              <div className="hero-body">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <LocaleLink to="/learn/">
                        {props.pageContext.learningCenterTitle}
                      </LocaleLink>
                    </li>
                    <li>
                      <LocaleLink
                        to={
                          "/learn/category/" + content.categories[0].slug + "/"
                        }
                      >
                        {content.categories[0].title}
                      </LocaleLink>
                    </li>
                  </ul>
                </nav>
                <div className="container content-wrapper">
                  {content.coverPhoto && (
                    <div className="container">
                      <figure className="image is-horizontal-center">
                        <Img
                          fluid={content.coverPhoto.fluid}
                          alt={content.title}
                        />
                      </figure>
                      <br />
                    </div>
                  )}
                  {locale === "es" && content.englishOnly && (
                    <p className="has-text-danger is-italic">Solo en inglés</p>
                  )}
                  <h1 className="title is-size-2 is-size-3-mobile has-text-grey-dark has-text-weight-semibold is-spaced">
                    {widont(content.title)}
                  </h1>
                  <p className="subtitle is-size-6 has-text-grey-dark">
                    <span className="is-size-6">
                      <Trans>Written by</Trans> {content.author}
                    </span>
                    <br />
                    <span className="is-size-7 is-uppercase">
                      <Trans>Updated</Trans> {content.dateUpdated}
                    </span>
                  </p>
                  {content.subtitle && (
                    <div className="content is-size-6 has-text-grey-dark">
                      {documentToReactComponents(content.subtitle.json)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
        </div>
        <div className="columns is-desktop">
          <div className="column">
            <NavMenu styleClass="is-hidden-desktop" />
          </div>
          <div className="column is-half-desktop">
            <div className="hero-body">
              <div className="container content-wrapper">
                {content.articleSections.map(
                  (articleSection: any, i: number) => {
                    const includeDivider =
                      i > 0 &&
                      content.articleSections[i].__typename ===
                        "ContentfulLearningArticleSection" &&
                      content.articleSections[i - 1].__typename ===
                        "ContentfulLearningArticleSection";
                    return (
                      <div key={i}>
                        {includeDivider && (
                          <div className="is-divider light is-hidden-touch" />
                        )}
                        {renderSection(articleSection, i)}
                      </div>
                    );
                  }
                )}
                <AllToolsCta content={props.pageContext.allToolsCta} />
                <br />
              </div>
            </div>
          </div>
          <div className="column">
            <NavMenu styleClass="sticky is-hidden-touch" />
          </div>
        </div>
        <LearningArticleFooter content={props.pageContext.articleFooter} />
      </div>
    </Layout>
  );
};

export default LearningArticle;

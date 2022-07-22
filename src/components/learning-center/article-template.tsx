import React from "react";
import Layout from "../layout";
import { Link as ScrollLink } from "react-scroll";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import "../../styles/learn.scss";
import { Trans } from "@lingui/macro";
import { useCurrentLocale } from "../../util/use-locale";
import { EmbeddedAsset } from "../embedded-asset-node";
import { BLOCKS } from "@contentful/rich-text-types";
import { LocaleLink } from "../locale-link";
import ResponsiveElement from "../responsive-element";
import classnames from "classnames";

const widont = require("widont");

type Props = {
  pageContext: {
    learningCenterTitle: string;
    content: any;
  };
};

type navMenuProps = {
  styleClass?: string;
};

function makeSectionID(index: number): string {
  return "section-" + (index + 1).toString();
}

function renderSection(articleSection: any, i: number): JSX.Element {
  const locale = useCurrentLocale();
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
        <div>
          <h3 className="my-6 my-5-mobile">{widont(articleSection.title)}</h3>
          {documentToReactComponents(articleSection.content.json, {
            renderNode: {
              [BLOCKS.PARAGRAPH]: (node, children) => (
                <p className="title is-4">{children}</p>
              ),
              [BLOCKS.EMBEDDED_ASSET]: (eaNode) => (
                <p className="my-6">
                  <EmbeddedAsset node={eaNode} locale={locale} />
                </p>
              ),
              [BLOCKS.UL_LIST]: (node, children) => (
                <ul className="ml-8 mb-6">{children}</ul>
              ),
              [BLOCKS.QUOTE]: (node, children) => (
                <div className="columns is-paddingless">
                  <div className="column has-background-light my-6 p-5">
                    {children}
                  </div>
                </div>
              ),
            },
          })}
        </div>
      )}
    </div>
  );
}

const LearningArticle = (props: Props) => {
  const content = props.pageContext.content;

  const NavMenu = (props?: navMenuProps) => (
    <aside
      id="navmenu"
      className={classnames("menu", props && props.styleClass)}
    >
      <p className="p-4 is-uppercase has-text-weight-bold">
        <Trans>Contents</Trans>
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
                className="p-4 has-text-black no-underline"
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
      <div className="jf-article-page">
        <div className="columns is-centered">
          <div className="column is-8 pt-12 pt-7-mobile">
            <nav className="breadcrumb is-marginless" aria-label="breadcrumbs">
              <ul>
                <li>
                  <LocaleLink
                    to="/learn/"
                    className="eyebrow is-large has-text-black no-underline"
                  >
                    <Trans>Learning Center</Trans>
                  </LocaleLink>
                </li>
                {/* Note: we need to add the eyebrow css class to the <li> 
                    component to style the "/" separator */}
                <li className="eyebrow is-large">
                  <LocaleLink
                    to={"/learn/category/" + content.categories[0].slug + "/"}
                    className="eyebrow is-large has-text-black no-underline"
                  >
                    {content.categories[0].title}
                  </LocaleLink>
                </li>
              </ul>
            </nav>

            <ResponsiveElement
              desktop="h2"
              touch="h1"
              className="mt-2 mb-6 my-5-mobile"
            >
              {content.title}
            </ResponsiveElement>

            <div className="eyebrow is-small mb-6 mb-5-mobile">
              <Trans>Published</Trans> {content.dateUpdated}
            </div>

            <p className="has-text-dark mb-6 mb-8-mobile">
              {content.author || (
                <Trans>
                  This article was written by the team of NYC-based housing
                  experts at nonprofit JustFix
                </Trans>
              )}
            </p>

            <div className="columns is-paddingless has-background-light">
              <div className="column is-6 p-5">
                <h4>
                  <Trans>Summary</Trans>
                </h4>
                <p>{content.summary}</p>
              </div>
              <div className="column is-6 p-5">
                <h4>
                  <Trans>What can I do?</Trans>
                </h4>
                <p>{documentToReactComponents(content.whatCanIDo.json)}</p>
              </div>
            </div>

            <div className="title is-4 mt-7">
              {documentToReactComponents(content.subtitle.json, {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (node, children) => (
                    <p className="title is-4">{children}</p>
                  ),
                },
              })}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <NavMenu styleClass="is-hidden-desktop" />
          </div>
          <div className="column is-8">
            {content.articleSections.map((articleSection: any, i: number) => (
              <div key={i}>{renderSection(articleSection, i)}</div>
            ))}
          </div>
          <div className="column">
            <NavMenu styleClass="sticky is-hidden-touch" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningArticle;

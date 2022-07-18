import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import { Link } from 'gatsby'

import "../styles/press.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import PageHero from "../components/page-hero";
import { ReadMoreLink } from "../components/read-more";
import localeConfig from "../util/locale-config.json";
import { useCurrentLocale } from "../util/use-locale";
import classnames from "classnames";
import { Trans } from "@lingui/macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { OutboundLink } from "../util/links";

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const PressPageScaffolding = (props: ContentfulContent) => {
  const locale = useCurrentLocale();

  return (
    <Layout metadata={props.content.metadata}>
      <div id="press" className="press-page">
        <PageHero {...props.content.pageHero} />

        <div className="columns is-centered is-multiline pt-7">
          {props.content.pressItems.map((press: any, i: number) => (
            <div className="column is-8 pt-0" key={i}>
              {i > 0 &&
                !press.isFeaturedArticle &&
                !props.content.pressItems[i - 1].isFeaturedArticle && (
                  <div className="is-divider mt-3 mb-10" />
                )}
              <div
                className={classnames(
                  press.isFeaturedArticle &&
                    "has-background-warning mt-4 py-7 px-6"
                )}
              >
                {press.isFeaturedArticle && (
                  <div className="eyebrow is-large mb-6">
                    <Trans>Featured press</Trans>
                  </div>
                )}
                <div className="media is-align-items-center mt-7 mb-6">
                  <figure className="media-left image is-48x48">
                    <Img
                      fluid={press.logo.fluid}
                      className="is-rounded img-centered"
                      alt={press.title}
                    />
                  </figure>
                  <div className="title is-3">{press.title}</div>
                </div>
                <h2 className="mb-6">{press.linkText}</h2>
                {!press.isFeaturedArticle && (
                  <div className="eyebrow is-large mb-6">
                    {formatDate(press.publicationDate, locale)}
                  </div>
                )}
                <ReadMoreLink url={press.hyperlink} />
              </div>
            </div>
          ))}
          <div className="column is-8 has-background-black has-text-white py-10 px-7 mt-6 mb-12 mx-5-mobile">
            {documentToReactComponents(
              props.content.pressInquiryBanner.content.json
            )}
            <br />
            <OutboundLink
              href={props.content.pressInquiryBanner.button.link}
              className="button is-primary mt-5"
            >
              {props.content.pressInquiryBanner.button.title}
            </OutboundLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const PressPageFragment = graphql`
  fragment PressPage on Query {
    contentfulPressPage(node_locale: { eq: $locale }) {
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
      pageHero {
        pageName
        description
        onThisPageList
      }
      pressItems {
        title
        hyperlink
        publicationDate
        isFeaturedArticle
        logo {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
        linkText
      }
      pressInquiryBanner {
        content {
          json
        }
        button {
          title
          link
        }
      }
    }
  }
`;

const PressPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...PressPage
      }
    `}
    render={(data) => (
      <PressPageScaffolding content={data.contentfulPressPage} />
    )}
  />
);

export default PressPage;

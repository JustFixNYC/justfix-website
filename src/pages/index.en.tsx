import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Img from "gatsby-image/withIEPolyfill";

import "../styles/index.scss";

import Layout from "../components/layout";

import { linkIsSms, OutboundLink } from "../util/links";
import { Trans } from "@lingui/macro";
import { LocaleLink as Link } from "../components/locale-link";
import { ReadMoreLink } from "../components/read-more";
import classnames from "classnames";
import ResponsiveElement from "../components/responsive-element";

const PRODUCT_CTA_UTM_CODE = "?utm_source=orgsite&utm_medium=productcta";

export type ContentfulContent = {
  content: any;
};

type ProductCardInfo = {
  productName: string;
  title: string;
  descriptionText: {
    json: any;
  };
  location: string;
  language: string[];
  button: {
    title: string;
    link: string;
  };
  smsText?: string;
  /**
   * Whether or not the product card will use condensed spacing styling
   */
  isCondensed?: boolean;
};

const Dot = () => <span className="mx-3">·</span>;

const formatPhoneNumber = (phone: string): string | null => {
  const match = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) return null;
  return `(${match[1]}) ${match[2]}-${match[3]}`;
};

export const ProductCard: React.FC<ProductCardInfo> = (props) => {
  const { link } = props.button;
  const isSmsTool = linkIsSms(link);
  const toolLink = link + (isSmsTool ? "" : PRODUCT_CTA_UTM_CODE);
  const phoneNumber = isSmsTool
    ? formatPhoneNumber(link.substring(6, 16))
    : null;

  return (
    <div
      className={classnames(
        "column is-4 is-12-touch",
        props.isCondensed && "pl-0 pr-6 px-0-touch"
      )}
    >
      <div
        className={classnames(
          "jf-card has-background-white",
          props.isCondensed ? "p-6" : "p-8 p-6-touch"
        )}
      >
        <div className="eyebrow is-small mb-5 mb-4-touch">
          {props.productName}
        </div>
        <h3 className="has-text-weight-semibold mb-6 mb-3-touch">
          {props.title}
        </h3>
        <div className="title is-4 mb-6 mb-5-touch">
          {documentToReactComponents(props.descriptionText.json)}
        </div>
        <div className="mt-auto">
          <div className="has-text-dark	is-uppercase has-text-weight-bold is-size-7 mb-6">
            {props.location}
            <Dot />
            {props.language
              .map<React.ReactNode>((lang, i) => <span key={i}>{lang}</span>)
              .reduce((lang1, lang2, i) => [
                lang1,
                <Dot key={Math.random()} />,
                lang2,
              ])}
          </div>

          <OutboundLink
            href={toolLink}
            className={classnames(
              "button is-primary",
              isSmsTool && "is-hidden-tablet"
            )}
            eventProperties={{ productName: props.productName }}
          >
            {props.button.title}
          </OutboundLink>
          {isSmsTool && (
            <p className="title is-4 has-text-weight-bold is-hidden-mobile">
              Text <span className="is-uppercase">{props.smsText}</span> to{" "}
              <span>{phoneNumber}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

type ProductListInfo = {
  productSectionTitle: string;
  productSectionSubtitle: string;
  homePageProductBlocks: ProductCardInfo[];
  productIdeaBanner: {
    content: {
      json: any;
    };
    button: {
      title: string;
      link: string;
    };
  };
};

export const ProductList: React.FC<ProductListInfo> = (props) => (
  <div
    id="products"
    className="has-background-link has-text-black pb-12 pb-6-touch"
  >
    <div className="columns is-multiline">
      <div className="column is-12 pt-10 pt-7-touch pb-9 pb-0-touch">
        <h1>{props.productSectionTitle}</h1>
      </div>
      {props.homePageProductBlocks.map((product: any, i: number) => (
        <ProductCard {...product} key={i} />
      ))}
      <div className="column is-4 is-12-touch">
        <div className="jf-card has-background-black has-text-white p-8 p-6-touch">
          <div className="mb-6 mb-9-touch">
            {documentToReactComponents(props.productIdeaBanner.content.json)}
          </div>

          <OutboundLink
            href={props.productIdeaBanner.button.link}
            className="button is-primary mt-auto"
          >
            {props.productIdeaBanner.button.title}
          </OutboundLink>
        </div>
      </div>
    </div>
  </div>
);

export const LandingPageScaffolding = (props: ContentfulContent) => (
  <Layout isLandingPage={true}>
    <div id="home" className="home-page">
      <div className="jf-landing-img-small">
        <Img fluid={props.content.landingPageImageMobile.fluid} alt="" />
      </div>
      <div className="jf-landing-img-large">
        <Img fluid={props.content.landingImage.fluid} alt="" />
      </div>
      <div className="has-background-black has-text-white">
        <div className="columns">
          <div className="column is-12 pt-9 py-8-touch">
            <h1 className="is-inline-tablet">
              {props.content.whoWeAreSection}
            </h1>
            <Link
              to={props.content.whoWeAreButton.link}
              className="button is-primary is-inline-block-tablet mt-5 mb-10 mb-7-touch ml-5 ml-0-mobile"
            >
              {props.content.whoWeAreButton.title}
            </Link>
          </div>
        </div>
      </div>

      <ProductList {...props.content} />

      <div className="jf-learning-center-preview mb-12 mb-0-touch">
        <div className="columns">
          <div className="column is-12 pt-10 pt-7-touch pb-9 pb-5-touch">
            <h1>{props.content.learningCenterPreviewTitle}</h1>
            <h3 className="mt-2">
              {props.content.learningCenterPreviewSubtitle}
            </h3>
            <div className="has-background-warning mt-9">
              <div className="columns is-desktop is-marginless is-paddingless">
                <div className="column jf-lc-featured is-marginless is-6 is-12-touch p-9">
                  <div className="eyebrow is-large mb-5 mb-4-touch">
                    <Trans>Featured article</Trans>
                  </div>
                  <Link
                    to={`/learn/${props.content.learningCenterPreviewArticles[0].slug}`}
                    className="jf-link-article"
                  >
                    <ResponsiveElement
                      tagNames={{ desktop: "h2", touch: "h3" }}
                      className="has-text-weight-semibold mb-6"
                    >
                      {props.content.learningCenterPreviewArticles[0].title}
                    </ResponsiveElement>
                  </Link>
                  <div className="eyebrow is-large mb-4">
                    <Trans>Updated</Trans>{" "}
                    {props.content.learningCenterPreviewArticles[0].dateUpdated}
                  </div>
                  <p className="title is-4">
                    {
                      props.content.learningCenterPreviewArticles[0].metadata
                        .description
                    }
                  </p>
                  <ReadMoreLink
                    url={`/learn/${props.content.learningCenterPreviewArticles[0].slug}`}
                  />
                </div>
                <div className="column is-marginless is-paddingless is-6 is-12-touch">
                  <div className="columns is-marginless is-paddingless is-multiline">
                    <div className="column is-marginless is-12 py-6 px-9">
                      <Link
                        to={`/learn/${props.content.learningCenterPreviewArticles[1].slug}`}
                        className="jf-link-article"
                      >
                        <h3 className="has-text-weight-semibold mb-4">
                          {props.content.learningCenterPreviewArticles[1].title}
                        </h3>
                      </Link>
                      <div className="eyebrow is-large mb-4">
                        <Trans>Updated</Trans>{" "}
                        {
                          props.content.learningCenterPreviewArticles[1]
                            .dateUpdated
                        }
                      </div>
                      <ReadMoreLink
                        url={`/learn/${props.content.learningCenterPreviewArticles[1].slug}`}
                      />
                    </div>
                    <div className="column is-marginless is-12 py-6 px-9">
                      <Link
                        to={`/learn/${props.content.learningCenterPreviewArticles[2].slug}`}
                        className="jf-link-article"
                      >
                        <h3 className="mb-4">
                          {props.content.learningCenterPreviewArticles[2].title}
                        </h3>
                      </Link>
                      <div className="eyebrow is-large mb-4">
                        <Trans>Updated</Trans>{" "}
                        {
                          props.content.learningCenterPreviewArticles[2]
                            .dateUpdated
                        }
                      </div>
                      <ReadMoreLink
                        url={`/learn/${props.content.learningCenterPreviewArticles[2].slug}`}
                      />
                    </div>
                    <div className="column is-marginless is-12 py-8 px-9">
                      <Link to="/learn" className="button is-primary">
                        <Trans>See all articles</Trans>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 mb-9-touch">
        <div className="columns is-multiline">
          <div className="column is-6 is-12-touch is-flex is-flex-direction-column">
            <h1 className="mb-6">{props.content.partnershipsSectionTitle}</h1>
            <div className="has-background-success p-8 p-6-touch is-flex-grow-1 is-flex is-flex-direction-column">
              <ResponsiveElement
                tagNames={{ desktop: "h2", touch: "h3" }}
                className="py-5 pt-0-touch mb-8"
              >
                {props.content.partnershipsSectionSubtitle}
              </ResponsiveElement>
              <Link
                to={props.content.partnershipsSectionButton.link}
                className="button is-primary mb-5 mb-4-touch is-align-self-flex-start"
              >
                {props.content.partnershipsSectionButton.title}
              </Link>
            </div>
          </div>
          <div className="column is-6 is-12-touch is-flex is-flex-direction-column">
            <h1 className="mb-6">{props.content.policySectionTitle}</h1>
            <div className="has-background-link p-8 p-6-touch is-flex-grow-1 is-flex is-flex-direction-column">
              <ResponsiveElement
                tagNames={{ desktop: "h2", touch: "h3" }}
                className="py-5 pt-0-touch mb-8"
              >
                {props.content.policySectionSubtitle}
              </ResponsiveElement>
              <Link
                to={props.content.policySectionButton.link}
                className="button is-primary mb-5 mb-4-touch is-align-self-flex-start"
              >
                {props.content.policySectionButton.title}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="columns has-background-info">
        <div className="column is-12 pt-9 pt-6-touch pb-12 pb-9-touch">
          <h1 className="is-inline-tablet">
            {props.content.outroSectionTitle}
          </h1>
          <Link
            to={props.content.outroSectionButton.link}
            className="button is-primary mt-5 ml-5 ml-0-mobile"
          >
            {props.content.outroSectionButton.title}
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export const LandingPageFragment = graphql`
  fragment LandingPage on Query {
    contentfulHomePage(node_locale: { eq: $locale }) {
      landingLeadInText
      landingImage {
        fluid(quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      landingPageImageMobile {
        fluid(quality: 100) {
          ...GatsbyContentfulFluid
        }
      }
      whoWeAreSection
      whoWeAreButton {
        title
        link
      }
      productSectionTitle
      homePageProductBlocks {
        productName
        title
        descriptionText {
          json
        }
        button {
          title
          link
        }
        smsText
        location
        language
      }
      productIdeaBanner {
        content {
          json
        }
        button {
          title
          link
        }
      }
      learningCenterPreviewTitle
      learningCenterPreviewSubtitle
      learningCenterPreviewArticles {
        title
        dateUpdated
        metadata {
          description
        }
        slug
      }
      partnershipsSectionTitle
      partnershipsSectionSubtitle
      partnershipsSectionButton {
        title
        link
      }
      policySectionTitle
      policySectionSubtitle
      policySectionButton {
        title
        link
      }
      outroSectionTitle
      outroSectionButton {
        title
        link
      }
    }
  }
`;

const LandingPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...LandingPage
      }
    `}
    render={(data) => (
      <LandingPageScaffolding content={data.contentfulHomePage} />
    )}
  />
);

export default LandingPage;

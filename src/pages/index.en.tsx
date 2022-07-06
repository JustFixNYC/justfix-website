import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Img from "gatsby-image/withIEPolyfill";
// import { Link } from 'gatsby'

import "../styles/index.scss";
import "../styles/data-driven-onboarding.scss";

import Layout from "../components/layout";
import { Link } from "@reach/router";
import { OutboundLink } from "gatsby-plugin-google-analytics";
const PRODUCT_CTA_UTM_CODE = "?utm_source=orgsite&utm_medium=productcta";

export type ContentfulContent = {
  content: any;
};

// const linkIsSms = (link: string) => link.slice(0, 4) === "sms:";

const ResponsiveSectionDivider = () => (
  <>
    <section className="columns is-centered is-hidden-mobile">
      <div className="column is-four-fifths">
        <div className="is-divider" />
      </div>
    </section>
    <div className="is-divider is-hidden-tablet" />
  </>
);

const shuffleArray = (array: any[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export const LandingPageScaffolding = (props: ContentfulContent) => (
  <Layout isLandingPage={true}>
    <div id="home" className="home-page">
      <div className="columns my-8-mobile mt-12 mb-11">
        <div className="column is-1" />
        <div className="column is-10">
          <h1>{props.content.landingLeadInText}</h1>
        </div>
      </div>

      <div className="columns is-desktop is-centered">
        <div className="column is-11 is-12-mobile">
          <Img fluid={props.content.landingImage.fluid} alt="" />
        </div>
      </div>

      <div className="columns has-background-black has-text-white">
        <div className="column is-12 pt-10 pt-8-mobile pb-12 pb-9-mobile">
          <h1>
            {props.content.whoWeAreSection}
            <Link
              to={props.content.whoWeAreButton.link}
              className="button is-primary is-inline-block mt-2 ml-4 is-hidden-touch"
            >
              {props.content.whoWeAreButton.title}
            </Link>
          </h1>
          <Link
            to={props.content.whoWeAreButton.link}
            className="button is-primary mt-7 is-hidden-desktop"
          >
            {props.content.whoWeAreButton.title}
          </Link>
        </div>
      </div>

      <div
        id="products"
        className="columns is-multiline has-background-link has-text-black pb-12 pb-6-mobile"
      >
        <div className="column is-12 pt-10 pt-7-mobile pb-9">
          <h1 className="is-hidden-touch">
            {props.content.productSectionTitle}
          </h1>
          <h2 className="is-hidden-desktop">
            {props.content.productSectionTitle}
          </h2>
          <h3 className="mt-2">{props.content.productSectionSubtitle}</h3>
        </div>
        {shuffleArray(props.content.homePageProductBlocks).map(
          (product: any, i: number) => (
            <div className="column is-4 is-12-mobile">
              <div className="jf-card has-background-white p-8 p-6-mobile">
                <div className="eyebrow is-small mb-5 mb-4-mobile">
                  {product.productName}
                </div>
                <h3 className="mb-6 mb-5-mobile">{product.title}</h3>
                <div className="mb-6 mb-3-mobile">
                  {documentToReactComponents(product.descriptionText.json)}
                </div>
                <div className="mt-auto">
                  <div className="mb-6">
                    {product.location} · {product.language.join(" · ")}
                  </div>

                  <OutboundLink
                    href={product.button.link + PRODUCT_CTA_UTM_CODE}
                    className="button is-primary mb-6 mb-4-mobile"
                  >
                    {product.button.title}
                  </OutboundLink>
                </div>
              </div>
            </div>
          )
        )}
        <div className="column is-4 is-12-mobile">
          <div className="jf-card has-background-black has-text-white p-8 p-6-mobile">
            <h3 className="mb-6 mb-5-mobile">
              {documentToReactComponents(
                props.content.productIdeaBanner.content.json
              )}
            </h3>

            <OutboundLink
              href={props.content.productIdeaBanner.button.link}
              className="button is-primary mb-6 mb-4-mobile mt-auto"
            >
              {props.content.productIdeaBanner.button.title}
            </OutboundLink>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-12 pt-10 pt-7-mobile pb-9">
          <h1 className="is-hidden-touch">
            {props.content.learningCenterPreviewTitle}
          </h1>
          <h2 className="is-hidden-desktop">
            {props.content.learningCenterPreviewTitle}
          </h2>
          <h3 className="mt-2">
            {props.content.learningCenterPreviewSubtitle}
          </h3>
        </div>
      </div>

      <ResponsiveSectionDivider />
    </div>
  </Layout>
);

export const LandingPageFragment = graphql`
  fragment LandingPage on Query {
    contentfulHomePage(node_locale: { eq: $locale }) {
      landingLeadInText
      landingImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      whoWeAreSection
      whoWeAreButton {
        title
        link
      }
      productSectionTitle
      productSectionSubtitle
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
        location
        language
        screenshot {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
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
      outroSectionBodyText {
        json
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

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Img from "gatsby-image/withIEPolyfill";
// import { Link } from 'gatsby'

import "../styles/index.scss";
import "../styles/data-driven-onboarding.scss";

import Layout from "../components/layout";
import { DDOSearchBar } from "../components/ddo-searchbar";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { Link } from "@reach/router";
const PRODUCT_CTA_UTM_CODE = "?utm_source=orgsite&utm_medium=productcta";

export type ContentfulContent = {
  content: any;
};

const linkIsSms = (link: string) => link.slice(0, 4) === "sms:";

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

      <section id="products" className="is-horizontal-center">
        <div className="content-wrapper">
          <div className="hero is-small">
            <div className="hero-body has-text-centered">
              <div className="container content-wrapper tight">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal">
                  {props.content.productSectionTitle}
                </h1>
              </div>
            </div>
          </div>

          {props.content.homePageProductBlocks.map(
            (product: any, i: number) => (
              <div className="product" key={i}>
                <div className="columns is-tablet is-vcentered is-hidden-mobile">
                  {i % 2 === 1 && (
                    <div className="column">
                      <div className="container">
                        <figure className="image is-horizontal-center">
                          <Img fluid={product.screenshot.fluid} alt="" />
                        </figure>
                      </div>
                    </div>
                  )}
                  <div className="column">
                    <div className="container">
                      <h3 className="title has-text-grey-dark has-text-weight-medium">
                        {product.title}
                      </h3>
                      <br />
                      <p className="subtitle">
                        {documentToReactComponents(
                          product.descriptionText.json
                        )}
                      </p>
                      <br />
                      {product.button !== null &&
                        (linkIsSms(product.button.link) ? (
                          <p className="subtitle is-uppercase has-text-weight-bold">
                            {product.button.title}
                          </p>
                        ) : (
                          <a
                            className="button is-large is-primary is-uppercase"
                            href={product.button.link + PRODUCT_CTA_UTM_CODE}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {product.button.title}
                          </a>
                        ))}
                    </div>
                  </div>
                  {i % 2 === 0 && (
                    <div className="column">
                      <div className="container">
                        <figure className="image is-horizontal-center">
                          <Img fluid={product.screenshot.fluid} alt="" />
                        </figure>
                      </div>
                    </div>
                  )}
                </div>

                <div className="columns is-vcentered is-hidden-tablet">
                  <div className="column">
                    <div className="container">
                      <figure className="image is-horizontal-center">
                        <Img fluid={product.screenshot.fluid} alt="" />
                      </figure>
                    </div>
                  </div>
                  <div className="column">
                    <div className="container has-text-centered">
                      <h3 className="title has-text-grey-dark has-text-weight-medium">
                        {product.title}
                      </h3>
                      <br />
                      <p className="subtitle">
                        {documentToReactComponents(
                          product.descriptionText.json
                        )}
                      </p>
                      <br />
                      {product.button !== null && (
                        <a
                          className="button is-medium is-primary"
                          href={
                            product.button.link +
                            (linkIsSms(product.button.link)
                              ? ""
                              : PRODUCT_CTA_UTM_CODE)
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="is-size-6 is-uppercase">
                            {product.button.title}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

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

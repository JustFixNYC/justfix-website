import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
// import { Link } from 'gatsby'

import "../styles/press.scss";

import Layout from "../components/layout";
import ReadMore from "../components/read-more";
import { ContentfulContent } from "./index.en";

export const PressPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata}>
    <div id="press" className="press-page">
      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="press-links content-wrapper">
        {props.content.pressItems.map((pressItem: any, i: number) => (
          <article className="media" key={i}>
            <div className="media-left is-hidden-mobile">
              <figure className="image is-horizontal-center">
                <a
                  href={pressItem.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="img-centered"
                    src={pressItem.logo.file.url}
                    alt=""
                  />
                </a>
              </figure>
            </div>

            <div className="media-content">
              <h4 className="is-size-5 has-text-weight-semibold is-uppercase">
                {pressItem.title}
              </h4>
              <p className="is-size-5 has-text-primary">
                <a
                  href={pressItem.hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pressItem.linkText}
                </a>
              </p>
            </div>
          </article>
        ))}
      </section>

      <ReadMore
        title={props.content.readMore.title}
        link={props.content.readMore.link}
      />
    </div>
  </Layout>
);

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
      title
      pressItems {
        title
        hyperlink
        linkText
        logo {
          file {
            url
          }
        }
      }
      readMore {
        title
        link
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

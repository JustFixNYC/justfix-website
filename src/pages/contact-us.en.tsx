import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { SocialIcon } from "react-social-icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import "../styles/contact.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import Subscribe from "../components/subscribe";

export const ContactPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata} locale={props.locale}>
    <div id="contact" className="contact-page">
      <section className="hero is-medium">
        <div className="hero-body has-text-centered is-horizontal-center content-wrapper">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.pageTitle}
            </h1>
            <span className="is-size-5 has-text-grey-dark">
              {documentToReactComponents(props.content.contactCta.json)}
            </span>

            <div className="field">
              {props.content.socialButtons.map((button: any, i: number) => (
                <SocialIcon
                  key={i}
                  url={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  bgColor="#0096D7"
                  style={{ height: 40, width: 40 }}
                />
              ))}
            </div>

            <h1 className="title is-size-4 has-text-grey-dark is-spaced ">
              {props.content.mailingListTitle}
            </h1>
            <span className="subtitle has-text-grey-dark">
              {props.content.mailingListSubtitle}
            </span>
            <Subscribe location="page" />
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export const ContactPageFragment = graphql`
  fragment ContactPage on Query {
    contentfulContactPage(node_locale: { eq: $locale }) {
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
      pageTitle
      contactCta {
        json
      }
      socialButtons {
        title
        url
      }
      mailingListTitle
      mailingListSubtitle
    }
  }
`;

const ContactPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...ContactPage
      }
    `}
    render={(data) => (
      <ContactPageScaffolding
        content={data.contentfulContactPage}
        locale="en"
      />
    )}
  />
);

export default ContactPage;

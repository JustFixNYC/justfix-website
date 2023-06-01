import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { SocialIcon } from "react-social-icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import Subscribe from "../components/subscribe";
import { OutboundLink } from "../util/links";

export const ContactPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata}>
    <div id="contact" className="contact-page">
      <div className="columns is-centered">
        <div className="column is-12 py-11">
          <h1>{props.content.pageTitle}</h1>
          <div className="mt-5 mb-8">
            <span className="title is-3">
              {documentToReactComponents(props.content.contactCta.json)}
            </span>
          </div>

          <div className="field">
            {props.content.socialButtons.map((button: any, i: number) => (
              <SocialIcon
                key={i}
                url={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3 mb-3"
                style={{ height: 40, width: 40 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="columns is-centered has-background-black has-text-white">
        <div className="column is-12 py-11">
          <h1>{props.content.donateTitle}</h1>
          <div className="mt-5 mb-8">
            <span className="title is-3 has-text-white">
              {documentToReactComponents(props.content.donateCta.json)}
            </span>
          </div>
          <OutboundLink
            href={props.content.donateButton.link}
            className="button is-primary"
          >
            {props.content.donateButton.title}
          </OutboundLink>
        </div>
      </div>
      <div className="columns is-centered has-background-info">
        <div className="column is-12 py-11">
          <h1 id="mailing-list">{props.content.mailingListTitle}</h1>
          <div className="mt-5 mb-9">
            <span className="title is-3">
              <p>{props.content.mailingListSubtitle}</p>
            </span>
          </div>
          <Subscribe location="page" />
        </div>
      </div>
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
      donateTitle
      donateCta {
        json
      }
      donateButton {
        title
        link
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
      <ContactPageScaffolding content={data.contentfulContactPage} />
    )}
  />
);

export default ContactPage;

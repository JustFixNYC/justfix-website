import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/mission.scss";

import Layout from "../components/layout";
import ReadMore from "../components/read-more";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";
import { CollaborationBanner } from "../components/collaboration-banner";

export const MissionPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata}>
    <div id="mission" className="mission-page">
      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
            <h6 className="subtitle has-text-grey-dark is-italic">
              {props.content.briefDescription}
            </h6>
          </div>
        </div>
      </section>

      <section className="content-wrapper video tight">
        <figure className="image is-16by9">
          <iframe
            className="has-ratio"
            allowFullScreen={true}
            src={props.content.videoUrl}
          />
        </figure>
      </section>

      <section className="hero problem is-medium">
        <div className="hero-body is-horizontal-center">
          <div className="content has-text-grey-dark">
            {documentToReactComponents(props.content.serveSection.json)}
            <div className="cta has-text-centered has-background-primary">
              <h1 className="title is-size-4 has-text-white has-text-weight-bold is-spaced">
                {props.content.impactTitle}
              </h1>
              <span className="subtitle has-text-white has-text-weight-medium">
                {props.content.impactSubtitle}
              </span>
              <br />
              <div className="columns is-multiline">
                {props.content.impactReportButtons.map(
                  (button: any, i: number) => (
                    <div className="column is-half">
                      <a
                        href={button.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="button is-medium is-primary is-inverted is-outlined"
                      >
                        <span className="is-size-6-mobile is-uppercase">
                          {button.title}
                        </span>
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
            {documentToReactComponents(props.content.approachSection.json)}
          </div>
        </div>
      </section>

      <CollaborationBanner
        title={props.content.collaborationBanner.title}
        subtitle={props.content.collaborationBanner.description.description}
      />

      <ReadMore
        title={props.content.readMore.title}
        link={props.content.readMore.link}
      />
    </div>
  </Layout>
);

export const MissionPageFragment = graphql`
  fragment MissionPage on Query {
    contentfulMissionPage(node_locale: { eq: $locale }) {
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
      briefDescription
      videoUrl
      serveSection {
        json
      }
      impactTitle
      impactSubtitle
      impactReportButtons {
        title
        link
      }
      approachSection {
        json
      }
      collaborationBanner {
        title
        description {
          description
        }
      }
      readMore {
        title
        link
      }
    }
  }
`;

const MissionPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...MissionPage
      }
    `}
    render={(data) => (
      <MissionPageScaffolding content={data.contentfulMissionPage} />
    )}
  />
);

export default MissionPage;

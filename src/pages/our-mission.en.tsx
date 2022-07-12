import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/mission.scss";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "./index.en";
import PageHero from "../components/page-hero";
import { ReadMoreLink } from "../components/read-more";
import { Accordion } from "../components/accordion";

export const MissionPageScaffolding = (props: ContentfulContent) => {
  const { content } = props;
  const latestReport = content.impactReportButtons[0];
  const pastReports = content.impactReportButtons.slice(1);

  return (
    <Layout metadata={props.content.metadata}>
      <PageHero {...props.content.pageHero} />

      <div className="columns">
        <div className="column is-4 pt-13 pb-12">
          <h2>{props.content.missionTitle}</h2>
        </div>
        <div className="column is-1" />
        <div className="column is-7 pt-13 pb-12">
          <span className="title is-3">
            {documentToReactComponents(props.content.missionContent.json)}
          </span>
        </div>
      </div>

      <div className="columns has-background-warning">
        <div className="column is-4 pt-13 pb-12">
          <h2>{props.content.visionTitle}</h2>
        </div>
        <div className="column is-1" />
        <div className="column is-7 pt-13 pb-12 jf-text-block-with-spacing">
          {documentToReactComponents(props.content.visionContent.json)}
        </div>
      </div>

      <div className="columns">
        <div className="column is-4 pt-13 pb-12">
          <h2>{props.content.impactTitle}</h2>
        </div>
        <div className="column is-1" />
        <div className="column is-7 pt-13 pb-12">
          <h3 className="mb-10">{props.content.impactSubtitle}</h3>
          <div className="columns is-paddingless">
            <div className="column is-9 has-background-black has-text-white">
              <div className="columns is-paddingless">
                <div className="column is-7">
                  <h2>{latestReport.title}</h2>
                </div>
                <div className="column is-5">
                  <h3 className="mb-3">{props.content.impactCallout}</h3>
                  <ReadMoreLink
                    url={latestReport.link}
                    customClasses="is-underlined has-text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <h3 className="mt-10 mb-7">{props.content.pastReportsSubtitle}</h3>
          <div className="columns is-paddingless is-multiline">
            {pastReports.map((report: any, i: number) => (
              <div className="column is-paddingless is-4 mb-7" key={i}>
                <h4 className="mb-3">{report.title}</h4>
                <ReadMoreLink url={report.link} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="columns has-background-info">
        <div className="column is-4 pt-13 pb-12">
          <h2>{props.content.valuesTitle}</h2>
        </div>
        <div className="column is-1" />
        <div className="column is-7 pt-13 pb-12">
          {props.content.valuesList.map((value: any, i: number) => (
            <div key={i}>
              {i > 0 && <div className="is-divider" />}
              <div className="is-hidden-mobile">
                <h3 className="mb-5">{value.title}</h3>
                <p>{value.description.description}</p>
              </div>
              <div className="is-hidden-tablet">
                <Accordion question={value.title}>
                  <p>{value.description.description}</p>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

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
      pageHero {
        pageName
        description
        onThisPageList
      }
      missionTitle
      missionContent {
        json
      }
      visionTitle
      visionContent {
        json
      }
      impactTitle
      impactSubtitle
      impactCallout
      pastReportsSubtitle
      impactReportButtons {
        title
        link
      }
      valuesTitle
      valuesList {
        title
        description {
          description
        }
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

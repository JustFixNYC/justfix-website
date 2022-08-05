import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ContentfulContent } from "./index.en";
import PageHero from "../components/page-hero";
import { ReadMoreLink } from "../components/read-more";
import { Accordion } from "../components/accordion";
import ResponsiveElement from "../components/responsive-element";

export const MissionPageScaffolding = (props: ContentfulContent) => {
  const { content } = props;
  const latestReport = content.impactReportButtons[0];
  const pastReports = content.impactReportButtons.slice(1);

  return (
    <Layout metadata={props.content.metadata}>
      <div id="our-mission" className="our-mission-page">
        <PageHero {...props.content.pageHero} />

        <div className="columns">
          <div className="column is-4 pt-13 pb-12 p-6-mobile">
            <ResponsiveElement desktop="h2" touch="h1">
              {props.content.missionTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-mobile" />
          <div className="column is-7 pt-13 pb-12 pt-0-mobile px-6-mobile pb-6-mobile">
            <span className="title is-3">
              {documentToReactComponents(props.content.missionContent.json)}
            </span>
          </div>
        </div>

        <div className="columns has-background-warning">
          <div className="column is-4 pt-13 pb-12 pt-6-mobile px-6-mobile pb-0-mobile">
            <ResponsiveElement desktop="h2" touch="h1">
              {props.content.visionTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-mobile" />
          <div className="column is-7 pt-13 pb-12 p-6-mobile jf-text-block-with-spacing">
            <ResponsiveElement desktop="h3" touch="h2">
              {props.content.visionSubtitle}
            </ResponsiveElement>
            {documentToReactComponents(props.content.visionContent.json, {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p className="title is-4">{children}</p>
                ),
              },
            })}
          </div>
        </div>

        <div className="columns">
          <div className="column is-4 pt-13 pb-12 pt-6-mobile px-6-mobile pb-0-mobile">
            <ResponsiveElement desktop="h2" touch="h1">
              {props.content.impactTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-mobile" />
          <div className="column is-7 pt-13 pb-12 p-6-mobile">
            <h3 className="mb-10 mb-6-mobile">
              {props.content.impactSubtitle}
            </h3>
            <div className="columns is-paddingless">
              <div className="column is-9 has-background-black has-text-white">
                <div className="columns is-paddingless">
                  <div className="column is-7">
                    <ResponsiveElement desktop="h2" touch="h1">
                      {latestReport.title}
                    </ResponsiveElement>
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
            <ResponsiveElement
              className="mt-10 mb-7 my-6-mobile"
              desktop="h3"
              touch="h2"
            >
              {props.content.pastReportsSubtitle}
            </ResponsiveElement>
            <div className="columns is-paddingless is-multiline">
              {pastReports.map((report: any, i: number) => (
                <div className="column is-paddingless is-4 mb-7" key={i}>
                  <ResponsiveElement className="mb-3" desktop="h4" touch="h3">
                    {report.title}
                  </ResponsiveElement>
                  <ReadMoreLink url={report.link} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="columns has-background-info">
          <div className="column is-4 pt-13 pb-12 p-6-mobile">
            <ResponsiveElement desktop="h2" touch="h1">
              {props.content.valuesTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-mobile" />
          <div className="column is-7 pt-13 pb-12 p-6-mobile">
            {props.content.valuesList.map((value: any, i: number) => (
              <div key={i}>
                {i > 0 && <div className="is-divider" />}
                <div className="is-hidden-mobile">
                  <h3 className="mb-5">{value.title}</h3>
                  <p className="title is-4">{value.description.description}</p>
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
      visionSubtitle
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

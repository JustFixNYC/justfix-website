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
import { OutboundLink } from "../util/links";

export const MissionPageScaffolding = (props: ContentfulContent) => {
  const { content } = props;
  const latestReport = content.impactReportButtons[0];
  const pastReports = content.impactReportButtons.slice(1);

  return (
    <Layout metadata={props.content.metadata}>
      <div id="our-mission" className="our-mission-page">
        <PageHero {...props.content.pageHero} />

        <div className="columns is-multiline">
          <div className="column is-4 is-12-touch py-11 p-6-touch">
            <ResponsiveElement tagNames={{ desktop: "h2", touch: "h1" }}>
              {props.content.missionTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-touch" />
          <div className="column is-7 is-12-touch py-11 pt-0-touch px-6-touch pb-6-touch">
            <span className="title is-3">
              {documentToReactComponents(props.content.missionContent.json)}
            </span>
          </div>
        </div>

        <div className="columns has-background-warning is-multiline">
          <div className="column is-4 is-12-touch py-11 p6-touch pb-0-touch">
            <ResponsiveElement tagNames={{ desktop: "h2", touch: "h1" }}>
              {props.content.visionTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-touch" />
          <div className="column is-7 is-12-touch py-11 p-6-touch jf-text-block-with-spacing">
            <ResponsiveElement tagNames={{ desktop: "h3", touch: "h2" }}>
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

        <div className="columns is-multiline">
          <div className="column is-4 is-12-touch py-11 pt-6-touch px-6-touch pb-0-touch">
            <ResponsiveElement tagNames={{ desktop: "h2", touch: "h1" }}>
              {props.content.impactTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-touch" />
          <div className="column is-7 is-12-touch py-11 p-6-touch">
            <h3 className="mb-10 mb-6-touch">{props.content.impactSubtitle}</h3>
            <div className="columns is-paddingless is-multiline">
              <div className="column is-9 is-12-touch has-background-black has-text-white">
                <div className="columns is-paddingless is-multiline">
                  <div className="column is-7 ">
                    <OutboundLink
                      href={latestReport.link}
                      className="jf-link-article"
                    >
                      <ResponsiveElement
                        tagNames={{ desktop: "h2", touch: "h1" }}
                      >
                        {latestReport.title}
                      </ResponsiveElement>
                    </OutboundLink>
                  </div>
                  <div className="column is-5">
                    <h3 className="has-text-weight-normal mb-3">
                      {props.content.impactCallout}
                    </h3>
                    <ReadMoreLink
                      url={latestReport.link}
                      customClasses="is-underlined has-text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <ResponsiveElement
              tagNames={{ desktop: "h3", touch: "h2" }}
              className="mt-10 mb-7 my-6-touch"
            >
              {props.content.pastReportsSubtitle}
            </ResponsiveElement>
            <div className="columns is-paddingless is-multiline">
              {pastReports.map((report: any, i: number) => (
                <div className="column is-paddingless is-4 mb-7" key={i}>
                  <OutboundLink href={report.link} className="jf-link-article">
                    <ResponsiveElement
                      tagNames={{ desktop: "h4", touch: "h3" }}
                      className="mb-3"
                    >
                      {report.title}
                    </ResponsiveElement>
                  </OutboundLink>
                  <ReadMoreLink url={report.link} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="columns has-background-info is-multiline">
          <div className="column is-4 is-12-touch py-11 p-6-touch">
            <ResponsiveElement tagNames={{ desktop: "h2", touch: "h1" }}>
              {props.content.valuesTitle}
            </ResponsiveElement>
          </div>
          <div className="column is-1 is-hidden-touch" />
          <div className="column is-7 is-12-touch py-11 p-6-touch">
            {props.content.valuesList.map((value: any, i: number) => (
              <div key={i}>
                {i > 0 && <div className="is-divider" />}
                <div className="is-hidden-touch">
                  <h3 className="mb-5">{value.title}</h3>
                  <p className="title is-4">{value.description.description}</p>
                </div>
                <div className="is-hidden-desktop">
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

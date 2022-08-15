import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql, StaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import PageHero from "../components/page-hero";
import { ReadMoreLink } from "../components/read-more";
import localeConfig from "../util/locale-config.json";
import { useCurrentLocale } from "../util/use-locale";
import { ContentfulContent } from "./index.en";
import Img from "gatsby-image/withIEPolyfill";
import ResponsiveElement from "../components/responsive-element";
import { FluidObject } from "gatsby-image";
import { BLOCKS } from "@contentful/rich-text-types";

import "../styles/reports.scss";
import { OutboundLink } from "../util/links";

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type ReportCardInfo = {
  reportTitle: string;
  publicationDate: string;
  blurb: {
    json: any;
  };
  reportUrl: string;
  image: {
    fluid: FluidObject;
  };
  locale: string;
};

const ReportCard: React.FC<ReportCardInfo> = (props) => (
  <div className="mb-10">
    <div className="jf-report-card columns is-paddingless is-multiline has-background-white">
      <div className="column is-6 is-12-touch is-paddingless">
        <Img
          fluid={props.image.fluid}
          objectFit="cover"
          objectPosition="100% 0%"
          alt=""
          className="jf-report-img"
        />
      </div>
      <div className="column is-6 is-12-touch px-9 px-6-touch pt-8 pb-11 py-7-touch is-flex is-flex-direction-column">
        <OutboundLink href={props.reportUrl} className="jf-link-article">
          <ResponsiveElement
            tagNames={{ desktop: "h2", touch: "h3" }}
            children={props.reportTitle}
            className="pb-6"
          />
        </OutboundLink>
        <span className="eyebrow pb-6">
          {formatDate(props.publicationDate, props.locale)}
        </span>
        {props.blurb && (
          <div className="pb-6">
            {documentToReactComponents(props.blurb.json, {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p className="jf-report-blurb">{children}</p>
                ),
              },
            })}
          </div>
        )}
        <ReadMoreLink
          url={props.reportUrl}
          customClasses="is-align-self-stretch"
        />
      </div>
    </div>
  </div>
);

export const PolicyPageScaffolding = (props: ContentfulContent) => {
  const locale = useCurrentLocale();

  return (
    <Layout metadata={props.content.metadata}>
      <div id="reports" className="reports-page">
        <PageHero {...props.content.pageHero} />

        <div className="columns is-multiline py-11 p-6-touch pb-9-touch">
          <div className="column is-4 is-12-touch py-0 p-0-touch">
            <ResponsiveElement
              tagNames={{ desktop: "h2", touch: "h1" }}
              children={props.content.approachTitle}
            />
          </div>
          <div className="column is-1 is-hidden-touch" />
          <div className="column is-7 is-12-touch py-0 pt-6-touch px-0-touch">
            <span className="title is-3">
              {documentToReactComponents(props.content.approachContent.json)}
            </span>
          </div>
        </div>

        <div
          id="report-section"
          className="columns is-multiline pt-10 pb-12 pt-0-touch pb-8-touch"
        >
          <div className="column is-3 is-12-touch">
            <ResponsiveElement
              tagNames={{ desktop: "h2", touch: "h1" }}
              children={props.content.reportsTitle}
            />
          </div>
          <div className="column is-9 is-12-touch pb-9 py-0-touch">
            {props.content.reportBlocks.map((report: any, i: number) => (
              <ReportCard {...report} locale={locale} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const PolicyPageFragment = graphql`
  fragment PolicyPage on Query {
    contentfulPolicyPage(node_locale: { eq: $locale }) {
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
      approachTitle
      approachContent {
        json
      }
      reportsTitle
      reportBlocks {
        reportTitle
        publicationDate
        blurb {
          json
        }
        reportUrl
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;

const PolicyPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...PolicyPage
      }
    `}
    render={(data) => (
      <PolicyPageScaffolding content={data.contentfulPolicyPage} />
    )}
  />
);

export default PolicyPage;

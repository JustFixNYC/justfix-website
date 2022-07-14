import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import React from "react";
import Layout from "../components/layout";
import PageHero from "../components/page-hero";
import { ReadMoreLink } from "../components/read-more";
import localeConfig from "../util/locale-config.json";
import { useCurrentLocale } from "../util/use-locale";
import { ContentfulContent } from "./index.en";
import { ResponsiveSectionTitle } from "./our-mission.en";

function formatDate(dateString: string, locale?: string): string {
  var date = new Date(dateString);
  return date.toLocaleDateString(locale || localeConfig.DEFAULT_LOCALE, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type EndorsementInfo = {
  userName: string;
  userImage: {
    fluid: {
      src: string;
    };
  };
  userLink: string;
  message: {
    json: any;
  };
  messageLink: string;
};

const Endorsement: React.FC<EndorsementInfo> = (props) => (
  <div>
    <div className="is-flex has-text-centered is-align-items-center">
      <figure className="image is-48x48">
        <img className="is-rounded" src={props.userImage.fluid.src} alt="" />
      </figure>
      <span className="is-small is-bold pl-5">
        {props.userName}
        {" says:"} {/* TODO: translate */}
      </span>
    </div>
    <div className="pl-10 pl-0-mobile pt-5-mobile">
      {documentToReactComponents(props.message.json)}
    </div>
  </div>
);

type ReportCardInfo = {
  reportTitle: string;
  publicationDate: string;
  blurb: {
    json: any;
  };
  reportUrl: string;
  image: {
    fluid: {
      src: string;
    };
  };
  endorsements: EndorsementInfo[];
  locale: string;
  hasDivider: boolean;
};

const ReportCard: React.FC<ReportCardInfo> = (props) => (
  <div>
    {props.hasDivider && <div className="is-divider" />}
    <div className="is-hidden-mobile">
      <div className="columns is-paddingless">
        <div className="column is-6 is-paddingless">
          <img src={props.image.fluid.src} alt="" />
        </div>
        <div className="column is-6 is-paddingless has-background-white">
          <div className="px-9 pt-8 pb-11">
            <h2 className="pb-5">{props.reportTitle}</h2>
            <span className="eyebrow">
              {formatDate(props.publicationDate, props.locale)}
            </span>
            {props.blurb ? (
              <div className="py-6">
                {documentToReactComponents(props.blurb.json)}
              </div>
            ) : (
              <br />
            )}
            <ReadMoreLink url={props.reportUrl} customClasses="mt-auto" />
          </div>
        </div>
      </div>
    </div>
    <div className="is-hidden-tablet"></div>
  </div>
);

export const PolicyPageScaffolding = (props: ContentfulContent) => {
  const locale = useCurrentLocale();

  return (
    <Layout metadata={props.content.metadata}>
      <PageHero {...props.content.pageHero} />

      <div className="columns">
        <div className="column is-4 pt-13 pb-12 p-6-mobile">
          <ResponsiveSectionTitle>
            {props.content.approachTitle}
          </ResponsiveSectionTitle>
        </div>
        <div className="column is-1 is-hidden-mobile" />
        <div className="column is-7 pt-13 pb-12 pt-0-mobile px-6-mobile pb-6-mobile">
          <span className="title is-3">
            {documentToReactComponents(props.content.approachContent.json)}
          </span>
        </div>
      </div>

      <div className="columns has-background-warning">
        {/*TODO: swap for orange, no class available */}
        <div className="column is-3 pt-13 pb-12 p-6-mobile">
          <ResponsiveSectionTitle>
            {props.content.approachTitle}
          </ResponsiveSectionTitle>
        </div>
        <div className="column is-9 pt-13 pb-12 p-6-mobile">
          {props.content.reportBlocks.map((report: any, i: number) => (
            <div key={i}>
              <ReportCard {...report} locale={locale} hasDivider={i > 0} />
              {report.endorsements.map((endorsement: any, i: number) => (
                <Endorsement {...endorsement} key={i} />
              ))}
            </div>
          ))}
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
        endorsements {
          userName
          userImage {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          userLink
          message {
            json
          }
          messageLink
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

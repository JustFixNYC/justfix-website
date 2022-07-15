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

import "../styles/policy.scss";

type ResponsiveElementInfo = {
  desktop: string;
  touch: string;
  children: React.ReactNode;
  className?: string;
};

const ResponsiveElement = ({
  desktop,
  touch,
  children,
  className,
}: ResponsiveElementInfo) => {
  const Desktop = desktop as keyof JSX.IntrinsicElements;
  const Touch = touch as keyof JSX.IntrinsicElements;
  return (
    <>
      <Desktop className={`is-hidden-touch ${className || ""}`}>
        {children}
      </Desktop>
      <Touch className={`is-hidden-desktop ${className || ""}`}>
        {children}
      </Touch>
    </>
  );
};

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
  <div className="mt-8 mt-6-mobile pb-5 pb-0-mobile">
    <div className="is-flex has-text-centered is-align-items-center">
      <figure className="image is-48x48">
        <img className="is-rounded" src={props.userImage.fluid.src} alt="" />
      </figure>
      <span className="is-small is-bold pl-5">
        {props.userName}
        {" says:"} {/* TODO: translate */}
      </span>
    </div>
    <div className="title is-4 pl-10 pl-0-mobile pt-5-mobile">
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
    fluid: any;
  };
  endorsements: EndorsementInfo[];
  locale: string;
  hasDivider: boolean;
};

const ReportCard: React.FC<ReportCardInfo> = (props) => (
  <div className={`${!props.hasDivider ? "mt-6" : ""} mt-0-mobile`}>
    {props.hasDivider && <div className="is-divider" />}
    <div className="jf-report-card columns is-paddingless is-multiline has-background-white">
      <div className="column is-6 is-paddingless">
        <Img
          fluid={props.image.fluid}
          alt=""
          objectFit="cover"
          objectPosition="100% 0%"
          className="jf-report-img"
        />
      </div>
      <div className="column is-6 px-9 px-6-mobile pt-8 pb-11 py-7-mobile is-flex is-flex-direction-column">
        <ResponsiveElement
          desktop="h2"
          touch="h3"
          children={props.reportTitle}
          className="pb-6"
        />
        <span className="eyebrow pb-6">
          {formatDate(props.publicationDate, props.locale)}
        </span>
        {props.blurb && (
          <div className="pb-6">
            {documentToReactComponents(props.blurb.json)}
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
      <PageHero {...props.content.pageHero} />

      <div className="columns pt-13 pb-11 p-6-mobile">
        <div className="column is-4 py-0 p-0-mobile">
          <ResponsiveElement
            desktop="h2"
            touch="h1"
            children={props.content.approachTitle}
          />
        </div>
        <div className="column is-1 is-hidden-mobile" />
        <div className="column is-7 py-0 pt-6-mobile px-0-mobile">
          <span className="title is-3">
            {documentToReactComponents(props.content.approachContent.json)}
          </span>
        </div>
      </div>

      <div
        id="report-section"
        className="columns pt-10 pb-12 pt-0-mobile pb-8-mobile"
      >
        <div className="column is-3">
          <ResponsiveElement
            desktop="h2"
            touch="h1"
            children={props.content.reportsTitle}
          />
        </div>
        <div className="column is-9 pb-9 py-0-mobile">
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

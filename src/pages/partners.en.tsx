import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/partners.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import PageHero from "../components/page-hero";
import ResponsiveElement from "../components/responsive-element";
import Img from "gatsby-image/withIEPolyfill";
import { FluidObject } from "gatsby-image";
import { OutboundLink } from "../util/links";
import { Trans } from "@lingui/macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

/**
 * This array of exactly 2 characters defines the points in the alphabet
 * in which we split up our list of partners when sorted.
 *
 * For example, if the first element is "D", that will split
 * up our partners list into partners A-D and partners E-? etc.
 */
const PARTNERS_LIST_ALPHABETICAL_BREAKS: [string, string, string] = [
  "A-D",
  "E-L",
  "M-Z",
];

type PartnerDetails = {
  name: string;
  link: string;
  logo: {
    fluid: FluidObject;
  };
};

const formatLinkLabel = (link: string) => {
  let trimmedLink = link.replace("https://", "").replace("http://", "");
  if (trimmedLink.startsWith("www.")) {
    trimmedLink = trimmedLink.slice(4);
  }
  return trimmedLink.split("/")[0];
};

const PartnerCard: React.FC<PartnerDetails> = ({ name, link, logo }) => (
  <div className="column is-3 jf-partner-card pl-0 pr-7">
    <div className="has-background-white is-flex is-flex-direction-column is-align-items-center is-justify-content-space-between">
      <div className="has-background-black has-text-white">
        <div className="eyebrow is-large has-text-centered is-flex is-flex-direction-column is-justify-content-center">
          {name}
        </div>
      </div>
      <Img
        fluid={logo.fluid}
        alt={name}
        className="my-5"
        style={{
          width: "150px",
          height: "150px",
        }}
      />
      <OutboundLink className="mb-9 mx-2" href={link}>
        {formatLinkLabel(link)}
      </OutboundLink>
    </div>
  </div>
);

type PartnersSectionDetails = {
  title: string;
  letterRange: string;
  partners: PartnerDetails[];
};

const PartnersSection: React.FC<PartnersSectionDetails> = ({
  title,
  letterRange,
  partners,
}) => (
  <div className="columns has-background-info">
    <div className="column pt-13 pb-12 p-6-mobile">
      <h2 className="pb-3 pb-6-mobile">
        {title} <span className="is-hidden-tablet">{letterRange}</span>
      </h2>
      <h3 className="is-hidden-mobile mb-11">{letterRange}</h3>
      <div className="columns is-paddingless is-multiline">
        {partners.map((partner: PartnerDetails, i: number) => (
          <PartnerCard {...partner} key={i} />
        ))}
      </div>
    </div>
  </div>
);

type PartnershipCaseStudyDetails = {
  title: string;
  description: {
    json: any;
  };
};

const PartnershipCaseStudy: React.FC<PartnershipCaseStudyDetails> = ({
  title,
  description,
}) => (
  <div className="columns has-background-info is-multiline">
    <div className="column is-12">
      <div className="is-divider my-10" />
    </div>
    <div className="column is-4 my-6">
      <div className="eyebrow is-large mb-3">
        <Trans>Partnership case study</Trans>
      </div>
      <ResponsiveElement desktop="h2" touch="h1">
        {title}
      </ResponsiveElement>
    </div>
    <div className="column is-8 my-6">
      <span className="title is-4">
        {documentToReactComponents(description.json)}
      </span>
    </div>
    <div className="column is-12">
      <div className="is-divider my-10" />
    </div>
  </div>
);

export const PartnersPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata}>
    <div id="partners" className="partners-page">
      <PageHero {...props.content.pageHero} />

      <div className="columns">
        <div className="column is-4 pt-13 pb-12 p-6-mobile">
          <ResponsiveElement desktop="h2" touch="h1">
            {props.content.title}
          </ResponsiveElement>
        </div>
        <div className="column is-1 is-hidden-mobile" />
        <div className="column is-7 pt-13 pb-12 p-6-mobile">
          <span className="title is-3">{props.content.subtitle.subtitle}</span>
        </div>
      </div>

      <PartnersSection
        title={props.content.partnersListTitle}
        letterRange={PARTNERS_LIST_ALPHABETICAL_BREAKS[0]}
        partners={props.content.partnerOrganizations.filter(
          (partner: PartnerDetails) =>
            partner.name < PARTNERS_LIST_ALPHABETICAL_BREAKS[1].slice(0, 1)
        )}
      />

      <PartnershipCaseStudy {...props.content.partnershipCaseStudies[0]} />
    </div>
  </Layout>
);

export const PartnersPageFragment = graphql`
  fragment PartnersPage on Query {
    contentfulPartnersPage(node_locale: { eq: $locale }) {
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
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      title
      subtitle {
        subtitle
      }
      partnersListTitle
      partnerOrganizations {
        name
        link
        logo {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
      partnershipCaseStudies {
        title
        description {
          json
        }
      }
      fundersTitle
      fundersSubtitle
      funders {
        name
        link
        logo {
          fluid {
            src
          }
        }
      }
    }
  }
`;

const PartnersPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...PartnersPage
      }
    `}
    render={(data) => (
      <PartnersPageScaffolding content={data.contentfulPartnersPage} />
    )}
  />
);

export default PartnersPage;

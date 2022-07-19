import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../styles/partners.scss";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";
import PageHero from "../components/page-hero";
import ResponsiveElement from "../components/responsive-element";

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

      <div className="columns has-background-info">
        <div className="column pt-13 pb-12 p-6-mobile">
          <h2 className="pb-3 pb-6-mobile">
            {props.content.partnersListTitle}{" "}
            <span className="is-hidden-tablet">
              PARTNERS_LIST_ALPHABETICAL_BREAKS[0]
            </span>
          </h2>
          <h3 className="is-hidden-mobile">
            {PARTNERS_LIST_ALPHABETICAL_BREAKS[0]}
          </h3>
        </div>
      </div>
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

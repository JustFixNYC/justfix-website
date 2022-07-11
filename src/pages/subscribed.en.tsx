import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Img from "gatsby-image/withIEPolyfill";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";

export const SubscribedPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={{ title: props.content.title }}>
    <div className="columns is-multiline">
      <div className="column is-12 pt-11">
        <h1 className="mb-5">{props.content.title}</h1>
        <div className="mb-5">
          <span className="title is-3">
            {documentToReactComponents(props.content.description.json)}
          </span>
        </div>
      </div>
      <div className="column is-8 is-12-mobile">
        <figure className="image is-256x256 mb-5">
          <Img fluid={props.content.teamPhoto.fluid} alt="" />
        </figure>
      </div>
      <div className="column is-12 pb-11">
        <span className="title is-3">
          {documentToReactComponents(props.content.descriptionBelowPhoto.json)}
        </span>
      </div>
    </div>
  </Layout>
);

export const SubscribedPageFragment = graphql`
  fragment SubscribedPage on Query {
    contentfulSubscriptionConfirmationPage(node_locale: { eq: $locale }) {
      title
      description {
        json
      }
      teamPhoto {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      descriptionBelowPhoto {
        json
      }
    }
  }
`;

const SubscribedPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...SubscribedPage
      }
    `}
    render={(data) => (
      <SubscribedPageScaffolding
        content={data.contentfulSubscriptionConfirmationPage}
      />
    )}
  />
);

export default SubscribedPage;

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Layout from "../components/layout";
import { ContentfulContent } from "./index.en";

export const SubscribedPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={{ title: "Subscribed" }}>
    <section className="hero is-small">
      <div className="hero-body has-text-centered is-horizontal-center">
        <div className="content content-wrapper tight">
          <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
            {props.content.title}
          </h1>
          <span className="is-size-5">
            {documentToReactComponents(props.content.description.json)}
          </span>
        </div>
        <br />
        <div className="container block content-wrapper tight">
          <figure className="image">
            <img src={props.content.teamPhoto.file.url} alt="" />
          </figure>
        </div>
        <br />
        <span className="is-size-5">
          {documentToReactComponents(props.content.descriptionBelowPhoto.json)}
        </span>
      </div>
    </section>
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
        file {
          url
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

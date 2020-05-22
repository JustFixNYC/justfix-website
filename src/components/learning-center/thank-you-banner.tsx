import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ContentfulContent } from "../../pages";

export const ThankYouBanner = (props: ContentfulContent) => (
  <section className="hero is-small has-background-light is-paddingless">
    <div className="content-wrapper">
      <div className="hero-body has-text-centered is-horizontal-center">
        <span className="is-size-6 is-italic has-text-weight-medium">
          {documentToReactComponents(props.content.json)}
        </span>
      </div>
    </div>
  </section>
);

import React from 'react'
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const ThankYouBanner = () => (
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage {
            thankYouText {
              json
            }
          }
        }
      `}
    render = {data => (
      <section className="hero is-small is-light is-paddingless">
        <div className="content-wrapper">
          <div className="hero-body has-text-centered is-horizontal-center">
            <span className="is-size-6 is-italic has-text-weight-medium">{documentToReactComponents(data.contentfulLearningCenterSearchPage.thankYouText.json)}</span>
          </div>
        </div>
      </section>
    )}
    />
  );
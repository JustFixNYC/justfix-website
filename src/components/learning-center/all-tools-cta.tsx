import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby";
import { ContentfulContent } from '../../pages';
import { DDOSearchBar } from '../ddo-searchbar';

const widont = require('widont')

const AllToolsCtaScaffolding = (props: ContentfulContent) => {
  const cta = props.content.allToolsCta;
  return (
    <div className="article-section">
      <div className="cta all-tools has-text-centered has-background-primary-white">
          <h1 className="title is-size-4 has-text-weight-bold has-text-primary is-spaced">
            {widont(cta.title)}
          </h1>
          {cta.subtitle && 
          <p className="is-hidden-mobile has-text-weight-medium has-text-primary is-spaced">
            {cta.subtitle}
          </p>
          }
          <div className="is-hidden-mobile">
            <DDOSearchBar
              hiddenFieldLabel="Enter your address to learn more."
              submitLabel="Search address"
              withinCTA={true}
            />
          </div>
          <a href={cta.ctaLink} className="is-hidden-tablet button is-medium is-primary is-outlined is-uppercase" target="_blank" rel="noopener noreferrer">
            {cta.ctaText}
          </a>
      </div>
    </div>
  );
}

export const AllToolsCta = () => (
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage {
            allToolsCta {
              title
              subtitle
              ctaText
              ctaLink
            }
          }
        }
      `}
    render = {data => (<AllToolsCtaScaffolding content={data.contentfulLearningCenterSearchPage} />)}
    />
  );
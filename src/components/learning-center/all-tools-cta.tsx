import React from 'react'
import { ContentfulContent } from '../../pages';
import { DDOSearchBar } from '../ddo-searchbar';

const widont = require('widont')

export const AllToolsCta = (props: ContentfulContent) => (
  <div className="article-section">
    <div className="cta-wrapper">
      <div className="cta all-tools has-text-centered is-horizontal-center has-background-primary-white">
          <h1 className="title is-size-4 has-text-weight-bold has-text-primary is-spaced">
            {widont(props.content.title)}
          </h1>
          {props.content.subtitle && 
          <p className="is-hidden-mobile has-text-weight-medium has-text-primary is-spaced">
            {props.content.subtitle}
          </p>
          }
          <div className="is-hidden-mobile">
            <br />
            <DDOSearchBar
              hiddenFieldLabel="Enter your address to learn more."
              submitLabel="Search address"
              customUtmTags="utm_source=orgsite&utm_medium=learning_center_cta"
              withinCTA={true}
            />
          </div>
          <a href={props.content.ctaLink} className="is-hidden-tablet button is-medium is-primary is-uppercase" target="_blank" rel="noopener noreferrer">
            {props.content.ctaText}
          </a>
      </div>
    </div>
  </div>
)
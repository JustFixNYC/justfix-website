import React from 'react'
import { ContentfulContent } from '../../pages';
import { DDOSearchBar } from '../ddo-searchbar';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';

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
            <I18n>
              {( {i18n} ) => <DDOSearchBar
                hiddenFieldLabel={i18n._(t`Enter your address to learn more.`)}
                submitLabel={i18n._(t`Search address`)}
                customUtmTags="utm_source=orgsite&utm_medium=learning_center_cta"
                withinCTA={true}
              />}
            </I18n>
          </div>
          <a href={props.content.ctaLink} className="is-hidden-tablet button is-medium is-primary is-uppercase" target="_blank" rel="noopener noreferrer">
            {props.content.ctaText}
          </a>
      </div>
    </div>
  </div>
)
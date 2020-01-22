import React from 'react'
import { StaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Locale } from '../../pages';

const ThankYouBannerScaffolding = ( props: any) =>
<section className="hero is-small has-background-light is-paddingless">
  <div className="content-wrapper">
    <div className="hero-body has-text-centered is-horizontal-center">
      <span className="is-size-6 is-italic has-text-weight-medium">{documentToReactComponents(props.content.thankYouText.json)}</span>
    </div>
  </div>
</section>

export const ThankYouBanner = (props: Locale) => (
  props.locale === "es" ?
    <StaticQuery
      query={graphql`
        query {
          contentfulLearningCenterSearchPage( node_locale: { eq: "es" } ) {
            thankYouText {
              json
            }
          }
        }
      `}
    render = {data => (<ThankYouBannerScaffolding content={data.contentfulLearningCenterSearchPage} locale={props.locale} /> 
    )}
    /> :
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
    render = {data => (<ThankYouBannerScaffolding content={data.contentfulLearningCenterSearchPage} locale={props.locale} /> 
    )}
    /> 
  );
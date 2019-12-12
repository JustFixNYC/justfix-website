import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { MissionPageScaffolding } from './our-mission';

const MissionPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulMissionPage( node_locale: { eq: "es" } ) {
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
          title
          briefDescription
          videoUrl
          serveSection {
            json
          }
          impactTitle
          impactSubtitle
          impactReportButtons {
            title
            link
          }
          approachSection {
            json
          }
          collaborationBanner {
            title
            subtitle
          }
          readMore {
            title
            link
          }
        }
      }
    `}
  render = {data => (<MissionPageScaffolding content={data.contentfulMissionPage} locale="es" />)}
  />
);

export default MissionPage;

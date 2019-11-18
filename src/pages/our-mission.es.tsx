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
          problemsSection {
            json
          }
          impactTitle
          impactSubtitle
          impactReportButtons {
            title
            link
          }
          serveSection {
            json
          }
          collaborationImageBreak {
            file {
              url
            }
          }
          approachSection {
            json
          }
          approachBreakIcon {
            iconImage {
              file {
                url
              }
            }
            iconDescription 
          }
          collaborationBanner {
            title
            subtitle
          }
        }
      }
    `}
  render = {data => (<MissionPageScaffolding content={data.contentfulMissionPage} />)}
  />
);

export default MissionPage;

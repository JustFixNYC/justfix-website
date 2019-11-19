import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { TeamPageScaffolding } from './team';

const TeamPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulTeamPage( node_locale: { eq: "es" } ) {
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
          teamMembers {
            name
            title
            description {
              description
            } 
            photo {
              fluid {
                src
              }
            }
            professionalLinks
          }
          directorsTitle 
          directors {
            name
            title
            photo {
              file {
                url
              }
            }
            organization
            organizationLink
            description {
              description
            } 
          }
          otherContributorsTitle
          otherContributors {
            name
            link
          }
          readMore {
            title
            link
          }
        }
      }
    `}
  render = {data => (<TeamPageScaffolding content={data.contentfulTeamPage} locale="es" />)}
  />
);

export default TeamPage;

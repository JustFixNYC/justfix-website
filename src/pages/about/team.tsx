import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'

const TeamPageScaffolding = (props) => 
  (<Layout>
    <article contentful-entry="'content_type=teamPage'">
      <header className="container">
        <h1 className="center">{props.content.title}</h1>
      </header>

      <section>
        <div className="container">
          <div className="team_members">
            { (props.content.teamMembers).map( (member, i) =>
              (<div className="team_member team_member--team" key={i}>
              <img className="team_member-image" src={ member.photo.file.url } alt={member.name} />
              <h4 className="team_member-name">{member.name}</h4>
              <h4>{member.title}</h4>
              <div className="team_member-social social">
                { (member.childrenContentfulTeamMemberLinksJsonNode).map ( (link, i) => 
                  (<span key={i} className="btn btn-primary btn-icon">
                  <a href={link.url} target="_blank">
                      <i className="glyphicon" 
                      // ng-className={'glyphicon-' + link.type}
                      ></i>
                  </a>
                </span>)
                )}
              </div>
              <p className="team_member-description team_member-description--team">{member.description.description}</p>
            </div>) )
            }
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h1 className="center">{props.content.directorsTitle}</h1>
          <div className="team_members">
          { (props.content.directors).map( (director, i) =>
            (<div className="team_member team_member--director" key={i}>
              <div className="team_member-director_image_wrapper">
                <img className="team_member-image" src={ director.photo.file.url } alt={director.name} />
              </div>
              <div className="team_member-director_text">
                <h4 className="team_member-name team_member-name--director">{director.name}</h4>
                <h4 className="team_member-name team_member-name--director">
                  {director.title + ', '} 
                  <a href={ director.childrenContentfulTeamMemberLinksJsonNode.length && director.childrenContentfulTeamMemberLinksJsonNode[0].url } target="_blank" rel="noopener noreferrer">
                    {director.childrenContentfulTeamMemberLinksJsonNode[0].title}
                  </a>
                </h4>
                <div className="team_member-description text-left">
                  <p>
                    {director.description.description}
                  </p>
                </div>
              </div>
            </div>) )
          }
          </div>
        </div>
      </section>

      <section className="gray_bg">
        <div className="justify_content_center_vertically-sm">
          <h3 className="center">{props.content.otherContributorsTitle}</h3>
          { (props.content.otherContributors).map( (contributor, i) =>
            (<p className="contributor" key={i}>
              {contributor.link ? 
              (<a href={contributor.link} target="_blank">{contributor.name}</a>) :
              (<span>{contributor.name}</span>)}
            </p>) ) 
          }
        </div>
      </section>

      {/* <section className="milestones no-margin-bottom">
        <div className="container" ng-bind-html="$contentfulEntry.fields.milestones | markdown">
        </div>
        <div className="logos container">
          <span
            className="logo"
            ng-repeat="sponsor in $contentfulEntry.fields.sponsorOrganizations track by $index">
            <a ng-href="{sponsor.fields.link}" target="_blank">
              <div
                className="background-image"
                ng-style="{'background-image': 'url(' + sponsor.fields.logo.fields.file.url + ')'}">
              </div>
            </a>
          </span>
        </div>
      </section>

      <section className="baker reduced-margin">
        <div className="container">
          <div className="baker-thanks">
            <h3>{$contentfulEntry.fields.bakerThanks}</h3>
          </div>
          <div className="baker-logo">
            <a href="https://www.bakerlaw.com/" target="_blank">
              <img ng-src="{ $contentfulEntry.fields.bakerLogo.fields.file.url }" alt="Baker Logo" />
            </a>
          </div>
        </div>
      </section> */}

    </article>
</Layout>); 


const TeamPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulTeamPage {
          title
          teamMembers {
            name
            title
            description {
              description
            } 
            photo {
              file {
                url
              }
            }
            childrenContentfulTeamMemberLinksJsonNode {
              url
              type
            }
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
            childrenContentfulTeamMemberLinksJsonNode {
              title
              url
            }
            description {
              description
            } 
          }
          otherContributorsTitle
          otherContributors {
            name
            link
          }
        }
      }
    `}
  render = {data => (<TeamPageScaffolding content={data.contentfulTeamPage} />)}
  />
);

export default TeamPage;
